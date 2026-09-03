// src/components/home/TestimonialsSection.tsx
"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, ShieldCheck } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Sangat bersyukur menyekolahkan anak di Al-Imam. Pendekatan keteladanan tanpa kekerasan membuat anak betah di asrama dan hafalannya lancar tanpa tekanan berlebih.",
    author: "Bapak Budi Santoso",
    role: "Wali Santri MTs Al-Imam",
    city: "Jakarta Selatan"
  },
  {
    text: "Sistem pendidikannya memadukan adab, bahasa Arab, dan akademik dengan sangat seimbang. Fasilitasnya representatif sehingga kami sebagai orang tua tenang melepas anak mukim.",
    author: "Ibu Aisyah Aminah",
    role: "Wali Santri I'dad Lughawi",
    city: "Bandung"
  },
  {
    text: "Alhamdulillah, pengajar di sini sangat komunikatif dengan orang tua. Perkembangan adab, sholat berjamaah, dan progres hafalan anak terpantau rutin lewat sistem digital.",
    author: "Bapak Riza Fahlevi",
    role: "Wali Santri MTs Al-Imam",
    city: "Sukabumi"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimoni" className="py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-4 py-1.5 rounded-full border border-[#ddc192]/50 inline-block">
            Pengalaman Otentik
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata <span className="text-[#550000]">Wali Santri?</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Kepercayaan para orang tua yang telah mempercayakan pendidikan aqidah, tahfidz, dan karakter putranya di Pesantren Al Imam.
          </p>
        </div>

        {/* Testimonials Grid (OMI Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#ddc192] text-[#ddc192]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.role} • {t.city}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#ddc192]/20 text-[#550000] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
