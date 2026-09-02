// src/app/kontak/page.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function KontakPage() {
  return (
    <main className="pt-24 md:pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="eyebrow-pill mb-6 inline-flex"><Phone className="w-4 h-4 text-maroon-600"/> Hubungi Kami</span>
          <h1 className="text-4xl md:text-6xl font-black text-ink-950 mb-6 tracking-tight leading-tight">
            Kami Siap <br />
            <span className="gradient-text-maroon">Membantu.</span>
          </h1>
          <p className="text-lg text-ink-500 font-medium">Jangan ragu untuk menghubungi kami untuk pertanyaan lebih lanjut tentang pesantren.</p>
        </motion.div>
      </Container>
    </main>
  );
}
