"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  School,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-12 lg:pt-6 lg:pb-12">
      {/* Background Decorative Blobs - Subtle & Soft */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brown-50/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-surface-50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT: Text Content */}
          <div className="space-y-5 lg:space-y-4 text-center lg:text-left order-2 lg:order-1">

            {/* Accented Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brown-50 border border-brown-100/50 text-brown-700 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 mb-2 mx-auto lg:mx-0 w-fit">
              <School className="w-3.5 h-3.5" />
              <span>Terakreditasi A • Sejak 1995</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-display font-bold text-ink-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
                Pesantren <br />
                <span className="text-brown-700 relative whitespace-nowrap">
                  Al-Imam
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brown-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5 L 100 0 Q 50 5 0 0 Z" fill="currentColor" />
                  </svg>
                </span>
              </h1>
              <p className="text-base lg:text-lg text-ink-500 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 font-medium">
                Membangun generasi Qur'ani yang cerdas, berakhlak mulia, dan siap memimpin masa depan dengan landasan salafus shalih.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
              <Link
                href="/daftar"
                className="btn-primary w-full sm:w-auto text-base group"
              >
                Daftar Sekarang
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/program"
                className="btn-secondary w-full sm:w-auto text-base"
              >
                Lihat Program
              </Link>
            </div>

            {/* Footer Info / Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-5 text-sm font-bold text-ink-400 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200 pt-4 border-t border-surface-100 mt-4 lg:border-none lg:mt-0 lg:pt-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Pendaftaran Dibuka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ink-300" />
                <span>+62 858-8887-1997</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Image Composition */}
          <div className="relative order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
            {/* Main Image Container */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-clay-xl bg-white p-3 rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-4/5 lg:aspect-5/4">
                <Image
                  src="/images/hero.jpg"
                  alt="Santri Al-Imam"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              </div>
            </div>

            {/* Floating Card - Wablas Style */}
            <div className="absolute bottom-6 -left-4 lg:-left-8 z-20">
              <div className="card-wablas bg-white/95 backdrop-blur-xl p-4 flex items-center gap-3 animate-bounce-slow">
                <div className="w-12 h-12 bg-brown-50 rounded-xl flex items-center justify-center text-brown-700 shadow-inner">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-0.5">PPDB 2026/2027</p>
                  <p className="text-lg font-black text-ink-900">Gelombang 1</p>
                </div>
                <div className="ml-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                  Buka
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-200/40 rounded-full blur-3xl" />
          </div>

        </div>
      </Container>
    </section>
  );
}
