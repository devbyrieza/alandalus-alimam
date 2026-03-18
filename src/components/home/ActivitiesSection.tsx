"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const ACTIVITIES = [
    { name: "Pembelajaran Aktif", color: "maroon", description: "Metode interaktif yang memadukan teori dan praktik syar'i guna mengoptimalkan potensi akademik santri secara mendalam.", image: "/images/pembelajaran-kitab-turotz.webp" },
    { name: "Kegiatan Rutin Harian", color: "cream", description: "Pembiasaan ibadah melalui sholat berjamaah tepat waktu dan halaqah tahfidz Al-Qur'an setiap hari secara konsisten.", image: "/images/tahfidz.webp" },
    { name: "Ekstrakurikuler Unggulan", color: "maroon-alt", description: "Tersedia 10+ pilihan kegiatan mulai dari beladiri hingga Desain Grafis untuk mengasah minat dan bakat santri.", image: "/images/extra-karate.webp" },
    { name: "Kemandirian & Skill", color: "maroon-light", description: "Program pelatihan entrepreneurship dan keterampilan hidup mandiri guna mencetak santri yang siap berdikari di masa depan.", image: "/images/luar-kelas.webp" },
] as const;

export default function ActivitiesSection() {
    return (
        <section id="kegiatan" className="section-alt border-y border-cream-200/50">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white border border-cream-200 text-maroon-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
                    >
                        <Users className="w-3.5 h-3.5" />
                        <span>Kegiatan Santri</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title mb-6"
                    >
                        Kegiatan <span className="text-gradient-maroon">Bervariasi & Edukatif</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="section-subtitle"
                    >
                        Berbagai kegiatan positif untuk mengembangkan potensi santri dalam bidang akademik, spiritual, dan kemandirian sosial.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {ACTIVITIES.map((activity, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2rem] border-2 border-transparent hover:border-maroon-200 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden shrink-0">
                                <Image
                                    src={activity.image}
                                    alt={activity.name}
                                    fill
                                    priority={idx < 2}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 bg-cream-100 animate-pulse"
                                    onLoadingComplete={(img) => img.classList.remove('animate-pulse')}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent opacity-80" />
                            </div>
                            <div className="p-6 md:p-8 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-ink-950 mb-3 tracking-tight group-hover:text-maroon-700 transition-colors">{activity.name}</h3>
                                <p className="text-ink-500 font-medium text-[15px] leading-relaxed mb-6 flex-grow">
                                    {activity.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link href="/kegiatan">
                        <button className="btn-secondary w-full sm:w-auto px-12">
                            Lihat Semua Kegiatan
                        </button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}