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
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://www.youtube.com/@AlImamAlIslamiCikembarSukabumi", icon: Youtube, color: "hover:text-red-500" },
    { href: "https://www.instagram.com/pesantrenalimamsukabumi/", icon: Instagram, color: "hover:text-pink-600" },
    { href: "https://www.facebook.com/ppsbalimamalislami/", icon: Facebook, color: "hover:text-blue-600" },
  ];

  return (
    <footer className="bg-white border-t border-surface-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brown-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brown-900/10">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink-900 text-lg leading-tight">Pesantren Al-Imam</h3>
                <p className="text-xs text-ink-500 font-medium leading-tight">Managed by Al-Andalus</p>
                <p className="text-[10px] text-ink-400 mt-0.5 leading-tight max-w-[200px]">
                  Bekerja Sama Dengan Universitas Islam Terkemuka di 3 Benua
                </p>
              </div>
            </div>
            <p className="text-ink-500 text-sm leading-relaxed max-w-sm text-justify">
              Membangun generasi Qur'ani yang berakhlak mulia, cerdas, dan siap memimpin masa depan dengan landasan salafus shalih.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className={`w-10 h-10 rounded-full bg-surface-50 flex items-center justify-center text-ink-600 hover:bg-white hover:shadow-clay-sm transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-bold text-ink-900">Program</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/program#mts" className="group flex items-center justify-between text-sm text-ink-600 hover:text-brown-700">
                  <span>MTs Al-Imam</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/program#il" className="group flex items-center justify-between text-sm text-ink-600 hover:text-brown-700">
                  <span>I'dad Lughowi</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="group flex items-center justify-between text-sm text-ink-600 hover:text-brown-700">
                  <span>Ekstrakurikuler</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-bold text-ink-900">Kontak Kami</h4>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brown-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-600">
                    Jl. Pelabuhan Ratu II KM 18, Desa Bojongkembar, Cikembar, Sukabumi
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-ink-400" />
                  <a href="tel:+6285888871997" className="text-sm text-ink-600 hover:text-brown-700 font-medium font-sans">
                    +62 858-8887-1997
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-ink-400 mt-0.5 shrink-0" />
                  <a href="mailto:pesantrenalimamsukabumi@gmail.com" className="text-sm text-ink-600 hover:text-brown-700 font-medium break-all">
                    pesantrenalimamsukabumi@gmail.com
                  </a>
                </div>
              </div>

              {/* Call to Action Box */}
              <div className="bg-surface-50 rounded-2xl p-5 border border-surface-100">
                <h5 className="font-bold text-ink-900 text-sm mb-2">Pendaftaran 2026 Dibuka!</h5>
                <p className="text-xs text-ink-500 mb-4 text-justify">Mulai 10 Februari 2026. Kuota terbatas.</p>
                <Link
                  href="/daftar"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-brown-200 text-brown-700 text-xs font-bold rounded-xl shadow-sm hover:shadow-md hover:border-brown-300 transition-all"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-surface-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-400 font-medium">
            &copy; {currentYear} Pesantren Al-Imam Al-Islami.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-ink-400 hover:text-ink-600 font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-ink-400 hover:text-ink-600 font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
