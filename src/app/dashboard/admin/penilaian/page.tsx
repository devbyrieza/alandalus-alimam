
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming at least Button exists
import Swal from 'sweetalert2';

// Simplified type for MVP.
type Student = {
    id: string;
    nama_lengkap: string;
    jenjang: string;
    nomor_pendaftaran: string;
    nilai_ujian?: {
        total_score: number;
        status_kelulusan: string;
        catatan_kelulusan: string;
        score_quran: number;
        score_wawancara: number;
        nilai_wawancara_santri: number;
        score_akademik: number;
        score_kepribadian: number;
        score_kesiapan: number;
        nilai_wawancara_ortu: number;
    },
    whatsapp_status?: {
        status: string;
        updated_at: string;
        error_message?: string;
    } | null;
};

export default function ExaminerDashboard() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // Form State for Modal
    const [inputType, setInputType] = useState<'quran' | 'wawancara_santri' | 'wawancara_ortu'>('quran');
    const [score, setScore] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [catatan, setCatatan] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [isProcessingQueue, setIsProcessingQueue] = useState(false);
    const [queueStats, setQueueStats] = useState<{ pending: number, sent: number, failed: number } | null>(null);
    const [flushProgress, setFlushProgress] = useState(0);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/pendaftar/list?limit=100'); 
            if (!res.ok) throw new Error('Failed to fetch');
            const json = await res.json();
            setStudents(json.data || []);
            
            // Also fetch stats from cron result (using same secret)
            const statsRes = await fetch('/api/cron/whatsapp?secret=ppdb-alimam-cron-2026');
            const statsJson = await statsRes.json();
            if (statsJson.stats?.queue) {
                setQueueStats({
                    pending: statsJson.stats.queue.pending || 0,
                    sent: statsJson.stats.queue.sent || 0,
                    failed: statsJson.stats.queue.failed || 0
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInput = (student: Student, type: 'quran' | 'wawancara_santri' | 'wawancara_ortu') => {
        setSelectedStudent(student);
        setInputType(type);
        setScore('');
        setGrade('');
        setCatatan('');
    };

    const handleSubmitScore = async () => {
        if (!selectedStudent) return;

        setIsSubmitting(true);
        try {
            const payload = {
                pendaftar_id: selectedStudent.id,
                type: inputType,
                score: score ? parseFloat(score) : undefined,
                grade: grade || undefined,
                details: { catatan },
                examiner_id: 'mock-examiner-id'
            };

            const res = await fetch('/api/penilaian/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to submit');

            Swal.fire('Sukses', 'Nilai berhasil disimpan', 'success');
            setSelectedStudent(null);
            fetchStudents();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal menyimpan nilai', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFlushQueue = async () => {
        try {
            setIsProcessingQueue(true);
            setFlushProgress(0);
            
            let remaining = queueStats?.pending || 0;
            if (remaining === 0) {
                Swal.fire('Info', 'Tidak ada antrean yang perlu diproses', 'info');
                return;
            }

            const totalToProcess = remaining;
            let processedInLoop = 0;

            // Process loop (up to 50 at a time or until empty)
            while (remaining > 0 && processedInLoop < 50) {
                const res = await fetch('/api/cron/whatsapp?secret=ppdb-alimam-cron-2026');
                const data = await res.json();
                
                if (!data.result?.processed) break;
                
                remaining = data.stats?.queue?.pending || 0;
                processedInLoop++;
                setFlushProgress(Math.round((processedInLoop / totalToProcess) * 100));
                
                // Small delay to prevent browser locking
                await new Promise(r => setTimeout(r, 500));
            }

            Swal.fire({
                title: 'Antrean Diproses',
                text: `${processedInLoop} pesan telah dikirim ke Wablas.`,
                icon: 'success'
            });
            fetchStudents();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal memproses antrean', 'error');
        } finally {
            setIsProcessingQueue(false);
            setFlushProgress(0);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard Penilaian</h1>
                <div className="flex gap-2">
                    <Button onClick={() => {
                        // Simple CSV Export implementation logic without heavy library
                        if (students.length === 0) return Swal.fire('Info', 'Tidak ada data', 'info');

                        const headers = ['No Pendaftaran', 'Nama', 'Jenjang', 'Status', 'Nilai Akademik', 'Nilai Quran', 'Nilai Wawancara'];
                        const csvContent = [
                            headers.join(','),
                            ...students.map(s => [
                                s.nomor_pendaftaran,
                                s.nama_lengkap.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
                                s.jenjang,
                                s.nilai_ujian?.status_kelulusan || 'BELUM DINILAI',
                                s.nilai_ujian?.score_akademik || 0,
                                s.nilai_ujian?.score_quran || 0,
                                s.nilai_ujian?.score_wawancara || 0
                            ].map(v => `"${v}"`).join(','))
                        ].join('\n');

                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'rekap_nilai_ujian.csv');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }} variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                        Export Excel (CSV)
                    </Button>
                    <Button onClick={async () => {
                        try {
                            const res = await fetch('/api/penilaian/recalculate', { method: 'POST' });
                            if (!res.ok) throw new Error('Failed');
                            const result = await res.json();
                            Swal.fire('Sukses', `${result.recalculated} data berhasil dihitung ulang`, 'success');
                            fetchStudents();
                        } catch {
                            Swal.fire('Error', 'Gagal menghitung ulang', 'error');
                        }
                    }} variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-50">Hitung Ulang Semua</Button>
                    
                    <Button 
                        onClick={async () => {
                            const result = await Swal.fire({
                                title: 'Siarkan Jadwal?',
                                text: `Sistem akan mencari pendaftar layak yang belum diberi notifikasi jadwal.`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#2563eb',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ya, Siarkan!',
                                cancelButtonText: 'Batal'
                            });

                            if (result.isConfirmed) {
                                try {
                                    setIsBroadcasting(true);
                                    const res = await fetch('/api/admin/notifications/broadcast-availability', { 
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ reset_flags: false })
                                    });
                                    if (!res.ok) throw new Error('Failed');
                                    const data = await res.json();
                                    Swal.fire('Berhasil', `${data.count || 0} pendaftar masuk antrean.`, 'success');
                                    fetchStudents();
                                } catch (error) {
                                    console.error(error);
                                    Swal.fire('Error', 'Gagal memproses broadcast', 'error');
                                } finally {
                                    setIsBroadcasting(false);
                                }
                            }
                        }} 
                        disabled={isBroadcasting}
                        variant="outline" 
                        className="border-blue-600 text-blue-700 hover:bg-blue-50"
                    >
                        {isBroadcasting ? 'Memproses...' : 'Siarkan Jadwal'}
                    </Button>

                    <Button 
                        onClick={handleFlushQueue} 
                        disabled={isProcessingQueue}
                        variant="outline" 
                        className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                    >
                        {isProcessingQueue ? `Mengirim (${flushProgress}%)...` : 'Kirim Antrean Segala'}
                    </Button>

                    <Button onClick={fetchStudents} variant="outline" className="border-gray-300">Refresh Data</Button>
                </div>
            </div>

            {/* Notification Stats Card */}
            {queueStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="text-yellow-800 text-sm font-medium uppercase tracking-wider">Antrean Pending</div>
                        <div className="text-3xl font-bold text-yellow-900">{queueStats.pending}</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <div className="text-green-800 text-sm font-medium uppercase tracking-wider">Berhasil Terkirim</div>
                        <div className="text-3xl font-bold text-green-900">{queueStats.sent}</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <div className="text-red-800 text-sm font-medium uppercase tracking-wider">Gagal/Error</div>
                        <div className="text-3xl font-bold text-red-900">{queueStats.failed}</div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden border">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Daftar Peserta Tes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Daftar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenjang</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Akademik</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Kepribadian</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Kesiapan</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Quran</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Waw. Calsan</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Waw. Cawalsan</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Notif WA</th>
                                <th className="px-6 py-3 text-left text-xs font-black text-stone-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">Loading...</td></tr>
                            ) : students.length === 0 ? (
                                <tr><td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data</td></tr>
                            ) : (
                                students.map(s => (
                                    <tr key={s.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.nomor_pendaftaran}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {s.nama_lengkap.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.jenjang}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.nilai_ujian?.status_kelulusan === 'LULUS' || s.nilai_ujian?.status_kelulusan === 'DITERIMA' ? 'bg-green-100 text-green-800' :
                                                s.nilai_ujian?.status_kelulusan === 'CADANGAN' ? 'bg-yellow-100 text-yellow-800' :
                                                    s.nilai_ujian?.status_kelulusan === 'DITOLAK' ? 'bg-red-100 text-red-800' :
                                                        s.nilai_ujian?.status_kelulusan === 'BELUM LENGKAP' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }`}>
                                                {s.nilai_ujian?.status_kelulusan || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-bold">{s.nilai_ujian?.score_akademik != null ? Number(s.nilai_ujian.score_akademik).toFixed(1) : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-bold">{s.nilai_ujian?.score_kepribadian != null ? Number(s.nilai_ujian.score_kepribadian).toFixed(1) : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-bold">{s.nilai_ujian?.score_kesiapan != null ? Number(s.nilai_ujian.score_kesiapan).toFixed(1) : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-bold">{s.nilai_ujian?.score_quran != null ? Number(s.nilai_ujian.score_quran).toFixed(1) : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-bold">{s.nilai_ujian?.nilai_wawancara_santri != null ? Number(s.nilai_ujian.nilai_wawancara_santri).toFixed(1) : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-bold">{s.nilai_ujian?.nilai_wawancara_ortu != null && Number(s.nilai_ujian.nilai_wawancara_ortu) >= 1 ? (Number(s.nilai_ujian.nilai_wawancara_ortu) > 1 ? Number(s.nilai_ujian.nilai_wawancara_ortu).toFixed(1) : 'Lengkap') : '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {s.whatsapp_status ? (
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    s.whatsapp_status.status === 'sent' ? 'bg-green-100 text-green-800' :
                                                    s.whatsapp_status.status === 'pending' || s.whatsapp_status.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`} title={s.whatsapp_status.error_message || ''}>
                                                    {s.whatsapp_status.status === 'sent' ? 'Terkirim' : 
                                                     s.whatsapp_status.status === 'pending' ? 'Antrean' :
                                                     s.whatsapp_status.status === 'processing' ? 'Proses' : 'Gagal'}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenInput(s, 'quran')} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-2 py-1 rounded">Quran</button>
                                                <button onClick={() => handleOpenInput(s, 'wawancara_santri')} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded">Wawancara</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedStudent(null)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Input Nilai: {inputType === 'quran' ? 'Tes Al-Quran' : 'Wawancara'} - {selectedStudent.nama_lengkap.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
                                </h3>
                                <div className="mt-4 space-y-4">
                                    {inputType === 'quran' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rekomendasi / Grade</label>
                                            <select
                                                value={grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">Pilih Grade</option>
                                                <option value="A">A (Sangat Baik/Lulus)</option>
                                                <option value="B">B (Baik/Lulus)</option>
                                                <option value="C">C (Cukup/Cadangan)</option>
                                                <option value="D">D (Kurang/Gagal)</option>
                                                <option value="E">E (Sangat Kurang)</option>
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Skor Angka (0-100)</label>
                                        <input
                                            type="number"
                                            value={score}
                                            onChange={(e) => setScore(e.target.value)}
                                            placeholder="0-100" // Use placeholder for optional logic
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Catatan</label>
                                        <textarea
                                            value={catatan}
                                            onChange={(e) => setCatatan(e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button
                                    onClick={handleSubmitScore}
                                    disabled={isSubmitting}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Nilai'}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedStudent(null)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
