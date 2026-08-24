"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, Users, Building, ShieldCheck, ArrowRight, Wallet, MonitorSmartphone, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PortalSuperApp() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const portalApps = [
    {
      id: "ppdb",
      title: "PPDB",
      desc: "Pendaftaran Peserta Didik Baru",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-600",
      bgHover: "hover:shadow-blue-500/40",
      link: "/ppdb",
    },
    {
      id: "sikap",
      title: "SIKAP",
      desc: "Sistem Informasi Akademik Santri",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      bgHover: "hover:shadow-emerald-500/40",
      link: "https://sikap.pesantren-alimam.com",
    },
    {
      id: "simpeg",
      title: "SIMPEG",
      desc: "Sistem Manajemen Pegawai",
      icon: Users,
      color: "from-violet-500 to-purple-600",
      bgHover: "hover:shadow-violet-500/40",
      link: "https://simpeg.pesantren-alimam.com",
    },
    {
      id: "sapa",
      title: "SAPA",
      desc: "Sistem Administrasi Pengunjung & Akses",
      icon: ShieldCheck,
      color: "from-rose-500 to-pink-600",
      bgHover: "hover:shadow-rose-500/40",
      link: "https://sapa.pesantren-alimam.com",
    },
    {
      id: "safina",
      title: "SAFINA",
      desc: "Sistem Administrasi Finansial",
      icon: Wallet,
      color: "from-amber-500 to-orange-600",
      bgHover: "hover:shadow-amber-500/40",
      link: "https://safina.pesantren-alimam.com",
    },
    {
      id: "website",
      title: "WEBSITE",
      desc: "Profil & Informasi Resmi Pesantren",
      icon: LayoutGrid,
      color: "from-slate-600 to-slate-800",
      bgHover: "hover:shadow-slate-500/40",
      link: "/",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans">
      {/* Background Decor - Platinum Standard */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-200/50 blur-[120px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/40 blur-[100px] z-0 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 w-full py-8 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-primary-900/10 p-2 flex items-center justify-center border border-white">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Portal Al-Imam</h1>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4" /> Integrated Super App
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-primary-600 mb-6 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Satu Pintu Akses (SSO)
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">
            Selamat Datang di <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Ekosistem Digital Al-Imam
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Silakan pilih layanan yang ingin Anda akses hari ini. Seluruh aplikasi telah terintegrasi dalam satu sistem cerdas.
          </p>
        </div>

        {/* The Kiosk Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {portalApps.map((app) => (
            <Link href={app.link} key={app.id}>
              <div 
                className={`group relative bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-xl transition-all duration-500 cursor-pointer overflow-hidden
                  ${app.bgHover} hover:-translate-y-2 hover:bg-white
                `}
                onMouseEnter={() => setHoveredCard(app.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white bg-gradient-to-br ${app.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <app.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2">{app.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{app.desc}</p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                  Buka Aplikasi <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center border-t border-slate-200 mt-auto bg-white/50 backdrop-blur-md">
        <p className="text-slate-400 font-bold text-sm">
          &copy; 2026 Al-Andalus Al-Imam Islamic Boarding School.
        </p>
      </footer>
    </div>
  );
}
