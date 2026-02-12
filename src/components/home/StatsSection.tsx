"use client";

import { Calendar, Users, Award, GraduationCap } from "lucide-react";
import { Container } from "@/components/layout/Container";

const STATS_DATA = [
  {
    icon: Calendar,
    value: "30+",
    label: "Tahun Mengabdi",
    sublabel: "Sejak 1995 (Mulai 2026 dikelola Al-Andalus)",
  },
  {
    icon: Users,
    value: "70+",
    label: "Santri Aktif",
    sublabel: "Putra & Putri",
  },
  {
    icon: Award,
    value: "Resmi",
    label: "Standard Nasional",
    sublabel: "Kemendikdasmen RI (B)",
  },
  {
    icon: GraduationCap,
    value: "20+",
    label: "Tenaga Pendidik",
    sublabel: "Berpengalaman",
  },
] as const;

interface StatCardProps {
  icon: typeof Calendar;
  value: string;
  label: string;
  sublabel: string;
  index: number;
}

function StatCard({ icon: Icon, value, label, sublabel, index }: StatCardProps) {
  return (
    <div
      className="card-wablas p-4 md:p-5 flex flex-col items-center text-center group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-10 h-10 mb-2 rounded-xl bg-surface-50 group-hover:bg-brown-50 flex items-center justify-center transition-colors">
        <Icon className="w-5 h-5 text-ink-400 group-hover:text-brown-600 transition-colors" />
      </div>
      <p className="text-2xl lg:text-3xl font-black text-ink-900 mb-0.5 tracking-tight">
        {value}
      </p>
      <p className="text-xs font-bold text-ink-600 mb-0.5">
        {label}
      </p>
      <p className="text-[10px] text-ink-400 font-medium">{sublabel}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-8 bg-white relative z-10 -mt-4 lg:-mt-8">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STATS_DATA.map((stat, idx) => (
            <StatCard key={idx} {...stat} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
