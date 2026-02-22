import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { notifyAllExamsComplete } from "@/lib/wablas";

async function getSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch {
        return null;
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user_id || session.id;

    try {
        const body = await request.json();
        const { jadwal_id } = body;

        if (!jadwal_id) {
            return NextResponse.json({ error: "Jadwal ID is required" }, { status: 400 });
        }

        // 1. Get Jadwal
        const jadwal = await prisma.jadwalUjian.findUnique({
            where: { id: jadwal_id },
            include: {
                pendaftar: {
                    select: {
                        id: true,
                        nama_lengkap: true,
                        no_hp: true,
                        orang_tua: { select: { no_hp_ayah: true, no_hp_ibu: true } }
                    }
                }
            }
        });

        if (!jadwal) {
            return NextResponse.json({ error: "Jadwal not found" }, { status: 404 });
        }

        // 2. Determine what to update
        const updates: any = {};
        let updatedField = "";

        if (jadwal.penguji_santri_id === userId) {
            updates.status_santri = "completed";
            updatedField = "Wawancara Calon Santri";
        } else if (jadwal.penguji_quran_id === userId) {
            updates.status_quran = "completed";
            updatedField = "Tes Al-Qur'an";
        } else if (jadwal.penguji_ortu_id === userId) {
            updates.status_ortu = "completed";
            updatedField = "Wawancara Wali";
        } else {
            return NextResponse.json({ error: "You are not assigned to this exam" }, { status: 403 });
        }

        // 3. Update Status
        const updatedJadwal = await prisma.jadwalUjian.update({
            where: { id: jadwal_id },
            data: updates
        });

        // 4. Check if ALL DONE
        // We consider it "All Done" if all assigned components are completed.
        // Online Test status is separate, but usually required too. Let's include it if present.

        const isSantriDone = !updatedJadwal.penguji_santri_id || updatedJadwal.status_santri === "completed";
        const isQuranDone = !updatedJadwal.penguji_quran_id || updatedJadwal.status_quran === "completed";
        const isOrtuDone = !updatedJadwal.penguji_ortu_id || updatedJadwal.status_ortu === "completed";
        // Check online test too? Maybe optional for now or check if status_online_test is 'completed'
        // For now, let's stick to the interviews.

        const isAllDone = isSantriDone && isQuranDone && isOrtuDone;

        if (isAllDone) {
            // Send Notification
            const phone = jadwal.pendaftar.no_hp || jadwal.pendaftar.orang_tua?.no_hp_ayah || jadwal.pendaftar.orang_tua?.no_hp_ibu;
            if (phone) {
                await notifyAllExamsComplete({
                    phone,
                    nama: jadwal.pendaftar.nama_lengkap
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Berhasil menandai ${updatedField} selesai.`,
            isAllDone
        });

    } catch (error: any) {
        console.error("POST /api/penguji/jadwal/complete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
