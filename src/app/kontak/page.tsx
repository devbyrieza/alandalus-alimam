"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Phone,
    Mail,
    Send,
    CheckCircle,
    Instagram,
    Facebook,
    Youtube
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        telepon: "",
        pesan: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setShowSuccess(true);
            setFormData({ nama: "", email: "", telepon: "", pesan: "" });
            setIsSubmitting(false);
            setTimeout(() => setShowSuccess(false), 5000);
        }, 1500);
    };

    const SOCIAL_MEDIA = [
        {
            name: "Instagram",
            username: "pesantrenalimamsukabumi",
            url: "https://www.instagram.com/pesantrenalimamsukabumi/",
            icon: Instagram,
            color: "bg-pink-500",
            textColor: "text-pink-600",
            bgLight: "bg-pink-50",
            hoverBorder: "hover:border-pink-200"
        },
        {
            name: "Facebook",
            username: "Pesantren Al-Imam Al-Islami (Official Fanpage)",
            url: "https://www.facebook.com/ppsbalimamalislami/",
            icon: Facebook,
            color: "bg-blue-600",
            textColor: "text-blue-600",
            bgLight: "bg-blue-50",
            hoverBorder: "hover:border-blue-200"
        },
        {
            name: "Youtube",
            username: "Al Imam Al Islami Cikembar Sukabumi",
            url: "https://www.youtube.com/@AlImamAlIslamiCikembarSukabumi",
            icon: Youtube,
            color: "bg-red-600",
            textColor: "text-red-600",
            bgLight: "bg-red-50",
            hoverBorder: "hover:border-red-200"
        },
    ];

    return (
        <main className="bg-surface-50 min-h-screen">
            {/* 1. Hero Section - Brown Aesthetic */}
            <section className="relative py-12 md:py-16 bg-brown-900 border-b border-white/5">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4">
                        <Phone className="w-4 h-4" />
                        <span>Layanan Informasi</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-white tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                        Kami Siap <span className="text-white">Membantu</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brown-100 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran, program pendidikan, atau kunjungan ke pesantren.
                    </p>
                </Container>
            </section>

            {/* 2. Main Content */}
            <section className="py-12 relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-brown-900 -z-10" />

                <Container>
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-8">
                        {/* Sidebar: Contact Info & Socials */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Detailed Info Cards */}
                            <div className="card-glass p-6 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 bg-brown-100 rounded-xl flex items-center justify-center text-brown-700 mb-4 shadow-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-brown-900 mb-2">Alamat Lengkap</h3>
                                <p className="text-ink-600 leading-relaxed text-sm">
                                    Jl. Pelabuhan Ratu II KM 18, Kp. Pupunjul, Desa Cikembar, Kec. Cikembar, Kab. Sukabumi, Jawa Barat 43157
                                </p>
                            </div>

                            <div className="card-glass p-6 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 mb-4 shadow-sm">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-brown-900 mb-2">Kontak Telepon</h3>
                                <p className="text-ink-500 mb-3 text-sm">
                                    Hubungi kami pada jam kerja (08.00 - 16.00)
                                </p>
                                <a href="tel:+6285888871997" className="text-xl font-black text-teal-600 hover:text-teal-700 transition-colors">
                                    +62 858-8887-1997
                                </a>
                            </div>

                            <div className="card-glass p-6 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center text-gold-600 mb-4 shadow-sm">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-brown-900 mb-2">Email Resmi</h3>
                                <a href="mailto:pesantrenalimamsukabumi@gmail.com" className="text-ink-700 font-medium hover:text-gold-600 transition-colors break-all">
                                    pesantrenalimamsukabumi@gmail.com
                                </a>
                            </div>

                            {/* Social Media */}
                            <div className="card-glass p-6">
                                <h3 className="font-bold text-lg text-brown-900 mb-4">Media Sosial</h3>
                                <div className="space-y-3">
                                    {SOCIAL_MEDIA.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group flex items-center gap-4 p-3 rounded-xl bg-white border border-surface-200 ${social.hoverBorder} shadow-sm hover:shadow-md transition-all duration-300`}
                                        >
                                            <div className={`p-2.5 rounded-full ${social.bgLight} transition-colors group-hover:scale-110 duration-300`}>
                                                <social.icon className={`w-4 h-4 ${social.textColor}`} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-0.5">{social.name}</p>
                                                <p className={`font-bold text-sm ${social.textColor}`}>{social.username}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Column: Form & Map */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact Form */}
                            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-clay-lg border border-white/40">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-brown-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brown-900/20">
                                        <Send className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-brown-900">
                                            Kirim Pesan
                                        </h2>
                                        <p className="text-ink-500">
                                            Kami akan membalas pesan Anda secepatnya via WhatsApp/Email.
                                        </p>
                                    </div>
                                </div>

                                {showSuccess && (
                                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-8 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm font-bold text-emerald-800">
                                                Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 ml-1">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.nama}
                                                onChange={handleChange}
                                                required
                                                className="input-clean bg-surface-50 border-transparent focus:bg-white"
                                                placeholder="Nama Anda"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 ml-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="input-clean bg-surface-50 border-transparent focus:bg-white"
                                                placeholder="email@contoh.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 ml-1">
                                            Nomor WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            name="telepon"
                                            value={formData.telepon}
                                            onChange={handleChange}
                                            required
                                            className="input-clean bg-surface-50 border-transparent focus:bg-white"
                                            placeholder="08xx xxxx xxxx"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 ml-1">
                                            Pesan Anda
                                        </label>
                                        <textarea
                                            name="pesan"
                                            value={formData.pesan}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="input-clean bg-surface-50 border-transparent focus:bg-white resize-none"
                                            placeholder="Tuliskan pertanyaan atau pesan Anda..."
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            size="lg"
                                            className="bg-brown-900 hover:bg-brown-800 text-white px-10 h-14 rounded-xl text-lg shadow-lg shadow-brown-900/20"
                                        >
                                            {isSubmitting ? (
                                                "Mengirim..."
                                            ) : (
                                                <>
                                                    Kirim Pesan
                                                    <Send className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Map */}
                            <div className="card-glass p-3 h-[400px]">
                                <div className="rounded-[1.5rem] overflow-hidden w-full h-full bg-surface-100 relative">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d106.84!3d-6.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683a0a194b4ff1%3A0x9a57be7a985db27a!2sPondok+Pesantren+Al-Imam+Al-Islami!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi Pesantren Al-Imam Al-Islami"
                                        className="grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
