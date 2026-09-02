// src/components/home/CtaSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { BRANDING } from "@/config/branding";

export default function CtaSection() {
  return (
    <section className="bg-[#FAFAFA] py-24 md:py-32 relative overflow-hidden">
      <Container>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto rounded-[3rem] p-10 md:p-20 text-center overflow-hidden bg-maroon-950 border border-maroon-800 shadow-premium-2xl"
        >
          {/* Glowing effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-maroon-600/40 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cream-100 text-xs font-black uppercase tracking-[0.15em] shadow-sm mb-8 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Bergabung Bersama Kami
            </span>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              Masa Depan Generasi <br className="hidden md:block" />
              Dimulai dari Sini.
            </h2>
            
            <p className="text-lg text-maroon-200 max-w-2xl mx-auto mb-12 font-medium">
              Amankan kursi putra-putri Anda. Kuota penerimaan santri baru tahun ajaran {BRANDING.academicYear} sangat terbatas.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/ppdb">
                <button className="w-full sm:w-auto px-10 py-5 bg-white text-maroon-950 hover:bg-cream-50 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-3">
                  Daftar Sekarang <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/kontak">
                <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border border-white/30 hover:bg-white/10 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-3">
                  Hubungi CS
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
