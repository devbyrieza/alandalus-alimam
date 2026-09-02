// src/components/home/HeroSection.tsx — Al-Imam Al-Islami
// OVERHAUL: Cinova Creator + OMI Kemenag Design Language
// - Pill eyebrow badge (Cinova-style)
// - Glow CTA button with hover lift
// - Cinova flow chip process strip
// - Live countdown timer (OMI-style)
// - Enhanced floating cards with refined glassmorphism
// - Warm white background + ambient maroon/gold glow blobs
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Globe,
  CheckCircle2,
  Sparkles,
  Clock,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BRANDING } from "@/config/branding";

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const FLOW_STEPS = ["Buat Akun", "Bayar Biaya", "Lengkapi Berkas", "Tes & Wawancara", "Pengumuman"];

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const animate = inView ? "visible" : "hidden";
  const countdown = useCountdown("2026-12-28T23:59:59+07:00");

  const badgeAnimate = inView
    ? { opacity: 1, scale: 1, rotate: -6 }
    : { opacity: 0, scale: shouldReduceMotion ? 1 : 0.5, rotate: -25 };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.session) setSession(data.session);
        }
      } catch {}
    };
    fetchSession();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Hero — Beranda Al Imam Al Islami"
      className="relative pt-20 pb-16 lg:pt-8 xl:pt-12 lg:pb-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FFFCF7 0%, #FFFFFF 50%, #FDF8F0 100%)" }}
    >
      {/* Ambient Glow Blobs */}
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{ top: "-80px", right: "-100px", width: "520px", height: "520px",
          background: "rgba(85, 0, 0, 0.09)", borderRadius: "50%", filter: "blur(120px)" }} />
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{ bottom: "-80px", left: "-140px", width: "440px", height: "440px",
          background: "rgba(201, 168, 76, 0.08)", borderRadius: "50%", filter: "blur(120px)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(var(--color-maroon-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-maroon-400) 1px, transparent 1px)",
          backgroundSize: "64px 64px" }} />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* LEFT CONTENT SIDE */}
          <div className="flex flex-col gap-5 lg:gap-6 text-center lg:text-left items-center lg:items-start w-full">

            {/* Eyebrow Pill Badge */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.08 }}
              className="flex justify-center lg:justify-start">
              <span className="eyebrow-pill">
                <Sparkles className="w-3 h-3" />
                PPDB {BRANDING.academicYear} — Pendaftaran Dibuka
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.16 }}>
              <h1 className="leading-[1.08] tracking-[-0.03em] mx-auto lg:mx-0 max-w-2xl lg:max-w-none font-black text-center lg:text-left">
                <span className="text-ink-950 block mb-1 text-[2.125rem] md:text-[2.875rem] lg:text-[3.375rem] xl:text-[3.875rem]">
                  Kaderisasi Ummat
                </span>
                <span className="gradient-text-maroon block text-[1.875rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]">
                  Hanif, Kontributif,{" "}
                  <br className="hidden sm:block" />
                  dan Adaptif
                </span>
              </h1>
            </motion.div>

            {/* Body Copy */}
            <motion.p variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.24 }}
              className="text-base lg:text-[1.0625rem] leading-[1.9] max-w-[42rem] mx-auto lg:mx-0 text-center lg:text-left text-pretty"
              style={{ color: "var(--color-ink-500)", fontWeight: 450 }}>
              Bukan sekadar tempat belajar — sebuah ekosistem pembentukan karakter yang{" "}
              <strong className="font-semibold" style={{ color: "var(--color-ink-800)" }}>
                mengedepankan keteladanan dan mendidik tanpa luka
              </strong>
              , memadukan Tahfidz Al-Qur'an, Ilmu Syar'i, Akademik, Leadership, dan Entrepreneurship.
            </motion.p>

            {/* Tagline */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.30 }}
              className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-px flex-1 max-w-[2.5rem]" style={{ background: "var(--color-maroon-200)" }} />
              <p className="text-sm font-semibold italic" style={{ color: "var(--color-maroon-600)" }}>
                &ldquo;{BRANDING.schoolTagline}&rdquo;
              </p>
              <div className="h-px flex-1 max-w-[2.5rem]" style={{ background: "var(--color-maroon-200)" }} />
            </motion.div>

            {/* Flow Chips Strip */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.36 }}
              className="flex flex-wrap items-center gap-1.5 justify-center lg:justify-start">
              {FLOW_STEPS.map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <span className="flow-chip">{step}</span>
                  {i < FLOW_STEPS.length - 1 && <span className="flow-chip-arrow">&#8594;</span>}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.44 }}
              className="flex flex-col gap-4 items-center lg:items-start w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {session ? (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <button className="btn-glow-maroon w-full sm:w-auto px-9 py-4 min-h-[54px] text-[0.9375rem] flex items-center justify-center gap-2.5 group">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                      </span>
                      Lanjutkan Ke Dashboard
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link href="/ppdb" className="w-full sm:w-auto">
                      <button className="btn-glow-maroon w-full sm:w-auto px-9 py-4 min-h-[54px] text-[0.9375rem] flex items-center justify-center gap-2.5 group">
                        Daftar SPMB Sekarang
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </Link>
                    <Link href="/program" className="w-full sm:w-auto">
                      <button className="btn-secondary w-full sm:w-auto px-8 py-4 min-h-[54px] text-[0.9375rem] flex items-center justify-center gap-2 group">
                        Lihat Program Kami
                        <ArrowRight className="w-4 h-4 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </button>
                    </Link>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center lg:justify-start">
                {["MTs & IL tersedia", "SPMB Cepat & Transparan", "Sistem Boarding Asrama"].map((point) => (
                  <span key={point} className="flex items-center gap-1.5 text-[11px] font-semibold"
                    style={{ color: "var(--color-ink-400)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-maroon-500)" }} />
                    {point}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Countdown Box */}
            <motion.div variants={fadeUp} initial="hidden" animate={animate} transition={{ delay: 0.52 }}
              className="w-full lg:w-auto">
              <div className="countdown-box flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Clock className="w-4 h-4" style={{ color: "var(--color-maroon-500)" }} />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest block"
                      style={{ color: "var(--color-maroon-700)" }}>Tutup Pendaftaran</span>
                    <span className="text-[10px] font-bold" style={{ color: "var(--color-ink-400)" }}>28 Desember 2026</span>
                  </div>
                </div>
                <div className="flex items-end gap-0.5">
                  {[{ value: countdown.days, label: "Hari" }, { value: countdown.hours, label: "Jam" },
                    { value: countdown.minutes, label: "Menit" }, { value: countdown.seconds, label: "Detik" }].map((unit, i) => (
                    <span key={unit.label} className="flex items-end gap-0.5">
                      <span className="countdown-unit">
                        <span className="countdown-number">{pad(unit.value)}</span>
                        <span className="countdown-label">{unit.label}</span>
                      </span>
                      {i < 3 && <span className="countdown-sep">:</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL SIDE */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={animate}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="relative w-full mt-4 lg:mt-0 lg:max-w-[500px] xl:max-w-[520px] lg:ml-auto"
            style={{ overflow: "visible" }}
          >
            {/* Main Image */}
            <div className="relative z-10"
              style={{ borderRadius: "2rem", border: "8px solid var(--color-white)",
                boxShadow: "0 20px 60px rgba(85, 0, 0, 0.14), 0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px var(--color-maroon-100)",
                overflow: "hidden" }}>
              <Image
                src="/images/hero.jpg"
                alt={`${BRANDING.schoolName} — Pesantren Al Imam Al Islami`}
                width={800}
                height={600}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="w-full h-auto object-cover aspect-[4/3]"
                style={{ transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
                onMouseEnter={(e) => { if (!shouldReduceMotion) e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: "linear-gradient(to top, rgba(85,0,0,0.45) 0%, transparent 55%)" }} />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                    color: "var(--color-maroon-800)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <BookOpen className="w-3 h-3" />
                  {BRANDING.schoolName}
                </span>
              </div>
            </div>

            {/* Floating Card 1: Program */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-7 -right-5 md:-top-4 lg:-top-6 md:-right-3 lg:-right-6 z-20 scale-[0.82] md:scale-100"
              style={{ transformOrigin: "right center" }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 8px 28px rgba(85,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--color-maroon-700) 0%, var(--color-maroon-950) 100%)",
                    boxShadow: "0 4px 12px rgba(85,0,0,0.3)" }}>
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-400)" }}>Tersedia</p>
                  <p className="text-sm font-black leading-tight" style={{ color: "var(--color-maroon-900)" }}>MTs & IL</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: "var(--color-ink-400)" }}>Kuota terbatas ✦</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Global */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-7 -left-5 md:-bottom-4 lg:-bottom-8 md:-left-3 lg:-left-6 z-20 scale-[0.82] md:scale-100"
              style={{ transformOrigin: "left center" }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 8px 28px rgba(85,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--color-cream-400) 0%, var(--color-cream-600) 100%)",
                    boxShadow: "0 4px 12px rgba(201,168,76,0.35)" }}>
                  <Globe className="w-5 h-5" style={{ color: "var(--color-maroon-900)" }} />
                </div>
                <div>
                  <p className="text-sm font-black leading-tight" style={{ color: "var(--color-maroon-900)" }}>Jaringan Global</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: "var(--color-ink-400)" }}>Universitas Islam 3 Benua</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge: Angkatan */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.5, rotate: shouldReduceMotion ? -6 : -25 }}
              animate={badgeAnimate}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.85, delay: shouldReduceMotion ? 0 : 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1.05 }}
              className="absolute -bottom-14 -right-3 md:bottom-8 md:-right-5 lg:bottom-12 lg:-right-8 z-30 cursor-default scale-[0.85] md:scale-100"
              style={{ background: "linear-gradient(135deg, var(--color-cream-300) 0%, var(--color-cream-500) 100%)",
                padding: "0.875rem 1rem", borderRadius: "1.25rem",
                border: "4px solid var(--color-white)",
                boxShadow: "0 12px 36px rgba(201,168,76,0.35), 0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <div className="text-center min-w-[76px]">
                <p className="text-[9px] font-black uppercase tracking-[0.1em] leading-none mb-1.5"
                  style={{ color: "var(--color-maroon-800)" }}>PPDB</p>
                <p className="text-base font-black leading-tight" style={{ color: "var(--color-maroon-950)" }}>
                  Angkatan<br />Pertama
                </p>
                <div className="mt-2 py-1 px-2.5 rounded-full" style={{ background: "rgba(85, 0, 0, 0.10)" }}>
                  <p className="text-[9px] font-bold" style={{ color: "var(--color-maroon-800)" }}>{BRANDING.academicYear}</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative glows */}
            <div className="absolute pointer-events-none" aria-hidden="true"
              style={{ bottom: "-56px", right: "-56px", width: "220px", height: "220px",
                background: "rgba(85, 0, 0, 0.10)", borderRadius: "50%", filter: "blur(60px)" }} />
            <div className="absolute pointer-events-none" aria-hidden="true"
              style={{ top: "-40px", left: "-40px", width: "180px", height: "180px",
                background: "rgba(201, 168, 76, 0.13)", borderRadius: "50%", filter: "blur(50px)" }} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
