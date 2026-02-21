"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  Calendar,
  Clock
} from "lucide-react";

const STATS = [
  {
    id: "years",
    value: 30,
    label: "Tahun Pengalaman",
    icon: Calendar,
    color: "brown"
  },
  {
    id: "students",
    value: 70,
    label: "Santri Aktif",
    icon: Users,
    color: "blue"
  },
  {
    id: "graduates",
    value: 180,
    label: "Alumni Sukses",
    icon: GraduationCap,
    color: "gold"
  },
  {
    id: "programs",
    value: 10,
    label: "Ekstrakurikuler",
    icon: Award,
    color: "teal"
  }
] as const;

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counters, setCounters] = useState(
    STATS.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {})
  );

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        STATS.forEach((stat) => {
          let current = 0;
          const target = stat.value;
          const duration = 1500; // 1.5 seconds
          const steps = 60;
          const increment = target / steps;
          const stepTime = duration / steps;

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            setCounters(prev => ({ ...prev, [stat.id]: Math.floor(current) }));
          }, stepTime);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Sophisticated Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brown-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.id}
                ref={index === 0 ? ref : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-premium-md ${stat.color === 'brown' ? 'bg-brown-50 text-brown-600' :
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    stat.color === 'gold' ? 'bg-gold-50 text-gold-600' :
                      'bg-teal-50 text-teal-600'
                  }`}>
                  <stat.icon className="w-7 h-7" />
                </div>

                <div className="relative">
                  <motion.div
                    className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-2 tracking-tighter"
                  >
                    {counters[stat.id as keyof typeof counters]}<span className="text-brown-500">+</span>
                  </motion.div>
                </div>

                <p className="text-xs md:text-sm font-extrabold text-ink-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>

                {/* Specific context for years */}
                {stat.id === 'years' && (
                  <p className="text-[10px] font-bold text-brown-600 mt-2 bg-brown-50 px-2 py-0.5 rounded-full border border-brown-100">
                    Dikelola Sepenuhnya oleh Al-Andalus Sejak Januari 2026
                  </p>
                )}

                {/* Subtle underline decoration */}
                <div className="mt-4 w-8 h-1 bg-surface-200 rounded-full group-hover:w-16 group-hover:bg-brown-500 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 pt-10 border-t border-surface-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold text-ink-600 uppercase tracking-widest">Pendaftaran Dibuka</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-brown-500" />
              <span className="text-sm font-bold text-ink-600 uppercase tracking-widest">Resmi Kemendikdasmen</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-teal-500" />
              <span className="text-sm font-bold text-ink-600 uppercase tracking-widest">Sinergi Kurikulum Terintegrasi</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}