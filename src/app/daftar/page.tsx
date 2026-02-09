"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  User,
  Phone,
  GraduationCap,
  CheckCircle,
  Loader2,
  ArrowRight,
  School,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

interface FormData {
  nik: string;
  nama_lengkap: string;
  tanggal_lahir: string;
  no_hp: string;
  jenis_kelamin: "L" | "P" | "";
  jenjang: "MTs" | "IL" | "";
}

export default function DaftarPage() {
  const router = useRouter();
  const [jenjangFromUrl, setJenjangFromUrl] = useState<"MTs" | "IL" | "">("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const jenjang = params.get('jenjang') as "MTs" | "IL" | null;
      if (jenjang) {
        setJenjangFromUrl(jenjang);
      }
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    nik: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    no_hp: "",
    jenis_kelamin: "",
    jenjang: jenjangFromUrl,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("pendaftaran_form");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(prev => ({
            ...prev,
            ...parsed,
            jenjang: jenjangFromUrl || parsed.jenjang || ""
          }));
        } catch (error) {
          console.error("Error parsing saved data:", error);
        }
      } else if (jenjangFromUrl) {
        setFormData(prev => ({
          ...prev,
          jenjang: jenjangFromUrl
        }));
      }
    }
  }, [jenjangFromUrl]);

  // Save data on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeoutId = setTimeout(() => {
        sessionStorage.setItem("pendaftaran_form", JSON.stringify(formData));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nik) {
      errors.nik = "NIK santri wajib diisi";
    } else if (!/^\d{16}$/.test(formData.nik)) {
      errors.nik = "NIK harus 16 digit angka";
    }

    if (!formData.nama_lengkap) {
      errors.nama_lengkap = "Nama lengkap santri wajib diisi";
    } else if (formData.nama_lengkap.length < 3) {
      errors.nama_lengkap = "Nama minimal 3 karakter";
    }

    if (!formData.tanggal_lahir) {
      errors.tanggal_lahir = "Tanggal lahir santri wajib diisi";
    }

    if (!formData.no_hp) {
      errors.no_hp = "Nomor WhatsApp/HP orang tua wajib diisi";
    } else if (
      !/^(08|628|\+628)\d{8,12}$/.test(
        formData.no_hp.replace(/[\s\-\(\)]/g, "")
      )
    ) {
      errors.no_hp = "Format nomor tidak valid (contoh: 081234567890)";
    }

    if (!formData.jenis_kelamin) {
      errors.jenis_kelamin = "Pilih jenis kelamin santri";
    }

    if (!formData.jenjang) {
      errors.jenjang = "Pilih jenjang pendidikan";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsLoading(true);

    try {
      // 1. Kirim OTP via WhatsApp
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          otp_channel: "whatsapp", // Force WhatsApp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim OTP");
      }

      // 2. Redirect ke halaman verifikasi
      const params = new URLSearchParams({
        nik: formData.nik,
        nama_lengkap: formData.nama_lengkap,
        tanggal_lahir: formData.tanggal_lahir,
        no_hp: formData.no_hp,
        jenis_kelamin: formData.jenis_kelamin,
        jenjang: formData.jenjang,
        channel: "whatsapp",
      });

      // Pass simulation code if available (for demo)
      if (data.simulation_code) {
        params.append("sim_code", data.simulation_code);
      }

      router.push(`/verifikasi-otp?${params.toString()}`);
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat mengirim OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-50 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-50/40 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <Container>
        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-clay-sm mb-4">
            <School className="w-6 h-6 text-brown-600" />
          </div>
          <h1 className="text-3xl font-black text-ink-900 mb-2">Pendaftaran Santri Baru</h1>
          <p className="text-ink-500">Tahun Ajaran 2026/2027</p>
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-clay-lg p-6 sm:p-8 border border-surface-200/60">

              {/* Saved Data Notice */}
              {(formData.nik || formData.nama_lengkap || formData.no_hp) && (
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-8 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-teal-800">
                      Melanjutkan Pengisian Data
                    </p>
                    <p className="text-xs text-teal-600 mt-0.5">
                      Data Anda tersimpan otomatis.
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Yakin ingin menghapus semua data?")) {
                            sessionStorage.removeItem("pendaftaran_form");
                            setFormData({
                              nik: "",
                              nama_lengkap: "",
                              tanggal_lahir: "",
                              no_hp: "",
                              jenis_kelamin: "",
                              jenjang: "",
                            });
                            setFieldErrors({});
                          }
                        }}
                        className="font-bold underline ml-1 hover:text-teal-900"
                      >
                        Mulai Ulang?
                      </button>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Section: Jenjang */}
                <section>
                  <h3 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-brown-600" />
                    Pilih Jenjang
                  </h3>
                  <div data-error={!!fieldErrors.jenjang} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: "MTs", title: "MTs Regular", subtitle: "Setara SMP (3 Tahun)" },
                      { value: "IL", title: "I'dad Lughowi", subtitle: "Persiapan SMA (1 Tahun)" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => setFormData((prev) => ({ ...prev, jenjang: option.value as any }))}
                        className={`cursor-pointer rounded-2xl p-4 border-2 transition-all duration-200 ${formData.jenjang === option.value
                            ? "border-brown-600 bg-brown-50 ring-1 ring-brown-600"
                            : "border-surface-200 bg-white hover:border-brown-300 hover:shadow-md"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.jenjang === option.value ? "border-brown-600" : "border-ink-300"
                            }`}>
                            {formData.jenjang === option.value && <div className="w-2.5 h-2.5 rounded-full bg-brown-600" />}
                          </div>
                          <div>
                            <p className="font-bold text-ink-900">{option.title}</p>
                            <p className="text-xs text-ink-500">{option.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {fieldErrors.jenjang && (
                    <p className="text-sm text-red-600 mt-2 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {fieldErrors.jenjang}
                    </p>
                  )}
                </section>

                <hr className="border-surface-200" />

                {/* Section: Data Diri */}
                <section>
                  <h3 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-brown-600" />
                    Data Calon Santri
                  </h3>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2" data-error={!!fieldErrors.nama_lengkap}>
                      <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={formData.nama_lengkap}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nama_lengkap: e.target.value }))}
                        placeholder="Sesuai Akta Kelahiran"
                        className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 focus:bg-white focus:border-brown-500 focus:ring-4 focus:ring-brown-500/10 transition-all font-medium"
                      />
                      {fieldErrors.nama_lengkap && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold ml-1">{fieldErrors.nama_lengkap}</p>
                      )}
                    </div>

                    <div data-error={!!fieldErrors.nik}>
                      <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                        NIK
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={16}
                        value={formData.nik}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nik: e.target.value.replace(/\D/g, "") }))}
                        placeholder="16 Digit NIK"
                        className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 focus:bg-white focus:border-brown-500 focus:ring-4 focus:ring-brown-500/10 transition-all font-medium"
                      />
                      {fieldErrors.nik && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold ml-1">{fieldErrors.nik}</p>
                      )}
                    </div>

                    <div data-error={!!fieldErrors.tanggal_lahir}>
                      <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={formData.tanggal_lahir}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tanggal_lahir: e.target.value }))}
                        className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 focus:bg-white focus:border-brown-500 focus:ring-4 focus:ring-brown-500/10 transition-all font-medium"
                      />
                      {fieldErrors.tanggal_lahir && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold ml-1">{fieldErrors.tanggal_lahir}</p>
                      )}
                    </div>

                    <div className="md:col-span-2" data-error={!!fieldErrors.jenis_kelamin}>
                      <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                        Jenis Kelamin
                      </label>
                      <div className="flex gap-4">
                        {[{ val: 'L', label: 'Laki-laki' }, { val: 'P', label: 'Perempuan' }].map((jk) => (
                          <label key={jk.val} className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.jenis_kelamin === jk.val
                              ? "bg-brown-50 border-brown-600 text-brown-800 font-bold"
                              : "bg-white border-surface-200 text-ink-600 hover:border-brown-300"
                            }`}>
                            <input
                              type="radio"
                              name="jk"
                              value={jk.val}
                              checked={formData.jenis_kelamin === jk.val}
                              onChange={() => setFormData(p => ({ ...p, jenis_kelamin: jk.val as any }))}
                              className="hidden"
                            />
                            {jk.label}
                          </label>
                        ))}
                      </div>
                      {fieldErrors.jenis_kelamin && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold ml-1">{fieldErrors.jenis_kelamin}</p>
                      )}
                    </div>
                  </div>
                </section>

                <hr className="border-surface-200" />

                {/* Section: Kontak */}
                <section>
                  <h3 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-brown-600" />
                    Kontak Wali Santri
                  </h3>

                  <div data-error={!!fieldErrors.no_hp}>
                    <label className="block text-xs font-bold text-ink-600 uppercase tracking-wider mb-2 ml-1">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-ink-400">
                        +62
                      </div>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={formData.no_hp.startsWith('0') ? formData.no_hp.slice(1) : formData.no_hp.startsWith('62') ? formData.no_hp.slice(2) : formData.no_hp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setFormData((prev) => ({ ...prev, no_hp: val }))
                        }}
                        placeholder="81234567890"
                        className="w-full px-5 py-3.5 pl-14 rounded-xl bg-surface-50 border border-surface-200 text-ink-900 focus:bg-white focus:border-brown-500 focus:ring-4 focus:ring-brown-500/10 transition-all font-medium"
                      />
                    </div>
                    <p className="text-xs text-ink-500 mt-2 ml-1">
                      Kode OTP akan dikirim ke nomor ini. Pastikan aktif di WhatsApp.
                    </p>
                    {fieldErrors.no_hp && (
                      <p className="text-xs text-red-600 mt-1.5 font-bold ml-1">{fieldErrors.no_hp}</p>
                    )}
                  </div>
                </section>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-brown-700 to-brown-800 hover:from-brown-800 hover:to-brown-900 shadow-xl shadow-brown-900/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span>Lanjutkan</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-ink-500 mt-6">
                    Sudah mendaftar sebelumnya? <a href="/login" className="text-brown-700 font-bold hover:underline">Login disini</a>
                  </p>
                </div>

              </form>
            </div>
        </div>
      </Container>
    </main>
  );
}
