// src/components/home/HeroSection.tsx
// EXTREME OVERHAUL: Pure Cinova/OMI SaaS Premium Feel
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Globe,
  CheckCircle2,
  Sparkles,
  Clock,
  UserCheck,
  TrendingUp,
  Award
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BRANDING } from "@/config/branding";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

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
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const animate = inView ? "visible" : "hidden";
  const countdown = useCountdown("2026-12-28T23:59:59+07:00");

  useEffect(() => {
    fetch("/api/auth/session").then(res => res.json()).then(data => {
      if (data?.session) setSession(data.session);
    }).catch(() => {});
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAFAFA] pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* ─── MARQUEE ANNOUNCEMENT BAR (Cinova Style) ─── */}
      <div className="absolute top-0 left-0 w-full announcement-bar z-50">
        <div className="announcement-track">
          {[...Array(6)].map((_, i) => (
            <span key={i}>
              <span className="dot" />
              PENDAFTARAN SANTRI BARU TAHUN AJARAN {BRANDING.academicYear} TELAH DIBUKA
              <span className="dot" />
              KUOTA TERBATAS 25 SANTRI PER JENJANG
            </span>
          ))}
        </div>
      </div>

      {/* ─── AMBIENT BACKGROUND BLOBS ─── */}
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-maroon-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cream-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-60 pointer-events-none" />

      <Container className="relative z-10 mt-16 md:mt-12 lg:mt-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center">
          
          {/* ═════════ LEFT: MASSIVE TYPOGRAPHY & CTA ═════════ */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div variants={fadeUp} initial="hidden" animate={animate} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-700 text-xs font-black uppercase tracking-[0.15em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Penerimaan Santri Baru {BRANDING.academicYear}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.1 }}
              className="font-black tracking-tighter leading-[1.05] text-ink-950 mb-6 text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]"
            >
              Kaderisasi <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon-700 to-maroon-950">
                Ummat Pilihan.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-ink-600 mb-8 max-w-2xl font-medium leading-relaxed"
            >
              Sistem tarbiyah yang mengedepankan keteladanan, tanpa luka pengasuhan. Memadukan Intensitas Tahfidz, Syar'i, dan Akademik Global.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
            >
              {session ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <button className="btn-glow-maroon w-full sm:w-auto px-10 py-5 text-base md:text-lg flex items-center justify-center gap-3">
                    Buka Dashboard <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/ppdb" className="w-full sm:w-auto">
                    <button className="btn-glow-maroon w-full sm:w-auto px-10 py-5 text-base md:text-lg flex items-center justify-center gap-3">
                      Daftar Sekarang <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/program" className="w-full sm:w-auto">
                    <button className="bg-white border-2 border-surface-200 text-ink-900 hover:border-maroon-200 hover:bg-maroon-50 transition-all rounded-full w-full sm:w-auto px-10 py-5 text-base md:text-lg font-bold flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
                      Lihat Program
                    </button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* OMI-Style Live Countdown */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.4 }}
              className="w-full lg:w-auto bg-white p-4 rounded-3xl border border-maroon-100 shadow-premium-sm flex flex-wrap items-center justify-between sm:justify-start gap-6"
            >
              <div className="flex items-center gap-3 pl-2">
                <div className="w-10 h-10 rounded-full bg-maroon-50 flex items-center justify-center text-maroon-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-maroon-700 tracking-widest">Penutupan</p>
                  <p className="text-sm font-bold text-ink-900">28 Des 2026</p>
                </div>
              </div>
              <div className="h-10 w-px bg-surface-200 hidden sm:block" />
              <div className="flex items-baseline gap-2 pr-2">
                {[{ v: countdown.days, l: "HR" }, { v: countdown.hours, l: "JM" }, { v: countdown.minutes, l: "MN" }].map((u, i) => (
                  <div key={i} className="flex items-baseline">
                    <span className="text-2xl font-black text-maroon-950 tabular-nums leading-none">{pad(u.v)}</span>
                    <span className="text-[10px] font-bold text-ink-500 ml-1 mr-2">{u.l}</span>
                    {i < 2 && <span className="text-xl font-black text-surface-300 mr-2">:</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═════════ RIGHT: 3D UI MOCKUP (No static photo) ═════════ */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={animate === "visible" ? { opacity: 1, scale: 1 } : {}} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[540px] mx-auto aspect-[4/5] lg:aspect-square flex items-center justify-center mt-10 lg:mt-0"
          >
            {/* The Main Glass Dashboard Card */}
            <motion.div 
              animate={shouldReduceMotion ? {} : { y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 w-[85%] bg-white/70 backdrop-blur-2xl border border-white rounded-[2rem] shadow-premium-2xl p-6 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-surface-200 pb-4">
                <div>
                  <p className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-1">Status Pendaftaran</p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <p className="text-sm font-black text-ink-900">Gelombang 1 Aktif</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-maroon-700 to-maroon-950 rounded-2xl flex items-center justify-center shadow-md">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-50 p-4 rounded-2xl border border-surface-100">
                  <Award className="w-5 h-5 text-cream-600 mb-2" />
                  <p className="text-[11px] text-ink-500 font-bold uppercase mb-1">Akreditasi</p>
                  <p className="text-2xl font-black text-ink-950">A (Unggul)</p>
                </div>
                <div className="bg-maroon-50 p-4 rounded-2xl border border-maroon-100">
                  <Globe className="w-5 h-5 text-maroon-600 mb-2" />
                  <p className="text-[11px] text-maroon-700 font-bold uppercase mb-1">Jaringan</p>
                  <p className="text-xl font-black text-maroon-950 leading-none mt-1">Timur Tengah</p>
                </div>
              </div>

              {/* Progress Bar Mockup */}
              <div className="bg-white p-4 rounded-2xl border border-surface-100 shadow-sm mt-2">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-[11px] font-bold text-ink-500 uppercase">Kuota MTs Putra</p>
                    <p className="text-lg font-black text-ink-900 leading-none mt-1">Terisi 75%</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-maroon-500" />
                </div>
                <div className="w-full h-2.5 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-maroon-600 rounded-full w-[75%]" />
                </div>
              </div>
            </motion.div>

            {/* Floating Element 1 (Top Right) */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 top-10 z-20 bg-white p-4 rounded-2xl shadow-premium-lg border border-surface-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-cream-100 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-cream-700" />
              </div>
              <div>
                <p className="text-sm font-black text-ink-900">Kurikulum</p>
                <p className="text-xs font-bold text-ink-500">Terintegrasi</p>
              </div>
            </motion.div>

            {/* Floating Element 2 (Bottom Left) */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -left-6 bottom-16 z-20 bg-maroon-950 p-4 rounded-2xl shadow-premium-xl border border-maroon-800 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-maroon-800 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-white">Tahfidz</p>
                <p className="text-xs font-bold text-maroon-200">Mutqin 30 Juz</p>
              </div>
            </motion.div>

            {/* Decorative Background Circles */}
            <div className="absolute inset-0 border border-surface-200 rounded-full scale-[0.8] opacity-50" />
            <div className="absolute inset-0 border border-maroon-100 rounded-full scale-[1.05] opacity-50 border-dashed" />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
