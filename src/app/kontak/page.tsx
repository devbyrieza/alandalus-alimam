// src/app/kontak/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { BRANDING } from "@/config/branding";

const WA_NUMBER = "6285111524441";
const MAPS_URL = "https://maps.app.goo.gl/uX3Uv4q6L7w7zPzK8";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    wa: "",
    subjek: "Informasi Pendaftaran SPMB",
    pesan: ""
  });

  // Autosave contact draft
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("alandalus_alimam_kontak_draft");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setFormData((prev) => ({ ...prev, ...parsed }));
          }
        }
      } catch (e) {
        console.warn("Failed to load contact draft:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("alandalus_alimam_kontak_draft", JSON.stringify(formData));
      } catch (e) {
        console.warn("Failed to save contact draft:", e);
      }
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Halo Panitia Admisi Pesantren Al Imam Al Islami.

*Pesan Informasi / Pertanyaan:*
• Nama: ${formData.nama}
• No. WhatsApp: ${formData.wa}
• Subjek: ${formData.subjek}
• Pesan: ${formData.pesan}

Mohon informasinya. Terima kasih.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank");
    if (typeof window !== "undefined") {
      localStorage.removeItem("alandalus_alimam_kontak_draft");
    }
  };

  return (
    <main className="bg-gradient-to-b from-[#FDFCF9] via-[#F8FAFC] to-white min-h-screen pt-28 pb-24 lg:pt-36">
      
      {/* ─── 1. HERO OMI EDITORIAL ─── */}
      <section className="relative overflow-hidden pb-14">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

        <Container className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ddc192]/20 border border-[#ddc192]/50 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#550000] animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#550000]">
              Pusat Layanan & Informasi Resmi
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Hubungi Panitia <br />
            <span className="text-[#550000]">Pesantren Al Imam Sukabumi</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Tim admisi dan sekretariat kami siap membantu menjawab pertanyaan seputar pendaftaran santri baru, kurikulum, dan kunjungan kampus.
          </p>
        </Container>
      </section>

      {/* ─── 2. 2-COLUMN BENTO: FILAMENT FORM + CONTACT CARDS ─── */}
      <section className="py-6">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Filament-Style Message Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-7 sm:p-9 border-b border-slate-100 bg-slate-50/50">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-3 py-1 rounded-full border border-[#ddc192]/40 inline-block mb-2">
                  Kirim Pesan Cepat
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Formulir Konsultasi Online
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pesan Anda akan otomatis terhubung ke WhatsApp Customer Service resmi kami.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-7 sm:p-9 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                    <span>Nama Lengkap Anda</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Contoh: Abdullah"
                    className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                    <span>Nomor WhatsApp Aktif</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.wa}
                    onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                    <span>Topik / Subjek Pertanyaan</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.subjek}
                    onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                    className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all"
                  >
                    <option value="Informasi Pendaftaran SPMB">Informasi Pendaftaran SPMB 2027</option>
                    <option value="Rincian Biaya & Beasiswa">Rincian Biaya & Kuota Beasiswa</option>
                    <option value="Kurikulum & Sistem Asrama">Kurikulum & Sistem Asrama Santri</option>
                    <option value="Jadwal Survey Lokasi">Jadwal Survey / Kunjungan Kampus</option>
                    <option value="Lainnya">Pertanyaan Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                    <span>Isi Pertanyaan / Pesan</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    placeholder="Tuliskan pertanyaan atau hal yang ingin dikonsultasikan secara jelas..."
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#550000] focus:ring-4 focus:ring-[#550000]/10 transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="h-12 px-8 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-sm shadow-md shadow-[#550000]/25 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Pesan via WhatsApp CS</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Card 1: WhatsApp CS */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-[#ddc192] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      WhatsApp Panitia SPMB
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                      +62 851-1152-4441
                    </h4>
                    <p className="text-xs text-slate-500">Respon cepat hari kerja</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Jam Pelayanan */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-[#ddc192] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ddc192]/20 border border-[#ddc192]/40 text-[#550000] flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Jam Layanan Kantor
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                      Senin – Sabtu
                    </h4>
                    <p className="text-xs text-slate-500">Pukul 08.00 – 16.00 WIB (Ahad Janji Temu)</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Alamat Kampus */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-[#ddc192] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#550000]/10 border border-[#550000]/20 text-[#550000] flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Alamat Kampus
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {BRANDING.schoolName}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kp. Babakan RT 03/05, Desa Lembursawah, Kec. Cicantayan, Kabupaten Sukabumi, Jawa Barat 43155
                    </p>
                    <div className="pt-1">
                      <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#550000] hover:underline"
                      >
                        <span>Buka di Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

    </main>
  );
}
