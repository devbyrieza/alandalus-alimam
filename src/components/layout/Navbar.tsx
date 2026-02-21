"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, School, Sparkles, Phone } from "lucide-react";
import { scrollToSection, scrollToTop, navigateToDetail } from "@/lib/navigation-scroll";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  // Handle smooth scroll for anchor links on homepage
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle anchor links on homepage
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      scrollToSection(href, 100);
      return;
    }

    // Handle section links from other pages - navigate to home and scroll to section
    if (href.startsWith("#") && pathname !== "/") {
      e.preventDefault();
      sessionStorage.setItem('scroll_to_section', href);
      window.location.href = '/';
      return;
    }

    // Handle detail page navigation - save scroll position
    if (['/tentang', '/program', '/fasilitas', '/kegiatan', '/galeri', '/kontak'].includes(href)) {
      e.preventDefault();
      const sectionMap: Record<string, string> = {
        '/tentang': '#about',
        '/program': '#program',
        '/fasilitas': '#fasilitas',
        '/kegiatan': '#kegiatan',
        '/galeri': '#gallery',
        '/kontak': '#kontak',
      };
      navigateToDetail(href, sectionMap[href]);
    }
  };

  // Handle Beranda click - always scroll to top
  const handleBerandaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      // Already on homepage, scroll to top
      scrollToTop();
    } else {
      // Navigate to homepage and scroll to top
      sessionStorage.removeItem('scroll_to_section');
      sessionStorage.removeItem('scroll_to_position');
      window.location.href = '/';
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-surface-200 py-2 shadow-premium-sm"
          : "bg-transparent py-3 lg:py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={handleBerandaClick} className="flex items-center gap-2 sm:gap-3 group min-h-[44px]">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-brown-700 text-white shadow-premium-md transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 overflow-hidden">
                  <img src="/images/logo.jpg" alt="Logo Al-Imam" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="block">
                <h1 className="text-sm sm:text-base font-extrabold text-ink-950 leading-none tracking-tight">
                  Al-Imam
                </h1>
                <p className="text-[9px] sm:text-[10px] font-bold text-ink-500 uppercase tracking-wide mt-0.5 leading-tight max-w-[150px] sm:max-w-none truncate sm:truncate-none">
                  Managed by Al-Andalus International Boarding School
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-surface-50/50 p-1 rounded-xl border border-surface-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold rounded-lg transition-all duration-300 min-h-[40px] ${isActive(link.href)
                    ? "bg-white text-brown-700 shadow-premium-sm"
                    : "text-ink-600 hover:text-ink-950 hover:bg-white/50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-xs lg:text-sm font-bold text-ink-600 hover:text-brown-700 transition-colors px-3 py-2 min-h-[40px]">
                Masuk
              </Link>
              <Link href="/ppdb" className="rounded-lg px-6 py-2.5 bg-brown-700 hover:bg-brown-800 text-white text-xs lg:text-sm font-bold shadow-premium-md transition-all duration-300 group inline-flex items-center min-h-[40px]">
                Daftar PPDB
              </Link>
            </div>

            {/* Mobile Toggle - 44x44px touch target */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 sm:p-3.5 rounded-xl bg-surface-50 border border-surface-200 text-ink-700 hover:bg-surface-100 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
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
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-ink-950/20 backdrop-blur-sm min-h-full" onClick={() => setIsMenuOpen(false)} />
            <div className="relative top-0 inset-x-0 bg-white shadow-premium-xl pt-20 sm:pt-24 pb-8 px-4 sm:px-6 rounded-b-[2rem]">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`p-4 sm:p-5 rounded-xl text-base sm:text-lg font-bold transition-all min-h-[56px] flex items-center ${isActive(link.href)
                      ? "bg-brown-50 text-brown-700"
                      : "text-ink-700 hover:bg-surface-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 pt-6 border-t border-surface-100 flex flex-col gap-4">
                  <Link href="/ppdb" className="w-full py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl bg-brown-700 hover:bg-brown-800 text-white text-center block transition-colors shadow-lg shadow-brown-700/20 min-h-[56px] flex items-center justify-center">
                    Daftar Sekarang
                  </Link>
                  <Link href="/login" className="w-full py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl border-2 border-surface-200 text-ink-600 hover:text-brown-700 hover:border-brown-700 hover:bg-surface-50 text-center block transition-all min-h-[56px] flex items-center justify-center">
                    Masuk
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
