"use client";

import { useState, useEffect } from "react";
import {
  Users, Wallet, FileCheck, Loader2, ArrowUpRight, 
  Calendar as CalendarIcon, ClipboardCheck, TrendingUp, 
  Download, RefreshCw, Search, CheckCircle2, Clock, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserRole } from "@/lib/access-control";

/**
 * ─── ADMIN DASHBOARD PAGE ───
 * Halaman pusat kendali untuk Admin PPDB Al-Imam.
 * Menampilkan statistik real-time, grafik performa jenjang, 
 * dan manajemen antrean verifikasi.
 */

// ─── 1. CONSTANTS & HELPERS ───

const PPDB_DEADLINE = new Date("2026-05-30T23:59:59+07:00");

function getPPDBCountdown() {
  const diff = PPDB_DEADLINE.getTime() - new Date().getTime();
  return diff <= 0 ? 0 : Math.floor(diff / (1000 * 60 * 60 * 24));
}

const JENJANG_LABELS: Record<string, string> = { MTS: "MTs", IL: "IL", SMA: "SMA" };

// ─── 2. INTERNAL COMPONENTS ───

/**
 * StatWidget: Kartu angka statistik yang dinamis dengan dukungan breakdown.
 */
const StatWidget = ({ label, value, icon: Icon, color, trend, breakdown }: any) => {
  const colorMap: any = {
    maroon: "from-maroon-600 to-maroon-700 shadow-maroon-200",
    emerald: "from-emerald-600 to-emerald-700 shadow-emerald-200",
    amber: "from-amber-500 to-amber-600 shadow-amber-200",
    blue: "from-blue-600 to-blue-700 shadow-blue-200",
    purple: "from-purple-600 to-purple-700 shadow-purple-200",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border border-ink-100 shadow-premium-sm hover:shadow-premium-lg transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cream-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-maroon-50 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${colorMap[color] || colorMap.maroon} flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">{trend}</span>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <p className="text-[11px] font-black text-ink-400 uppercase tracking-[0.25em] mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-black text-ink-900 tracking-tighter italic">{value}</h3>
            <span className="text-xs font-bold text-ink-400">Orang</span>
          </div>
        </div>

        {breakdown && (
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-cream-100">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">MTs Putra</span>
                <span className="text-base font-black text-maroon-800 leading-none">{breakdown.mts_l || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">MTs Putri</span>
                <span className="text-base font-black text-pink-500 leading-none">{breakdown.mts_p || 0}</span>
              </div>
            </div>
            <div className="space-y-4 border-l border-cream-100 pl-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">IL Putra</span>
                <span className="text-base font-black text-maroon-800 leading-none">{breakdown.il_l || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">IL Putri</span>
                <span className="text-base font-black text-pink-500 leading-none">{breakdown.il_p || 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── 3. MAIN PAGE COMPONENT ───

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);
  const [stats, setStats] = useState<any>({
    total_pendaftar: 0, sudah_bayar: 0, sudah_isi_data: 0, 
    diterima: 0, cadangan: 0, daftar_ulang: 0, 
    waiting_payment: 0, waiting_docs: 0, stats_per_jenjang: [],
  });

  const [tahunAjaranList, setTahunAjaranList] = useState<any[]>([]);
  const [selectedTA, setSelectedTA] = useState<string>("");

  /**
   * fetchStats: Mengambil data angka terbaru dari API khusus admin.
   */
  const fetchStats = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/stats?tahun_ajaran_id=${id}`);
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error("Gagal mengambil statistik:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      try {
        const [sessionRes, taRes] = await Promise.all([
          fetch("/api/auth/session"),
          fetch("/api/admin/tahun-ajaran")
        ]);
        
        if (sessionRes.ok) {
          const sData = await sessionRes.json();
          setRole(sData.session?.role);
        }
        
        if (taRes.ok) {
          const taData = await taRes.json();
          const list = taData.data || [];
          setTahunAjaranList(list);
          const active = list.find((t: any) => t.is_active) || list[0];
          if (active) setSelectedTA(active.id);
        }
      } catch (e) {
        console.error("Init Error:", e);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (selectedTA) fetchStats(selectedTA);
  }, [selectedTA]);

  // Loading State
  if (loading && stats.total_pendaftar === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-maroon-600" />
        <p className="text-sm font-bold text-slate-400 tracking-widest animate-pulse uppercase">Sinkronisasi Data...</p>
      </div>
    );
  }

  const isAdminSuper = role === "admin_super" || role === "admin";
  const isAdminKeuangan = role === "admin_keuangan";
  const isAdminBerkas = role === "admin_berkas";

  // Helper to extract breakdown data
  const getBreakdown = (type: "total" | "lulus" | "ulang") => {
    const mts = stats.stats_per_jenjang.find((j: any) => j.jenjang === "MTS") || {};
    const il = stats.stats_per_jenjang.find((j: any) => j.jenjang === "IL") || {};

    if (type === "total") {
      return {
        mts_l: mts.pendaftar_putra || 0,
        mts_p: mts.pendaftar_putri || 0,
        il_l: il.pendaftar_putra || 0,
        il_p: il.pendaftar_putri || 0,
      };
    }
    if (type === "lulus") {
      return {
        mts_l: mts.diterima_putra || 0,
        mts_p: mts.diterima_putri || 0,
        il_l: il.diterima_putra || 0,
        il_p: il.diterima_putri || 0,
      };
    }
    if (type === "ulang") {
      return {
        mts_l: mts.ulang_putra || 0,
        mts_p: mts.ulang_putri || 0,
        il_l: il.ulang_putra || 0,
        il_p: il.ulang_putri || 0,
      };
    }
    return null;
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
      
      {/* SECTION: HEADER & FILTER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-maroon-950 tracking-tight mb-2">Dasbor Al Imam</h1>
          <p className="text-sm text-ink-500 font-medium">Pantau perkembangan pendaftaran santri secara langsung.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-cream-200 rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm">
            <CalendarIcon className="w-4 h-4 text-ink-400" />
            <select 
              value={selectedTA} 
              onChange={(e) => setSelectedTA(e.target.value)}
              className="bg-transparent text-[13px] font-bold text-ink-700 focus:outline-none cursor-pointer"
            >
              {tahunAjaranList.map((ta: any) => (
                <option key={ta.id} value={ta.id}>TA {ta.nama}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => fetchStats(selectedTA)}
            className="p-2.5 bg-white border border-cream-200 rounded-xl text-ink-500 hover:text-maroon-600 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* SECTION: HERO BANNER & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                  <Clock className="w-4 h-4 text-maroon-400" />
                  <span>Countdown Penutupan</span>
                </div>
                <h2 className="text-5xl font-black mb-6 tracking-tighter leading-tight italic">
                  {getPPDBCountdown()} Hari Lagi Menuju <span className="text-maroon-400">Penutupan</span>
                </h2>
                <div className="flex items-center gap-12 mt-12">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-white italic">{stats.total_pendaftar}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Pendaftar</span>
                  </div>
                  <div className="w-px h-12 bg-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-maroon-400 italic">{stats.sudah_bayar}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Lunas</span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/admin/pendaftar" className="group shrink-0">
                <div className="w-28 h-28 rounded-full border-2 border-white/10 group-hover:border-maroon-500/50 flex items-center justify-center transition-all duration-500 relative bg-white/5 backdrop-blur-sm">
                  <ArrowUpRight className="w-8 h-8 group-hover:scale-125 transition-transform duration-500 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 bg-linear-to-br from-maroon-800 to-maroon-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col h-full">
              <h4 className="text-2xl font-black mb-3 tracking-tight italic">Ekspor Data</h4>
              <p className="text-maroon-200 text-xs font-medium mb-8 leading-relaxed">
                Unduh rekap pendaftar ke format Excel untuk laporan resmi.
              </p>
              <div className="mt-auto">
                <button className="w-full bg-white text-maroon-950 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-maroon-50 transition-all flex items-center justify-center gap-3 shadow-xl">
                  <Download className="w-4 h-4" /> Unduh Laporan
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white border border-cream-100 rounded-[2.5rem] p-8 shadow-premium-sm flex flex-col justify-center">
            <h4 className="text-[10px] font-black text-ink-400 uppercase tracking-[0.25em] mb-6">Antrean Verifikasi</h4>
            <div className="space-y-5">
              <Link href="/dashboard/admin/verifikasi-pembayaran" className="flex items-center justify-between group">
                <span className="text-xs font-black text-ink-600 group-hover:text-maroon-600 transition-colors uppercase tracking-tight">Keuangan</span>
                <span className="px-3 py-1 rounded-lg bg-gold-50 text-gold-700 text-[11px] font-black border border-gold-100">{stats.waiting_payment}</span>
              </Link>
              <Link href="/dashboard/admin/verifikasi-dokumen" className="flex items-center justify-between group">
                <span className="text-xs font-black text-ink-600 group-hover:text-maroon-600 transition-colors uppercase tracking-tight">Dokumen</span>
                <span className="px-3 py-1 rounded-lg bg-maroon-50 text-maroon-600 text-[11px] font-black border border-maroon-100">{stats.waiting_docs}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: STATS GRID (Dinamis sesuai Role) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* VIEW: ADMIN SUPER / ADMIN */}
        {isAdminSuper && (
          <>
            <StatWidget 
              label="Total Pendaftar" 
              value={stats.total_pendaftar} 
              icon={Users} 
              color="blue" 
              trend="+5% minggu ini" 
              breakdown={getBreakdown("total")}
            />
            <StatWidget 
              label="Lulus Seleksi" 
              value={stats.diterima} 
              icon={CheckCircle2} 
              color="emerald" 
              breakdown={getBreakdown("lulus")}
            />
            <StatWidget 
              label="Sudah Daftar Ulang" 
              value={stats.daftar_ulang} 
              icon={ClipboardCheck} 
              color="amber" 
              breakdown={getBreakdown("ulang")}
            />
          </>
        )}

        {/* VIEW: ADMIN BERKAS */}
        {isAdminBerkas && (
          <>
            <StatWidget label="Total Pendaftar" value={stats.total_pendaftar} icon={Users} color="blue" />
            <StatWidget label="Lengkap Berkas" value={stats.sudah_isi_data} icon={FileCheck} color="purple" />
            <StatWidget label="Menunggu Verifikasi" value={stats.waiting_docs} icon={Clock} color="amber" />
          </>
        )}

        {/* VIEW: ADMIN KEUANGAN */}
        {isAdminKeuangan && (
          <>
            <StatWidget label="Total Pendaftar" value={stats.total_pendaftar} icon={Users} color="blue" />
            <StatWidget label="Sudah Bayar" value={stats.sudah_bayar} icon={Wallet} color="emerald" />
            <StatWidget label="Menunggu Verifikasi" value={stats.waiting_payment} icon={Clock} color="amber" />
          </>
        )}
      </div>

      {/* SECTION: SUMMARY INSIGHTS (Replacing Table) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-maroon-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <TrendingUp className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-maroon-500 rounded-full" />
              Insight Pendaftaran
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sudah Bayar</p>
                  <p className="text-3xl font-black text-white">{stats.sudah_bayar} <span className="text-xs text-slate-500 font-bold">Santri</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sudah Lengkap Berkas</p>
                  <p className="text-3xl font-black text-maroon-400">{stats.sudah_isi_data} <span className="text-xs text-slate-500 font-bold">Santri</span></p>
                </div>
              </div>
              <div className="space-y-6 pl-8 border-l border-white/10">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Menunggu Verifikasi</p>
                  <p className="text-3xl font-black text-white">{stats.waiting_payment + stats.waiting_docs} <span className="text-xs text-slate-500 font-bold">Tugas</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tingkat Kelulusan</p>
                  <p className="text-3xl font-black text-emerald-400">
                    {stats.total_pendaftar > 0 ? Math.round((stats.diterima / stats.total_pendaftar) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-premium-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:-rotate-12 transition-transform duration-700">
            <CheckCircle2 className="w-48 h-48 text-maroon-950" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-ink-900 mb-6 tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-maroon-600 rounded-full" />
              Pemeriksaan Cepat
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-2xl border border-cream-100 hover:border-maroon-200 transition-all cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-maroon-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-ink-900 uppercase tracking-tighter leading-none mb-1">Verifikasi Berkas</p>
                    <p className="text-[10px] text-ink-400 font-bold">Lakukan verifikasi berkas harian</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-ink-900">{stats.waiting_docs}</span>
                  <ChevronRight className="w-4 h-4 text-ink-300" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-2xl border border-cream-100 hover:border-maroon-200 transition-all cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-maroon-600">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-ink-900 uppercase tracking-tighter leading-none mb-1">Konfirmasi Pembayaran</p>
                    <p className="text-[10px] text-ink-400 font-bold">Perbarui status keuangan hari ini</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-ink-900">{stats.waiting_payment}</span>
                  <ChevronRight className="w-4 h-4 text-ink-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
