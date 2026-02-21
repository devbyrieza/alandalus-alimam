"use client";

import { GraduationCap, Award, Globe, BookOpen, Users, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const TEACHER_BACKGROUNDS = [
    {
        institution: "Muhammad Ibn Saud Islamic University",
        location: "Pascasarjana, Riyadh, KSA",
    },
    {
        institution: "Univ. Sidi Mohamed ben Abdellah",
        location: "Pascasarjana, Fes, Maroko",
    },
    {
        institution: "Universitas Al-Azhar",
        location: "Kairo, Mesir",
    },
    {
        institution: "Rabithah Al-Alam Al-Islami",
        location: "Makkah Al-Mukarromah",
    },
    {
        institution: "Native Speaker",
        location: "Timur Tengah",
    },
    {
        institution: "LIPIA Jakarta",
        location: "Univ. Islam Imam Muhammad bin Saud",
    },
    {
        institution: "Universitas Negeri Yogyakarta",
        location: "Pascasarjana",
    },
    {
        institution: "STIBA Ar-Raayah",
        location: "Sukabumi",
    },
    {
        institution: "Lulusan Pondok Terkemuka",
        location: "Nasional",
    },
    {
        institution: "Dosen & Praktisi Ahli",
        location: "Tenaga Ahli",
    },
] as const;

export default function TeachersSection() {
    return (
        <section id="pengajar" className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-[40%] text-center lg:text-left lg:sticky lg:top-32"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Tenaga Pendidik</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight leading-[1.1]">
                            Dibimbing Oleh <span className="text-brown-600">Asatidz Kompeten</span>
                        </h2>

                        <p className="text-lg text-ink-600 mb-10 leading-relaxed font-medium text-justify lg:text-left">
                            Pesantren Al-Imam didukung oleh asatidzah profesional lulusan universitas terbaik dunia Islam serta pakar pendidikan nasional.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {[
                                { icon: Globe, label: "Lulusan Luar Negeri", sub: "Timur Tengah, Mesir & Maroko", color: "brown" },
                                { icon: Users, label: "Native Speakers", sub: "Timur Tengah", color: "teal" },
                                { icon: BookOpen, label: "Lulusan Terbaik", sub: "Dalam Negeri & Pondok Unggulan", color: "blue" },
                                { icon: Award, label: "Dosen & Pakar", sub: "Tenaga Pendidik Profesional", color: "gold" }
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-surface-50 border border-surface-100/50">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-premium-sm ${feature.color === 'brown' ? 'bg-brown-50 text-brown-600' :
                                        feature.color === 'gold' ? 'bg-gold-50 text-gold-600' :
                                            feature.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                'bg-teal-50 text-teal-600'
                                        }`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-ink-950 leading-none mb-1">{feature.label}</p>
                                        <p className="text-[11px] font-bold text-ink-400 uppercase tracking-wider">{feature.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Grid Content */}
                    <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                        {TEACHER_BACKGROUNDS.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-6 rounded-[2rem] bg-surface-50/50 border border-surface-200/60 flex items-start gap-5 group hover:bg-white hover:border-brown-100 hover:shadow-premium-xl transition-all duration-500"
                            >
                                <div className="mt-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-premium-sm border border-surface-100 group-hover:bg-brown-50 transition-colors">
                                    <CheckCircle2 className="w-4 h-4 text-brown-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-ink-950 text-base leading-tight group-hover:text-brown-700 transition-colors">{item.institution}</h4>
                                    <p className="text-[11px] font-extrabold text-ink-400 uppercase tracking-widest leading-none">{item.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </Container>
        </section>
    );
}