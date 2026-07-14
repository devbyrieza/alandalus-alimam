"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { User, CreditCard, FileCheck, Calendar, Trophy, CheckCircle, Settings, LogOut, Menu, X, Home, Lock, ClipboardList, ChevronRight, Upload, Shirt, HandCoins, PartyPopper } from "lucide-react";
import { BRANDING } from "@/config/branding";
import Link from "next/link";
import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";
import { canAccessTab, canAccessSeragam, calculateProgressToUnlock, getUnlockMessage, formatStatusDisplay, getNextStep, STATUS_ORDER } from "@/lib/access-control";
import type { StatusProses, TabName } from "@/lib/access-control";
import DashboardTabs from "./components/DashboardTabs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusProses, setStatusProses] = useState<StatusProses>("draft");
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [tipePendaftaran, setTipePendaftaran] = useState("");
  const [loading, setLoading] = useState(true);
  const [seragamLengkap, setSeragamLengkap] = useState(true);
  const [welcomeDayDone, setWelcomeDayDone] = useState(true);
  const [pasFoto, setPasFoto] = useState("");

  const namaDepan = namaLengkap.split(" ")[0] || namaLengkap;
  const statusInfo = formatStatusDisplay(statusProses);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error(`Failed to get session`);
        const sessionData = await sessionRes.json();
        const fallbackName = sessionData.session?.full_name || sessionData.session?.name || sessionData.session?.email || "Pendaftar";

        if (!sessionData.pendaftar_id) {
          setNamaLengkap(fallbackName);
          setStatusProses("draft");
          setLoading(false);
          return;
        }

        const statusRes = await fetch(`/api/pendaftar/status?pendaftar_id=${sessionData.pendaftar_id}&t=${Date.now()}`, { cache: "no-store" });
        if (!statusRes.ok) {
          setNamaLengkap(fallbackName);
          setLoading(false);
          return;
        }

        const userData = await statusRes.json();
        setStatusProses((userData.status_proses || "draft") as StatusProses);
        setNomorPendaftaran(userData.nomor_pendaftaran || "-");
        setNamaLengkap(userData.nama_lengkap || fallbackName);
        setTipePendaftaran(userData.tipe_pendaftaran || "");
        setSeragamLengkap(!!(userData.ukuran_seragam_baju && userData.ukuran_seragam_celana && userData.ukuran_seragam_almamater));

        if (userData.data_lengkap?.pas_foto) setPasFoto(userData.data_lengkap.pas_foto);

        try {
          const wdRes = await fetch(`/api/pendaftar/welcome-day?t=${Date.now()}`);
          if (wdRes.ok) {
            const wdData = await wdRes.json();
            setWelcomeDayDone(!!(wdData.success && wdData.data && wdData.data.data_penginap));
          }
        } catch {}
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const menuItems = [
    { name: "Dashboard Utama", href: "/dashboard/pendaftar", tabName: "data-pribadi" as TabName, icon: Home, active: pathname === "/dashboard/pendaftar" },
    { name: "Pembayaran", href: "/dashboard/pendaftar/pembayaran-pendaftaran", tabName: "pembayaran-pendaftaran" as TabName, icon: CreditCard, active: pathname === "/dashboard/pendaftar/pembayaran-pendaftaran" },
    { name: "Isi Data Lengkap", href: "/dashboard/pendaftar/isi-data-lengkap", tabName: "kelengkapan-berkas" as TabName, icon: ClipboardList, active: pathname === "/dashboard/pendaftar/isi-data-lengkap" },
    { name: "Upload Berkas", href: "/dashboard/pendaftar/upload-berkas", tabName: "upload-berkas" as TabName, icon: Upload, active: pathname === "/dashboard/pendaftar/upload-berkas" },
    { name: "Jadwal Seleksi", href: "/dashboard/pendaftar/undangan-seleksi", tabName: "undangan-seleksi" as TabName, icon: Calendar, active: pathname === "/dashboard/pendaftar/undangan-seleksi" },
    { name: "Pengumuman", href: "/dashboard/pendaftar/pengumuman", tabName: "pengumuman" as TabName, icon: Trophy, active: pathname === "/dashboard/pendaftar/pengumuman" },
    { name: "Daftar Ulang", href: "/dashboard/pendaftar/daftar-ulang", tabName: "daftar-ulang" as TabName, icon: CheckCircle, active: pathname === "/dashboard/pendaftar/daftar-ulang" },
    { name: "Ukuran Seragam", href: "/dashboard/pendaftar/seragam", tabName: "ukuran-seragam" as TabName, icon: Shirt, active: pathname === "/dashboard/pendaftar/seragam" },
    { name: "Welcome Day", href: "/dashboard/pendaftar/welcome-day", tabName: "welcome-day" as TabName, icon: PartyPopper, active: pathname === "/dashboard/pendaftar/welcome-day" },
    { name: "Keuangan (ZAD)", href: "http://localhost:3001/wali-santri", tabName: "kartu-jajan" as TabName, icon: HandCoins, active: pathname === "/dashboard/pendaftar/keuangan" },
    { name: "Profil Akun", href: "/dashboard/pendaftar/profil", tabName: "profil" as TabName, icon: Settings, active: pathname === "/dashboard/pendaftar/profil" },
  ];

  const isTabAccessible = (tabName: TabName) => tabName === "ukuran-seragam" ? canAccessSeragam(statusProses, nomorPendaftaran) : canAccessTab(tabName, statusProses);

  const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
    const isAccessible = isTabAccessible(item.tabName);
    const showSeragamBadge = item.tabName === "ukuran-seragam" && !seragamLengkap && ["accepted", "enrolled", "enrolled_full"].includes(statusProses);
    const showWelcomeDayBadge = item.tabName === "welcome-day" && !welcomeDayDone && ["accepted", "enrolled", "enrolled_full"].includes(statusProses);
    const showAnyBadge = showSeragamBadge || showWelcomeDayBadge;

    if (!isAccessible) {
      return (
        <div className="sidebar-link" style={{ opacity: 0.5, cursor: "not-allowed" }}>
          <item.icon size={18} />
          <span style={{ flex: 1 }}>{item.name}</span>
          <Lock size={14} />
        </div>
      );
    }

    return (
      <Link href={item.href} className={`sidebar-link ${item.active ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
        <item.icon size={18} />
        <span style={{ flex: 1 }}>{item.name}</span>
        {showAnyBadge && <span className="badge badge-alpha">Isi!</span>}
      </Link>
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>Loading...</div>;
  }

  const SidebarContent = () => (
    <>
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, var(--secondary), var(--secondary-light))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
             <img src={BRANDING.logoPath} alt="Logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </div>
          <div>
            <h1>{BRANDING.schoolShortName}</h1>
            <p>Pendaftar</p>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Menu Utama</div>
        {menuItems.map((item) => <NavLink key={item.name} item={item} />)}
      </nav>
      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: "white" }}>
            {namaDepan.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{namaDepan}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nomorPendaftaran}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.15)" }}>
          <LogOut size={14} /> Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      <IdleTimeoutTracker />
      <div className="app-layout">
        {/* Mobile header */}
        <div style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, height: 56, background: "var(--primary-dark)", zIndex: 50, padding: "0 16px", alignItems: "center", justifyContent: "space-between" }} className="mobile-header">
          <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Portal Santri</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", padding: 4 }}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop sidebar */}
        <aside className="app-sidebar">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 39 }} />
            <aside className="app-sidebar open" style={{ zIndex: 40 }}>
              <SidebarContent />
            </aside>
          </>
        )}

        {/* Main Content Area */}
        <main className="app-content">
          <header className="page-header">
            <div>
              <h1 style={{ fontSize: 20 }}>Dashboard Pendaftar</h1>
              <p style={{ margin: 0 }}>Panel Utama Pendaftaran</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Link href="/" className="btn btn-ghost btn-sm"><Home size={16} /></Link>
              <span className={`badge ${statusInfo.color.includes('green') ? 'badge-hadir' : statusInfo.color.includes('yellow') ? 'badge-sakit' : 'badge-izin'}`}>{statusInfo.label}</span>
            </div>
          </header>

          <div style={{ padding: "24px", maxWidth: 1200 }}>
            <DashboardTabs statusProses={statusProses} />

            {!seragamLengkap && ["accepted", "enrolled", "enrolled_full"].includes(statusProses) && pathname !== "/dashboard/pendaftar/seragam" && (
              <div className="card" style={{ marginBottom: 24, borderLeft: "4px solid var(--warning)", background: "#fffbeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Shirt size={24} color="var(--warning)" />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: 14, color: "#a16207" }}>Data Ukuran Seragam Belum Diisi!</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#a16207" }}>Harap segera isi ukuran seragam ananda agar dapat diproses tepat waktu.</p>
                  </div>
                  <Link href="/dashboard/pendaftar/seragam" className="btn btn-sm" style={{ background: "var(--warning)", color: "white" }}>Isi Sekarang</Link>
                </div>
              </div>
            )}

            {!welcomeDayDone && ["accepted", "enrolled", "enrolled_full"].includes(statusProses) && pathname !== "/dashboard/pendaftar/welcome-day" && (
              <div className="card" style={{ marginBottom: 24, borderLeft: "4px solid var(--info)", background: "#eff6ff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Calendar size={24} color="var(--info)" />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: 14, color: "#1d4ed8" }}>Konfirmasi Welcome Day Belum Diisi!</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#1d4ed8" }}>Harap konfirmasi kehadiran Welcome Day.</p>
                  </div>
                  <Link href="/dashboard/pendaftar/welcome-day" className="btn btn-sm" style={{ background: "var(--info)", color: "white" }}>Konfirmasi</Link>
                </div>
              </div>
            )}

            <div style={{ marginTop: 24 }}>
              {children}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-header { display: flex !important; }
          .app-content { padding-top: 56px !important; }
        }
      `}</style>
    </>
  );
}
