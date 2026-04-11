/**
 * Cron endpoint for H-1 reminders.
 * Called daily at 08:00 WIB by external cron.
 * Finds all jadwal with tes tomorrow and schedules reminders for 20:00 WIB today.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    enqueueWhatsapp,
    buildMessageReminderH1Santri,
    buildMessageReminderH1Penguji,
} from "@/lib/whatsapp-queue";

const CRON_SECRET = process.env.CRON_SECRET || "ppdb-alimam-cron-2026";

export async function GET(request: Request) {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    const urlSecret = new URL(request.url).searchParams.get("secret");
    const secret = authHeader?.replace("Bearer ", "") || urlSecret;

    if (secret !== CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Calculate tomorrow's date range (in WIB = UTC+7)
        const now = new Date(); // Current server time
        
        // Target: Tomorrow's date
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const tomorrowStart = new Date(tomorrow);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(tomorrow);
        tomorrowEnd.setHours(23, 59, 59, 999);

        // Schedule Time: Today at 20:00 WIB
        // 20:00 WIB is 13:00 UTC
        const sendAt = new Date(now);
        sendAt.setUTCHours(13, 0, 0, 0);
        
        // If 13:00 UTC today has already passed, set it to now (send immediately)
        const finalScheduledAt = sendAt < now ? now : sendAt;

        // Find all jadwal_ujian scheduled for tomorrow
        const jadwalTomorrow = await prisma.jadwalUjian.findMany({
            where: {
                tanggal_ujian: {
                    gte: tomorrowStart,
                    lte: tomorrowEnd,
                },
            },
            include: {
                pendaftar: true,
                exam_session: true,
                penguji_santri: true,
                penguji_quran: true,
                penguji_ortu: true,
                notif_reminders: true,
            },
        });

        let enqueuedSantri = 0;
        let enqueuedPenguji = 0;

        for (const jadwal of jadwalTomorrow) {
            // Check if pendaftar reminder already enqueued
            const existingPendaftarReminder = jadwal.notif_reminders.find(
                (r) => r.pendaftar_id === jadwal.pendaftar_id
            );

            // Format details
            const dateObj = new Date(jadwal.tanggal_ujian);
            const hari = dateObj.toLocaleDateString("id-ID", { weekday: "long" }).replace("Minggu", "Ahad");
            const tanggalStr = dateObj.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
            
            const timeObj = jadwal.exam_session ? new Date(jadwal.exam_session.start_time) : new Date(jadwal.waktu_mulai_santri);
            const jam = timeObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });

            const jenisUjian = jadwal.exam_session?.title || "Seleksi Santri Baru";

            // Determine Primary Meeting Link from examiners
            const googleMeetLink = 
                jadwal.penguji_santri?.google_meet_link || 
                jadwal.penguji_quran?.google_meet_link || 
                jadwal.penguji_ortu?.google_meet_link || 
                jadwal.google_meet_link;

            const lokasi = googleMeetLink 
                ? `${jadwal.exam_session?.location || "Online"} (Link: ${googleMeetLink})` 
                : (jadwal.exam_session?.location || "Pesantren Al-Andalus Al-Imam");

            // 1. Enqueue for Santri
            if (!existingPendaftarReminder && jadwal.pendaftar.no_hp) {
                const msgSantri = buildMessageReminderH1Santri(
                    jadwal.pendaftar.nama_lengkap,
                    hari,
                    tanggalStr,
                    jam,
                    lokasi,
                    jenisUjian
                );

                await enqueueWhatsapp({
                    pendaftarId: jadwal.pendaftar_id,
                    phone: jadwal.pendaftar.no_hp,
                    jenisNotif: "reminder_h1",
                    messageContent: msgSantri,
                    scheduledAt: finalScheduledAt,
                });

                // Track
                await prisma.jadwalNotifReminder.upsert({
                    where: {
                        jadwal_ujian_id_pendaftar_id: {
                            jadwal_ujian_id: jadwal.id,
                            pendaftar_id: jadwal.pendaftar_id,
                        },
                    },
                    update: {},
                    create: {
                        jadwal_ujian_id: jadwal.id,
                        pendaftar_id: jadwal.pendaftar_id,
                        reminder_sent: false,
                    },
                });
                enqueuedSantri++;
            }

            // 2. Enqueue for Examiners (if assigned)
            const examinersToNotify = [
                { profile: jadwal.penguji_santri, type: "Wawancara Santri/Calsan" },
                { profile: jadwal.penguji_quran, type: "Tes Al-Qur'an" },
                { profile: jadwal.penguji_ortu, type: "Wawancara Cawalsan/Ortu" },
            ];

            for (const { profile, type } of examinersToNotify) {
                if (profile && profile.phone) {
                    const msgPenguji = buildMessageReminderH1Penguji(
                        profile.full_name,
                        jadwal.pendaftar.nama_lengkap,
                        hari,
                        tanggalStr,
                        jam,
                        profile.google_meet_link || "Menyesuaikan",
                        type
                    );

                    const result = await enqueueWhatsapp({
                        pendaftarId: jadwal.pendaftar_id,
                        phone: profile.phone,
                        jenisNotif: "reminder_h1_penguji",
                        messageContent: msgPenguji,
                        scheduledAt: finalScheduledAt,
                    });

                    if (result.queued) enqueuedPenguji++;
                }
            }
        }

        return NextResponse.json({
            success: true,
            totalJadwalTomorrow: jadwalTomorrow.length,
            enqueuedSantri,
            enqueuedPenguji,
            scheduledFor: finalScheduledAt.toISOString(),
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error("❌ Cron Reminder error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
