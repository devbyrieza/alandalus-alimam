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
    Star
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

// Program Data with Updated Colors
const PROGRAMS = [
    {
        id: "mts",
        name: "Madrasah Tsanawiyah",
        buttonLabel: "Daftar MTs",
        fullName: "Program Madrasah Tsanawiyah (Setara SMP)",
        description: "Program pendidikan tingkat menengah pertama yang memadukan Kurikulum Nasional (Kemenag) dengan Kurikulum Pesantren (Diniyah) untuk membentuk santri yang berakhlak mulia, kokoh dalam aqidah, dan unggul dalam prestasi.",
        stats: [
            { label: "Masa Studi", value: "3 Tahun" },
            { label: "Target Hafalan", value: "Min. 3 Juz/Thn" },
            { label: "Bahasa", value: "Arab & Inggris" },
        ],
        curriculum: [
            "Tahfidz Al-Qur'an (Target Minimal 3 Juz/Tahun)",
            "Bahasa Arab Aktif (Muhadatsah & Yaumiyah)",
            "Kajian Kitab Kuning (Aqidah, Fiqih, Akhlaq)",
            "Kurikulum Nasional (Matematika, IPA, B.Inggris)",
            "Ekstrakurikuler (Bela Diri, Panahan, Futsal)",
        ],
        image: "/images/mts.png", // New MTs image
        theme: "brown",
        gradient: "from-brown-800 to-brown-600",
        accent: "text-brown-600",
        bg: "bg-brown-50"
    },
    {
        id: "il",
        name: "I'dad Lughowi",
        buttonLabel: "Daftar IL",
        fullName: "Program I'dad Lughowi (Setara SMA)",
        description: "Program pendidikan 4 tahun yang diawali dengan 1 tahun intensif Bahasa Arab & Syariah (I'dad), dilanjutkan dengan 3 tahun jenjang Madrasah Aliyah (MA). Lulusan mendapatkan ijazah negara (Setara SMA) dan ijazah pesantren.",
        stats: [
            { label: "Masa Studi", value: "4 Tahun (1+3)" },
            { label: "Jenjang", value: "Setara SMA/MA" },
            { label: "Target", value: "Lancar Bhs Arab" },
        ],
        curriculum: [
            "Tahun 1: Intensif Bahasa Arab (Nahwu, Shorof, Balaghah)",
            "Tahun 2-4: Kurikulum MA (Kepesantrenan & Umum)",
            "Tahfidz Al-Qur'an (Lanjutan & Muroja'ah)",
            "Kajian Kitab Turats & TICE (Adopsi Al-Andalus)",
            "Persiapan Kuliah Timur Tengah & PTN",
        ],
        image: "/images/il.png", // New IL image
        theme: "gold",
        gradient: "from-gold-600 to-gold-400",
        accent: "text-gold-600",
        bg: "bg-gold-50"
    },

];

