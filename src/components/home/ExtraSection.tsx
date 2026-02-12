"use client";

import { Rocket, Shield, Target, Compass, Monitor, Zap, TreePine, Waves, FileText, PenTool, Trophy, Dumbbell, Play, Palette } from "lucide-react";
import { Container } from "@/components/layout/Container";

const EXTRA_ACTIVITIES = [
    { name: "KARATE", icon: Trophy, color: "text-red-500", bg: "bg-red-50" },
    { name: "PRAMUKA", icon: Shield, color: "text-brown-600", bg: "bg-brown-50" },
    { name: "KOMPUTER", icon: Monitor, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "VOLLY", icon: Trophy, color: "text-gold-500", bg: "bg-gold-50" },
    { name: "PANAHAN", icon: Target, color: "text-green-600", bg: "bg-green-50" },
    { name: "KONTEN KREATOR", icon: Play, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "PERTANIAN", icon: TreePine, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "PERIKANAN", icon: Waves, color: "text-cyan-600", bg: "bg-cyan-50" },
    { name: "JURNALISTIK", icon: FileText, color: "text-ink-600", bg: "bg-surface-100" },
    { name: "KALIGRAPI", icon: PenTool, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "FUTSAL", icon: Trophy, color: "text-indigo-500", bg: "bg-indigo-50" },
    { name: "BULUTANGKIS", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "BASKET", icon: Dumbbell, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "DESIGN GRAFIS", icon: Palette, color: "text-pink-500", bg: "bg-pink-50" },
] as const;

export default function ExtraSection() {
    return (
        <section id="ekstrakurikuler" className="py-16 md:py-24 bg-surface-50 overflow-hidden">
            <Container>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest mb-4">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Minat & Bakat</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
                        Ekstrakurikuler <span className="text-teal-600">Terpadu</span>
                    </h2>
                    <p className="text-lg text-ink-500">
                        Mengembangkan potensi santri secara holistik melalui berbagai pilihan kegiatan yang mendukung kemandirian dan kreativitas.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {EXTRA_ACTIVITIES.map((item, idx) => (
                        <div key={idx} className="card-wablas bg-white p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <p className="text-[10px] font-black tracking-widest text-ink-900 group-hover:text-teal-600 transition-colors uppercase">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
