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
              <div className="card-wablas bg-white p-8 md:p-10 relative z-10 h-full flex flex-col hover:shadow-clay-lg transition-all duration-500 border border-surface-100 overflow-hidden">
                {/* Decorative Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brown-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:bg-brown-100 transition-colors duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-brown-50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <div className="w-9 h-9 bg-brown-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-brown-200">
                    <Target className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-ink-900 mb-2 tracking-tight">Visi Kami</h3>
                <p className="text-[10px] font-extrabold text-brown-600 uppercase tracking-widest mb-6 bg-brown-50 w-fit px-2 py-0.5 rounded-md">Kaderisasi Ummat</p>

                <div className="flex-1">
                  <div className="relative">
                    <p className="text-ink-900 leading-relaxed font-black text-2xl md:text-3xl italic border-l-4 border-brown-500 pl-6 py-4 bg-gradient-to-r from-brown-50/50 to-transparent rounded-r-2xl">
                      "Kaderisasi Ummat Rabbani Cendekia Mandiri"
                    </p>
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-brown-200 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute top-4 -right-2 w-full h-full bg-brown-100/10 rounded-3xl -z-0 group-hover:bg-brown-100/20 transition-colors duration-500" />
            </div>

            {/* Card Misi */}
            <div className="relative group">
              <div className="card-wablas bg-white p-8 md:p-10 relative z-10 h-full flex flex-col hover:shadow-clay-lg transition-all duration-500 border border-surface-100 overflow-hidden">
                {/* Decorative Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:bg-teal-100 transition-colors duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <div className="w-9 h-9 bg-teal-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-200">
                    <Rocket className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-ink-900 mb-2 tracking-tight">Misi Kami</h3>
                <p className="text-[10px] font-extrabold text-teal-600 uppercase tracking-widest mb-6 bg-teal-50 w-fit px-2 py-0.5 rounded-md">Langkah Strategis</p>

                <ul className="text-ink-700 leading-loose space-y-5 text-base flex-1">
                  <li className="flex gap-4 items-start">
                    <div className="mt-2 w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-teal-100 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-teal-600" />
                    </div>
                    <span className="text-justify font-medium leading-relaxed">Menyelenggarakan pendidikan Berbasis <span className="text-teal-700 font-bold">TICE</span> (Tahfidz, Islamic Curriculum, dan Enterpreneurship)</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-2 w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-teal-100 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-teal-600" />
                    </div>
                    <span className="text-justify font-medium leading-relaxed">Mencetak <span className="text-teal-700 font-bold">Hamalatul Qur'an</span> dengan bekal ilmu syar'i yang mumpuni</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-2 w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-teal-100 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-teal-600" />
                    </div>
                    <span className="text-justify font-medium leading-relaxed">Menanamkan jiwa <span className="text-teal-700 font-bold">Entrepreneurship Muslim</span> yang berwawasan Global</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-4 -right-2 w-full h-full bg-teal-100/10 rounded-3xl -z-0 group-hover:bg-teal-100/20 transition-colors duration-500" />
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


