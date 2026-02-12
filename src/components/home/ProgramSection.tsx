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

const PROGRAMS = [
    {
        title: "MTs",
        subtitle: "Madrasah Tsanawiyah (Setara SMP)",
        desc: "Program pendidikan 3 tahun dengan kurikulum terpadu Kemendikdasmen dan khas Al-Andalus. Fokus pada pondasi adab, tahfidz, dan dasar ilmu syar'i.",
        features: [
            "Target Hafalan 12 Juz",
            "Kurikulum Kemendikdasmen & Al-Andalus",
            "Bahasa Arab Harian & Kitab Turats",
            "Sanad Al-Qur'an Bersambung",
            "TICE & Wawasan Global",
            "Ekstrakurikuler Pilihan",
            "Orientasi: PT Luar Negeri (Timur Tengah) & PTN Favorit (Nasional)"
        ],
        quota: "25 Kursi",
        color: "brown",
        icon: School
    },
    {
        title: "IL",
        subtitle: "I'dad Lughowi (Setara SMA)",
        desc: "Program 4 tahun (intensif bahasa + MA) untuk mencetak kader ulama dan intelektual muslim. Fokus pada penguasaan kitab kuning, bahasa Arab mendalam, dan persiapan studi lanjut.",
        features: [
            "Target Hafalan 16 Juz",
            "Kurikulum Kemendikdasmen & Al-Andalus",
            "Bahasa Arab Harian & Kitab Turats",
            "Sanad Al-Qur'an Bersambung",
            "TICE & Wawasan Global",
            "Ekstrakurikuler Pilihan",
            "Orientasi: PT Luar Negeri (Timur Tengah) & PTN Favorit (Nasional)"
        ],
        quota: "25 Kursi",
        color: "gold",
        icon: BookOpen
    },
] as const;

export default function ProgramSection() {
    return (
        <section id="program" className="py-12 md:py-16 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-surface-50 to-transparent opacity-50 pointer-events-none" />

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-50 text-brown-700 text-xs font-bold uppercase tracking-widest mb-4">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Jenjang Pendidikan</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
                        Program Pendidikan <span className="text-gradient-brown">Unggulan</span>
                    </h2>
                    <p className="section-subtitle">
                        Kami menyediakan jenjang pendidikan berkesinambungan untuk membentuk kepribadian santri yang utuh (kaffah).
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {PROGRAMS.map((program, idx) => (
                        <div key={idx} className="card-wablas bg-white p-8 md:p-10 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-t-brown-600 flex flex-col h-full relative group overflow-hidden">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-brown-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${program.color === 'brown' ? 'bg-brown-100 text-brown-700' : 'bg-gold-100 text-gold-700'}`}>
                                        <program.icon className="w-8 h-8" />
                                    </div>
                                    <div className="bg-surface-50 border border-surface-200 px-3 py-1 rounded-lg">
                                        <span className="text-xs font-bold text-ink-500">Kuota: {program.quota}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-ink-900 mb-1">{program.title}</h3>
                                <p className="text-sm font-bold text-brown-600 mb-4">{program.subtitle}</p>
                                <p className="text-ink-500 text-sm leading-relaxed mb-8 flex-grow text-justify">
                                    {program.desc}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3 mb-8 bg-surface-50/50 p-5 rounded-xl border border-surface-100">
                                    {program.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${program.color === 'brown' ? 'text-brown-500' : 'text-gold-500'}`} />
                                            <span className="text-sm font-medium text-ink-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action */}
                                <Link
                                    href="/program"
                                    className="btn-primary w-full text-center justify-center"
                                >
                                    Detail Program
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
