"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  CreditCard,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  FileCheck,
  GraduationCap,
  Download,
  BarChart3,
  MapPin,
  ArrowUpRight,
  MoreHorizontal,
  Wallet,
  FileText
} from "lucide-react";
import Link from "next/link";
import { getMenuItemsForRole, UserRole } from "@/lib/access-control";

// Interfaces (Unchanged)
interface JenjangStat {
  jenjang: string;
  pendaftar: number;
  diterima: number;
}

interface ProvinsiStat {
  provinsi: string;
  jumlah: number;
}

interface DashboardStats {
  total_pendaftar: number;
  belum_bayar: number;
  menunggu_verifikasi_pembayaran: number;
  sudah_bayar: number;
  pembayaran_ditolak: number;
  belum_isi_data: number;
  sudah_isi_data: number;
  belum_upload_dokumen: number;
  menunggu_verifikasi_dokumen: number;
  dokumen_terverifikasi: number;
  dokumen_ditolak: number;
  terjadwal_ujian: number;
  belum_ujian: number;
  sudah_ujian: number;
  hasil_ujian: number;
  diterima: number;
  belum_daftar_ulang: number;
  sudah_daftar_ulang: number;
  stats_per_jenjang: JenjangStat[];
  stats_per_provinsi: ProvinsiStat[];
  stats_gender: { "Laki-laki": number; "Perempuan": number };
  pie_chart_status: {
    diterima: number;
    menunggu: number;
    proses: number;
    ditolak: number;
  };
}

