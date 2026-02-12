"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle,
  FileText,
  Award,
  TrendingUp,
  Star,
  Shield,
  Phone,
  AlertCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Target,
  Loader2,
  Check,
  HelpCircle,
  Download,
  CreditCard,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Container } from "@/components/layout/Container";

function PPDBContent() {
  const searchParams = useSearchParams();
  const jenjang = searchParams.get('jenjang');

  const stats = [
    { label: "Kuota MTs", value: "25", icon: Users },
    { label: "Kuota I'dad", value: "25", icon: Users },
    { label: "Asatidz", value: "Alumni TimTeng", icon: GraduationCap },
    { label: "Target Lulusan", value: "Timur Tengah & LIPIA", icon: Award },
  ];

  const timeline = [
    {
      phase: "Registrasi Online",
      date: "10 Feb - 30 Mei 2026",
      desc: "Buat akun dan daftar melalui website resmi.",
      status: "active",
    },
    {
      phase: "Pembayaran",
      date: "Setelah Registrasi",
      desc: "Login ke dashboard lalu bayar biaya pendaftaran.",
      status: "upcoming",
    },
    {
      phase: "Isi Data Lengkap",
      date: "Setelah Pembayaran",
      desc: "Lengkapi data santri, orang tua, dan informasi lainnya.",
      status: "upcoming",
    },
    {
      phase: "Upload Berkas",
      date: "Setelah Data Lengkap",
      desc: "Upload dokumen persyaratan dalam format digital (PDF/JPG).",
      status: "upcoming",
    },
    {
      phase: "Ujian Seleksi",
      date: "Pilih Jadwal",
      desc: "Pilih jadwal ujian yang tersedia. Tes Al-Qur'an, Tes Seleksi Online (Kemampuan Dasar Akademik, Identifikasi Kepribadian, Tes Kesiapan), Wawancara Santri & Orang Tua.",
      status: "upcoming",
    },
    {
      phase: "Pengumuman",
      date: "WhatsApp & Dashboard",
      desc: "Hasil seleksi diumumkan via WhatsApp dan dapat dilihat di dashboard pendaftar.",
      status: "upcoming",
    },
    {
      phase: "Daftar Ulang",
      date: "Setelah Pengumuman",
      desc: "Pembayaran biaya masuk dan penyelesaian administrasi.",
      status: "upcoming",
    },
  ];

  const requirements = [
    {
      title: "Dokumen Wajib",
      icon: FileText,
      items: [
        { name: "Scan Kartu Keluarga (KK)", download: false },
        { name: "Scan Akte Kelahiran", download: false },
        { name: "Scan Rapor 2 Semester Terakhir", download: false },
        { name: "Scan Nomor Induk Siswa Nasional (NISN)", download: false },
        { name: "Foto Setengah Badan", download: false },
      ]
    },
    {
      title: "Dokumen Download",
      icon: CheckCircle,
      description: "Format disediakan panitia. Download, isi, scan, lalu upload.",
      items: [
        { name: "Surat Keterangan Sehat", download: true },
        { name: "Pakta Integritas", download: true },
        { name: "Pernyataan Bebas Perilaku Negatif", download: true },
      ]
    }
  ];

  const biaya = [
    { label: "Biaya Pendaftaran", value: "Rp 200.000" },
    { label: "Uang Pangkal", value: "Rp 9.800.000" },
    { label: "Taawun (SPP) / Bln", value: "Rp 1.100.000" },
  ];

  const faqs = [
    {
      q: "Apakah santri wajib tinggal di asrama?",
      a: "Ya, seluruh santri wajib mukim (asrama) agar dapat mengikuti program pendidikan yang terintegrasi dan pembinaan akhlak secara intensif."
    },
    {
      q: "Berapa total biaya masuk?",
      a: "Biaya pendaftaran Rp 200.000, Uang Pangkal Rp 7.500.000, dan SPP bulanan Rp 1.000.000. Bila ada detail rincian lainnya akan diinformasikan saat daftar ulang."
    },
    {
      q: "Apakah uang pendaftaran bisa kembali?",
      a: "Mohon maaf, uang pendaftaran yang sudah dibayarkan tidak dapat dikembalikan dengan alasan apapun."
    },
  ];

  return (
    <main className="bg-surface-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-50 rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-50 rounded-full blur-[80px] opacity-40 -translate-x-1/3 translate-y-1/3" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation>
              <div className="inline-flex items-center gap-2 bg-brown-50 border border-brown-100 px-4 py-1.5 rounded-full text-xs font-bold text-brown-800 mb-6 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brown-600" />
                Pendaftaran T.A 2026/2027 Dibuka
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-ink-900 mb-6 leading-tight tracking-tight">
                Siapkan Masa Depan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-600 to-gold-600">
                  Generasi Qur&apos;ani
                </span>
              </h1>

              <p className="text-lg md:text-xl text-ink-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Bergabunglah dengan Pesantren Al-Imam. Kurikulum terintegrasi, fasilitas lengkap, dan lingkungan yang mendukung hafalan Al-Qur'an serta prestasi akademik.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`/daftar${jenjang ? `?jenjang=${jenjang}` : ''}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brown-700 text-white font-bold text-lg hover:bg-brown-800 transition-all shadow-lg shadow-brown-900/10 hover:-translate-y-1"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#alur"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-surface-200 text-ink-900 font-bold text-lg hover:bg-surface-50 transition-all hover:border-surface-300"
                >
                  Lihat Alur
                </a>
              </div>
            </ScrollAnimation>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {stats.map((stat, idx) => (
              <ScrollAnimation key={idx} delay={idx * 0.1} className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all text-center group">
                <div className="w-12 h-12 mx-auto bg-brown-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-brown-600" />
                </div>
                <div className="font-black text-3xl text-ink-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-ink-500 uppercase tracking-wide">{stat.label}</div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Alur Seleksi */}
      <section id="alur" className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-ink-900 mb-4">Alur Pendaftaran</h2>
            <p className="text-ink-600 max-w-2xl mx-auto">
              Proses seleksi yang transparan dan mudah. Ikuti setiap tahapannya untuk menjadi bagian dari keluarga besar Al-Imam.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Connecting Line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-surface-200" />

            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <ScrollAnimation key={idx} delay={idx * 0.08} className="relative flex gap-5 md:gap-8">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center bg-white shrink-0 z-10 relative ${item.status === 'active' ? 'border-brown-600 text-brown-600' : 'border-surface-200 text-ink-300'
                    }`}>
                    <span className="text-lg md:text-xl font-black">{idx + 1}</span>
                    {item.status === 'active' && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                  </div>

                  <div className="flex-1 bg-white p-5 md:p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-ink-900">{item.phase}</h3>
                      <span className="inline-block px-3 py-1 bg-surface-100 rounded-lg text-xs font-semibold text-brown-700">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm text-ink-500">{item.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Biaya Pendaftaran */}
      <section className="py-20 bg-white border-y border-surface-200">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-ink-900 mb-4">Biaya Pendaftaran</h2>
              <p className="text-ink-600">Rincian biaya PPDB Tahun Ajaran 2026/2027.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {biaya.map((item, idx) => (
                <ScrollAnimation key={idx} delay={idx * 0.1} className="bg-surface-50 rounded-2xl p-6 border border-surface-200 text-center hover:shadow-md transition-all">
                  <div className="w-12 h-12 mx-auto bg-white rounded-xl flex items-center justify-center mb-4 border border-surface-200 shadow-sm">
                    <CreditCard className="w-5 h-5 text-brown-600" />
                  </div>
                  <p className="text-sm font-medium text-ink-500 mb-2">{item.label}</p>
                  <p className="text-2xl font-black text-ink-900">{item.value}</p>
                </ScrollAnimation>
              ))}
            </div>

            <div className="bg-brown-50 border border-brown-100 rounded-xl p-4 text-center">
              <p className="text-sm text-brown-800">
                <span className="font-bold">Catatan:</span> Uang pendaftaran yang sudah dibayarkan tidak dapat dikembalikan dengan alasan apapun.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Persyaratan & Mengapa Al-Imam */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black text-ink-900 mb-6">Persyaratan Berkas</h2>
              <p className="text-ink-600 mb-8">
                Siapkan dokumen berikut dalam format digital (PDF/JPG). Upload dilakukan setelah pembayaran dan pengisian data lengkap.
              </p>

              <div className="space-y-6">
                {requirements.map((req, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-surface-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-surface-50 flex items-center justify-center border border-surface-200">
                        <req.icon className="w-5 h-5 text-brown-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink-900">{req.title}</h3>
                        {req.description && (
                          <p className="text-xs text-ink-500">{req.description}</p>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-3 mt-4">
                      {req.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-ink-700">
                          {item.download ? (
                            <Download className="w-4 h-4 text-brown-600 shrink-0" />
                          ) : (
                            <Check className="w-4 h-4 text-teal-600 shrink-0" />
                          )}
                          <span>{item.name}</span>
                          {item.download && (
                            <span className="text-xs bg-brown-50 text-brown-700 px-2 py-0.5 rounded-full font-semibold">Download</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-brown-50 to-surface-100 rounded-3xl p-8 sm:p-10 shadow-lg border border-brown-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brown-100/50 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-100/50 rounded-full blur-3xl -ml-10 -mb-10" />

                <h3 className="text-2xl font-black text-brown-900 mb-6 relative z-10">Mengapa Al-Imam?</h3>
                <div className="space-y-5 relative z-10">
                  {[
                    { title: "Kurikulum Terintegrasi", desc: "Perpaduan Kurikulum Nasional & Pesantren Salafiyah." },
                    { title: "Target Hafalan", desc: "30 Juz Mutqin dalam 6 tahun masa pendidikan (MTs & MA)." },
                    { title: "Lingkungan Kondusif", desc: "Jauh dari hiruk pikuk kota, udara sejuk, air bersih." },
                    { title: "Ekstrakurikuler", desc: "Bela diri, Memanah, Berkuda, IT Club, Bahasa." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 bg-white/70 rounded-xl p-4 border border-brown-100/60">
                      <div className="w-10 h-10 rounded-full bg-brown-700 flex items-center justify-center shrink-0 font-bold text-white text-sm">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-0.5 text-brown-900">{item.title}</h4>
                        <p className="text-ink-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-brown-200 relative z-10">
                  <p className="text-sm text-ink-500 mb-4">Masih ragu? Konsultasi gratis.</p>
                  <a
                    href="https://wa.me/6285888871997?text=Halo%20Admin%20PPDB%20Al-Imam%2C%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santri%20baru..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-brown-700 hover:bg-brown-800 text-white font-bold transition-all shadow-md"
                  >
                    <Phone className="w-5 h-5" />
                    Konsultasi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-ink-900 mb-10 text-center">Tanya Jawab</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-surface-200 shadow-sm hover:border-brown-200 transition-colors">
                  <h3 className="font-bold text-lg text-ink-900 mb-2 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-brown-600 mt-1 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-ink-600 pl-8 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 border-t border-surface-200 bg-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-ink-900 mb-6">Kuota Terbatas!</h2>
            <p className="text-lg text-ink-600 mb-8">
              Jangan lewatkan kesempatan untuk memberikan pendidikan terbaik bagi putra-putri Anda. Pendaftaran ditutup otomatis jika kuota terpenuhi.
            </p>
            <a
              href={`/daftar${jenjang ? `?jenjang=${jenjang}` : ''}`}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl bg-gradient-to-r from-brown-700 to-brown-800 text-white font-bold text-xl hover:from-brown-800 hover:to-brown-900 transition-all shadow-xl hover:-translate-y-1"
            >
              Daftar Sekarang
              <ChevronRight className="w-6 h-6" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-50">
      <Loader2 className="w-10 h-10 text-brown-600 animate-spin mb-4" />
      <p className="text-ink-500 font-medium animate-pulse">Memuat halaman...</p>
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
