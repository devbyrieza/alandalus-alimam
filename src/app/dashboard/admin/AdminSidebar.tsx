"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Menu, X, ChevronRight, UserCircle } from "lucide-react";
import Swal from "sweetalert2";

import { getMenuItemsForRole, UserRole, ROLE_LABELS } from "@/lib/access-control";
import { BRANDING } from "@/config/branding";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

// ─── ICONS (Imports) ───
import {
  LayoutDashboard, Users, FileCheck, CreditCard, Calendar, Trophy, Settings,
  FileText, BarChart, ClipboardEdit, UserCog, Landmark, Map, Zap, Edit3,
  Activity, PieChart, Shuffle, Shirt, Wallet
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  LayoutDashboard, Users, FileCheck, CreditCard, Calendar, Trophy, Settings,
  FileText, BarChart, ClipboardEdit, UserCog, Landmark, Map, Zap, UserCircle, Edit3,
  Activity, PieChart, Shuffle, Shirt, Wallet
};

interface AdminSidebarProps {
  children: React.ReactNode;
  userRole: UserRole | null;
  adminName: string;
  userId?: string;
  availableRoles?: string[];
  unverifiedPaymentsCount?: number;
  unverifiedDocsCount?: number;
  pendingDataRequestsCount?: number;
}

export default function AdminSidebar({
  children,
  userRole,
  adminName,
  userId,
  availableRoles,
  unverifiedPaymentsCount: initialPaymentsCount = 0,
  unverifiedDocsCount: initialDocsCount = 0,
  pendingDataRequestsCount: initialRequestsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [paymentsCount, setPaymentsCount] = useState(initialPaymentsCount);
  const [docsCount, setDocsCount] = useState(initialDocsCount);
  const [requestsCount, setRequestsCount] = useState(initialRequestsCount);

  useEffect(() => {
    if (!userRole || userRole === "pendaftar") return;
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/admin/sidebar-counts");
        if (res.ok) {
          const data = await res.json();
          setPaymentsCount(data.unverifiedPaymentsCount || 0);
          setDocsCount(data.unverifiedDocsCount || 0);
          setRequestsCount(data.pendingDataRequestsCount || 0);
        }
      } catch (error) {}
    };
    const interval = setInterval(fetchCounts, 60000);
    return () => clearInterval(interval);
  }, [userRole]);

  const rawMenuItems = userRole ? getMenuItemsForRole(userRole) : [];
  const menuItems = rawMenuItems.map((item) => {
    let badgeCount = 0;
    if (item.name === "Verifikasi Pembayaran") badgeCount = paymentsCount;
    else if (item.name === "Verifikasi Dokumen") badgeCount = docsCount;
    else if (item.name === "Perubahan Data" || item.name.includes("Perubahan") || item.name.includes("Edit")) badgeCount = requestsCount;

    return {
      ...item,
      icon: ICON_MAP[item.icon] || LayoutDashboard,
      isActive: pathname === item.href,
      badge: badgeCount,
    };
  });

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Keluar Sekarang?",
      text: "Anda akan diarahkan kembali ke halaman login.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    }
  };

  const handleRoleSwitch = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    try {
      const res = await fetch("/api/auth/select-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile_id: userId, chosen_role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = data.redirectTo;
      }
    } catch (error) {}
  };

  const SidebarContent = () => (
    <>
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, var(--secondary), var(--secondary-light))",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
             <img src={BRANDING.logoPath} alt="Logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </div>
          <div>
            <h1>{BRANDING.schoolShortName}</h1>
            <p>Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {availableRoles && availableRoles.length > 1 && (
          <div style={{ padding: "0 12px", marginBottom: 16 }}>
            <select
              value={userRole || ""}
              onChange={handleRoleSwitch}
              className="form-control"
              style={{ fontSize: 12, padding: "6px 10px" }}
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {ROLE_LABELS[role as UserRole] || role}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="sidebar-section-title">Menu Navigasi</div>
        {menuItems.map((item, idx) => {
          const prevItem = menuItems[idx - 1];
          const showGroupLabel = item.group && (!prevItem || prevItem.group !== item.group);

          return (
            <div key={item.name}>
              {showGroupLabel && <div className="sidebar-section-title" style={{ marginTop: 16 }}>{item.group}</div>}
              <Link
                href={item.href}
                className={`sidebar-link ${item.isActive ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={18} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.badge > 0 && (
                  <span className="badge" style={{ 
                    background: item.isActive ? "white" : "var(--danger)", 
                    color: item.isActive ? "var(--primary-dark)" : "white",
                    padding: "2px 6px",
                    fontSize: 10
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            fontSize: 14, fontWeight: 700, color: "white"
          }}>
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {adminName}
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userRole ? ROLE_LABELS[userRole as UserRole] : "Admin"}
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.15)" }}>
          <LogOut size={14} /> Keluar
        </button>
      </div>
    </>
  );

  return (
    <div className="app-layout">
      {/* Mobile header */}
      <div style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, height: 56, background: "var(--primary-dark)", zIndex: 50, padding: "0 16px", alignItems: "center", justifyContent: "space-between" }} className="mobile-header">
        <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>{BRANDING.schoolShortName}</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", padding: 4 }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="app-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 39 }} />
          <aside className="app-sidebar open" style={{ zIndex: 40 }}>
            <SidebarContent />
          </aside>
        </>
      )}

      <main className="app-content">
        <header className="page-header" style={{ display: "flex", justifyContent: "flex-end" }}>
           <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
             <LanguageSwitcher />
             <Link href="/" className="btn btn-primary btn-sm">Kunjungi Situs</Link>
           </div>
        </header>
        <div style={{ padding: "24px" }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-header { display: flex !important; }
          .app-content { padding-top: 56px !important; }
        }
      `}</style>
    </div>
  );
}