const JENJANG_LABELS: Record<string, string> = {
  MTs: "MTs Al-Imam",
  IL: "I'dad Lughowi (Setara SMA)",
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    total_pendaftar: 0,
    belum_bayar: 0,
    menunggu_verifikasi_pembayaran: 0,
    sudah_bayar: 0,
    pembayaran_ditolak: 0,
    belum_isi_data: 0,
    sudah_isi_data: 0,
    belum_upload_dokumen: 0,
    menunggu_verifikasi_dokumen: 0,
    dokumen_terverifikasi: 0,
    dokumen_ditolak: 0,
    terjadwal_ujian: 0,
    belum_ujian: 0,
    sudah_ujian: 0,
    hasil_ujian: 0,
    diterima: 0,
    belum_daftar_ulang: 0,
    sudah_daftar_ulang: 0,
    stats_per_jenjang: [],
    stats_per_provinsi: [],
    stats_gender: { "Laki-laki": 0, "Perempuan": 0 },
    pie_chart_status: { diterima: 0, menunggu: 0, proses: 0, ditolak: 0 },
  });

  const [activeTahunAjaran, setActiveTahunAjaran] = useState<{ nama: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Session for Role
        const sessionRes = await fetch("/api/auth/session");
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          // Fix: Read from session.role for accuracy
          if (sessionData.session?.role) {
            setRole(sessionData.session.role as UserRole);
          } else if (sessionData.user?.user_metadata?.role) {
            setRole(sessionData.user.user_metadata.role as UserRole);
          }
        }

        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }

        const taResponse = await fetch("/api/admin/tahun-ajaran?active=true");
        if (taResponse.ok) {
          const taData = await taResponse.json();
          const active = Array.isArray(taData.data) ? taData.data.find((t: any) => t.is_active) : taData.data;
          if (active) setActiveTahunAjaran(active);
        }

      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportPembayaran = async (type: "all" | "lunas" | "pending") => {
    try {
      setExporting(type);
      const response = await fetch(`/api/admin/export/pembayaran?type=${type}&format=excel`);
      if (!response.ok) throw new Error("Failed to export");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const typeLabel = type === "all" ? "semua" : type === "lunas" ? "lunas" : "pending";
      a.download = `pembayaran_ppdb_${typeLabel}_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Gagal mengekspor data pembayaran");
    } finally {
      setExporting(null);
    }
  };

  // Helper to check if user can view section
  const canViewKeuangan = !role || role === 'admin_keuangan' || role === 'admin_super' || role === 'admin';
  const canViewBerkas = !role || role === 'admin_berkas' || role === 'admin_super' || role === 'admin';
  const canViewSeleksi = !role || role === 'admin_super' || role === 'admin' || role === 'penguji';

  // Specific role checks for exclusive views
  const isKeuanganOnly = role === 'admin_keuangan';
  const isBerkasOnly = role === 'admin_berkas';
  const isPengujiOnly = role === 'penguji';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-500 mx-auto mb-4" />
          <p className="text-ink-400 font-medium">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  const lunasPersen = stats.total_pendaftar ? Math.round((stats.sudah_bayar / stats.total_pendaftar) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Ultra-Clean Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-success bg-teal-50 text-teal-600 border-teal-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              Tahun Ajaran {activeTahunAjaran?.nama || "2025/2026"}
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 whitespace-nowrap">
            {role === 'admin_keuangan' ? 'Dashboard Keuangan' :
              role === 'admin_berkas' ? 'Dashboard Berkas' :
                'Dashboard Admin'}
          </h1>
          <p className="text-ink-500 mt-2 text-lg">
            Monitor perkembangan PPDB secara real-time.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard/admin/pendaftar" className="btn-primary shadow-teal-glow">
            <Users className="w-5 h-5" />
            <span>Data Pendaftar</span>
          </Link>
          {canViewKeuangan && (
            <button
              onClick={() => handleExportPembayaran("all")}
              className="btn-secondary"
              disabled={exporting !== null}
            >
              {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              <span>Unduh Excel</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Hero KPI Cards - "Clay" Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL PENDAFTAR - Default / Super Admin / Berkas */}
        {(!isKeuanganOnly && !isPengujiOnly) && (
          <div className="card-glass p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-24 h-24 text-teal-600" />
            </div>
            <p className="text-ink-500 font-medium mb-2">Total Pendaftar</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-bold text-ink-900 tracking-tight">
                {stats.total_pendaftar}
              </h2>
              <span className="text-sm font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                Calon Santri
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between text-sm">
              <span className="text-ink-400">Target: 500</span>
              <div className="w-24 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(stats.total_pendaftar / 500) * 100}%` }}></div>
              </div>
            </div>
          </div>
        )}

        {/* KEUANGAN HERO - Admin Keuangan gets a bigger card or first slot */}
        {canViewKeuangan && (
          <div className={`card-glass p-6 relative overflow-hidden group hover:border-teal-200 ${isKeuanganOnly ? 'col-span-2 bg-gradient-to-br from-teal-50 to-white' : ''}`}>
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wallet className="w-32 h-32 text-teal-600" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-teal-100 rounded-2xl text-teal-600">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="badge badge-neutral">Keuangan</span>
            </div>
            <p className="text-ink-500 text-sm font-medium">Pembayaran Lunas</p>
            <h3 className="text-4xl font-bold text-ink-900 mt-1 mb-1">{stats.sudah_bayar} <span className="text-lg text-ink-400 font-normal">Siswa</span></h3>
            <p className="text-sm text-ink-400 mb-4">{lunasPersen}% dari total pendaftar</p>

            <div className="flex gap-2 relative z-10">
              <Link href="/dashboard/admin/verifikasi-pembayaran" className="flex-1 btn-secondary text-xs">
                Verifikasi Pending ({stats.menunggu_verifikasi_pembayaran})
              </Link>
            </div>
          </div>
        )}

        {/* BERKAS HERO - Admin Berkas Focus */}
        {canViewBerkas && (
          <div className={`card-glass p-6 relative overflow-hidden group hover:border-gold-200 ${isBerkasOnly ? 'col-span-2 bg-gold-50/30' : ''}`}>
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileCheck className="w-32 h-32 text-gold-600" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gold-100 rounded-2xl text-gold-600">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="badge badge-neutral">Berkas</span>
            </div>
            <p className="text-ink-500 text-sm font-medium">Dokumen Lengkap</p>
            <h3 className="text-4xl font-bold text-ink-900 mt-1 mb-1">{stats.sudah_isi_data} <span className="text-lg text-ink-400 font-normal">Siswa</span></h3>
            <p className="text-sm text-ink-400 mb-4">Siap diverifikasi & seleksi</p>

            <div className="flex gap-2 relative z-10">
              <Link href="/dashboard/admin/verifikasi-dokumen" className="flex-1 btn-secondary text-xs border-gold-200 text-gold-800 hover:bg-gold-50">
                Cek Dokumen ({stats.menunggu_verifikasi_dokumen})
              </Link>
              {isBerkasOnly && (
                <Link href="/dashboard/admin/pendaftar?filter=belum_upload_dokumen" className="btn-ghost bg-white/50 hover:bg-white text-gold-700">
                  <TrendingUp className="w-4 h-4" /> Cek Data
                </Link>
              )}
            </div>
          </div>
        )}

        {/* SELEKSI CARD - Penguji Focus */}
        {canViewSeleksi && (
          <div className="card-glass p-6 relative overflow-hidden group hover:border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="badge badge-neutral">Seleksi</span>
            </div>
            <p className="text-ink-500 text-sm font-medium">Siswa Diterima</p>
            <h3 className="text-3xl font-bold text-ink-900 mt-1 mb-1 text-blue-600">{stats.diterima}</h3>
            <p className="text-sm text-ink-400 mb-4">Dari {stats.sudah_ujian} peserta ujian</p>

            <div className="flex gap-2">
              <Link href="/dashboard/admin/jadwal-ujian" className="flex-1 btn-ghost text-xs bg-ink-50 hover:bg-blue-50 text-blue-700">
                Jadwal Ujian {stats.terjadwal_ujian > 0 && `(${stats.terjadwal_ujian})`}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Content Grid - Floating Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Detailed Program Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-ink-900">Performa Program Studi</h3>
            <button className="text-sm text-teal-600 font-medium hover:text-teal-700">Lihat Detail</button>
          </div>

          <div className="card-glass p-0 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-ink-100 bg-surface-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-ink-500 uppercase tracking-wider">Jenjang Pendidikan</th>
                  <th className="px-6 py-4 text-xs font-bold text-ink-500 uppercase tracking-wider text-center">Kuota</th>
                  <th className="px-6 py-4 text-xs font-bold text-ink-500 uppercase tracking-wider text-center">Pendaftar</th>
                  <th className="px-6 py-4 text-xs font-bold text-ink-500 uppercase tracking-wider text-center">Diterima</th>
                  <th className="px-6 py-4 text-xs font-bold text-ink-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {(stats.stats_per_jenjang || []).map((item, idx) => (
                  <tr key={idx} className="group hover:bg-surface-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md
                                   ${item.jenjang === 'MTs' ? 'bg-gradient-to-br from-teal-400 to-teal-600' :
                            'bg-gradient-to-br from-gold-400 to-gold-600'}
                                `}>
                          {item.jenjang.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-ink-900">{JENJANG_LABELS[item.jenjang]}</p>
                          <p className="text-xs text-ink-400 font-medium">Reguler • Putra</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center text-ink-500 font-medium">-</td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-ink-900 font-bold bg-surface-200 px-3 py-1 rounded-lg">
                        {item.pendaftar}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">
                        {item.diterima}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Buka
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Regional Stats - Minimalist Map Representation */}
          <div className="flex items-center justify-between pt-4">
            <h3 className="text-xl font-bold text-ink-900">Demografi Pendaftar</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(stats.stats_per_provinsi || []).slice(0, 4).map((item, idx) => (
              <div key={idx} className="card-glass p-4 flex items-center justify-between group hover:border-teal-200 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-surface-100 text-ink-500 rounded-xl group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-ink-700">{item.provinsi}</span>
                </div>
                <span className="text-lg font-bold text-ink-900">{item.jumlah}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions & Status Stack */}
        <div className="space-y-6">
          {/* Quick Action Stack */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-bold text-ink-900 mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
              {canViewKeuangan && (
                <Link href="/dashboard/admin/verifikasi-pembayaran"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 border border-transparent hover:border-ink-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-ink-900">Verifikasi Pembayaran</p>
                      <p className="text-xs text-ink-400">{stats.menunggu_verifikasi_pembayaran} pending</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-300 group-hover:text-amber-500" />
                </Link>
              )}

              {canViewBerkas && (
                <Link href="/dashboard/admin/verifikasi-dokumen"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 border border-transparent hover:border-ink-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-ink-900">Verifikasi Dokumen</p>
                      <p className="text-xs text-ink-400">{stats.menunggu_verifikasi_dokumen} pending</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-300 group-hover:text-blue-500" />
                </Link>
              )}

              {canViewSeleksi && (
                <Link href="/dashboard/admin/jadwal-ujian"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 border border-transparent hover:border-ink-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-ink-900">Atur Jadwal Ujian</p>
                      <p className="text-xs text-ink-400">{stats.belum_ujian} siswa belum dapat jadwal</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-300 group-hover:text-purple-500" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
