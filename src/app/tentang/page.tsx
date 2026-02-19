"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
    Users,
    Target,
    History,
    MapPin,
    Award,
    BookOpen,
    Compass,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Calendar,
    ChevronRight,
    Send
} from "lucide-react";
import { motion } from "framer-motion";

export default function TentangPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* 1. Hero Section - Professional Airy Design */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-white">
                {/* Sophisticated Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-premium-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mengenal Al-Imam</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-7xl lg:text-8xl font-display font-black mb-10 tracking-tight leading-[0.9] text-ink-950"
                    >
                        Bimbingan & <br />
                        <span className="text-brown-600">Pengawasan Melekat</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
                    >
                        Membangkitkan kesadaran santri melalui keteladanan pendidik, agar tumbuh menjadi muslim yang dewasa dalam berpikir dan bertindak tanpa kekerasan dan luka pengasuhan.
                    </motion.p>
                </Container>
            </section>

            {/* 2. Welcome Banner - Refined Section */}
            <section className="py-16 md:py-24 bg-white overflow-hidden border-t border-surface-50">
                <Container>
                    <div className="mb-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 text-brown-600 mb-4"
                        >
                            <div className="w-8 h-0.5 bg-brown-600/30 rounded-full" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Ahlan Wa Sahlan</span>
                            <div className="w-8 h-0.5 bg-brown-600/30 rounded-full" />
                        </motion.div>
                        <h2 className="text-3xl md:text-6xl font-display font-black text-ink-950 tracking-tight leading-tight">
                            Masa Depan Qur'ani <br className="hidden md:block" />
                            Dimulai dari <span className="text-brown-600 underline decoration-brown-600/20 underline-offset-8">Sini</span>
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-[21/9] md:aspect-[25/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-premium-2xl border border-surface-200 group"
                    >
                        <Image
                            src="/images/welcome-selamat-datang.png"
                            alt="Selamat Datang di Al-Imam Al-Islami"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </motion.div>
                </Container>
            </section>

            {/* 3. History & Profile - Enhanced Layout */}
            <section className="py-24 md:py-32 relative bg-surface-50 border-y border-surface-100">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium-xl relative z-10 bg-white p-3 border border-surface-200">
                                <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
                                    <Image
                                        src="/images/tentang.png"
                                        alt="Pesantren Al-Imam Al-Islami"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 via-transparent to-transparent" />
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute -bottom-12 right-0 md:-bottom-10 md:-right-10 z-20 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-premium-xl border border-surface-200 max-w-[90vw] md:max-w-none"
                            >
                                <div className="flex items-center gap-4 md:gap-5">
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-brown-700 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-premium-md shrink-0">
                                        <Award className="w-7 h-7 md:w-8 md:h-8" />
                                    </div>
                                    <div>
                                        <p className="text-3xl md:text-4xl font-black text-ink-950 tracking-tight leading-none mb-1">1995</p>
                                        <p className="text-ink-500 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2">Tahun Berdiri</p>
                                        <div className="text-[10px] font-bold text-brown-700 bg-brown-50 px-2.5 py-1.5 rounded-lg border border-brown-100/50 leading-tight">
                                            Mulai Januari 2026 dikelola <br className="block sm:hidden" /> sepenuhnya oleh Al-Andalus
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Grid */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none -z-10" />
                        </motion.div>

                        {/* Content Column */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-display font-black text-ink-950 leading-tight mb-6">
                                    Sejarah & <br />
                                    <span className="text-brown-600">Profil Pesantren</span>
                                </h2>
                                <div className="w-20 h-1.5 bg-brown-600 rounded-full mb-10" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6 text-lg text-ink-700 font-medium leading-[1.8] text-justify"
                            >
                                <p>
                                    <span className="text-ink-950 font-black">Pesantren Al-Imam Al-Islami</span> berlokasi di Cikembar, Sukabumi. Didirikan pada tahun 1995 oleh <span className="text-brown-700 italic font-bold">Al-Ustadz KH. Bukhori Muslim Rahimahullah</span> dengan visi mencetak kader ulama.
                                </p>
                                <p>
                                    Kami berkomitmen penuh untuk berkhidmah kepada umat melalui jalur pendidikan dan dakwah, dengan menjaga biaya pendidikan tetap terjangkau tanpa mengurangi kualitas layanan dan fasilitas.
                                </p>
                                <p>
                                    Sejak Januari 2026, Al Imam dikelola sepenuhnya oleh Al Andalus International Boarding School, mencakup seluruh aspek kelembagaan secara terintegrasi. Pengelolaan ini meliputi hirarki kepengurusan di tingkat yayasan, pengelolaan sumber daya manusia, sistem pendidikan dan kurikulum, sistem pelayanan beserta sarana dan prasarana, sistem manajemen lembaga berbasis ISO 9001:2015, serta sistem keuangan yang terstandar akuntansi publik dengan pelaksanaan audit eksternal.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-2 gap-6 pt-6"
                            >
                                <div className="bg-white p-6 rounded-[2rem] border border-surface-200 shadow-premium-sm hover:shadow-premium-md transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-brown-50 flex items-center justify-center mb-4 text-brown-600 group-hover:scale-110 transition-transform">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-ink-950 text-2xl">70+</h4>
                                    <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">Santri Aktif</p>
                                </div>
                                <div className="bg-white p-6 rounded-[2rem] border border-surface-200 shadow-premium-sm hover:shadow-premium-md transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 text-teal-600 group-hover:scale-110 transition-transform">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-ink-950 text-xl tracking-tighter">RESMI</h4>
                                    <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">Akreditasi BAN-PDM</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. Vision Mission - Modern Cards */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                <Container className="relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-brown-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
                        >
                            Landasan Dasar
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-6xl font-display font-black text-ink-950 mb-8"
                        >
                            Visi & Misi
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-ink-600 font-medium leading-relaxed"
                        >
                            Komitmen berkelanjutan kami dalam menjalankan misi pendidikan Islam yang unggul dan integratif.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Visi */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[3rem] shadow-premium-lg border border-surface-100 hover:shadow-premium-xl transition-all duration-500 group h-full flex flex-col"
                        >
                            <div className="w-16 h-16 bg-brown-50 rounded-3xl flex items-center justify-center mb-8 text-brown-700 group-hover:scale-110 transition-transform duration-500 shadow-premium-sm">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-ink-950 mb-6">Visi</h3>
                            <p className="text-xl font-display font-black text-ink-900 italic leading-[1.4] flex-1">
                                "Kaderisasi Muslim Bertakwa, Berdikari, dan Berkontribusi."
                            </p>
                        </motion.div>

                        {/* Tujuan - Moved to occupy 2nd slot */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-10 rounded-[3rem] shadow-premium-lg border border-surface-100 hover:shadow-premium-xl transition-all duration-500 group h-full flex flex-col"
                        >
                            <div className="w-16 h-16 bg-gold-50 rounded-3xl flex items-center justify-center mb-8 text-gold-600 group-hover:scale-110 transition-transform duration-500 shadow-premium-sm">
                                <Compass className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-ink-950 mb-8">Tujuan</h3>
                            <ul className="space-y-6 flex-1">
                                {[
                                    "Mewujudkan Lingkungan Rabbani.",
                                    "Mencapai Keunggulan Akademik.",
                                    "Membentuk Karakter Mandiri."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start group/item">
                                        <div className="w-6 h-6 rounded-full bg-gold-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1 shadow-premium-sm">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-ink-700 font-bold text-sm tracking-tight group-hover/item:text-gold-700 transition-colors uppercase">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Misi - Moved to Bottom, Full Width */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:col-span-2 bg-surface-50 p-10 rounded-[3rem] shadow-premium-md border border-surface-200 hover:shadow-premium-lg transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform duration-500 shadow-premium-sm shrink-0">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-ink-950">Misi Utama</h3>
                            </div>

                            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                {[
                                    "Menguatkan akidah shahihah dan membiasakan beribadah sesuai sunnah dalam kehidupan sehari-hari melalui pembelajaran bahasa arab, ulumu syar'i, halaqoh tahfizh, dan adab islami.",
                                    "Membimbing Soft Skill Santri melalui sistem pengasuhan berbasis fitrah dengan pendekatan kesadaran.",
                                    "Membekali Hard Skill melalui pembelajaran kewirausahaan dan ekstrakurikuler sebagai bekal hidup mandiri.",
                                    "Menanamkan jiwa dakwah santri melalui metode hikmah dan mauidzoh hasanah."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start group/item">
                                        <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1.5 shadow-premium-sm">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-ink-700 font-bold text-sm tracking-tight group-hover/item:text-teal-700 transition-colors leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* 4. CTA Section - Direct and impactful */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-white">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brown-800 rounded-[2rem] md:rounded-[4rem] p-6 md:p-24 relative overflow-hidden text-center"
                    >
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-6xl font-display font-black mb-6 md:mb-8 text-white tracking-tight leading-tight">
                                Mari Menjadi Bagian <br />
                                Keluarga <span className="text-gold-400">Al-Imam</span>
                            </h2>
                            <p className="text-base md:text-xl text-brown-100 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                Daftarkan putra Anda sekarang dan persiapkan masa depan gemilang bersama kami.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                                <Link href="/daftar" className="w-full sm:w-auto">
                                    <button className="w-full px-8 py-4 rounded-pill bg-white text-brown-900 font-black text-base md:text-lg shadow-premium-xl hover:bg-gold-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                                        Daftar Sekarang
                                    </button>
                                </Link>
                                <Link href="/kontak" className="w-full sm:w-auto">
                                    <button className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-pill bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all duration-300">
                                        Hubungi Kami
                                        <Send className="w-5 h-5 text-gold-400" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </main>
    );
}
