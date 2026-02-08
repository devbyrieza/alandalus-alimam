"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight
} from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Lokasi Pesantren",
    content: "Jl. Pelabuhan Ratu II KM 18",
    detail: "Cikembar, Sukabumi",
    color: "brown",
  },
  {
    icon: Phone,
    title: "Layanan Telepon",
    content: "+62 851-1152-4441",
    detail: "Senin-Sabtu (08.00 - 16.00)",
    color: "teal",
  },
  {
    icon: Mail,
    title: "Email Resmi",
    content: "infopesantrenalimam@gmail.com",
    detail: "Kirim pertanyaan kapan saja",
    color: "gold",
  },
] as const;

export default function ContactSection() {
  return (
    <section id="kontak" className="py-12 md:py-16 bg-white border-t border-surface-100">
      <Container>
        <div className="bg-surface-50 rounded-[3rem] p-8 md:p-12 border border-surface-100 relative overflow-hidden">
          {/* Background Map Decoration (Abstract) */}
          <div className="absolute inset-0 opacity-5 bg-[url('/images/pattern.png')] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">

            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-surface-200 text-ink-600 text-xs font-bold uppercase tracking-widest mb-4">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pusat Bantuan</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
                Ada Pertanyaan? <br />
                <span className="text-gradient-brown">Kami Siap Membantu</span>
              </h2>
              <p className="text-ink-500 mb-8 max-w-lg mx-auto lg:mx-0">
                Jangan ragu untuk menghubungi kami. Tim administrasi kami siap melayani pertanyaan seputar pendaftaran dan informasi pesantren.
              </p>

              <Link href="/kontak" className="btn-primary inline-flex">
                Hubungi Kami Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Cards Grid */}
            <div className="lg:w-1/2 grid sm:grid-cols-2 gap-4 w-full">
              {CONTACT_INFO.map((item, idx) => (
                <div key={idx} className={`bg-white p-6 rounded-3xl shadow-clay-sm hover:shadow-clay-md transition-shadow group ${idx === 0 ? 'sm:col-span-2' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${item.color === 'brown' ? 'bg-brown-50 text-brown-600 group-hover:bg-brown-100' :
                      item.color === 'teal' ? 'bg-teal-50 text-teal-600 group-hover:bg-teal-100' :
                        'bg-gold-50 text-gold-600 group-hover:bg-gold-100'
                    }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-ink-900 font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-ink-600 font-medium text-sm">{item.content}</p>
                  <p className="text-ink-400 text-xs mt-1">{item.detail}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
