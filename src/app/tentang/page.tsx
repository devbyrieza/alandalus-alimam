"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
    Users,
    Target,
    History,
    MapPin,
    Award,
    BookOpen,
    Compass,
    ArrowRight
} from "lucide-react";

export default function TentangPage() {
    return (
        <main className="bg-surface-50 min-h-screen">
            {/* 1. Hero Section - Deep Brown & Gold */}
            <section className="relative py-12 md:py-16 overflow-hidden bg-brown-900 text-white">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brown-700/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <History className="w-4 h-4" />
                        <span>Tentang Kami</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 text-white">
                        Mengenal Lebih Dekat<br />
                        <span className="text-white">Al-Imam Al-Islami</span>
                    </h1>

                    <p className="text-lg md:text-xl text-brown-100 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Lembaga pendidikan Islam yang berdedikasi mencetak generasi Qur'ani yang berakhlak mulia, berilmu luas, dan siap berkontribusi untuk umat dengan manhaj Salafus Shalih.
                    </p>
                </Container>
            </section>

            {/* 2. History & Profile - Glass Panel */}
            <section className="py-12 md:py-16 relative">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Image Column */}
                        <div className="relative group">
                            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-clay-lg relative z-10 transform group-hover:rotate-1 transition-transform duration-500">
                                <Image
                                    src="/images/tentang.png.png"
                                    alt="Foto Pesantren Al-Imam Al-Islami"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-10 -right-10 z-20 bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-clay-lg border border-white/50 animate-in zoom-in delay-300 duration-1000">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-brown-900 rounded-full flex items-center justify-center text-gold-500">
                                        <Award className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-brown-900">1995</p>
                                        <p className="text-brown-600 font-medium text-sm">Tahun Berdiri</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brown-500/5 rounded-full blur-3xl -z-10" />
                        </div>

                        {/* Content Column */}
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-brown-900 leading-tight">
                                Sejarah & <br />
                                <span className="text-teal-600">Profil Singkat</span>
                            </h2>

                            <div className="prose prose-lg text-ink-600 leading-relaxed text-justify">
                                <p>
                                    <strong>Pesantren Al-Imam Al-Islami</strong> merupakan salah satu pusat pendidikan Islam terkemuka yang berlokasi di Cikembar, Sukabumi, Jawa Barat. Didirikan dengan visi mulia pada tahun 1995 oleh <em>Al-Ustadz KH. Bukhori Muslim Rahimahullah</em>.
                                </p>
                                <p>
                                    Sejak awal berdiri, pesantren ini berkomitmen penuh untuk berkhidmah kepada umat melalui jalur pendidikan dan dakwah. Kami membuka kesempatan luas melalui program beasiswa yatim dan dhuafa, serta menjaga biaya pendidikan tetap terjangkau tanpa mengurangi kualitas.
                                </p>
                                <p>
                                    Kurikulum kami memadukan kekayaan khazanah turats (kitab kuning) dengan kurikulum nasional (Kemenag) untuk jenjang MTs dan MA, mencetak santri yang tidak hanya faqih dalam agama tetapi juga berwawasan luas.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="card-glass p-5 flex items-center gap-4 hover:bg-brown-50 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-brown-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-brown-700">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brown-900 text-xl">500+</h4>
                                        <p className="text-xs font-bold text-brown-500 uppercase tracking-wide">Santri Aktif</p>
                                    </div>
                                </div>
                                <div className="card-glass p-5 flex items-center gap-4 hover:bg-teal-50 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-teal-700">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-teal-900 text-xl">A</h4>
                                        <p className="text-xs font-bold text-teal-600 uppercase tracking-wide">Akreditasi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. Vision Mission - Clay Cards */}
            <section className="py-12 md:py-16 bg-surface-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

                <Container className="relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-3 block">Landasan Kami</span>
                        <h2 className="text-4xl md:text-5xl font-black text-brown-900 mb-6">Visi & Misi</h2>
                        <p className="text-xl text-ink-600 leading-relaxed">
                            Arah gerak dan komitmen kami dalam menjalankan amanah pendidikan umat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Visi */}
                        <div className="card-glass p-10 hover:-translate-y-2 transition-transform duration-500 border-t-4 border-t-brown-600">
                            <div className="w-16 h-16 bg-brown-50 rounded-2xl flex items-center justify-center mb-8 text-brown-700 shadow-inner">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-brown-900 mb-4">Visi</h3>
                            <p className="text-lg text-ink-600 italic leading-relaxed">
                                "Menjadi lembaga pendidikan Islam unggulan dalam rangka mewujudkan generasi khairu ummah yang memiliki manhaj Al Qur'an dan As Sunnah sesuai pemahaman as-salaf ash-shalih."
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="card-glass p-10 hover:-translate-y-2 transition-transform duration-500 border-t-4 border-t-teal-500">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 text-teal-700 shadow-inner">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-brown-900 mb-6">Misi Utama</h3>
                            <ul className="space-y-4">
                                {[
                                    "Mencetak penghafal Qur'an yang mutqin.",
                                    "Membekali santri dengan ilmu syar'i yang kokoh.",
                                    "Mengkader pemimpin masa depan yang adil.",
                                    "Menyiapkan da'i yang siap terjun ke masyarakat."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start group">
                                        <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform">
                                            {idx + 1}
                                        </div>
                                        <span className="text-ink-600 font-medium group-hover:text-teal-700 transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tujuan */}
                        <div className="card-glass p-10 hover:-translate-y-2 transition-transform duration-500 border-t-4 border-t-gold-500">
                            <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-8 text-gold-600 shadow-inner">
                                <Compass className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-brown-900 mb-6">Tujuan</h3>
                            <ul className="space-y-4">
                                {[
                                    "Menciptakan bi'ah ilmiah yang kondusif untuk tholabul ilmi.",
                                    "Meningkatkan kualitas SDM pendidik yang profesional.",
                                    "Membentuk karakter santri yang beradab dan berakhlak mulia."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start group">
                                        <div className="w-6 h-6 rounded-full bg-gold-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform">
                                            {idx + 1}
                                        </div>
                                        <span className="text-ink-600 font-medium group-hover:text-gold-700 transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 4. CTA Section - Brown Aesthetic */}
            <section className="py-12 md:py-16 bg-brown-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
                        Bergabunglah Bersama<br />Keluarga Besar Al-Imam
                    </h2>
                    <p className="text-xl text-brown-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Mari persiapkan masa depan putra Anda di lingkungan pendidikan terbaik. Pendaftaran tahun ajaran baru telah dibuka.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Button size="lg" className="bg-gold-500 text-white hover:bg-gold-600 rounded-full px-10 h-14 text-lg shadow-lg shadow-gold-500/20" asChild>
                            <Link href="/daftar">Daftar Sekarang</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-brown-400 text-brown-100 hover:bg-white/10 hover:text-white rounded-full px-10 h-14 text-lg" asChild>
                            <Link href="/kontak">Hubungi Kami</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
