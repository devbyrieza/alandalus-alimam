"use client";

import { Rocket, Shield, Target, Compass, Monitor, Zap, TreePine, Waves, FileText, PenTool, Trophy, Dumbbell, Play, Palette, Sparkles, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const EXTRA_ACTIVITIES = [
    // Olahraga & Seni (Established)
    { name: "Karate", icon: Trophy, color: "red" },
    { name: "Pramuka", icon: Shield, color: "brown" },
    { name: "Panahan", icon: Target, color: "emerald" },
    { name: "Futsal", icon: Trophy, color: "indigo" },
    { name: "Volly", icon: Trophy, color: "gold" },

    // Kompetensi & IT
    { name: "Komputer", icon: Monitor, color: "blue" },
    { name: "Design Grafis", icon: Palette, color: "pink" },
    { name: "Kaligrafi", icon: PenTool, color: "amber" },
    { name: "Jurnalistik", icon: FileText, color: "ink" },
    { name: "Konten Kreator", icon: Play, color: "purple" },

    // Kemandirian & Pengembangan
    { name: "Basket", icon: Dumbbell, color: "orange" },
    { name: "Bulutangkis", icon: Zap, color: "orange" },
    { name: "Pertanian", icon: TreePine, color: "emerald" },
    { name: "Periklanan", icon: Waves, color: "cyan" },
    { name: "Web Programming", icon: Rocket, color: "indigo" },
] as const;

export default function ExtraSection() {
    return (
        <section id="ekstrakurikuler" className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50" />

            <Container className="relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Minat & Bakat</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight"
                    >
                        Ekstrakurikuler <span className="text-teal-600">Terpadu</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-ink-600 font-medium leading-relaxed"
                    >
                        Mengembangkan potensi santri secara holistik melalui berbagai pilihan kegiatan yang mendukung kemandirian, kreativitas, dan fisik yang kuat.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {EXTRA_ACTIVITIES.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.03 }}
                            className="bg-surface-50/50 p-6 rounded-3xl border border-surface-200/60 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-teal-100 hover:shadow-premium-lg transition-all duration-500 cursor-default"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-premium-sm group-hover:scale-110 transition-transform duration-500 ${item.color === 'red' ? 'bg-red-50 text-red-600' :
                                item.color === 'brown' ? 'bg-brown-50 text-brown-600' :
                                    item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        item.color === 'gold' ? 'bg-gold-50 text-gold-600' :
                                            item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                    item.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                                                        item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                                            item.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                                                item.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                                                    item.color === 'pink' ? 'bg-pink-50 text-pink-600' :
                                                                        'bg-white text-ink-600'
                                }`}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <p className="text-[10px] font-extrabold tracking-[0.1em] text-ink-950 uppercase group-hover:text-teal-700 transition-colors leading-tight">
                                {item.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
