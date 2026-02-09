"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, School } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/program", label: "Program" },
    { href: "/kegiatan", label: "Kegiatan" },
    { href: "/fasilitas", label: "Fasilitas" },
    { href: "/kalender", label: "Kalender" },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-clay-sm py-3"
          : "bg-white py-4 md:py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section - Keeping the Brand Identity */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center bg-brown-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <School className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h1 className="text-sm md:text-base font-bold text-ink-900 leading-tight tracking-tight">
                  Pesantren Al-Imam
                </h1>
                <p className="text-[10px] md:text-[11px] text-ink-500 font-medium leading-tight">
                  Managed by Al-Andalus
                </p>
                <p className="text-[9px] md:text-[10px] text-ink-400 leading-tight">
                  Bekerja Sama Dengan Universitas Islam Terkemuka di 3 Benua
                </p>
              </div>
            </Link>

            {/* Desktop Nav - Clean & Pill Shaped */}
            <nav className="hidden lg:flex items-center gap-2 bg-surface-50 p-1.5 rounded-pill border border-surface-200/60">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 text-sm font-semibold rounded-pill transition-all duration-300 ${isActive(link.href)
                    ? "bg-white text-brown-700 shadow-sm"
                    : "text-ink-600 hover:text-brown-700 hover:bg-white/50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-pill font-bold text-sm text-ink-600 hover:text-brown-700 hover:bg-surface-50 transition-all border border-transparent hover:border-surface-200"
              >
                Login
              </Link>
              <Link
                href="/ppdb"
                className="btn-primary px-6 py-2.5 text-sm shadow-lg shadow-brown-600/20"
              >
                Daftar Sekarang
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-ink-600 hover:bg-surface-50 rounded-xl transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white pt-24 pb-10 px-6 overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${isActive(link.href)
                  ? "bg-surface-50 text-brown-700"
                  : "text-ink-600 hover:bg-surface-50"
                  }`}
              >
                {link.label}
                {isActive(link.href) && <div className="w-2 h-2 rounded-full bg-brown-600" />}
              </Link>
            ))}

            <hr className="my-4 border-surface-100" />

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full p-4 rounded-2xl border border-surface-200 text-center font-bold text-ink-700"
              >
                Login Santri
              </Link>
              <Link
                href="/ppdb"
                onClick={() => setIsMenuOpen(false)}
                className="w-full p-4 rounded-2xl bg-brown-700 text-white text-center font-bold shadow-lg shadow-brown-900/20"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
