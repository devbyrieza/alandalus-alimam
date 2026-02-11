"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  LogOut,
  AlertCircle,
  Loader2,
  ChevronRight,
  Home,
  MessageCircle,
  Phone,
  Heart,
  Star,
  Sparkles,
  Trophy,
  Target,
  Zap,
  Calendar,
  PartyPopper,
  ClipboardList,
  UserCheck,
} from "lucide-react";
import BackToHomeButton from "@/components/common/BackToHomeButton";
import { logoutUser } from "@/lib/auth";
import { hasReachedStatus, StatusProses } from "@/lib/access-control";

interface PendaftarData {
  id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  jenjang: string;
  status_pendaftaran: StatusProses;
  created_at: string;
}

const STATUS_LABELS: Record<
  string,
  { label: string; color: string; icon: any; message: string }
> = {
  draft: {
    label: "Belum Lengkap",
    color: "gray",
    icon: Clock,
    message: "Mari lengkapi data untuk melanjutkan ke tahap berikutnya!",
  },
  waiting_payment: {
    label: "Menunggu Pembayaran",
    color: "yellow",
    icon: Clock,
    message:
      "Tinggal satu langkah lagi! Silakan lakukan pembayaran untuk melanjutkan.",
  },
  payment_verification: {
    label: "Verifikasi Pembayaran",
    color: "blue",
    icon: Clock,
    message:
      "Pembayaran Anda sedang kami verifikasi. Harap menunggu dengan sabar ya!",
  },
  data_lengkap: {
    label: "Data Lengkap",
    color: "teal",
    icon: CheckCircle,
    message: "Luar biasa! Semua data sudah lengkap. Menunggu verifikasi admin.",
  },
  verified: {
    label: "Terverifikasi",
    color: "green",
    icon: CheckCircle,
    message: "Alhamdulillah! Pendaftaran Anda telah diverifikasi.",
  },
  tes_tertulis: {
    label: "Tes Tertulis",
    color: "purple",
    icon: FileText,
    message: "Persiapkan diri untuk tes tertulis. Semangat!",
  },
  lulus_tes_tertulis: {
    label: "Lulus Tes Tertulis",
    color: "green",
    icon: CheckCircle,
    message: "Selamat! Anda lulus tes tertulis. Lanjutkan ke tahap berikutnya!",
  },
  tidak_lulus_tes_tertulis: {
    label: "Tidak Lulus",
    color: "red",
    icon: AlertCircle,
    message:
      "Jangan berkecil hati. Tetap semangat untuk kesempatan berikutnya!",
  },
  scheduled: {
    label: "Dijadwalkan Ujian",
    color: "blue",
    icon: Calendar,
    message: "Ujian Anda telah dijadwalkan. Cek detail jadwal ya!",
  },
  tested: {
    label: "Selesai Ujian",
    color: "teal",
    icon: CheckCircle,
    message: "Ujian selesai! Menunggu hasil pengumuman. Do'akan yang terbaik!",
  },
  accepted: {
    label: "Diterima",
    color: "green",
    icon: Trophy,
    message:
      "Alhamdulillah! Selamat, putra/putri Anda diterima di Ponpes Al-Imam!",
  },
  rejected: {
    label: "Tidak Diterima",
    color: "red",
    icon: AlertCircle,
    message: "Tetap semangat! Masih ada banyak jalan menuju kesuksesan.",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pendaftar, setPendaftar] = useState<PendaftarData | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      // 1. Fetch data from our new API route
      // This will check session automatically and return 401 if not logged in
      const response = await fetch("/api/dashboard/pendaftar-data");

      if (response.status === 401) {
        console.log("❌ No session or unauthorized");
        router.push("/login");
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        console.error("Failed to fetch dashboard data:", response.status);
        alert("Gagal memuat data dashboard. Silakan coba lagi.");
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      if (!result.data) {
        console.error("No pendaftar data in response");
        router.push("/login");
        return;
      }

      console.log("✅ Pendaftar data loaded:", result.data.nama_lengkap);
      setPendaftar(result.data);

    } catch (error) {
      console.error("Error loading dashboard:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm("Apakah Anda yakin ingin keluar?")) {
      return;
    }

    setIsLoggingOut(true);
    const result = await logoutUser();

    if (result.success) {
      router.push("/login");
      router.refresh();
    } else {
      alert("Gagal logout. Silakan coba lagi.");
      setIsLoggingOut(false);
    }
  };

  // Loading state - Fully Responsive
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-brown-50 flex items-center justify-center pt-16 sm:pt-20 px-4">
        <div className="text-center">
          <Loader2 className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 animate-spin text-[var(--color-brown-700)] mx-auto mb-3 sm:mb-4" />
          <p className="text-base xs:text-lg sm:text-lg text-ink-600 font-semibold px-4">
            Memuat data Anda...
          </p>
          <p className="text-xs xs:text-sm sm:text-sm text-ink-500 mt-2 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Mohon tunggu sebentar</span>
          </p>
        </div>
      </div>
    );
  }

  if (!pendaftar) {
    return null;
  }

  const statusInfo = STATUS_LABELS[pendaftar.status_pendaftaran] || {
    label: pendaftar.status_pendaftaran,
    color: "gray",
    icon: Clock,
    message: "Status pendaftaran Anda sedang diproses.",
  };
  const StatusIcon = statusInfo.icon;

  return (
    <main className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-brown-50 pt-14 sm:pt-16 md:pt-20">
      <BackToHomeButton position="top-left" />
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HEADER - CELEBRATORY & WELCOMING ✨ - Fully Responsive
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] text-white py-6 xs:py-7 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb - Responsive */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs xs:text-sm sm:text-sm mb-3 sm:mb-4 text-white/90">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Dashboard Pendaftaran</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              {/* TITLE - PERSONAL & WARM - Responsive */}
              <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-2 text-white flex items-center gap-2 sm:gap-3 leading-tight">
                <Heart className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400 flex-shrink-0" />
                <span>Selamat Datang Kembali!</span>
              </h1>

              {/* PERSONALIZED GREETING - Responsive */}
              <p
                className="text-sm xs:text-base sm:text-lg font-semibold mb-1 leading-tight"
                style={{
                  color: "#FDF6EC",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Assalamu'alaikum,{" "}
                <strong className="text-yellow-300">
                  {pendaftar.nama_lengkap.split(" ")[0]}
                </strong>
              </p>

              <p
                className="text-xs xs:text-sm sm:text-base font-semibold flex items-center gap-1.5 sm:gap-2 leading-tight"
                style={{
                  color: "#FFF9E6",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>
                  Kami senang melihat progres Anda! Terus semangat ya!
                </span>
              </p>
            </div>

            {/* Logout Button - Responsive */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-4 py-2.5 xs:py-3 sm:py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-xs xs:text-sm sm:text-sm font-semibold transition-all duration-300 text-white w-full md:w-auto active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{isLoggingOut ? "Keluar..." : "Keluar"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Fully Responsive */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 xs:py-7 sm:py-8 md:py-12">
        {/* Motivational Banner - DYNAMIC BASED ON STATUS - Responsive */}
        {statusInfo.color !== "green" && statusInfo.color !== "red" && (
          <div className="bg-gradient-to-r from-teal-50 to-surface-100 border-2 border-teal-200 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 mb-5 sm:mb-6 shadow-lg">
            <div className="flex items-start gap-3 xs:gap-3.5 sm:gap-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--color-teal-600)] flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                  <span>Anda Hampir Sampai Tujuan!</span>
                </h3>
                <p className="text-xs xs:text-sm sm:text-sm text-ink-600 leading-relaxed">
                  {statusInfo.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Banner - IF ACCEPTED - Responsive */}
        {statusInfo.color === "green" &&
          pendaftar.status_pendaftaran === "accepted" && (
            <div className="bg-gradient-to-r from-green-50 to-[var(--color-teal-50)] border-2 border-green-300 rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 mb-5 sm:mb-6 shadow-xl">
              <div className="text-center">
                <div className="mb-3 sm:mb-4">
                  <Trophy className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-yellow-500 mx-auto animate-bounce" />
                </div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-green-800 mb-2 sm:mb-3 flex items-center justify-center gap-2 flex-wrap leading-tight">
                  <PartyPopper className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
                  <span>Alhamdulillah! Selamat!</span>
                  <PartyPopper className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-green-700 mb-3 sm:mb-4 leading-relaxed px-4 sm:px-0">
                  {statusInfo.message}
                </p>
                <div className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-3.5 sm:p-4 inline-block">
                  <p className="text-xs xs:text-sm sm:text-sm text-ink-600">
                    <strong className="text-green-700">
                      Langkah selanjutnya:
                    </strong>{" "}
                    Kami akan menghubungi Anda segera untuk informasi lebih
                    lanjut.
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Info Card - Nomor Pendaftaran & Status - Fully Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-surface-200 p-4 xs:p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
          <div className="grid md:grid-cols-2 gap-5 xs:gap-6 sm:gap-6">
            {/* Nomor Pendaftaran - Responsive */}
            <div>
              <p className="text-xs xs:text-sm sm:text-sm text-ink-500 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Nomor Pendaftaran Anda</span>
              </p>
              <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-[var(--color-brown-800)] break-all">
                {pendaftar.nomor_pendaftaran}
              </p>
              <p className="text-[10px] xs:text-xs sm:text-xs text-ink-400 mt-1.5 sm:mt-2 flex items-start gap-1.5">
                <Star className="w-3 h-3 sm:w-3 sm:h-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>
                  Jenjang:{" "}
                  <strong>
                    {pendaftar.jenjang === "MTs"
                      ? "MTs (Setara SMP)"
                      : pendaftar.jenjang === "IL"
                        ? "I'dad Lughowi (Persiapan Bahasa)"
                        : "MA (Setara SMA)"}
                  </strong>
                </span>
              </p>
            </div>

            {/* Status - Responsive */}
            <div>
              <p className="text-xs xs:text-sm sm:text-sm text-ink-500 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Status Pendaftaran Saat Ini</span>
              </p>
              <div
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2 rounded-lg font-bold text-xs xs:text-sm sm:text-sm border-2 ${statusInfo.color === "green"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : statusInfo.color === "red"
                    ? "bg-red-50 border-red-500 text-red-700"
                    : statusInfo.color === "blue"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : statusInfo.color === "yellow"
                        ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                        : statusInfo.color === "teal"
                          ? "bg-teal-50 border-teal-500 text-teal-700"
                          : statusInfo.color === "purple"
                            ? "bg-purple-50 border-purple-500 text-purple-700"
                            : "bg-gray-50 border-gray-500 text-gray-700"
                  }`}
              >
                <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{statusInfo.label}</span>
              </div>
              <p className="text-[10px] xs:text-xs sm:text-xs text-ink-400 mt-2 sm:mt-3 flex items-start gap-1.5">
                <Clock className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5" />
                <span>
                  Terdaftar sejak:{" "}
                  <strong>
                    {new Date(pendaftar.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </strong>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards - Flow PPDB: Pembayaran → Data Pribadi → Upload Dokumen */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
          {/* Step 1: Pembayaran */}
          <Link
            href="/dashboard/pendaftar/pembayaran-pendaftaran"
            className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-surface-200 hover:border-gold-500 p-4 xs:p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--color-gold-100)] flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <CreditCard className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-[var(--color-gold-700)]" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-bold bg-[var(--color-gold-100)] text-[var(--color-gold-700)]">
                Step 1 - Wajib
              </span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Pembayaran</span>
            </h3>
            <p className="text-xs xs:text-sm sm:text-sm text-ink-500 leading-relaxed mb-2 sm:mb-3">
              Bayar biaya pendaftaran Rp 200.000 (Uang Pendaftaran)
            </p>
            <div className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-gold-600)] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>Transfer mudah & aman</span>
            </div>
          </Link>

          {/* Step 2: Data Pribadi */}
          <Link
            href="/dashboard/pendaftar"
            className={`group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-surface-200 p-4 xs:p-5 sm:p-6 transition-all duration-300 active:scale-95 ${!hasReachedStatus(pendaftar.status_pendaftaran, "verified")
              ? "opacity-50 pointer-events-none grayscale cursor-not-allowed"
              : "hover:border-teal-500 hover:-translate-y-1 hover:shadow-xl"
              }`}
            aria-disabled={!hasReachedStatus(pendaftar.status_pendaftaran, "verified")}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--color-teal-100)] flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <User className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-[var(--color-teal-700)]" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-bold bg-[var(--color-teal-100)] text-[var(--color-teal-700)]">
                Step 2
              </span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Data Pribadi</span>
            </h3>
            <p className="text-xs xs:text-sm sm:text-sm text-ink-500 leading-relaxed mb-2 sm:mb-3">
              Lengkapi profil diri, keluarga, dan riwayat pendidikan
            </p>
            <div className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-teal-600)] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>Mudah & cepat diisi</span>
            </div>
          </Link>

          {/* Step 3: Upload Dokumen */}
          <Link
            href="/dashboard/pendaftar/upload-berkas"
            className={`group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-surface-200 p-4 xs:p-5 sm:p-6 transition-all duration-300 sm:col-span-2 md:col-span-1 active:scale-95 ${!hasReachedStatus(pendaftar.status_pendaftaran, "data_completed")
              ? "opacity-50 pointer-events-none grayscale cursor-not-allowed"
              : "hover:border-brown-500 hover:-translate-y-1 hover:shadow-xl"
              }`}
            aria-disabled={!hasReachedStatus(pendaftar.status_pendaftaran, "data_completed")}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--color-brown-100)] flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <FileText className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-[var(--color-brown-700)]" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-bold bg-[var(--color-brown-100)] text-[var(--color-brown-700)]">
                Step 3
              </span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Upload Dokumen</span>
            </h3>
            <p className="text-xs xs:text-sm sm:text-sm text-ink-500 leading-relaxed mb-2 sm:mb-3">
              Upload berkas persyaratan dengan mudah
            </p>
            <div className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-brown-600)] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>Terima file foto/PDF</span>
            </div>
          </Link>

          {/* Step 4: Ujian & Seleksi - Disabled until docs verified */}
          <Link
            href="/dashboard/pendaftar/undangan-seleksi"
            className={`group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-surface-200 p-4 xs:p-5 sm:p-6 transition-all duration-300 active:scale-95 ${!hasReachedStatus(pendaftar.status_pendaftaran, "docs_verified")
              ? "opacity-50 pointer-events-none grayscale cursor-not-allowed"
              : "hover:border-purple-500 hover:-translate-y-1 hover:shadow-xl"
              }`}
            aria-disabled={!hasReachedStatus(pendaftar.status_pendaftaran, "docs_verified")}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <ClipboardList className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-purple-700" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-bold bg-purple-100 text-purple-700">
                Step 4
              </span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Seleksi</span>
            </h3>
            <p className="text-xs xs:text-sm sm:text-sm text-ink-500 leading-relaxed mb-2 sm:mb-3">
              Cek jadwal & ikuti rangkaian tes: Al-Qur'an, Akademik, & Wawancara
            </p>
            <div className="text-[10px] xs:text-xs sm:text-xs text-purple-600 font-semibold flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>Lihat Jadwal & Tes</span>
            </div>
          </Link>

          {/* Step 5: Pengumuman - Disabled until tested */}
          <Link
            href="/dashboard/pendaftar/pengumuman"
            className={`group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-surface-200 p-4 xs:p-5 sm:p-6 transition-all duration-300 active:scale-95 sm:col-span-2 md:col-span-1 ${!hasReachedStatus(pendaftar.status_pendaftaran, "tested")
              ? "opacity-50 pointer-events-none grayscale cursor-not-allowed"
              : "hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl"
              }`}
            aria-disabled={!hasReachedStatus(pendaftar.status_pendaftaran, "tested")}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Trophy className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-bold bg-blue-100 text-blue-700">
                Step 5
              </span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Pengumuman</span>
            </h3>
            <p className="text-xs xs:text-sm sm:text-sm text-ink-500 leading-relaxed mb-2 sm:mb-3">
              Lihat hasil seleksi penerimaan santri baru
            </p>
            <div className="text-[10px] xs:text-xs sm:text-xs text-blue-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>Semoga mendapat hasil terbaik!</span>
            </div>
          </Link>

          {/* Step 6: Daftar Ulang - Disabled until accepted */}
          <Link
            href="/dashboard/pendaftar/daftar-ulang"
            className={`group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-surface-200 p-4 xs:p-5 sm:p-6 transition-all duration-300 active:scale-95 ${!hasReachedStatus(pendaftar.status_pendaftaran, "accepted")
              ? "opacity-50 pointer-events-none grayscale cursor-not-allowed"
              : "hover:border-green-500 hover:-translate-y-1 hover:shadow-xl"
              }`}
            aria-disabled={!hasReachedStatus(pendaftar.status_pendaftaran, "accepted")}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <UserCheck className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-green-700" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-bold bg-green-100 text-green-700">
                Step 6
              </span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Daftar Ulang</span>
            </h3>
            <p className="text-xs xs:text-sm sm:text-sm text-ink-500 leading-relaxed mb-2 sm:mb-3">
              Lakukan registrasi ulang bagi santri yang diterima
            </p>
            <div className="text-[10px] xs:text-xs sm:text-xs text-green-600 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>Tahap Akhir</span>
            </div>
          </Link>
        </div>

        {/* Help Card - WARM & SUPPORTIVE - Fully Responsive */}
        <div className="mt-5 sm:mt-6 bg-gradient-to-r from-teal-50 to-surface-100 border-2 border-teal-200 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 shadow-lg">
          <div className="flex items-start gap-3 xs:gap-3.5 sm:gap-4">
            <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-teal-600)] flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base xs:text-lg sm:text-lg font-bold text-ink-900 mb-1.5 sm:mb-2 leading-tight">
                💬 Kami Selalu Siap Membantu Anda!
              </h3>
              <p className="text-xs xs:text-sm sm:text-sm text-ink-600 mb-2.5 sm:mb-3 leading-relaxed">
                Jangan ragu untuk menghubungi kami kapan saja jika ada kendala
                atau pertanyaan. Tim kami siap membantu dengan sepenuh hati!
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 xs:gap-3 sm:gap-3">
                {/* WhatsApp Button - Responsive */}

                <a
                  href="https://wa.me/6285888871997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-4 py-2.5 xs:py-3 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-xs xs:text-sm sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Chat WhatsApp Admin</span>
                </a>

                {/* Phone Button - Responsive */}

                <a
                  href="tel:+6285888871997"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-4 py-2.5 xs:py-3 sm:py-2 bg-[var(--color-teal-600)] hover:bg-[var(--color-teal-700)] text-white rounded-lg font-semibold text-xs xs:text-sm sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>+62 858-8887-1997</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
