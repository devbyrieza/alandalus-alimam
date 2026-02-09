"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  IdCard,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Sparkles,
  FileText,
  School,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Tab state
  const [activeTab, setActiveTab] = useState<"pendaftar" | "admin">(
    "pendaftar"
  );

  // Pendaftar login state
  const [nikPendaftar, setNikPendaftar] = useState("");
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");

  // Admin/Penguji login state
  const [emailAdmin, setEmailAdmin] = useState("");
  const [passwordAdmin, setPasswordAdmin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login pendaftar
  const handleLoginPendaftar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi input
    if (!nikPendaftar || !nomorPendaftaran) {
      setError("NIK dan Nomor Pendaftaran wajib diisi");
      setIsLoading(false);
      return;
    }

    if (!/^\d{16}$/.test(nikPendaftar)) {
      setError("NIK harus 16 digit angka");
      setIsLoading(false);
      return;
    }

    // Format nomor pendaftaran: MTI/MTA/ILI/ILA/MAI/MAA + 6-8 digit
    if (
      !/^(MTI|MTA|ILI|ILA|MAI|MAA)\d{6,8}$/.test(nomorPendaftaran)
    ) {
      setError(
        "Format nomor pendaftaran tidak valid (contoh: MTI2600001 atau ILI20269168)"
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_type: "pendaftar",
          nik: nikPendaftar,
          nomor_pendaftaran: nomorPendaftaran,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login gagal");
      }

      // Success - gunakan full page reload untuk pastikan cookie di-set
      setIsLoading(false);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  // Handle login admin/penguji
  const handleLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi input
    if (!emailAdmin || !passwordAdmin) {
      setError("Email dan Password wajib diisi");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_type: "admin",
          email: emailAdmin,
          password: passwordAdmin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login gagal");
      }

      // Success - gunakan full page reload untuk pastikan cookie di-set
      setIsLoading(false);

      // Redirect sesuai role menggunakan full page reload
      if (["admin", "admin_super", "admin_berkas", "admin_keuangan"].includes(data.role)) {
        window.location.href = "/dashboard/admin";
      } else if (data.role === "penguji") {
        window.location.href = "/dashboard/penguji";
      } else {
        console.error("Unknown role:", data.role);
        throw new Error(`Role tidak dikenali: ${data.role}`);
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor - Hostinger Style: Very subtle, very clean */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brown-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brown-600 to-brown-800 rounded-2xl shadow-xl shadow-brown-900/10 mb-6">
            <School className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-ink-900 mb-2 tracking-tight">
            Selamat Datang
          </h1>
          <p className="text-ink-500 font-medium">
            Masuk ke Portal PPDB Al-Imam
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-clay-xl p-8 border border-surface-200/50">

          {/* Pill Tab Switcher - Hostinger Style */}
          <div className="bg-surface-100 p-1.5 rounded-full flex relative mb-8">
            {/* Animated Background Pill */}
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm transition-all duration-300 ease-spring ${activeTab === 'pendaftar' ? 'left-1.5 w-[calc(50%-6px)]' : 'left-[calc(50%+3px)] w-[calc(50%-6px)]'
                }`}
            />

            <button
              onClick={() => { setActiveTab("pendaftar"); setError(""); }}
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold text-center rounded-full transition-colors duration-300 ${activeTab === "pendaftar" ? "text-brown-700" : "text-ink-500 hover:text-ink-700"
                }`}
            >
              Pendaftar
            </button>
            <button
              onClick={() => { setActiveTab("admin"); setError(""); }}
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold text-center rounded-full transition-colors duration-300 ${activeTab === "admin" ? "text-brown-700" : "text-ink-500 hover:text-ink-700"
                }`}
            >
              Admin / Penguji
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-semibold leading-tight">{error}</p>
            </div>
          )}

          {/* Forms */}
          <div className="relative min-h-[300px]">

            {/* Form Pendaftar */}
            {activeTab === "pendaftar" && (
              <form onSubmit={handleLoginPendaftar} className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                      Nomor Pendaftaran
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 group-focus-within:text-brown-600 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={nomorPendaftaran}
                        onChange={(e) => setNomorPendaftaran(e.target.value.toUpperCase())}
                        placeholder="MTI2600001"
                        className="w-full px-5 py-3.5 pl-12 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-brown-500 focus:ring-4 focus:ring-brown-500/10 transition-all font-semibold uppercase"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                      NIK Santri
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 group-focus-within:text-brown-600 transition-colors">
                        <IdCard className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={16}
                        value={nikPendaftar}
                        onChange={(e) => setNikPendaftar(e.target.value.replace(/\D/g, ""))}
                        placeholder="3201234567890000"
                        className="w-full px-5 py-3.5 pl-12 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-brown-500 focus:ring-4 focus:ring-brown-500/10 transition-all font-semibold"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-bold text-white bg-brown-700 hover:bg-brown-800 shadow-lg shadow-brown-900/10 hover:shadow-xl hover:shadow-brown-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Masuk Sekarang</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-surface-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-ink-400 font-bold tracking-wider">
                      Atau
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-ink-500 text-sm mb-2">Belum punya akun?</p>
                  <a
                    href="/daftar"
                    className="inline-flex items-center gap-2 text-brown-700 font-bold hover:text-brown-900 hover:underline transition-colors"
                  >
                    Daftar Santri Baru
                  </a>
                </div>
              </form>
            )}

            {/* Form Admin */}
            {activeTab === "admin" && (
              <form onSubmit={handleLoginAdmin} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                      Email Institusi
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 group-focus-within:text-gold-600 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={emailAdmin}
                        onChange={(e) => setEmailAdmin(e.target.value)}
                        placeholder="admin@alimam.sch.id"
                        className="w-full px-5 py-3.5 pl-12 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all font-medium"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 group-focus-within:text-gold-600 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordAdmin}
                        onChange={(e) => setPasswordAdmin(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-5 py-3.5 pl-12 pr-12 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all font-medium"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Login Staff</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gold-50/50 rounded-xl p-4 border border-gold-100/50">
                  <p className="text-xs text-gold-800 text-center leading-relaxed">
                    Halaman ini khusus untuk Admin, Panitia, dan Penguji. <br />
                    <span className="font-semibold">Lupa password?</span> Hubungi Administrator Pusat.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-ink-400 hover:text-brown-700 text-sm font-semibold transition-colors">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </main>
  );
}
