"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle,
  FileText,
  Sparkles,
  ArrowRight,
  Check,
  HelpCircle,
  CreditCard,
  Clock,
  Shield,
  Star,
  Heart,
  Scissors,
  Coffee,
  Sparkle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { BRANDING } from "@/config/branding";
import { PPDB_CONFIG } from "@/config/ppdb-config";

// ========================================
// REUSABLE COMPONENTS
// ========================================

const StatCard = ({
  icon: Icon,
  value,
  label,
  delay = 0,
}: {
  icon: any;
  value: string;
  label: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-6 sm:p-5 md:p-8 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all text-center group"
  >
    <div className="w-14 h-14 mx-auto bg-pink-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <div className="font-extrabold text-lg sm:text-2xl md:text-3xl text-slate-900 mb-1 leading-tight break-words">
      {value}
    </div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
      {label}
    </div>
  </motion.div>
);

const TimelineItem = ({ item, index }: { item: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="relative pl-12 md:pl-20 pb-12 last:pb-0"
  >
    {/* Line */}
    <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-0.5 bg-pink-100" />

    {/* Dot */}
    <div
      className={`absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl border-4 flex items-center justify-center bg-white z-10 shadow-sm transition-all duration-500
      ${
        item.status === "active"
          ? "border-primary text-primary"
          : "border-slate-200 text-slate-400"
      }`}
    >
      <span className="text-xl md:text-2xl font-black">{index + 1}</span>
      {item.status === "active" && (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white"
        />
      )}
    </div>

    {/* Card */}
    <div className="bg-white p-6 sm:p-7 md:p-8 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-wrap items-center gap-4 mb-3">
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
          {item.phase}
        </h3>
        <span
          className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            item.status === "active"
              ? "bg-pink-100 text-primary"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {item.date}
        </span>
      </div>
      <p className="text-base text-slate-600 leading-relaxed font-normal text-left">
        {item.desc}
      </p>
    </div>
  </motion.div>
);

export default function SPMBInfoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: "Kuota MTs Putri", value: "48 Santriwati", icon: Users },
    {
      label: "Total Kuota Penerimaan",
      value: "72 Santriwati",
      icon: GraduationCap,
    },
    { label: "Kuota IL Putri", value: "24 Santriwati", icon: Users },
    { label: "Tahun Ajaran", value: "2027/2028", icon: Calendar },
  ];

  const timeline = [
    {
      phase: "Registrasi Online",
      date: "16 Oktober - 20 Desember 2026",
      desc: "Daftar dan buat akun pendaftar melalui website resmi atau scan barcode di brosur.",
      status: "active",
    },
    {
      phase: "Membayar Biaya Pendaftaran",
      date: "Setelah Registrasi",
      desc: "Lakukan pembayaran biaya pendaftaran sebesar Rp 250.000 via Transfer Bank BSI No. Rek. 4222224441 a/n Al Andalus Al Imam.",
      status: "upcoming",
    },
    {
      phase: "Isi Formulir Online",
      date: "Setelah Bayar",
      desc: "Lengkapi formulir online dengan data diri santriwati, orang tua/wali, dan informasi pendidikan asal.",
      status: "upcoming",
    },
    {
      phase: "Upload Berkas Digital",
      date: "Setelah Formulir",
      desc: "Upload seluruh dokumen persyaratan termasuk pas foto berhijab hitam background biru dan format dokumen panitia.",
      status: "upcoming",
    },
    {
      phase: "Undangan & Jadwal Seleksi",
      date: "Jadwal Dipilih",
      desc: "Menerima undangan jadwal Seleksi: Tes Al-Qur'an, Kemampuan Akademik, Identifikasi Kepribadian, Seleksi Kesiapan, dan Wawancara Wali.",
      status: "upcoming",
    },
    {
      phase: "Pengumuman Hasil Seleksi",
      date: "Setelah Tes",
      desc: "Hasil seleksi diumumkan resmi melalui Dashboard Pendaftar dan Notifikasi WhatsApp.",
      status: "upcoming",
    },
    {
      phase: "Pembayaran Uang Pangkal (Daftar Ulang)",
      date: "Setelah Diterima",
      desc: "Uang pangkal Rp 9.900.000 dapat dicicil 3x: cicilan 1 sebesar 50% (Rp 4.950.000) sepekan setelah pengumuman, sisa 2x dapat dicicil hingga Mei 2027.",
      status: "upcoming",
    },
  ];

  const biaya = [
    {
      label: "Biaya Pendaftaran",
      value: "Rp 250rb",
      note: "Biaya administrasi pendaftaran & ujian seleksi",
      icon: CreditCard,
    },
    {
      label: "Uang Pangkal",
      value: "Rp 9,9 Jt",
      note: "Dapat dicicil 3x (50% sepekan pasca lulus, sisanya 2x s/d Mei 2027)",
      icon: Shield,
    },
    {
      label: "SPP Bulanan (All In)",
      value: "Rp 1,1 Jt/bln",
      note: "Mencakup makan, asrama, & seluruh kegiatan santriwati",
      icon: Star,
    },
  ];

  const requirements = [
    {
      title: "Dokumen Persyaratan Administrasi",
      icon: FileText,
      items: [
        {
          name: "Pas Foto 3x4 (3 lembar) Memakai Jilbab Hitam Latar Belakang Biru",
          type: "Wajib",
        },
        { name: "Scan Kartu Keluarga (KK)", type: "Wajib" },
        { name: "Scan Akta Kelahiran", type: "Wajib" },
        {
          name: "Scan Rapor 2 Semester Terakhir / Ijazah Terakhir",
          type: "Wajib",
        },
        {
          name: "Scan Nomor Induk Siswa Nasional (NISN)",
          type: "Wajib",
        },
      ],
    },
    {
      title: "Dokumen Format Panitia (Download di Dashboard)",
      icon: CheckCircle,
      note: "Dokumen berikut dapat diunduh langsung dari sistem pendaftaran saat tahap upload berkas:",
      items: [
        {
          name: "Surat Keterangan Sehat (Format Panitia / Dokter)",
          type: "Wajib",
        },
        {
          name: "Scan Pakta Integritas Calon Santriwati (Format Panitia)",
          type: "Wajib",
        },
        {
          name: "Scan Pakta Integritas Calon Orang Tua / Wali (Format Panitia)",
          type: "Wajib",
        },
        {
          name: "Scan Pernyataan Bebas Perilaku Menyimpang & Negatif",
          type: "Wajib",
        },
      ],
    },
  ];

  return (
    <main className="bg-gradient-to-b from-[#FFF5F8] via-[#FAF8F9] to-white min-h-screen pt-28 pb-24 lg:pt-36">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden pb-14">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-70 pointer-events-none" />

        <Container className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              Portal Resmi SPMB {BRANDING.academicYear} • KHUSUS PUTRI • ANGKATAN KE-5
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Penerimaan Santriwati Baru <br />
            <span className="text-primary">{BRANDING.schoolName}</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Pendaftaran santriwati baru Tahun Ajaran {BRANDING.academicYear} resmi dibuka.
            Membina generasi muslimah hanif, mandiri, berilmu syar'i, dan berakhlak mulia
            dengan pengasuhan intensif ustadzah &amp; musyrifah.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/daftar"
              className="h-12 px-8 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-lg shadow-primary/25 transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <span>Mulai Pendaftaran Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/documents/Brosur-SPMB-Al-Imam-2027-2028.pdf"
              download="Brosur-SPMB-Pesantren-Al-Imam-2027-2028.pdf"
              className="h-12 px-8 rounded-xl bg-white text-slate-800 font-extrabold text-sm border border-slate-200 shadow-xs hover:border-primary/40 hover:text-primary transition-all inline-flex items-center"
            >
              <span>Unduh Brosur PDF</span>
            </a>
          </div>

          {/* Banner Angkatan ke-5 */}
          <div className="max-w-4xl mx-auto mt-8 bg-pink-50/70 border border-pink-200/80 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center gap-5 text-left shadow-xs">
            <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                Angkatan ke-5: Matang, Nyaman &amp; Teruji
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Menjadi bagian dari angkatan {BRANDING.academicYear} adalah keistimewaan. Ananda
                akan bergabung dalam lingkungan pesantren putri yang terisolasi aman, terarah,
                didukung tenaga pengajar ustadzah kompeten, dan kurikulum khas Al-Andalus.
              </p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} delay={0.1 + idx * 0.1} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 2. 6 KEUNGGULAN PENGASUHAN PUTRI (BROSUR RESMI) ─── */}
      <section className="py-16 bg-white border-y border-pink-100">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200 inline-block">
              Pilar Pendidikan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              6 Keunggulan Pengasuhan Khusus Putri
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Komitmen kami dalam menjaga dan mengasuh setiap santriwati dengan pendekatan Islami, humanis, dan penuh kasih sayang.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PPDB_CONFIG.keunggulanPengasuhan.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-pink-50/50 to-white p-6 rounded-2xl border border-pink-100 shadow-2xs hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 3. INVESTASI PENDIDIKAN (BIAYA RESMI & SKEMA CICILAN) ─── */}
      <section className="py-20 bg-gradient-to-b from-[#FFF5F8]/40 to-white">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200 inline-block">
              Investasi Masa Depan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Informasi Pembiayaan Pendidikan
            </h2>
            <p className="text-sm text-slate-600">
              Transparan, terjangkau, dan berkualitas untuk Tahun Ajaran {BRANDING.academicYear}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {biaya.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-primary mb-5 shadow-2xs">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xs text-slate-500 font-extrabold uppercase tracking-wider mb-2">
                    {item.label}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {item.note}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Highlight Box Skema Cicilan & Bank */}
          <div className="mt-8 bg-white border border-pink-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-primary shrink-0 border border-pink-200">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 text-center md:text-left space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">
                  Ketentuan Uang Pangkal &amp; Skema Cicilan 3x
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Uang pangkal sebesar <strong>Rp 9.900.000</strong> dapat dicicil maksimal <strong>3x pembayaran</strong>:
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-1">
                <div className="text-xs font-extrabold text-primary uppercase tracking-wide">
                  Cicilan 1 (50% = Rp 4.950.000)
                </div>
                <div className="text-xs text-slate-600 font-medium leading-relaxed">
                  Wajib dibayarkan <strong>sepekan (7 hari)</strong> setelah menerima Surat Keputusan Pengumuman Hasil Seleksi sebagai konfirmasi daftar ulang santriwati.
                </div>
              </div>

              <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-1">
                <div className="text-xs font-extrabold text-primary uppercase tracking-wide">
                  Cicilan 2 &amp; 3 (Sisa Rp 4.950.000)
                </div>
                <div className="text-xs text-slate-600 font-medium leading-relaxed">
                  Dapat dicicil secara bertahap dalam 2 kali termin dengan batas akhir pembayaran maksimal <strong>hingga Mei 2027</strong>.
                </div>
              </div>
            </div>

            {/* Rekening Resmi Box */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-wider text-pink-300 font-bold">
                  Rekening Resmi Pembayaran SPMB Al-Imam (Khusus Putri)
                </span>
                <p className="text-sm font-extrabold">
                  {PPDB_CONFIG.bank.namaBank}: <span className="text-pink-400 font-mono text-base">{PPDB_CONFIG.bank.nomorRekening}</span> a/n {PPDB_CONFIG.bank.atasNama}
                </p>
              </div>
              <div className="text-xs bg-white/10 px-4 py-2 rounded-xl text-pink-200 border border-white/15">
                Konfirmasi Otomatis di Dashboard
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 4. ALUR SELEKSI (TIMELINE) ─── */}
      <section id="alur" className="py-20 bg-white border-y border-pink-100">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Sticky Content */}
            <div className="lg:w-2/5 lg:sticky lg:top-36 h-fit text-center lg:text-left space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200 inline-block">
                Tahapan Pendaftaran
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Alur Seleksi <br />
                <span className="text-primary">Lengkap &amp; Transparan</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Setiap tahapan seleksi dilakukan secara objektif untuk memastikan kesiapan calon santriwati dan keselarasan visi orang tua dengan pesantren.
              </p>

              <div className="bg-pink-50/60 p-6 rounded-3xl border border-pink-200/70 text-left space-y-2">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Siap Mendaftar?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Proses pendaftaran hanya memakan waktu 5 menit melalui sistem online kami.
                </p>
                <div className="pt-2">
                  <Link
                    href="/daftar"
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-primary hover:underline"
                  >
                    <span>Daftarkan Putri Anda Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex-1">
              <div className="max-w-2xl">
                {timeline.map((item, idx) => (
                  <TimelineItem key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 5. PERSYARATAN BERKAS & DOKUMEN DIGITAL ─── */}
      <section className="py-20 bg-gradient-to-b from-[#FFF5F8]/30 to-white">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200 inline-block">
              Kelengkapan Berkas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Persyaratan Administrasi Santriwati
            </h2>
            <p className="text-sm text-slate-600">
              Seluruh berkas diunggah secara digital melalui Dashboard Pendaftar.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {requirements.map((req, idx) => {
              const ReqIcon = req.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 sm:p-9 rounded-3xl border border-pink-100 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-primary shadow-2xs shrink-0">
                      <ReqIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {req.title}
                      </h3>
                      {req.note && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {req.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {req.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700"
                      >
                        <div className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-primary shrink-0 stroke-[2.5]" />
                          <span>{item.name}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-primary uppercase shrink-0">
                          {item.type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Fasilitas & Ekstrakurikuler Khusus Putri */}
          <div className="grid lg:grid-cols-2 gap-8 mt-10">
            {/* Fasilitas */}
            <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm space-y-4">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span>14 Fasilitas Pesantren Putri</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {PPDB_CONFIG.fasilitas.map((f, i) => (
                  <span
                    key={i}
                    className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Ekstrakurikuler */}
            <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm space-y-4">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-primary" />
                <span>11 Ekstrakurikuler Khas Keputrian</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {PPDB_CONFIG.ekstrakurikuler.map((e, i) => (
                  <span
                    key={i}
                    className="text-xs px-3.5 py-1.5 rounded-xl bg-pink-50/70 border border-pink-200/80 text-primary font-bold"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 6. CALL TO ACTION & BANTUAN ─── */}
      <section className="pt-10">
        <Container className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400">
                Penerimaan Santriwati Baru {BRANDING.academicYear}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold">
                Wujudkan Masa Depan Putri Shalihah Bersama Kami
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Kuota terbatas: MTs Putri (48 Santriwati) dan I'dad Lughowi Putri (24 Santriwati).
                Daftarkan segera sebelum kuota terpenuhi.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Link
                  href="/daftar"
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-lg shadow-primary/25 transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kontak"
                  className="h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm border border-white/20 transition-all inline-flex items-center"
                >
                  <span>Hubungi Panitia SPMB</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
