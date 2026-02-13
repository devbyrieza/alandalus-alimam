"use client";

import Link from "next/link";
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Download,
  ArrowRight,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const IMPORTANT_DATES = [
  {
    date: "10 Feb - 30 Mei 2026",
    title: "Pendaftaran PPDB",
    description: "Pendaftaran santri baru dibuka secara online melalui website resmi.",
    color: "brown",
  },
  {
    date: "Sesuai Jadwal",
    title: "Tes Seleksi",
    description: "Ujian lisan dan tertulis dilaksanakan setelah verifikasi berkas.",
    color: "teal",
  },
  {
    date: "15 Juli 2026",
    title: "Hari Pertama KBM",
    description: "Khutbah Ta'aruf dan awal pengenalan lingkungan.",
    color: "gold",
  },
] as const;

export default function CalendarSection() {
  return (
    <section id="kalender" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Timeline side */}
          <div className="lg:w-[55%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm">
                <Calendar className="w-3.5 h-3.5" />
                <span>Agenda Penting</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-10 tracking-tight leading-tight">
                Timeline <span className="text-brown-600">Terstruktur</span>
              </h2>

              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-surface-100" />

                {IMPORTANT_DATES.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex items-start gap-8 group"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 shrink-0 shadow-premium-sm transition-transform duration-500 group-hover:scale-110 ${item.color === 'brown' ? 'bg-brown-700 text-white' :
                      item.color === 'teal' ? 'bg-teal-600 text-white' :
                        'bg-gold-500 text-white'
                      }`}>
                      <span className="font-display font-black text-lg">{idx + 1}</span>
                    </div>
                    <div className="bg-surface-50 p-6 md:p-8 rounded-[2rem] border border-surface-100 flex-grow hover:bg-white hover:shadow-premium-lg hover:border-brown-100 transition-all duration-500">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider ${item.color === 'brown' ? 'bg-brown-50 text-brown-700 border border-brown-100' :
                          item.color === 'teal' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                            'bg-gold-50 text-gold-700 border border-gold-100'
                          }`}>
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-ink-950 text-xl mb-2 tracking-tight group-hover:text-brown-700 transition-colors">{item.title}</h4>
                      <p className="text-sm text-ink-500 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Card action side */}
          <div className="lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-10 md:p-14 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-premium-xl border border-surface-100 h-full"
            >
              <div className="w-24 h-24 bg-brown-50 rounded-full flex items-center justify-center mb-8 shadow-premium-sm">
                <Clock className="w-12 h-12 text-brown-600" />
              </div>
              <h3 className="text-3xl font-display font-black text-ink-950 mb-6 tracking-tight">Manajemen Waktu yang Barokah</h3>
              <p className="text-ink-600 font-medium mb-10 leading-relaxed max-w-sm">
                Disiplin adalah kunci sukses. Ketahui seluruh jadwal akademik dan kegiatan santri dengan teliti.
              </p>

              <div className="space-y-4 w-full max-w-xs">
                <Link href="/kalender">
                  <button className="w-full py-5 rounded-2xl bg-brown-700 text-white font-bold shadow-premium-lg hover:bg-brown-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    Cek Kalender Akademik
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="#">
                  <button className="w-full py-5 rounded-2xl bg-white border-2 border-surface-200 text-ink-950 font-bold hover:border-brown-700 hover:text-brown-700 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    Unduh Jadwal (PDF)
                  </button>
                </Link>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gold-50 rounded-full blur-[80px] -z-10" />
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-brown-50 rounded-full blur-[80px] -z-10" />
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
