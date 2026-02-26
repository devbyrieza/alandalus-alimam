"use client";

import { useState, useEffect } from "react";
import { X, Clock, Zap } from "lucide-react";
import Link from "next/link";

// PPDB deadline: 30 Mei 2026
const DEADLINE = new Date("2026-05-30T23:59:59+07:00");

function getCountdown() {
    const now = new Date();
    const diff = DEADLINE.getTime() - now.getTime();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}

export default function UrgencyBar() {
    const [visible, setVisible] = useState(true);
    const [countdown, setCountdown] = useState(getCountdown());

    useEffect(() => {
        const t = setInterval(() => setCountdown(getCountdown()), 1000);
        return () => clearInterval(t);
    }, []);

    if (!visible || !countdown) return null;

    return (
        <div className="w-full bg-brown-900 text-white px-4 py-2 flex items-center justify-between gap-4 z-50 relative">
            <div className="flex-1 flex items-center justify-center gap-3 flex-wrap text-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-widest text-brown-200">
                        PPDB 2026/2027 Dibuka
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <div className="flex items-center gap-1 font-display font-black text-sm">
                        <span className="bg-white/10 rounded px-1.5 py-0.5 tabular-nums">{String(countdown.days).padStart(2, "0")}</span>
                        <span className="text-brown-300 text-xs">h</span>
                        <span className="bg-white/10 rounded px-1.5 py-0.5 tabular-nums">{String(countdown.hours).padStart(2, "0")}</span>
                        <span className="text-brown-300 text-xs">j</span>
                        <span className="bg-white/10 rounded px-1.5 py-0.5 tabular-nums">{String(countdown.minutes).padStart(2, "0")}</span>
                        <span className="text-brown-300 text-xs">m</span>
                        <span className="bg-white/10 rounded px-1.5 py-0.5 tabular-nums">{String(countdown.seconds).padStart(2, "0")}</span>
                        <span className="text-brown-300 text-xs">d</span>
                    </div>
                    <span className="text-xs text-brown-300 hidden sm:inline">lagi • Kuota terbatas</span>
                </div>

                <Link
                    href="/ppdb"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-brown-950 text-[11px] font-black uppercase tracking-widest hover:bg-gold-400 transition-colors"
                >
                    <Zap className="w-3 h-3" />
                    Daftar Sekarang
                </Link>
            </div>

            <button
                onClick={() => setVisible(false)}
                className="text-brown-400 hover:text-white transition-colors shrink-0"
                aria-label="Tutup"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
