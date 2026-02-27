"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-10 h-10" />;

    const modes = [
        { id: "light", label: "Terang", icon: Sun },
        { id: "dark", label: "Gelap", icon: Moon },
        { id: "system", label: "Sistem", icon: Monitor },
    ];

    const currentMode = modes.find((m) => m.id === theme) || modes[2];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-surface-50 border border-surface-200 text-ink-700 hover:bg-surface-100 transition-all duration-300 min-h-[40px] border-none !bg-transparent sm:!bg-surface-50 sm:border-solid lg:hover:shadow-premium-sm"
                aria-label="Ganti tema"
            >
                <div className="p-1 rounded-lg bg-white sm:bg-transparent shadow-sm sm:shadow-none">
                    {resolvedTheme === "dark" ? (
                        <Moon className="w-4.5 h-4.5 text-gold-500" />
                    ) : (
                        <Sun className="w-4.5 h-4.5 text-gold-600" />
                    )}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 hidden sm:block ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for closing */}
                        <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-premium-xl border border-surface-200 p-1.5 z-[70] overflow-hidden"
                        >
                            {modes.map((mode) => {
                                const Icon = mode.icon;
                                const isSelected = theme === mode.id;

                                return (
                                    <button
                                        key={mode.id}
                                        onClick={() => {
                                            setTheme(mode.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${isSelected
                                                ? "bg-brown-50 text-brown-700"
                                                : "text-ink-600 hover:bg-surface-50 hover:text-ink-950"
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isSelected ? "text-brown-700" : "text-ink-400"}`} />
                                        {mode.label}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
