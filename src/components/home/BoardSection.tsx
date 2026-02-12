"use client";

import { Users, User } from "lucide-react";
import { Container } from "@/components/layout/Container";

const BOARD_MEMBERS = [
    {
        name: "Ustadz Nurdin Apud Sabrini, Lc, M.A",
        role: "Dewan Pembina",
    },
    {
        name: "Ustadz Dr Muhammad Arifin Badri, Lc, M.A",
        role: "Dewan Pembina",
    },
    {
        name: "Ustadz Wahab Rajasam, M.Pd",
        role: "Dewan Pembina",
    },
    {
        name: "KH Dudun Abdul Gofar",
        role: "Dewan Pembina",
    },
    {
        name: "Bpk. Tasmen Tascha, SE",
        role: "Dewan Pembina",
    },
    {
        name: "Ustadz Dwi Wahyu Iskandar, M.Pd",
        role: "Dewan Pembina",
    },
] as const;

export default function BoardSection() {
    return (
        <section id="pembina" className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brown-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <Container className="relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-50 text-brown-700 text-xs font-bold uppercase tracking-widest mb-4">
                        <Users className="w-3.5 h-3.5" />
                        <span>Struktur Organisasi</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
                        Dewan <span className="text-gradient-brown">Pembina</span>
                    </h2>
                    <p className="text-lg text-ink-500">
                        Dibimbing oleh para asatidz dan tokoh yang berpengalaman dalam dunia pendidikan dan dakwah Islam.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {BOARD_MEMBERS.map((member, idx) => (
                        <div key={idx} className="card-wablas bg-surface-50 p-6 flex items-center gap-4 group hover:bg-white transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-brown-100 flex items-center justify-center shrink-0 group-hover:bg-brown-600 transition-colors">
                                <User className="w-7 h-7 text-brown-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-bold text-ink-900 text-base leading-snug mb-1">{member.name}</h4>
                                <p className="text-xs font-bold text-brown-600 uppercase tracking-wider">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
