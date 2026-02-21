"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Sparkles,
  PartyPopper,
  Copy,
  Check,
  CreditCard,
  IdCard,
  AlertCircle,
  AlertTriangle,
  Loader2,
  ArrowRight,
  School,
} from "lucide-react";

function DaftarSuksesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil data dari query params
  const nomor_pendaftaran = searchParams.get("nomor_pendaftaran") || "";
  const nama_lengkap = searchParams.get("nama_lengkap") || "";
  const jenjang = searchParams.get("jenjang") || "";
  const jenis_kelamin = searchParams.get("jenis_kelamin") || "";
  const nik = searchParams.get("nik") || "";

  const [copiedField, setCopiedField] = useState<"nomor" | "nik" | null>(null);
  // Clear sessionStorage saat sukses (data tidak diperlukan lagi)
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pendaftaran_form");
    }
  }, []);

  // Copy to clipboard
  const handleCopy = (text: string, field: "nomor" | "nik") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-lg w-full card-wablas p-8">
      {/* Success Icon */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <CheckCircle2 className="w-24 h-24 text-teal-500 mx-auto animate-bounce" />
          <Sparkles className="w-10 h-10 text-gold-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-ink-900 mb-2 flex items-center justify-center gap-2">
          <PartyPopper className="w-8 h-8 text-brown-600" />
          Alhamdulillah!
        </h1>
        <p className="text-xl font-bold text-ink-700 mb-2">
          Pendaftaran Berhasil
        </p>
        <p className="text-sm text-ink-500">
          Data Anda telah tersimpan dengan aman
        </p>
      </div>

      {/* Credentials Box */}
      <div className="bg-gradient-to-br from-brown-50 to-cream-50 border border-brown-200 rounded-xl p-6 mb-6">
        <p className="text-sm font-bold text-ink-600 mb-4 text-center flex items-center justify-center gap-2">
          <CreditCard className="w-4 h-4" />
          DATA LOGIN ANDA
        </p>

        {/* Nomor Pendaftaran */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-clay-sm">
          <p className="text-xs text-ink-500 mb-2 flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            Nomor Pendaftaran
          </p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-2xl font-black text-brown-700 break-all">
              {nomor_pendaftaran}
            </p>
            <button
              onClick={() => handleCopy(nomor_pendaftaran, "nomor")}
              className="p-2 hover:bg-brown-50 rounded-lg transition-colors shrink-0"
              title="Salin nomor pendaftaran"
            >
              {copiedField === "nomor" ? (
                <Check className="w-5 h-5 text-teal-500" />
              ) : (
                <Copy className="w-5 h-5 text-ink-400" />
              )}
            </button>
          </div>
        </div>

        {/* NIK Santri */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-clay-sm">
          <p className="text-xs text-ink-500 mb-2 flex items-center gap-1">
            <IdCard className="w-3 h-3" />
            NIK Santri (Password)
          </p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-black text-gold-700 break-all">{nik}</p>
            <button
              onClick={() => handleCopy(nik, "nik")}
              className="p-2 hover:bg-gold-50 rounded-lg transition-colors shrink-0"
              title="Salin NIK"
            >
              {copiedField === "nik" ? (
                <Check className="w-5 h-5 text-teal-500" />
              ) : (
                <Copy className="w-5 h-5 text-ink-400" />
              )}
            </button>
          </div>
        </div>

        {/* Login Info */}
        <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
          <p className="text-xs text-teal-800 flex items-center justify-center gap-1 text-center">
            <AlertCircle className="w-3 h-3 shrink-0" />
            Login menggunakan <strong className="mx-1">NIK</strong> dan{" "}
            <strong className="mx-1">Nomor Pendaftaran</strong>
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-gold-900 font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          PENTING - Simpan Data Ini!
        </p>
        <ul className="text-xs text-gold-800 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Screenshot atau catat <strong>Nomor Pendaftaran</strong> dan{" "}
              <strong>NIK Santri</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Login menggunakan <strong>NIK Santri</strong> sebagai password
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>TIDAK perlu password lain</strong> - cukup NIK + Nomor
              Pendaftaran
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Setelah login, lakukan <strong>pembayaran</strong> lalu lengkapi data & upload berkas
            </span>
          </li>
        </ul>
      </div>



      {/* Login Button */}
      <div className="mt-8">
        <button
          onClick={() => router.push("/login")}
          className="btn-primary w-full py-4 text-base"
        >
          <span>Lanjut ke Halaman Login</span>
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-ink-500 mb-2">Butuh bantuan login?</p>
        <a
          href="https://wa.me/622667345601"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brown-700 font-bold hover:underline"
        >
          Hubungi Admin WhatsApp
        </a>
      </div>
    </div>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="max-w-lg w-full card-wablas p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-brown-600 animate-spin mb-4" />
        <p className="text-ink-600">Memuat halaman...</p>
      </div>
    </div>
  );
}

export default function DaftarSuksesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brown-50 via-white to-cream-50 flex items-center justify-center px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <DaftarSuksesContent />
      </Suspense>
    </main>
  );
}
