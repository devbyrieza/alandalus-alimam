"use client";

// src/components/home/FaqSection.tsx
import { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Kapan pendaftaran santriwati baru angkatan 2027/2028 dibuka?",
    answer: "Pendaftaran SPMB Tahun Ajaran 2027/2028 dibuka mulai tanggal 16 Oktober sampai dengan 20 Desember 2026. Kuota penerimaan terbatas: MTs Putri sebanyak 48 santriwati dan I'dad Lughowi Putri sebanyak 24 santriwati. Pendaftaran dapat ditutup lebih awal jika kuota telah terpenuhi."
  },
  {
    question: "Berapa rincian biaya pendidikan dan bagaimana skema cicilan uang pangkal?",
    answer: "Biaya pendaftaran sebesar Rp 250.000. Uang pangkal sebesar Rp 9.900.000 dapat dicicil maksimal 3x: Cicilan 1 sebesar 50% (Rp 4.950.000) sepekan setelah menerima surat pengumuman hasil kelulusan, dan sisanya (Rp 4.950.000) boleh dicicil 2x dengan batas waktu hingga Mei 2027. SPP bulanan sebesar Rp 1.100.000/bulan (Total Rp 13.200.000/tahun All-In mencakup asrama, makan, dan seluruh kegiatan). Seluruh pembayaran resmi ditransfer ke Bank Syariah Indonesia (BSI) No. Rek. 4222224441 a/n Al Andalus Al Imam."
  },
  {
    question: "Apa saja fokus program unggulan di Pesantren Al-Imam?",
    answer: "Program unggulan Al-Imam berpusat pada penguasaan Bahasa Arab sangat intensif (muhadatsah harian & nahwu-shorof), tahfidz Al-Qur'an mutqin bersanad, pendalaman ilmu syar'i & ibadah harian bimbingan Sunnah, pengajaran sains akademik umum berstandar tinggi, serta keterampilan keputrian (merajut, menjahit, tata boga) dan kemandirian."
  },
  {
    question: "Bagaimana sistem pengasuhan santriwati dan penegakan disiplin di Al-Imam?",
    answer: "Al-Imam menerapkan prinsip pengasuhan 6 Keunggulan Pengasuhan Khusus Putri yang berfokus pada adab Islami, musyrifah tinggal di kamar santri, pengawasan 24 jam sepenuhnya oleh ustadzah, pendekatan penyadaran dan pendewasaan tanpa kekerasan fisik, serta meniadakan kewenangan senior untuk menghukum adik kelasnya."
  },
  {
    question: "Apakah santriwati diwajibkan untuk tinggal di asrama?",
    answer: "Ya, seluruh santriwati di Pesantren Al Imam Al Islami wajib mukim di asrama pondok guna mengikuti program pembinaan adab 24 jam, halaqah tahfidz Al-Qur'an intensif, dan penguasaan bahasa Arab secara komprehensif."
  },
  {
    question: "Kurikulum apa yang diterapkan di Pesantren Al Imam Al Islami?",
    answer: "Kami menerapkan Kurikulum Terpadu yang mengintegrasikan Kurikulum Kementerian Agama RI dengan Kurikulum Kepesantrenan Turots (Kajian Kitab Kuning/Syar'i bersanad) serta pembekalan sains dan teknologi modern berstandar mutu Al-Andalus IIBS."
  },
  {
    question: "Apa saja berkas persyaratan yang harus disiapkan untuk mendaftar?",
    answer: "Berkas utama meliputi Pas foto 3x4 berjilbab hitam dengan latar belakang biru, Akta Kelahiran, Kartu Keluarga (KK), NISN, dan rapor 2 semester terakhir / ijazah. Seluruh berkas diunggah secara digital melalui dashboard pendaftaran."
  },
  {
    question: "Bagaimana tahapan ujian seleksi masuk santriwati baru?",
    answer: "Ujian seleksi terdiri dari tes Al-Qur'an (Tahsin & Tahfidz), Kemampuan Dasar Akademik, Identifikasi Kepribadian, Seleksi Kesiapan & Kemandirian, serta Wawancara Calon Santriwati dan Wali Santriwati."
  },
  {
    question: "Apakah tersedia program beasiswa prestasi?",
    answer: "Ya, Pesantren Al Imam Al Islami menyediakan kuota beasiswa khusus bagi calon santriwati berprestasi yang telah memiliki hafalan Al-Qur'an mutqin serta juara olimpiade sains tingkat kabupaten/provinsi/nasional."
  }
];

const WA_URL = "https://wa.me/6285111524441";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-gradient-to-b from-white via-[#FAF8F9] to-white border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ═════════ LEFT COLUMN (Sticky Header & Helpdesk) ═════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-pink-50 px-4 py-1.5 rounded-full border border-pink-200 inline-block mb-4 shadow-2xs">
                Pusat Bantuan &amp; Tanya Jawab
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Pertanyaan yang <br />
                <span className="text-primary">Sering Diajukan</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                Temukan jawaban cepat seputar pendaftaran santriwati baru, rincian biaya uang pangkal &amp; SPP, serta sistem pengasuhan khusus putri di Pesantren Al-Imam.
              </p>
            </div>

            {/* Persistent Helpdesk Card (Al-Ma'tuq & SUNI Standard - Putri) */}
            <div className="bg-gradient-to-br from-pink-50/80 via-white to-pink-50/40 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-pink-200 shadow-xl shadow-rose-500/10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    Butuh Bantuan Langsung?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Konsultasi Pendaftaran Santriwati
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Panitia admisi siap membimbing Abi &amp; Ummi jika memiliki pertanyaan khusus mengenai kuota penerimaan, cicilan pembiayaan, maupun janji temu survei kampus pesantren khusus putri.
              </p>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Chat WhatsApp Panitia</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-pink-100 font-medium">
                <span>Hotline: +62 851-1152-4441</span>
                <span>08.00 - 17.00 WIB</span>
              </div>
            </div>
          </div>

          {/* ═════════ RIGHT COLUMN (Clean Accordion List) ═════════ */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                    isOpen ? "border-pink-300 shadow-sm bg-pink-50/20" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full text-left flex items-center justify-between gap-4 p-5 sm:p-6 focus:outline-none"
                  >
                    <span className={`text-sm sm:text-base font-extrabold transition-colors leading-snug ${
                      isOpen ? "text-primary" : "text-slate-900"
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-pink-100/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
