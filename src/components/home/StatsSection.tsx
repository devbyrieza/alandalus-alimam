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
    label: "Angkatan Perdana",
    value: 1,
    icon: Calendar,
    suffix: "",
    sublabel: `Tahun Ajaran ${BRANDING.academicYear}`,
    description: "Momen bersejarah pembukaan santri baru",
    accentBorder: "border-b-[#550000]"
  },
  {
    id: "quality",
    label: "Kurikulum Terintegrasi",
    value: 100,
    icon: Award,
    suffix: "%",
    sublabel: "Tahfidz & Akademik",
    description: "Kombinasi kurikulum turots & nasional",
    accentBorder: "border-b-[#ddc192]"
  },
  {
    id: "levels",
    label: "Jenjang Pendidikan",
    value: 2,
    icon: GraduationCap,
    suffix: "",
    sublabel: "MTs & I'dad Lughawi",
    description: "Pendidikan menengah terakreditasi",
    accentBorder: "border-b-emerald-600"
  },
  {
    id: "quota",
    label: "Kuota Terbatas",
    value: 25,
    icon: Users,
    suffix: "",
    sublabel: "Santri / Rombel",
    description: "Rasio pendampingan intensif & eksklusif",
    accentBorder: "border-b-indigo-600"
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
    <section className="bg-[#F8FAFC] py-14 md:py-20 border-b border-slate-200">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between border-b-4 ${stat.accentBorder}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#550000]">
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <AnimatedCounter value={stat.value} trigger={inView} delay={i * 0.08} />
                  <span className="text-[#550000]">{stat.suffix}</span>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ddc192]/20 text-[#550000] text-[10px] font-extrabold uppercase tracking-wider mt-1 mb-2">
                  {stat.sublabel}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed pt-3 border-t border-slate-100">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
