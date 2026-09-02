// src/components/home/ProcessSection.tsx
"use client";

import Link from "next/link";
import {
  UserPlus,
  FileText,
  CreditCard,
  ClipboardCheck,
  GraduationCap,
  BellRing,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────
const STEPS = [
  {
    icon: UserPlus,
    title: "Buat Akun",
    description: "Daftarkan data diri awal dan buat akun pendaftaran santri baru.",
    accent: "maroon"
  },
  {
    icon: CreditCard,
    title: "Pembayaran",
    description: "Bayar biaya daftar & unggah bukti transfer ke dashboard online.",
    accent: "gold"
  },
  {
    icon: FileText,
    title: "Lengkapi Berkas",
    description: "Isi form biodata lengkap dan unggah dokumen persyaratan digital.",
    accent: "maroon"
  },
  {
    icon: ClipboardCheck,
    title: "Seleksi",
    description: "Hadiri dan ikuti ujian seleksi Al-Qur'an, wawancara, dan tes tulis.",
    accent: "gold"
  },
  {
    icon: BellRing,
    title: "Pengumuman",
    description: "Lihat hasil kelulusan seleksi melalui dashboard & WhatsApp.",
    accent: "maroon"
  },
  {
    icon: GraduationCap,
    title: "Daftar Ulang",
    description: "Lengkapi administrasi akhir setelah dinyatakan lolos seleksi.",
    accent: "cream"
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Main ─────────────────────────────────────────────
export default function ProcessSection() {
  return (
    <section id="alur" className="section-cream relative border-y border-maroon-100/60 overflow-hidden py-20 md:py-28">
      {/* Background glow */}
      <div className="absolute -top-32 right-0 translate-x-1/3 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }} />
      <div className="absolute -bottom-24 left-0 -translate-x-1/3 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(85,0,0,0.08) 0%, transparent 65%)" }} />

      <Container className="relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-center mb-5"
          >
            <span className="eyebrow-pill">
              <Sparkles className="w-3 h-3" />
              Prosedur Mudah & Transparan
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6, ease: EASE }}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-maroon-950"
          >
            Alur <span className="gradient-text-maroon">Pendaftaran</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="text-base text-ink-500 max-w-xl mx-auto"
          >
            Ikuti langkah-langkah mudah berikut untuk menjadi bagian dari
            keluarga besar Pesantren Al Imam Al Islami. Proses kami rancang untuk kenyamanan Anda.
          </motion.p>
        </div>

        {/* ── Steps Grid (Cinova Style) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 max-w-6xl mx-auto">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: idx * 0.08, duration: 0.55, ease: EASE }}
              className="relative pt-6"
            >
              <div className="step-ghost-number">0{idx + 1}</div>
              <div className="card-glass relative z-10 h-full p-8 flex flex-col items-start hover-lift">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm
                  ${step.accent === 'maroon' ? 'bg-maroon-50 text-maroon-600 border border-maroon-200' : 
                    step.accent === 'gold' ? 'bg-cream-50 text-cream-600 border border-cream-200' : 
                    'bg-surface-50 text-maroon-500 border border-surface-200'}`}>
                  <step.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-maroon-900 mb-3">{step.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed font-medium">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Link href="/SPMB">
            <button className="btn-glow-maroon inline-flex items-center gap-2.5 px-10 group/btn">
              <span>Daftar Sebagai Santri</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                strokeWidth={2}
              />
            </button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

