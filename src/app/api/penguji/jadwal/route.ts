import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

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

// GET: List assigned exams for the logged-in examiner
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user_id || session.id;

    try {
        // Determine which field to check based on role? 
        // Actually, just check all fields since a person might have multiple roles or assignments
        const whereClause: any = {
            OR: [
                { penguji_santri_id: userId },
                { penguji_quran_id: userId },
                { penguji_ortu_id: userId },
            ]
        };

        const jadwal = await prisma.jadwalUjian.findMany({
            where: whereClause,
            include: {
                pendaftar: {
                    select: {
                        nama_lengkap: true,
                        nomor_pendaftaran: true,
                        jenjang: true,
                        jenis_kelamin: true,
                    }
                },
                tahun_ajaran: {
                    select: { nama: true }
                },
                exam_session: {
                    select: {
                        title: true,
                        start_time: true,
                        end_time: true,
                        location: true,
                    }
                }
            },
            orderBy: { tanggal_ujian: 'asc' }
        });

        // Transform data to be friendly
        const formattedJadwal = jadwal.map((item: any) => {
            let jenis_tugas = [];
            if (item.penguji_santri_id === userId) jenis_tugas.push("Wawancara Santri");
            if (item.penguji_quran_id === userId) jenis_tugas.push("Tes Al-Qur'an");
            if (item.penguji_ortu_id === userId) jenis_tugas.push("Wawancara Wali");

            return {
                id: item.id,
                pendaftar: item.pendaftar,
                tanggal_ujian: item.tanggal_ujian,
                waktu_mulai: item.exam_session?.start_time || item.waktu_mulai_santri, // Fallback if no session
                waktu_selesai: item.exam_session?.end_time || item.waktu_selesai_santri,
                lokasi: item.exam_session?.location || item.tempat_santri,
                jenis_tugas: jenis_tugas.join(", "),
                status: "scheduled", // Derive from status_santri/quran etc if needed
                session_title: item.exam_session?.title,
            };
        });

        return NextResponse.json({ data: formattedJadwal });
    } catch (error: any) {
        console.error("GET penguji/jadwal error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
