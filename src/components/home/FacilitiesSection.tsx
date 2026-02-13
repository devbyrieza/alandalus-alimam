"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, School, Building2, Dumbbell, Beaker, HeartPulse, ShoppingCart, Monitor, UtensilsCrossed, Library, Waves, Coffee, Tent, Droplets, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FACILITIES = [
    { name: "Masjid Kapasitas 1000 Jamaah", icon: Home, color: "brown" },
    { name: "Gedung Sekolah Terpadu", icon: School, color: "blue" },
    { name: "Asrama Representatif", icon: Building2, color: "ink" },
    { name: "Fasilitas Olahraga", icon: Dumbbell, color: "gold" },
    { name: "Laboratorium IPA", icon: Beaker, color: "teal" },
    { name: "UKS (Unit Kesehatan Santri)", icon: HeartPulse, color: "red" },
    { name: "Mini Market", icon: ShoppingCart, color: "orange" },
    { name: "Lab. Komputer", icon: Monitor, color: "indigo" },
    { name: "Ruang Makan Bersama", icon: UtensilsCrossed, color: "amber" },
    { name: "Perpustakaan Digital", icon: Library, color: "emerald" },
    { name: "Area Kemandirian", icon: Waves, color: "cyan" },
    { name: "Kantin Sehat", icon: Coffee, color: "brown" },
] as const;

const FACILITY_IMAGES = [
    { src: "/images/masjid.png", label: "Masjid Jami'", span: "col-span-2 row-span-2" },
    { src: "/images/gedung-utama-dan-lapangan-basket.jpeg", label: "Gedung Utama & Lapangan", span: "col-span-1" },
    { src: "/images/gedung-kelas.jpeg", label: "Gedung Kelas", span: "col-span-1" },
    { src: "/images/asrama.png", label: "Asrama Santri", span: "col-span-1" },
    { src: "/images/kelas-dari-dalam.png", label: "Ruang Kelas", span: "col-span-1" },
] as const;

export default function FacilitiesSection() {
    return (
        <section id="fasilitas" className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-surface-50 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 opacity-50" />

            <Container className="relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Lingkungan Pesantren</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight"
                    >
                        Fasilitas <span className="text-brown-600">Terpadu & Lengkap</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-ink-600 font-medium leading-relaxed"
                    >
                        Sarana dan prasarana yang memadai untuk menunjang kenyamanan belajar, beribadah, dan aktivitas harian seluruh santri.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {FACILITIES.map((facility, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-5 p-6 rounded-2xl bg-surface-50/50 border border-surface-200/60 group hover:bg-white hover:border-brown-100 hover:shadow-premium-lg transition-all duration-500"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-premium-sm group-hover:scale-110 transition-transform duration-500 ${facility.color === 'brown' ? 'bg-brown-50 text-brown-600' :
                                facility.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    facility.color === 'gold' ? 'bg-gold-50 text-gold-600' :
                                        facility.color === 'teal' ? 'bg-teal-50 text-teal-600' :
                                            facility.color === 'red' ? 'bg-red-50 text-red-600' :
                                                facility.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                                    facility.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                                        facility.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                                            facility.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                                facility.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                                                                    'bg-white text-ink-600'
                                }`}>
                                <facility.icon className="w-7 h-7" />
                            </div>
                            <span className="font-bold text-ink-950 text-sm leading-tight leading-snug group-hover:text-brown-700 transition-colors">{facility.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Photo Gallery Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {FACILITY_IMAGES.map((img, idx) => (
                        <div key={idx} className={`${img.span} relative rounded-3xl overflow-hidden group aspect-[4/3] shadow-premium-md`}>
                            <Image
                                src={img.src}
                                alt={img.label}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4">
                                <span className="text-white font-bold text-sm drop-shadow-lg">{img.label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link href="/fasilitas">
                        <button className="px-10 py-5 rounded-pill bg-white border-2 border-surface-200 text-ink-950 font-bold shadow-premium-sm hover:border-brown-700 hover:text-brown-700 hover:shadow-premium-md transition-all duration-300 flex items-center gap-2 mx-auto">
                            Lihat Semua Fasilitas
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
