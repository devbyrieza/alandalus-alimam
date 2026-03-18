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
        <div className="relative w-full bg-maroon-900 text-white px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center gap-2 sm:gap-4 overflow-hidden">
            <div className="flex items-center justify-center gap-2 sm:gap-3 shrink min-w-0 sm:px-8">
                {/* Badge - visible and clear */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-maroon-200 whitespace-nowrap">
                        PPDB 2026/2027 Dibuka
                    </span>
                </div>

                {/* Countdown - always visible */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    <Clock className="hidden xs:block w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400 shrink-0" />
                    <div className="flex items-center gap-0.5 font-display font-black text-[9px] xs:text-[11px] sm:text-sm">
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.days).padStart(2, "0")}</span>
                            <span className="text-maroon-300 text-[8px] sm:text-[10px]">h</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.hours).padStart(2, "0")}</span>
                            <span className="text-maroon-300 text-[8px] sm:text-[10px]">j</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.minutes).padStart(2, "0")}</span>
                            <span className="text-maroon-300 text-[8px] sm:text-[10px]">m</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <span className="bg-white/10 rounded px-1 xs:px-1.5 py-0.5 tabular-nums">{String(countdown.seconds).padStart(2, "0")}</span>
                            <span className="text-maroon-300 text-[8px] sm:text-[10px]">d</span>
                        </div>
                    </div>
                    <span className="text-[8px] xs:text-[9px] sm:text-xs text-maroon-300 whitespace-nowrap">
                        lagi • Kuota terbatas
                    </span>
                </div>

                {/* CTA Button */}
                <Link
                    href="/ppdb"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 xs:px-3 py-1 rounded-full bg-gold-500 text-maroon-950 text-[9px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-gold-400 transition-colors whitespace-nowrap shrink-0"
                >
                    <Zap className="hidden xs:block w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Sekarang
                </Link>
            </div>

            {/* Dismiss button - Hidden on very small screens to save space, or kept absolute */}
            <button
                onClick={() => setVisible(false)}
                className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-maroon-400 hover:text-white transition-colors p-1"
                aria-label="Tutup"
            >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
        </div>
    );
}
