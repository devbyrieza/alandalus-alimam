"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookKey,
  BookOpen,
  Check,
  GraduationCap,
  type LucideIcon,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

type ProgramVariant = "rose" | "gold" | "plum";

interface ProgramItem {
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  statusLabel: string;
  badge: string;
  href: string;
  icon: LucideIcon;
  variant: ProgramVariant;
}

const PROGRAMS: ProgramItem[] = [
  {
    title: "Madrasah Tsanawiyah (MTs)",
    subtitle: "Tingkat Menengah · Setara SMP",
    desc: "Pendidikan menengah pertama memadukan bahasa Arab intensif, tahfidz mutqin, ilmu syar'i, sains akademik umum berdaya saing, serta pola asuh mendidik tanpa luka.",
    features: [
      "Bahasa Arab intensif harian & kajian turots Sunnah",
      "Tahfidz Al-Qur'an mutqin bimbingan tajwid bersanad",
      "Pelajaran sains & akademik umum berdaya saing",
      "Mendidik tanpa luka: keteladanan asatidzah 24 jam",
      "Pembinaan adab Islami & karakter kemandirian santriwati",
    ],
    statusLabel: "Khusus Putri",
    badge: "Jalur Reguler",
    href: "/program#mts",
    icon: GraduationCap,
    variant: "rose",
  },
  {
    title: "I'dad Lughawi (IL)",
    subtitle: "Persiapan Bahasa Arab · Menuju MA",
    desc: "Program matrikulasi akselerasi bahasa Arab intensif selama satu tahun bagi santriwati lulusan SMP umum untuk persiapan mendalami ilmu syar'i dan melanjutkan ke jenjang MA.",
    features: [
      "Imersi total bahasa Arab aktif harian (Muhadatsah)",
      "Penguasaan mendalam kaidah Nahwu, Shorof, & kosakata praktis",
      "Pembiasaan adab harian, ibadah Sunnah, & kultur asrama putri",
      "Jembatan akselerasi mantap menuju Madrasah Aliyah",
      "Bimbingan tahsin & muraja'ah hafalan Al-Qur'an harian",
    ],
    statusLabel: "Matrikulasi Intensif",
    badge: "Akselerasi 1 Tahun",
    href: "/program#idad",
    icon: BookKey,
    variant: "gold",
  },
  {
    title: "Madrasah Aliyah (MA) Langsung",
    subtitle: "Tingkat Menengah Atas · 3 Tahun Langsung",
    desc: "Program MA 3 tahun langsung tanpa IL bagi santriwati lulusan SMP/MTs yang telah lancar berbahasa Arab aktif dan memiliki hafalan Al-Qur'an mutqin.",
    features: [
      "Pendalaman kitab turots bersanad para ulama Sunnah",
      "Persiapan beasiswa Perguruan Tinggi Islam & Timur Tengah",
      "Kemandirian keputrian, adab luhur, & pembinaan pendidik generasi umat",
      "Jalur langsung 3 tahun bagi santriwati fasih berbahasa Arab aktif",
      "Penguatan sains & bekal wirausaha syar'i mandiri",
    ],
    statusLabel: "Khusus Putri",
    badge: "Jalur Langsung",
    href: "/program#ma",
    icon: BookOpen,
    variant: "plum",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

function getTokens(variant: ProgramVariant) {
  switch (variant) {
    case "rose":
      return {
        accentBar: "bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400",
        ambientGlow: "bg-rose-100/50",
        iconBox:
          "bg-gradient-to-br from-rose-600 to-pink-500 shadow-rose-500/25 ring-4 ring-rose-50",
        levelBadge: "bg-rose-50 text-rose-800 border border-rose-200/60",
        subBadge: "bg-rose-50 text-rose-700 border border-rose-200/60",
        checkContainer:
          "bg-rose-50/80 border-rose-200/80 text-rose-600 group-hover/item:bg-rose-600 group-hover/item:text-white group-hover/item:border-rose-600",
        btnHover: "hover:bg-rose-600 hover:border-rose-600 hover:shadow-rose-600/20",
      };
    case "gold":
      return {
        accentBar: "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400",
        ambientGlow: "bg-amber-100/50",
        iconBox:
          "bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/25 ring-4 ring-amber-50",
        levelBadge: "bg-amber-50 text-amber-800 border border-amber-200/60",
        subBadge: "bg-amber-100 text-amber-800 border border-amber-200/80",
        checkContainer:
          "bg-amber-50/80 border-amber-200/80 text-amber-600 group-hover/item:bg-amber-500 group-hover/item:text-white group-hover/item:border-amber-500",
        btnHover: "hover:bg-amber-600 hover:border-amber-600 hover:shadow-amber-600/20",
      };
    case "plum":
      return {
        accentBar: "bg-gradient-to-r from-rose-700 via-rose-600 to-purple-600",
        ambientGlow: "bg-pink-100/50",
        iconBox:
          "bg-gradient-to-br from-rose-700 to-fuchsia-600 shadow-rose-700/25 ring-4 ring-rose-50",
        levelBadge: "bg-pink-50 text-pink-800 border border-pink-200/60",
        subBadge: "bg-pink-50 text-pink-700 border border-pink-200/60",
        checkContainer:
          "bg-pink-50/80 border-pink-200/80 text-rose-700 group-hover/item:bg-rose-700 group-hover/item:text-white group-hover/item:border-rose-700",
        btnHover: "hover:bg-rose-700 hover:border-rose-700 hover:shadow-rose-700/20",
      };
    default:
      return {
        accentBar: "",
        ambientGlow: "",
        iconBox: "",
        levelBadge: "",
        subBadge: "",
        checkContainer: "",
        btnHover: "",
      };
  }
}

export default function ProgramSection() {
  return (
    <section className="section-alt relative overflow-hidden border-y border-slate-100 py-20 lg:py-28 bg-white/70">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#fecdd3_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-rose-100/40 blur-[110px]" />
        <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full bg-amber-100/40 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-rose-800 text-xs font-bold uppercase tracking-wider shadow-xs mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Jenjang Pendidikan • Khusus Putri</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-4"
          >
            Pilihan Program{" "}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
              Pendidikan Khusus Putri
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Dirancang komprehensif untuk mencetak generasi muslimah mutafaqqih fiddin, berwawasan
            luas, berakhlak mulia, serta siap menjadi teladan dan pendidik generasi umat.
          </motion.p>
        </div>

        {/* 3 Program Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {PROGRAMS.map((program: ProgramItem) => {
            const tokens = getTokens(program.variant);
            return (
              <motion.div key={program.title} variants={cardVariants} className="group h-full flex">
                <div className="relative w-full flex flex-col justify-between bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-7 lg:p-8 shadow-xl shadow-rose-500/5 hover:shadow-2xl hover:shadow-rose-500/15 hover:border-rose-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Subtle Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${tokens.accentBar}`} />

                  {/* Ambient Header Glow on Hover */}
                  <div
                    className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100 ${tokens.ambientGlow}`}
                  />

                  {/* Card Content Area */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top Bar: Icon + Status / Badge */}
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <div
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 ${tokens.iconBox}`}
                      >
                        <program.icon className="w-6 h-6" strokeWidth={2} />
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-semibold shadow-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          <span className="flex items-center gap-1 tracking-wide">
                            <Users className="w-3 h-3 text-slate-300" />
                            {program.statusLabel}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${tokens.subBadge}`}
                        >
                          {program.badge}
                        </span>
                      </div>
                    </div>

                    {/* Level Pill, Title, & Description */}
                    <div className="mb-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase mb-3 ${tokens.levelBadge}`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{program.subtitle}</span>
                      </span>

                      <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight leading-snug group-hover:text-rose-600 transition-colors duration-200">
                        {program.title}
                      </h3>

                      <p className="text-slate-600 text-[13px] sm:text-sm leading-relaxed mt-2.5 font-normal">
                        {program.desc}
                      </p>
                    </div>

                    {/* Focus / Target & Kurikulum */}
                    <div className="pt-4 border-t border-slate-100 grow flex flex-col">
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                          Kurikulum & Target Utama
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                      </div>

                      <ul className="space-y-2.5">
                        {program.features.map((feature: string) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50/80 transition-colors group/item"
                          >
                            <div
                              className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border shadow-2xs transition-colors duration-200 ${tokens.checkContainer}`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="text-[12.5px] sm:text-[13px] font-medium text-slate-700 leading-snug group-hover/item:text-slate-950 transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link href={program.href} className="mt-7 block pt-4 border-t border-slate-100">
                      <div
                        className={`w-full py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-white font-bold text-xs flex items-center justify-between group/btn shadow-xs hover:shadow-lg transition-all duration-300 ${tokens.btnHover}`}
                      >
                        <span className="tracking-wide">Pelajari Kurikulum Lengkap</span>
                        <div className="w-7 h-7 rounded-lg bg-white group-hover/btn:bg-white/20 flex items-center justify-center text-slate-600 group-hover/btn:text-white shadow-2xs transition-transform duration-300 group-hover/btn:translate-x-1">
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
