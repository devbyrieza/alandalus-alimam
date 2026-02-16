"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counters, setCounters] = useState({
    years: 0,
    students: 0,
    programs: 0,
  });

  useEffect(() => {
    if (inView) {
      const animateCounter = (target: number, key: keyof typeof counters) => {
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      };

      animateCounter(30, 'years');
      animateCounter(750, 'students');
      animateCounter(5, 'programs');
    }
  }, [inView]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brown-100/30 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[40%] bg-surface-100/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-brown-50/40 blur-[80px] rounded-full" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 lg:gap-10 text-center lg:text-left"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brown-50 border border-brown-100 text-brown-700 text-xs font-bold uppercase tracking-widest"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Terakreditasi Pendasmen • Sejak 1995</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-ink-950 leading-[1.1] tracking-tight">
                Generasi Rabbani, <br />
                <span className="text-brown-600">Cendekia</span> <br className="hidden lg:block" />
                <span className="text-brown-600 relative inline-block">
                  & Mandiri
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-brown-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-ink-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium font-sans text-justify lg:text-left">
                Pendidikan Islam unggul berbasis Kurikulum TICE untuk melahirkan kader Qur'ani yang beradab, berilmu, dan siap menghadapi tantangan zaman.
              </p>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/daftar">
                <Button size="lg" className="w-full sm:w-auto px-8 py-7 text-base font-bold rounded-2xl bg-brown-700 hover:bg-brown-800 text-white shadow-premium-lg transition-all duration-300 group">
                  Daftar PPDB Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/program">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-7 text-base font-bold rounded-2xl border-2 border-surface-200 hover:bg-surface-50 hover:border-brown-200 text-ink-700 transition-all duration-300">
                  Lihat Program Studi
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative z-10 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-premium-xl border-[8px] sm:border-[12px] border-white ring-1 ring-surface-200">
              <Image
                src="/images/hero.png"
                alt="Pesantren Al-Imam"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Info Cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 hidden sm:flex items-center gap-4 bg-white p-4 rounded-2xl shadow-premium-lg border border-surface-100"
            >
              <div className="w-12 h-12 rounded-xl bg-brown-50 flex items-center justify-center text-brown-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink-400 uppercase tracking-widest">Beasiswa</p>
                <p className="text-sm font-bold text-ink-950">Hafidz Qur'an</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 z-20 hidden sm:flex items-center gap-4 bg-white p-5 rounded-3xl shadow-premium-xl border border-surface-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-ink-950">Networking Global</p>
                <p className="text-xs font-medium text-ink-500">Studi Lanjut Timur Tengah</p>
              </div>
            </motion.div>

            {/* Aesthetic Blobs */}
            <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-brown-200/20 blur-3xl rounded-full" />
            <div className="absolute -z-10 -top-12 -left-12 w-48 h-48 bg-surface-200/30 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

