"use client";

import { useState, useEffect } from "react";
import { 
    Calendar, 
    Search, 
    Users, 
    Clock, 
    MapPin, 
    Filter,
    Loader2,
    CheckCircle2,
    XCircle,
    Download
} from "lucide-react";

interface Schedule {
    id: string;
    pendaftar: {
        nomor: string;
        nama: string;
        jenjang: string;
    };
    sesi: {
        title: string;
        start: string;
        end: string;
        location: string;
    };
    ustadz: {
        quran: string;
        santri: string;
        ortu: string;
    };
    status: {
        quran: string;
        santri: string;
        ortu: string;
    };
}

export default function MonitoringJadwalPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterJenjang, setFilterJenjang] = useState("ALL");

    useEffect(() => {
        fetchMonitoringData();
    }, []);

    const fetchMonitoringData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/jadwal/monitoring");
            if (res.ok) {
                const json = await res.json();
                setSchedules(json.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch monitoring data", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).replace("Minggu", "Ahad");
    };

    const getStatusIcon = (status: string) => {
        if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-green-500" />;
        if (status === "absent") return <XCircle className="w-4 h-4 text-red-500" />;
        return <Clock className="w-4 h-4 text-blue-400" />;
    };

    const filteredSchedules = schedules.filter(s => {
        const matchesSearch = 
            s.pendaftar.nama.toLowerCase().includes(search.toLowerCase()) ||
            s.pendaftar.nomor.toLowerCase().includes(search.toLowerCase()) ||
            s.ustadz.quran.toLowerCase().includes(search.toLowerCase()) ||
            s.ustadz.santri.toLowerCase().includes(search.toLowerCase()) ||
            s.ustadz.ortu.toLowerCase().includes(search.toLowerCase());
        
        const matchesJenjang = filterJenjang === "ALL" || s.pendaftar.jenjang === filterJenjang;
        
        return matchesSearch && matchesJenjang;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-clay-lg p-8 border border-white/40 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-600/20 text-white">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-ink-900 tracking-tight">Monitoring <span className="text-blue-600">Jadwal Seleksi</span></h1>
                            <p className="text-ink-400 font-bold uppercase text-[10px] tracking-widest mt-1.5 flex items-center gap-2">
                                <Users className="w-3 h-3" /> Rekapitulasi Real-time Peserta & Penguji
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Card */}
            <div className="bg-white rounded-2xl p-4 shadow-clay-sm border border-white/40 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-ink-400" />
                    <input 
                        type="text" 
                        placeholder="Cari nama santri atau ustadz penguji..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border-0 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none font-medium h-12"
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        value={filterJenjang}
                        onChange={(e) => setFilterJenjang(e.target.value)}
                        className="bg-slate-50 border-0 rounded-xl px-4 py-2 text-sm font-bold text-ink-600 focus:ring-2 focus:ring-blue-500/10 outline-none h-12 min-w-[120px]"
                    >
                        <option value="ALL">Semua Jenjang</option>
                        <option value="MTs">MTs</option>
                        <option value="IL">I'dad Lughawi (IL)</option>
                    </select>
                    <button 
                        onClick={fetchMonitoringData}
                        className="px-6 bg-white border border-slate-200 hover:bg-slate-50 text-ink-700 font-bold rounded-xl shadow-sm transition-all h-12 flex items-center gap-2"
                    >
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-3xl shadow-clay-lg overflow-hidden border border-white/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Info Peserta</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Waktu & Sesi</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Penguji Quran</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Wawancara Santri</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Wawancara Ortu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                                        <p className="font-bold text-ink-400">Memuat data monitoring...</p>
                                    </td>
                                </tr>
                            ) : filteredSchedules.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="w-8 h-8 text-slate-200" />
                                        </div>
                                        <p className="font-bold text-ink-400">Tidak ada jadwal yang ditemukan.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSchedules.map((s) => (
                                    <tr key={s.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-ink-950 group-hover:text-blue-600 transition-colors">
                                                    {s.pendaftar.nama.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
                                                </span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
                                                        {s.pendaftar.nomor}
                                                    </span>
                                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${
                                                        s.pendaftar.jenjang === 'MTs' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'
                                                    }`}>
                                                        {s.pendaftar.jenjang}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-ink-800 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                                    {formatDateTime(s.sesi.start)}
                                                </span>
                                                <span className="text-[10px] font-medium text-ink-400 mt-1 flex items-center gap-1.5 pl-5 uppercase tracking-wider">
                                                    <MapPin className="w-3 h-3" />
                                                    {s.sesi.location}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                                                    {getStatusIcon(s.status.quran)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-ink-800">{s.ustadz.quran}</span>
                                                    <span className="text-[9px] font-bold text-ink-400 uppercase tracking-widest">{s.status.quran}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                    {getStatusIcon(s.status.santri)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-ink-800">{s.ustadz.santri}</span>
                                                    <span className="text-[9px] font-bold text-ink-400 uppercase tracking-widest">{s.status.santri}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                                    {getStatusIcon(s.status.ortu)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-ink-800">{s.ustadz.ortu}</span>
                                                    <span className="text-[9px] font-bold text-ink-400 uppercase tracking-widest">{s.status.ortu}</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-clay-sm">
                    <p className="text-[10px] font-black text-ink-400 uppercase tracking-widest mb-2">Total Terjadwal</p>
                    <p className="text-3xl font-black text-ink-900">{filteredSchedules.length} <span className="text-sm text-ink-400 font-bold uppercase">Peserta</span></p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-clay-sm">
                    <p className="text-[10px] font-black text-ink-400 uppercase tracking-widest mb-2">Selesai Quran</p>
                    <p className="text-3xl font-black text-green-600">{filteredSchedules.filter(s => s.status.quran === 'completed').length}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-clay-sm">
                    <p className="text-[10px] font-black text-ink-400 uppercase tracking-widest mb-2">Selesai Wawancara</p>
                    <p className="text-3xl font-black text-indigo-600">{filteredSchedules.filter(s => s.status.santri === 'completed').length}</p>
                </div>
            </div>
        </div>
    );
}
