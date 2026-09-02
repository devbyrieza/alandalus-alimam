// src/app/program/page.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function ProgramPage() {
  return (
    <main className="pt-24 md:pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="eyebrow-pill mb-6 inline-flex"><Flame className="w-4 h-4 text-maroon-600"/> Program Pendidikan</span>
          <h1 className="text-4xl md:text-6xl font-black text-ink-950 mb-6 tracking-tight leading-tight">
            Pendidikan yang <br />
            <span className="gradient-text-maroon">Menyeluruh.</span>
          </h1>
          <p className="text-lg text-ink-500 font-medium">Kurikulum terpadu antara ilmu syar'i, tahfidz Al-Qur'an bersanad, dan kompetensi global.</p>
        </motion.div>
      </Container>
    </main>
  );
}
