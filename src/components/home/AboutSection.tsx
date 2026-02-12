"use client";

import Link from "next/link";
import {
  CheckCircle,
  Target,
  Rocket
} from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24 bg-surface-50">
      <Container>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-50 text-brown-700 text-xs font-bold uppercase tracking-widest mb-4">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Profil Pesantren</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
              Pendidikan Terbaik untuk <span className="text-gradient-brown">Buah Hati Anda</span>
            </h2>

            <p className="text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
              Kami menggabungkan nilai-nilai Salafush Shalih dengan metodologi pengajaran modern untuk mencetak santri yang siap menghadapi tantangan zaman.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Card Visi */}
            <div className="relative group">
              <div className="card-wablas bg-white p-8 md:p-10 relative z-10 h-full flex flex-col hover:shadow-clay-lg transition-all duration-500 border border-surface-100">
                <div className="w-14 h-14 rounded-2xl bg-brown-50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <div className="w-9 h-9 bg-brown-700 rounded-xl flex items-center justify-center text-white">
                    <Target className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-ink-900 mb-2 tracking-tight">Visi Kami</h3>
                <p className="text-xs font-black text-brown-600 uppercase tracking-widest mb-6">Kaderisasi Ummat</p>

                <div className="flex-1">
                  <p className="text-ink-900 leading-relaxed font-bold text-xl italic border-l-4 border-brown-500 pl-4 py-3 bg-brown-50/30 rounded-r-xl">
                    "Kaderisasi Ummat Rabbani Cendekia Mandiri"
                  </p>
                </div>
              </div>
              <div className="absolute top-4 -right-2 w-full h-full bg-brown-100/20 rounded-3xl -z-0" />
            </div>

            {/* Card Misi */}
            <div className="relative group">
              <div className="card-wablas bg-white p-8 md:p-10 relative z-10 h-full flex flex-col hover:shadow-clay-lg transition-all duration-500 border border-surface-100">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <div className="w-9 h-9 bg-teal-700 rounded-xl flex items-center justify-center text-white">
                    <Rocket className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-ink-900 mb-2 tracking-tight">Misi Kami</h3>
                <p className="text-xs font-black text-teal-600 uppercase tracking-widest mb-6">Langkah Strategis</p>

                <ul className="text-ink-700 leading-relaxed space-y-4 text-base flex-1">
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span className="text-justify">Menyelenggarakan pendidikan Berbasis <strong>TICE</strong> (Tahfidz, Islamic Curriculum, dan Enterpreneurship)</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span className="text-justify">Mencetak <strong>Hamalatul Qur'an</strong> dengan bekal ilmu syar'i yang mumpuni</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span className="text-justify">Menanamkan jiwa <strong>Entrepreneurship Muslim</strong> yang berwawasan Global</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-4 -right-2 w-full h-full bg-teal-100/20 rounded-3xl -z-0" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-10 border-t border-surface-200">
            <div className="text-center">
              <p className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-2">Managed By</p>
              <p className="text-xl font-black text-brown-900">Al-Andalus</p>
            </div>
            <div className="flex justify-center">
              <Link href="/tentang" className="btn-primary px-10 py-3 text-sm shadow-clay-sm">
                Profil Lengkap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


