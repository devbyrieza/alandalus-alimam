// src/app/tentang/page.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  Target,
  Award,
  BookOpen,
  Check,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Heart,
  Users,
  Building,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { BRANDING } from "@/config/branding";

export default function TentangPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-gradient-to-b from-[#FDFCF9] via-[#F8FAFC] to-white min-h-screen pt-28 pb-20 lg:pt-36">
      
      {/* ─── 1. HERO EDITORIAL OMI ─── */}
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

        <Container className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ddc192]/20 border border-[#ddc192]/50 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#550000] animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#550000]">
              Profil Resmi {BRANDING.schoolName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Mengenal Lebih Dekat <br />
            <span className="text-[#550000]">
              Pesantren Al Imam Al Islami
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Lembaga pendidikan Islam modern di Sukabumi yang kini dikelola secara profesional di bawah naungan{" "}
            <strong className="text-slate-900 font-semibold">Managed by Al Andalus IIBS</strong>. Menyatukan kemurnian manhaj syar'i, tahfidz Al-Qur'an bersanad, dan kepemimpinan adaptif zaman.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/SPMB"
              className="h-11 px-6 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-xs shadow-md shadow-[#550000]/25 transition-all inline-flex items-center gap-2"
            >
              <span>Daftar SPMB 2027/2028</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/program"
              className="h-11 px-6 rounded-xl bg-white text-slate-800 font-extrabold text-xs border border-slate-200 shadow-xs hover:border-[#ddc192] transition-all inline-flex items-center"
            >
              <span>Lihat Kurikulum Pendidikan</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ─── 2. WELCOME BANNER IMAGE (OMI FRAMED PHOTO) ─── */}
      <section className="py-8">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="relative aspect-video md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
            <Image
              src="/images/welcome-selamat-datang.webp"
              alt="Selamat Datang di Al Imam Al Islami"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ddc192] bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
                  Kampus Al-Imam Sukabumi
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold">
                  Lingkungan Asri, Nyaman, dan Kondusif untuk Menuntut Ilmu
                </h3>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 3. SEJARAH & TRANSFORMASI (BENTO 2-COLUMN) ─── */}
      <section className="py-20">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Image with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5]">
                <Image
                  src="/images/tentang.webp"
                  alt="Pesantren Al Imam Al Islami"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge (OMI Style) */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#ddc192] text-[#550000] flex items-center justify-center font-black text-xl shadow-xs">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Era Baru 2026</p>
                  <p className="text-sm font-extrabold text-slate-900 leading-tight">Managed by Al-Andalus</p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-3.5 py-1 rounded-full border border-[#ddc192]/50 inline-block">
                  Transformasi Pendidikan
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Sejarah & Babak Baru <br />
                  <span className="text-[#550000]">Pesantren Al Imam</span>
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">{BRANDING.schoolName}</strong> hadir sebagai ikhtiar mulia membangun pusat keilmuan Islam berbasis Ahlussunnah wal Jama'ah di Sukabumi, Jawa Barat.
                </p>
                <p>
                  Mulai Tahun Ajaran 2026/2027, pengelolaan manajemen pendidikan dan asrama resmi diadopsi dan diselaraskan secara penuh oleh <strong className="text-[#550000] font-bold">Pesantren Islam Internasional Al-Andalus (Al Andalus IIBS)</strong>. Seluruh standar operasional prosedur, kurikulum turots, pembinaan adab santri, hingga rekrutmen asatidzah berstandar mutu tinggi.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold italic border-l-4 border-l-[#550000]">
                  &ldquo;{BRANDING.schoolTagline}&rdquo;
                </div>
              </div>

              {/* 2 Quick KPI Pills */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-xs font-extrabold uppercase text-[#550000] block mb-1">Standar Mutu</span>
                  <p className="text-base sm:text-lg font-black text-slate-900">Al-Andalus IIBS</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Sistem akademik & kepesantrenan teruji</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-xs font-extrabold uppercase text-emerald-600 block mb-1">Pola Pengasuhan</span>
                  <p className="text-base sm:text-lg font-black text-slate-900">Mendidik Tanpa Luka</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Keteladanan penuh tanpa kekerasan</p>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* ─── 4. VISI & MISI BENTO CARDS ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200">
        <Container className="max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-3.5 py-1 rounded-full border border-[#ddc192]/50 inline-block">
              Kompas Arah Pembinaan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visi & Misi Pesantren
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Pedoman fundamental dalam setiap aktivitas belajar, tahfidz, dan peribadatan harian santri.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Visi (Card 1) */}
            <div className="md:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between border-t-4 border-t-[#550000]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ddc192]/20 text-[#550000] flex items-center justify-center font-bold mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Visi Pesantren</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 leading-snug">
                  &ldquo;Kaderisasi Ummat Hanif, Kontributif, dan Adaptif&rdquo;
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed mt-6 pt-4 border-t border-slate-100">
                Melahirkan pribadi muslim yang istiqomah di atas kemurnian tauhid, bermanfaat nyata bagi masyarakat, serta tangguh menghadapi perkembangan teknologi global.
              </p>
            </div>

            {/* Misi (Card 2) */}
            <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between border-t-4 border-t-[#ddc192]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#550000]/10 text-[#550000] flex items-center justify-center font-bold mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Misi Utama</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2 mb-4">
                  4 Komitmen Pendidikan
                </h3>
                <div className="space-y-3">
                  {[
                    "Menanamkan aqidah shahihah sesuai pemahaman para Salafush Shalih.",
                    "Membimbing hafalan Al-Qur'an 30 Juz secara mutqin dengan tajwid dan sanad qira'ah.",
                    "Membiasakan percakapan bahasa Arab dan Inggris aktif dalam ekosistem asrama.",
                    "Membekali santri wawasan sains, kepemimpinan (leadership), dan keterampilan kewirausahaan."
                  ].map((misi, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-[#ddc192]/30 text-[#550000] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="leading-relaxed">{misi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* ─── 5. PILAR PENDIDIKAN (5 OMI CARDS) ─── */}
      <section className="py-24">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-3.5 py-1 rounded-full border border-[#ddc192]/50 inline-block">
              Pilar Kurikulum
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              5 Pilar Pendidikan Al-Imam
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Keseimbangan antara ilmu akhirat dan keahlian duniawi untuk membentuk generasi unggul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                icon: BookOpen,
                title: "Tahfidz Al-Qur'an",
                desc: "Target hafalan 30 Juz mutqin dengan pengujian berkala dan sanad qira'ah."
              },
              {
                icon: ShieldCheck,
                title: "Ilmu Syar'i (Turots)",
                desc: "Pendalaman kitab turots meliputi fiqih, tafsir, hadits, dan aqidah shahihah."
              },
              {
                icon: GraduationCap,
                title: "Bahasa Internasional",
                desc: "Penguasaan bahasa Arab dan Inggris aktif dalam interaksi harian santri."
              },
              {
                icon: Users,
                title: "Kepemimpinan (Leadership)",
                desc: "Pembiasaan kepemimpinan organisasi, kedisiplinan adab, dan tanggung jawab sosial."
              },
              {
                icon: Sparkles,
                title: "Kewirausahaan",
                desc: "Pengenalan dasar entrepreneurship, kemandirian finansial, dan etika bisnis Islam."
              }
            ].map((pilar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#ddc192]/20 text-[#550000] flex items-center justify-center font-bold mb-4">
                    <pilar.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-2">
                    {pilar.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    {pilar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* ─── 6. BOTTOM CTA (OMI ENTERPRISE BANNER) ─── */}
      <section className="py-12">
        <Container className="max-w-5xl mx-auto px-4">
          <div className="rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-br from-[#2D0000] via-[#400000] to-[#550000] text-white shadow-xl border border-white/15 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Tertarik Bergabung dengan Keluarga Besar Al-Imam?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
              Daftarkan putra Anda sekarang dan ikuti proses seleksi penerimaan santri baru Tahun Ajaran 2027/2028.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/SPMB"
                className="h-11 px-7 rounded-xl bg-[#ddc192] hover:bg-[#cfb280] text-[#550000] font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Daftar SPMB Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontak"
                className="h-11 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-extrabold text-xs transition-all inline-flex items-center"
              >
                <span>Hubungi Panitia Admisi</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
