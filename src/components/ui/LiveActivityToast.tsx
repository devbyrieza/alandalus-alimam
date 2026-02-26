"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

const ACTIVITIES = [
    { name: "Ahmad F.", city: "Surabaya", program: "Madrasah Tsanawiyah" },
    { name: "Hasanah N.", city: "Jakarta", program: "I'dad Lughowi" },
    { name: "Rizky M.", city: "Bandung", program: "Madrasah Tsanawiyah" },
    { name: "Fatimah Z.", city: "Semarang", program: "I'dad Lughowi" },
    { name: "Umar S.", city: "Malang", program: "Madrasah Tsanawiyah" },
    { name: "Khansa A.", city: "Yogyakarta", program: "I'dad Lughowi" },
];

export default function LiveActivityToast() {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // First toast after 8s
        const initial = setTimeout(() => {
            setVisible(true);
            setTimeout(() => setVisible(false), 4500);
        }, 8000);

        // Repeat every 25s
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % ACTIVITIES.length);
            setVisible(true);
            setTimeout(() => setVisible(false), 4500);
        }, 25000);

        return () => {
            clearTimeout(initial);
            clearInterval(interval);
        };
    }, []);

    const activity = ACTIVITIES[current];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: -60, y: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 left-3 sm:left-6 z-50 bg-white rounded-2xl shadow-premium-xl border border-surface-100 px-4 py-3 flex items-center gap-3 max-w-[min(260px,calc(100vw-4.5rem))]"
                >
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                        <Users className="w-4.5 h-4.5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-ink-950 leading-tight">
                            {activity.name} dari {activity.city}
                        </p>
                        <p className="text-[11px] text-ink-500 font-medium leading-tight mt-0.5">
                            baru mendaftar Program {activity.program}
                        </p>
                    </div>
                    {/* Live dot */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
