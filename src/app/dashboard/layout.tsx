// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DASHBOARD LAYOUT - WITH IDLE TIMEOUT TRACKER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Path: src/app/dashboard/layout.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";
import { AlertTriangle, BookOpen, Target, CheckCircle2, XCircle } from "lucide-react";


export default function DashboardLayout({
  children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <AlertTriangle className="w-4 h-4 inline-block mr-1" /> Idle Timeout Tracker - Auto logout setelah 24 jam */}
      <IdleTimeoutTracker />

      {/* Dashboard Content */}
      {children}
    </>
  );
}

// ============================================
// <BookOpen className="w-4 h-4 inline-block mr-1" /> CATATAN:
// ============================================
//
// 1. IdleTimeoutTracker akan otomatis track user activity
// 2. Jika 24 jam tidak ada aktivitas:
//    - Tampilkan warning modal (5 menit sebelum logout)
//    - Auto logout setelah 24 jam
// 3. User bisa klik "Saya Masih Di Sini" untuk reset timer
//
// ============================================
// <Target className="w-4 h-4 inline-block mr-1" /> AKTIVITAS YANG DI-TRACK:
// ============================================
//
// <CheckCircle2 className="w-4 h-4 inline-block mr-1" /> Klik mouse
// <CheckCircle2 className="w-4 h-4 inline-block mr-1" /> Gerak mouse
// <CheckCircle2 className="w-4 h-4 inline-block mr-1" /> Tekan keyboard
// <CheckCircle2 className="w-4 h-4 inline-block mr-1" /> Scroll halaman
// <CheckCircle2 className="w-4 h-4 inline-block mr-1" /> Touch di mobile
//
// <XCircle className="w-4 h-4 inline-block mr-1" /> Buka tab lain (tidak dihitung aktivitas)
// <XCircle className="w-4 h-4 inline-block mr-1" /> Minimize browser (tidak dihitung aktivitas)
