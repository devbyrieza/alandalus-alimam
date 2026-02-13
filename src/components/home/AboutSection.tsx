"use client";

import Link from "next/link";
import {
  CheckCircle,
  Target,
  Rocket,
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-surface-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Profil Pesantren</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight leading-none"
            >
              Pendidikan Terbaik untuk <span className="text-brown-600">Buah Hati Anda</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Kami menggabungkan nilai-nilai Salafush Shalih dengan metodologi pengajaran modern untuk mencetak santri yang siap menghadapi tantangan zaman.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-24">
            {/* Card Visi */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative z-10 h-full flex flex-col shadow-premium-lg border border-surface-100 hover:shadow-premium-xl transition-all duration-500 overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-brown-50 flex items-center justify-center mb-8 shadow-premium-sm group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-8 h-8 text-brown-600" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-ink-950 mb-4 tracking-tight">Visi Kami</h3>
                <p className="text-[11px] font-extrabold text-brown-600 uppercase tracking-[0.2em] mb-8 bg-brown-50 px-3 py-1 rounded-lg w-fit">Visi Utama</p>

                <div className="flex-1">
                  <blockquote className="relative">
                    <p className="text-ink-950 leading-snug font-black text-xl md:text-2xl italic">
                      "Terwujudnya Lembaga Pendidikan Islam Unggul dalam Melahirkan Generasi Rabbani, Cendekia, dan Mandiri."
                    </p>
                    <div className="mt-8 w-12 h-1.5 bg-brown-200 rounded-full" />
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Card Misi */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative z-10 h-full flex flex-col shadow-premium-lg border border-surface-100 hover:shadow-premium-xl transition-all duration-500 overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-8 shadow-premium-sm group-hover:scale-110 transition-transform duration-500">
                  <Rocket className="w-8 h-8 text-teal-600" />
                </div>

                <h3 className="text-3xl font-display font-bold text-ink-950 mb-4 tracking-tight">Misi Kami</h3>
                <p className="text-[11px] font-extrabold text-teal-600 uppercase tracking-[0.2em] mb-8 bg-teal-50 px-3 py-1 rounded-lg w-fit">Langkah Strategis</p>

                <ul className="space-y-6 flex-1">
                  {[
                    { text: "Menyelenggarakan Pendidikan Berbasis ", highlight: "TICE", suffix: " (Technology, Islamic, Character, Entrepreneurship)" },
                    { text: "Membentuk ", highlight: "Hamalatul Qur'an", suffix: "" },
                    { text: "Menanamkan Jiwa ", highlight: "Entrepreneurship Muslim", suffix: "" }
                  ].map((misi, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1.5 w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-teal-100 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      </div>
                      <p className="text-base font-medium text-ink-700 leading-relaxed">
                        {misi.text}<span className="text-ink-950 font-bold">{misi.highlight}</span>{misi.suffix}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-10 pt-16 border-t border-surface-200"
          >


            <Link href="/tentang" className="group flex items-center gap-3">
              <button className="px-10 py-5 rounded-pill bg-brown-700 text-white font-bold shadow-premium-lg hover:shadow-premium-xl hover:bg-brown-800 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Profil Lengkap
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}


