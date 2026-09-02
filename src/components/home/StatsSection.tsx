// src/components/home/StatsSection.tsx
"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Calendar, Users, GraduationCap, Award } from "lucide-react";
import { BRANDING } from "@/config/branding";

const STATS = [
  {
    id: "batch",
    label: "Angkatan Pertama",
    value: 1,
    icon: Calendar,
    suffix: "",
    sublabel: `Tahun Ajaran ${BRANDING.academicYear}`,
    description: "Momen bersejarah pembukaan"
  },
  {
    id: "quality",
    label: "Kurikulum Terintegrasi",
    value: 100,
    icon: Award,
    suffix: "%",
    sublabel: "Tahfidz & Akademik",
    description: "Lima pilar pendidikan utama"
  },
  {
    id: "levels",
    label: "Jenjang Pendidikan",
    value: 2,
    icon: GraduationCap,
    suffix: "",
    sublabel: "MTs · IL",
    description: "Pendidikan menengah lengkap"
  },
  {
    id: "quota",
    label: "Kuota Terbatas",
    value: 25,
    icon: Users,
    suffix: "",
    sublabel: "Per Jenjang (Eksklusif)",
    description: "Seleksi ketat, kualitas terjaga"
  },
];

function AnimatedCounter({ value, trigger, delay = 0 }: { value: number; trigger: boolean; delay?: number }) {
  const motionVal = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(motionVal, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.floor(v));
      }
    });
    return controls.stop;
  }, [trigger, value, delay, motionVal]);

  return <span ref={ref} className="tabular-nums">0</span>;
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-cream py-16 md:py-24 border-y border-maroon-100">
      <Container>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 border border-maroon-50 shadow-premium-sm hover-lift relative overflow-hidden"
            >
              {/* Subtle ambient glow inside card */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cream-50 rounded-full blur-2xl opacity-60" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-700 flex items-center justify-center mb-5">
                  <stat.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-maroon-950 mb-2 font-display">
                  <AnimatedCounter value={stat.value} trigger={inView} delay={i * 0.1} />
                  <span className="text-maroon-500">{stat.suffix}</span>
                </h3>
                
                <p className="text-[0.9375rem] font-bold text-ink-900 mb-1">{stat.label}</p>
                <div className="inline-block px-2 py-0.5 rounded-full bg-cream-50 text-maroon-800 text-[10px] font-bold uppercase tracking-widest mb-3">
                  {stat.sublabel}
                </div>
                <p className="text-xs text-ink-500 font-medium leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
