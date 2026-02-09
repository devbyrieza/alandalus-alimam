"use client";

import Link from "next/link";
import { MessageCircle, Star, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";

const TESTIMONIALS = [
  {
    name: "H. Abdullah",
    role: "Wali Santri MTs",
    initial: "A",
    quote:
      "Awalnya saya ragu melepas anak mondok. Tapi melihat perubahannya yang sekarang rajin sholat, sopan sama orang tua, dan hafalannya lancar, saya sujud syukur.",
  },
  {
    name: "Ustadz Faisal",
    role: "Alumni Al-Azhar Mesir",
    initial: "F",
    quote:
      "Al-Imam memberikan bekal bahasa Arab yang sangat kuat. Saat saya tes masuk Al-Azhar, saya merasa terbantu sekali dengan dasar yang diajarkan di sini.",
  },
  {
    name: "Ibu Nurhasanah",
    role: "Wali Santri I'dad",
    initial: "N",
    quote:
      "Lingkungannya sangat kondusif dan jauh dari pengaruh negatif gadget. Anak saya jadi lebih fokus belajar dan mandiri mengurus diri sendiri.",
  },
  {
    name: "Bpk. Hermawan",
    role: "Wali Santri",
    initial: "H",
    quote:
      "Biaya sangat terjangkau untuk fasilitas dan kualitas pendidikan seperti ini. Asramanya nyaman, makannya bergizi, dan pembinanya sangat perhatian.",
  },
] as const;

function TestimonialCard({
  name,
  role,
  initial,
  quote,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="card-wablas bg-surface-50 p-8 h-full flex flex-col relative group hover:bg-white transition-colors">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-brown-100 group-hover:text-brown-200 transition-colors" />

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
        ))}
      </div>

      <p className="text-ink-600 leading-relaxed mb-6 flex-grow italic font-medium">
        "{quote}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brown-700 to-brown-900 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {initial}
        </div>
        <div>
          <p className="text-sm font-bold text-ink-900">{name}</p>
          <p className="text-xs text-ink-400 font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 md:py-16 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-50 text-brown-700 text-xs font-bold uppercase tracking-widest mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Kata Mereka</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-ink-900 mb-6 tracking-tight">
            Kepercayaan <span className="text-gradient-brown">Wali Santri</span>
          </h2>
          <p className="text-lg text-ink-500">
            Kami bangga menjadi mitra orang tua dalam mendidik generasi penerus yang sholeh dan sholehah.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>

        {/* Stats CTA */}
        <div className="bg-brown-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center shadow-clay-lg">
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-5 mix-blend-overlay" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brown-600/30 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Bergabunglah dengan 500+ Keluarga Lainnya</h3>
            <p className="text-brown-100 mb-8 leading-relaxed">
              Berikan pendidikan terbaik dunia akhirat untuk putra-putri tercinta. Pendaftaran tahun ajaran 2026/2027 telah dibuka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ppdb" className="px-8 py-4 rounded-pill bg-gold-500 text-brown-900 font-bold hover:bg-gold-400 transition-colors shadow-lg text-lg">
                Daftar Sekarang
              </Link>
              <Link href="/kontak" className="px-8 py-4 rounded-pill text-white font-bold border-2 border-white/40 hover:bg-white/10 transition-colors text-lg">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
