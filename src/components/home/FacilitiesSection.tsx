// src/components/home/FacilitiesSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Building2, Home, BookOpen, Utensils, MonitorPlay, Dumbbell, Sparkles } from "lucide-react";
import Image from "next/image";

const FACILITIES = [
  { title: "Asrama Nyaman", desc: "Kapasitas ideal per kamar dengan sirkulasi udara baik.", icon: Home, bg: "bg-surface-50" },
  { title: "Masjid Jami'", desc: "Pusat kegiatan ibadah dan halaqah tahfidz 24 jam.", icon: Building2, bg: "bg-maroon-50" },
  { title: "Perpustakaan", desc: "Koleksi kitab turots dan literatur Islam lengkap.", icon: BookOpen, bg: "bg-cream-50" },
  { title: "Ruang Makan", desc: "Kantin bersih dengan standar gizi dan sanitasi tinggi.", icon: Utensils, bg: "bg-surface-50" },
  { title: "Lab Komputer", desc: "Fasilitas penunjang ujian dan literasi digital.", icon: MonitorPlay, bg: "bg-surface-50" },
  { title: "Sarana Olahraga", desc: "Lapangan luas untuk kebugaran fisik santri.", icon: Dumbbell, bg: "bg-cream-50" },
];

export default function FacilitiesSection() {
  return (
    <section id="fasilitas" className="bg-[#FAFAFA] py-24 md:py-32">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          <div className="lg:w-1/3 text-center lg:text-left">
            <span className="eyebrow-pill mb-6">
              <Sparkles className="w-4 h-4 text-maroon-600" />
              Fasilitas Modern
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-ink-950 mb-6 leading-tight">
              Lingkungan <br className="hidden lg:block"/>
              <span className="gradient-text-maroon">Kondusif.</span>
            </h2>
            <p className="text-lg text-ink-500 font-medium leading-relaxed mb-8">
              Kami merancang infrastruktur terbaik untuk mendukung kenyamanan belajar, beribadah, dan istirahat santri. Ekosistem pendidikan yang lengkap dalam satu kawasan.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {FACILITIES.map((fac, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`${fac.bg} p-6 rounded-3xl border border-surface-200 hover:border-maroon-300 transition-colors shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left`}
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5">
                  <fac.icon className="w-6 h-6 text-maroon-700" />
                </div>
                <h3 className="font-bold text-ink-900 mb-2">{fac.title}</h3>
                <p className="text-xs text-ink-500 font-medium leading-relaxed">{fac.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
