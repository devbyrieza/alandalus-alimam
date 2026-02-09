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
  Star
} from "lucide-react";
import { Container } from "@/components/layout/Container";

const GALLERY_ITEMS = [
  {
    image: "/images/santri-pembelajaran-kitab.png",
    title: "Kajian Kitab Kuning",
    description: "Mengkaji Kitab Turats & Ulama Salaf",
    icon: BookOpen,
  },
  {
    image: "/images/tahfidz.JPG",
    title: "Halaqoh Tahfidz",
    description: "Setoran Hafalan & Muroja'ah",
    icon: BookMarked,
  },
  {
    image: "/images/ekstra-atau-ekskul.jpg",
    title: "Ekstrakurikuler",
    description: "Bela Diri, Panahan & Lifeskill",
    icon: Target,
  },
  {
    image: "/images/masjid.png",
    title: "Masjid Jami'",
    description: "Pusat Ibadah & Tarbiyah Santri",
    icon: School,
  },
] as const;

function GalleryCard({
  image,
  title,
  description,
  icon: Icon,
}: (typeof GALLERY_ITEMS)[number]) {
  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-clay-md hover:shadow-clay-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
      </div>

      {/* Floating Icon */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <Icon className="w-5 h-5 text-white" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white font-bold text-lg mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
        <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">{description}</p>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="py-12 md:py-16 bg-surface-50 border-t border-surface-100">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest mb-4">
              <Images className="w-3.5 h-3.5" />
              <span>Dokumentasi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-ink-900 tracking-tight">
              Galeri <span className="text-gradient-brown">Aktivitas</span>
            </h2>
            <p className="text-ink-500 mt-4 text-lg">
              Intip kegiatan sehari-hari para santri dalam menuntut ilmu dan beribadah.
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/kegiatan" className="btn-secondary">
              Lihat Semua
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryCard key={idx} {...item} />
          ))}
        </div>

        {/* Daily Schedule Preview (Wablas Card) */}
        <div className="card-wablas bg-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brown-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-ink-900 mb-2">Jadwal Harian Produktif</h3>
              <p className="text-ink-500 mb-6 max-w-md text-justify">
                Setiap detik sangat berharga. Kami mengatur jadwal santri agar seimbang antara ibadah, belajar, istirahat, dan bersosialisasi.
              </p>
              <Link href="/agenda" className="btn-primary inline-flex">
                Lihat Jadwal Lengkap <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-50 p-4 rounded-2xl border border-surface-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase">Pagi</p>
                  <p className="font-bold text-ink-900 text-sm">Tahfidz & Muroja'ah</p>
                </div>
              </div>
              <div className="bg-surface-50 p-4 rounded-2xl border border-surface-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brown-100 flex items-center justify-center text-brown-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase">Siang</p>
                  <p className="font-bold text-ink-900 text-sm">Sekolah Formal</p>
                </div>
              </div>
              <div className="bg-surface-50 p-4 rounded-2xl border border-surface-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase">Sore</p>
                  <p className="font-bold text-ink-900 text-sm">Ekskul & Olahraga</p>
                </div>
              </div>
              <div className="bg-surface-50 p-4 rounded-2xl border border-surface-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase">Malam</p>
                  <p className="font-bold text-ink-900 text-sm">Belajar Mandiri</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
