"use client";

import Link from "next/link";
import { ArrowRight, Send, ShieldCheck, Award, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

export default function CtaSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-surface-50 relative overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-brown-900 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-8 md:p-16 lg:p-24 relative overflow-hidden text-center shadow-premium-2xl"
                >
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] mix-blend-overlay" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-white/10 rounded-full blur-[80px] md:blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gold-500/10 rounded-full blur-[80px] md:blur-[100px]" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight">
                            Mulai Langkah Pertama <br /> Masa Depan Qur'ani
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brown-100 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed font-medium text-center px-2">
                            Telah dibuka Pendaftaran Santri Baru (PPDB) Tahun Ajaran 2026/2027. Kuota terbatas untuk kualitas pendidikan optimal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4">
                            <Link href="/ppdb" className="w-full sm:w-auto px-10 py-3.5 sm:py-4 rounded-pill bg-white text-brown-950 font-black hover:bg-brown-50 transition-all duration-300 shadow-premium-lg hover:-translate-y-1 text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[52px]">
                                Daftar Sekarang
                            </Link>
                            <Link href="/kontak" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-pill text-white font-black border-2 border-white/20 hover:bg-white/10 transition-all duration-300 text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[52px]">
                                Konsultasi WhatsApp
                                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </Link>
                        </div>

                        {/* Trust microcopy */}
                        <p className="mt-5 text-[11px] text-brown-400 font-bold uppercase tracking-widest">
                            ✦ Pendaftaran Gratis&nbsp;&nbsp;•&nbsp;&nbsp;Proses Mudah&nbsp;&nbsp;•&nbsp;&nbsp;Langsung Konfirmasi
                        </p>

                        {/* Legalitas badges */}
                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6">
                            <div className="flex items-center gap-2 text-brown-300">
                                <ShieldCheck className="w-4 h-4 text-green-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">Terakreditasi BAN-PDM</span>
                            </div>
                            <div className="flex items-center gap-2 text-brown-300">
                                <BookOpen className="w-4 h-4 text-gold-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">Sejak 1995 • 30 Tahun Melayani</span>
                            </div>
                            <div className="flex items-center gap-2 text-brown-300">
                                <Award className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">Resmi Kemendikdasmen</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}