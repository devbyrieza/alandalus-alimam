"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Smartphone,
  MessageSquare,
  Check,
  Send,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Zap,
} from "lucide-react";

// MODE DEMO - Set true untuk bypass OTP
const DEMO_MODE = true;

function PilihVerifikasiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil data dari query params (dikirim dari halaman daftar)
  const no_hp = searchParams.get("no_hp") || "";
  const nik = searchParams.get("nik") || "";
  const nama_lengkap = searchParams.get("nama_lengkap") || "";
  const tanggal_lahir = searchParams.get("tanggal_lahir") || "";
  const jenis_kelamin = searchParams.get("jenis_kelamin") || "";
  const jenjang = searchParams.get("jenjang") || "";

  const [selectedChannel, setSelectedChannel] = useState<"whatsapp" | "sms">(
    "whatsapp",
  );
  const [isLoading, setIsLoading] = useState(false);

  // Function untuk generate nomor pendaftaran (sama seperti di backend)
  const generateNomorPendaftaran = () => {
    const year = new Date().getFullYear();
    const prefix =
      jenis_kelamin === "L"
        ? jenjang === "MTs"
          ? "MTI"
          : jenjang === "IL"
            ? "ILI"
            : "MAI"
        : jenjang === "MTs"
          ? "MTA"
          : jenjang === "IL"
            ? "ILA"
            : "MAA";

    // Random 4 digit untuk demo
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}${year}${randomNum}`;
  };

  const handleProsesDemo = async () => {
    setIsLoading(true);

    try {
      // Simulasi loading (agar terlihat profesional)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate nomor pendaftaran
      const nomorPendaftaran = generateNomorPendaftaran();

      // Simpan data ke database (buat API endpoint /api/register/demo-direct)
      const response = await fetch("/api/register/demo-direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik,
          nama_lengkap,
          tanggal_lahir,
          no_hp,
          jenis_kelamin,
          jenjang,
          nomor_pendaftaran: nomorPendaftaran,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendaftar");
      }

      // Redirect langsung ke halaman sukses (bypass verifikasi OTP)
      const params = new URLSearchParams({
        nomor_pendaftaran: nomorPendaftaran,
        nama_lengkap,
        jenjang,
        jenis_kelamin,
        nik,
        channel: selectedChannel,
        demo_mode: "true",
      });

      router.push(`/daftar-sukses?${params.toString()}`);
    } catch (error: any) {
      setIsLoading(false);
      alert(error.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border-2 border-teal-200 p-8">
      {/* Demo Mode Badge */}
      {DEMO_MODE && (
        <div className="mb-6 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl">
          <div className="flex items-center gap-2 justify-center">
            <Zap className="w-5 h-5 text-orange-600" />
            <p className="text-sm font-black text-orange-900">
              MODE DEMO - Verifikasi OTP Di-bypass
            </p>
          </div>
          <p className="text-xs text-orange-700 mt-1 text-center">
            Data akan langsung tersimpan tanpa verifikasi OTP
          </p>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-stone-900 mb-2">
          {DEMO_MODE ? "Simulasi Pendaftaran" : "Pilih Metode Verifikasi"}
        </h1>
        <p className="text-sm text-stone-600 mb-2">
          {DEMO_MODE
            ? "Pilih channel untuk simulasi (tidak akan kirim OTP real)"
            : "Kode OTP 6 digit akan dikirim ke:"}
        </p>
        <p className="text-xl font-black text-teal-700">{no_hp}</p>
      </div>

      {/* WhatsApp Option */}
      <div className="space-y-4 mb-8">
        <button
          type="button"
          onClick={() => {
            console.log("Memilih WhatsApp");
            setSelectedChannel("whatsapp");
          }}
          className={`w-full p-6 rounded-2xl border-3 transition-all duration-300 text-left relative ${selectedChannel === "whatsapp"
              ? "border-teal-500 bg-gradient-to-br from-teal-50 to-teal-100 shadow-xl scale-105"
              : "border-gray-300 bg-white hover:border-teal-300 hover:shadow-lg"
            }`}
        >
          {/* Selected Badge */}
          {selectedChannel === "whatsapp" && (
            <div className="absolute -top-3 -right-3 bg-teal-500 text-white rounded-full p-2 shadow-lg animate-bounce">
              <Check className="w-6 h-6" />
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={`p-4 rounded-xl transition-all duration-300 ${selectedChannel === "whatsapp"
                  ? "bg-teal-500 shadow-lg"
                  : "bg-gray-100"
                }`}
            >
              <Smartphone
                className={`w-10 h-10 ${selectedChannel === "whatsapp"
                    ? "text-white"
                    : "text-gray-600"
                  }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={`text-xl font-black ${selectedChannel === "whatsapp"
                      ? "text-teal-700"
                      : "text-stone-900"
                    }`}
                >
                  WhatsApp
                </h3>
                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  REKOMENDASI
                </span>
              </div>
              <p className="text-sm text-stone-600 mb-2">
                {DEMO_MODE
                  ? "Simulasi kirim via WhatsApp"
                  : "Kirim kode via WhatsApp Business"}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${selectedChannel === "whatsapp"
                      ? "bg-teal-500"
                      : "bg-gray-400"
                    }`}
                />
                <span className="text-xs text-stone-500">
                  {DEMO_MODE
                    ? "Mode Demo - Bypass OTP"
                    : "Pengiriman instan & terpercaya"}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* SMS Option */}
        <button
          type="button"
          onClick={() => {
            console.log("Memilih SMS");
            setSelectedChannel("sms");
          }}
          className={`w-full p-6 rounded-2xl border-3 transition-all duration-300 text-left relative ${selectedChannel === "sms"
              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl scale-105"
              : "border-gray-300 bg-white hover:border-blue-300 hover:shadow-lg"
            }`}
        >
          {/* Selected Badge */}
          {selectedChannel === "sms" && (
            <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-2 shadow-lg animate-bounce">
              <Check className="w-6 h-6" />
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={`p-4 rounded-xl transition-all duration-300 ${selectedChannel === "sms"
                  ? "bg-blue-500 shadow-lg"
                  : "bg-gray-100"
                }`}
            >
              <MessageSquare
                className={`w-10 h-10 ${selectedChannel === "sms" ? "text-white" : "text-gray-600"
                  }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3
                className={`text-xl font-black mb-1 ${selectedChannel === "sms" ? "text-blue-700" : "text-stone-900"
                  }`}
              >
                SMS
              </h3>
              <p className="text-sm text-stone-600 mb-2">
                {DEMO_MODE
                  ? "Simulasi kirim via SMS"
                  : "Kirim otomatis via SMS"}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${selectedChannel === "sms" ? "bg-blue-500" : "bg-gray-400"
                    }`}
                />
                <span className="text-xs text-stone-500">
                  {DEMO_MODE
                    ? "Mode Demo - Bypass OTP"
                    : "Tidak perlu internet/data"}
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Info Box - Pilihan Aktif */}
      <div
        className={`mb-6 p-4 rounded-xl border-2 transition-all duration-300 ${selectedChannel === "whatsapp"
            ? "bg-teal-50 border-teal-300"
            : "bg-blue-50 border-blue-300"
          }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${selectedChannel === "whatsapp" ? "bg-teal-500" : "bg-blue-500"
              }`}
          >
            <Check className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-stone-900">
              Anda memilih:{" "}
              <span
                className={
                  selectedChannel === "whatsapp"
                    ? "text-teal-700"
                    : "text-blue-700"
                }
              >
                {selectedChannel === "whatsapp" ? "WhatsApp" : "SMS"}
              </span>
            </p>
            <p className="text-xs text-stone-600 mt-1">
              {DEMO_MODE
                ? `Mode Demo - Data langsung masuk database`
                : `Kode OTP akan dikirim ke ${no_hp}`}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleProsesDemo}
          disabled={isLoading}
          className={`w-full py-4 px-6 font-black text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95 ${selectedChannel === "whatsapp"
              ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              {DEMO_MODE ? (
                <Zap className="w-6 h-6" />
              ) : (
                <Send className="w-6 h-6" />
              )}
              <span>
                {DEMO_MODE
                  ? "Proses Pendaftaran (Demo)"
                  : `Kirim Kode via ${selectedChannel === "whatsapp" ? "WhatsApp" : "SMS"}`}
              </span>
            </>
          )}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-3 px-6 border-2 border-stone-300 text-stone-700 font-bold rounded-xl hover:bg-stone-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Form Pendaftaran
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 font-bold mb-2">
              {DEMO_MODE ? "Info Mode Demo" : "Tips Memilih Channel"}
            </p>
            {DEMO_MODE ? (
              <ul className="text-xs text-amber-800 space-y-1">
                <li>- Verifikasi OTP di-bypass untuk keperluan demo</li>
                <li>- Data akan langsung tersimpan ke database</li>
                <li>- Anda akan mendapat Nomor Pendaftaran otomatis</li>
                <li>- Cocok untuk testing fitur dashboard & admin panel</li>
              </ul>
            ) : (
              <ul className="text-xs text-amber-800 space-y-1">
                <li>
                  - <strong>WhatsApp:</strong> Lebih cepat & bisa chat langsung
                </li>
                <li>
                  - <strong>SMS:</strong> Tidak perlu internet/kuota data
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border-2 border-teal-200 p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-stone-600">Memuat halaman...</p>
      </div>
    </div>
  );
}

export default function PilihVerifikasiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 flex items-center justify-center px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <PilihVerifikasiContent />
      </Suspense>
    </main>
  );
}
