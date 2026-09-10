// src/app/program/page.tsx
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  GraduationCap,
  BookKey,
  BookOpen,
  Check,
  Clock,
  Award,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Languages,
  Layers
} from "lucide-react";
import { motion } from "framer-motion";
import { BRANDING } from "@/config/branding";

export default function ProgramPage() {
  return (
    <main className="bg-gradient-to-b from-[#FDFCF9] via-[#F8FAFC] to-white min-h-screen pt-28 pb-24 lg:pt-36">
      
      {/* ─── 1. HERO OMI EDITORIAL ─── */}
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

        <Container className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ddc192]/20 border border-[#ddc192]/50 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#550000] animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#550000]">
              Katalog Pendidikan & Kurikulum
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Kurikulum Terpadu <br />
            <span className="text-[#550000]">Pesantren Al Imam Al Islami</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Menyelaraskan penguasaan Bahasa Arab sangat intensif, bimbingan Tahfidz Al-Qur'an mutqin, pendalaman kitab turots syar'i, keunggulan sains akademik umum, serta penempaan leadership dan kewirausahaan.
          </p>
        </Container>
      </section>

      {/* ─── 2. 3 MAIN PROGRAMS DETAILED (OMI BIDANG LOMBA STYLE) ─── */}
      <section className="py-10">
        <Container className="max-w-6xl mx-auto px-4 space-y-12">
          
          {/* PROGRAM 1: MTS */}
          <div id="mts" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm scroll-mt-28">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#550000] text-white inline-block">
                  Kurikulum Terpadu Kemenag • Jenjang 3 Tahun
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Madrasah Tsanawiyah (MTs)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pendidikan tingkat menengah pertama setara SMP bagi lulusan SD/MI.
                </p>
              </div>

              <a
                href="https://spmb.pesantren-alimam.com/daftar"
                className="h-11 px-6 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-xs shadow-md shadow-[#550000]/25 transition-all inline-flex items-center gap-2 self-start lg:self-center"
              >
                <span>Daftar MTs Al-Imam</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#550000]" />
                  <span>Bahasa Arab Sangat Intensif</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Santri dibiasakan muhadatsah harian, pengayaan mufrodat tematik, dan tata bahasa Nahwu-Shorof aplikatif untuk membaca kitab turots sejak dini.
                </p>
              </div>

              <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#ddc192]" />
                  <span>Tahfidz Mutqin & Syar'i Sunnah</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bimbingan hafalan Al-Qur'an mutqin berkaidah tajwid, tasmi' berkala, pembiasaan ibadah harian sesuai Sunnah, dan pendalaman turots aqidah-fiqih.
                </p>
              </div>

              <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Sains, Akademik & Leadership</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pelajaran umum (Matematika, IPA, Bahasa) tetap diajarkan berkualitas tinggi agar santri pintar, berdaya saing, mandiri, dan berjiwa kepemimpinan.
                </p>
              </div>
            </div>
          </div>

          {/* PROGRAM 2: I'DAD LUGHAWI */}
          <div id="idad" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm scroll-mt-28">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#ddc192] text-[#550000] inline-block">
                  Program Matrikulasi • 1 Tahun
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  I'dad Lughawi (Persiapan Bahasa)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Program akselerasi bahasa Arab dan dasar-dasar syar'i bagi lulusan SMP umum.
                </p>
              </div>

              <a
                href="https://spmb.pesantren-alimam.com/daftar"
                className="h-11 px-6 rounded-xl bg-[#ddc192] hover:bg-[#cfb280] text-[#550000] font-extrabold text-xs shadow-md shadow-[#ddc192]/30 transition-all inline-flex items-center gap-2 self-start lg:self-center"
              >
                <span>Daftar I'dad Lughawi</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-8">
              <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <BookKey className="w-4 h-4 text-[#550000]" />
                  <span>Imersi Total Bahasa Arab</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Santri dibimbing secara intensif untuk menguasai keterampilan mendengar, muhadatsah aktif, membaca kitab, dan menulis bahasa Arab dalam tempo 1 tahun.
                </p>
              </div>

              <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Dasar Syar'i & Kesiapan Menuju MA</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pembekalan dasar-dasar ilmu syar'i, pembiasaan adab thalabul 'ilmi, dan adaptasi kultur asrama mandiri sebagai jembatan mantap melangkah ke jenjang MA.
                </p>
              </div>
            </div>
          </div>

          {/* PROGRAM 3: MA */}
          <div id="ma" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm scroll-mt-28">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 inline-block whitespace-nowrap inline-block shrink-0">
                  Segera Hadir • Jenjang Lanjutan
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Madrasah Aliyah (MA) Keagamaan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pendidikan tingkat menengah atas dengan orientasi studi ke Timur Tengah dan Perguruan Tinggi Negeri.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Madrasah Aliyah Al-Imam diproyeksikan mencetak generasi berwawasan global yang kokoh dalam riset turots Islam, fasih berbahasa Arab & Inggris, siap menembus beasiswa perguruan tinggi ternama dan Timur Tengah, serta memiliki jiwa kepemimpinan (leadership) dan kemandirian entrepreneurship beretika syar'i.
              </p>
            </div>
          </div>

        </Container>
      </section>

      {/* ─── 3. BOTTOM CTA BANNER ─── */}
      <section className="py-12">
        <Container className="max-w-5xl mx-auto px-4">
          <div className="rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-br from-[#2D0000] via-[#400000] to-[#550000] text-white shadow-xl border border-white/15 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Ingin Mengetahui Lebih Lengkap Seputar Kurikulum?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
              Unduh brosur resmi SPMB dalam format PDF atau konsultasikan langsung dengan panitia penerimaan santri.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="/documents/Brosur-SPMB-Al-Imam-2027-2028.pdf"
                download="Brosur-SPMB-Pesantren-Al-Imam-2027-2028.pdf"
                className="h-11 px-7 rounded-xl bg-[#ddc192] hover:bg-[#cfb280] text-[#550000] font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Unduh Brosur</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/kontak"
                className="h-11 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-extrabold text-xs transition-all inline-flex items-center"
              >
                <span>Tanya Jawab Kurikulum</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
