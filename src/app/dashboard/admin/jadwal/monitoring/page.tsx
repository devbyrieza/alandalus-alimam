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
    const [viewMode, setViewMode] = useState<"flat" | "grouped" | "santri">("flat");
    const [showPast, setShowPast] = useState(false);

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
        
        const isPast = new Date(s.sesi.end).getTime() < new Date().getTime();
        const matchesPast = showPast || !isPast;

        return matchesSearch && matchesJenjang && matchesPast;
    }).sort((a, b) => new Date(a.sesi.start).getTime() - new Date(b.sesi.start).getTime());

    const getGroupedSchedules = () => {
        const groups: Record<string, { role: string; schedule: Schedule }[]> = {};

        filteredSchedules.forEach(s => {
            const examiners = [
                { name: s.ustadz.quran, role: "Quran" },
                { name: s.ustadz.santri, role: "W. Santri" },
                { name: s.ustadz.ortu, role: "W. Ortu" }
            ];

            examiners.forEach(ext => {
                const name = ext.name && ext.name !== "-" ? ext.name : "Belum Ditentukan";
                if (!groups[name]) groups[name] = [];
                groups[name].push({ role: ext.role, schedule: s });
            });
        });

        // Sort groups by the earliest session in each group
        return Object.keys(groups)
            .map(name => ({
                name,
                items: groups[name],
                earliestSession: Math.min(...groups[name].map(i => new Date(i.schedule.sesi.start).getTime()))
            }))
            .sort((a, b) => {
                // Keep "Belum Ditentukan" at the end regardless of time
                if (a.name === "Belum Ditentukan") return 1;
                if (b.name === "Belum Ditentukan") return -1;
                return a.earliestSession - b.earliestSession;
            });
    };

    const getGroupedBySantri = () => {
        const groups: Record<string, Schedule[]> = {};

        filteredSchedules.forEach(s => {
            const key = `${s.pendaftar.nama} (${s.pendaftar.nomor})`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(s);
        });

        return Object.keys(groups)
            .map(name => ({
                name,
                items: groups[name],
                earliestSession: Math.min(...groups[name].map(s => new Date(s.sesi.start).getTime()))
            }))
            .sort((a, b) => a.earliestSession - b.earliestSession);
    };

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
                <div className="flex flex-wrap items-center gap-3">
                    <select 
                        value={filterJenjang}
                        onChange={(e) => setFilterJenjang(e.target.value)}
                        className="flex-1 md:flex-none bg-slate-50 border-0 rounded-xl px-4 py-2 text-sm font-bold text-ink-600 focus:ring-2 focus:ring-blue-500/10 outline-none h-12 min-w-[140px]"
                    >
                        <option value="ALL">Semua Jenjang</option>
                        <option value="MTs">MTs</option>
                        <option value="IL">I'dad Lughawi (IL)</option>
                    </select>
                    <button 
                        onClick={fetchMonitoringData}
                        className="flex-1 md:flex-none px-4 bg-white border border-slate-200 hover:bg-slate-50 text-ink-700 font-bold rounded-xl shadow-sm transition-all h-12 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        Refresh
                    </button>
                    <div className="flex-1 md:flex-none flex bg-slate-100 p-1 rounded-xl h-12 overflow-x-auto min-w-fit no-scrollbar">
                        <button 
                            onClick={() => setViewMode("flat")}
                            className={`px-4 rounded-lg text-xs font-black transition-all ${viewMode === "flat" ? "bg-white text-blue-600 shadow-sm" : "text-ink-400 hover:text-ink-600"}`}
                        >
                            Flat List
                        </button>
                        <button 
                            onClick={() => setViewMode("grouped")}
                            className={`px-4 rounded-lg text-xs font-black transition-all ${viewMode === "grouped" ? "bg-white text-blue-600 shadow-sm" : "text-ink-400 hover:text-ink-600"}`}
                        >
                            Per Penguji
                        </button>
                        <button 
                            onClick={() => setViewMode("santri")}
                            className={`px-4 rounded-lg text-xs font-black transition-all ${viewMode === "santri" ? "bg-white text-blue-600 shadow-sm" : "text-ink-400 hover:text-ink-600"}`}
                        >
                            Per Santri
                        </button>
                    </div>
                    <button 
                        onClick={() => setShowPast(!showPast)}
                        className={`flex-1 md:flex-none px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border h-12 whitespace-nowrap ${
                            showPast 
                            ? "bg-amber-50 border-amber-200 text-amber-600 shadow-sm" 
                            : "bg-white border-slate-200 text-ink-400 hover:text-ink-600 shadow-sm"
                        }`}
                    >
                        {showPast ? "Lalu" : "Lampau"}
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="space-y-6">
                {loading ? (
                    <div className="bg-white rounded-3xl shadow-clay-lg p-24 text-center border border-white/40">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                        <p className="font-bold text-ink-400">Memuat data monitoring...</p>
                    </div>
                ) : filteredSchedules.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-clay-lg p-24 text-center border border-white/40">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-slate-200" />
                        </div>
                        <p className="font-bold text-ink-400">Tidak ada jadwal yang ditemukan.</p>
                    </div>
                ) : viewMode === "flat" ? (
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
                                    {filteredSchedules.map((s) => (
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
                                                    <span className="text-[10px] font-medium text-link-400 mt-1 flex items-center gap-1.5 pl-5 uppercase tracking-wider">
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : viewMode === "grouped" ? (
                    <div className="space-y-8">
                        {getGroupedSchedules().map((group) => (
                            <div key={group.name} className="bg-white rounded-3xl shadow-clay-m border border-white/40 overflow-hidden">
                                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-lg font-black text-ink-900">{group.name} <span className="text-blue-600">({group.items.length})</span></h2>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-ink-400">Jadwal Penguji</span>
                                </div>
                                <div className="p-0">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/30">
                                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Nama Santri</th>
                                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Peran Penguji</th>
                                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100">Waktu & Lokasi</th>
                                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-ink-400 border-b border-slate-100 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-xs">
                                            {group.items.map((item, idx) => (
                                                <tr key={`${item.schedule.id}-${idx}`} className="hover:bg-blue-50/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-ink-900">{item.schedule.pendaftar.nama}</span>
                                                            <span className="text-[10px] text-ink-400 font-bold uppercase">{item.schedule.pendaftar.nomor} • {item.schedule.pendaftar.jenjang}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-0.5 rounded-full font-black text-[9px] uppercase tracking-wider ${
                                                            item.role === 'Quran' ? 'bg-orange-100 text-orange-600' :
                                                            item.role === 'W. Santri' ? 'bg-indigo-100 text-indigo-600' :
                                                            'bg-emerald-100 text-emerald-600'
                                                        }`}>
                                                            {item.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-ink-700">{formatDateTime(item.schedule.sesi.start)}</span>
                                                            <span className="text-[10px] text-ink-400 uppercase tracking-tight">{item.schedule.sesi.location}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex justify-center">
                                                            {getStatusIcon(
                                                                item.role === 'Quran' ? item.schedule.status.quran :
                                                                item.role === 'W. Santri' ? item.schedule.status.santri :
                                                                item.schedule.status.ortu
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {getGroupedBySantri().map((group) => (
                            <div key={group.name} className="bg-white rounded-3xl shadow-clay-m border border-white/40 overflow-hidden flex flex-col">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-5 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black leading-tight">{group.name.split(' (')[0]}</h2>
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{group.name.split(' (')[1].replace(')', '')} • {group.items[0].pendaftar.jenjang}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 space-y-4">
                                    {group.items.map((s, idx) => (
                                        <div key={`${s.id}-${idx}`} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                                                <span className="text-xs font-black text-ink-900">{formatDateTime(s.sesi.start)}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {/* Quran */}
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <span className="font-bold text-ink-400">PENGUJI QURAN</span>
                                                    <div className="text-right">
                                                        <p className="font-black text-ink-900">{s.ustadz.quran}</p>
                                                        <p className="text-[9px] font-bold text-indigo-600">{s.status.quran.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                {/* Santri */}
                                                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/50">
                                                    <span className="font-bold text-ink-400">WAWANCARA SANTRI</span>
                                                    <div className="text-right">
                                                        <p className="font-black text-ink-900">{s.ustadz.santri}</p>
                                                        <p className="text-[9px] font-bold text-indigo-600">{s.status.santri.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                {/* Ortu */}
                                                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/50">
                                                    <span className="font-bold text-ink-400">WAWANCARA ORTU</span>
                                                    <div className="text-right">
                                                        <p className="font-black text-ink-900">{s.ustadz.ortu}</p>
                                                        <p className="text-[9px] font-bold text-indigo-600">{s.status.ortu.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
