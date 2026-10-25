"use client";

// src/components/home/TestimonialsSection.tsx
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Sebagai dokter anak, saya sangat memperhatikan kesehatan mental santriwati saat mukim. Pesantren Al-Imam terbukti konsisten menerapkan pengasuhan tanpa kekerasan fisik dan perundungan. Bimbingan ustadzah dan musyrifah 24 jam di kamar santriwati membuat putri kami tumbuh ceria, beradab, dan hafalannya mutqin bersanad.",
    author: "Bpk. dr. Ahmad Fauzi, Sp.A",
    role: "Wali Santriwati MTs Al-Imam",
    badge: "Hafal 9 Juz & Fasih Arab",
    city: "Jakarta Selatan",
    cohort: "Angkatan 3"
  },
  {
    text: "Alhamdulillah, putri kami tidak hanya lancar tahfidz dan nahwu-shorof, tapi juga mahir keterampilan tata boga dan menjahit dari program keputrian. Lingkungan kampus khusus putri sangat asri, aman, dan menjaga fitrah wanita muslimah.",
    author: "Ibu Hj. Siti Nurjanah, S.Pd.",
    role: "Wali Santriwati I'dad Lughowi",
    badge: "Tahfidz & Keputrian",
    city: "Bogor, Jawa Barat",
    cohort: "Angkatan 4"
  },
  {
    text: "Transparansi laporan pengasuhan dan biaya sangat terpercaya. Uang pangkal terjangkau dengan skema cicilan 3x sangat memudahkan kami. Perkembangan adab, kebiasaan shalat malam, dan kemandirian putri kami membuat seluruh keluarga bersyukur.",
    author: "Bpk. Kurniawan Prasetyo, M.M.",
    role: "Wali Santriwati MTs Al-Imam",
    badge: "Adab & Kemandirian",
    city: "Tangerang Selatan, Banten",
    cohort: "Angkatan 4"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimoni" className="py-24 bg-[#FAF8F9] border-b border-slate-200 scroll-mt-20">
      <Container className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary-900 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-200 inline-block">
            Pengalaman Otentik Wali Santriwati
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata <span className="text-primary">Wali Santriwati?</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Kepercayaan para orang tua yang telah mengamanahkan pendidikan aqidah, tahfidz, adab, dan masa depan putrinya di Pesantren Al Imam (Khusus Putri).
          </p>
        </div>

        {/* Testimonials Grid (OMI Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Achievement Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary-900 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                    {t.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.role} • {t.city}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-50 text-primary-900 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
