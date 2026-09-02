// src/components/home/TestimonialsSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Sangat bersyukur menyekolahkan anak di Al Imam. Pendekatan tanpa kekerasan membuat anak betah di asrama dan hafalannya lancar tanpa paksaan berlebih.",
    author: "Bapak Budi Santoso",
    role: "Wali Santri MTs"
  },
  {
    text: "Sistem pendidikannya memadukan adab dan ilmu dengan sangat seimbang. Fasilitasnya pun modern sehingga kami sebagai orang tua tenang melepas anak.",
    author: "Ibu Aisyah Aminah",
    role: "Wali Santri I'dad Lughowi"
  },
  {
    text: "Alhamdulillah, pengajar di sini sangat komunikatif dengan orang tua. Progres hafalan dan akademik anak terpantau rutin lewat sistem digital.",
    author: "Bapak Riza Fahlevi",
    role: "Wali Santri MTs"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Header */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <span className="eyebrow-pill-gold mb-6">
              <MessageSquareQuote className="w-4 h-4 text-cream-600" />
              Testimoni Wali Santri
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-ink-950 leading-tight mb-6">
              Apa Kata <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-500 to-cream-700">Mereka?</span>
            </h2>
            <p className="text-lg text-ink-500 font-medium">Pengalaman otentik dari para orang tua yang telah mempercayakan pendidikan putra-putrinya di Pesantren Al Imam Al Islami.</p>
          </div>

          {/* Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`p-8 rounded-[2rem] border ${i === 2 ? 'md:col-span-2 lg:col-span-1 hidden md:block lg:hidden xl:block' : ''} bg-surface-50 border-surface-200 shadow-sm`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-cream-500 text-cream-500" />)}
                </div>
                <p className="text-base text-ink-800 font-medium leading-relaxed italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center font-bold text-cream-700 text-lg">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-ink-950">{t.author}</p>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
