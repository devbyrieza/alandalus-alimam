
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { KESIAPAN_QUESTIONS, KEPRIBADIAN_QUESTIONS, AKADEMIK_MTS } from '@/lib/questions';
import { Timer, CheckCircle, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

type Step = 'instruction' | 'kesiapan' | 'kepribadian' | 'akademik' | 'completed';

export default function StudentTestPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>('instruction');
    const [loading, setLoading] = useState(false);

    const [ansKesiapan, setAnsKesiapan] = useState<Record<number, number>>({});
    const [ansKepribadian, setAnsKepribadian] = useState<Record<number, string>>({});
    const [ansAkademik, setAnsAkademik] = useState<Record<number, string>>({});

    const [timeLeft, setTimeLeft] = useState(3600);
    const [timerActive, setTimerActive] = useState(false);
    const [pendaftarId, setPendaftarId] = useState<string>('');

    useEffect(() => {
        fetch('/api/auth/me').then(res => res.json()).then(data => {
            if (data.pendaftar_id) setPendaftarId(data.pendaftar_id);
        }).catch(() => { });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && timerActive) {
            handleFinishAkademik();
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const submitSection = async (type: string, answers: any) => {
        try {
            setLoading(true);
            const res = await fetch('/api/pendaftar/ujian/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pendaftar_id: pendaftarId,
                    type,
                    answers,
                    jenjang: 'MTs'
                })
            });
            if (!res.ok) throw new Error('Failed to submit');
            return true;
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal menyimpan jawaban. Coba lagi.', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleStart = () => {
        setStep('kesiapan');
        window.scrollTo(0, 0);
    };

    const handleFinishKesiapan = async () => {
        if (Object.keys(ansKesiapan).length < KESIAPAN_QUESTIONS.reduce((acc, s) => acc + s.items.length, 0)) {
            Swal.fire('Perhatian', 'Mohon lengkapi semua jawaban', 'warning');
            return;
        }
        const sent = await submitSection('kesiapan', ansKesiapan);
        if (sent) {
            setStep('kepribadian');
            window.scrollTo(0, 0);
        }
    };

    const handleFinishKepribadian = async () => {
        if (Object.keys(ansKepribadian).length < KEPRIBADIAN_QUESTIONS.length) {
            Swal.fire('Perhatian', `Baru terisi ${Object.keys(ansKepribadian).length} dari ${KEPRIBADIAN_QUESTIONS.length}`, 'warning');
            return;
        }
        const sent = await submitSection('kepribadian', ansKepribadian);
        if (sent) {
            setStep('akademik');
            setTimerActive(true);
            window.scrollTo(0, 0);
        }
    };

    const handleFinishAkademik = async () => {
        setTimerActive(false);
        await submitSection('akademik', ansAkademik);
        setStep('completed');
        window.scrollTo(0, 0);
    };

    // --- RENDERERS ---

    if (step === 'instruction') {
        return (
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">Tes Seleksi Online PPDB</h2>
                    <div className="space-y-4 text-gray-700">
                        <p>Ahlan wa Sahlan. Anda akan mengikuti rangkaian tes online yang terdiri dari:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Tes Kesiapan (15 Soal)</strong>: Skala sikap. Tidak ada benar/salah.</li>
                            <li><strong>Tes Kepribadian (100 Soal)</strong>: Memilih kecenderungan sikap.</li>
                            <li><strong>Tes Akademik (20 Soal)</strong>: PAI, Bahasa, IPA, Matematika. <strong>Waktu 60 Menit</strong>.</li>
                        </ul>
                        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-4">
                            <h4 className="font-bold flex items-center gap-2 text-yellow-800"><AlertCircle className="w-4 h-4" /> Perhatian</h4>
                            <p className="text-sm text-yellow-700">Pastikan koneksi internet stabil. Jangan refresh halaman saat mengerjakan Tes Akademik.</p>
                        </div>
                        <Button onClick={handleStart} className="w-full mt-6">Mulai Tes</Button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'kesiapan') {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-xl font-bold mb-4">Tes Kesiapan Belajar</h2>
                {KESIAPAN_QUESTIONS.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-sm border mb-6 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b font-bold text-gray-800">{section.section}</div>
                        <div className="p-6 space-y-6">
                            {section.items.map((q) => (
                                <div key={q.id} className="border-b pb-4 last:border-0 last:pb-0">
                                    <p className="mb-3 font-medium text-gray-800">{q.text}</p>
                                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                                        {[1, 2, 3, 4, 5].map(val => (
                                            <label key={val} className={`cursor-pointer border p-3 rounded-md flex-1 text-center hover:bg-slate-50 transition-colors ${ansKesiapan[q.id] === val ? 'bg-green-100 border-green-500 font-bold text-green-700' : 'border-gray-200'}`}>
                                                <input type="radio" name={`k-${q.id}`} value={val} className="hidden"
                                                    onChange={() => setAnsKesiapan(p => ({ ...p, [q.id]: val }))}
                                                />
                                                <span className="block text-lg">{val}</span>
                                                <span className="text-xs text-gray-500">{val === 1 ? 'Sgt Tidak' : val === 5 ? 'Sangat Ya' : ''}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="sticky bottom-4 z-10">
                    <Button onClick={handleFinishKesiapan} disabled={loading} className="w-full shadow-lg">
                        {loading ? 'Menyimpan...' : 'Lanjut ke Tes Kepribadian'}
                    </Button>
                </div>
            </div>
        );
    }

    if (step === 'kepribadian') {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-xl font-bold mb-4">Tes Kepribadian (100 Soal)</h2>
                <p className="mb-4 text-sm text-gray-600">Pilihlah jawaban yang paling menggambarkan diri Anda.</p>
                <div className="space-y-4 mb-6">
                    {KEPRIBADIAN_QUESTIONS.slice(0, 100).map((q) => (
                        <div key={q.id} className="bg-white p-4 rounded-lg border shadow-sm">
                            <p className="font-medium mb-3 text-gray-800"><span className="text-gray-400 mr-2">{q.id}.</span> {q.text}</p>
                            <div className="grid grid-cols-1 gap-3">
                                {q.options?.map(opt => (
                                    <div key={opt.value}
                                        onClick={() => setAnsKepribadian(p => ({ ...p, [q.id]: opt.value }))}
                                        className={`cursor-pointer p-3 border rounded-md hover:bg-slate-50 transition-colors ${ansKepribadian[q.id] === opt.value ? 'bg-blue-100 border-blue-500 text-blue-900' : 'border-gray-200'}`}
                                    >
                                        <span className="font-bold mr-2 bg-white border rounded px-2 py-0.5 text-xs text-gray-500">{opt.value}</span> {opt.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Button onClick={handleFinishKepribadian} disabled={loading} className="w-full">
                    {loading ? 'Menyimpan...' : 'Lanjut ke Tes Akademik'}
                </Button>
            </div>
        );
    }

    if (step === 'akademik') {
        return (
            <div className="max-w-4xl mx-auto p-6 pb-32">
                {/* Floating Timer */}
                <div className="fixed top-20 right-4 md:right-10 bg-white border shadow-lg rounded-full px-4 py-2 z-50 flex items-center gap-2 text-red-600 font-bold font-mono text-xl animate-pulse">
                    <Timer className="w-5 h-5" /> {formatTime(timeLeft)}
                </div>

                <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-4">Tes Akademik</h2>
                    {AKADEMIK_MTS.map((q) => (
                        <div key={q.id} className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="font-medium mb-4 text-lg text-gray-900">
                                <span className="font-bold mr-2 text-gray-400">{q.id}.</span> {q.text}
                            </div>
                            <div className="space-y-2">
                                {q.options?.map(opt => (
                                    <div key={opt.value}
                                        onClick={() => setAnsAkademik(p => ({ ...p, [q.id]: opt.value }))}
                                        className={`cursor-pointer p-4 border rounded-md hover:bg-slate-50 transition-colors ${ansAkademik[q.id] === opt.value ? 'bg-indigo-100 border-indigo-500 text-indigo-900 shadow-sm ring-1 ring-indigo-500' : 'border-gray-200'}`}
                                    >
                                        <span className="font-bold mr-3 inline-block w-6 text-center bg-gray-100 rounded text-gray-600">{opt.value}</span>
                                        {opt.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <span className="text-sm text-gray-500 hidden sm:inline">Pastikan semua jawaban terisi sebelum mengirim.</span>
                        <Button onClick={handleFinishAkademik} disabled={loading} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 px-8 py-6 text-lg">
                            {loading ? 'Mengirim Jawaban...' : 'Selesai & Kumpulkan'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'completed') {
        return (
            <div className="max-w-lg mx-auto p-12 text-center mt-10">
                <div className="bg-white rounded-2xl shadow-lg border p-10">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Alhamdulillah</h2>
                    <p className="text-gray-600 mb-8">Rangkaian tes online telah selesai. Data jawaban Anda sudah kami simpan. Silakan menunggu informasi selanjutnya melalui WhatsApp atau pantau Dashboard secara berkala.</p>
                    <Button onClick={() => router.push('/dashboard/pendaftar')} variant="outline" className="w-full">Kembali ke Dashboard</Button>
                </div>
            </div>
        );
    }

    return null;
}
