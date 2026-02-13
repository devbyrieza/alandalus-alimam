"use client";

import { Users, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const BOARD_MEMBERS = [
    { name: "Ustadz Nurdin Apud Sabrini, Lc, M.A" },
    { name: "Ustadz Dr Muhammad Arifin Badri, Lc, M.A" },
    { name: "Ustadz Wahab Rajasam, M.Pd" },
    { name: "KH Dudun Abdul Gofar" },
    { name: "Bpk. Tasmen Tascha, SE" },
    { name: "Ustadz Dwi Wahyu Iskandar, M.Pd" },
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

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {BOARD_MEMBERS.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-surface-50 p-8 rounded-3xl border border-surface-200/60 flex items-center gap-6 group hover:bg-white hover:shadow-premium-lg hover:border-brown-100 transition-all duration-500"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white border border-surface-200 flex items-center justify-center shrink-0 group-hover:bg-brown-700 group-hover:border-brown-700 transition-all duration-500 shadow-premium-sm">
                                <User className="w-8 h-8 text-brown-600 group-hover:text-white transition-colors" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-ink-950 text-lg leading-tight group-hover:text-brown-700 transition-colors" title={member.name}>
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
