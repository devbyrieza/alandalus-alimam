"use client";

import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

export default function CtaSection() {
    return (
        <section className="py-24 bg-surface-50 relative overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-brown-900 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-24 relative overflow-hidden text-center shadow-premium-2xl"
                >
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] mix-blend-overlay" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-6xl font-display font-black text-white mb-6 md:mb-8 tracking-tight leading-tight">Mulai Langkah Pertama <br /> Masa Depan Qur'ani</h3>
                        <p className="text-base md:text-xl text-brown-100 mb-8 md:mb-12 leading-relaxed font-medium text-center">
                            Telah dibuka Pendaftaran Santri Baru (PPDB) Tahun Ajaran 2026/2027. Kuota terbatas untuk kualitas pendidikan optimal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                            <Link href="/ppdb" className="w-full sm:w-auto px-8 py-4 rounded-pill bg-white text-brown-950 font-black hover:bg-brown-50 transition-all duration-300 shadow-premium-lg hover:-translate-y-1 text-base md:text-lg flex items-center justify-center gap-2">
                                Daftar Sekarang
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                            </Link>
                            <Link href="/kontak" className="w-full sm:w-auto px-8 py-4 rounded-pill text-white font-black border-2 border-white/20 hover:bg-white/10 transition-all duration-300 text-base md:text-lg flex items-center justify-center gap-2">
                                Konsultasi WhatsApp
                                <Send className="w-4 h-4 md:w-5 md:h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
