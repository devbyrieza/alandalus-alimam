"use client";

import { GraduationCap, Award, Globe, BookOpen, Users, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";

const TEACHER_BACKGROUNDS = [
    {
        institution: "Muhammad Ibn Saud Islamic University",
        location: "Riyadh, KSA (Pascasarjana)",
    },
    {
        institution: "Univ Sidi Mohamed ben Abdellah",
        location: "Fes, Maroko (Pascasarjana)",
    },
    {
        institution: "Universitas Al-Azhar",
        location: "Kairo, Mesir",
    },
    {
        institution: "LIPIA Jakarta",
        location: "Cabang Univ. Islam Imam Muhammad bin Saud",
    },
    {
        institution: "Rabithoh 'Alam Islamy",
        location: "Makkah Al-Mukarromah",
    },
    {
        institution: "STIBA Ar-Rayah",
        location: "Sukabumi",
    },
    {
        institution: "Universitas Negeri Yogyakarta",
        location: "Pascasarjana (Dalam Negeri)",
    },
    {
        institution: "Native Speaker",
        location: "Timur Tengah",
    },
    {
        institution: "Dosen UMMI & Univ. Dalam Negeri",
        location: "Tenaga Ahli & Praktisi",
    },
    {
        institution: "Lulusan Pesantren Terkemuka",
        location: "Nasional & Internasional",
    },
] as const;

export default function TeachersSection() {
    return (
        <section id="pengajar" className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-[0.02] pointer-events-none" />

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-50 text-brown-700 text-xs font-bold uppercase tracking-widest mb-4">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Tenaga Pendidik</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight leading-tight">
                            Dibimbing Oleh <span className="text-gradient-brown">Asatidz Kompeten</span>
                        </h2>
                        <p className="text-lg text-ink-500 mb-8 leading-relaxed">
                            Pesantren Al-Imam didukung oleh tenaga pengajar profesional lulusan universitas terbaik di dunia Islam dan nasional.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-10 h-10 rounded-xl bg-brown-50 flex items-center justify-center text-brown-600">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-bold text-ink-700">Lulusan Timur Tengah & Maroko</p>
                            </div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center text-gold-600">
                                    <Award className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-bold text-ink-700">Dosen & Praktisi Ahli</p>
                            </div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-bold text-ink-700">Native Speaker Timur Tengah</p>
                            </div>
                        </div>
                    </div>

                    {/* Grid Content */}
                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {TEACHER_BACKGROUNDS.map((item, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-surface-50 border border-surface-100 flex items-start gap-4 group hover:bg-white hover:border-brown-100 hover:shadow-clay-sm transition-all duration-300">
                                <div className="mt-1">
                                    <CheckCircle2 className="w-5 h-5 text-brown-500" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-ink-900 text-sm leading-tight text-justify">{item.institution}</h4>
                                    <p className="text-[11px] font-medium text-ink-400 uppercase tracking-wider">{item.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </Container>
        </section>
    );
}
