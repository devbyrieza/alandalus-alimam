// src/app/ppdb/page.tsx
"use client";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { BRANDING } from "@/config/branding";

export default function PPDBPage() {
  return (
    <main className="pt-24 md:pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="eyebrow-pill mb-6 inline-flex"><BookOpen className="w-4 h-4 text-maroon-600"/> Informasi Pendaftaran</span>
          <h1 className="text-4xl md:text-6xl font-black text-ink-950 mb-6 tracking-tight leading-tight">
            Bergabung dengan <br />
            <span className="gradient-text-maroon">Keluarga Al Imam.</span>
          </h1>
          <p className="text-lg text-ink-500 font-medium">Pendaftaran Santri Baru Tahun Ajaran {BRANDING.academicYear} resmi dibuka. Proses mudah, transparan, dan terintegrasi secara digital.</p>
        </motion.div>
        
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-premium-xl border border-surface-200">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-black text-ink-950 mb-6">Persyaratan Umum</h2>
                 <ul className="space-y-4">
                    {["Beragama Islam", "Lulus SD/MI (untuk MTs) atau SMP/MTs (untuk IL)", "Sehat jasmani dan rohani", "Berkelakuan baik & tidak merokok", "Bersedia tinggal di asrama"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-ink-800">
                         <CheckCircle2 className="w-5 h-5 text-maroon-600" /> {item}
                      </li>
                    ))}
                 </ul>
                 <div className="mt-10">
                   <Link href="/daftar">
                      <button className="btn-glow-maroon w-full sm:w-auto px-10 py-4 font-bold text-lg flex items-center justify-center gap-3">
                         Mulai Pendaftaran <ArrowRight className="w-5 h-5" />
                      </button>
                   </Link>
                 </div>
              </div>
              <div className="bg-surface-50 rounded-[2rem] p-8 border border-surface-200 h-full flex flex-col justify-center">
                 <h3 className="text-xl font-black text-ink-900 mb-4">Butuh Bantuan?</h3>
                 <p className="text-ink-500 font-medium mb-6">Tim Admisi kami siap membantu menjawab pertanyaan seputar proses pendaftaran.</p>
                 <Link href="/kontak">
                   <button className="bg-white border-2 border-surface-200 hover:border-maroon-300 rounded-full px-6 py-3 font-bold text-ink-900 transition-colors">
                     Hubungi CS Admisi
                   </button>
                 </Link>
              </div>
           </div>
        </div>
      </Container>
    </main>
  );
}
