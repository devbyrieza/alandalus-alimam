// src/components/home/ProcessSection.tsx
"use client";

import Link from "next/link";
import {
  UserPlus,
  FileText,
  CreditCard,
  ClipboardCheck,
  GraduationCap,
  BellRing,
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Buat Akun Pendaftar",
    description: "Daftarkan data awal calon santri dan buat akun akses dashboard SPMB secara online."
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Pembayaran Registrasi",
    description: "Bayar biaya registrasi melalui virtual account otomatis atau transfer bank terverifikasi."
  },
  {
    step: "03",
    icon: FileText,
    title: "Lengkapi Berkas Digital",
    description: "Isi data biodata lengkap serta unggah Kartu Keluarga, Akta Kelahiran, dan dokumen lainnya."
  },
  {
    step: "04",
    icon: ClipboardCheck,
    title: "Ujian & Wawancara",
    description: "Ikuti tes lisan tahfidz Al-Qur'an, tes kemampuan dasar, dan wawancara calon wali santri."
  },
  {
    step: "05",
    icon: BellRing,
    title: "Pengumuman Kelulusan",
    description: "Cek hasil keputusan panitia seleksi secara langsung melalui dashboard dan notifikasi WhatsApp."
  },
  {
    step: "06",
    icon: GraduationCap,
    title: "Daftar Ulang Santri",
    description: "Penyelesaian administrasi daftar ulang dan persiapan berkas masuk asrama pondok."
  },
];

export default function ProcessSection() {
  return (
    <section id="proses" className="py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#550000] bg-[#ddc192]/20 px-4 py-1.5 rounded-full border border-[#ddc192]/50 inline-block">
            Mekanisme & Prosedur Pendaftaran
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tahapan Alur <span className="text-[#550000]">Penerimaan Santri</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Sistem penerimaan yang transparan, mudah, dan terstruktur dari awal registrasi hingga penetapan kelulusan.
          </p>
        </div>

        {/* 6 Step Cards Grid (OMI Mekanisme Standard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#ddc192] transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#ddc192]/20 border border-[#ddc192]/40 text-[#550000] flex items-center justify-center font-bold">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 tracking-tight">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#550000]" />
                <span>Tahap {idx + 1} dari 6</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <a
            href="https://spmb.pesantren-alimam.com/daftar"
            className="h-12 px-8 rounded-xl bg-[#550000] hover:bg-[#400000] text-white font-extrabold text-sm shadow-md shadow-[#550000]/25 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span>Mulai Pendaftaran SPMB Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </Container>
    </section>
  );
}
