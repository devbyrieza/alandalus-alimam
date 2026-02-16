"use client";

import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show after 2 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
            setShowTooltip(true);
        }, 2000);

        // Hide tooltip after 10 seconds
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 12000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    const waNumber = "6285111524441";
    const waMessage = encodeURIComponent("Halo Panitia PPDB Pesantren Al-Imam, saya ingin bertanya seputar pendaftaran santri baru...");
    const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

    return (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[9999] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Tooltip/Label */}
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                className="bg-white px-4 py-2 rounded-2xl shadow-premium-lg border border-surface-100 flex items-center gap-3 mb-2 max-w-[200px] relative"
                            >
                                <div className="flex-1">
                                    <p className="text-xs font-black text-ink-950 leading-tight">Butuh Bantuan?</p>
                                    <p className="text-[10px] text-ink-500 font-medium leading-tight">Klik untuk chat Panitia PPDB</p>
                                </div>
                                <button
                                    onClick={() => setShowTooltip(false)}
                                    className="p-1 hover:bg-surface-50 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3 text-ink-400" />
                                </button>
                                {/* Carrot */}
                                <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-r border-b border-surface-100 transform rotate-45" />
                            </motion.div>
                        )}

                        {/* Main Button */}
                        <motion.a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] relative"
                        >
                            <MessageCircle className="w-8 h-8 fill-white/20" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center animate-bounce text-[10px] font-bold">
                                1
                            </span>
                        </motion.a>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
