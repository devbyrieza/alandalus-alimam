// src/components/home/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Award,
  BookOpen,
  Download,
  Clock,
  Sparkles,
  Users
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BRANDING } from "@/config/branding";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    function tick() {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function HeroSection() {
  const [session, setSession] = useState<any>(null);
  const countdown = useCountdown("2026-12-28T23:59:59+07:00");

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data?.session) setSession(data.session);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="beranda"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FDFCF9] via-[#F8FAFC] to-white pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

      <Container className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ═════════ LEFT COLUMN: OMI STRUCTURE + AL-IMAM PALETTE (#550000 & #ddc192) ═════════ */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow Pill (Al-Imam Maroon & Krem Emas) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ddc192]/20 border border-[#ddc192]/50 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#550000] animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#550000]">
                Portal Resmi SPMB Tahun Ajaran {BRANDING.academicYear}
              </span>
            </div>

            {/* Two-Tone Master Headline (Al-Imam Maroon #550000) */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Kaderisasi Ummat <br />
              <span className="text-[#550000]">
                Hanif, Kontributif, & Adaptif
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Bukan sekadar tempat belajar — sebuah ekosistem pembentukan karakter yang{" "}
              <strong className="font-semibold text-slate-900">
                mengedepankan keteladanan dan mendidik tanpa luka
              </strong>
              , memadukan Tahfidz Al-Qur'an, Ilmu Syar'i, Akademik, Leadership, dan Entrepreneurship.
            </p>

            {/* School Tagline Quote (Al-Imam Krem Emas Separator & Maroon Text) */}
            <div className="flex items-center gap-3 justify-center lg:justify-start max-w-xl mx-auto lg:mx-0 py-1">
              <div className="h-px w-8 bg-[#ddc192]" />
              <p className="text-xs sm:text-sm font-semibold italic text-[#550000]">
                &ldquo;{BRANDING.schoolTagline}&rdquo;
              </p>
              <div className="h-px w-8 bg-[#ddc192]" />
            </div>

            {/* 3 Action Buttons (Strict Al-Imam Palette) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full">
              {session ? (
                <a
                  href="https://spmb.pesantren-alimam.com/dashboard"
                  className="h-12 w-full sm:w-auto px-6 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-sm shadow-md shadow-[#550000]/25 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Buka Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="https://spmb.pesantren-alimam.com/daftar"
                  className="h-12 w-full sm:w-auto px-6 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-sm shadow-md shadow-[#550000]/25 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Daftar SPMB 2027</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              <Link
                href="/program"
                className="h-12 w-full sm:w-auto px-6 rounded-xl bg-white text-slate-800 font-extrabold text-sm border border-slate-300 shadow-sm hover:border-[#ddc192] hover:bg-[#ddc192]/10 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center"
              >
                <span>Lihat Program</span>
              </Link>

              <a
                href="/documents/Brosur-SPMB.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 w-full sm:w-auto px-6 rounded-xl bg-[#ddc192] hover:bg-[#cfb280] text-[#550000] font-extrabold text-sm shadow-md shadow-[#ddc192]/30 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 border border-[#ddc192]"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Brosur (PDF)</span>
              </a>
            </div>

            {/* Live Countdown Card (Al-Imam Maroon Numbers) */}
            <div className="pt-3 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-3">
                  <span>Pendaftaran Dibuka: 5 Sep - 28 Des 2026</span>
                  <span className="text-[#550000] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#550000]" />
                    Status: Aktif
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#550000] tabular-nums">
                      {pad(countdown.days)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Hari</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#550000] tabular-nums">
                      {pad(countdown.hours)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Jam</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#550000] tabular-nums">
                      {pad(countdown.minutes)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Menit</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#550000] tabular-nums">
                      {pad(countdown.seconds)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Detik</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ═════════ RIGHT COLUMN: REAL PHOTOGRAPHIC FRAME + AL-IMAM FLOATING BADGES ═════════ */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group bg-white aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              {/* Real Hero Image */}
              <Image
                src="/images/hero.jpg"
                alt="Santri Pesantren Al Imam Al Islami"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Top-Left Floating Glass Badge (Krem Emas #ddc192) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ddc192] text-[#550000] flex items-center justify-center font-bold shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Akreditasi A</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Pesantren Unggul</p>
                </div>
              </div>

              {/* Bottom-Right Floating Glass Badge (Maroon #550000) */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#550000] text-white flex items-center justify-center font-bold shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Tahfidz 30 Juz</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Mutqin & Bersanad</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ═════════ 3 EXECUTIVE FEATURE CARDS (AL-IMAM PALETTE) ═════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#ddc192] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#ddc192]/20 text-[#550000] flex items-center justify-center font-bold text-xl mb-4 border border-[#ddc192]/40">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold text-[#550000] uppercase tracking-wider">Apresiasi Prestasi</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Jalur Beasiswa</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Beasiswa penuh bagi penghafal Al-Qur'an 30 Juz mutqin dan juara olimpiade sains nasional.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#550000]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#550000]/10 text-[#550000] flex items-center justify-center font-bold text-xl mb-4 border border-[#550000]/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold text-[#550000] uppercase tracking-wider">Kurikulum Terpadu</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Syar'i & Nasional</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Integrasi pendalaman kitab turots, bahasa Arab aktif, serta kurikulum kementerian pendidikan.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4 border border-emerald-200">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Kuota Eksklusif</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">25 Santri / Kelas</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Rasio pengasuhan intensif agar pendampingan adab dan tahfidz terpantau optimal setiap hari.
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
}

