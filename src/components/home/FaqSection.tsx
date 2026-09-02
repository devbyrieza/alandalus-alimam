// src/components/home/FaqSection.tsx
"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, MessageCircleMore, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Kapan pendaftaran santri baru angkatan 2027/2028 dibuka?",
    answer: "Pendaftaran SPMB Tahun Ajaran 2027/2028 dibuka mulai tanggal 5 September sampai dengan 28 Desember 2026. Namun, pendaftaran dapat ditutup lebih awal jika kuota santri baru sudah terpenuhi."
  },
  {
    question: "Apakah santri diwajibkan untuk tinggal di asrama?",
    answer: "Ya, seluruh santri di Pesantren Al Imam Al Islami wajib tinggal di asrama untuk mengikuti seluruh rangkaian kegiatan tarbiyah, halaqah tahfidz, dan pembelajaran kitab turots secara maksimal."
  },
  {
    question: "Kurikulum apa yang diterapkan di Pesantren Al Imam Al Islami?",
    answer: "Kami menerapkan Kurikulum Terpadu yang menggabungkan kurikulum Nasional dengan kurikulum khas Andalus yang berfokus pada penguasaan Bahasa Arab, Tahfidz Al-Qur'an, dan Kitab Turots."
  },
  {
    question: "Apa saja berkas persyaratan yang harus disiapkan?",
    answer: "Berkas utama yang diperlukan adalah Akta Kelahiran, Kartu Keluarga, Ijazah/Rapor terakhir, dan pas foto terbaru. Seluruh berkas diunggah secara digital melalui dashboard pendaftaran."
  },
  {
    question: "Bagaimana sistem seleksi yang diterapkan?",
    answer: "Sistem seleksi meliputi tes lisan (tahfidz/bacaan Al-Qur'an), tes tertulis (pengetahuan dasar agama dan akademik), serta Seleksi Wawancara Calon Santri dan orang tua."
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;
const WA_URL = "https://wa.me/6285111524441";

function FaqItem({
  question,
  answer,
  isOpen,
  toggle,
  index
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: EASE }}
    >
      <div className={`rounded-3xl border bg-white overflow-hidden transition-all duration-300 ${isOpen ? "border-maroon-300 shadow-premium-md ring-1 ring-maroon-100" : "border-maroon-100 hover:border-maroon-300 hover:shadow-premium-sm"}`}>
        <button
          onClick={toggle}
          className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 focus:outline-none rounded-3xl"
        >
          <span className={`font-bold text-[0.9375rem] md:text-base leading-snug tracking-tight transition-colors duration-200 pr-3 ${isOpen ? "text-maroon-700" : "text-ink-900"}`}>
            {question}
          </span>
          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-maroon-50 text-maroon-600" : "bg-surface-50 text-ink-400 group-hover:bg-maroon-50 group-hover:text-maroon-500"}`}>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ease-spring ${isOpen ? "-rotate-180" : "rotate-0"}`} />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="px-6 pb-6 md:px-8 md:pb-7">
                <div className="h-px w-full bg-surface-100 mb-4 md:mb-5" />
                <p className="text-ink-600 text-sm md:text-[0.9375rem] leading-relaxed font-medium">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="section-cream py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-maroon-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cream-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="lg:sticky lg:top-32 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <span className="eyebrow-pill">
                <HelpCircle className="w-3.5 h-3.5" />
                Tanya Jawab
              </span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-black mb-5 text-maroon-950 leading-tight"
            >
              Pertanyaan <br className="hidden lg:block" />
              <span className="gradient-text-maroon">Sering Diajukan</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
              className="text-base text-ink-500 mb-8 max-w-md mx-auto lg:mx-0 font-medium"
            >
              Temukan jawaban atas pertanyaan seputar pendaftaran, kurikulum, dan kehidupan di Pesantren Al Imam Al Islami.
            </motion.p>

            {/* WA Box */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-premium-sm text-center lg:text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-cream-50 text-maroon-600 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                <MessageCircleMore className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-maroon-950 mb-2">Belum menemukan jawaban?</h4>
              <p className="text-sm text-ink-500 mb-5">Tim Admisi kami siap membantu Anda 24/7 melalui WhatsApp.</p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="block w-full">
                <button className="btn-glow-maroon w-full justify-center">
                  Hubungi CS Admisi
                </button>
              </a>
            </motion.div>
          </div>

          {/* Right Column (Accordion) */}
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, idx) => (
              <FaqItem
                key={idx}
                index={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === idx}
                toggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
