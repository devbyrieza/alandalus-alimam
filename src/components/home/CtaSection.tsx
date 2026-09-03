// src/components/home/CtaSection.tsx
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BRANDING } from "@/config/branding";

const WA_URL = "https://wa.me/6285111524441";

export default function CtaSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-14 md:p-16 text-center overflow-hidden bg-gradient-to-br from-[#2D0000] via-[#400000] to-[#550000] text-white border border-white/15 shadow-xl"
        >
          {/* 3D Geometric Background Shapes (OMI Banner Exact) */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ddc192]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/3" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-3xl rotate-12 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ddc192] text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SPMB Tahun Ajaran {BRANDING.academicYear} Telah Dibuka</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Masa Depan Generasi Rabbani <br className="hidden sm:block" />
              <span className="text-[#ddc192]">Dimulai dari Sini.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Amankan kursi putra Anda sekarang. Kuota penerimaan santri baru dibatasi eksklusif 25 santri per rombongan belajar untuk memastikan intensitas bimbingan adab dan tahfidz mutqin.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                href="/SPMB"
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#ddc192] hover:bg-[#cfb280] text-[#550000] font-extrabold text-sm shadow-md shadow-[#ddc192]/30 transition-all inline-flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Daftar SPMB Online 2027</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-extrabold text-sm transition-all inline-flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Panitia SPMB</span>
              </a>
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
