"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// â”€â”€â”€ ICONS â”€â”€â”€
import {
  User,
  CheckCircle,
  Clock,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  FileText,
  Target } from "lucide-react";

// â”€â”€â”€ COMPONENTS & UTILS â”€â”€â”€
import ProgressTracker from "./components/ProgressTracker";
import {
  getNextStep,
  formatStatusDisplay,
  StatusProses } from "@/lib/access-control";

/**
 * DashboardPendaftarPage
 * Template Demo Version.
 */
export default function DashboardPendaftarPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    nama: "Pendaftar",
    nomorPendaftaran: "-",
    status: "draft" as StatusProses,
    tipePendaftaran: "",
    lastUpdate: new Date().toISOString(),
    schedulesAvailable: false,
    pengumuman: null as any });

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Session invalid");
        const session = await sessionRes.json();

        if (session.pendaftar_id) {
          const statusRes = await fetch(
            `/api/pendaftar/status?pendaftar_id=${session.pendaftar_id}`,
          );
          if (!statusRes.ok) throw new Error("Sync failed");
          const statusData = await statusRes.json();

          setData({
            nama: (statusData.nama_lengkap || "Pendaftar").split(" ")[0],
            nomorPendaftaran: statusData.nomor_pendaftaran || "-",
            status: statusData.status_proses || "draft",
            tipePendaftaran: statusData.tipe_pendaftaran || "",
            lastUpdate: statusData.updated_at || new Date().toISOString(),
            schedulesAvailable: !!statusData.schedules_available,
            pengumuman: statusData.pengumuman || null });
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const statusInfo = formatStatusDisplay(data.status);
  const nextStep = getNextStep(data.status, data.tipePendaftaran);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <ProgressTracker currentStatus={data.status} />

      <HeroBanner
        nama={data.nama}
        nomorPendaftaran={data.nomorPendaftaran}
        lastUpdate={data.lastUpdate}
      />

      {nextStep && <GuidedActionCard nextStep={nextStep} />}

      <StatusGrid
        status={data.status}
        statusLabel={statusInfo.label}
        pengumuman={data.pengumuman}
      />

      <SupportCenter />
    </div>
  );
}

// â”€â”€â”€ INTERNAL COMPONENTS â”€â”€â”€

function HeroBanner({ nama, nomorPendaftaran, lastUpdate }: any) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#550000] via-[#450000] to-[#300000] text-white p-6 sm:p-8 shadow-lg shadow-[#550000]/15 border border-white/10">
      {/* 3D Geometric Background Shapes (OMI Exact) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ddc192]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-3xl rotate-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ddc192]">
              SPMB Tahun Ajaran 2027/2028
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Selamat datang,</span>
            <span className="text-[#ddc192] underline decoration-[#ddc192]/40 underline-offset-4">
              {nama.split(" ")[0]}!
            </span>
            <span className="inline-block">👋</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-200/90 font-normal leading-relaxed">
            Berikut rangkuman informasi yang dapat membantu Anda memantau proses seleksi pendaftaran santri baru.
          </p>
        </div>

        {/* Registration ID Pill */}
        <div className="w-full md:w-auto bg-black/25 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/15 text-left md:text-right shrink-0">
          <p className="text-[10px] font-extrabold uppercase text-[#ddc192] tracking-wider mb-0.5">
            Nomor Pendaftaran
          </p>
          <p className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight">
            {nomorPendaftaran}
          </p>
        </div>
      </div>
    </div>
  );
}

function GuidedActionCard({ nextStep }: any) {
  return (
    <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border-2 border-primary-100 shadow-2xl shadow-primary/30  shadow-primary/5 overflow-hidden group">
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="bg-secondary-400 p-6 sm:p-5 md:p-8 flex flex-col items-center justify-center text-primary-950 min-w-[200px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
            Langkah
          </p>
          <p className="text-2xl sm:text-3xl font-black">BERIKUTNYA</p>
        </div>
        <div className="flex-1 p-6 sm:p-5 md:p-8 space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-primary-950 mb-2">
              Apa yang harus saya lakukan sekarang?
            </h2>
            <p className="text-base sm:text-lg text-ink-600 font-medium italic">
              "Silakan klik tombol untuk{" "}
              <span className="text-primary-700 font-black not-italic">
                {nextStep.action.toLowerCase()}
              </span>
              ."
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={nextStep.href}
              className="px-6 sm:px-6 md:px-10 py-4 sm:py-5 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl font-black uppercase text-xs sm:text-sm shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group/btn w-full sm:w-auto justify-center"
            >
              Mulai Sekarang{" "}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusGrid({ status, statusLabel, pengumuman }: any) {
  const isFinalStatus = ["announced", "accepted", "rejected", "enrolled", "enrolled_full"].includes(status);
  const isTested = ["tested", "announced", "accepted", "enrolled"].includes(status);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      
      {/* Card 1: Total / Status Pendaftaran (Maroon Accent - OMI Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between border-b-4 border-b-[#550000] hover:shadow-md transition-all">
        <div>
          <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            Status Pendaftaran
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-[#550000] tracking-tight mb-2">
            {statusLabel}
          </h3>
        </div>
        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <span>📋</span>
          <span>Tahap seleksi berkas & administrasi</span>
        </div>
      </div>

      {/* Card 2: Ujian Seleksi (Green Emerald Accent - OMI Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between border-b-4 border-b-[#16A34A] hover:shadow-md transition-all">
        <div>
          <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            Ujian & Wawancara Seleksi
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
            {isTested ? "Selesai Mengikuti Tes" : "Menunggu Jadwal Ujian"}
          </h3>
        </div>
        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <span>✔</span>
          <span>{isTested ? "Semua ujian telah terlaksana" : "Silakan pantau jadwal ujian seleksi"}</span>
        </div>
      </div>

      {/* Card 3: Hasil Akhir (Amber / Krem Emas Accent - OMI Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between border-b-4 border-b-[#ddc192] hover:shadow-md transition-all">
        <div>
          <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            Hasil Keputusan Seleksi
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
            {pengumuman && isFinalStatus ? pengumuman.status_kelulusan : "Menunggu Pengumuman"}
          </h3>
        </div>
        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
          <span>🕒</span>
          <span>Keputusan resmi panitia SPMB</span>
        </div>
      </div>

    </div>
  );
}

function SupportCenter() {
  return (
    <div className="bg-primary-950 text-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-center md:text-left">
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary-200">
              PUSAT BANTUAN SPMB
            </span>
          </div>
          <h3 className="font-black text-2xl sm:text-3xl md:text-4xl font-display leading-tight">
            Butuh Bantuan? <br />
            <span className="text-secondary-400">Hubungi Tim Kami!</span>
          </h3>
          <p className="text-primary-100 text-sm sm:text-base font-medium opacity-80 max-w-xl">
            Jangan ragu untuk bertanya. Tim kami siap membantu Anda menyelesaikan
            pendaftaran dengan lancar.
          </p>
        </div>
        <div className="w-full md:w-auto shrink-0 mt-4 md:mt-0">
          <a
            href="https://wa.me/6285111524441"
            target="_blank"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-secondary-400 text-primary-950 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-secondary-300 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 w-full"
          >
            Chat di WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ HELPERS â”€â”€â”€

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-vh-50 p-20">
      <Clock className="w-10 h-10 animate-spin text-primary-600" />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="p-20 text-center text-red-600 font-bold bg-white rounded-4xl border border-red-100 shadow-2xl shadow-primary/30 ">
      {message}
    </div>
  );
}

