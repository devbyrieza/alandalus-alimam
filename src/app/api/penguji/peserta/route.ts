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
        // Fetch user profile to see if they're an admin
        const userProfile = await prisma.profile.findUnique({
            where: { id: userId },
            select: { role: true, secondary_roles: true }
        });
        const allRoles = userProfile ? [userProfile.role, ...(userProfile.secondary_roles || [])] : [];
        const isAdmin = allRoles.some(r => ['admin_super', 'admin', 'head_of_it'].includes(r));

        let whereClause: any = {};
        if (!isAdmin) {
            whereClause = {
                OR: [
                    { penguji_santri_id: userId }, // Wawancara Calsan (or general Interview)
                    { penguji_quran_id: userId },   // Tes Quran
                    { penguji_ortu_id: userId },    // Wawancara Cawalsan
                    { exam_session: { created_by: userId } }, // Sessions created by this penguji
                ]
            };
        }

        const assigned = await prisma.jadwalUjian.findMany({
            where: whereClause,
            include: {
                pendaftar: {
                    select: {
                        id: true,
                        nama_lengkap: true,
                        nomor_pendaftaran: true,
                        jenjang: true,
                        nilai_ujian: true, // Fetch scores directly from pendaftar
                    }
                },
                exam_session: { select: { title: true, created_by: true } },
            },
            orderBy: { tanggal_ujian: 'asc' }
        });

        // Helper to check if an object is effectively empty
        const isEmpty = (obj: any) => !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);

        // Build a map to deduplicate by pendaftar.id
        const pesertaMap = new Map<string, any>();

        for (const item of assigned) {
            const pendaftarId = item.pendaftar.id;

            // Determine roles for this jadwal record
            const roles: string[] = [];
            if (isAdmin) {
                roles.push('wawancara', 'quran', 'ortu');
            } else {
                if (item.penguji_santri_id === userId) roles.push('wawancara');
                if (item.penguji_quran_id === userId) roles.push('quran');
                if (item.penguji_ortu_id === userId) roles.push('ortu');

                if (roles.length === 0 && item.exam_session?.created_by === userId) {
                    const title = (item.exam_session?.title || "").toLowerCase();
                    const hasQuranMatch = title.includes("qur") || title.includes("quran");
                    const hasWawancaraMatch = title.includes("calsan") || title.includes("santri") || title.includes("wawancara");
                    const hasOrtuMatch = title.includes("cawalsan") || title.includes("ortu") || title.includes("orang");

                    if (hasQuranMatch) roles.push('quran');
                    if (hasWawancaraMatch) roles.push('wawancara');
                    if (hasOrtuMatch) roles.push('ortu');
                }
            }

            // Pick score data from ALL records for this pendaftar
            const allScores = item.pendaftar.nilai_ujian || [];
            
            // Build a merged score view for this student from all their records
            const mergedScore: any = {};
            // Start from oldest, newest wins for each field
            [...allScores].sort((a: any, b: any) => 
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            ).forEach(s => {
                Object.entries(s).forEach(([k, v]) => {
                    if (!isEmpty(v)) mergedScore[k] = v;
                });
            });

            if (pesertaMap.has(pendaftarId)) {
                const existing = pesertaMap.get(pendaftarId);
                for (const r of roles) {
                    if (!existing.roles.includes(r)) existing.roles.push(r);
                }
                
                // Merge scores into existing map entry
                Object.entries(mergedScore).forEach(([k, v]) => {
                    if (!isEmpty(v) && isEmpty(existing[k])) {
                        existing[k] = v;
                    }
                });
            } else {
                pesertaMap.set(pendaftarId, {
                    id: pendaftarId,
                    nama: item.pendaftar.nama_lengkap,
                    nomor: item.pendaftar.nomor_pendaftaran,
                    jenjang: item.pendaftar.jenjang,
                    jadwal_id: item.id,
                    roles: roles,
                    // Score fields
                    nilai_id: mergedScore.id,
                    nilai_wawancara_santri: mergedScore.nilai_wawancara_santri,
                    nilai_tes_quran: mergedScore.nilai_tes_quran,
                    nilai_wawancara_ortu: mergedScore.nilai_wawancara_ortu,
                    catatan_santri: mergedScore.catatan_santri,
                    catatan_quran: mergedScore.catatan_quran,
                    catatan_ortu: mergedScore.catatan_ortu,
                    detail_quran: mergedScore.detail_quran,
                    detail_wawancara: mergedScore.detail_wawancara,
                    detail_cawalsan: mergedScore.detail_cawalsan,
                    input_at_quran: mergedScore.input_at_quran,
                    input_at_santri: mergedScore.input_at_santri,
                    input_at_ortu: mergedScore.input_at_ortu,
                });
            }
        }

        const data = Array.from(pesertaMap.values());

        return NextResponse.json({ data });
    } catch (error: any) {
        console.error("GET penguji/peserta error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
