"use client";

import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  ArrowRight,
  School
} from "lucide-react";
import { Container } from "@/components/layout/Container";

const BENEFITS = [
  "Kurikulum terpadu Rabbani, Cendekia, dan Mandiri",
  "Terakreditasi A (BAN SM) Standar Nasional",
  "Kerjasama Universitas Islam di 3 Benua",
  "Pengajar Alumni Timur Tengah & LIPIA",
  "Fasilitas Asrama & Kelas Modern",
  "Biaya Terjangkau dengan Beasiswa",
] as const;

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 bg-surface-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left - Vision Card (Wablas Style) */}
          <div className="order-2 lg:order-1 relative">
            <div className="card-wablas bg-white p-8 md:p-10 relative z-10 rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-brown-50 flex items-center justify-center mb-6 shadow-sm">
                <div className="w-10 h-10 bg-brown-700 rounded-xl flex items-center justify-center text-white">
                  <School className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-ink-900 mb-4 tracking-tight">
                Visi & Misi Kami
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-black text-brown-600 uppercase tracking-widest mb-1">Visi Kami</h4>
                  <p className="text-ink-900 leading-relaxed font-bold text-lg">
                    Kaderisasi Ummat Rabbani Cendekia Mandiri
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-brown-600 uppercase tracking-widest mb-1">Misi Kami</h4>
                  <ul className="text-ink-500 leading-relaxed space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-brown-500 font-bold">•</span>
                      <span>Menyelenggarakan pendidikan Berbasis TICE (Tahfidz, Islamic Curriculum, dan Enterpreneurship)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brown-500 font-bold">•</span>
                      <span>Mencetak Hamalatul Qur'an dengan bekal ilmu syar'i yang mumpuni</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brown-500 font-bold">•</span>
                      <span>Menanamkan jiwa Entrepreneurship Muslim yang berwawasan Global</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-surface-100">
                <div className="flex-1">
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-1">Managed By</p>
                  <p className="text-base font-bold text-brown-900">Yayasan Al-Imam Al-Islami</p>
                </div>
                <Link href="/tentang" className="btn-secondary px-6 py-2 text-sm border-surface-200">
                  Profil
                </Link>
              </div>
            </div>

            {/* Decorative BG */}
            <div className="absolute top-4 -right-4 w-full h-full bg-brown-100/50 rounded-3xl -z-0" />
          </div>

          {/* Right - Benefits List */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest mb-4">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Kenapa Memilih Kami?</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
              Pendidikan Terbaik untuk <span className="text-gradient-brown">Buah Hati Anda</span>
            </h2>

            <p className="text-lg text-ink-500 mb-10 leading-relaxed text-justify">
              Kami menggabungkan nilai-nilai Salafush Shalih dengan metodologi pengajaran modern untuk mencetak santri yang siap menghadapi tantangan zaman.
            </p>

            <div className="space-y-4 mb-10">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-base text-ink-700 font-medium group-hover:text-ink-900 transition-colors">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tentang" className="btn-primary">
                Pelajari Lebih Lanjut
              </Link>
              <Link href="/program" className="btn-secondary">
                Lihat Kurikulum
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
