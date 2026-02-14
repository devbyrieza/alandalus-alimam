"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Plus, Minus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        question: "Kapan pendaftaran santri baru angkatan 2026/2027 dibuka?",
        answer: "Pendaftaran PPDB Tahun Ajaran 2026/2027 dibuka mulai tanggal 10 Februari sampai dengan 30 Mei 2026. Namun, pendaftaran dapat ditutup lebih awal jika kuota santri baru sudah terpenuhi.",
    },
    {
        question: "Apakah santri diwajibkan untuk tinggal di asrama?",
        answer: "Ya, seluruh santri di Pesantren Al-Imam wajib tinggal di asrama untuk mengikuti seluruh rangkaian kegiatan tarbiyah, halaqah tahfidz, dan pembelajaran kitab turats secara maksimal.",
    },
    {
        question: "Kurikulum apa yang diterapkan di Pesantren Al-Imam?",
        answer: "Kami menerapkan Kurikulum Terpadu yang menggabungkan kurikulum Nasional dengan kurikulum khas Al-Andalus yang berfokus pada penguasaan Bahasa Arab, Tahfidz Al-Qur'an, dan Kitab Turats.",
    },
    {
        question: "Apa saja berkas persyaratan yang harus disiapkan?",
        answer: "Berkas utama yang diperlukan adalah Akta Kelahiran, Kartu Keluarga, Ijazah/Rapor terakhir, dan pas foto terbaru. Seluruh berkas diunggah secara digital melalui dashboard pendaftaran.",
    },
    {
        question: "Bagaimana sistem seleksi yang diterapkan?",
        answer: "Sistem seleksi meliputi tes lisan (tahfidz/bacaan Al-Qur'an), tes tertulis (pengetahuan dasar agama dan akademik), serta wawancara santri dan orang tua.",
    },
    {
        question: "Apakah tersedia program beasiswa?",
        answer: "Ya, Al-Imam menyediakan program beasiswa bagi santri berprestasi (tahfidz 30 juz) dan santri dari keluarga yatim/piatu/dhuafa dengan syarat dan ketentuan yang berlaku.",
    },
] as const;

function FaqItem({ question, answer, isOpen, toggle }: { question: string, answer: string, isOpen: boolean, toggle: () => void }) {
    return (
        <div className={`rounded-3xl border transition-all duration-300 ${isOpen ? 'bg-white border-brown-200 shadow-premium-lg' : 'bg-surface-50 border-surface-100'}`}>
            <button
                onClick={toggle}
                className="w-full px-6 py-5 md:px-8 md:py-6 text-left flex items-center justify-between gap-4"
            >
                <span className={`font-bold text-lg md:text-xl tracking-tight transition-colors ${isOpen ? 'text-brown-700' : 'text-ink-950'}`}>
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-brown-600 text-white rotate-180' : 'bg-white text-ink-400 border border-surface-200'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 md:px-8 md:pb-8">
                            <div className="h-px bg-surface-100 mb-6" />
                            <p className="text-ink-600 leading-relaxed font-medium text-left">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brown-50 rounded-full blur-[100px] opacity-60" />

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Tanya Jawab</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-ink-950 mb-8 tracking-tight"
                    >
                        Sering <span className="text-brown-600">Ditanyakan</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-ink-600 font-medium max-w-2xl mx-auto"
                    >
                        Temukan jawaban cepat untuk pertanyaan umum seputar pendaftaran, biaya, dan sistem pendidikan di Al-Imam Al-Islami.
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {FAQS.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <FaqItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === idx}
                                toggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-ink-500 font-medium mb-4">Punya pertanyaan lain?</p>
                    <a
                        href="https://wa.me/6285111524441"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-brown-600 font-bold hover:text-brown-700 transition-colors group"
                    >
                        Hubungi Panitia PPDB via WhatsApp
                        <div className="w-6 h-6 rounded-full bg-brown-50 flex items-center justify-center group-hover:bg-brown-100 transition-colors">
                            <ChevronDown className="w-4 h-4 rotate-270" />
                        </div>
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
