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

// PATCH: Update score (Upsert)
// PATCH: Update score (Upsert)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: pendaftarId } = await params;
    const userId = session.user_id || session.id;

    try {
        const body = await request.json();

        // Check assignment authorization
        const assignment = await prisma.jadwalUjian.findFirst({
            where: {
                pendaftar_id: pendaftarId,
                OR: [
                    { penguji_santri_id: userId },
                    { penguji_quran_id: userId },
                    { penguji_ortu_id: userId },
                ]
            }
        });

        if (!assignment && session.role !== 'admin_super' && session.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden: Not assigned to this student" }, { status: 403 });
        }

        // Determine allowed fields based on role
        // If admin, everything allowed.
        // If examiner, only specific fields.
        const isWawancara = assignment?.penguji_santri_id === userId;
        const isQuran = assignment?.penguji_quran_id === userId;
        const isOrtu = assignment?.penguji_ortu_id === userId;
        const isAdmin = ['admin_super', 'admin', 'head_of_it'].includes(session.role);

        const updateData: any = {};

        if (isAdmin || isQuran) {
            if (body.nilai_tes_quran !== undefined) updateData.nilai_tes_quran = body.nilai_tes_quran;
            if (body.catatan_quran !== undefined) updateData.catatan_quran = body.catatan_quran;
            if (session.user_id) updateData.input_by_quran = session.user_id;
            updateData.input_at_quran = new Date();
        }

        if (isAdmin || isWawancara) {
            if (body.nilai_wawancara_santri !== undefined) updateData.nilai_wawancara_santri = body.nilai_wawancara_santri;
            if (body.catatan_santri !== undefined) updateData.catatan_santri = body.catatan_santri;
            if (session.user_id) updateData.input_by_santri = session.user_id;
            updateData.input_at_santri = new Date();
        }

        if (isAdmin || isOrtu) {
            if (body.nilai_wawancara_ortu !== undefined) updateData.nilai_wawancara_ortu = body.nilai_wawancara_ortu;
            if (body.catatan_ortu !== undefined) updateData.catatan_ortu = body.catatan_ortu;
            if (session.user_id) updateData.input_by_ortu = session.user_id;
            updateData.input_at_ortu = new Date();
        }

        // Upsert
        // Check if exists
        const existing = await prisma.nilaiUjian.findFirst({ where: { pendaftar_id: pendaftarId } });

        if (existing) {
            await prisma.nilaiUjian.update({
                where: { id: existing.id },
                data: {
                    ...updateData,
                    updated_at: new Date(),
                }
            });
        } else {
            await prisma.nilaiUjian.create({
                data: {
                    pendaftar_id: pendaftarId,
                    jadwal_ujian_id: assignment?.id, // Link if assignment exists
                    ...updateData,
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("PATCH penguji/nilai error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
