"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  BookMarked,
  Target,
  School,
  Images,
  ArrowRight,
  Sun,
  Moon,
  Star,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const GALLERY_ITEMS = [
  {
    image: "/images/pembelajaran-kitab-turotz.webp",
    title: "Kajian Kitab Turots",
    description: "Mengkaji Kitab Turots & Ulama Salaf",
    icon: BookOpen,
    accent: "from-maroon-600 to-maroon-900",
  },
  {
    image: "/images/tahfidz.webp",
    title: "Halaqoh Tahfidz",
    description: "Setoran Hafalan & Muroja'ah",
    icon: BookMarked,
    accent: "from-maroon-700 to-maroon-950",
  },
  {
    image: "/images/extra-karate.webp",
    title: "Ekstrakurikuler",
    description: "Bela Diri, Panahan & Lifeskill",
    icon: Target,
    accent: "from-maroon-500 to-maroon-800",
  },
  {
    image: "/images/masjid.webp",
    title: "Masjid Jami'",
    description: "Pusat Ibadah & Tarbiyah Santri",
    icon: School,
    accent: "from-maroon-800 to-maroon-950",
  },
] as const;

const SCHEDULE_ITEMS = [
  {
    time: "Pagi",
    label: "Tahfidz & Muroja'ah",
    icon: Sun,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    time: "Siang",
    label: "Sekolah Formal",
    icon: BookOpen,
    iconBg: "bg-maroon-50",
    iconColor: "text-maroon-600",
  },
  {
    time: "Sore",
    label: "Ekskul & Olahraga",
    icon: Target,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    time: "Malam",
    label: "Belajar Mandiri",
    icon: Moon,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
] as const;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATION VARIANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const scheduleVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GALLERY CARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GalleryCard({
  image,
  title,
  description,
  icon: Icon,
  index,
}: (typeof GALLERY_ITEMS)[number] & { index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 4px 20px -4px rgba(26,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.06)" }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlay — subtle at rest, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-900/30 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

        {/* Subtle noise texture on overlay */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      </div>

      {/* Icon chip — top right, fades in on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -4 }}
        whileHover={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute top-3.5 right-3.5 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.20)" }}
      >
        <Icon className="w-4 h-4" />
      </motion.div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Title — always visible */}
        <h3 className="text-white font-bold text-[15px] tracking-tight leading-snug translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
          {title}
        </h3>

        {/* Description — slides up on hover */}
        <p className="text-cream-100/70 text-xs mt-1 font-medium opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-[40ms]">
          {description}
        </p>
      </div>

      {/* Bottom accent line — maroon brand */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-maroon-400 to-maroon-600 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCHEDULE CARD (kecil)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ScheduleCard({
  time,
  label,
  icon: Icon,
  iconBg,
  iconColor,
  index,
}: (typeof SCHEDULE_ITEMS)[number] & { index: number }) {
  return (
    <motion.div
      custom={index}
      variants={scheduleVariants}
      className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-maroon-100/70 transition-all duration-300 hover:border-maroon-200 hover:shadow-[0_4px_16px_-4px_rgba(26,0,0,0.10)]"
      style={{ boxShadow: "0 1px 4px rgba(26,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)" }}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-[11px] ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.08em] leading-none mb-0.5">
          {time}
        </p>
        <p className="font-semibold text-ink-900 text-[13.5px] leading-tight truncate">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN EXPORT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const scheduleInView = useInView(scheduleRef, { once: true, margin: "-60px" });

  return (
    <section id="gallery" className="section-std !pb-0 overflow-hidden">
      <Container>
        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          {/* Left: label + title + subtitle */}
          <div className="max-w-xl">
            <motion.div variants={fadeUpVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-cream-200 text-maroon-700 text-[11px] font-bold uppercase tracking-[0.12em] mb-4 shadow-sm">
                <Images className="w-3 h-3" />
                <span>Dokumentasi</span>
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="section-title mb-0"
            >
              Galeri{" "}
              <span className="text-gradient-maroon">Aktivitas</span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="section-subtitle lg:ml-0 text-left mt-3 text-justify leading-relaxed"
            >
              Intip kegiatan sehari-hari para santri dalam menuntut ilmu dan beribadah.
            </motion.p>
          </div>

          {/* Right: CTA button */}
          <motion.div variants={fadeUpVariants} className="shrink-0">
            <Link href="/kegiatan">
              <button className="btn-secondary group inline-flex items-center gap-2 px-6">
                Lihat Semua
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Gallery Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 lg:mb-20">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryCard key={idx} {...item} index={idx} />
          ))}
        </div>

        {/* ── Daily Schedule Panel ── */}
        <motion.div
          ref={scheduleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={scheduleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-t-[2.5rem] overflow-hidden border border-b-0 border-cream-200"
          style={{
            background: "linear-gradient(160deg, #FEF8EE 0%, #FFFFFF 55%, #FDF2F2 100%)",
            boxShadow: "0 -12px 40px -12px rgba(26,0,0,0.06)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(128,0,0,0.04) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(228,193,111,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center p-8 md:p-12 max-w-6xl mx-auto">

            {/* Left: copy + CTA */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={scheduleInView ? "visible" : "hidden"}
            >
              {/* Small label */}
              <motion.div variants={fadeUpVariants}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-700 text-[11px] font-bold uppercase tracking-[0.10em] mb-4">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>Jadwal Harian</span>
                </div>
              </motion.div>

              <motion.h3
                variants={fadeUpVariants}
                className="font-black text-maroon-900 tracking-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}
              >
                Jadwal Harian Berkah
              </motion.h3>

              <motion.p
                variants={fadeUpVariants}
                className="text-ink-500 font-[450] mb-7 max-w-sm leading-relaxed text-justify"
                style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
              >
                Setiap detik sangat berharga. Kami mengatur jadwal santri agar seimbang antara ibadah, belajar, istirahat, dan bersosialisasi.
              </motion.p>

              <motion.div variants={fadeUpVariants}>
                <Link href="/kalender">
                  <button className="btn-primary inline-flex items-center gap-2 group px-7">
                    Lihat Jadwal Lengkap
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: schedule cards grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={scheduleInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-3"
            >
              {SCHEDULE_ITEMS.map((item, idx) => (
                <ScheduleCard key={idx} {...item} index={idx} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}