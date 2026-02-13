"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    BookOpen,
    GraduationCap,
    CheckCircle,
    Users,
    Clock,
    Calendar,
    ArrowRight,
    Star,
    Sparkles,
    CheckCircle2,
    Trophy,
    Globe
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Program Data with Refined Info
const PROGRAMS = [
    {
        id: "mts",
        name: "Madrasah Tsanawiyah",
        buttonLabel: "Daftar MTs",
        fullName: "Program Madrasah Tsanawiyah (SMP)",
        description: "Pendidikan tingkat menengah dengan Sinergi Kurikulum Nasional & Pesantren yang terintegrasi secara komprehensif untuk mencetak santri yang berakhlak mulia dan unggul dalam prestasi.",
        stats: [
            { label: "Durasi", value: "3 Tahun", icon: Clock },
            { label: "Target", value: "3 Juz/Thn", icon: Trophy },
            { label: "Bahasa", value: "Dwi-Bahasa", icon: Globe },
        ],
        curriculum: [
            "Tahfidz Al-Qur'an Intensif",
            "Bahasa Arab (Muhadatsah & Yaumiyah)",
            "Kajian Kitab Turats (Aqidah, Fiqih, Akhlaq)",
            "Kurikulum Nasional Lengkap",
            "Life Skills & Ekstrakurikuler"
        ],
        image: "/images/mts.png",
        theme: "brown",
        accent: "text-brown-600",
        bg: "bg-brown-50"
    },
    {
        id: "il",
        name: "I'dad Lughowi",
        buttonLabel: "Daftar IL",
        fullName: "Program I'dad Lughowi (SMA)",
        description: "Program intensif 4 tahun dengan Kurikulum Terintegrasi Komprehensif; diawali 1 tahun penguatan Bahasa Arab & Syariah (I'dad), dilanjutkan 3 tahun jenjang Madrasah Aliyah (MA) yang resmi.",
        stats: [
            { label: "Durasi", value: "4 Tahun", icon: Clock },
            { label: "Jenjang", value: "Setara SMA", icon: GraduationCap },
            { label: "Fokus", value: "Kajian Syar'i", icon: BookOpen },
        ],
        curriculum: [
            "Tahun I'dad: Intensif Bahasa Arab & Syariah",
            "Tahfidz Lanjutan & Muroja'ah",
            "Kurikulum MA Terakreditasi",
            "Kajian Kitab Turats Mendalam",
            "Pembinaan Dakwah & Organisasi"
        ],
        image: "/images/il.png",
        theme: "teal",
        accent: "text-teal-600",
        bg: "bg-teal-50"
    },
];

