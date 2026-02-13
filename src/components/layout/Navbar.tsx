"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, School, Sparkles, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/program", label: "Program" },
    { href: "/fasilitas", label: "Fasilitas" },
    { href: "/kegiatan", label: "Kegiatan" },
    { href: "/galeri", label: "Galeri" },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-surface-200 py-3 shadow-premium-sm"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-brown-700 text-white shadow-premium-md transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <School className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-extrabold text-ink-950 leading-none tracking-tight">
                  Al-Imam
                </h1>
                <p className="text-[11px] font-bold text-ink-500 uppercase tracking-widest mt-1">
                  Pesantren Islami
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-surface-50/50 p-1.5 rounded-2xl border border-surface-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${isActive(link.href)
                    ? "bg-white text-brown-700 shadow-premium-sm"
                    : "text-ink-600 hover:text-ink-950 hover:bg-white/50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-ink-600 hover:text-brown-700 transition-colors">
                Login
              </Link>
              <Link href="/ppdb">
                <Button className="rounded-xl px-6 py-5 bg-brown-700 hover:bg-brown-800 text-white font-bold shadow-premium-md transition-all duration-300 group">
                  Daftar PPDB
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-surface-50 border border-surface-200 text-ink-700 hover:bg-surface-100 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-ink-950/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute top-0 inset-x-0 bg-white shadow-premium-xl pt-24 pb-8 px-6 rounded-b-[2rem]">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-4 rounded-xl text-lg font-bold transition-all ${isActive(link.href)
                      ? "bg-brown-50 text-brown-700"
                      : "text-ink-700 hover:bg-surface-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 pt-6 border-t border-surface-100 flex flex-col gap-4">
                  <Link href="/ppdb">
                    <Button className="w-full py-7 text-lg font-bold rounded-2xl bg-brown-700 hover:bg-brown-800">
                      Daftar Sekarang
                    </Button>
                  </Link>
                  <Link href="/login" className="text-center py-2 text-ink-500 font-bold hover:text-brown-700 transition-colors">
                    Login Sistem
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

