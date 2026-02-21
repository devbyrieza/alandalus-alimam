"use client";

import { UserPlus, FileText, CreditCard, ClipboardCheck, GraduationCap, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const STEPS = [
    {
        icon: UserPlus,
        title: "Buat Akun",
        description: "Daftarkan data diri awal dan buat akun pendaftaran santri baru.",
        color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
        icon: CreditCard,
        title: "Pembayaran",
        description: "Bayar biaya pendaftaran dan unggah bukti transfer ke dashboard.",
        color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
        icon: FileText,
        title: "Lengkapi Berkas",
        description: "Isi data lengkap santri & orang tua, serta unggah dokumen wajib.",
        color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
        icon: ClipboardCheck,
        title: "Tes Seleksi",
        description: "Pilih jadwal dan ikuti ujian seleksi tertulis maupun lisan.",
        color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
        icon: GraduationCap,
        title: "Daftar Ulang",
        description: "Setelah dinyatakan lulus, lengkapi proses administrasi akhir.",
        color: "bg-brown-50 text-brown-600 border-brown-100",
    },
] as const;

export default function ProcessSection() {
    return (
        <section id="alur" className="py-24 md:py-32 bg-surface-50 relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-60" />

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Prosedur PPDB</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-ink-950 mb-8 tracking-tight"
                    >
                        Alur <span className="text-brown-600">Pendaftaran</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-ink-600 font-medium max-w-2xl mx-auto"
                    >
                        Ikuti langkah-langkah mudah berikut untuk menjadi bagian dari keluarga besar Pesantren Al-Imam Al-Islami.
                    </motion.p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-surface-200 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                        {STEPS.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                {/* Step Number Badge */}
                                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white shadow-premium-md border border-surface-100 flex items-center justify-center z-20 font-display font-black text-brown-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {idx + 1}
                                </div>

                                <div className={`w-24 h-24 rounded-[2.5rem] ${step.color} border flex items-center justify-center mb-8 shadow-premium-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-premium-lg group-hover:-translate-y-2`}>
                                    <step.icon className="w-10 h-10" />
                                </div>

                                <h4 className="font-black text-xl text-ink-950 mb-3 tracking-tight group-hover:text-brown-700 transition-colors">
                                    {step.title}
                                </h4>

                                <p className="text-sm text-ink-500 font-medium leading-relaxed px-4 lg:px-2">
                                    {step.description}
                                </p>

                                {/* Arrow for Mobile/Tablet */}
                                {idx < STEPS.length - 1 && (
                                    <div className="lg:hidden mt-8 text-surface-200">
                                        <div className="w-px h-12 bg-surface-200 mx-auto" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <button onClick={() => window.location.href = '/login'} className="px-12 py-5 rounded-pill bg-brown-700 text-white font-black text-lg shadow-premium-xl hover:bg-brown-800 hover:-translate-y-1 transition-all duration-300">
                        Daftar Sekarang
                    </button>
                </motion.div>
            </Container>
        </section>
    );
}