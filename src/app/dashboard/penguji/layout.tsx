"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Calendar,
  LogOut,
  Menu,
  X,
  Home,
  Shield,
  Loader2,
  ChevronRight,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";

export default function PengujiDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pengujiName, setPengujiName] = useState("Penguji");

  useEffect(() => {
    const fetchPengujiData = async () => {
      try {
        setLoading(true);
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Failed to get session");

        const sessionData = await sessionRes.json();
        if (sessionData.user?.user_metadata?.nama) {
          setPengujiName(sessionData.user.user_metadata.nama);
        }
      } catch (error) {
        console.error("Error fetching penguji data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPengujiData();
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard/penguji",
      icon: LayoutDashboard,
      active: pathname === "/dashboard/penguji",
    },
    {
      name: "Jadwal Ujian Saya",
      href: "/dashboard/penguji/jadwal",
      icon: Calendar,
      active: pathname === "/dashboard/penguji/jadwal",
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
    return (
      <div className="px-3 py-1">
        <Link
          href={item.href}
          className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.active
            ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
            : "text-stone-600 hover:bg-violet-50 hover:text-violet-700"
            }`}
        >
          <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${item.active ? 'text-white' : 'text-stone-400 group-hover:text-violet-600'}`} />
          <span className="flex-1 truncate">{item.name}</span>

          {item.active && (
            <ChevronRight className="w-4 h-4 text-violet-200" />
          )}
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full mx-4">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-stone-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-6 h-6 text-violet-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Memuat Dashboard Penguji</h2>
          <p className="text-stone-500 text-sm">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <IdleTimeoutTracker />
      <div className="min-h-screen bg-stone-50 font-sans selection:bg-violet-100 selection:text-violet-900">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-stone-500">Dashboard</span>
              <span className="text-sm font-bold text-stone-900 leading-none">Penguji</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              {pengujiName.charAt(0)}
            </div>
          </div>
        </div>

        <div className="flex relative">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-screen z-50">
            <div className="flex flex-col h-full bg-white border-r border-stone-200 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
              {/* Brand */}
              <div className="px-6 pt-8 pb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="font-black text-xl text-stone-900 leading-none tracking-tight">Panel <span className="text-violet-600">Penguji</span></h1>
                    <p className="text-xs text-stone-500 font-medium mt-1">Seleksi PPDB</p>
                  </div>
                </div>

                {/* Penguji Info */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <UserCheck className="w-16 h-16 text-violet-600" />
                  </div>
                  <p className="text-xs font-semibold text-stone-500 mb-1">Masuk sebagai,</p>
                  <p className="font-bold text-stone-900 truncate mb-2">{pengujiName}</p>
                  <div className="flex items-center gap-1 text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded-lg inline-flex border border-violet-100">
                    <Shield className="w-3 h-3" />
                    <span className="font-bold">Penguji</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1 scrollbar-hide">
                <div className="px-3 mb-2">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Menu Utama</p>
                </div>
                {menuItems.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-stone-100 bg-stone-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-white border border-red-100 hover:bg-red-50 hover:border-red-200 rounded-xl transition-all shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className={`absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <div className="flex flex-col h-full overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-stone-900">Panel Penguji</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {menuItems.map((item) => (
                    <div key={item.name} onClick={() => setSidebarOpen(false)}>
                      <NavLink item={item} />
                    </div>
                  ))}
                </nav>

                <div className="p-4 border-t border-stone-100">
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
            {/* Desktop Topbar */}
            <header className="hidden lg:flex sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200 px-8 py-4 items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Dashboard Penguji</h2>
                <p className="text-sm text-stone-500">Panel Penilaian Santri</p>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/" className="p-2 text-stone-400 hover:text-violet-600 transition-colors" title="Lihat Website">
                  <Home className="w-5 h-5" />
                </Link>

                <div className="h-8 w-px bg-stone-200" />

                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-700">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-sm font-bold">Akses Penguji</span>
                </div>
              </div>
            </header>

            {/* Content Wrapper */}
            <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
