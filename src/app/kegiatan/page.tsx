"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  BookMarked,
  Target,
  Sun,
  Book,
  Moon,
  Users,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Heart,
  Home,
  BookText,
  Tent,
  Swords,
  Music,
  PenTool,
  Globe,
  MessageCircle,
  Dribbble,
  CheckCircle2,
  TrendingUp,
  Star,
  Zap,
  Shield,
  Trophy,
  MessagesSquare,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Container } from "@/components/layout/Container";

// ========================================
// TYPE DEFINITIONS
// ========================================

interface StatItem {
  label: string;
  value: string;
}

interface ResultItem {
  icon: any;
  text: string;
}

interface KegiatanUtama {
  image: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  bgColor: string;
  stats: StatItem[];
  results: ResultItem[];
  testimonial: {
    quote: string;
    parent: string;
  };
}

interface HeroStat {
  icon: any;
  value: string;
  label: string;
  sublabel: string;
}

interface JadwalHarian {
  icon: any;
  time: string;
  activity: string;
  detail: string;
  benefit: string;
  bgColor: string;
  iconColor: string;
}

interface KegiatanMingguan {
  title: string;
  desc: string;
  detail: string;
  benefit: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
}

interface Ekstrakurikuler {
  name: string;
  icon: any;
  desc: string;
  benefit: string;
}

// ========================================
// REUSABLE COMPONENTS
// ========================================

const FeatureCard = ({
  item,
  index,
}: {
  item: KegiatanUtama;
  index: number;
}) => (
  <ScrollAnimation
    className="group bg-white dark:bg-[var(--color-cream-200)] rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl border border-[var(--color-cream-300)] dark:border-[var(--color-cream-300)] overflow-hidden transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
    delay={index * 0.1}
  >
    <div className="grid lg:grid-cols-5 gap-0">
      {/* Image - Responsive height */}
      <div
        className={`relative h-44 xs:h-48 sm:h-56 lg:h-auto overflow-hidden lg:col-span-2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"
          }`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`}
        />

        {/* Success Badge - Responsive */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg shadow-lg">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--color-gold-600)]" />
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-black text-[var(--color-brown-900)]">
              PROGRAM UNGGULAN
            </span>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div
        className={`p-4 xs:p-5 sm:p-5 lg:p-6 flex flex-col justify-center lg:col-span-3 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"
          }`}
      >
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 ${item.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-2.5 sm:mb-3 group-hover:scale-110 transition-all duration-300`}
        >
          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>

        {/* Title - Responsive text */}
        <h3 className="text-base xs:text-lg sm:text-xl lg:text-xl font-black text-[var(--color-brown-900)] mb-2 sm:mb-2.5 leading-tight font-display">
          {item.title}
        </h3>

        {/* Description - Responsive text */}
        <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-text-600)] mb-2.5 sm:mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          {item.stats.map((stat, statIdx) => (
            <div
              key={statIdx}
              className="text-center p-2 sm:p-2.5 bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-gold-50)] rounded-lg border border-[var(--color-gold-200)] hover:shadow-md transition-all hover:border-[var(--color-gold-300)]"
            >
              <div className="text-base xs:text-lg sm:text-xl lg:text-xl font-black text-[var(--color-gold-700)] mb-0.5">
                {stat.value}
              </div>
              <div className="text-[9px] xs:text-[10px] sm:text-xs text-[var(--color-text-600)] font-semibold leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* HASIL NYATA - Responsive padding */}
        <div className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-100)] rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-[var(--color-teal-200)] mb-2.5 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-teal-600)]" />
            <span className="text-[10px] xs:text-xs sm:text-xs font-black text-[var(--color-teal-900)]">
              HASIL NYATA SANTRI KAMI:
            </span>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {item.results.map((result, idx) => (
              <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                <result.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-teal-600)] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-text-700)] leading-relaxed font-medium">
                  {result.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Testimonial - Responsive padding */}
        <div className="bg-white dark:bg-[var(--color-cream-300)] rounded-lg p-2.5 sm:p-3 border border-[var(--color-cream-200)] dark:border-[var(--color-cream-400)] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-0.5 mb-1 sm:mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[var(--color-gold-400)] text-[var(--color-gold-400)]"
              />
            ))}
          </div>
          <p className="text-[10px] xs:text-xs sm:text-xs italic text-[var(--color-text-600)] mb-1 sm:mb-1.5 leading-relaxed">
            "{item.testimonial.quote}"
          </p>
          <span className="text-[10px] xs:text-xs sm:text-xs font-bold text-[var(--color-text-800)]">
            — {item.testimonial.parent}
          </span>
        </div>
      </div>
    </div>
  </ScrollAnimation>
);

