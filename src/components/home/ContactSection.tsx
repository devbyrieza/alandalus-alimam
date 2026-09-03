// src/components/home/ContactSection.tsx
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BRANDING } from "@/config/branding";

const WA_URL = "https://wa.me/6285111524441";
const MAPS_URL = "https://maps.app.goo.gl/uX3Uv4q6L7w7zPzK8";

export default function ContactSection() {
  return (
    <section id="kontak" className="py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-4 py-1.5 rounded-full border border-[#ddc192]/50 inline-block">
            Pusat Informasi Resmi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Hubungi <span className="text-[#550000]">Panitia SPMB</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Konsultasikan seluruh pertanyaan Anda seputar persyaratan masuk, kurikulum, dan survei kampus langsung dengan tim admisi kami.
          </p>
        </div>

        {/* 3 Contact Cards (OMI Standard) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: WhatsApp */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                Layanan Cepat
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                WhatsApp CS Admisi
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Senin – Sabtu (08.00 – 16.00 WIB)
              </p>
              <p className="text-base font-black text-slate-900 font-mono">
                +62 851-1152-4441
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all inline-flex items-center justify-center gap-2 w-full"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp Langsung</span>
              </a>
            </div>
          </div>

          {/* Card 2: Lokasi Kampus */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#550000]/10 text-[#550000] border border-[#550000]/20 flex items-center justify-center font-bold mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                Kampus Sukabumi
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                Alamat Pesantren
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Kp. Babakan RT 03/05, Desa Lembursawah, Kec. Cicantayan, Kab. Sukabumi, Jawa Barat
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl border border-slate-200 hover:border-[#550000] text-slate-800 hover:text-[#550000] font-extrabold text-xs transition-all inline-flex items-center justify-center gap-2 w-full"
              >
                <span>Buka Petunjuk Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Email & Konsultasi */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#ddc192]/20 text-[#550000] border border-[#ddc192]/40 flex items-center justify-center font-bold mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                Korespondensi
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                Email Sekretariat
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Pertanyaan resmi & kerjasama kelembagaan
              </p>
              <p className="text-sm font-black text-slate-900 font-mono break-all">
                alandalusalimam@gmail.com
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/kontak"
                className="h-10 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-200 transition-all inline-flex items-center justify-center gap-2 w-full"
              >
                <span>Buka Halaman Kontak Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
