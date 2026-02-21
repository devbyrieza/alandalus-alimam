"use client";

import { useEffect, useState } from "react";
import {
  User,
  CheckCircle,
  Clock,
  ArrowRight,
  Calendar,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  FileText
} from "lucide-react";
import Link from "next/link";
import ProgressStepper from "@/components/dashboard/ProgressStepper";
import {
  getNextStep,
  formatStatusDisplay,
  type StatusProses
} from "@/lib/access-control";

export default function DashboardPendaftarPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    nama: "",
    nomorPendaftaran: "",
    status: "draft" as StatusProses,
    lastUpdate: new Date().toISOString(),
    pengumuman: null as {
      status_kelulusan: string;
      catatan?: string;
      surat_keputusan_url?: string;
    } | null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session.pendaftar_id) {
          const statusRes = await fetch(`/api/pendaftar/status?pendaftar_id=${session.pendaftar_id}`);
          const statusData = await statusRes.json();

          const fullName = statusData.nama_lengkap || session.full_name || session.name || "Pendaftar";
          const firstName = fullName.split(' ')[0]; // Ambil kata pertama saja

          setData({
            nama: firstName,
            nomorPendaftaran: statusData.nomor_pendaftaran || "-",
            status: statusData.status_proses || "draft",
            lastUpdate: statusData.updated_at || new Date().toISOString(),
            pengumuman: statusData.pengumuman || null
          });
        }
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusInfo = formatStatusDisplay(data.status);
  const nextStep = getNextStep(data.status);

  if (loading) {
    return <div className="animate-pulse flex flex-col gap-4">
      <div className="h-48 bg-stone-200 rounded-3xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-stone-200 rounded-2xl"></div>
        <div className="h-32 bg-stone-200 rounded-2xl"></div>
        <div className="h-32 bg-stone-200 rounded-2xl"></div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Progress Stepper Tracking */}
      <ProgressStepper currentStatus={data.status} />

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-800 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <User className="w-64 h-64" />
        </div>
        <div className="relative z-10 px-8 py-10 md:px-12 md:py-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold border border-white/20">
                Tahun Ajaran 2026/2027
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-100">
                <Clock className="w-3 h-3" />
                Pembaruan: {new Date(data.lastUpdate).toLocaleDateString('id-ID')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight text-white shadow-sm">
              Selamat Datang, <br />
              <span className="text-emerald-200">{data.nama}</span>
            </h1>
            <p className="text-emerald-50 text-lg mb-8 max-w-lg">
              Selamat datang di dashboard pendaftaran. Pantau status seleksi dan lengkapi berkas Anda di sini.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-emerald-100">
                <p className="text-xs text-stone-500 font-bold mb-1">Nomor Pendaftaran</p>
                <p className="font-mono text-xl font-black text-emerald-950 tracking-wider">{data.nomorPendaftaran}</p>
              </div>

              {nextStep && (
                <Link
                  href={nextStep.href}
                  className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-emerald-100 flex items-center gap-3 hover:bg-emerald-50 transition-colors cursor-pointer group"
                >
                  <div>
                    <p className="text-xs font-bold text-stone-500 group-hover:text-emerald-700 transition-colors">Langkah Selanjutnya:</p>
                    <p className="font-bold text-lg text-emerald-950 group-hover:text-emerald-700 transition-colors underline decoration-emerald-500/30 underline-offset-4">{nextStep.action}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Grid */}
      <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-teal-600" />
        Status Pendaftaran
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Status Utama */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${statusInfo.color.replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 ')}`}>
            <ShieldCheck className={`w-6 h-6 ${statusInfo.color}`} />
          </div>
          <p className="text-stone-500 text-sm font-medium mb-1">Status Saat Ini</p>
          <p className={`text-lg font-bold ${statusInfo.color}`}>{statusInfo.label}</p>
        </div>

        {/* Card 2: Pembayaran */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <p className="text-stone-500 text-sm font-medium mb-1">Verifikasi Berkas</p>
          <p className="text-lg font-bold text-stone-800">
            {['docs_verified', 'scheduled', 'tested', 'announced', 'accepted'].includes(data.status)
              ? "Terverifikasi"
              : "Menunggu"}
          </p>
        </div>

        {/* Card 3: Jadwal */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6" />
          </div>
          <p className="text-stone-500 text-sm font-medium mb-1">Jadwal Ujian</p>
          <p className="text-lg font-bold text-stone-800">
            {['scheduled', 'tested', 'announced', 'accepted'].includes(data.status)
              ? "Sudah Terjadwal"
              : "Belum Ada"}
          </p>
        </div>

        {/* Card 4: Hasil */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${data.pengumuman?.status_kelulusan === "Lulus" ? "bg-green-100 text-green-600" :
            data.pengumuman?.status_kelulusan === "Cadangan" ? "bg-yellow-100 text-yellow-600" :
              data.pengumuman?.status_kelulusan === "Tidak Lulus" ? "bg-red-100 text-red-600" :
                "bg-purple-100 text-purple-600"
            }`}>
            <CheckCircle className="w-6 h-6" />
          </div>
          <p className="text-stone-500 text-sm font-medium mb-1">Hasil Seleksi</p>
          <div className="flex flex-col">
            <p className="text-lg font-bold text-stone-800">
              {data.pengumuman ? data.pengumuman.status_kelulusan :
                data.status === 'accepted' ? "Diterima" :
                  data.status === 'announced' ? "Diumumkan" :
                    "Menunggu"}
            </p>
            {data.pengumuman?.surat_keputusan_url && (
              <a
                href={data.pengumuman.surat_keputusan_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1 font-bold inline-flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                Download SK
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Next Action Callout */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-lg">Perlu Bantuan?</h3>
            <p className="text-stone-500">Jika Anda mengalami kendala saat pendaftaran, silakan hubungi panitia via WhatsApp.</p>
          </div>
        </div>
        <a href="https://wa.me/6285111524441" target="_blank" className="px-6 py-3 bg-white border border-stone-200 text-stone-700 font-bold rounded-xl hover:bg-stone-50 transition-colors shadow-sm">
          Hubungi Panitia
        </a>
      </div>
    </div>
  );
}
