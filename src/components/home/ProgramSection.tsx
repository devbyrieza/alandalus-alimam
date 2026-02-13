"use client";

import Link from "next/link";
import {
    GraduationCap,
    BookOpen,
    CheckCircle,
    ArrowRight,
    School
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const PROGRAMS = [
    {
        title: "Madrasah Tsanawiyah",
        subtitle: "Tingkat Menengah (Setara SMP)",
        desc: "Pendidikan 3 tahun dengan kurikulum terpadu Tahfidz dan Akademik Nasional. Fokus pada pembentukan adab dan dasar ilmu syar'i.",
        features: [
            "Tahfidz Mutqin 12 Juz",
            "Sinergi Kurikulum Nasional & Al-Andalus",
            "Bahasa Arab & Kitab Turats",
            "Sanad Al-Qur'an & Hadith",
            "Program TICE & Global"
        ],
        quota: "25 Kursi",
        icon: School,
        color: "brown"
    },
    {
        title: "I'dad Lughowi",
        subtitle: "Persiapan & Menengah Atas (Setara SMA)",
        desc: "Program intensif bahasa dan Syari'at untuk mencetak kader ulama masa depan. Persiapan matang studi ke Univ. Islam Timur Tengah.",
        features: [
            "Tahfidz Lanjutan 16 Juz",
            "Penguasaan Kitab Turats",
            "Bahasa Arab Aktif & Formal",
            "Persiapan LIPIA & Univ. Madinah",
            "Ziarah Ilmiah & Pengabdian"
        ],
        quota: "25 Kursi",
        icon: BookOpen,
        color: "teal"
    },
] as const;

export default function ProgramSection() {
    return (
        <section id="program" className="py-24 md:py-32 bg-surface-50 relative overflow-hidden">
            {/* Subtle Patterns */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

            <Container className="relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Jenjang Pendidikan</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-extrabold text-ink-950 mb-6 tracking-tight"
                    >
                        Program Studi <span className="text-brown-600">Unggulan</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-ink-600 font-medium leading-relaxed"
                    >
                        Kami berkomitmen memberikan pendidikan berkualitas tinggi yang menggabungkan keunggulan spiritual, intelektual, dan karakter.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {PROGRAMS.map((program, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group h-full"
                        >
                            <div className="h-full bg-white rounded-[2rem] p-8 md:p-10 shadow-premium-lg border border-surface-100 transition-all duration-500 hover:shadow-premium-xl group-hover:-translate-y-2 flex flex-col">
                                {/* Top Accents */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-premium-md ${program.color === 'brown' ? 'bg-brown-50 text-brown-600' : 'bg-teal-50 text-teal-600'
                                        }`}>
                                        <program.icon className="w-7 h-7" />
                                    </div>
                                    <div className="px-3 py-1 rounded-lg bg-surface-50 border border-surface-200 text-[11px] font-extrabold text-ink-500 uppercase tracking-widest">
                                        Quota: {program.quota}
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-ink-950 mb-2">{program.title}</h3>
                                    <p className="text-sm font-bold text-brown-600/80 mb-6 tracking-wide">{program.subtitle}</p>
                                    <p className="text-ink-600 leading-relaxed mb-8 font-medium text-justify">
                                        {program.desc}
                                    </p>

                                    {/* Feature List */}
                                    <ul className="space-y-4 mb-10">
                                        {program.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-brown-50 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-brown-600" />
                                                </div>
                                                <span className="text-sm font-bold text-ink-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="/program">
                                    <button className="w-full py-4 px-6 rounded-2xl bg-surface-50 border-2 border-surface-100 text-ink-950 font-bold transition-all duration-300 hover:bg-brown-700 hover:border-brown-700 hover:text-white flex items-center justify-center gap-2 group/btn">
                                        Detail Kurikulum
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

