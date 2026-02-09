"use client";

import Link from "next/link";
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Download,
  ArrowRight,
  Clock
} from "lucide-react";
import { Container } from "@/components/layout/Container";

const IMPORTANT_DATES = [
  {
    date: "10 Feb 2026",
    title: "Pembukaan PPDB",
    description: "Gelombang 1 dibuka untuk semua jenjang",
    color: "gold",
  },
  {
    date: "10 Feb - 30 Mei 2026",
    title: "Tes Masuk (Fleksibel)",
    description: "Dapat dilakukan kapan saja setelah upload berkas",
    color: "brown",
  },
  {
    date: "15 Juli 2026",
    title: "Hari Pertama",
    description: "Khutbah Ta'aruf dan awal KBM",
    color: "teal",
  },
] as const;

export default function CalendarSection() {
  return (
    <section id="kalender" className="py-12 md:py-16 bg-surface-50">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

          {/* Timeline Infal */}
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-bold uppercase tracking-widest mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Pesantren</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
              Jadwal <span className="text-gradient-brown">Penting</span>
            </h2>
            <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-surface-200" />

              {IMPORTANT_DATES.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-6 group">
                  <div className={`w-12 h-12 rounded-full border-4 border-surface-50 flex items-center justify-center relative z-10 shrink-0 ${item.color === 'gold' ? 'bg-gold-500 text-white shadow-gold-200' :
                    item.color === 'brown' ? 'bg-brown-600 text-white shadow-brown-200' :
                      'bg-teal-500 text-white shadow-teal-200'
                    } shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-clay-sm border border-surface-100 flex-grow hover:shadow-clay-md transition-shadow">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mb-2 ${item.color === 'gold' ? 'bg-gold-50 text-gold-700' :
                      item.color === 'brown' ? 'bg-brown-50 text-brown-700' :
                        'bg-teal-50 text-teal-700'
                      }`}>
                      {item.date}
                    </span>
                    <h4 className="font-bold text-ink-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-ink-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar CTA Card */}
          <div className="md:w-1/2">
            <div className="card-wablas bg-white h-full p-8 md:p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="w-20 h-20 bg-brown-50 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                <Clock className="w-10 h-10 text-brown-600" />
              </div>
              <h3 className="text-2xl font-bold text-ink-900 mb-2">Jangan Lewatkan Tanggal Penting</h3>
              <p className="text-ink-500 mb-8 max-w-sm mx-auto">
                Pastikan Anda tidak ketinggalan informasi pendaftaran dan kegiatan pesantren. Unduh kalender akademik terbaru.
              </p>

              <div className="space-y-3 w-full max-w-xs">
                <Link href="/agenda" className="btn-primary w-full justify-center">
                  Lihat Kalender Lengkap
                </Link>
                <Link href="#" className="btn-secondary w-full justify-center border-surface-200">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Link>
              </div>

              {/* Decorative */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gold-50 rounded-full mix-blend-multiply opacity-50" />
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-brown-50 rounded-full mix-blend-multiply opacity-50" />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
