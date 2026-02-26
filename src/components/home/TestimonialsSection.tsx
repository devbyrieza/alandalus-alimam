"use client";

import { MessageCircle, Star, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    no: "001",
    name: "Bpk. Surwanto",
    role: "Wali Santri",
    city: "Sukoharjo, Jawa Tengah",
    initial: "S",
    date: "Oktober 2024",
    quote:
      "Tujuan kami menyekolahkan anak ke sini adalah agar mereka benar-benar paham agama, bukan sekadar hafal pelajaran. Alhamdulillah, sejak semester pertama sudah terlihat perubahan nyata pada anak kami — cara bicara, cara bersikap kepada orang tua, dan keseriusannya dalam ibadah. Di sini, pembiasaan ibadah dan adab benar-benar menjadi prioritas harian yang dikerjakan dengan ikhlas, bukan sekadar aturan.",
  },
  {
    no: "002",
    name: "Ibu Endah Wulandari",
    role: "Wali Santri",
    city: "Kebumen, Jawa Tengah",
    initial: "E",
    date: "Januari 2025",
    quote:
      "Awalnya saya khawatir dengan sistem boarding, takut anak susah adaptasi. Ternyata kekhawatiran itu berlebihan. Kurikulum tahfidznya sangat sistematis — tidak hanya mengejar target hafalan, tapi sangat ditekankan pada makhraj dan tajwid yang benar. Dalam 6 bulan, anak saya sudah mampu memimpin shalat berjamaah di rumah saat liburan. Itu yang membuat saya terharu.",
  },
  {
    no: "003",
    name: "Muhammad Razan",
    role: "Alumni Al-Imam",
    city: "Purwokerto, Jawa Tengah",
    initial: "R",
    date: "Maret 2025",
    quote:
      "Disiplin bahasa Arab dan hafalan Al-Qur'an yang saya dapatkan selama di Al-Imam sangat membantu saat saya melanjutkan pendidikan ke jenjang lebih tinggi. Saat teman-teman lain masih belajar dasar-dasar nahwu, saya sudah bisa langsung membaca kitab. Lingkungannya juga kondusif — semua teman berlomba dalam kebaikan, bukan dalam hal-hal yang sia-sia.",
  },
  {
    no: "004",
    name: "Faisal Ahmad",
    role: "Alumni Al-Imam",
    city: "Cilacap, Jawa Tengah",
    initial: "A",
    date: "Agustus 2024",
    quote:
      "Alhamdulillah, berkat bimbingan intensif para asatidz selama di Al-Imam, saya berhasil lulus seleksi masuk universitas di Timur Tengah. Fondasi bahasa Arab aktif yang ditanamkan sejak awal benar-benar menjadi kunci. Para guru di sini tidak hanya mengajar, mereka benar-benar membimbing dan mendoakan santrinya. Saya tidak akan bisa sampai sejauh ini tanpa mereka.",
  },
] as const;

function TestimonialCard({
  no,
  name,
  role,
  city,
  initial,
  date,
  quote,
  idx
}: (typeof TESTIMONIALS)[number] & { idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white p-8 rounded-[2.5rem] h-full flex flex-col relative group border border-surface-100 shadow-premium-lg hover:shadow-premium-xl transition-all duration-500"
    >
      {/* Number badge */}
      <div className="absolute top-8 left-8 w-9 h-9 rounded-xl bg-brown-50 border border-brown-100 flex items-center justify-center">
        <span className="text-[10px] font-black text-brown-600 tracking-wider">#{no}</span>
      </div>

      <Quote className="absolute top-8 right-8 w-8 h-8 text-brown-50 group-hover:text-brown-100 transition-colors" />

      {/* Stars */}
      <div className="flex gap-1 mb-5 mt-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
        ))}
      </div>

      <p className="text-ink-600 leading-relaxed mb-6 flex-grow font-medium relative z-10 text-sm">
        "{quote}"
      </p>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-surface-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brown-700 flex items-center justify-center text-white font-display font-black shadow-premium-sm group-hover:scale-110 transition-transform duration-500">
            {initial}
          </div>
          <div>
            <p className="text-sm font-bold text-ink-950 leading-none mb-1">{name}</p>
            <p className="text-[11px] text-ink-500 font-bold uppercase tracking-wider">{role} · {city}</p>
          </div>
        </div>
        <span className="text-[11px] text-ink-400 font-bold shrink-0">{date}</span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brown-50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 opacity-50" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 text-brown-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-premium-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Cerita Nyata Wali Santri & Alumni</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-ink-950 mb-6 tracking-tight"
          >
            Apa Kata <span className="text-brown-600">Mereka?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-600 font-medium leading-relaxed"
          >
            Kepercayaan wali santri dan alumni adalah amanah bagi kami untuk terus memberikan yang terbaik.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} idx={idx} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-ink-400 font-bold uppercase tracking-widest"
        >
          Testimoni asli dari wali santri & alumni · Nama ditampilkan dengan persetujuan
        </motion.p>
      </Container>
    </section>
  );
}