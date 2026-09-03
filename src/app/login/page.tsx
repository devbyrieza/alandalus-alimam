"use client";

import React, { useState, useEffect } from "react";
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
  ChevronRight,
  Layers,
  Crown,
  Folder,
  Coins,
  Mic,
  BookOpen,
  MessageSquare,
  Settings,
  KeyRound } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";
import { BRANDING } from "@/config/branding";

// Role label & icon map
const ROLE_INFO: Record<
  string,
  { label: string; icon: React.ElementType; desc: string; color: string }
> = {
  admin_super: {
    label: "Admin Super",
    icon: Crown,
    desc: "Akses penuh semua fitur",
    color: "from-secondary-50 to-yellow-50 border-secondary-200" },
  admin_berkas: {
    label: "Admin Berkas",
    icon: Folder,
    desc: "Verifikasi dokumen pendaftar",
    color: "from-primary-50 to-indigo-50 border-primary-200" },
  admin_keuangan: {
    label: "Admin Keuangan",
    icon: Coins,
    desc: "Verifikasi pembayaran",
    color: "from-emerald-50 to-primary-50 border-emerald-200" },
  pewawancara_cawalsan: {
    label: "Pewawancara Cawalsan",
    icon: Mic,
    desc: "Wawancara calon orangtua/wali santri",
    color: "from-purple-50 to-violet-50 border-purple-200" },
  pewawancara_calsan: {
    label: "Pewawancara Calon Santri",
    icon: Mic,
    desc: "Wawancara calon santri",
    color: "from-rose-50 to-pink-50 border-rose-200" },
  penguji: {
    label: "Penguji Al-Qur'an",
    icon: BookOpen,
    desc: "Penguji tes Al-Qur'an",
    color: "from-green-50 to-lime-50 border-green-200" },
  penguji_hafalan: {
    label: "Penguji Hafalan",
    icon: BookOpen,
    desc: "Penguji tes Hafalan Al-Qur'an",
    color: "from-teal-50 to-emerald-50 border-teal-200" },
  penguji_bahasa_arab: {
    label: "Penguji Lisan B. Arab",
    icon: MessageSquare,
    desc: "Penguji tes Lisan Bahasa Arab",
    color: "from-sky-50 to-blue-50 border-sky-200" },
  admin: {
    label: "Admin",
    icon: Settings,
    desc: "Panel administrasi",
    color: "from-orange-50 to-secondary-50 border-orange-200" } };

// ========================================
// REUSABLE COMPONENTS
// ========================================