const StatsCard = ({ icon: Icon, value, label, sublabel }: HeroStat) => (
  <div className="group bg-white/10 backdrop-blur-md px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 mx-auto mb-1 group-hover:scale-110 transition-transform" />
    <div className="text-xl xs:text-2xl sm:text-2xl font-black text-white group-hover:scale-110 transition-transform">
      {value}
    </div>
    <div className="text-xs xs:text-sm sm:text-sm text-white/80">{label}</div>
    <div className="text-[10px] xs:text-xs sm:text-xs text-white/70 mt-0.5 sm:mt-1">
      {sublabel}
    </div>
  </div>
);

const ScheduleCard = ({
  schedule,
  index,
}: {
  schedule: JadwalHarian;
  index: number;
}) => (
  <ScrollAnimation
    delay={index * 0.1}
    className={`group p-4 xs:p-5 sm:p-6 xl:p-8 rounded-xl sm:rounded-2xl ${schedule.bgColor} dark:bg-[var(--color-cream-200)] border border-white/20 dark:border-[var(--color-cream-300)] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2`}
  >
    <div className="flex items-start gap-3 xs:gap-4 sm:gap-5">
      <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-white dark:bg-[var(--color-cream-300)] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0">
        <schedule.icon
          className={`${schedule.iconColor} w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs xs:text-sm sm:text-base xl:text-base font-bold text-[var(--color-brown-700)] mb-1.5 sm:mb-2">
          {schedule.time}
        </div>
        <h3 className="text-base xs:text-lg sm:text-xl xl:text-xl font-black text-[var(--color-brown-900)] mb-2 sm:mb-3 leading-tight font-display">
          {schedule.activity}
        </h3>
        <p className="text-xs xs:text-sm sm:text-base xl:text-base text-[var(--color-text-600)] mb-3 sm:mb-4 leading-relaxed">
          {schedule.detail}
        </p>

        {/* Benefit Badge - Responsive */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-[var(--color-teal-200)] shadow-sm">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-teal-600)] flex-shrink-0" />
          <span className="text-[10px] xs:text-xs sm:text-sm xl:text-sm font-bold text-[var(--color-teal-900)]">
            {schedule.benefit}
          </span>
        </div>
      </div>
    </div>
  </ScrollAnimation>
);

const WeeklyActivityCard = ({
  activity,
  index,
}: {
  activity: KegiatanMingguan;
  index: number;
}) => (
  <ScrollAnimation
    delay={index * 0.1}
    className={`group p-4 xs:p-5 sm:p-6 xl:p-7 rounded-xl sm:rounded-2xl ${activity.bg} dark:bg-[var(--color-cream-200)] border-2 ${activity.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 text-center`}
  >
    <div className="flex justify-center mb-3 xs:mb-4 sm:mb-5">
      <activity.icon
        className={`${activity.color} w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      />
    </div>
    <h4 className="font-black text-sm xs:text-base sm:text-lg xl:text-lg text-[var(--color-brown-900)] mb-1.5 sm:mb-2 font-display">
      {activity.title}
    </h4>
    <p className="text-xs xs:text-sm sm:text-base xl:text-base text-[var(--color-text-600)] font-semibold mb-2 sm:mb-3">
      {activity.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t-2 border-current/10 mb-3 sm:mb-4">
      <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm text-[var(--color-text-500)] font-medium">
        {activity.detail}
      </p>
    </div>

    {/* Benefit - Responsive */}
    <div className="bg-white/70 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 border border-[var(--color-teal-200)] shadow-sm">
      <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm font-bold text-[var(--color-teal-800)] leading-tight">
        {activity.benefit}
      </p>
    </div>
  </ScrollAnimation>
);

const EkskulCard = ({
  ekskul,
  index,
}: {
  ekskul: Ekstrakurikuler;
  index: number;
}) => (
  <ScrollAnimation delay={index * 0.05} className="group p-4 xs:p-5 sm:p-5 xl:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[var(--color-cream-200)] border border-[var(--color-cream-300)] dark:border-[var(--color-cream-400)] shadow-lg hover:shadow-2xl hover:border-[var(--color-teal-300)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 text-center">
    <ekskul.icon className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 text-[var(--color-teal-600)] dark:text-[var(--color-teal-400)] mx-auto mb-3 xs:mb-3.5 sm:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
    <h4 className="font-black text-xs xs:text-sm sm:text-base xl:text-base text-[var(--color-brown-900)] mb-1.5 sm:mb-2 font-display">
      {ekskul.name}
    </h4>
    <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm text-[var(--color-text-600)] mb-2 sm:mb-3 leading-relaxed">
      {ekskul.desc}
    </p>
    <div className="pt-2 sm:pt-3 border-t border-[var(--color-cream-200)]">
      <p className="text-[10px] xs:text-xs sm:text-sm xl:text-sm font-bold text-[var(--color-teal-700)]">
        {ekskul.benefit}
      </p>
    </div>
  </ScrollAnimation>
);

// ========================================
// MAIN COMPONENT
// ========================================

export default function KegiatanPage() {
  const kegiatanUtama: KegiatanUtama[] = [
    {
      image:
        "/images/santri-pembelajaran-kitab.png",
      title: "Pembelajaran Kitab Kuning",
      description:
        "Bukan sekadar hafalan! Santri kami PAHAM isi kitab, bisa berdiskusi ilmiah, dan siap jadi ulama muda yang membanggakan keluarga",
      icon: BookOpen,
      gradient: "from-[var(--color-brown-900)]/90 via-[var(--color-brown-800)]/70 to-[var(--color-gold-700)]/50",
      bgColor: "bg-[var(--color-brown-800)]",
      stats: [
        { label: "Kitab Dikuasai", value: "15+" },
        { label: "Ustadz Expert", value: "20+" },
        { label: "Jam/Hari", value: "4+" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "Mampu membaca kitab gundul (Nahwu-Shorof Applied)",
        },
        { icon: Award, text: "Aktif dalam Bahtsul Masail & Muhadoroh" },
        {
          icon: CheckCircle2,
          text: "Alumni tersebar di PTN & Timur Tengah",
        },
      ],
      testimonial: {
        quote:
          "Anak saya sekarang bisa membaca kitab gundul sendiri! Dulu saya pikir itu mustahil untuk anak SMP",
        parent: "Ibu Siti Aminah, Wali Santri MTs",
      },
    },
    {
      image:
        "/images/tahfidz.JPG",
      title: "Program Tahfidz Al-Qur'an",
      description:
        "Metode menghafal yang terukur disesuaikan dengan kemampuan santri dan target jenjang pendidikan (bisa mencapai 30 juz bagi yang takhasus/lanjut).",
      icon: BookMarked,
      gradient: "from-[var(--color-gold-700)]/90 via-[var(--color-gold-600)]/70 to-[var(--color-teal-600)]/50",
      bgColor: "bg-[var(--color-gold-600)]",
      stats: [
        { label: "Target Hafalan", value: "3 - 30 Juz" },
        { label: "Metode Proven", value: "Talaqqi" },
        { label: "Setoran", value: "Harian" },
      ],
      results: [
        {
          icon: TrendingUp,
          text: "Mencapai Target Hafalan Sesuai Jenjang (Min. 3 Juz/Thn)",
        },
        { icon: Award, text: "Memiliki Bacaan Standar Sanad/Talaqqi" },
        { icon: CheckCircle2, text: "Mampu Membaca Al-Qur'an Tartil & Tajwid" },
      ],
      testimonial: {
        quote:
          "Dari 0 juz jadi 12 juz dalam 18 bulan! Ini bukan keajaiban, tapi sistem Al-Imam yang luar biasa",
        parent: "Bapak Ahmad Rifa'i, Wali Santri MA",
      },
    },
    {
      image:
        "/images/ekstra-atau-ekskul.jpg",
      title: "Ekstrakurikuler Prestasi",
      description:
        "Anak Anda TIDAK HANYA pintar ngaji! Mereka juga juara olimpiade, atlet berprestasi, dan public speaker handal. Komplit!",
      icon: Target,
      gradient: "from-[var(--color-teal-600)]/90 via-[var(--color-teal-700)]/70 to-[var(--color-brown-900)]/50",
      bgColor: "bg-[var(--color-teal-600)]",
      stats: [
        { label: "Pilihan Ekskul", value: "10+" },
        { label: "Pelatih Expert", value: "15+" },
        { label: "Jam/Minggu", value: "6+" },
      ],
      results: [
        { icon: Trophy, text: "Memiliki Kemampuan Bela Diri (Silat/Karate)" },
        { icon: Award, text: "Berprestasi dalam Minat Bakat (Sains & Bahasa)" },
        {
          icon: CheckCircle2,
          text: "Berjiwa Kepemimpinan & Siap Berorganisasi",
        },
      ],
      testimonial: {
        quote:
          "Anak saya dulu pemalu, sekarang berani pidato di depan ratusan orang. Confidence-nya meningkat drastis!",
        parent: "Ibu Fatimah Zahra, Wali Santri Tahfidz",
      },
    },
  ];

  const heroStats: HeroStat[] = [
    {
      icon: BookOpen,
      value: "15+",
      label: "Kitab Kuning",
      sublabel: "Dikuasai dalam 4 tahun",
    },
    {
      icon: BookMarked,
      value: "30 Juz",
      label: "Target Hafalan",
      sublabel: "Dengan metode proven",
    },
    {
      icon: Target,
      value: "10+",
      label: "Ekstrakurikuler",
      sublabel: "Untuk bakat tersembunyi",
    },
  ];

  const jadwalHarian: JadwalHarian[] = [
    {
      icon: Sun,
      time: "04:30 - 07:00",
      activity: "Tahajud, Subuh & Tahfidz Pagi",
      detail:
        "Mulai hari dengan spiritualitas tinggi dan setoran hafalan segar",
      benefit: "Anak jadi disiplin bangun pagi seumur hidup",
      bgColor: "bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-cream-100)]",
      iconColor: "text-[var(--color-gold-600)]",
    },
    {
      icon: Book,
      time: "07:30 - 14:00",
      activity: "KBM Formal & Kajian Kitab",
      detail: "Sekolah formal (MTs/MA) + pembelajaran kitab kuning intensif",
      benefit: "Nilai rapor bagus + ilmu agama mendalam",
      bgColor: "bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-brown-50)]",
      iconColor: "text-[var(--color-brown-800)]",
    },
    {
      icon: Target,
      time: "15:30 - 17:00",
      activity: "Ekstrakurikuler & Olahraga",
      detail: "Pengembangan bakat terpendam dan kesehatan fisik",
      benefit: "Anak jadi multitalenta & percaya diri",
      bgColor: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-100)]",
      iconColor: "text-[var(--color-teal-600)]",
    },
    {
      icon: Moon,
      time: "19:30 - 21:00",
      activity: "Kajian Malam & Muhadharah",
      detail: "Pendalaman ilmu agama dan latihan public speaking",
      benefit: "Anak berani tampil & jadi pemimpin masa depan",
      bgColor: "bg-gradient-to-br from-[var(--color-brown-50)] to-[var(--color-gold-50)]",
      iconColor: "text-[var(--color-brown-800)]",
    },
  ];

  const kegiatanMingguan: KegiatanMingguan[] = [
    {
      title: "Sholat Berjama'ah",
      desc: "5 Waktu Setiap Hari",
      detail: "Fardhu & Sunnah Rawatib",
      benefit: "Anak jadi taat beribadah seumur hidup",
      icon: Home,
      color: "text-[var(--color-brown-800)]",
      bg: "bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-brown-50)]",
      border: "border-[var(--color-brown-200)]",
    },
    {
      title: "Kajian Jum'at",
      desc: "Setiap Hari Jum'at",
      detail: "Tafsir & Hadits Mendalam",
      benefit: "Paham agama, bukan asal ikut-ikutan",
      icon: BookText,
      color: "text-[var(--color-gold-700)]",
      bg: "bg-gradient-to-br from-[var(--color-gold-50)] to-[var(--color-cream-50)]",
      border: "border-[var(--color-gold-200)]",
    },
    {
      title: "Muhadharah",
      desc: "Kamis Malam",
      detail: "Latihan Pidato & Khutbah",
      benefit: "Jadi public speaker handal sejak muda",
      icon: Users,
      color: "text-[var(--color-teal-700)]",
      bg: "bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-100)]",
      border: "border-[var(--color-teal-200)]",
    },
    {
      title: "Rihlah Ilmiyyah",
      desc: "Setiap Bulan",
      detail: "Kunjungan Edukatif",
      benefit: "Wawasan luas, tidak kuper",
      icon: Calendar,
      color: "text-[var(--color-brown-700)]",
      bg: "bg-gradient-to-br from-[var(--color-brown-50)] to-[var(--color-cream-100)]",
      border: "border-[var(--color-brown-200)]",
    },
  ];

  const ekstrakurikuler: Ekstrakurikuler[] = [
    {
      name: "Pramuka",
      icon: Tent,
      desc: "Leadership & survival",
      benefit: "Jadi pemimpin tangguh",
    },
    {
      name: "Pencak Silat",
      icon: Swords,
      desc: "Bela diri tradisional",
      benefit: "Percaya diri & disiplin",
    },
    {
      name: "Tilawah",
      icon: BookOpen,
      desc: "Seni baca Qur'an",
      benefit: "Suara merdu & tartil",
    },
    {
      name: "Kaligrafi",
      icon: PenTool,
      desc: "Seni tulis Arab",
      benefit: "Kreativitas & kesabaran",
    },
    {
      name: "Nasyid",
      icon: Music,
      desc: "Vokal Islami",
      benefit: "Bakat seni tersalurkan",
    },
    {
      name: "Sepak Bola",
      icon: Dribbble,
      desc: "Olahraga tim",
      benefit: "Teamwork & sportivitas",
    },
    {
      name: "Bahasa Arab",
      icon: MessageCircle,
      desc: "Muhadatsah aktif",
      benefit: "Siap kuliah Timur Tengah",
    },
    {
      name: "Bahasa Inggris",
      icon: Globe,
      desc: "English club",
      benefit: "Global communication skill",
    },
  ];

  return (
    <>
      {/* Hero Section - Fully Responsive */}
      <section className="relative overflow-hidden bg-brown-900 flex items-center min-h-[400px] md:min-h-[500px] py-12 md:py-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5 mix-blend-overlay" />
        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[var(--color-gold-500)] rounded-full blur-3xl opacity-10 animate-float" />
        <div className="hidden sm:block absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--color-brown-700)] rounded-full blur-3xl opacity-10 animate-float delay-500" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/15 backdrop-blur-md text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl border border-white/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              PENDIDIKAN BERKARAKTER & BERKUALITAS
            </span>
          </div>

          {/* Hero Title - Responsive */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0 font-display">
            Membangun Generasi
            <br />
            <span className="text-white">
              Qur'ani & Berwawasan Luas
            </span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[var(--color-cream-100)] max-w-4xl mx-auto mb-3 sm:mb-4 leading-relaxed font-bold px-4 sm:px-0">
            Memadukan kurikulum pesantren salaf dengan pendidikan modern untuk mencetak santri yang berilmu dan berakhlak.
          </p>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Program pendidikan 24 jam yang dirancang untuk memaksimalkan potensi santri dalam bidang agama dan umum.
          </p>

          <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-5 justify-center mb-6 sm:mb-10 px-4 sm:px-0">
            {heroStats.map((stat, idx) => (
              <StatsCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Hasil Nyata - Real Data */}
      <section className="py-12 md:py-16 relative">
        <Container>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-clay-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brown-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-bold uppercase tracking-widest mb-4">
                  <Star className="w-3.5 h-3.5" />
                  <span>Output Santri</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-ink-900 mb-6 font-display">
                  Hasil Nyata <br />
                  <span className="text-brown-600">Pendidikan Kami</span>
                </h2>
                <p className="text-lg text-ink-600 leading-relaxed mb-8">
                  Kami tidak sekadar berjanji, tapi bukti. Alhamdulillah, dengan izin Allah, santri kami telah menunjukkan prestasi nyata dalam akademik dan akhlak.
                </p>
                <div className="flex gap-4">
                  <Link href="/ppdb" className="btn-primary">
                    Daftar Sekarang
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { text: "Bahasa Arab sebagai Bahasa Pengantar Harian", icon: MessagesSquare },
                  { text: "Hafalan Al-Qur'an Lancar & Berstandar Sanad", icon: BadgeCheck },
                  { text: "Juara Musabaqah Hifdzil Qur'an (MHQ) & Pidato", icon: Trophy },
                  { text: "Alumni Diterima di Timur Tengah, LIPIA & PTN", icon: GraduationCap },
                ].map((item, idx) => (
                  <div key={idx} className="bg-surface-50 p-4 rounded-xl flex items-center gap-4 border border-surface-100 hover:border-gold-300 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gold-600 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-ink-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Kegiatan Utama Section - Responsive */}
      {/* Kegiatan Utama Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-cream-50)] via-[var(--color-cream-100)] to-[var(--color-brown-50)] dark:from-[var(--color-cream-50)] dark:to-[var(--color-cream-100)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <Container>
          <ScrollAnimation direction="up" className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PROGRAM PENDIDIKAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] dark:text-[var(--color-brown-900)] font-display">
              Kurikulum{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Terpadu & Komprehensif
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-[var(--color-text-700)] dark:text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Kami menyelenggarakan pendidikan yang seimbang antara ilmu din (agama) dan ilmu dunia.
            </p>
          </ScrollAnimation>

          <div className="space-y-8 sm:space-y-12">
            {kegiatanUtama.map((item, idx) => (
              <FeatureCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </Container>
      </section>

      {/* Jadwal Harian Section - Responsive */}
      <section className="bg-[var(--color-brown-900)] dark:bg-[var(--color-cream-100)] py-10 xs:py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md text-[var(--color-gold-400)] dark:text-[var(--color-brown-900)] px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl border border-white/20 dark:border-[var(--color-brown-200)] mb-3 sm:mb-4">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              KEDISIPLINAN ADALAH KUNCI
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white dark:text-[var(--color-brown-900)] mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 font-display">
              Rutinitas Harian <span className="text-[var(--color-gold-400)]">Santri</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-[var(--color-cream-200)] dark:text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Membangun kebiasaan positif melalui jadwal yang teratur, mulai dari
              bangun tidur hingga istirahat malam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-12">
            {jadwalHarian.map((schedule, idx) => (
              <ScheduleCard key={idx} schedule={schedule} index={idx} />
            ))}
          </div>

          {/* Success Rate - Responsive */}
          <div className="bg-gradient-to-r from-[var(--color-teal-700)] to-[var(--color-teal-900)] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 lg:p-10 text-center text-white shadow-2xl border border-[var(--color-teal-600)]">
            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-gold-300)]" />
              <h3 className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black font-display">
                92% Orang Tua Melaporkan:
              </h3>
            </div>
            <p className="text-base xs:text-lg sm:text-xl lg:text-xl font-bold mb-1.5 sm:mb-2 leading-tight px-4 sm:px-0 text-[var(--color-cream-100)]">
              "Anak saya LEBIH DISIPLIN & MANDIRI dalam 6 bulan pertama mondok"
            </p>
            <p className="text-xs xs:text-sm sm:text-sm text-white/80 px-4 sm:px-0">
              Berdasarkan survei kepuasan 2024 dari 500+ responden
            </p>
          </div>
        </div>
      </section>

      {/* Kegiatan Mingguan Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-cream-50)] via-[var(--color-cream-100)] to-[var(--color-brown-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              KEGIATAN PENUNJANG
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              Program{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Pengembangan Diri
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Program rutin mingguan dan bulanan untuk memperkaya pengalaman spiritual dan sosial santri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {kegiatanMingguan.map((activity, idx) => (
              <WeeklyActivityCard key={idx} activity={activity} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Section - Responsive */}
      <section className="bg-gradient-to-br from-[var(--color-cream-100)] via-[var(--color-brown-50)] to-[var(--color-cream-50)] py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-600)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              EKSTRAKURIKULER
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0 text-[var(--color-brown-900)] font-display">
              Mengasah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)]">
                Minat & Bakat
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-[var(--color-text-700)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Kami mendukung santri untuk mengembangkan potensi mereka di bidang olahraga, seni, dan keterampilan lainnya.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 mb-8 sm:mb-12">
            {ekstrakurikuler.map((ekskul, idx) => (
              <EkskulCard key={idx} ekskul={ekskul} index={idx} />
            ))}
          </div>

          {/* Achievement Showcase - Responsive */}
          <div className="bg-gradient-to-br from-[var(--color-gold-50)] via-[var(--color-cream-50)] to-[var(--color-gold-100)] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 lg:p-10 border border-[var(--color-gold-200)] shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-black text-[var(--color-brown-900)] mb-1.5 sm:mb-2 font-display">
                Pencapaian Santri
              </h3>
              <p className="text-xs xs:text-sm sm:text-base lg:text-base text-[var(--color-text-600)] font-semibold px-4 sm:px-0">
                Hasil dari dedikasi dan bimbingan yang konsisten
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 xs:gap-6 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <Trophy className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-[var(--color-gold-600)] mx-auto mb-2.5 sm:mb-3" />
                <p className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-black text-[var(--color-brown-900)] mb-1.5 sm:mb-2 font-display">
                  15+
                </p>
                <p className="text-xs xs:text-sm sm:text-base lg:text-base font-bold text-[var(--color-text-800)] mb-1">
                  Juara Kompetisi 2024
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm lg:text-sm text-[var(--color-text-600)]">
                  Olimpiade & Lomba Regional
                </p>
              </div>
              <div className="text-center">
                <Award className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-[var(--color-teal-600)] mx-auto mb-2.5 sm:mb-3" />
                <p className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-black text-[var(--color-teal-800)] mb-1.5 sm:mb-2 font-display">
                  Juara 1
                </p>
                <p className="text-xs xs:text-sm sm:text-base lg:text-base font-bold text-[var(--color-text-800)] mb-1">
                  Pencak Silat Popda
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm lg:text-sm text-[var(--color-text-600)]">
                  Kabupaten Sukabumi
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-[var(--color-brown-600)] mx-auto mb-2.5 sm:mb-3" />
                <p className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-black text-[var(--color-brown-900)] mb-1.5 sm:mb-2 font-display">
                  100%
                </p>
                <p className="text-xs xs:text-sm sm:text-base lg:text-base font-bold text-[var(--color-text-800)] mb-1">
                  Lulus Ujian Tahfidz
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm lg:text-sm text-[var(--color-text-600)]">
                  Standar minimal 5 Juz
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
