// src/components/home/TeachersSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";

export default function TeachersSection() {
  return (
    <section className="bg-white py-24 border-y border-surface-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow-pill mb-6">
            <Users className="w-4 h-4 text-maroon-600" /> Asatidzah
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-ink-950 mb-6">
            Dibimbing oleh <span className="gradient-text-maroon">Ahlinya.</span>
          </h2>
        </div>
        {/* Placeholder for teachers grid, matching Cinova style clean cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-surface-50 rounded-[2rem] border border-surface-200 aspect-[3/4] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-maroon-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               <p className="font-bold text-ink-400 text-sm">Foto Ustadz {i}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
