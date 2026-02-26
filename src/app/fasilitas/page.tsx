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
  ArrowRight,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

// ========================================
// REUSABLE COMPONENTS
// ========================================

const HeroStat = ({ icon: Icon, value, label, delay = 0 }: { icon: any, value: string, label: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-5 rounded-[2rem] border border-surface-100 shadow-premium-sm hover:shadow-premium-md transition-all flex flex-col items-center text-center min-w-[140px]"
  >
    <div className="w-12 h-12 rounded-2xl bg-brown-50 flex items-center justify-center text-brown-600 mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-2xl font-black text-ink-950 leading-none mb-1">{value}</p>
    <p className="text-[10px] text-ink-400 font-extrabold uppercase tracking-widest">{label}</p>
  </motion.div>
);

export default function FasilitasPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section - Airy & Clean */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-premium-sm"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Sarana & Prasarana</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-7xl lg:text-8xl font-display font-black mb-10 tracking-tight leading-[0.9] text-ink-950"
              >
                Fasilitas <br />
                <span className="text-brown-600">Terbaik Kita</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-ink-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium mb-12"
              >
                Kami menyediakan lingkungan belajar yang kondusif, nyaman, dan modern untuk mendukung tumbuh kembang santri secara optimal.
              </motion.p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <HeroStat icon={Home} value="15+" label="Kamar Asrama" delay={0.3} />
                <HeroStat icon={School} value="12+" label="Ruang Kelas" delay={0.4} />
                <HeroStat icon={BookOpen} value="1K+" label="Koleksi Buku" delay={0.5} />
              </div>
            </div>

            {/* Decorative Gallery Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:grid grid-cols-2 gap-6 h-[600px]"
            >
              <div className="space-y-6 pt-12">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium-xl relative group">
                  <Image src="/images/masjid.webp" alt="Masjid" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <span className="text-white font-bold text-xl">Masjid Jami'</span>
                  </div>
                </div>
                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-premium-lg relative group">
                  <Image src="/images/lapangan-minisoccer.webp" alt="Lapangan" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <span className="text-white font-bold text-lg">Area Olahraga</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-premium-lg relative group">
                  <Image src="/images/asrama.webp" alt="Asrama" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <span className="text-white font-bold text-lg">Asrama Nyaman</span>
                  </div>
                </div>
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium-xl relative group">
                  <Image src="/images/kelas-dari-dalam.webp" alt="Kelas" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <span className="text-white font-bold text-xl">Kelas Modern</span>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-[2rem] shadow-premium-2xl border border-surface-100 flex flex-col items-center gap-1 z-20">
                <Camera className="w-8 h-8 text-gold-500 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-400">Sneak Peek</span>
                <span className="text-sm font-black text-ink-950">Campus Tour</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. Main Facilities - Big Sections */}
      <section className="py-24 md:py-32 relative bg-surface-50/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-600 font-black tracking-[0.2em] uppercase text-xs mb-4 block"
            >
              Fasilitas Utama
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl font-display font-black text-ink-950 mb-8"
            >
              Pusat Kegiatan Santri
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-ink-600 font-medium leading-relaxed"
            >
              Sarana vital yang menjadi jantung aktivitas harian di <br className="hidden md:block" /> Pesantren Al-Imam untuk kenyamanan dan kekhusyukan.
            </motion.p>
          </div>

          <div className="space-y-32">
            {/* Masjid */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="bg-white p-6 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-premium-lg border border-surface-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <Home className="w-48 h-48" />
                  </div>

                  <div className="w-20 h-20 bg-brown-50 rounded-3xl flex items-center justify-center text-brown-600 mb-10 shadow-premium-sm transition-transform group-hover:scale-110">
                    <Home className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black text-ink-950 mb-6 leading-none">Masjid Jami' <br /> Al-Imam</h3>
                  <p className="text-base sm:text-xl text-ink-600 mb-10 leading-relaxed font-medium">
                    Pusat peribadatan santri yang mampu menampung 1000 jamaah. Dilengkapi pendingin ruangan, karpet premium, dan sistem audio berkualitas tinggi.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Kapasitas Luas</h4>
                        <p className="text-sm text-ink-500 font-medium">2 Lantai utama luas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Kenyamanan</h4>
                        <p className="text-sm text-ink-500 font-medium">Full AC & Karpet Empuk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="aspect-square rounded-[4rem] bg-white p-4 shadow-premium-2xl relative rotate-2 hover:rotate-0 transition-transform duration-700 border border-surface-100">
                  <div className="relative w-full h-full rounded-[3.2rem] overflow-hidden">
                    <Image
                      src="/images/masjid.webp"
                      alt="Masjid Jami' Al-Imam"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Asrama */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1"
              >
                <div className="aspect-square rounded-[4rem] bg-white p-4 shadow-premium-2xl relative -rotate-2 hover:rotate-0 transition-transform duration-700 border border-surface-100">
                  <div className="relative w-full h-full rounded-[3.2rem] overflow-hidden">
                    <Image
                      src="/images/asrama.webp"
                      alt="Asrama Santri"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2"
              >
                <div className="bg-white p-6 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-premium-lg border border-surface-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <Building className="w-48 h-48" />
                  </div>

                  <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 mb-10 shadow-premium-sm transition-transform group-hover:scale-110">
                    <Building className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black text-ink-950 mb-6 leading-none">Asrama <br /> Berkualitas</h3>
                  <p className="text-base sm:text-xl text-ink-600 mb-10 leading-relaxed font-medium">
                    Hunian nyaman dengan sirkulasi udara optimal. Setiap kamar didesain dengan konsep kekeluargaan dan dilengkapi fasilitas penyimpanan pribadi.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Kekeluargaan</h4>
                        <p className="text-sm text-ink-500 font-medium">Musyrif Pembimbing 24 jam</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Higienitas</h4>
                        <p className="text-sm text-ink-500 font-medium">Standar kebersihan tinggi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Ruang Kelas */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="bg-white p-6 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-premium-lg border border-surface-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <School className="w-48 h-48" />
                  </div>

                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-10 shadow-premium-sm transition-transform group-hover:scale-110">
                    <School className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black text-ink-950 mb-6 leading-none">Ruang Kelas <br /> Modern</h3>
                  <p className="text-base sm:text-xl text-ink-600 mb-10 leading-relaxed font-medium">
                    Ruang kelas yang didesain ergonomis dan modern untuk konsentrasi belajar maksimal. Setiap kelas dilengkapi alat peraga edukatif dan sirkulasi udara yang baik.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Ergonomis</h4>
                        <p className="text-sm text-ink-500 font-medium">Meja Kursi Nyaman</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Interaktif</h4>
                        <p className="text-sm text-ink-500 font-medium">Fasilitas Multimedia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="aspect-square rounded-[4rem] bg-white p-4 shadow-premium-2xl relative rotate-2 hover:rotate-0 transition-transform duration-700 border border-surface-100">
                  <div className="relative w-full h-full rounded-[3.2rem] overflow-hidden">
                    <Image
                      src="/images/kelas-dari-dalam.webp"
                      alt="Ruang Kelas Modern"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Lapangan Minisoccer */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1"
              >
                <div className="aspect-square rounded-[4rem] bg-white p-4 shadow-premium-2xl relative -rotate-2 hover:rotate-0 transition-transform duration-700 border border-surface-100">
                  <div className="relative w-full h-full rounded-[3.2rem] overflow-hidden">
                    <Image
                      src="/images/lapangan-minisoccer.webp"
                      alt="Lapangan Minisoccer"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2"
              >
                <div className="bg-white p-6 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-premium-lg border border-surface-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <Trophy className="w-48 h-48" />
                  </div>

                  <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 mb-10 shadow-premium-sm transition-transform group-hover:scale-110">
                    <Trophy className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black text-ink-950 mb-6 leading-none">Lapangan <br /> Minisoccer</h3>
                  <p className="text-base sm:text-xl text-ink-600 mb-10 leading-relaxed font-medium">
                    Sarana olahraga outdoor berkualitas untuk mendukung kesehatan fisik dan bakat atletik santri. Lapangan rumput sintetis standar yang aman dan nyaman.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Kualitas</h4>
                        <p className="text-sm text-ink-500 font-medium">Rumput Sintetis Premium</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Sejarah</h4>
                        <p className="text-sm text-ink-500 font-medium">Area Luas & Bersih</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Kantor PPDB & Tamu */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1"
              >
                <div className="aspect-square rounded-[4rem] bg-white p-4 shadow-premium-2xl relative -rotate-2 hover:rotate-0 transition-transform duration-700 border border-surface-100">
                  <div className="relative w-full h-full rounded-[3.2rem] overflow-hidden">
                    <Image
                      src="/images/kantor-ppdb-tamu.webp"
                      alt="Kantor PPDB & Tamu"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2"
              >
                <div className="bg-white p-6 sm:p-12 lg:p-16 rounded-[3.5rem] shadow-premium-lg border border-surface-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <Building className="w-48 h-48" />
                  </div>

                  <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center text-purple-600 mb-10 shadow-premium-sm transition-transform group-hover:scale-110">
                    <Building className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black text-ink-950 mb-6 leading-none">Kantor PPDB <br /> & Tamu</h3>
                  <p className="text-base sm:text-xl text-ink-600 mb-10 leading-relaxed font-medium">
                    Pusat informasi dan pendaftaran santri baru. Dilengkapi dengan ruang tunggu yang nyaman dan staf yang siap membantu proses pendaftaran.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Informasi</h4>
                        <p className="text-sm text-ink-500 font-medium">Layanan 24 Jam</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-premium-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-ink-950 text-lg uppercase tracking-tight">Kenyamanan</h4>
                        <p className="text-sm text-ink-500 font-medium">Ruang Tunggu AC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Supporting Facilities - Enhanced Grid (TEXT-ONLY - Secondary List) */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display font-black text-ink-950 mb-4"
            >
              Fasilitas <span className="text-brown-600">Penunjang</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-ink-600 font-medium leading-relaxed"
            >
              Lengkap dengan sarana pendukung untuk mengembangkan <br className="hidden md:block" /> minat, bakat, dan kesehatan santri.
            </motion.p>
          </div>

          {/* Enhanced 3x3 Grid Layout - Smaller Typography for Text-Only Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Row 1 - Academic Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Perpustakaan</h3>
              <p className="text-sm text-ink-600 font-medium">Ribuan koleksi kitab & buku</p>
              <div className="mt-3 pt-3 border-t border-blue-100">
                <span className="text-xs text-blue-600 font-semibold">📚 Akademik</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Laboratorium</h3>
              <p className="text-sm text-ink-600 font-medium">Sains & Komputer</p>
              <div className="mt-3 pt-3 border-t border-purple-100">
                <span className="text-xs text-purple-600 font-semibold">🔬 Praktikum</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Dapur Sehat</h3>
              <p className="text-sm text-ink-600 font-medium">Menu bergizi 3x sehari</p>
              <div className="mt-3 pt-3 border-t border-green-100">
                <span className="text-xs text-green-600 font-semibold">🍽️ Nutrisi</span>
              </div>
            </motion.div>

            {/* Row 2 - Health & Safety */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Klinik Santri</h3>
              <p className="text-sm text-ink-600 font-medium">Layanan medis internal</p>
              <div className="mt-3 pt-3 border-t border-red-100">
                <span className="text-xs text-red-600 font-semibold">🏥 Kesehatan</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Security</h3>
              <p className="text-sm text-ink-600 font-medium">Keamanan CCTV 24 Jam</p>
              <div className="mt-3 pt-3 border-t border-amber-100">
                <span className="text-xs text-amber-600 font-semibold">🛡️ Keamanan</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Aula Besar</h3>
              <p className="text-sm text-ink-600 font-medium">Kapasitas 500 orang</p>
              <div className="mt-3 pt-3 border-t border-indigo-100">
                <span className="text-xs text-indigo-600 font-semibold">🏛️ Event</span>
              </div>
            </motion.div>

            {/* Row 3 - Modern Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-cyan-50 to-sky-50 p-6 rounded-2xl border border-cyan-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Internet</h3>
              <p className="text-sm text-ink-600 font-medium">Akses WiFi Terfilter</p>
              <div className="mt-3 pt-3 border-t border-cyan-100">
                <span className="text-xs text-cyan-600 font-semibold">📶 Teknologi</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Lapangan Basket</h3>
              <p className="text-sm text-ink-600 font-medium">Lapangan basket standar untuk santri</p>
              <div className="mt-3 pt-3 border-t border-emerald-100">
                <span className="text-xs text-emerald-600 font-semibold">🏀 Olahraga</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Depot Galon Gratis</h3>
              <p className="text-sm text-ink-600 font-medium">Air minum higienis gratis</p>
              <div className="mt-3 pt-3 border-t border-blue-100">
                <span className="text-xs text-blue-600 font-semibold">💧 Minuman</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                Segera Hadir
              </div>
              <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-ink-950 mb-2">Lap. Badminton & Tenis</h3>
              <p className="text-sm text-ink-600 font-medium">Satu lapangan multifungsi badminton & tenis</p>
              <div className="mt-3 pt-3 border-t border-orange-100">
                <span className="text-xs text-orange-600 font-semibold">🏸 Olahraga Indoor</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. Photo Gallery - Enhanced Layout */}
      <section id="gallery" className="py-24 md:py-32 bg-surface-50/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Dokumentasi</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-black text-ink-950 mb-6"
            >
              Galeri <span className="text-brown-600">Fasilitas</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-ink-600 font-medium leading-relaxed"
            >
              Lihat langsung suasana dan lingkungan Pesantren Al-Imam dari berbagai sudut.
            </motion.p>
          </div>

          {/* Enhanced Gallery Grid with Better Layout */}
          <div className="max-w-7xl mx-auto">
            {/* Hero Row - Large Featured Images - REARRANGED: Masjid + Ruang Kelas Raksasa */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Masjid - Large Featured */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group aspect-[4/3] shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/masjid.webp"
                  alt="Masjid Jami' Al-Imam"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                  <span className="text-white font-black text-xl md:text-3xl drop-shadow-lg">Masjid Jami' Al-Imam</span>
                  <p className="text-white/90 text-sm md:text-lg mt-1 md:mt-2">Pusat peribadatan</p>
                </div>
              </motion.div>

              {/* RUANG KELAS - SMALLER VIEW */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1 row-span-2 relative rounded-3xl overflow-hidden group aspect-[4/3] lg:aspect-[2/3] shadow-premium-xl hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/kelas-dari-dalam.webp"
                  alt="Ruang Kelas dari Dalam - View Lengkap"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                  <span className="text-white font-black text-xl md:text-2xl drop-shadow-lg leading-tight">Ruang Kelas dari Dalam</span>
                  <p className="text-white/90 text-xs md:text-sm mt-1 md:mt-2 line-clamp-2 md:line-clamp-none">Fasilitas pembelajaran modern dengan ruang yang luas and nyaman</p>
                </div>
              </motion.div>
            </div>

            {/* Second Row - Academic & Residential */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/gedung-kelas.webp"
                  alt="Gedung Kelas"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Gedung Kelas</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/luar-kelas.webp"
                  alt="Area Luar Kelas"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Area Luar Kelas</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/asrama.webp"
                  alt="Asrama Santri"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Asrama Santri</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/gedung-utama-dan-lapangan-basket.webp"
                  alt="Gedung Utama & Lapangan Basket"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Gedung Utama</span>
                  <p className="text-white/90 text-xs mt-1">Lapangan Basket</p>
                </div>
              </motion.div>
            </div>

            {/* Third Row - Open Areas & Support */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/halaman-dekat-masjid.webp"
                  alt="Halaman Pesantren"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Halaman Pesantren</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/lapangan-minisoccer.webp"
                  alt="Lapangan Mini Soccer"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Lapangan</span>
                  <p className="text-white/90 text-xs mt-1">Mini Soccer</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/kantor-ppdb-tamu.webp"
                  alt="Kantor PPDB & Tamu"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Kantor PPDB</span>
                  <p className="text-white/90 text-xs mt-1">& Tamu</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="relative rounded-3xl overflow-hidden group aspect-square shadow-premium-lg hover:shadow-premium-2xl transition-all duration-500"
              >
                <Image
                  src="/images/depot-galon-gratis.webp"
                  alt="Depot Galon Gratis"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-black text-sm drop-shadow-lg">Depot Galon</span>
                  <p className="text-white/90 text-xs mt-1">Gratis</p>
                </div>
              </motion.div>
            </div>

          </div>
        </Container>
      </section>

      {/* 5. Impactful CTA */}
      <section className="py-16 md:py-24 lg:py-32 bg-surface-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brown-800 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-8 md:p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-premium-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
                Ingin Melihat <br /> <span className="text-gold-400">Langsung?</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brown-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-medium px-2">
                Kami mengundang Anda untuk berkeliling melihat suasana dan fasilitas pondok secara langsung. Jadwalkan kunjungan Anda sekarang bersama anak-anak.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4">
                <Link href="/kontak">
                  <button className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 md:py-5 rounded-pill bg-white text-brown-900 font-black text-sm sm:text-base md:text-lg hover:bg-gold-400 hover:text-white shadow-premium-xl transition-all min-h-[48px] sm:min-h-[52px]">
                    Jadwalkan Survey
                  </button>
                </Link>
                <Link href="/fasilitas#gallery">
                  <button className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 md:py-5 rounded-pill bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base md:text-lg min-h-[48px] sm:min-h-[52px]">
                    Lihat Dokumentasi
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
