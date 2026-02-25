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
 * Normalizes Calsan 1-5 average to 0-100
 */
export function normalizeCalsanScore(avg1to5: number): number {
    if (!avg1to5) return 0;
    // Scale 1-5 to 20-100 (where 1=20, 5=100) or 0-100 (where 5=100)
    // Most intuitive: avg * 20
    return Math.min(100, Math.max(0, avg1to5 * 20));
}

/**
 * Normalizes Cawalsan A/B/C answers to a score
 */
export function calculateCawalsanScore(detail: any): number {
    if (!detail) return 0;

    // Cawalsan has q1-q12
    const keys = Array.from({ length: 12 }, (_, i) => `q${i + 1}`);
    let totalPoints = 0;
    let counted = 0;

    keys.forEach(key => {
        const val = detail[key];
        if (val) {
            counted++;
            if (val.startsWith('A')) totalPoints += 100;
            else if (val.startsWith('B')) totalPoints += 75;
            else if (val.startsWith('C')) totalPoints += 50;
        }
    });

    return counted > 0 ? totalPoints / counted : 0;
}

/**
 * Recalculates total score and final status for an applicant based on their sub-scores.
 */
export async function recalculateNilaiUjian(pendaftarId: string) {
    const nilai = await prisma.nilaiUjian.findFirst({
        where: { pendaftar_id: pendaftarId }
    });

    if (!nilai) return null;

    const data = nilai as any;

    // 1. Extract & Normalize Raw Scores
    const ak = Number(data.score_akademik) || 0;
    const quran = Number(data.score_quran) || 0;
    const kp = Number(data.score_kepribadian) || 0;
    const ks = Number(data.score_kesiapan) || 0;

    // Calsan (Santri) normalization (assuming value in DB is raw 1-5 if < 10)
    let ws_raw = Number(data.nilai_wawancara_santri) || 0;
    const ws = ws_raw > 10 ? ws_raw : normalizeCalsanScore(ws_raw);

    // Cawalsan (Ortu) score from detail or raw flag
    let wo = 0;
    if (data.detail_cawalsan) {
        wo = calculateCawalsanScore(data.detail_cawalsan);
    } else {
        wo = Number(data.nilai_wawancara_ortu) || 0;
        if (wo > 0 && wo < 10) wo = 75; // Default "Cukup" if only flag 1 is present
    }

    // Wawancara summary = Average of both components
    // If only one is present, we use that one (not /2) to avoid pulling down the score
    let wawancaraTotal = 0;
    if (ws > 0 && wo > 0) {
        wawancaraTotal = (ws + wo) / 2;
    } else {
        wawancaraTotal = ws || wo || 0;
    }

    // 2. Calculate Final Score (Weights in grading.ts)
    const totalScore = calculateFinalScore(ak, quran, wawancaraTotal, kp, ks);

    // 3. Evaluate Status using Matrix Grade
    const grdQuran = evaluateQuranGrade(quran);
    const grdAk = evaluateAkademikGrade(ak);
    const grdKp = evaluateKepribadianGrade(kp);
    const grdWs = evaluateWawancaraGrade(ws); // Wawancara Calsan
    const grdWo = evaluateWawancaraGrade(wo); // Wawancara Cawalsan

    // Matrix decision logic
    const status = determineFinalDecision({
        quran: grdQuran,
        akademik: grdAk,
        kepribadian: grdKp,
        wawancaraCalsan: grdWs,
        wawancaraCawalsan: grdWo
    });

    // 4. Update Database
    return await prisma.nilaiUjian.update({
        where: { id: nilai.id },
        data: {
            total_score: totalScore,
            status_kelulusan: status,
            score_wawancara: wawancaraTotal,
            nilai_wawancara_ortu: wo, // Save the actual score, not just flag
            updated_at: new Date()
        } as any
    });
}
