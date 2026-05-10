"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import {
  Calendar,
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────
type StatColor = "maroon" | "gold";

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
    id: "batch",
    label: "Angkatan Perdana",
    value: 1,
    icon: Calendar,
    color: "maroon",
    suffix: "",
    sublabel: "Al Andalus IIBS",
    description: "Momen bersejarah pembukaan angkatan pertama.",
  },
  {
    id: "quality",
    label: "Standar Global",
    value: 100,
    icon: Award,
    color: "gold",
    suffix: "%",
    sublabel: "Leadership Mastery",
    description: "Kurikulum kepemimpinan terintegrasi penuh.",
  },
  {
    id: "levels",
    label: "Jenjang Tersedia",
    value: 2,
    icon: GraduationCap,
    color: "maroon",
    suffix: "",
    sublabel: "MTs · IL",
    description: "Pendidikan menengah dengan kurikulum syar'i.",
  },
  {
    id: "quota",
    label: "Kuota Eksklusif",
    value: 25,
    icon: Users,
    color: "gold",
    suffix: "",
    sublabel: "Santri Terpilih",
    description: "Seleksi ketat untuk menjaga kualitas pendidikan.",
  },
];

const TRUST_BADGES = [
  { icon: BookOpen, label: "Pendaftaran Dibuka", pulse: true },
  { icon: ShieldCheck, label: "Resmi Kemendikdasmen", pulse: false },
  { icon: TrendingUp, label: "Kurikulum Terintegrasi", pulse: false },
];

// ─── Animated Counter ────────────────────────────────
function AnimatedCounter({
  value,
  trigger,
  delay = 0,
}: {
  value: number;
  trigger: boolean;
  delay?: number;
}) {
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
function StatCard({
  stat,
  index,
  trigger,
}: {
  stat: Stat;
  index: number;
  trigger: boolean;
}) {
  const Icon = stat.icon;

  const styles = {
    maroon: {
      card: "border-maroon-100 hover:border-maroon-200",
      icon: "bg-maroon-50 text-maroon-600 group-hover:bg-maroon-100",
      number: "text-maroon-700",
      suffix: "text-maroon-500",
      sublabel: "text-maroon-400",
      accent: "bg-maroon-200 group-hover:bg-maroon-500",
      ring: "ring-maroon-200",
      glow: "rgba(128,0,0,0.03)",
    },
    gold: {
      card: "border-gold-100 hover:border-gold-200",
      icon: "bg-gold-50 text-gold-600 group-hover:bg-gold-100",
      number: "text-gold-700",
      suffix: "text-gold-500",
      sublabel: "text-gold-400",
      accent: "bg-gold-200 group-hover:bg-gold-500",
      ring: "ring-gold-200",
      glow: "rgba(212,175,55,0.03)",
    },
  };

  const current = styles[stat.color];

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
      className="group relative h-full"
    >
      <div
        className={`relative flex flex-col items-center text-center px-6 py-8 md:px-8 md:py-10 bg-white rounded-2xl border ${current.card} shadow-premium-sm transition-all duration-500 ease-spring hover:-translate-y-1.5 hover:shadow-premium-md overflow-hidden h-full`}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${current.glow} 0%, transparent 70%)`,
          }}
        />

        <div
          className={`relative mb-6 w-13 h-13 md:w-14 md:h-14 flex items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 shadow-xs ${current.icon}`}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
          <div
            className={`absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ${current.ring} transition-all duration-500`}
          />
        </div>

        <div className="flex items-baseline justify-center gap-0.5 mb-1">
          <span
            className={`text-[2.625rem] md:text-[3.25rem] font-black leading-none tracking-[-0.04em] ${current.number}`}
          >
            <AnimatedCounter
              value={stat.value}
              trigger={trigger}
              delay={0.5 + index * 0.1}
            />
          </span>
          {stat.suffix && (
            <span
              className={`text-2xl md:text-3xl font-black leading-none tracking-[-0.03em] ${current.suffix}`}
            >
              {stat.suffix}
            </span>
          )}
        </div>

        <p className="text-[0.65rem] md:text-[0.7rem] font-bold text-ink-500 uppercase tracking-[0.12em] mt-2">
          {stat.label}
        </p>

        <p
          className={`text-[0.6rem] md:text-[0.65rem] font-semibold tracking-wide mt-0.5 ${current.sublabel}`}
        >
          {stat.sublabel}
        </p>

        <div
          className={`mt-auto pt-5 h-[2px] w-6 rounded-full transition-all duration-500 group-hover:w-10 ${current.accent}`}
        />
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 bg-white border-b border-cream-200 overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {STATS.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} trigger={inView} />
            ))}
          </div>

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
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-cream-50 rounded-full border border-cream-200 hover:border-maroon-200 hover:bg-cream-100 transition-all duration-300 cursor-default shadow-xs"
              >
                {pulse ? (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                ) : (
                  <BadgeIcon
                    className="w-3 h-3 shrink-0 text-maroon-500"
                    strokeWidth={2}
                  />
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
