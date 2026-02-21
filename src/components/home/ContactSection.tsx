"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  Send
} from "lucide-react";
import { motion } from "framer-motion";

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
    content: "pesantrenalimamsukabumi@gmail.com",
    detail: "Kirim pertanyaan kapan saja",
    color: "gold",
  },
] as const;

export default function ContactSection() {
  return (
    <section id="kontak" className="py-24 md:py-32 bg-white border-t border-surface-100 relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-50 rounded-[3rem] p-10 md:p-16 border border-surface-200 relative overflow-hidden"
        >
          {/* Background Map Decoration (Abstract) */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">

            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pusat Bantuan</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-8 tracking-tight leading-none">
                Ada Pertanyaan? <br />
                <span className="text-brown-600">Kami Siap Membantu</span>
              </h2>
              <p className="text-lg text-ink-600 font-medium mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed text-center lg:text-left">
                Jangan ragu untuk menghubungi kami. Tim administrasi kami siap melayani pertanyaan seputar pendaftaran, kurikulum, dan informasi pesantren.
              </p>

              <Link href="/kontak">
                <button className="px-10 py-5 rounded-pill bg-brown-700 text-white font-bold shadow-premium-lg hover:shadow-premium-xl hover:bg-brown-800 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                  Hubungi Kami Sekarang
                  <Send className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Cards Grid */}
            <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6 w-full">
              {CONTACT_INFO.map((item, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-3xl shadow-premium-md hover:shadow-premium-lg transition-all duration-500 group border border-surface-100 ${idx === 0 ? 'sm:col-span-2' : ''}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-premium-sm group-hover:scale-110 duration-500 ${item.color === 'brown' ? 'bg-brown-50 text-brown-600' :
                    item.color === 'teal' ? 'bg-teal-50 text-teal-600' :
                      'bg-gold-50 text-gold-600'
                    }`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-ink-950 font-bold text-xl mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-ink-700 font-bold text-sm break-all leading-snug">{item.content}</p>
                  <p className="text-ink-400 text-xs mt-2 font-bold uppercase tracking-wider">{item.detail}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}