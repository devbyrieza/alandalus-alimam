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

// GET: List all exam participants assigned to this reviewer
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user_id || session.id;

    try {
        const whereClause: any = {
            OR: [
                { penguji_santri_id: userId }, // Wawancara Calsan (or general Interview)
                { penguji_quran_id: userId },   // Tes Quran
                { penguji_ortu_id: userId },    // Wawancara Cawalsan
            ]
        };

        const assigned = await prisma.jadwalUjian.findMany({
            where: whereClause,
            include: {
                pendaftar: {
                    select: {
                        id: true,
                        nama_lengkap: true,
                        nomor_pendaftaran: true,
                        jenjang: true,
                    }
                },
                nilai_ujian: true, // Fetch scores
            },
            orderBy: { tanggal_ujian: 'asc' }
        });

        const data = assigned.map((item: any) => {
            // Determine role for this specific student
            const roles = [];
            if (item.penguji_santri_id === userId) roles.push('wawancara');
            if (item.penguji_quran_id === userId) roles.push('quran');
            if (item.penguji_ortu_id === userId) roles.push('ortu');

            // Find or create NilaiUjian entry (should exist if schedule exists, or created on demand)
            // Usually NilaiUjian is linked by pendaftar_id or jadwal_ujian_id.
            // Prisma `nilai_ujian` is array (one-to-many), assume one valid entry or empty.
            const score = item.nilai_ujian?.[0] || {};

            return {
                id: item.pendaftar.id, // Use Pendaftar ID as primary reference
                jadwal_id: item.id,
                nomor_pendaftaran: item.pendaftar.nomor_pendaftaran,
                nama_lengkap: item.pendaftar.nama_lengkap,
                jenjang: item.pendaftar.jenjang,
                roles: roles,
                // Scores
                nilai_wawancara_santri: score.nilai_wawancara_santri,
                nilai_tes_quran: score.nilai_tes_quran,
                nilai_wawancara_ortu: score.nilai_wawancara_ortu,
                catatan_santri: score.catatan_santri,
                catatan_quran: score.catatan_quran,
                catatan_ortu: score.catatan_ortu,
                // ID for updating score
                nilai_id: score.id,
            };
        });

        return NextResponse.json({ data });
    } catch (error: any) {
        console.error("GET penguji/peserta error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
