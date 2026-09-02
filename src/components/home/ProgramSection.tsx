// src/components/home/ProgramSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { BookOpen, BookKey, GraduationCap, Flame, ArrowRight } from "lucide-react";

const PROGRAMS = [
  {
    title: "Madrasah Tsanawiyah (MTs)",
    badge: "Terakreditasi",
    desc: "Pendidikan menengah pertama dengan ijazah negara dipadukan dengan kurikulum kepesantrenan intensif.",
    icon: GraduationCap,
    color: "maroon"
  },
  {
    title: "I'dad Lughowi (IL)",
    badge: "Intensif 1 Tahun",
    desc: "Program persiapan bahasa Arab intensif selama satu tahun bagi lulusan SMP umum yang ingin melanjutkan ke MA.",
    icon: BookKey,
    color: "gold"
  },
  {
    title: "Madrasah Aliyah (MA)",
    badge: "Segera Hadir",
    desc: "Pendidikan menengah atas berfokus pada pendalaman literatur Islam (Turots) dan kesiapan universitas global.",
    icon: BookOpen,
    color: "cream"
  }
];

export default function ProgramSection() {
  return (
    <section id="program" className="section-cream py-24 md:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="eyebrow-pill mb-6">
            <Flame className="w-4 h-4" />
            Program Unggulan
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-ink-950 mb-6 leading-tight">
            Pilihan Jenjang <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-500 to-cream-700">Pendidikan Terbaik.</span>
          </h2>
          <p className="text-lg text-ink-500 font-medium">Dirancang khusus untuk mencetak generasi yang tidak hanya cerdas secara akademik, tapi juga matang secara emosional dan spiritual.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PROGRAMS.map((prog, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`bg-white rounded-[2rem] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-2 hover:shadow-premium-xl
                ${prog.color === 'maroon' ? 'border-maroon-100 hover:border-maroon-300' : prog.color === 'gold' ? 'border-cream-200 hover:border-cream-400' : 'border-surface-200 hover:border-surface-400'}`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm
                  ${prog.color === 'maroon' ? 'bg-maroon-50 text-maroon-600' : prog.color === 'gold' ? 'bg-cream-100 text-cream-700' : 'bg-surface-100 text-surface-600'}`}>
                  <prog.icon className="w-8 h-8" />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                  ${prog.color === 'maroon' ? 'bg-maroon-600 text-white' : prog.color === 'gold' ? 'bg-cream-500 text-white' : 'bg-surface-200 text-surface-600'}`}>
                  {prog.badge}
                </span>
              </div>
              <h3 className="text-2xl font-black text-ink-950 mb-4">{prog.title}</h3>
              <p className="text-ink-500 leading-relaxed font-medium mb-8">{prog.desc}</p>
              
              <button className="flex items-center gap-2 text-sm font-bold text-ink-900 group">
                Pelajari Selengkapnya
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
