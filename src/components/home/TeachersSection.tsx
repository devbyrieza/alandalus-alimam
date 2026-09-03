// src/components/home/TeachersSection.tsx
"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Users, Award, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import { BRANDING } from "@/config/branding";

const TEACHERS = [
  {
    role: "Pimpinan / Mudir",
    title: "Dewan Asatidzah Senior",
    institution: "Alumni Timur Tengah & Al-Andalus",
    desc: "Membina arah kebijakan pendidikan, aqidah shahihah, dan manhaj tarbiyah santri.",
    icon: Award,
    badge: "Pimpinan"
  },
  {
    role: "Kepala Kepesantrenan",
    title: "Koordinator Tahfidz & Qira'ah",
    institution: "Hafizh 30 Juz Bersanad",
    desc: "Membimbing halaqah intensif, tahsin, mutqin, dan pengambilan sanad qira'ah Al-Qur'an.",
    icon: BookOpen,
    badge: "Tahfidz"
  },
  {
    role: "Kepala Madrasah",
    title: "Tim Kurikulum Akademik",
    institution: "Pakar Kurikulum Nasional & Kemenag",
    desc: "Mengawal integrasi sains modern, literasi digital, dan kesiapan ijazah formal negara.",
    icon: GraduationCap,
    badge: "Akademik"
  },
  {
    role: "Kepala Pengasuhan & Musyrif",
    title: "Tim Kesantrian 24 Jam",
    institution: "Tarbiyah Adab & Karakter",
    desc: "Mendampingi santri di asrama dengan pendekatan keteladanan penuh tanpa kekerasan.",
    icon: ShieldCheck,
    badge: "Pengasuhan"
  }
];

export default function TeachersSection() {
  return (
    <section id="pengajar" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-4 py-1.5 rounded-full border border-[#ddc192]/50 inline-block">
            Kompetensi & Keteladanan
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Dibimbing oleh <span className="text-[#550000]">Asatidzah Ahli</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Didukung barisan pendidik berkompeten lulusan universitas Islam ternama dan praktisi pendidikan teruji.
          </p>
        </div>

        {/* 4 Clean Asatidzah Pillar Cards (OMI Enterprise Standard) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS.map((teacher, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#ddc192]/20 border border-[#ddc192]/40 text-[#550000] flex items-center justify-center font-bold">
                    <teacher.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                    {teacher.badge}
                  </span>
                </div>

                <span className="text-xs font-extrabold text-[#550000] uppercase tracking-wider block mb-1">
                  {teacher.role}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-[#550000] transition-colors">
                  {teacher.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mb-3">
                  {teacher.institution}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {teacher.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#550000]" />
                <span>Standar Mutu Al-Andalus IIBS</span>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
