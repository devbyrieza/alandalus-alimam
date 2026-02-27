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
    const [countdown, setCountdown] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        setCountdown(getCountdown());
        const t = setInterval(() => setCountdown(getCountdown()), 1000);
        return () => clearInterval(t);
    }, []);

    if (!visible || !countdown) return null;

    return (
        <div className="w-full bg-brown-900 text-white px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 min-w-0">
                {/* Badge - visible on mobile but shorter */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest text-brown-200 whitespace-nowrap">
                        <span className="inline sm:hidden">PPDB Dibuka</span>
                        <span className="hidden sm:inline">PPDB 2026/2027 Dibuka</span>
                    </span>
                </div>

                {/* Countdown - always visible */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    <Clock className="hidden xs:block w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400 shrink-0" />
                    <div className="flex items-center gap-0.5 font-display font-black text-[9px] xs:text-[11px] sm:text-sm">
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.days).padStart(2, "0")}</span>
                            <span className="text-brown-300 text-[8px] sm:text-[10px]">h</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.hours).padStart(2, "0")}</span>
                            <span className="text-brown-300 text-[8px] sm:text-[10px]">j</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.minutes).padStart(2, "0")}</span>
                            <span className="text-brown-300 text-[8px] sm:text-[10px]">m</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.seconds).padStart(2, "0")}</span>
                            <span className="text-brown-300 text-[8px] sm:text-[10px]">d</span>
                        </div>
                    </div>
                    <span className="text-[8px] xs:text-[9px] sm:text-xs text-brown-300 inline whitespace-nowrap">
                        <span className="inline sm:hidden">• Kuota Terbatas</span>
                        <span className="hidden sm:inline">lagi • Kuota terbatas</span>
                    </span>
                </div>

                {/* CTA Button */}
                <Link
                    href="/ppdb"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gold-500 text-brown-950 text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-gold-400 transition-colors whitespace-nowrap shrink-0"
                >
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden xs:inline">Daftar </span>Sekarang
                </Link>
            </div>

            {/* Dismiss button */}
            <button
                onClick={() => setVisible(false)}
                className="text-brown-400 hover:text-white transition-colors shrink-0 p-0.5"
                aria-label="Tutup"
            >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
        </div>
    );
}
