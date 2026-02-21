"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const ACTIVITIES = [
    { name: "Pembelajaran Aktif", color: "ink", description: "Metode interaktif yang memadukan teori dan praktik syar'i guna mengoptimalkan potensi akademik santri secara mendalam.", image: "/images/pembelajaran-kitab-turotz.png" },
    { name: "Kegiatan Rutin Harian", color: "brown", description: "Pembiasaan ibadah melalui sholat berjamaah tepat waktu dan halaqah tahfidz Al-Qur'an setiap hari secara konsisten.", image: "/images/tahfidz.JPG" },
    { name: "Ekstrakurikuler Unggulan", color: "blue", description: "Tersedia 10+ pilihan kegiatan mulai dari beladiri hingga Desain Grafis untuk mengasah minat dan bakat santri.", image: "/images/extra-karate.jpg" },
    { name: "Kemandirian & Skill", color: "teal", description: "Program pelatihan entrepreneurship dan keterampilan hidup mandiri guna mencetak santri yang siap berdikari di masa depan.", image: "/images/luar-kelas.png" },
] as const;

export default function ActivitiesSection() {
    return (
        <section id="kegiatan" className="py-24 md:py-32 bg-surface-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <Users className="w-3.5 h-3.5" />
                        <span>Kegiatan Santri</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight"
                    >
                        Kegiatan <span className="text-brown-600">Bervariasi & Edukatif</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-ink-600 font-medium leading-relaxed"
                    >
                        Berbagai kegiatan positif untuk mengembangkan potensi santri dalam bidang akademik, spiritual, dan kemandirian sosial.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {ACTIVITIES.map((activity, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] border border-surface-200/60 shadow-premium-lg hover:shadow-premium-xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={activity.image}
                                    alt={activity.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="p-8 pt-6">
                                <h3 className="text-xl font-bold text-ink-950 mb-4 tracking-tight group-hover:text-brown-700 transition-colors">{activity.name}</h3>
                                <p className="text-ink-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
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
                        <button className="px-14 py-5 rounded-pill bg-brown-700 text-white font-bold shadow-premium-lg hover:shadow-premium-xl hover:bg-brown-800 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto">
                            Lihat Semua Kegiatan
                        </button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}