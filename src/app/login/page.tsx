"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  IdCard,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Sparkles,
  School,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

// ========================================
// REUSABLE COMPONENTS
// ========================================

const AuthInput = ({
  label,
  icon: Icon,
  error,
  children
}: {
  label: string,
  icon: any,
  error?: string,
  children: React.ReactNode
}) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-ink-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-300 group-focus-within:text-brown-600 transition-colors duration-300">
        <Icon className="w-5 h-5" />
      </div>
      {children}
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5"
      >
        <AlertCircle className="w-3.5 h-3.5" /> {error}
      </motion.p>
    )}
  </div>
);

// ========================================
// MAIN COMPONENT
// ========================================

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

    if (!/^(MTI|MTA|ILI|ILA|MAI|MAA)\d{6,8}$/.test(nomorPendaftaran)) {
      setError("Format nomor pendaftaran tidak valid (contoh: MTI2600001)");
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
      if (!response.ok) throw new Error(data.error || "Login gagal");

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
      if (!response.ok) throw new Error(data.error || "Login gagal");

      setIsLoading(false);
      if (["admin", "admin_super", "admin_berkas", "admin_keuangan", "head_of_it"].includes(data.role)) {
        window.location.href = "/dashboard/admin";
      } else if (data.role === "penguji") {
        window.location.href = "/dashboard/penguji";
      } else {
        throw new Error(`Role tidak dikenali: ${data.role}`);
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-50/30 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center">
        {/* Logo / Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-premium-sm border border-surface-100 mb-8 hover:scale-110 transition-transform group">
              <School className="w-10 h-10 text-brown-600 group-hover:text-gold-600 transition-colors" />
            </div>
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-3 tracking-tight">
            Portal <span className="text-brown-600">Al-Imam</span>
          </h1>
          <p className="text-lg text-ink-500 font-medium">
            Masuk ke Sistem Administrasi & Pendaftaran
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-[480px] bg-white rounded-[4rem] shadow-premium-2xl p-10 md:p-14 border border-surface-100 relative overflow-hidden"
        >
          {/* Subtle inside gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brown-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {/* Tab Switcher - Premium "Pill" style */}
          <div className="bg-surface-50 p-2 rounded-[2rem] flex relative mb-12 border border-surface-100">
            {/* Animated Background Pill */}
            <motion.div
              layoutId="auth-tab"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className={`absolute top-2 bottom-2 rounded-[1.5rem] bg-white shadow-premium-sm ${activeTab === 'pendaftar' ? 'left-2 w-[calc(50%-8px)]' : 'left-[calc(50%+4px)] w-[calc(50%-8px)]'
                }`}
            />

            <button
              onClick={() => { setActiveTab("pendaftar"); setError(""); }}
              className={`flex-1 relative z-10 py-3.5 text-xs font-black uppercase tracking-widest text-center rounded-2xl transition-colors duration-300 ${activeTab === "pendaftar" ? "text-brown-700" : "text-ink-400 hover:text-ink-600"}`}
            >
              Pendaftar
            </button>
            <button
              onClick={() => { setActiveTab("admin"); setError(""); }}
              className={`flex-1 relative z-10 py-3.5 text-xs font-black uppercase tracking-widest text-center rounded-2xl transition-colors duration-300 ${activeTab === "admin" ? "text-brown-700" : "text-ink-400 hover:text-ink-600"}`}
            >
              Staff Portal
            </button>
          </div>

          {/* Error Alert */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-5 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-4 overflow-hidden"
              >
                <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-premium-xs">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-sm text-red-700 font-bold leading-tight mt-0.5">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms with AnimatePresence for smooth transitions */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeTab === "pendaftar" ? (
                <motion.form
                  key="form-pendaftar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLoginPendaftar}
                  className="space-y-8"
                >
                  <AuthInput label="Nomor Pendaftaran" icon={FileText}>
                    <input
                      type="text"
                      value={nomorPendaftaran}
                      onChange={(e) => setNomorPendaftaran(e.target.value.toUpperCase())}
                      placeholder="Contoh: MTI2600001"
                      className="w-full px-8 py-5 pl-16 rounded-[1.5rem] bg-surface-50 border border-transparent focus:bg-white focus:border-brown-200 focus:ring-4 focus:ring-brown-50 transition-all font-bold text-ink-950 uppercase placeholder:normal-case placeholder:font-medium placeholder:text-ink-300"
                      disabled={isLoading}
                    />
                  </AuthInput>

                  <AuthInput label="NIK Calon Santri" icon={IdCard}>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={16}
                      value={nikPendaftar}
                      onChange={(e) => setNikPendaftar(e.target.value.replace(/\D/g, ""))}
                      placeholder="16 Digit NIK Sesuai KK"
                      className="w-full px-8 py-5 pl-16 rounded-[1.5rem] bg-surface-50 border border-transparent focus:bg-white focus:border-brown-200 focus:ring-4 focus:ring-brown-50 transition-all font-bold text-ink-950 placeholder:font-medium placeholder:text-ink-300"
                      disabled={isLoading}
                    />
                  </AuthInput>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 rounded-[2rem] bg-brown-900 text-white font-black text-xl hover:bg-gold-500 shadow-premium-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span>Masuk Portal</span>
                        <LogIn className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-ink-400 font-bold uppercase tracking-widest mb-4">Belum Punya Akun?</p>
                    <Link
                      href="/daftar"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-50 text-brown-700 font-black text-sm border border-surface-100 hover:bg-white hover:shadow-premium-sm transition-all"
                    >
                      Daftar Baru Di Sini
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="form-admin"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleLoginAdmin}
                  className="space-y-8"
                >
                  <AuthInput label="Email Institusi" icon={Mail}>
                    <input
                      type="email"
                      value={emailAdmin}
                      onChange={(e) => setEmailAdmin(e.target.value)}
                      placeholder="admin@alimam.sch.id"
                      className="w-full px-8 py-5 pl-16 rounded-[1.5rem] bg-surface-50 border border-transparent focus:bg-white focus:border-gold-300 focus:ring-4 focus:ring-gold-50 transition-all font-bold text-ink-950 placeholder:font-medium placeholder:text-ink-300"
                      disabled={isLoading}
                    />
                  </AuthInput>

                  <AuthInput label="Password" icon={Lock}>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordAdmin}
                        onChange={(e) => setPasswordAdmin(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-8 py-5 pl-16 pr-16 rounded-[1.5rem] bg-surface-50 border border-transparent focus:bg-white focus:border-gold-300 focus:ring-4 focus:ring-gold-50 transition-all font-bold text-ink-950 placeholder:font-medium placeholder:text-ink-300"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </AuthInput>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 rounded-[2rem] bg-gold-500 text-white font-black text-xl hover:bg-brown-900 shadow-premium-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span>Login Staff</span>
                        <ShieldCheck className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>

                  <div className="p-6 bg-gold-50/50 rounded-3xl border border-gold-100 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gold-900 font-bold leading-relaxed">
                      Lupa password? Silakan hubungi Head of IT atau Admin Pusat untuk reset akses Anda.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="group flex items-center gap-3 text-ink-400 hover:text-brown-700 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-surface-50 border border-surface-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Kembali ke Beranda
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
