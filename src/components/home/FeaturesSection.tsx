"use client";

import Link from "next/link";
import { BookOpen, Award, Users, BookOpenCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Manhaj Salaf",
    description: "Pendidikan berbasis pemahaman para Salafush Shalih, menanamkan aqidah yang lurus dan akhlak mulia.",
  },
  {
    icon: Award,
    title: "Kurikulum Terpadu",
    description: "Memadukan Kurikulum Nasional, Diniyah (Pesantren), dan Tahfidz Al-Qur'an secara seimbang.",
  },
  {
    icon: Users,
    title: "Jaringan Alumni Luas",
    description: "Akses informasi kuliah ke Timur Tengah (Al-Azhar, UIM, Yaman) dan Perguruan Tinggi Negeri.",
  },
  {
    icon: ShieldCheck,
    title: "Lingkungan Edukatif",
    description: "Kawasan pesantren yang asri, aman, dan kondusif, jauh dari hiruk-pikuk perkotaan.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section id="keunggulan" className="py-12 md:py-16 bg-surface-50 border-t border-surface-100">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* TEXT SIDE */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-bold uppercase tracking-widest mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>Keunggulan Utama</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight leading-tight">
                Kenapa Harus Pesantren <br />
                <span className="text-brown-700">Al-Imam Al-Islami?</span>
              </h2>
              <p className="text-lg text-ink-500 leading-relaxed text-justify">
                Kami tidak hanya mengajarkan ilmu, tetapi juga mendidik karakter. Lingkungan yang kondusif untuk tumbuh kembang spiritual, intelektual, dan emosional santri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-surface-200 shrink-0">
                    <feature.icon className="w-6 h-6 text-brown-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-900 text-base mb-1">{feature.title}</h4>
                    <p className="text-sm text-ink-500 leading-relaxed text-justify">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/ppdb" className="btn-primary px-8">
                Daftar Sekarang
              </Link>
            </div>
          </div>

          {/* IMAGE/CARD SIDE */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-3xl shadow-clay-md h-48 flex flex-col justify-end items-start border-l-4 border-l-brown-500">
                  <p className="text-4xl font-black text-ink-900 mb-1">29+</p>
                  <p className="text-sm font-bold text-ink-500">Tahun Pengalaman</p>
                </div>
                <div className="bg-brown-800 p-6 rounded-3xl shadow-clay-lg h-64 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay" />
                  <BookOpenCheck className="w-12 h-12 mb-4 text-white group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-lg text-white drop-shadow-md">Tahfidz<br />Intensif</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-clay-lg h-64 flex flex-col justify-center items-center text-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <p className="font-bold text-ink-900">Lingkungan<br />Islami</p>
                </div>
                <div className="bg-gold-500 p-6 rounded-3xl shadow-clay-md h-48 flex flex-col justify-end items-start">
                  <p className="text-4xl font-black mb-1 text-brown-900">A</p>
                  <p className="text-sm font-bold text-brown-800">Terakreditasi BAN-SM</p>
                </div>
              </div>
            </div>

            {/* Blur Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brown-100/30 blur-[100px] -z-0 pointer-events-none rounded-full" />
          </div>

        </div>
      </Container>
    </section>
  );
}
