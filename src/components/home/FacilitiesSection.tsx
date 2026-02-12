"use client";

import { Home, School, Building2, Dumbbell, Beaker, HeartPulse, ShoppingCart, Monitor, UtensilsCrossed, Library, Waves, Coffee, Tent, Droplets, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";

const FACILITIES = [
    { name: "Masjid Kapasitas 800 Jamaah", icon: Home, color: "text-brown-600" },
    { name: "Gedung Sekolah Terpadu", icon: School, color: "text-blue-600" },
    { name: "Asrama Representatif", icon: Building2, color: "text-ink-700" },
    { name: "Fasilitas Olahraga", icon: Dumbbell, color: "text-gold-600" },
    { name: "Laboratorium IPA", icon: Beaker, color: "text-teal-600" },
    { name: "UKS (Unit Kesehatan Santri)", icon: HeartPulse, color: "text-red-500" },
    { name: "Mini Market", icon: ShoppingCart, color: "text-orange-500" },
    { name: "Lab. Komputer", icon: Monitor, color: "text-indigo-600" },
    { name: "Ruang Makan", icon: UtensilsCrossed, color: "text-amber-700" },
    { name: "Perpustakaan", icon: Library, color: "text-emerald-700" },
    { name: "Kolam Ikan", icon: Waves, color: "text-cyan-500" },
    { name: "Kantin", icon: Coffee, color: "text-brown-500" },
    { name: "Aula", icon: Tent, color: "text-purple-600" },
    { name: "Mesin Air Bio dan RO", icon: Droplets, color: "text-blue-400" },
] as const;

export default function FacilitiesSection() {
    return (
        <section id="fasilitas" className="py-16 md:py-24 bg-white">
            <Container>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-50 text-ink-500 text-xs font-bold uppercase tracking-widest mb-4 border border-surface-200">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Lingkungan Pesantren</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
                        Fasilitas <span className="text-gradient-brown">Lengkap</span>
                    </h2>
                    <p className="text-lg text-ink-500">
                        Sarana dan prasarana yang memadai untuk menunjang kenyamanan belajar, beribadah, dan aktivitas harian santri.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {FACILITIES.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-surface-50/50 border border-surface-100 group hover:bg-white hover:border-brown-100 hover:shadow-clay-sm transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 border border-surface-100 group-hover:scale-110 transition-transform">
                                <facility.icon className={`w-6 h-6 ${facility.color}`} />
                            </div>
                            <span className="font-bold text-ink-900 text-sm leading-tight">{facility.name}</span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
