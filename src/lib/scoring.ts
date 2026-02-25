import { prisma } from './prisma';
import {
    calculateFinalScore,
    evaluateAkademikGrade,
    evaluateKepribadianGrade,
    evaluateQuranGrade,
    evaluateWawancaraGrade,
    determineFinalDecision
} from './grading';

/**
 * Recalculates total score and final status for an applicant based on their sub-scores.
 * This should be called after any sub-score (akademik, quran, interview, etc) is updated.
 */
export async function recalculateNilaiUjian(pendaftarId: string) {
    const nilai = await prisma.nilaiUjian.findFirst({
        where: { pendaftar_id: pendaftarId }
    });

    if (!nilai) return null;

    const data = nilai as any;

    // 1. Extract Scores
    const ak = Number(data.score_akademik) || 0;
    const quran = Number(data.score_quran) || 0;
    const kp = Number(data.score_kepribadian) || 0;
    const ks = Number(data.score_kesiapan) || 0;

    // Wawancara total = (Santri + Ortu) / 2
    const ws = Number(data.nilai_wawancara_santri) || 0;
    const wo = Number(data.nilai_wawancara_ortu) || 0;
    const wawancaraTotal = (ws + wo) / 2;

    // 2. Calculate Final Score
    const totalScore = calculateFinalScore(ak, quran, wawancaraTotal, kp, ks);

    // 3. Evaluate Status using Matrix Grade
    const grdQuran = evaluateQuranGrade(quran);
    const grdAk = evaluateAkademikGrade(ak);
    const grdKp = evaluateKepribadianGrade(kp);
    const grdWs = evaluateWawancaraGrade(ws); // Wawancara Calsan
    const grdWo = evaluateWawancaraGrade(wo); // Wawancara Cawalsan

    // Logic: If wawancara is not yet filled but others are, 
    // we use 'B' as default in the status decision to avoid early 'DITOLAK' 
    // unless explicit 'C' is present.
    const wawancaraCalsanFinal = ws > 0 ? grdWs : 'B';
    const wawancaraCawalsanFinal = wo > 0 ? grdWo : 'B';

    const status = determineFinalDecision({
        quran: grdQuran,
        akademik: grdAk,
        kepribadian: grdKp,
        wawancaraCalsan: wawancaraCalsanFinal as 'A' | 'B' | 'C',
        wawancaraCawalsan: wawancaraCawalsanFinal as 'A' | 'B' | 'C'
    });

    // 4. Update Database
    return await prisma.nilaiUjian.update({
        where: { id: nilai.id },
        data: {
            total_score: totalScore,
            status_kelulusan: status,
            score_wawancara: wawancaraTotal,
            updated_at: new Date()
        } as any
    });
}
