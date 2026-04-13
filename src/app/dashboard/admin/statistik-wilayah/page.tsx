"use client";

import { useState, useEffect } from "react";
import {
    BarChart,
    MapPin,
    Users,
    Building2,
    Loader2,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

// Type definitions for the statistics data
interface CityData {
    name: string;
    total: number;
}

interface ProvinceData {
    total: number;
    cities: CityData[];
}

interface StatisticsData {
    santri: Record<string, ProvinceData>;
    wali: Record<string, ProvinceData>;
}

export default function StatistikWilayahPage() {
    const [data, setData] = useState<StatisticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"santri" | "wali">("santri");
    const [expandedProv, setExpandedProv] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/statistik/wilayah");
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-ink-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-maroon-600" />
                <p className="font-bold">Menganalisis data wilayah...</p>
            </div>
        );
    }

    const currentData = activeTab === "santri" ? data?.santri : data?.wali;
    const sortedProvinces = currentData 
        ? Object.entries(currentData).sort(([, a], [, b]) => b.total - a.total)
        : [];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-clay-lg p-8 border border-white/40 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative flex items-center gap-6">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                        <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Statistik <span className="text-indigo-600">Wilayah</span></h1>
                        <p className="text-slate-500 font-medium italic opacity-80 text-sm">Analisis sebaran daerah asal pendaftar berdasarkan data Alamat di Kartu Keluarga (KK).</p>
                    </div>
                </div>
                
                {/* Info Legend */}
                <div className="mt-8 flex items-start gap-3 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-700 font-bold leading-relaxed">
                    <div className="mt-0.5 bg-indigo-100 p-1 rounded-md shadow-sm">
                        <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <p>Statistik ini diperbarui secara real-time setiap kali pendaftar melengkapi biodata mereka. Data di bawah ini mencakup sebaran di seluruh Provinsi di Indonesia.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab("santri")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${activeTab === "santri" ? "bg-white text-indigo-600 shadow-clay-sm" : "text-slate-400 hover:text-slate-600"
                        }`}
                >
                    <Users className="w-4 h-4" />
                    Sebaran Santri
                </button>
                <button
                    onClick={() => setActiveTab("wali")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${activeTab === "wali" ? "bg-white text-indigo-600 shadow-clay-sm" : "text-slate-400 hover:text-slate-600"
                        }`}
                >
                    <Users className="w-4 h-4" />
                    Sebaran Wali
                </button>
            </div>

            {/* Stats List */}
            <div className="grid grid-cols-1 gap-6">
                {sortedProvinces.map(([provName, provData]: [string, any]) => (
                    <div key={provName} className="bg-white rounded-2xl shadow-clay-md border border-white/40 overflow-hidden group">
                        <div
                            onClick={() => setExpandedProv(expandedProv === provName ? null : provName)}
                            className="p-6 flex items-center justify-between cursor-pointer hover:bg-cream-50/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner border border-indigo-100/50">
                                    <span className="font-black text-xl leading-none">{provData.total}</span>
                                    <span className="text-[10px] font-bold uppercase mt-1.5 opacity-60 tracking-wider">Total</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-extrabold text-slate-800 text-[17px] leading-tight uppercase italic group-hover:text-indigo-600 transition-colors">{provName}</h3>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">{provData.cities.length} Sebaran Wilayah</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col items-end mr-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Presentase</span>
                                    <span className="text-sm font-black text-indigo-600">
                                        {currentData ? ((provData.total / Object.values(currentData).reduce((sum, province) => sum + province.total, 0)) * 100).toFixed(1) : '0.0'}%
                                    </span>
                                </div>
                                <div className={`p-2 rounded-xl transition-colors ${expandedProv === provName ? 'bg-indigo-50 text-indigo-600' : 'text-slate-300 group-hover:bg-slate-50'}`}>
                                    {expandedProv === provName ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                            </div>
                        </div>

                        {expandedProv === provName && (
                            <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="h-px bg-ink-100 mb-6"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {provData.cities.sort((a: any, b: any) => b.count - a.count).map((city: any) => (
                                        <div key={city.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-white hover:border-indigo-100 transition-colors">
                                            <span className="text-[13px] font-bold text-slate-700 truncate mr-2">{city.name}</span>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl shadow-clay-sm border border-indigo-50">
                                                <span className="text-[13px] font-black text-indigo-600">{city.count}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Data</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {sortedProvinces.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-ink-100">
                        <BarChart className="w-16 h-16 text-ink-200 mx-auto mb-4" />
                        <h3 className="text-lg font-black text-ink-900">Belum Ada Data</h3>
                        <p className="text-ink-500 font-medium">Data wilayah akan muncul setelah pendaftar melengkapi biodata.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
