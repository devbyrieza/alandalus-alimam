// src/components/home/ActivitiesSection.tsx
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Shield,
  Tent,
  BookOpen,
  Globe,
  ArrowRight,
  Sparkles,
  Award
} from "lucide-react";

const ACTIVITIES = [
  {
    name: "Halaqah Tahfidz & Turots",
    category: "Keilmuan Islam",
    desc: "Kajian kitab kuning tematik dan setoran hafalan Al-Qur'an pagi dan petang.",
    icon: BookOpen
  },
  {
    name: "Bela Diri Karate & Silat",
    category: "Kebugaran Fisik",
    desc: "Melatih ketahanan fisik, konsentrasi, kedisiplinan, dan sportivitas bela diri.",
    icon: Shield
  },
  {
    name: "Klub Bahasa Arab & Inggris",
    category: "Bahasa Dunia",
    desc: "Debat ilmiah, pidato (muhadharah), dan penguasaan kosakata aktif harian.",
    icon: Globe
  },
  {
    name: "Pramuka & Kepanduan",
    category: "Leadership",
    desc: "Latihan kemandirian alam terbuka, survival, dan kepemimpinan regu santri.",
    icon: Tent
  }
];

export default function ActivitiesSection() {
  return (
    <section id="kegiatan" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-4 py-1.5 rounded-full border border-[#ddc192]/50 inline-block">
            Pengembangan Minat & Bakat
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Aktivitas Santri & <span className="text-[#550000]">Ekstrakurikuler</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Menyeimbangkan pembentukan ruhiyah, pengasahan logika, dan ketangkasan fisik santri melalui kegiatan positif.
          </p>
        </div>

        {/* 4 Clean Activity Cards (OMI Standard) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTIVITIES.map((act, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ddc192]/20 border border-[#ddc192]/40 text-[#550000] flex items-center justify-center font-bold mb-5">
                  <act.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                  {act.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-[#550000] transition-colors">
                  {act.name}
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Kegiatan Terjadwal</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/kegiatan"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#550000] hover:underline uppercase tracking-wider"
          >
            <span>Lihat Jadwal Harian & Semua Ekstrakurikuler</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </Container>
    </section>
  );
}
