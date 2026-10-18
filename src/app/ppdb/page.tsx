"use client";

// src/app/ppdb/page.tsx
import { Container } from "@/components/layout/Container";
import { Check, ArrowRight, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";
import { BRANDING } from "@/config/branding";

export default function SPMBInfoPage() {
  return (
    <main className="bg-gradient-to-b from-[#FFF5F8] via-[#FAF8F9] to-white min-h-screen pt-28 pb-24 lg:pt-36">
      
      {/* ─── 1. HERO OMI EDITORIAL ─── */}
      <section className="relative overflow-hidden pb-14">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

        <Container className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              Portal Resmi Informasi SPMB {BRANDING.academicYear} • KHUSUS PUTRI
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Penerimaan Santriwati Baru <br />
            <span className="text-primary">{BRANDING.schoolName}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Pendaftaran santriwati baru Tahun Ajaran {BRANDING.academicYear} resmi dibuka. Seluruh tahapan pendaftaran terintegrasi secara digital, transparan, dan terstruktur.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/daftar"
              className="h-11 px-7 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-lg shadow-primary/25 transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <span>Mulai Pendaftaran Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/documents/Brosur-SPMB-Al-Imam-2027-2028.pdf"
              download="Brosur-SPMB-Pesantren-Al-Imam-2027-2028.pdf"
              className="h-11 px-7 rounded-xl bg-white text-slate-800 font-extrabold text-xs border border-slate-200 shadow-xs hover:border-primary/40 hover:text-primary transition-all inline-flex items-center"
            >
              <span>Unduh Brosur</span>
            </a>
          </div>
        </Container>
      </section>

      {/* ─── 2. PERSYARATAN & PROSEDUR (OMI CLEAN BENTO) ─── */}
      <section className="py-8">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Persyaratan Umum */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-pink-100 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200 inline-block">
                  Kriteria Pendaftar
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Persyaratan Umum Calon Santriwati
                </h3>
              </div>

              <div className="space-y-3.5 pt-2">
                {[
                  "Beragama Islam dan memiliki kesungguhan menuntut ilmu syar'i.",
                  "Lulus SD/MI sederajat (untuk jenjang MTs) atau lulus SMP/MTs (untuk I'dad Lughawi).",
                  "Sehat jasmani dan rohani serta bebas dari penyakit menular kronis.",
                  "Berkelakuan baik, tidak merokok, dan bersedia menaati seluruh tata tertib pesantren.",
                  "Bersedia tinggal di asrama (mukim) selama masa pendidikan.",
                  "Mendapat izin dan persetujuan tertulis dari orang tua / wali santriwati."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-pink-100 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                <Link
                  href="/daftar"
                  className="h-11 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-md shadow-primary/20 transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="h-11 px-6 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200 transition-all inline-flex items-center whitespace-nowrap shrink-0"
                >
                  <span>Sudah Punya Akun? Masuk</span>
                </Link>
              </div>
            </div>

            {/* Berkas Digital & Bantuan */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl p-7 sm:p-8 border border-pink-100 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Berkas Digital yang Disiapkan</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Seluruh berkas diunggah secara digital melalui dashboard pendaftaran:
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    • Kartu Keluarga (KK) &amp; Akta Kelahiran
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    • Ijazah / Surat Keterangan Lulus / Rapor Terakhir
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    • Pas Foto Calon Santriwati (Background Merah/Biru)
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    • Sertifikat Prestasi / Piagam Tahfidz (Jika Ada)
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Punya Pertanyaan Seputar Pendaftaran?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Konsultasikan jadwal seleksi, beasiswa, atau kunjungan kampus langsung ke tim admisi Al-Imam.
                </p>
                <div className="pt-1">
                  <Link
                    href="/kontak"
                    className="text-xs font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Hubungi Panitia SPMB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

    </main>
  );
}