export default function ProgramPage() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const viewportMiddle = window.scrollY + (window.innerHeight / 2);

            // Find which section is currently in the middle of the viewport
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
        <main className="bg-surface-50 min-h-screen">
            {/* 1. Hero Section - Brown Aesthetic */}
            <section className="relative py-12 md:py-16 overflow-hidden bg-brown-900">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 animate-in fade-in slide-in-from-bottom-4">
                        <GraduationCap className="w-4 h-4" />
                        <span>Jenjang Pendidikan</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-white tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                        Program Pendidikan <br />
                        <span className="text-white">Al-Imam Al-Islami</span>
                    </h1>

                    <p className="text-lg md:text-xl text-brown-100 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Membangun generasi unggul dengan kurikulum terpadu yang menyeimbangkan ilmu dunia dan akhirat untuk masa depan yang gemilang.
                    </p>
                </Container>
            </section>

            {/* 2. Navigation Tabs (Sticky) */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-brown-100 shadow-sm transition-all">
                <Container>
                    <div className="flex justify-center gap-2 md:gap-4 py-4 overflow-x-auto no-scrollbar">
                        {PROGRAMS.map((program) => (
                            <a
                                key={program.id}
                                href={`#${program.id}`}
                                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap border
                                ${activeSection === program.id
                                        ? program.theme === 'brown' ? 'bg-brown-600 text-white border-brown-600 shadow-lg shadow-brown-600/20' :
                                            program.theme === 'gold' ? 'bg-gold-500 text-white border-gold-500 shadow-lg shadow-gold-500/20' :
                                                'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/20'
                                        : 'bg-white text-ink-500 border-ink-100 hover:border-brown-300 hover:text-brown-700'
                                    }`}
                            >
                                {program.name}
                            </a>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 3. Program Sections */}
            <div className="space-y-10 py-10">
                {PROGRAMS.map((program, idx) => (
                    <section key={program.id} id={program.id} className="scroll-mt-36">
                        <Container>
                            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center group ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>

                                {/* Text Content */}
                                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-4 font-bold text-[10px] uppercase tracking-widest
                                        ${program.theme === 'brown' ? 'bg-brown-100 text-brown-700' :
                                            program.theme === 'gold' ? 'bg-gold-100 text-gold-700' :
                                                'bg-teal-100 text-teal-700'}
                                    `}>
                                        <Star className="w-3.5 h-3.5" />
                                        <span>Program Unggulan</span>
                                    </div>

                                    <h2 className="text-2xl md:text-4xl font-black text-brown-900 mb-4 font-display">
                                        {program.fullName}
                                    </h2>
                                    <p className="text-ink-600 text-base leading-relaxed mb-6 text-justify">
                                        {program.description}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {program.stats.map((stat, statIdx) => (
                                            <div key={statIdx} className="bg-white p-3 rounded-xl border border-surface-200 text-center shadow-clay-sm hover:shadow-clay-md transition-shadow">
                                                <p className="text-[9px] text-ink-400 uppercase font-extrabold tracking-widest mb-1">{stat.label}</p>
                                                <p className={`text-base font-bold
                                                    ${program.theme === 'brown' ? 'text-brown-700' :
                                                        program.theme === 'gold' ? 'text-gold-600' :
                                                            'text-teal-600'}
                                                `}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Curriculum */}
                                    <div className={`rounded-2xl p-5 mb-6 border ${program.bg} ${program.theme === 'brown' ? 'border-brown-200' : program.theme === 'gold' ? 'border-gold-200' : 'border-teal-200'}`}>
                                        <h3 className="text-base font-bold text-brown-900 mb-4 flex items-center gap-2">
                                            <BookOpen className={`w-5 h-5 ${program.accent}`} />
                                            Kurikulum & Materi
                                        </h3>
                                        <ul className="space-y-2.5">
                                            {program.curriculum.map((item, cIdx) => (
                                                <li key={cIdx} className="flex items-start gap-3">
                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                                        ${program.theme === 'brown' ? 'bg-brown-200 text-brown-700' :
                                                            program.theme === 'gold' ? 'bg-gold-200 text-gold-700' :
                                                                'bg-teal-200 text-teal-700'}
                                                    `}>
                                                        <CheckCircle className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-ink-700 text-sm font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button
                                        size="lg"
                                        className={`w-full sm:w-auto text-white rounded-xl h-11 px-6 text-sm shadow-lg transition-all hover:scale-105
                                            ${program.theme === 'brown' ? 'bg-brown-600 hover:bg-brown-700 shadow-brown-500/20' :
                                                program.theme === 'gold' ? 'bg-gold-500 hover:bg-gold-600 shadow-gold-500/20' :
                                                    'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'}
                                        `}
                                        asChild
                                    >
                                        <Link href={`/ppdb?jenjang=${program.id.toUpperCase()}`}>
                                            <span className="mr-2">{program.buttonLabel}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* Image Card - FIXED */}
                                <div className={`relative ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                                    <div className="relative aspect-[4/5] lg:aspect-square rounded-[2rem] overflow-hidden shadow-clay-lg group-hover:rotate-1 transition-transform duration-700">
                                        {/* Gambar program */}
                                        <Image
                                            src={program.image}
                                            alt={program.fullName}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority={idx === 0}
                                        />
                                        {/* Overlay: lebih terang agar gambar terlihat jelas */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10`} />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-20 z-10 mix-blend-multiply`} />
                                        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10 z-10 mix-blend-overlay" />

                                        <div className="absolute inset-0 z-20 p-6 lg:p-8 flex flex-col justify-end text-white">
                                            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-auto border border-white/30">
                                                <GraduationCap className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                                            </div>

                                            {/* FIXED: Tambah text shadow dan outline untuk visibility lebih baik */}
                                            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                                <h3 className="text-2xl lg:text-3xl font-display font-black mb-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                                                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)' }}>
                                                    {program.name}
                                                </h3>
                                                <p className="text-white/90 text-sm lg:text-base font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                                                    style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}>
                                                    Mencetak Generasi Rabbani
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Blob specific to section - FIXED: Added to parent with relative */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl -z-10 opacity-40
                                         ${program.theme === 'brown' ? 'bg-brown-300' :
                                            program.theme === 'gold' ? 'bg-gold-300' :
                                                'bg-teal-300'}
                                    `} />
                                </div>

                            </div>
                        </Container>
                    </section>
                ))}
            </div>
        </main>
    );
}