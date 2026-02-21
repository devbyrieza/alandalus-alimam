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
import { navigateToDetail } from "@/lib/navigation-scroll";

export default function AboutSection() {
  
  const handleNavigateToDetail = () => {
    navigateToDetail('/tentang', '#about');
  };
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
              Mengedepankan <br /><span className="text-brown-600">Bimbingan & Pengawasan Melekat</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed font-medium text-justify md:text-center"
            >
              <span className="font-bold text-ink-950">Tanpa kekerasan dan luka pengasuhan.</span> Kami membangkitkan kesadaran santri melalui keteladanan pendidik, agar tumbuh menjadi pribadi yang dewasa dalam berpikir dan bertindak.
            </motion.p>
          </div>

          <div className="flex flex-col gap-8 mb-24">
            {/* Card Visi - Full Width Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 relative z-10 h-full flex flex-col items-center text-center shadow-premium-lg border border-surface-100 hover:shadow-premium-xl transition-all duration-500 overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-brown-50 flex items-center justify-center mb-6 shadow-premium-sm group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-8 h-8 text-brown-600" />
                </div>

                <p className="text-[11px] font-extrabold text-brown-600 uppercase tracking-[0.2em] mb-4 bg-brown-50 px-3 py-1 rounded-lg">Visi Utama</p>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-ink-950 mb-6 tracking-tight">Visi Kami</h3>

                <blockquote className="relative max-w-3xl mx-auto">
                  <p className="text-ink-950 leading-snug font-black text-2xl md:text-4xl italic">
                    "Kaderisasi Muslim Bertakwa, Berdikari, dan Berkontribusi."
                  </p>
                  <div className="mt-8 w-12 h-1.5 bg-brown-200 rounded-full mx-auto" />
                </blockquote>
              </div>
            </motion.div>

            {/* Card Misi - Full Width Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 relative z-10 h-full flex flex-col shadow-premium-lg border border-surface-100 hover:shadow-premium-xl transition-all duration-500 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between mb-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center shadow-premium-sm group-hover:scale-110 transition-transform duration-500 shrink-0">
                      <Rocket className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-ink-950 tracking-tight mb-2">Misi Kami</h3>
                      <p className="text-[11px] font-extrabold text-teal-600 uppercase tracking-[0.2em] bg-teal-50 px-3 py-1 rounded-lg w-fit">Langkah Strategis</p>
                    </div>
                  </div>
                </div>

                <ul className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    "Menguatkan akidah shahihah dan membiasakan beribadah sesuai sunnah dalam kehidupan sehari-hari melalui pembelajaran bahasa arab, ulumu syar'i, halaqoh tahfizh, dan adab islami.",
                    "Membimbing Soft Skill Santri melalui sistem pengasuhan berbasis fitrah dengan pendekatan kesadaran.",
                    "Membekali Hard Skill melalui pembelajaran kewirausahaan dan ekstrakurikuler sebagai bekal hidup mandiri.",
                    "Menanamkan jiwa dakwah santri melalui metode hikmah dan mauidzoh hasanah."
                  ].map((misi, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1 w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-teal-100 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      </div>
                      <p className="text-base font-medium text-ink-700 leading-relaxed">
                        {misi}
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


            <Link href="/tentang" onClick={handleNavigateToDetail} className="group flex items-center gap-3">
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

