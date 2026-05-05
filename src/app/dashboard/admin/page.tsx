"use client";

import { useState, useEffect } from "react";
import {
  Users, Wallet, FileCheck, Loader2, ArrowUpRight, 
  Calendar as CalendarIcon, ClipboardCheck, TrendingUp, 
  Download, RefreshCw, Search, CheckCircle2, Clock
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
 * StatWidget: Kartu angka statistik yang dinamis.
 */
const StatWidget = ({ label, value, icon: Icon, color, trend }: any) => {
  const colorMap: any = {
    maroon: "text-maroon-600 bg-maroon-50",
    emerald: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-600 bg-amber-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${colorMap[color] || colorMap.maroon} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
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

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
      
      {/* SECTION: HEADER & FILTER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Dashboard Al Imam</h1>
          <p className="text-sm text-slate-500 font-medium">Monitoring pendaftaran santri secara real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3 shadow-sm">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedTA} 
              onChange={(e) => setSelectedTA(e.target.value)}
              className="bg-transparent text-[13px] font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              {tahunAjaranList.map((ta: any) => (
                <option key={ta.id} value={ta.id}>TA {ta.nama}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => fetchStats(selectedTA)}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-maroon-600 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* SECTION: HERO BANNER & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase mb-6">
                  <Clock className="w-3.5 h-3.5 text-maroon-400" />
                  <span>Countdown Penutupan</span>
                </div>
                <h2 className="text-5xl font-black mb-4 tracking-tighter leading-tight">
                  {getPPDBCountdown()} Hari Lagi Menuju <span className="text-maroon-400 drop-shadow-sm">Finish</span>
                </h2>
                <div className="flex items-center gap-8 mt-10">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-white">{stats.total_pendaftar}</span>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Pendaftar</span>
                  </div>
                  <div className="w-px h-10 bg-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-maroon-400">{stats.sudah_bayar}</span>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Lunas</span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/admin/pendaftar" className="group">
                <div className="w-32 h-32 rounded-full border-2 border-white/10 hover:border-maroon-500/50 flex items-center justify-center transition-all relative">
                  <ArrowUpRight className="w-10 h-10 group-hover:scale-120 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex-1 bg-gradient-to-br from-maroon-700 to-maroon-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-maroon-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h4 className="text-2xl font-black mb-2 tracking-tight">Export Data</h4>
            <p className="text-maroon-100 text-sm font-medium mb-8 leading-relaxed">Download rekapan pendaftar ke format Excel untuk laporan.</p>
            <button className="w-full bg-white text-maroon-950 py-4.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-maroon-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg">
              <Download className="w-4 h-4" /> Download Report
            </button>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Antrean Cek</h4>
            <div className="space-y-4">
              <Link href="/dashboard/admin/verifikasi-pembayaran" className="flex items-center justify-between group">
                <span className="text-xs font-bold text-slate-600 group-hover:text-maroon-600">Keuangan</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black">{stats.waiting_payment}</span>
              </Link>
              <Link href="/dashboard/admin/verifikasi-dokumen" className="flex items-center justify-between group">
                <span className="text-xs font-bold text-slate-600 group-hover:text-maroon-600">Dokumen</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black">{stats.waiting_docs}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: STATS GRID (Dinamis sesuai Role) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(isAdminSuper || role === "admin_berkas") && (
          <StatWidget label="Total Pendaftar" value={stats.total_pendaftar} icon={Users} color="blue" />
        )}
        {(isAdminSuper || role === "admin_berkas") && (
          <StatWidget label="Lengkap Berkas" value={stats.sudah_isi_data} icon={FileCheck} color="purple" />
        )}
        {isAdminSuper && (
          <StatWidget label="Lulus Seleksi" value={stats.diterima} icon={CheckCircle2} color="emerald" />
        )}
        {isAdminSuper && (
          <StatWidget label="Sudah Daftar Ulang" value={stats.daftar_ulang} icon={ClipboardCheck} color="amber" />
        )}
      </div>

      {/* SECTION: TABEL PERFORMA JENJANG */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Performa Jenjang</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Distribusi Per Sekolah</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Jenjang</th>
                <th className="px-4 py-4 text-center">Pendaftar (L/P/T)</th>
                <th className="px-4 py-4 text-center">Sudah Bayar</th>
                <th className="px-4 py-4 text-center">Lulus</th>
                <th className="px-8 py-4 text-right">Progress Isi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.stats_per_jenjang?.map((item: any, idx: number) => {
                const perc = Math.round((item.pendaftar / item.kuota_total) * 100) || 0;
                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-maroon-700 font-black text-xs border border-slate-200">
                          {item.jenjang.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{JENJANG_LABELS[item.jenjang] || item.jenjang}</p>
                          <p className="text-[10px] text-slate-400 font-bold">AL IMAM</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-xs font-bold">
                        <span className="text-maroon-600">{item.pendaftar_putra}</span>
                        <span className="opacity-20 mx-1">/</span>
                        <span className="text-pink-500">{item.pendaftar_putri}</span>
                        <span className="opacity-20 mx-1">/</span>
                        <span className="text-slate-900">{item.pendaftar}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-black">{item.bayar_total || 0}</span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-black">{item.diterima || 0}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="w-full max-w-[120px] ml-auto">
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div style={{ width: `${perc}%` }} className="h-full bg-maroon-600" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 mt-1 block text-right">{perc}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
