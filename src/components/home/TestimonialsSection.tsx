"use client";

import Link from "next/link";
import { MessageCircle, Star, ArrowRight, Quote, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Bpk. Surwanto",
    role: "Wali Santri",
    initial: "S",
    quote:
      "Tujuan kami menyekolahkan anak ke sini agar mereka paham agama. Di sini, pembiasaan ibadah dan adab benar-benar menjadi prioritas harian.",
  },
  {
    name: "Ibu Endah Wulandari",
    role: "Wali Santri",
    initial: "E",
    quote:
      "Kurikulum tahfidznya sangat sistematis. Tidak hanya mengejar target hafalan, tapi juga sangat ditekankan pada makhraj dan tajwid yang benar.",
  },
  {
    name: "Muhammad Razan",
    role: "Alumni Al-Imam",
    initial: "R",
    quote:
      "Disiplin bahasa Arab dan hafalan Al-Qur'an yang saya dapatkan sangat membantu saat saya melanjutkan pendidikan ke jenjang yang lebih tinggi.",
  },
  {
    name: "Faisal Ahmad",
    role: "Alumni Al-Imam",
    initial: "A",
    quote:
      "Alhamdulillah, berkat bimbingan intensif asatidz di sini, saya bisa lulus seleksi masuk universitas di Timur Tengah. Fondasi bahasa Arabnya benar-benar mantap.",
  },
] as const;

function TestimonialCard({
  name,
  role,
  initial,
  quote,
  idx
}: (typeof TESTIMONIALS)[number] & { idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white p-8 rounded-[2.5rem] h-full flex flex-col relative group border border-surface-100 shadow-premium-lg hover:shadow-premium-xl transition-all duration-500"
    >
      <Quote className="absolute top-8 right-8 w-10 h-10 text-brown-50 group-hover:text-brown-100 transition-colors" />

      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
        ))}
      </div>

      <p className="text-ink-600 leading-relaxed mb-8 flex-grow italic font-medium relative z-10">
        "{quote}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-2xl bg-brown-700 flex items-center justify-center text-white font-display font-black text-lg shadow-premium-sm group-hover:scale-110 transition-transform duration-500">
          {initial}
        </div>
        <div>
          <p className="text-base font-bold text-ink-950 leading-none mb-1">{name}</p>
          <p className="text-xs text-ink-500 font-bold uppercase tracking-wider">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brown-50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 opacity-50" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Testimoni</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight"
          >
            Apa Kata <span className="text-brown-600">Mereka?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-600 font-medium leading-relaxed"
          >
            Kepercayaan wali santri dan tokoh pendidikan adalah amanah bagi kami untuk terus memberikan yang terbaik.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} idx={idx} />
          ))}
        </div>

      </Container>
    </section>
  );
}