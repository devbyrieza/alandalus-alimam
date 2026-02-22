import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
    calculateFinalScore,
    determineStatus,
    gradeToScore,
    evaluateAkademikGrade,
    evaluateKepribadianGrade,
    evaluateQuranGrade,
    evaluateWawancaraGrade,
    evaluateStatusGrade,
    determineFinalDecision
} from '@/lib/grading';

async function getSession() {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch {
        return null;
    }
}

export async function POST(req: Request) {
    try {
        // 1. Auth Check (Admins/Examiners only)
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userRole = session.role;
        const isSuper = userRole === 'admin_super' || userRole === 'tim_it';

        const body = await req.json();
        const { pendaftar_id, type } = body;
        const { score, details, examiner_id, grade } = body;

        // RBAC Validation
        if (!isSuper) {
            if (type === 'quran' || type === 'wawancara_santri') {
                if (userRole !== 'penguji_santri' && userRole !== 'penguji_umum') {
                    return NextResponse.json({ error: 'Forbidden: Role restricted' }, { status: 403 });
                }
            } else if (type === 'wawancara_ortu') {
                if (userRole !== 'pewawancara_ortu' && userRole !== 'penguji_umum') {
                    return NextResponse.json({ error: 'Forbidden: Role restricted' }, { status: 403 });
                }
            }
        }

        if (!pendaftar_id || !type) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Determine numeric score to save
        let numericScore = score;
        if (grade && (score === undefined || score === null)) {
            numericScore = gradeToScore(grade);
        }

        // 2. Prepare Data to Update
        const updateData: any = { updated_at: new Date() };

        if (type === 'quran') {
            updateData.score_quran = numericScore;
            updateData.nilai_tes_quran = numericScore; // Legacy field sync
            updateData.catatan_quran = details?.catatan;
            updateData.input_by_quran = examiner_id;
            updateData.input_at_quran = new Date();
        } else if (type === 'wawancara_santri') {
            // Wawancara logic might combine Santri & Ortu?
            // Or simply store them. Let's store individually.
            updateData.nilai_wawancara_santri = numericScore;
            updateData.catatan_santri = details?.catatan;
            updateData.input_by_santri = examiner_id;
            updateData.input_at_santri = new Date();
            // Logic: Update comprehensive 'score_wawancara'?
            // Maybe avg(santri + ortu)? Let's fetch existing to combine.
        } else if (type === 'wawancara_ortu') {
            updateData.nilai_wawancara_ortu = numericScore;
            updateData.catatan_ortu = details?.catatan;
            updateData.input_by_ortu = examiner_id;
            updateData.input_at_ortu = new Date();
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        // 3. Update DB
        // First, verify NilaiUjian exists
        let nilai = await prisma.nilaiUjian.findFirst({ where: { pendaftar_id } });
        if (!nilai) {
            nilai = await prisma.nilaiUjian.create({ data: { pendaftar_id } });
        }

        // Perform Update
        const updated = await prisma.nilaiUjian.update({
            where: { id: nilai.id },
            data: updateData
        });

        // 4. Trigger Final Calculation IF all components are present
        // Need to re-fetch to get latest state
        const current = await prisma.nilaiUjian.findUnique({ where: { id: nilai.id } });

        if (current) {
            const data = current as any;
            const ak = data.score_akademik || 0;
            const quran = data.score_quran || 0;
            const kp = data.score_kepribadian || 0;
            const ks = data.score_kesiapan || 0;

            // Wawancara total = (Santri + Ortu) / 2
            const ws = Number(current.nilai_wawancara_santri) || 0;
            const wo = Number(current.nilai_wawancara_ortu) || 0;
            const wawancaraTotal = (ws + wo) / 2;

            // Is Complete?
            // We calculate score anyway, but status depends on completeness?
            // Let's verify completeness before Final Status.
            // Or calculate running score.

            const totalScore = calculateFinalScore(ak, quran, wawancaraTotal, kp, ks);

            // Evaluasi dengan Matrix Grade Lulus/Cadangan/Tidak Lulus
            const grdQuran = evaluateQuranGrade(quran);
            const grdAk = evaluateAkademikGrade(ak);
            const grdKp = evaluateKepribadianGrade(kp);
            const grdWs = evaluateWawancaraGrade(ws); // Wawancara Calsan
            const grdWo = evaluateWawancaraGrade(wo); // Wawancara Cawalsan

            // Jika belum lengkap wawancara, anggap B biar tidak langsung gagal false-positive
            const wawancaraCalsanFinal = ws > 0 ? grdWs : 'B';
            const wawancaraCawalsanFinal = wo > 0 ? grdWo : 'B';

            const status = determineFinalDecision({
                quran: grdQuran,
                akademik: grdAk,
                kepribadian: grdKp,
                wawancaraCalsan: wawancaraCalsanFinal as 'A' | 'B' | 'C',
                wawancaraCawalsan: wawancaraCawalsanFinal as 'A' | 'B' | 'C'
            });

            await prisma.nilaiUjian.update({
                where: { id: nilai.id },
                data: {
                    total_score: totalScore,
                    status_kelulusan: status,
                    score_wawancara: wawancaraTotal // Save computed logic
                } as any
            });
        }

        return NextResponse.json({ success: true, updated });

    } catch (error) {
        console.error('Examiner Submit Error:', error);
        return NextResponse.json({ error: (error as any).message || 'Internal Server Error' }, { status: 500 });
    }
}
