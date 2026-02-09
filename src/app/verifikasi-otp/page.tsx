"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  Smartphone,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

function VerifikasiOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil data dari query params
  const no_hp = searchParams.get("no_hp") || "";
  const nik = searchParams.get("nik") || "";
  const nama_lengkap = searchParams.get("nama_lengkap") || "";
  const tanggal_lahir = searchParams.get("tanggal_lahir") || "";
  const jenis_kelamin = searchParams.get("jenis_kelamin") || "";
  const jenjang = searchParams.get("jenjang") || "";
  const channel = "whatsapp";

  // OTP State
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Simulation Code Check
  const sim_code = searchParams.get("sim_code");

  // Auto-fill OTP code when provided (WhatsApp not available yet)
  useEffect(() => {
    if (sim_code && sim_code.length === 6) {
      setOtpCode(sim_code.split(""));
    }
  }, [sim_code]);

  // ... rest of state
  const [countdown, setCountdown] = useState(300); // 5 menit
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Format countdown time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input
  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otpCode];
    newOTP[index] = value.slice(-1);
    setOtpCode(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    setOtpError("");
  };

  // Handle OTP backspace
  const handleOTPKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length === 6) {
      const newOTP = pastedData.split("").slice(0, 6);
      setOtpCode(newOTP);

      // Focus last input
      const lastInput = document.getElementById("otp-5");
      lastInput?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const code = otpCode.join("");

    if (code.length !== 6) {
      setOtpError("Masukkan 6 digit kode OTP");
      return;
    }

    setIsVerifying(true);
    setOtpError("");

    try {
      const response = await fetch("/api/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_hp,
          otp_code: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verifikasi OTP gagal");
      }

      // Redirect to Success Page
      const successParams = new URLSearchParams({
        nomor_pendaftaran: data.data.nomor_pendaftaran,
        nama_lengkap: data.data.nama_lengkap,
        nik: data.data.nik,
        jenjang: data.data.jenjang
      });

      router.push(`/daftar-sukses?${successParams.toString()}`);
    } catch (error: any) {
      setIsVerifying(false);
      setOtpError(error.message || "Terjadi kesalahan saat verifikasi OTP");
    }
  };



  // Resend OTP
  const handleResendOTP = async () => {
    setOtpCode(["", "", "", "", "", ""]);
    setOtpError("");
    setIsVerifying(true);

    try {
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik,
          nama_lengkap,
          tanggal_lahir,
          no_hp,
          jenis_kelamin,
          jenjang,
          otp_channel: channel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim ulang OTP");
      }

      // Reset countdown
      setCountdown(300);
      setCanResend(false);
      setIsVerifying(false);

      // Focus first input
      const firstInput = document.getElementById("otp-0");
      firstInput?.focus();
    } catch (error: any) {
      setIsVerifying(false);
      setOtpError(error.message || "Gagal mengirim ulang OTP");
    }
  };

  // Auto-submit when all 6 digits filled
  useEffect(() => {
    const code = otpCode.join("");
    if (code.length === 6 && !isVerifying) {
      handleVerifyOTP();
    }
  }, [otpCode]);

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 border-teal-200 p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div
          className={`w-20 h-20 ${channel === "whatsapp" ? "bg-teal-100" : "bg-blue-100"
            } rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          {/* Icon WhatsApp only */}
          <div className="p-3 bg-teal-600 rounded-lg">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-stone-900 mb-2">
          Verifikasi {sim_code ? "Kode" : "via WhatsApp"}
        </h1>
        <p className="text-sm text-stone-600 mb-1">
          {sim_code
            ? "Masukkan kode verifikasi yang tertera di bawah ini:"
            : "Kami telah mengirim kode 6 digit ke:"}
        </p>
        {!sim_code && <p className="text-lg font-black text-teal-700">{no_hp}</p>}

        {/* OTP Display Banner (when WhatsApp not available) */}
        {sim_code && (
          <div className="mt-4 p-3 bg-teal-50 border-2 border-teal-200 rounded-xl">
            <p className="text-xs font-bold text-teal-800 mb-1">Kode Verifikasi Anda</p>
            <p className="text-sm text-teal-900">
              Masukkan kode berikut: <span className="font-mono text-xl font-black">{sim_code}</span>
            </p>
            <p className="text-xs text-teal-600 mt-1">
              Layanan WhatsApp sedang dalam proses aktivasi
            </p>
          </div>
        )}
      </div>

      {/* OTP Input Fields */}
      <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
        {otpCode.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            onKeyDown={(e) => handleOTPKeyDown(index, e)}
            className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${otpError
              ? "border-red-500 focus:ring-red-300"
              : digit
                ? "border-teal-500 bg-teal-50"
                : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            disabled={isVerifying}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {/* Error Message */}
      {otpError && (
        <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-sm text-red-700 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{otpError}</span>
          </p>
        </div>
      )}

      {/* Loading State */}
      {isVerifying && (
        <div className="mb-4 p-3 bg-teal-50 border-2 border-teal-200 rounded-lg">
          <p className="text-sm text-teal-700 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memverifikasi kode...</span>
          </p>
        </div>
      )}

      {/* Countdown Timer */}
      <div className="text-center mb-6">
        {countdown > 0 ? (
          <p className="text-sm text-stone-600 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Kode berlaku selama{" "}
            <strong className="text-teal-700">{formatTime(countdown)}</strong>
          </p>
        ) : (
          <p className="text-sm text-red-600 flex items-center justify-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4" />
            Kode OTP sudah kadaluarsa
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Verify Button - hanya muncul jika user belum selesai input atau ada error */}
        {(otpCode.join("").length !== 6 || otpError) && (
          <button
            onClick={handleVerifyOTP}
            disabled={isVerifying || otpCode.join("").length !== 6}
            className={`w-full py-3 px-6 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${channel === "whatsapp"
              ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            Verifikasi Kode
          </button>
        )}

        {/* Resend Button */}
        <button
          onClick={handleResendOTP}
          disabled={!canResend || isVerifying}
          className={`w-full py-3 px-6 border-2 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${channel === "whatsapp"
            ? "border-teal-300 text-teal-700 hover:bg-teal-50"
            : "border-blue-300 text-blue-700 hover:bg-blue-50"
            }`}
        >
          <RefreshCw
            className={`w-5 h-5 ${isVerifying ? "animate-spin" : ""}`}
          />
          {canResend
            ? "Kirim Ulang Kode"
            : `Kirim ulang dalam ${formatTime(countdown)}`}
        </button>

        {/* Back Button */}
        <button
          onClick={() => {
            // Kembali ke form pendaftaran jika ingin ubah data
            router.push(`/daftar`);
          }}
          disabled={isVerifying}
          className="w-full py-3 px-6 text-stone-600 font-semibold hover:text-stone-900 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Ubah Data / Nomor HP
        </button>
      </div>

      {/* Help Info */}
      <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
        <p className="text-sm text-amber-900 font-bold mb-2">Tips Verifikasi</p>
        <ul className="text-xs text-amber-800 space-y-1">
          <li>
            - Pastikan nomor HP Anda aktif dan terdaftar di WhatsApp
          </li>
          <li>- Kode akan otomatis terverifikasi setelah 6 digit terisi</li>
          <li>- Periksa folder spam atau pesan masuk yang diblokir</li>
          <li>- Jika tidak menerima kode, tunggu hingga bisa kirim ulang</li>
        </ul>
      </div>

      {/* Contact Support */}
      <div className="mt-4 text-center">
        <p className="text-xs text-stone-500 mb-2">Tidak menerima kode?</p>
        <a
          href="https://wa.me/622667345601"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-teal-600 font-bold hover:underline"
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
    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 border-teal-200 p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-stone-600">Memuat halaman...</p>
      </div>
    </div>
  );
}

export default function VerifikasiOTPPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 flex items-center justify-center px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <VerifikasiOTPContent />
      </Suspense>
    </main>
  );
}
