// src/components/home/ActivitiesSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

export default function ActivitiesSection() {
  return (
    <section className="bg-[#FAFAFA] py-24">
      <Container>
        <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-surface-200 shadow-premium-md text-center max-w-4xl mx-auto">
          <span className="eyebrow-pill mb-6">
            <Dumbbell className="w-4 h-4 text-maroon-600" /> Ekstrakurikuler
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-ink-950 mb-6">
            Pengembangan <span className="gradient-text-maroon">Karakter & Bakat.</span>
          </h2>
          <p className="text-ink-500 font-medium max-w-2xl mx-auto mb-10">Kegiatan di luar jam belajar yang melatih kepemimpinan, kemandirian, dan keterampilan fisik santri.</p>
          <div className="flex flex-wrap justify-center gap-3">
             {["Futsal", "Basket", "Bela Diri", "Kajian Kitab", "Klub Bahasa", "Pramuka"].map((act, i) => (
               <span key={i} className="px-5 py-2.5 bg-surface-50 border border-surface-200 rounded-full text-sm font-bold text-ink-800">{act}</span>
             ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
