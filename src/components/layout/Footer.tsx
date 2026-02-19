"use client";

import Link from "next/link";
import {
  Youtube,
  Instagram,
  Facebook,
  School,
  MapPin,
  Phone,
  Mail,
  Twitter,
  Globe,
  ArrowUpRight
} from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-surface-200 pt-24 pb-32 md:pb-12 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-8">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-brown-700 text-white shadow-premium-md">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-ink-950 tracking-tight leading-none">Al-Imam</h3>
                <p className="text-[10px] font-bold text-ink-500 uppercase tracking-[0.2em] mt-2">Managed by Al-Andalus International Boarding School</p>
              </div>
            </Link>
            <p className="text-ink-600 font-medium leading-relaxed max-w-xs text-justify">
              Membangun generasi Qur'ani yang cerdas & berakhlak mulia sesuai pemahaman salafush shalih.
            </p>
            <div className="flex gap-4">
              {[Instagram, Youtube, Facebook, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-surface-50 border border-surface-200 flex items-center justify-center text-ink-500 hover:bg-brown-700 hover:text-white hover:border-brown-700 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-sm font-extrabold text-ink-950 uppercase tracking-widest">Lembaga</h4>
            <ul className="space-y-4">
              {['Tentang Kami', 'Program Studi', 'Fasilitas', 'Kegiatan Santri'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-ink-600 font-bold hover:text-brown-700 flex items-center gap-2 group">
                    {item}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-8">
            <h4 className="text-sm font-extrabold text-ink-950 uppercase tracking-widest">Informasi</h4>
            <ul className="space-y-4">
              {['Pendaftaran PPDB', 'Biaya Pendidikan', 'Beasiswa Tahfidz', 'Kalender Akademik'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-ink-600 font-bold hover:text-brown-700 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-sm font-extrabold text-ink-950 uppercase tracking-widest">Kontak Kami</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brown-50 flex items-center justify-center text-brown-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-ink-600 text-left">
                  Jl. Cikembar No. 12, Sukabumi,<br />Jawa Barat 43157
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-ink-950 text-left">
                  +62 851-1152-4441
                  <p className="text-[10px] text-ink-500 font-medium tracking-wide">Customer Service</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center text-ink-500 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-ink-950 text-left break-all">
                  pesantrenalimamsukabumi@gmail.com
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-ink-400 order-2 md:order-1 text-center md:text-left">
            &copy; {currentYear} Pesantren Al-Imam Al-Islami. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-ink-400 order-1 md:order-2">
            <Link href="#" className="hover:text-ink-950 transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-ink-950 transition-colors">Syarat & Ketentuan</Link>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>ID / AR</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