export default function ProgramPage() {
    const [activeSection, setActiveSection] = useState<string>("mts");

    useEffect(() => {
        const handleScroll = () => {
            const viewportMiddle = window.scrollY + (window.innerHeight / 2);
            for (const program of PROGRAMS) {
                const element = document.getElementById(program.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (viewportMiddle >= offsetTop && viewportMiddle < offsetTop + offsetHeight) {
                        setActiveSection(program.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="bg-white min-h-screen">
            {/* 1. Hero Section - Airy & Clean */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-premium-sm"
                    >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Jenjang Pendidikan</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-10 tracking-tight leading-[0.9] text-ink-950"
                    >
                        Program <br />
                        <span className="text-brown-600">Terbaik Kita</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Kurikulum terintegrasi komprehensif yang menyelaraskan standar Nasional dengan kekhasan Pesantren.
                    </motion.p>
                </Container>
            </section>

            {/* 2. Navigation Tabs (Sticky) - Refined */}
            <div className="sticky top-[72px] z-40 bg-white/60 backdrop-blur-xl border-y border-surface-100 py-4">
                <Container>
                    <div className="flex justify-center gap-3">
                        {PROGRAMS.map((program) => (
                            <button
                                key={program.id}
                                onClick={() => {
                                    document.getElementById(program.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`px-8 py-3 rounded-full font-black text-sm transition-all border shadow-premium-sm
                                ${activeSection === program.id
                                        ? program.theme === 'brown'
                                            ? 'bg-brown-600 text-white border-brown-600'
                                            : 'bg-teal-600 text-white border-teal-600'
                                        : 'bg-white text-ink-500 border-surface-200 hover:border-brown-200 hover:text-brown-700'
                                    }`}
                            >
                                {program.name}
                            </button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 3. Program Content Sections */}
            <div className="py-12">
                {PROGRAMS.map((program, idx) => (
                    <section key={program.id} id={program.id} className="py-24 md:py-32 scroll-mt-32 overflow-hidden">
                        <Container>
                            <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>

                                {/* Image Side */}
                                <motion.div
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}
                                >
                                    <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-premium-xl relative z-10 p-3 bg-white border border-surface-200">
                                        <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden">
                                            <Image
                                                src={program.image}
                                                alt={program.fullName}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-3">
                                                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                                                    <span>Program Unggulan</span>
                                                </div>
                                                <h3 className="text-3 font-display font-black text-white text-4xl leading-none">
                                                    Best Experience
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Blob */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[120px] -z-10 opacity-30
                                        ${program.theme === 'brown' ? 'bg-brown-200' : 'bg-teal-200'}
                                    `} />
                                </motion.div>

                                {/* Content Side */}
                                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-ink-950 leading-[0.95] mb-8">
                                            {program.fullName}
                                        </h2>
                                        <p className="text-xl text-ink-600 font-medium leading-relaxed mb-10">
                                            {program.description}
                                        </p>
                                    </motion.div>

                                    {/* Stats Grid - Modern Design */}
                                    <div className="grid grid-cols-3 gap-4 mb-10">
                                        {program.stats.map((stat, sIdx) => (
                                            <motion.div
                                                key={sIdx}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: sIdx * 0.1 }}
                                                className="bg-white p-5 rounded-[2rem] border border-surface-100 shadow-premium-sm hover:shadow-premium-md transition-all text-center group"
                                            >
                                                <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110
                                                    ${program.theme === 'brown' ? 'bg-brown-50 text-brown-600' : 'bg-teal-50 text-teal-600'}
                                                `}>
                                                    <stat.icon className="w-5 h-5" />
                                                </div>
                                                <p className="text-[10px] text-ink-400 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                                                <p className="text-sm font-black text-ink-950">{stat.value}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Curriculum Card - Refined */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`rounded-[3rem] p-10 mb-10 border ${program.bg} ${program.theme === 'brown' ? 'border-brown-100' : 'border-teal-100'} shadow-premium-sm relative overflow-hidden`}
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <BookOpen className="w-32 h-32" />
                                        </div>

                                        <h3 className="text-2xl font-black text-ink-950 mb-8 flex items-center gap-3">
                                            <div className={`w-3 h-10 rounded-full ${program.theme === 'brown' ? 'bg-brown-600' : 'bg-teal-600'}`} />
                                            Kurikulum & Fokus
                                        </h3>

                                        <ul className="space-y-5 relative z-10">
                                            {program.curriculum.map((item, cIdx) => (
                                                <li key={cIdx} className="flex items-start gap-4 group/item">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-premium-sm
                                                        ${program.theme === 'brown' ? 'bg-brown-600 text-white' : 'bg-teal-600 text-white'}
                                                    `}>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-ink-800 font-bold text-lg leading-tight uppercase tracking-tight group-hover/item:text-ink-950 transition-colors">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={`/daftar?program=${program.id}`}>
                                            <button className={`w-full sm:w-auto px-12 py-5 rounded-pill font-black text-white text-lg shadow-premium-xl transition-all hover:-translate-y-1
                                                ${program.theme === 'brown' ? 'bg-brown-700 hover:bg-brown-800' : 'bg-teal-700 hover:bg-teal-800'}
                                            `}>
                                                Daftarkan Sekarang
                                                <ArrowRight className="inline-block ml-3 w-5 h-5" />
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>

                            </div>
                        </Container>
                    </section>
                ))}
            </div>

            {/* Bottom CTA - Impactful */}
            <section className="py-24 md:py-32 bg-surface-50">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-brown-800 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 text-white leading-tight">
                                Mulai Perjalanan <br /> <span className="text-gold-400">Terbaik</span> Mereka
                            </h2>
                            <p className="text-xl text-brown-100 max-w-2xl mx-auto mb-12 font-medium">
                                Konsultasikan rencana pendidikan putra-putri Anda dengan tim kami untuk mendapatkan pilihan program yang paling tepat.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href="/daftar">
                                    <button className="px-12 py-5 rounded-pill bg-white text-brown-900 font-black text-lg hover:bg-gold-400 hover:text-white shadow-premium-xl transition-all">
                                        Pendaftaran Online
                                    </button>
                                </Link>
                                <Link href="/kontak">
                                    <button className="px-12 py-5 rounded-pill bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
                                        Hubungi Admissions
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
