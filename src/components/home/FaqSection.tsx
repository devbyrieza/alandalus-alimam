// src/components/home/FaqSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Kapan pendaftaran santri baru angkatan 2027/2028 dibuka?",
    answer: "Pendaftaran SPMB Tahun Ajaran 2027/2028 dibuka mulai tanggal 5 September sampai dengan 28 Desember 2026. Namun, pendaftaran dapat ditutup lebih awal jika kuota santri baru sebanyak 25 santri per rombel telah terpenuhi."
  },
  {
    question: "Apakah santri diwajibkan untuk tinggal di asrama?",
    answer: "Ya, seluruh santri di Pesantren Al Imam Al Islami wajib mukim di asrama pondok guna mengikuti program pembinaan adab 24 jam, halaqah tahfidz Al-Qur'an intensif, dan penguasaan bahasa Arab secara komprehensif."
  },
  {
    question: "Kurikulum apa yang diterapkan di Pesantren Al Imam Al Islami?",
    answer: "Kami menerapkan Kurikulum Terpadu yang mengintegrasikan Kurikulum Kementerian Agama RI dengan Kurikulum Kepesantrenan Turots (Kajian Kitab Kuning/Syar'i bersanad) serta pembekalan sains dan teknologi modern."
  },
  {
    question: "Apa saja berkas persyaratan yang harus disiapkan untuk mendaftar?",
    answer: "Berkas utama meliputi Akta Kelahiran, Kartu Keluarga (KK), NISN, rapor pendidikan terakhir, serta pas foto terbaru. Seluruh berkas diunggah secara digital dalam format PDF/JPG melalui dashboard pendaftaran."
  },
  {
    question: "Bagaimana tahapan ujian seleksi masuk santri baru?",
    answer: "Ujian seleksi terdiri dari tes lisan (tahfidz dan kemampuan membaca Al-Qur'an), tes tertulis (kemampuan dasar akademik), serta tes wawancara kesiapan belajar bagi calon santri dan orang tua/wali."
  },
  {
    question: "Apakah tersedia program beasiswa prestasi?",
    answer: "Ya, Pesantren Al Imam Al Islami menyediakan kuota beasiswa khusus bagi calon santri berprestasi yang telah memiliki hafalan Al-Qur'an mutqin serta juara olimpiade sains tingkat kabupaten/provinsi/nasional."
  }
];

const WA_URL = "https://wa.me/6285111524441";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-4 py-1.5 rounded-full border border-[#ddc192]/50 inline-block">
            Pusat Bantuan & Informasi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang <span className="text-[#550000]">Sering Diajukan</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Temukan jawaban cepat seputar persyaratan, kurikulum, sistem asrama, dan prosedur SPMB.
          </p>
        </div>

        {/* Clean Accordion List (OMI FAQ Standard) */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen ? "border-[#ddc192] shadow-sm bg-[#FDFCF9]" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 p-5 sm:p-6 focus:outline-none"
                >
                  <span className={`text-sm sm:text-base font-extrabold transition-colors leading-snug ${
                    isOpen ? "text-[#550000]" : "text-slate-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? "bg-[#550000] text-white rotate-180" : "bg-slate-100 text-slate-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#ddc192]/25 text-[#550000] flex items-center justify-center shrink-0 font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Punya pertanyaan lain yang belum terjawab?
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Tim Admisi Pesantren siap membantu menjawab pertanyaan Anda melalui WhatsApp.
              </p>
            </div>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all inline-flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp CS</span>
          </a>
        </div>

      </Container>
    </section>
  );
}