const AuthInput = ({
  label,
  icon: Icon,
  error,
  children,
  rightElement }: {
  label: string;
  icon: any;
  error?: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-ink-600 uppercase tracking-[0.2em] ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-5 md:left-6 top-0 bottom-0 flex items-center text-ink-500 group-focus-within:text-primary-600 transition-colors duration-300 pointer-events-none">
        <Icon className="w-5 h-5" />
      </div>
      {children}
      {rightElement && (
        <div className="absolute right-5 md:right-6 top-0 bottom-0 flex items-center">
          {rightElement}
        </div>
      )}
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
  // AGGRESSIVE ZOMBIE COOKIE CLEANUP
  // To prevent the "bounce back to login" issue, always flush existing legacy cookies when they mount the login page
  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
  }, []);

  const router = useRouter();

  // Tab state
  const [activeTab, setActiveTab] = useState<"pendaftar" | "admin">(
    "pendaftar",
  );

  // Pendaftar login state
  const [nikPendaftar, setNikPendaftar] = useState("");
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");

  // Admin/Penguji login state
  const [emailAdmin, setEmailAdmin] = useState("");
  const [passwordAdmin, setPasswordAdmin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Multi-role selection state
  const [roleSelectionData, setRoleSelectionData] = useState<{
    profile_id: string;
    full_name: string;
    available_roles: string[];
  } | null>(null);
  const [selectingRole, setSelectingRole] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login pendaftar
  const handleLoginPendaftar = async (
    e?: React.FormEvent,
    manualNik?: string,
    manualNo?: string,
  ) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);

    const nik = (manualNik || nikPendaftar || "").trim();
    const no = (manualNo || nomorPendaftaran || "").trim().toUpperCase();

    if (!nik || !no) {
      setError("NIK dan Nomor Pendaftaran wajib diisi");
      setIsLoading(false);
      return;
    }

    if (!/^\d{16}$/.test(nik)) {
      setError("NIK harus 16 digit angka");
      setIsLoading(false);
      return;
    }

    if (!/^[A-Z]{2,6}\d{6,9}$/i.test(no)) {
      setError("Format nomor pendaftaran tidak valid (contoh: SPA2700001, SPI2700001, atau ILA2700001)");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_type: "pendaftar",
          nik: nik,
          nomor_pendaftaran: no }) });

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
  const handleLoginAdmin = async (
    e?: React.FormEvent,
    manualEmail?: string,
    manualPass?: string,
    chosenRole?: string,
  ) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);

    const email = manualEmail || emailAdmin;
    const pass = manualPass || passwordAdmin;

    if (!email || !pass) {
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
          email: email,
          password: pass,
          chosen_role: chosenRole }) });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login gagal");

      setIsLoading(false);

      // Multi-role: show role picker
      if (data.requires_role_selection) {
        setRoleSelectionData({
          profile_id: data.profile_id,
          full_name: data.full_name,
          available_roles: data.available_roles });
        return;
      }

      const userRole = data.role.toLowerCase();
      // Single role: redirect
      if (
        ["admin", "admin_super", "admin_berkas", "admin_keuangan"].includes(
          userRole,
        )
      ) {
        window.location.href = "/dashboard/admin";
      } else if (
        [
          "penguji",
          "pewawancara_calsan",
          "pewawancara_cawalsan",
          "penguji_quran",
          "penguji_calsan",
          "penguji_cawalsan"
        ].includes(userRole)
      ) {
        window.location.href = "/dashboard/penguji";
      } else {
        throw new Error(`Role tidak dikenali: ${data.role}`);
      }
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

  // Handle role selection
  const handleSelectRole = async (chosenRole: string) => {
    if (!roleSelectionData) return;
    setSelectingRole(true);
    setError("");
    try {
      const res = await fetch("/api/auth/select-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_id: roleSelectionData.profile_id,
          chosen_role: chosenRole }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memilih role");
      window.location.href = data.redirectTo;
    } catch (err: any) {
      setError(err.message);
      setSelectingRole(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white flex flex-col items-center justify-center p-4 sm:p-6 py-10 sm:py-16 relative overflow-hidden font-sans">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

      {/* ─── TOP NAVIGATION PILLS (OMI MOBILE SCREENSHOT 4) ─── */}
      <div className="w-full max-w-[500px] flex items-center justify-between gap-3 mb-4 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm text-xs font-extrabold uppercase tracking-wider text-slate-700 hover:text-[#550000] hover:border-[#550000]/40 transition-all hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm text-xs font-bold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Portal Resmi SPMB 2027</span>
        </div>
      </div>

      {/* ─── TWO-SECTION OMI LOGIN CARD (OMI SCREENSHOTS 2 & 4) ─── */}
      <div className="w-full max-w-[500px] rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-200 bg-white relative z-10">
        
        {/* SECTION 1: DARK MAROON GRADIENT HEADER BLOCK */}
        <div className="bg-gradient-to-br from-[#2D0000] via-[#400000] to-[#550000] p-6 sm:p-8 text-white relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ddc192]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            {/* Logo on white pill container */}
            <div className="inline-flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-2xl shadow-sm">
              <img
                src={BRANDING.logoPath}
                alt={"Logo " + BRANDING.schoolName}
                className="w-7 h-7 object-contain"
              />
              <span className="text-xs font-extrabold text-slate-900 tracking-tight">
                {BRANDING.schoolShortName}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ddc192] bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block mb-2">
                Penerimaan Santri Baru {BRANDING.academicYear}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Masuk Portal SPMB Al-Imam
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 font-normal mt-1 leading-relaxed">
                Silakan masukkan NIK / No. Pendaftaran calon santri atau kredensial akun staf Anda.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHITE FORM BODY */}
        <div className="p-6 sm:p-8 bg-white space-y-6">
          
          {/* Tab Switcher (Calon Santri vs Portal Staf) */}
          {!roleSelectionData && (
            <div className="bg-slate-100 p-1.5 rounded-2xl flex relative border border-slate-200/80">
              <motion.div
                layoutId="auth-tab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className={`absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-sm border border-slate-200/50 ${
                  activeTab === "pendaftar"
                    ? "left-1.5 w-[calc(50%-6px)]"
                    : "left-[calc(50%+3px)] w-[calc(50%-6px)]"
                }`}
              />

              <button
                type="button"
                onClick={() => {
                  setActiveTab("pendaftar");
                  setError("");
                }}
                className={`flex-1 relative z-10 py-2.5 text-xs font-extrabold uppercase tracking-wider text-center rounded-xl transition-colors ${
                  activeTab === "pendaftar" ? "text-[#550000]" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Calon Santri
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("admin");
                  setError("");
                }}
                className={`flex-1 relative z-10 py-2.5 text-xs font-extrabold uppercase tracking-wider text-center rounded-xl transition-colors ${
                  activeTab === "admin" ? "text-[#550000]" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Portal Staf
              </button>
            </div>
          )}

          {/* Prompt Banner Box (OMI Exact from Screenshot 2) */}
          {!roleSelectionData && (
            <div className="bg-[#ddc192]/15 border border-[#ddc192]/40 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
              <div className="text-slate-700 font-medium">
                Belum memiliki akun terdaftar?
              </div>
              <Link
                href="/daftar"
                className="font-extrabold text-[#550000] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Daftar / Buat Akun</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Error Alert */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 font-bold leading-relaxed">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {/* Role Selection Screen */}
              {roleSelectionData ? (
                <motion.div
                  key="role-selector"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-5">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Selamat datang, {roleSelectionData.full_name.split(" ")[0]}!
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Pilih dashboard yang ingin diakses
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {roleSelectionData.available_roles.map((role) => {
                      const info = ROLE_INFO[role] || {
                        label: role,
                        icon: KeyRound,
                        desc: "",
                        color: "from-slate-50 to-gray-50 border-slate-200"
                      };
                      const IconComp = info.icon;
                      return (
                        <button
                          key={role}
                          onClick={() => handleSelectRole(role)}
                          disabled={selectingRole}
                          className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 text-left flex items-center gap-3.5 transition-all disabled:opacity-60"
                        >
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-[#550000] shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-extrabold text-slate-900 text-sm">
                              {info.label}
                            </p>
                            {info.desc && (
                              <p className="text-[11px] text-slate-500 font-medium">
                                {info.desc}
                              </p>
                            )}
                          </div>
                          {selectingRole ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setRoleSelectionData(null);
                      setError("");
                    }}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-bold pt-2 flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Gunakan akun lain
                  </button>
                </motion.div>
              ) : activeTab === "pendaftar" ? (
                /* FORM CALON SANTRI */
                <motion.form
                  key="form-pendaftar"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  onSubmit={handleLoginPendaftar}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                      <span>Nomor Pendaftaran</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={nomorPendaftaran}
                        onChange={(e) => setNomorPendaftaran(e.target.value.toUpperCase())}
                        placeholder="Contoh: SPA2700001"
                        className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all uppercase"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                      <span>NIK Calon Santri (16 Digit)</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IdCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={16}
                        required
                        value={nikPendaftar}
                        onChange={(e) => setNikPendaftar(e.target.value.replace(/\D/g, ""))}
                        placeholder="16 Digit NIK sesuai KK"
                        className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-sm shadow-md shadow-[#550000]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Masuk Portal Calon Santri</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* FORM STAF / ADMIN */
                <motion.form
                  key="form-admin"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  onSubmit={handleLoginAdmin}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                      <span>Email / Username / No. WA</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={emailAdmin}
                        onChange={(e) => setEmailAdmin(e.target.value)}
                        placeholder="Email, username, atau no. WA"
                        className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                      <span>Kata Sandi</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={passwordAdmin}
                        onChange={(e) => setPasswordAdmin(e.target.value)}
                        placeholder="Masukkan kata sandi"
                        className="w-full h-12 pl-10 pr-12 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all select-text"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        aria-label="Tampilkan atau sembunyikan kata sandi"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-sm shadow-md shadow-[#550000]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Masuk Portal Staf</span>
                          <ShieldCheck className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer inside card (OMI Exact from Screenshot 2) */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Koneksi Aman Terenkripsi
            </span>
            <a
              href="/documents/Brosur-SPMB.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#550000] font-bold"
            >
              Unduh Brosur SPMB ↗
            </a>
          </div>

        </div>

      </div>
    </main>
  );
}


