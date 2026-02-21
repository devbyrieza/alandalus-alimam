"use client";

import { Users, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import Image from "next/image";

const BOARD_MEMBERS = [
    {
        name: "Ustadz Dr. Muhammad Arifin Badri, Lc, M.A",
        image: "/images/muhammad-arifin-badri.webp"
    },
    {
        name: "Ustadz Nurdin Apud Sarbini, Lc, M.Pd",
        image: "/images/nurdin-apud-sabrini.webp"
    },
    {
        name: "H. Tarmen Tascha, SE",
        image: "/images/tarmen-tascha.webp"
    },
    {
        name: "Ustadz Aminullah Yasin, Lc, M.Pd",
        image: "/images/aminullah-yasin.webp"
    },
    {
        name: "Ustadz Wahab Rajasam, M.Pd",
        image: "/images/wahab-rajasam.webp"
    },
    {
        name: "Ustadz Thoriq Ziyad, Lc",
        image: "/images/thoriq-ziyad.webp"
    },
] as const;

export default function BoardSection() {
    return (
        <section id="pembina" className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-50/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <Container className="relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <Users className="w-3.5 h-3.5" />
                        <span>Struktur Organisasi</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight"
                    >
                        Dewan <span className="text-brown-600">Pembina</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-ink-600 font-medium leading-relaxed"
                    >
                        Dibimbing oleh para asatidz dan tokoh yang berpengalaman dalam membangun peradaban Islam melalui jalur pendidikan dan dakwah.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {BOARD_MEMBERS.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-surface-50 p-5 rounded-[2rem] border border-surface-200/60 flex items-center gap-6 group hover:bg-white hover:shadow-premium-xl hover:border-brown-100 transition-all duration-500"
                        >
                            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-white border border-surface-200 overflow-hidden shrink-0 group-hover:border-brown-200 transition-all duration-500 shadow-premium-sm">
                                {member.image ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            sizes="(max-width: 768px) 112px, 128px"
                                            priority={idx < 4}
                                        />
                                        <div className="absolute inset-0 bg-brown-900/0 group-hover:bg-brown-900/5 transition-colors duration-500" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-surface-100 group-hover:bg-brown-700 transition-all duration-500">
                                        <User className="w-10 h-10 text-brown-600 group-hover:text-white transition-colors" />
                                    </div>
                                )}

                            </div>

                            <div className="min-w-0 pr-4 py-2">
                                <h4 className="font-display font-bold text-ink-950 text-lg md:text-xl leading-snug group-hover:text-brown-700 transition-colors">
                                    {member.name}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}