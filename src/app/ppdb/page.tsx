"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Award,
  Zap,
  TrendingUp,
  Star,
  Trophy,
  Shield,
  Heart,
  Phone,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Target,
  Loader2,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Container } from "@/components/layout/Container";

function PPDBContent() {
  const searchParams = useSearchParams();
  const jenjang = searchParams.get('jenjang');
  const requirements = [
    {
      icon: CheckCircle,
      title: "Berkas Persyaratan",
      subtitle: "Dokumen wajib untuk pendaftaran",
      items: [
        {
          text: "Scan Kartu Keluarga",
          benefit: "Format: PDF/JPG",
        },
        { text: "Scan Akte Kelahiran", benefit: "Format: PDF/JPG" },
        {
          text: "Scan Rapor 2 Semester Terakhir",
          benefit: "Format: PDF/JPG",
        },
        {
          text: "Scan Nomor Induk Siswa Nasional (NISN)",
          benefit: "Format: PDF/JPG",
        },
        {
          text: "Foto Setengah Badan",
          benefit: "Latar belakang putih",
        },
      ],
    },
    {
      icon: FileText,
      title: "Dokumen Tambahan",
      subtitle: "Format disiapkan panitia - download di dashboard",
      items: [
        {
          text: "Surat Keterangan Sehat",
          benefit: "Download format dari panitia",
          isDownload: true,
        },
        {
          text: "Pakta Integritas",
          benefit: "Download format dari panitia",
          isDownload: true,
        },
        {
          text: "Pernyataan Bebas Perilaku Negatif",
          benefit: "Download format dari panitia",
          isDownload: true,
        },
      ],
    },
  ];

  const timeline = [
    {
      phase: "Pendaftaran Online",
      date: "10 Februari - 30 Mei 2026",
      description: "Daftar dari rumah, hanya 10 menit!",
      benefit: "Dapat nomor pendaftaran prioritas",
      status: "active",
      icon: FileText,
      color: "from-teal-600 to-teal-700",
    },
    {
      phase: "Seleksi Administrasi",
      date: "Setelah pendaftaran lengkap",
      description: "Tim kami verifikasi berkas Anda",
      benefit: "Notifikasi real-time via WhatsApp",
      status: "upcoming",
      icon: CheckCircle,
      color: "from-[var(--color-brown-600)] to-[var(--color-brown-700)]",
    },
    {
      phase: "Tes Seleksi",
      date: "Jadwal menyusul",
      description: "Al-Qur'an, Akademik, Kepribadian & Wawancara",
      benefit: "Wawancara dengan santri & orangtua",
      status: "upcoming",
      icon: Users,
      color: "from-[var(--color-brown-700)] to-[var(--color-brown-800)]",
    },
    {
      phase: "Pengumuman Hasil",
      date: "Setelah tes seleksi",
      description: "Kelulusan diumumkan via email & WA",
      benefit: "Daftar ulang segera setelah lulus",
      status: "upcoming",
      icon: Trophy,
      color: "from-[var(--color-gold-600)] to-[var(--color-gold-700)]",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Pendidikan Berkualitas",
      description: "Kurikulum terintegrasi dengan akreditasi A",
      proof: "95% alumni masuk PTN favorit",
    },
    {
      icon: Users,
      title: "Fasilitas Lengkap",
      description: "Asrama, masjid, lapangan olahraga, dan perpustakaan",
      proof: "Setara pesantren kota besar",
    },
    {
      icon: GraduationCap,
      title: "Pengajar Berpengalaman",
      description: "Ustadz dan guru profesional dengan sertifikasi",
      proof: "50+ guru lulusan Timur Tengah",
    },
    {
      icon: BookOpen,
      title: "Program Unggulan",
      description: "Tahfidz Qur'an, bahasa Arab, dan kitab kuning",
      proof: "Target 30 juz dalam 4 tahun",
    },
  ];

  const testimonials = [
    {
      name: "Ibu Siti Rahmawati",
      role: "Wali Santri Angkatan 2024",
      quote:
        "Awalnya ragu, tapi setelah survey langsung saya YAKIN! Anaknya sekarang sudah hafal 5 juz dalam 8 bulan. Luar biasa!",
      rating: 5,
    },
    {
      name: "Bapak Ahmad Fauzi",
      role: "Wali Santri Angkatan 2023",
      quote:
        "Proses pendaftaran GAMPANG banget! Cuma 10 menit online, langsung dapat konfirmasi. Fasilitasnya juga melebihi ekspektasi!",
      rating: 5,
    },
    {
      name: "Ibu Nurul Hidayah",
      role: "Wali Santri Angkatan 2024",
      quote:
        "Anak saya yang tadinya susah bangun subuh, sekarang malah NGINGETIN keluarga sholat. Ini mukjizat Al-Imam!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Apakah masih ada kuota untuk tahun ajaran 2026/2027?",
      a: "Ya! Kuota terbatas untuk MTs dan I'dad Lughowi (setara SMA) masing-masing 32 santri ikhwan. Daftar sekarang untuk dapat nomor prioritas!",
    },
    {
      q: "Berapa biaya pendaftaran dan SPP?",
      a: "Uang Pendaftaran: Rp 200.000. Uang Pangkal: Rp 7.500.000. Iuran Wajib Ta'awun/SPP: Rp 11.400.000/tahun atau Rp 950.000/bulan (All in).",
    },
    {
      q: "Apa saja materi tes seleksi?",
      a: "Tes meliputi: Al-Qur'an, Kemampuan Dasar Akademik, Identifikasi Kepribadian, Tes Kesiapan, Wawancara dengan Santri, dan Wawancara dengan Orangtua.",
    },
  ];

  const urgencyStats = [
    { value: "32", label: "Kuota MTs", icon: Users },
    { value: "32", label: "Kuota I'dad", icon: Users },
    { value: "Terbatas", label: "Segera Daftar!", icon: AlertCircle },
  ];

  return (
    <main className="pt-3 sm:pt-4 md:pt-5">
      {/* Hero Section - BROWN DOMINANT */}
      <section className="bg-gradient-to-br from-[var(--color-brown-50)] via-[var(--color-cream-100)] to-[var(--color-gold-50)] dark:from-[var(--color-brown-950)] dark:via-[var(--color-brown-900)] dark:to-[var(--color-brown-950)] py-10 xs:py-12 sm:py-16 md:py-20 relative overflow-hidden transition-colors duration-500">
        <div className="hidden sm:block absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[var(--color-brown-200)] dark:bg-[var(--color-brown-800)] rounded-full blur-3xl opacity-30" />
        <div className="hidden sm:block absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--color-gold-200)] dark:bg-[var(--color-gold-800)] rounded-full blur-3xl opacity-30" />

        <Container className="relative z-10">
          <ScrollAnimation className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[var(--color-brown-100)] dark:bg-[var(--color-brown-800)] text-[var(--color-brown-800)] dark:text-[var(--color-brown-100)] px-4 xs:px-5 sm:px-6 py-2 rounded-full text-xs xs:text-sm sm:text-sm font-bold mb-4 sm:mb-6 border border-[var(--color-brown-200)] dark:border-[var(--color-brown-700)]">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>Pendaftaran Tahun Ajaran 2026/2027 Telah Dibuka</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight px-2 sm:px-0 text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)]">
              Membangun Generasi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brown-600)] via-[var(--color-brown-700)] to-[var(--color-brown-900)] dark:from-[var(--color-gold-300)] dark:via-[var(--color-gold-400)] dark:to-[var(--color-gold-500)]">
                Qur'ani & Berakhlak Mulia
              </span>
            </h1>

            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
              Bergabunglah bersama keluarga besar Pesantren Al-Imam.
              Mewujudkan pendidikan Islam yang komprehensif, memadukan ilmu syar'i
              dengan kompetensi akademis untuk masa depan buah hati Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-[var(--color-brown-800)] dark:text-[var(--color-cream-100)] bg-white/50 dark:bg-white/10 px-4 py-2 rounded-lg border border-[var(--color-brown-100)] dark:border-white/10">
                <Users className="w-5 h-5 text-[var(--color-brown-600)] dark:text-[var(--color-gold-400)]" />
                <span className="text-sm font-semibold">Kuota Terbatas: 32 per Jenjang</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-brown-800)] dark:text-[var(--color-cream-100)] bg-white/50 dark:bg-white/10 px-4 py-2 rounded-lg border border-[var(--color-brown-100)] dark:border-white/10">
                <Calendar className="w-5 h-5 text-[var(--color-brown-600)] dark:text-[var(--color-gold-400)]" />
                <span className="text-sm font-semibold">Pendaftaran: 10 Feb - 30 Mei 2026</span>
              </div>
            </div>

            <a
              href={`/daftar${jenjang ? `?jenjang=${jenjang}` : ''}`}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl text-white font-bold text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-12 py-4 xs:py-5 rounded-xl transition-all duration-300 hover:-translate-y-1 bg-[var(--color-brown-800)] hover:bg-[var(--color-brown-900)] dark:bg-[var(--color-gold-600)] dark:hover:bg-[var(--color-gold-700)] group w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span>Daftar Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </a>

            <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-600)] dark:text-[var(--color-cream-300)] mt-4 px-4 sm:px-0">
              Butuh bantuan pendaftaran? <a href="/kontak" className="font-bold underline hover:text-[var(--color-brown-800)] dark:hover:text-[var(--color-gold-400)]">Hubungi Panitia</a>
            </p>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Testimonial - TEAL ACCENT */}
      <section className="bg-white dark:bg-[var(--color-brown-950)] py-10 xs:py-12 sm:py-16 md:py-20 transition-colors duration-500">
        <Container>
          <ScrollAnimation className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              KATA MEREKA
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Pengalaman Wali Santri
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] max-w-2xl mx-auto px-4 sm:px-0">
              Apa yang mereka rasakan setelah mempercayakan pendidikan putranya di Al-Imam?
            </p>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-10">
            {testimonials.map((item, idx) => (
              <ScrollAnimation
                key={idx}
                delay={idx * 0.1}
                className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-cream-100)] dark:from-[var(--color-teal-900)] dark:to-[var(--color-brown-900)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 border-2 border-[var(--color-teal-200)] dark:border-[var(--color-teal-800)] shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-2 sm:mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-[var(--color-gold-500)] text-[var(--color-gold-500)]"
                    />
                  ))}
                </div>
                <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] italic mb-3 sm:mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-[var(--color-teal-200)] dark:border-[var(--color-teal-800)]">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--color-teal-600)] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">
                    {item.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs xs:text-sm sm:text-sm text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] xs:text-xs sm:text-xs text-[var(--color-brown-600)] dark:text-[var(--color-cream-300)] truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation
            direction="up"
            delay={0.3}
            className="bg-gradient-to-r from-[var(--color-brown-100)] to-[var(--color-gold-50)] dark:from-[var(--color-brown-900)] dark:to-[var(--color-gold-900)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 border-2 border-[var(--color-brown-200)] dark:border-[var(--color-brown-700)] text-center"
          >
            <p className="text-base xs:text-lg sm:text-lg font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] flex items-center justify-center gap-2 flex-wrap">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>
                Bergabunglah bersama ratusan orang tua yang telah memilih kami.
              </span>
            </p>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-[var(--color-cream-50)] to-[var(--color-brown-50)] dark:from-[var(--color-brown-950)] dark:to-[var(--color-brown-900)] py-10 xs:py-12 sm:py-16 md:py-20 transition-colors duration-500">
        <Container>
          <ScrollAnimation className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-gold-600)] to-[var(--color-gold-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              KEUNGGULAN KAMI
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Pendidikan yang Mengutamakan Kualitas
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] max-w-2xl mx-auto px-4 sm:px-0">
              Kami memadukan kurikulum nasional dengan pendidikan kepesantrenan untuk membentuk karakter santri yang unggul.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <ScrollAnimation
                key={idx}
                delay={idx * 0.1}
                className="bg-white dark:bg-[var(--color-brown-900)] border-2 border-[var(--color-brown-200)] dark:border-[var(--color-brown-700)] rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 xs:mb-3.5 sm:mb-4 bg-gradient-to-br from-[var(--color-brown-600)] to-[var(--color-brown-700)] dark:from-[var(--color-gold-600)] dark:to-[var(--color-gold-700)] shadow-lg group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-black text-sm xs:text-base sm:text-lg text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-1.5 sm:mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] dark:text-[var(--color-cream-300)] mb-2 sm:mb-3 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="pt-2 sm:pt-3 border-t-2 border-[var(--color-brown-200)] dark:border-[var(--color-brown-800)] w-full">
                    <p className="text-[10px] xs:text-xs sm:text-xs font-bold text-[var(--color-brown-800)] dark:text-[var(--color-gold-400)] flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{benefit.proof}</span>
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white dark:bg-[var(--color-brown-950)] py-10 xs:py-12 sm:py-16 md:py-20 transition-colors duration-500">
        <Container>
          <ScrollAnimation className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ALUR PENDAFTARAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Tahapan Seleksi Masuk
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] max-w-2xl mx-auto px-4 sm:px-0">
              Berikut adalah tahapan yang perlu dilalui oleh calon santri baru.
            </p>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto space-y-4 xs:space-y-5 sm:space-y-6">
            {timeline.map((item, idx) => (
              <ScrollAnimation
                key={idx}
                delay={idx * 0.1}
                className={`relative flex flex-col sm:flex-row items-start gap-4 xs:gap-5 sm:gap-6 p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${item.status === "active"
                  ? "bg-gradient-to-r from-[var(--color-teal-50)] to-[var(--color-cream-100)] dark:from-[var(--color-teal-900)] dark:to-[var(--color-brown-900)] border-[var(--color-teal-400)] dark:border-[var(--color-teal-600)] shadow-2xl"
                  : "bg-white dark:bg-[var(--color-brown-900)] border-[var(--color-brown-200)] dark:border-[var(--color-brown-700)] hover:shadow-lg"
                  }`}
              >
                <div
                  className={`w-14 h-14 xs:w-16 xs:h-16 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br ${item.color}`}
                >
                  <item.icon className="w-7 h-7 xs:w-8 xs:h-8 sm:w-8 sm:h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-2">
                    <h3 className="font-black text-base xs:text-lg sm:text-xl text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)]">
                      {item.phase}
                    </h3>
                    {item.status === "active" && (
                      <span className="px-2.5 xs:px-3 py-1 bg-[var(--color-teal-600)] text-white text-[10px] xs:text-xs font-bold rounded-full animate-pulse inline-block w-fit">
                        SEDANG DIBUKA
                      </span>
                    )}
                  </div>
                  <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs xs:text-sm sm:text-sm font-bold text-[var(--color-brown-800)] dark:text-[var(--color-gold-400)] mb-2 sm:mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{item.date}</span>
                  </p>
                  <div className="bg-white/80 dark:bg-black/20 rounded-lg p-2.5 xs:p-3 sm:p-3 border border-[var(--color-teal-200)] dark:border-[var(--color-teal-800)]">
                    <p className="text-xs xs:text-sm sm:text-sm font-bold text-[var(--color-teal-800)] dark:text-[var(--color-teal-300)] flex items-start gap-1.5 sm:gap-2">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      <span>{item.benefit}</span>
                    </p>
                  </div>
                </div>

                <div className="hidden md:block text-5xl sm:text-6xl font-black text-[var(--color-brown-200)] dark:text-[var(--color-brown-800)]">
                  {idx + 1}
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center px-4 sm:px-0">
            <p className="text-base xs:text-lg sm:text-lg font-bold text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] mb-3 sm:mb-4">
              Pendaftaran dibuka <span className="text-[var(--color-brown-900)] dark:text-white">10 Februari - 30 Mei 2026</span>
            </p>
            <a
              href={`/daftar${jenjang ? `?jenjang=${jenjang}` : ''}`}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] hover:from-[var(--color-brown-800)] hover:to-[var(--color-brown-900)] dark:from-[var(--color-gold-600)] dark:to-[var(--color-gold-700)] dark:hover:from-[var(--color-gold-700)] dark:hover:to-[var(--color-gold-800)] text-white font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 w-full sm:w-auto active:scale-95"
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Daftar Sekarang</span>
            </a>
          </div>
        </Container>
      </section>

      {/* Requirements Section - BROWN & TEAL */}
      <section className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-cream-100)] dark:from-[var(--color-brown-950)] dark:to-[var(--color-brown-900)] py-10 xs:py-12 sm:py-16 md:py-20 transition-colors duration-500">
        <Container>
          <ScrollAnimation className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              PERSYARATAN
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Berkas Pendaftaran
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] max-w-2xl mx-auto px-4 sm:px-0">
              Mohon persiapkan dokumen-dokumen berikut untuk kelengkapan administrasi.
            </p>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 max-w-6xl mx-auto">
            {requirements.map((req, idx) => (
              <ScrollAnimation
                key={idx}
                delay={idx * 0.1}
                className="bg-white dark:bg-[var(--color-brown-900)] border-2 border-[var(--color-teal-200)] dark:border-[var(--color-brown-700)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-3 xs:gap-3.5 sm:gap-4 mb-5 xs:mb-5.5 sm:mb-6">
                  <div className="w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-[var(--color-teal-500)] to-[var(--color-teal-600)] dark:from-[var(--color-teal-600)] dark:to-[var(--color-teal-700)] shadow-lg flex-shrink-0">
                    <req.icon className="w-6 h-6 xs:w-6.5 xs:h-6.5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-base xs:text-lg sm:text-xl text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] leading-tight">
                      {req.title}
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] dark:text-[var(--color-cream-300)] leading-tight">
                      {req.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5 xs:space-y-3 sm:space-y-3">
                  {req.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3 p-2.5 xs:p-3 sm:p-3 rounded-lg sm:rounded-xl hover:bg-[var(--color-teal-50)] dark:hover:bg-[var(--color-teal-900)]/30 transition-all">
                        <CheckCircle className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[var(--color-teal-600)] dark:text-[var(--color-teal-400)]" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs xs:text-sm sm:text-sm font-semibold text-[var(--color-brown-800)] dark:text-[var(--color-cream-100)] block mb-1 leading-tight">
                            {item.text}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation
            direction="up"
            delay={0.2}
            className="mt-8 sm:mt-10 bg-white dark:bg-[var(--color-brown-900)] rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-6 border-2 border-[var(--color-teal-200)] dark:border-[var(--color-brown-700)] max-w-3xl mx-auto text-center shadow-lg"
          >
            <Shield className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-[var(--color-teal-600)] dark:text-[var(--color-teal-500)] mx-auto mb-2.5 sm:mb-3" />
            <p className="text-base xs:text-lg sm:text-lg font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-1.5 sm:mb-2 px-2 sm:px-0">
              Butuh Informasi Lebih Lanjut?
            </p>
            <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] px-4 sm:px-0">
              Silakan hubungi panitia PPDB jika Anda memiliki pertanyaan mengenai persyaratan dokumen.
            </p>
          </ScrollAnimation>
        </Container>
      </section>

      {/* FAQ Section - BROWN THEME */}
      <section className="bg-white dark:bg-[var(--color-brown-950)] py-10 xs:py-12 sm:py-16 md:py-20 transition-colors duration-500">
        <Container>
          <ScrollAnimation className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[var(--color-brown-700)] to-[var(--color-brown-800)] text-white px-4 xs:px-5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-xl mb-3 sm:mb-4">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              FAQ
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-3 sm:mb-4 px-4 sm:px-0 leading-tight">
              Pertanyaan Umum
            </h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-3 xs:space-y-4 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <ScrollAnimation
                key={idx}
                delay={idx * 0.1}
                className="bg-gradient-to-br from-[var(--color-brown-50)] to-[var(--color-cream-100)] dark:from-[var(--color-brown-900)] dark:to-[var(--color-brown-800)] rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border-2 border-[var(--color-brown-200)] dark:border-[var(--color-brown-700)] hover:shadow-xl transition-all"
              >
                <h3 className="font-black text-sm xs:text-base sm:text-lg text-[var(--color-brown-900)] dark:text-[var(--color-cream-100)] mb-2.5 xs:mb-3 sm:mb-3 flex items-start gap-2.5 xs:gap-3 sm:gap-3 leading-tight">
                  <AlertCircle className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-[var(--color-brown-700)] dark:text-[var(--color-gold-400)] flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs xs:text-sm sm:text-sm text-[var(--color-brown-700)] dark:text-[var(--color-cream-200)] leading-relaxed pl-7 xs:pl-8 sm:pl-9">
                  {faq.a}
                </p>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation
            direction="up"
            delay={0.2}
            className="mt-8 sm:mt-10 text-center px-4 sm:px-0"
          >
            <a
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-teal-600)] to-[var(--color-teal-700)] hover:from-[var(--color-teal-700)] hover:to-[var(--color-teal-800)] text-white font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto active:scale-95"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Hubungi Kami</span>
            </a>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Final CTA - BROWN DOMINANT */}
      <section className="bg-gradient-to-br from-[var(--color-brown-800)] via-[var(--color-brown-900)] to-black py-10 xs:py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 hidden sm:block">
          <div className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--color-gold-500)] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[var(--color-teal-500)] rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <ScrollAnimation className="text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-white/25 backdrop-blur-md text-white px-4 xs:px-5 sm:px-5 py-2.5 xs:py-3 sm:py-3 rounded-full text-xs xs:text-sm sm:text-sm font-bold shadow-2xl mb-4 sm:mb-6 border-2 border-white/40">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>MARI BERGABUNG BERSAMA KAMI</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto px-4 sm:px-0">
              Mencetak Generasi <br />
              <span className="text-[var(--color-gold-300)]">
                Rabbani & Berprestasi
              </span>
            </h2>

            <p className="text-sm xs:text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
              Bersama-sama kita wujudkan cita-cita mulia, mendidik generasi muda yang hafal Al-Qur'an dan unggul dalam ilmu pengetahuan.
            </p>

            <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-2.5 xs:gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 text-white/90 text-xs xs:text-sm sm:text-sm px-4 sm:px-0">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">29 Tahun</span>{" "}
                  Pengalaman
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">500+ Santri</span>{" "}
                  Aktif
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/30">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold-300)] flex-shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="font-black text-white">Akreditasi A</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-5 justify-center mb-0 sm:mb-0 px-4 sm:px-0">
              <a
                href="/daftar"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-[var(--color-brown-900)] hover:bg-[var(--color-gold-100)] shadow-2xl font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-12 py-4 xs:py-5 sm:py-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] group w-full sm:w-auto active:scale-95"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Daftar Sekarang</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform flex-shrink-0" />
              </a>

              <a
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent border-2 sm:border-3 border-white text-white hover:bg-white hover:text-[var(--color-brown-900)] font-black text-sm xs:text-base sm:text-lg px-8 xs:px-10 sm:px-12 py-4 xs:py-5 sm:py-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] w-full sm:w-auto active:scale-95"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Konsultasi</span>
              </a>
            </div>
          </ScrollAnimation>
        </Container>
      </section>
    </main>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="w-12 h-12 text-[var(--color-brown-600)] animate-spin mb-4" />
      <p className="text-[var(--color-brown-600)] font-medium">Memuat data...</p>
    </div>
  );
}

export default function PPDBPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PPDBContent />
    </Suspense>
  );
}
