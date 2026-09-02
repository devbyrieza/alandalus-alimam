// src/components/home/AboutSection.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { BRANDING } from "@/config/branding";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutSection() {
  return (
    <section id="tentang" className="bg-white py-24 md:py-32 overflow-hidden relative">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left: Huge Typography */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="eyebrow-pill mb-6">
                <ShieldCheck className="w-4 h-4" />
                Tentang Al Imam
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-ink-950 leading-[1.1] tracking-tight mb-8">
                Bukan Sekadar <br />
                <span className="gradient-text-maroon">Pesantren Biasa.</span>
              </h2>
              <p className="text-lg md:text-xl text-ink-600 leading-relaxed font-medium mb-8">
                Di {BRANDING.schoolName}, kami tidak hanya mentransfer ilmu. Kami membangun sebuah ekosistem pendidikan di mana santri dibentuk menjadi kader ummat yang <strong>Hanif</strong>, <strong>Kontributif</strong>, dan <strong>Adaptif</strong> tanpa kekerasan fisik maupun verbal.
              </p>
              
              <ul className="space-y-4">
                {["Fasilitas modern & asrama nyaman", "Pengajar tersertifikasi & kompeten", "Pendekatan tarbiyah penuh kasih sayang"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink-700 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-maroon-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: Cinova style Fit-Box / Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-maroon-50 rounded-[3rem] rotate-3 scale-105" />
            <div className="relative bg-white border border-surface-200 rounded-[2.5rem] p-8 md:p-12 shadow-premium-lg">
              <h3 className="text-2xl font-black text-ink-900 mb-8 text-center">Mengapa Memilih Kami?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Bebas Bullying", desc: "Pengawasan 24 jam & zero tolerance terhadap perundungan.", icon: HeartHandshake },
                  { title: "Talaqqi Bersanad", desc: "Hafalan Al-Qur'an dengan sanad yang muttashil.", icon: Sparkles },
                ].map((feature, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-surface-50 p-6 rounded-3xl border border-surface-100 hover:border-maroon-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                      <feature.icon className="w-6 h-6 text-maroon-600" />
                    </div>
                    <h4 className="text-lg font-bold text-ink-950 mb-2">{feature.title}</h4>
                    <p className="text-sm text-ink-500 font-medium leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
