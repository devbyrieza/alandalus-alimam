"use client";

// src/components/home/ActivitiesSection.tsx
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
    name: "Tata Boga, Menjahit & Merajut",
    category: "Life Skill Muslimah",
    desc: "Baking, pastry, menjahit busana muslimah, merajut, dan adab keputrian.",
    icon: Sparkles
  },
  {
    name: "English Club & Bahasa Arab",
    category: "Bahasa Dunia",
    desc: "Debat ilmiah, public speaking (muhadharah 3 bahasa), dan percakapan aktif.",
    icon: Globe
  },
  {
    name: "Karate Akhwat & Panahan",
    category: "Kebugaran Fisik",
    desc: "Melatih ketangkasan fisik, stamina, kedisiplinan, dan sportivitas bela diri muslimah.",
    icon: Shield
  }
];

export default function ActivitiesSection() {
  return (
    <section id="kegiatan" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-4 py-1.5 rounded-full border border-pink-200 inline-block">
            Pengembangan Minat & Bakat
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Aktivitas Santriwati & <span className="text-primary">Ekstrakurikuler</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Menyeimbangkan pembentukan ruhiyah, pengasahan logika, dan ketangkasan fisik santriwati melalui kegiatan positif.
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
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-primary flex items-center justify-center font-bold mb-5">
                  <act.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                  {act.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-primary transition-colors">
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
            className="inline-flex items-center gap-2 text-xs font-extrabold text-primary hover:underline uppercase tracking-wider"
          >
            <span>Lihat Jadwal Harian & Semua Ekstrakurikuler</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </Container>
    </section>
  );
}
