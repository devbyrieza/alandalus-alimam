import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateAkademikScore, calculateKepribadianScore, calculateKesiapanScore } from '@/lib/grading';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        // 1. Auth Check (Cookie-based)
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("app_session");

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let session;
        try {
            session = JSON.parse(sessionCookie.value);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid Session' }, { status: 401 });
        }

        const body = await req.json();
        // Use pendaftar_id from body (if admin/system) or session (if pendaftar)
        // But for 'ujian/submit' it's usually the pendaftar themselves.
        // Let's verify session.id matches pendaftar_id if provided, or defaults to session.id

        const pendaftar_id = session.role === 'pendaftar' ? session.id : body.pendaftar_id;
        const { type, answers, jenjang } = body;

        if (!pendaftar_id || !type || !answers) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // 2. Calculate Score
        let score = 0;
        let dbFieldScore = '';
        let dbFieldDetail = '';

        if (type === 'akademik') {
            if (!jenjang) return NextResponse.json({ error: 'Jenjang required for Akademik' }, { status: 400 });
            score = calculateAkademikScore(answers, jenjang); // answers: {1: 'A', 2: 'B', ...}
            dbFieldScore = 'score_akademik';
            dbFieldDetail = 'detail_akademik';
        } else if (type === 'kepribadian') {
            score = calculateKepribadianScore(answers);
            dbFieldScore = 'score_kepribadian';
            dbFieldDetail = 'detail_kepribadian';
        } else if (type === 'kesiapan') {
            score = calculateKesiapanScore(answers); // answers: {1: 5, 2: 4, ...}
            dbFieldScore = 'score_kesiapan';
            dbFieldDetail = 'detail_kesiapan';
        } else {
            return NextResponse.json({ error: 'Invalid test type' }, { status: 400 });
        }

        // 3. Save to DB
        // Check if NilaiUjian exists
        let nilai = await prisma.nilaiUjian.findFirst({
            where: { pendaftar_id }
        });

        if (!nilai) {
            nilai = await prisma.nilaiUjian.create({
                data: { pendaftar_id }
            });
        }

        // Update specific fields
        const updated = await prisma.nilaiUjian.update({
            where: { id: nilai.id },
            data: {
                [dbFieldScore]: score,
                [dbFieldDetail]: answers,
                updated_at: new Date()
            }
        });

        return NextResponse.json({ success: true, score, type });

    } catch (error) {
        console.error('Submit API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
