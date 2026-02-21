import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// ✅ IMPORT NAVBAR & FOOTER YANG SUDAH ADA
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FONT CONFIGURATIONS - Using system fonts for reliability
// Using local font display via CSS (see globals.css)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// METADATA CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://pesantren-alimam.com"
      : "http://localhost:3000"),
  ),

  title: {
    default: "Pesantren Al-Imam Al-Islami | PPDB 2026/2027",
    template: "%s | Pesantren Al-Imam Al-Islami",
  },
  description:
    "Pendaftaran Santri Baru Pesantren Al-Imam Al-Islami. Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafush shalih. Sukabumi, Jawa Barat.",
  keywords: [
    "ponpes al-imam",
    "pesantren sukabumi",
    "ppdb 2026",
    "pendaftaran santri",
    "pesantren salafi",
    "tahfidz quran",
    "mts al-imam",
    "ma al-imam",
    "pondok pesantren jawa barat",
    "pesantren salafiyah",
    "pendidikan islam",
  ],

  authors: [{ name: "Pesantren Al-Imam Al-Islami" }],
  creator: "Pesantren Al-Imam Al-Islami",
  publisher: "Pesantren Al-Imam Al-Islami",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Pesantren Al-Imam Al-Islami | PPDB 2026/2027",
    description:
      "Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafush shalih. Daftar sekarang untuk tahun ajaran 2026/2027.",
    url: "https://www.alimamalislami.sch.id",
    siteName: "Pesantren Al-Imam Al-Islami",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pesantren Al-Imam Al-Islami",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pesantren Al-Imam Al-Islami | PPDB 2026/2027",
    description:
      "Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafush shalih.",
    images: ["/twitter-image.jpg"],
    creator: "@alimam_islami",
  },

  verification: {
    google: "your-google-verification-code",
  },

  alternates: {
    canonical: "https://www.alimamalislami.sch.id",
    languages: {
      "id-ID": "https://www.alimamalislami.sch.id",
    },
  },

  category: "education",
  classification: "Islamic Education",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT LAYOUT COMPONENT (✅ DENGAN NAVBAR & FOOTER)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8b5a3c" />
        <meta name="msapplication-navbutton-color" content="#8b5a3c" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className="font-sans antialiased bg-[var(--color-cream-50)] text-[var(--color-text-900)] overflow-x-hidden"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <LayoutWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              forcedTheme="light"
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </LayoutWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}