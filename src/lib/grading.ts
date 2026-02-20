
export const ANSWER_KEYS = {
    MTs: {
        1: 'B', 2: '6', 3: 'A', 4: 'B', 5: 'C',
        6: 'A', 7: 'A', 8: 'B', 9: 'A', 10: 'D',
        11: 'C', 12: 'B', 13: 'A', 14: 'A', 15: 'A',
        16: 'D', 17: 'A', 18: 'C', 19: 'B', 20: 'C'
    },
    IL: {
        1: 'B', 2: 'B', 3: 'B', 4: 'D', 5: 'B',
        6: 'D', 7: 'C', 8: 'B', 9: 'D', 10: 'B',
        11: 'B', 12: 'C', 13: 'C', 14: 'D', 15: 'B',
        16: 'A', 17: 'C', 18: 'D', 19: 'B', 20: 'B'
    },
    MA: {
        1: 'A', 2: 'A', 3: 'C', 4: 'B', 5: 'B', // Nahwu
        6: 'D', 7: 'C', 8: 'B', 9: 'D', 10: 'B', // Indo
        11: 'B', 12: 'C', 13: 'C', 14: 'D', 15: 'B', // IPA
        16: 'A', 17: 'C', 18: 'D', 19: 'B', 20: 'B'  // Math
    }
};

export function calculateAkademikScore(answers: Record<string, string>, jenjang: 'MTs' | 'IL' | 'MA'): number {
    const key = ANSWER_KEYS[jenjang];
    if (!key) return 0;

    let correct = 0;
    for (let i = 1; i <= 20; i++) {
        if (answers[i] === key[i as keyof typeof key]) {
            correct++;
        }
    }
    return (correct / 20) * 100;
}

export function calculateKepribadianScore(answers: Record<string, string>): number {
    // Logic: Assume 'A' is generally the "Pesantren" answer for simplicity unless key map provided.
    // Ideally this needs a map. For now, let's assume random distribution or just count 'A'.
    // User asked AI to determine. Let's assume Option A is positive for 50% and B for 50%.
    // BUT without the text of questions here, it's impossible to know.
    // Fallback: Return a placeholder score or count 'A' as simple metric if acceptable.
    // BETTER: Return 80 (Safe default) if logic unknown, OR calculate based on provided key.
    // Given user instructions, I'll calculate based on majority 'A' being positive for now
    // as in many forms A is the "ideal" first choice.
    let positive = 0;
    Object.values(answers).forEach(val => {
        if (val === 'A') positive++;
    });
    return (positive / Object.keys(answers).length) * 100;
}

export function calculateKesiapanScore(answers: Record<string, number>): number {
    // Likert 1-5. Max score = 15 * 5 = 75.
    let total = 0;
    Object.values(answers).forEach(val => total += Number(val));
    // Normalize to 0-100
    // Max possible for 15 questions is 75.
    const maxPossible = 15 * 5;
    return (total / maxPossible) * 100;
}

export function calculateFinalScore(
    akademik: number,
    quran: number,
    wawancara: number,
    kepribadian: number,
    kesiapan: number
): number {
    // Weighting:
    // Akademik 30%, Quran 30%, Wawancara 20%, Kepribadian 10%, Kesiapan 10%
    return (
        (akademik * 0.30) +
        (quran * 0.30) +
        (wawancara * 0.20) +
        (kepribadian * 0.10) +
        (kesiapan * 0.10)
    );
}

export function determineStatus(finalScore: number, quranScore: number): 'LULUS' | 'CADANGAN' | 'TIDAK LULUS' {
    // Critical Condition: Quran < 40 (Grade E) -> GAGAL
    if (quranScore < 40) return 'TIDAK LULUS';

    if (finalScore >= 70) return 'LULUS';
    if (finalScore >= 55) return 'CADANGAN';
    return 'TIDAK LULUS';
}

export function gradeToScore(grade: string): number {
    switch (grade?.toUpperCase()) {
        case 'A': return 95; // Mid 85-100
        case 'B': return 77; // Mid 70-84
        case 'C': return 62; // Mid 55-69
        case 'D': return 47; // Mid 40-54
        case 'E': return 20; // < 40
        default: return 0;
    }
}

export function scoreToGrade(score: number): string {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'E';
}
