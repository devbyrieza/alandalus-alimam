"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  User,
  CreditCard,
  FileCheck,
  Calendar,
  Trophy,
  CheckCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Lock,
  Loader2,
  Download,
  Upload,
  ClipboardList,
  ChevronRight,
  ShieldCheck,
  Bell,
  Search,
  School
} from "lucide-react";
import Link from "next/link";
import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";
import {
  canAccessTab,
  calculateProgressToUnlock,
  getUnlockMessage,
  formatStatusDisplay,
  getNextStep,
  STATUS_ORDER,
  type StatusProses,
  type TabName,
} from "@/lib/access-control";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusProses, setStatusProses] = useState<StatusProses>("draft");
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [loading, setLoading] = useState(true);

  // Extract first name for greeting
  const namaDepan = namaLengkap.split(' ')[0] || namaLengkap;

  // Get formatted status
  const statusInfo = formatStatusDisplay(statusProses);
  const nextStep = getNextStep(statusProses);

  // Fetch user status dari database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // 1. Get session
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Failed to get session");

        const sessionData = await sessionRes.json();
        if (!sessionData.pendaftar_id) {
          console.warn("No pendaftar_id in session");
          setLoading(false);
          return;
        }
        const fallbackName =
          sessionData.full_name || sessionData.name || sessionData.email || "Pendaftar";

        // 2. Get user status
        const statusRes = await fetch(
          `/api/pendaftar/status?pendaftar_id=${sessionData.pendaftar_id}`,
        );

        if (!statusRes.ok) {
          // Fallback
          const fallbackRes = await fetch("/api/pendaftar/current-status");
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            setStatusProses(fallbackData.status_proses || "draft");
            setNomorPendaftaran(fallbackData.nomor_pendaftaran || "MTI20260006");
            setNamaLengkap(fallbackData.nama_lengkap || fallbackName);
            setLoading(false);
            return;
          }
          throw new Error("All status endpoints failed");
        }

        const userData = await statusRes.json();
        setStatusProses((userData.status_proses || "draft") as StatusProses);
        setNomorPendaftaran(userData.nomor_pendaftaran || "MTI20260006");
        setNamaLengkap(userData.nama_lengkap || fallbackName);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setStatusProses("draft");
        setNomorPendaftaran("MTI20260006");
        setNamaLengkap("Pendaftar");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    {
      name: "Data Pribadi",
      href: "/dashboard/pendaftar",
      tabName: "data-pribadi" as TabName,
      icon: User,
      active: pathname === "/dashboard/pendaftar",
    },
    {
      name: "Pembayaran",
      href: "/dashboard/pendaftar/pembayaran-pendaftaran",
      tabName: "pembayaran-pendaftaran" as TabName,
      icon: CreditCard,
      active: pathname === "/dashboard/pendaftar/pembayaran-pendaftaran",
    },
    {
      name: "Isi Data Lengkap",
      href: "/dashboard/pendaftar/kelengkapan-berkas",
      tabName: "kelengkapan-berkas" as TabName,
      icon: ClipboardList,
      active: pathname === "/dashboard/pendaftar/kelengkapan-berkas",
    },
    {
      name: "Upload Berkas",
      href: "/dashboard/pendaftar/upload-berkas",
      tabName: "upload-berkas" as TabName,
      icon: Upload,
      active: pathname === "/dashboard/pendaftar/upload-berkas",
    },

    {
      name: "Undangan Seleksi",
      href: "/dashboard/pendaftar/undangan-seleksi",
      tabName: "undangan-seleksi" as TabName,
      icon: Calendar,
      active: pathname === "/dashboard/pendaftar/undangan-seleksi",
    },
    {
      name: "Pengumuman",
      href: "/dashboard/pendaftar/pengumuman",
      tabName: "pengumuman" as TabName,
      icon: Trophy,
      active: pathname === "/dashboard/pendaftar/pengumuman",
    },
    {
      name: "Daftar Ulang",
      href: "/dashboard/pendaftar/daftar-ulang",
      tabName: "daftar-ulang" as TabName,
      icon: CheckCircle,
      active: pathname === "/dashboard/pendaftar/daftar-ulang",
    },
    {
      name: "Profil Akun",
      href: "/dashboard/pendaftar/profil",
      tabName: "profil" as TabName,
      icon: Settings,
      active: pathname === "/dashboard/pendaftar/profil",
    },
  ];

  // Function untuk cek apakah tab bisa diakses
  const isTabAccessible = (tabName: TabName) => {
    return canAccessTab(tabName, statusProses);
  };

  // NavLink component dengan conditional rendering
  const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
    const isAccessible = isTabAccessible(item.tabName);
    const progressToUnlock = calculateProgressToUnlock(item.tabName, statusProses);
    const unlockMessage = getUnlockMessage(item.tabName);

    if (!isAccessible) {
      return (
        <div className="px-3 py-1 group relative">
          <div
            className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-ink-400 bg-surface-50 border border-transparent cursor-not-allowed group-hover:border-surface-200 transition-all"
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="flex-1 truncate">{item.name}</span>
            <Lock className="w-4 h-4 text-ink-300 group-hover:text-ink-500 transition-colors" />
          </div>

          {/* Tooltip for locked state */}
          <div className="absolute left-14 top-full z-50 w-64 p-3 mt-2 text-xs text-white bg-ink-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 lg:left-full lg:top-0 lg:ml-2">
            <div className="font-bold mb-1 flex items-center gap-2">
              <Lock className="w-3 h-3 text-gold-400" />
              <span>Akses Terkunci</span>
            </div>
            <p className="text-ink-300 mb-2">{unlockMessage}</p>
            <div className="w-full h-1 bg-ink-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-500 rounded-full"
                style={{ width: `${progressToUnlock}%` }}
              />
            </div>
            <p className="text-right text-[10px] text-ink-400 mt-1">{progressToUnlock}% Selesai</p>
          </div>
        </div>
      );
    }

    return (
      <div className="px-3 py-1">
        <Link
          href={item.href}
          className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.active
            ? "bg-brown-700 text-white shadow-lg shadow-brown-200"
            : "text-ink-600 hover:bg-brown-50 hover:text-brown-700"
            }`}
        >
          <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${item.active ? 'text-white' : 'text-ink-400 group-hover:text-brown-600'}`} />
          <span className="flex-1 truncate">{item.name}</span>

          {item.active && (
            <ChevronRight className="w-4 h-4 text-brown-200" />
          )}
        </Link>
      </div>
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-clay-lg text-center max-w-sm w-full mx-4">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-surface-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-brown-600 rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="w-6 h-6 text-brown-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Memuat Dashboard</h2>
          <p className="text-ink-500 text-sm">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <IdleTimeoutTracker />
      <div className="min-h-screen bg-surface-50 font-sans selection:bg-brown-100 selection:text-brown-900">

        {/* Mobile Header */}
        <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors text-ink-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-ink-500">Dashboard</span>
              <span className="text-sm font-bold text-ink-900 leading-none">Pendaftar</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${statusInfo.color}`}>
              {statusInfo.label}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-600 to-brown-800 flex items-center justify-center text-white text-xs font-bold shadow-md">
              {namaLengkap.charAt(0)}
            </div>
          </div>
        </div>

        <div className="flex relative">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-screen z-50">
            <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-clay-lg">
              {/* Brand */}
              <div className="px-6 pt-8 pb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brown-600 to-brown-800 flex items-center justify-center text-white shadow-lg shadow-brown-200">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="font-black text-xl text-ink-900 leading-none tracking-tight">PPDB <span className="text-brown-700">Al-Imam</span></h1>
                    <p className="text-xs text-ink-500 font-medium mt-1">Tahun Ajaran 2026/2027</p>
                  </div>
                </div>

                {/* User Card */}
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <User className="w-16 h-16 text-brown-600" />
                  </div>
                  <p className="text-xs font-semibold text-ink-500 mb-1">Selamat Datang,</p>
                  <p className="font-bold text-ink-900 truncate mb-2">{namaDepan}</p>
                  <div className="flex items-center gap-2 text-xs text-ink-600 bg-white px-2 py-1 rounded-lg inline-flex shadow-sm border border-surface-100">
                    <span className="font-mono text-brown-700 font-bold">{nomorPendaftaran}</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1 scrollbar-hide">
                <div className="px-3 mb-2">
                  <p className="text-xs font-bold text-ink-400 uppercase tracking-wider">Menu Utama</p>
                </div>
                {menuItems.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-surface-100 bg-white/50 backdrop-blur-sm">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-white border border-red-100 hover:bg-red-50 hover:border-red-200 rounded-xl transition-all shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Akun</span>
                </button>
                <p className="text-[10px] text-center text-ink-400 mt-4">
                  &copy; 2026 Ponpes Al-Imam Al-Islami
                </p>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className={`absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              {/* Mobile Sidebar Content */}
              <div className="flex flex-col h-full overflow-hidden">
                <div className="p-6 border-b border-surface-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brown-700 flex items-center justify-center text-white">
                      <School className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-ink-900">PPDB Al-Imam</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 text-ink-400 hover:text-ink-900">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 bg-brown-50">
                  <p className="text-xs font-bold text-brown-800 mb-1">PENDAFTAR:</p>
                  <p className="font-bold text-ink-900">{namaDepan}</p>
                  <p className="font-mono text-xs text-ink-500">{nomorPendaftaran}</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {menuItems.map((item) => (
                    <div key={item.name} onClick={() => isTabAccessible(item.tabName) && setSidebarOpen(false)}>
                      <NavLink item={item} />
                    </div>
                  ))}
                </nav>

                <div className="p-4 border-t border-surface-100">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" /> Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 lg:pl-72 w-full transition-all duration-300">
            {/* Desktop Topbar - Glass Effect */}
            <header className="hidden lg:flex sticky top-4 z-30 mx-8 mt-4 rounded-2xl glass px-6 py-4 items-center justify-between shadow-clay-sm border border-white/40">
              <div>
                <h2 className="text-xl font-bold text-ink-900">Dashboard Pendaftar</h2>
                <p className="text-sm text-ink-500">Panel Pendaftaran Santri Baru</p>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/" className="p-2 text-ink-400 hover:text-brown-600 transition-colors" title="Ke Beranda">
                  <Home className="w-5 h-5" />
                </Link>

                <div className="h-8 w-px bg-ink-200" />

                {/* Status Badge */}
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full border ${statusInfo.color.replace('text-', 'border-').replace('bg-', 'bg-opacity-10 ')} bg-opacity-10`}>
                  <div className={`w-2 h-2 rounded-full ${statusInfo.color.split(' ')[1].replace('text-', 'bg-')}`} />
                  <span className="text-sm font-bold">{statusInfo.label}</span>
                </div>
              </div>
            </header>

            {/* Content Wrapper */}
            <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
