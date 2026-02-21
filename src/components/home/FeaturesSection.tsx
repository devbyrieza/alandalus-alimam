"use client";

import Link from "next/link";
import { BookOpen, Award, Users, BookOpenCheck, ArrowRight, ShieldCheck, Zap, CheckCircle2, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Kitab Turots & Bahasa Arab",
    description: "Pendidikan Islam berbasis Kitab Turots dengan Bahasa Arab sebagai bahasa pengantar harian.",
  },
  {
    icon: Zap,
    title: "Aktif, Inovatif & Kreatif",
    description: "Pembelajaran yang Aktif, Inovatif, Kreatif, dan Menyenangkan untuk santri.",
  },
  {
    icon: Users,
    title: "Guru Kompeten & Ahli",
    description: "Guru yang Kompeten dan Ahli di Bidangnya membimbing santri secara intensif.",
  },
  {
    icon: ShieldCheck,
    title: "Karakter & Ibadah",
    description: "Pembiasaan Ibadah & Penanaman Karakter Islami berbasis Kesadaran.",
  },
  {
    icon: Building2,
    title: "Fasilitas Lengkap",
    description: "Fasilitas yang Lengkap & Memadai untuk menunjang kegiatan santri.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section id="keunggulan" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          {/* TEXT SIDE */}
          <div className="lg:w-1/2 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm">
                  <Award className="w-3.5 h-3.5" />
                  <span>Keunggulan Utama</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-3 tracking-tight leading-none uppercase">
                  Kenapa Harus <br />
                  <span className="text-brown-600">Al-Imam Sukabumi?</span>
                </h2>
                <p className="text-sm font-bold text-brown-600 uppercase tracking-widest mb-8">
                  Managed by Al-Andalus International Boarding School
                </p>
                <p className="text-lg text-ink-600 leading-relaxed font-medium text-justify lg:text-left">
                  Pendidikan Islam unggulan yang memadukan kurikulum terbaik untuk mencetak generasi Rabbani.
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-4">
                {FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex gap-5 group items-start">
                    <div className="w-14 h-14 rounded-2xl bg-surface-50 flex items-center justify-center border border-surface-100 shrink-0 shadow-premium-sm group-hover:bg-brown-600 group-hover:text-white transition-all duration-300">
                      <feature.icon className="w-7 h-7 text-brown-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-ink-950 text-lg mb-1 group-hover:text-brown-700 transition-colors">{feature.title}</h4>
                      <p className="text-base text-ink-500 leading-relaxed font-medium">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link href="/ppdb">
                  <button className="px-14 py-5 rounded-pill bg-brown-700 text-white font-bold shadow-premium-lg hover:shadow-premium-xl hover:bg-brown-800 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                    Daftar Sekarang
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* IMAGE/CARD SIDE */}
          <div className="lg:w-1/2 relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 grid grid-cols-2 gap-4 lg:gap-6"
            >
              <div className="space-y-4 lg:space-y-6 mt-12">
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-premium-lg min-h-[12rem] sm:min-h-[14rem] md:h-56 flex flex-col justify-end items-start border border-surface-100 group hover:shadow-premium-xl transition-all duration-500">
                  <p className="text-5xl font-display font-black text-ink-950 mb-2">30+</p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-ink-600">Tahun Mengabdi</p>
                    <p className="text-[11px] leading-tight text-ink-400 italic">
                      Sejak 1995 <br />
                      <span className="text-brown-600 font-bold">(Mulai Januari 2026 dikelola sepenuhnya oleh Al-Andalus)</span>
                    </p>
                  </div>
                </div>
                <div className="bg-brown-800 p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-premium-xl min-h-[14rem] sm:min-h-[18rem] md:h-72 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
                  <BookOpenCheck className="w-16 h-16 mb-6 text-white group-hover:scale-110 transition-transform duration-500" />
                  <p className="font-display font-black text-2xl text-white">Tahfidz<br />Intensif</p>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-premium-xl min-h-[14rem] sm:min-h-[18rem] md:h-72 flex flex-col justify-center items-center text-center relative overflow-hidden border border-surface-100 group hover:shadow-premium-xl transition-all duration-500">
                  <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-premium-sm group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-12 h-12 text-teal-600" />
                  </div>
                  <p className="font-display font-black text-2xl text-ink-950">Lingkungan<br />Islami</p>
                </div>
                <div className="bg-brown-100/30 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-premium-lg min-h-[12rem] sm:min-h-[14rem] md:h-56 flex flex-col justify-end items-start border border-brown-100/50">
                  <p className="text-3xl font-display font-black mb-1 text-brown-950">RESMI</p>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-brown-800">Ijazah Diakui Negara</p>
                    <p className="text-[10px] text-brown-900/60 font-bold leading-tight">
                      Kemendikdasmen RI (B)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brown-50 rounded-full blur-[120px] -z-0 opacity-50" />
          </div>

        </div>
      </Container>
    </section>
  );
}