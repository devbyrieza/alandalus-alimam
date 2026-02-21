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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left"
          >
            <div className="space-y-5 lg:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-brown-50 border border-brown-100 text-brown-700 text-[10px] lg:text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span className="text-center">Terakreditasi BAN-PDM • Sejak 1995</span>
              </motion.div>

              <h1 className="leading-[1.1] tracking-tight mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
                <span className="block">Kaderisasi Muslim</span>
                <span className="block text-brown-600">Bertakwa, Berdikari</span>
                <span className="block text-brown-600 whitespace-nowrap">& Berkontribusi</span>
              </h1>

              <p className="text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium font-sans text-center lg:text-left">
                Menerapkan sistem <span className="font-bold text-ink-950">Bimbingan & Pengawasan Melekat</span> disertai keteladanan untuk membangkitkan kesadaran santri. Tumbuh menjadi pribadi dewasa tanpa kekerasan dan luka pengasuhan.
              </p>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <Link href="/ppdb" className="w-full sm:w-auto">
                <Button size="lg" className="w-full px-8 lg:px-10 py-6 lg:py-7 text-sm lg:text-base font-bold rounded-2xl bg-brown-700 hover:bg-brown-800 text-white shadow-premium-lg transition-all duration-300 group min-h-[56px]">
                  Daftar PPDB Sekarang
                </Button>
              </Link>
              <Link href="/program" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full px-6 lg:px-8 py-6 lg:py-7 text-sm lg:text-base font-bold rounded-2xl border-2 border-surface-200 hover:bg-surface-50 hover:border-brown-200 text-ink-700 transition-all duration-300 min-h-[56px]">
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
            className="relative w-full"
          >
            {/* Main Image Container */}
            <div className="relative z-10 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-premium-xl border-[6px] sm:border-[10px] lg:border-[12px] border-white ring-1 ring-surface-200">
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

            {/* Floating Info Cards - Hidden on mobile, visible on tablet+ */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 lg:-top-6 -right-4 lg:-right-6 z-20 hidden sm:flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-premium-lg border border-surface-100"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-brown-50 flex items-center justify-center text-brown-600">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <p className="text-[10px] lg:text-xs font-bold text-ink-400 uppercase tracking-widest">Beasiswa</p>
                <p className="text-xs lg:text-sm font-bold text-ink-950">Hafidz Qur'an</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 lg:-bottom-10 -left-4 lg:-left-6 z-20 hidden sm:flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-5 rounded-xl lg:rounded-3xl shadow-premium-xl border border-surface-100"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                <Globe className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="hidden xs:block">
                <p className="text-xs lg:text-sm font-extrabold text-ink-950">Networking Global</p>
                <p className="text-[10px] lg:text-xs font-medium text-ink-500">Studi Lanjut Timur Tengah</p>
              </div>
            </motion.div>

            {/* Aesthetic Blobs */}
            <div className="absolute -z-10 -bottom-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 bg-brown-200/20 blur-3xl rounded-full" />
            <div className="absolute -z-10 -top-12 -left-12 w-36 h-36 sm:w-48 sm:h-48 bg-surface-200/30 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
