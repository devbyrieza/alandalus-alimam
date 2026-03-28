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
    default: "Pesantren Al-Andalus Al-Imam | PPDB 2026/2027",
    template: "%s | Pesantren Al-Andalus Al-Imam",
  },
  description:
    "Pendaftaran Santri Baru Pesantren Al-Andalus Al-Imam. Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafush shalih. Sukabumi, Jawa Barat.",
  keywords: [
    "Ponpes Al-Andalus Al-Imam",
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

  authors: [{ name: "Pesantren Al-Andalus Al-Imam" }],
  creator: "Pesantren Al-Andalus Al-Imam",
  publisher: "Pesantren Al-Andalus Al-Imam",

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
    title: "Pesantren Al-Andalus Al-Imam | PPDB 2026/2027",
    description:
      "Pendidikan berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafush shalih. Daftar sekarang untuk tahun ajaran 2026/2027.",
    url: "https://www.pesantren-alimam.com",
    siteName: "Pesantren Al-Andalus Al-Imam",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pesantren Al-Andalus Al-Imam",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pesantren Al-Andalus Al-Imam | PPDB 2026/2027",
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
        <meta name="color-scheme" content="light only" />
      </head>
      <body
        className="font-sans antialiased bg-white text-ink-900 overflow-x-hidden transition-colors duration-500"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}