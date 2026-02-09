"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a small delay for entrance animation
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
        >
            {/* Tooltip / Label - Always visible */}
            <div className="bg-white px-3 py-2 rounded-xl shadow-clay-md text-xs font-bold text-ink-800">
                Butuh Bantuan?
            </div>

            {/* Main Button */}
            <Link
                href="https://wa.me/6285888871997"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                aria-label="Chat via WhatsApp"
            >
                {/* Subtle pulse instead of ping */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-50 animate-pulse"></span>

                <MessageCircle size={28} fill="white" className="relative z-10" />
            </Link>
        </div>
    );
}
