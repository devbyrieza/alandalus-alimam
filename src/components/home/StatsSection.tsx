"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Calendar, Users, GraduationCap, Award, TrendingUp, BookOpen, ShieldCheck } from 'lucide-react';

// ─── Types ───────────────────────────────────────────
type StatColor = 'maroon' | 'gold';

interface Stat {
  id: string;
  label: string;
  value: number;
  icon: React.ElementType;
  color: StatColor;
  suffix: string;
  sublabel: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────
const STATS: Stat[] = [
  {
    id: 'batch',
    label: 'Angkatan Perdana',
    value: 1,
    icon: Calendar,
    color: 'maroon',
    suffix: '',
    sublabel: 'Al-Andalus IIBS',
    description: 'Momen bersejarah pembukaan',
  },
  {
    id: 'quality',
    label: 'Standar Global',
    value: 100,
    icon: Award,
    color: 'maroon',
    suffix: '%',
    sublabel: 'Leadership Mastery',
    description: 'Kurikulum terintegrasi penuh',
  },
  {
    id: 'levels',
    label: 'Jenjang Tersedia',
    value: 2,
    icon: GraduationCap,
    color: 'maroon',
    suffix: '',
    sublabel: 'MTs · IL',
    description: 'Pendidikan menengah lengkap',
  },
  {
    id: 'quota',
    label: 'Kuota Eksklusif',
    value: 25,
    icon: Users,
    color: 'maroon',
    suffix: '',
    sublabel: 'Santri Terpilih',
    description: 'Seleksi ketat, kualitas terjaga',
  },
];

const TRUST_BADGES = [
  { icon: BookOpen, label: 'Pendaftaran Dibuka', pulse: true },
  { icon: ShieldCheck, label: 'Resmi Kemendikdasmen', pulse: false },
  { icon: TrendingUp, label: 'Kurikulum Terintegrasi', pulse: false },
];

// ─── Animated Counter ────────────────────────────────
function AnimatedCounter({
  value,
  suffix,
  trigger,
  delay = 0,
}: {
  value: number;
  suffix: string;
  trigger: boolean;
  delay?: number;
}) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(motionVal, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.floor(v));
      },
    });
    return controls.stop;
  }, [trigger, value, delay, motionVal]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────
function StatCard({ stat, index, trigger }: { stat: Stat; index: number; trigger: boolean }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative flex flex-col items-center text-center px-6 py-8 md:px-8 md:py-10 bg-white rounded-2xl border border-maroon-100 shadow-premium-sm transition-all duration-500 ease-spring hover:-translate-y-1.5 hover:shadow-premium-md hover:border-maroon-200 overflow-hidden">

        {/* Subtle radial bg */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(128,0,0,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Icon */}
        <div className="relative mb-6 w-13 h-13 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-maroon-50 text-maroon-600 shadow-xs transition-all duration-500 group-hover:scale-110 group-hover:bg-maroon-100 group-hover:shadow-maroon/10">
          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
          {/* Ring accent on hover */}
          <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-maroon-200 transition-all duration-500" />
        </div>

        {/* Number */}
        <div className="flex items-baseline justify-center gap-0.5 mb-1">
          <span className="text-[2.625rem] md:text-[3.25rem] font-black text-maroon-700 leading-none tracking-[-0.04em]">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              trigger={trigger}
              delay={0.5 + index * 0.1}
            />
          </span>
          {stat.suffix && (
            <span className="text-2xl md:text-3xl font-black text-maroon-500 leading-none tracking-[-0.03em]">
              {stat.suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-[0.65rem] md:text-[0.7rem] font-bold text-ink-500 uppercase tracking-[0.12em] mt-2">
          {stat.label}
        </p>

        {/* Sublabel */}
        <p className="text-[0.6rem] md:text-[0.65rem] font-semibold text-maroon-400 tracking-wide mt-0.5">
          {stat.sublabel}
        </p>

        {/* Description — shown on hover on desktop */}
        <p className="hidden md:block text-[0.7rem] text-ink-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 leading-relaxed max-w-[140px]">
          {stat.description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-5 h-[2px] w-6 rounded-full bg-maroon-200 transition-all duration-500 group-hover:w-10 group-hover:bg-maroon-500" />
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────
export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 bg-white border-b border-cream-200 overflow-hidden"
    >
      {/* Background glows */}
      <div
        className="absolute -top-1/4 right-0 w-[600px] h-[600px] translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(253,242,242,0.6) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute -bottom-1/4 left-0 w-[500px] h-[500px] -translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254,243,199,0.35) 0%, transparent 65%)',
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-14">

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {STATS.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} trigger={inView} />
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center items-center gap-2.5 md:gap-3"
          >
            {TRUST_BADGES.map(({ icon: BadgeIcon, label, pulse }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-cream-50 rounded-full border border-cream-200 hover:border-maroon-200 hover:bg-cream-100 transition-all duration-300 cursor-default"
              >
                {pulse ? (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                ) : (
                  <BadgeIcon className="w-3 h-3 shrink-0 text-maroon-500" strokeWidth={2} />
                )}
                <span className="text-[0.6rem] md:text-[0.65rem] font-bold text-ink-700 uppercase tracking-[0.1em] whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}