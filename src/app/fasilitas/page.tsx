"use client";

import Link from "next/link";
import Image from "next/image";
import {
  School,
  Droplets,
  Home,
  BookOpen,
  Wifi,
  Utensils,
  Heart,
  Shield,
  Building,
  Building2,
  FlaskConical,
  MonitorPlay,
  Cpu,
  Award,
  CheckCircle2,
  Sparkles,
  Users,
  Droplet,
  Zap,
  Video,
  Lightbulb,
  Wind,
  Check,
  MapPin,
  Trophy,
  Star,
  TrendingUp,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Container } from "@/components/layout/Container";

// ========================================
// REUSABLE COMPONENTS
// ========================================

const HeroStat = ({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-colors">
    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-white/70 font-bold uppercase tracking-wide">{label}</p>
    </div>
  </div>
);

export default function FasilitasPage() {
  return (
    <main className="bg-surface-50 min-h-screen">
      {/* 1. Hero Section - Deep Brown */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-brown-900">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5 mix-blend-overlay" />
        {/* Glow Effects */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4">
                <Building2 className="w-4 h-4" />
                <span>Sarana & Prasarana</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-white tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                Fasilitas Modern
                <br /> Berbasis Pesantren
              </h1>

              <p className="text-lg text-brown-100 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                Kami menyediakan lingkungan belajar yang kondusif, nyaman, dan lengkap untuk mendukung tumbuh kembang santri secara optimal.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <HeroStat icon={Home} value="50+" label="Kamar Asrama" />
                <HeroStat icon={School} value="32" label="Ruang Kelas" />
                <HeroStat icon={BookOpen} value="3K+" label="Koleksi Buku" />
              </div>
            </div>

            <div className="relative lg:h-[500px] hidden lg:block">
              {/* Masjid Image */}
              <div className="absolute top-10 right-10 w-64 h-80 rounded-[2rem] border-4 border-white/20 shadow-2xl rotate-3 z-10 overflow-hidden group">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/masjid.png"
                    alt="Masjid Jami'"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-white font-black text-xl">Masjid Jami'</span>
                  </div>
                </div>
              </div>

              {/* Asrama Image */}
              <div className="absolute top-40 right-40 w-64 h-80 rounded-[2rem] border-4 border-white/20 shadow-2xl -rotate-6 z-0 overflow-hidden group">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/asrama.png"
                    alt="Asrama Santri"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-white font-black text-xl">Asrama Santri</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Facilities - Big Cards */}
      <section className="py-12 md:py-16 relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-3 block">Fasilitas Utama</span>
            <h2 className="text-4xl md:text-5xl font-black text-brown-900 mb-6">Pusat Kegiatan Santri</h2>
            <p className="text-xl text-ink-600 leading-relaxed">
              Sarana vital yang menjadi jantung aktivitas harian di Pesantren Al-Imam.
            </p>
          </div>

          <div className="space-y-16">
            {/* Masjid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="card-glass p-8 md:p-12 border-t-4 border-t-brown-600 hover:border-t-8 transition-all duration-300">
                  <div className="w-16 h-16 bg-brown-100 rounded-2xl flex items-center justify-center text-brown-700 mb-8">
                    <Home className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-brown-900 mb-4">Masjid Jami' Al-Imam</h3>
                  <p className="text-lg text-ink-600 mb-8 leading-relaxed">
                    Pusat peribadatan santri yang mampu menampung 1000 jamaah. Dilengkapi pendingin ruangan, karpet premium, dan sound system berkualitas untuk kenyamanan ibadah dan kajian.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Kapasitas Luas</h4>
                        <p className="text-sm text-ink-500">2 Lantai utama</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Full AC</h4>
                        <p className="text-sm text-ink-500">Kenyamanan maksimal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square rounded-[3rem] bg-brown-200 overflow-hidden shadow-clay-lg relative group">
                  <div className="absolute inset-0 bg-brown-900/20 group-hover:bg-brown-900/10 transition-colors z-10" />
                  <div className="absolute inset-0 bg-brown-900/20 group-hover:bg-brown-900/10 transition-colors z-10" />
                  <Image
                    src="/images/masjid.png"
                    alt="Masjid Jami' Al-Imam"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Asrama */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="aspect-square rounded-[3rem] bg-teal-50 overflow-hidden shadow-clay-lg relative group">
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-teal-900/10 transition-colors z-10" />
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-teal-900/10 transition-colors z-10" />
                  <Image
                    src="/images/asrama.png"
                    alt="Asrama Santri"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="order-2">
                <div className="card-glass p-8 md:p-12 border-t-4 border-t-teal-500 hover:border-t-8 transition-all duration-300">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 mb-8">
                    <Building className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-brown-900 mb-4">Asrama Santri</h3>
                  <p className="text-lg text-ink-600 mb-8 leading-relaxed">
                    Hunian nyaman dengan konsep kekeluargaan. Setiap kamar didesain dengan sirkulasi udara optimal dan dilengkapi lemari pribadi untuk setiap santri.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Musyrif Kamar</h4>
                        <p className="text-sm text-ink-500">Pembimbing 24 jam</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Clean & Tidy</h4>
                        <p className="text-sm text-ink-500">Standar kebersihan tinggi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kelas */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="card-glass p-8 md:p-12 border-t-4 border-t-gold-500 hover:border-t-8 transition-all duration-300">
                  <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center text-gold-600 mb-8">
                    <School className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-brown-900 mb-4">Ruang Kelas Modern</h3>
                  <p className="text-lg text-ink-600 mb-8 leading-relaxed">
                    Ruang belajar multimedia yang interaktif. Dilengkapi proyektor, AC, dan tata cahaya standar kelas internasional untuk menjaga fokus santri.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Multimedia</h4>
                        <p className="text-sm text-ink-500">Smart Teaching Aid</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Ergonomis</h4>
                        <p className="text-sm text-ink-500">Meja kursi standar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square rounded-[3rem] bg-gold-50 overflow-hidden shadow-clay-lg relative group">
                  <div className="absolute inset-0 bg-gold-900/20 group-hover:bg-gold-900/10 transition-colors z-10" />
                  <Image
                    src="/images/dalam-kelas.png"
                    alt="Ruang Kelas Modern"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Minisoccer */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="aspect-square rounded-[3rem] bg-teal-50 overflow-hidden shadow-clay-lg relative group">
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-teal-900/10 transition-colors z-10" />
                  <Image
                    src="/images/lapangan-minisoccer.png"
                    alt="Lapangan Minisoccer"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="order-2">
                <div className="card-glass p-8 md:p-12 border-t-4 border-t-teal-500 hover:border-t-8 transition-all duration-300">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 mb-8">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-brown-900 mb-4">Lapangan Olahraga</h3>
                  <p className="text-lg text-ink-600 mb-8 leading-relaxed">
                    Area olahraga multifungsi untuk menjaga kebugaran santri. Digunakan untuk Futsal, Basket, Voli, dan kegiatan ekstrakurikuler memanah.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Multifungsi</h4>
                        <p className="text-sm text-ink-500">Futsal, Basket, Voli</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Area Luas</h4>
                        <p className="text-sm text-ink-500">Outdoor Activity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Depot Air Minum */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="card-glass p-8 md:p-12 border-t-4 border-t-blue-500 hover:border-t-8 transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                    <Droplets className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-brown-900 mb-4">Kantin & Koperasi</h3>
                  <p className="text-lg text-ink-600 mb-8 leading-relaxed">
                    Menyediakan kebutuhan harian santri dan makanan sehat yang higienis. Dikelola dengan prinsip kejujuran untuk melatih kemandirian santri.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Menu Sehat</h4>
                        <p className="text-sm text-ink-500">Bergizi & Halal</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-brown-900">Lengkap</h4>
                        <p className="text-sm text-ink-500">Kebutuhan Harian</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square rounded-[3rem] bg-blue-50 overflow-hidden shadow-clay-lg relative group">
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors z-10" />
                  <Image
                    src="/images/depot-galon-gratis.png"
                    alt="Depot Air Minum Gratis"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Supporting Facilities - Grid */}
      <section className="py-12 bg-brown-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-brown-900 mb-6">Fasilitas Penunjang</h2>
            <p className="text-lg text-ink-600 leading-relaxed">
              Lengkap dengan sarana pendukung untuk mengembangkan minat dan bakat santri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Perpustakaan", desc: "Ribuan koleksi kitab & buku" },
              { icon: FlaskConical, title: "Laboratorium", desc: "Sains & Komputer Lengkap" },
              { icon: Utensils, title: "Dapur Sehat", desc: "Makanan bergizi 3x sehari" },
              { icon: Heart, title: "Klinik Santri", desc: "Layanan kesehatan 24 jam" },
              { icon: Shield, title: "Security", desc: "Keamanan CCTV 24 Jam" },
              { icon: Building2, title: "Aula Besar", desc: "Kapasitas 500 orang" },
              { icon: Wifi, title: "Internet", desc: "Akses WiFi Terfilter" },
              { icon: Trophy, title: "Lapangan", desc: "Futsal, Basket & Voli" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-brown-100 hover:shadow-clay-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-brown-50 rounded-xl flex items-center justify-center text-brown-600 mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-brown-900 mb-2">{item.title}</h3>
                <p className="text-sm text-ink-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. CTA */}
      <section className="py-12 md:py-16 bg-brown-900 relative overflow-hidden text-center">
        <Container className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ingin Melihat Langsung?</h2>
          <p className="text-brown-200 mb-10 max-w-2xl mx-auto text-lg">
            Kami mengundang Anda untuk berkeliling melihat suasana dan fasilitas pondok secara langsung. Jadwalkan kunjungan Anda sekarang.
          </p>
          <button className="bg-gold-500 text-white font-bold py-4 px-10 rounded-full hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20">
            Jadwalkan Survey Lokasi
          </button>
        </Container>
      </section>
    </main>
  );
}
