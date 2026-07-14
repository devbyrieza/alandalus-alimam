"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardCheck, Calendar, LogOut, Menu, X, Shield, ChevronRight, UserCheck, ShieldCheck, Home } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import IdleTimeoutTracker from "@/components/auth/IdleTimeoutTracker";
import { UserRole, ROLE_LABELS } from "@/lib/access-control";
import { BRANDING } from "@/config/branding";

export default function PengujiDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pengujiName, setPengujiName] = useState("Asatidz");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchPengujiData = async () => {
      try {
        setLoading(true);
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) throw new Error("Failed to get session");

        const sessionData = await sessionRes.json();
        const name = sessionData.session?.full_name || sessionData.full_name || sessionData.user?.user_metadata?.nama || sessionData.user?.user_metadata?.full_name || "Asatidz";
        setPengujiName(name);
        setUserId(sessionData.session?.id || "");
        setUserRole(sessionData.session?.role || "");
        setAvailableRoles(sessionData.availableRoles || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchPengujiData();
  }, []);

  const menuItems = [
    { name: "Beranda", href: "/dashboard/penguji", icon: LayoutDashboard, active: pathname === "/dashboard/penguji" },
    { name: "Jadwal Seleksi Saya", href: "/dashboard/penguji/jadwal", icon: Calendar, active: pathname === "/dashboard/penguji/jadwal" },
    { name: "Input Nilai", href: "/dashboard/penguji/input-nilai", icon: ClipboardCheck, active: pathname === "/dashboard/penguji/input-nilai" },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
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
      } else {
        Swal.fire("Gagal!", data.error || "Gagal berpindah role", "error");
      }
    } catch (error) {
    }
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>Loading...</div>;
  }

  const SidebarContent = () => (
    <>
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, var(--secondary), var(--secondary-light))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
             <ShieldCheck size={24} color="white" />
          </div>
          <div>
            <h1>{BRANDING.schoolShortName}</h1>
            <p>Seleksi Panel</p>
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

        <div className="sidebar-section-title">Navigasi Utama</div>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`sidebar-link ${item.active ? "active" : ""}`}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon size={18} />
            <span style={{ flex: 1 }}>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: "white" }}>
            {pengujiName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pengujiName}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ROLE_LABELS[userRole as UserRole] || userRole}</p>
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
        <div style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, height: 56, background: "var(--primary-dark)", zIndex: 50, padding: "0 16px", alignItems: "center", justifyContent: "space-between" }} className="mobile-header">
          <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Seleksi Panel</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", padding: 4 }}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <aside className="app-sidebar">
          <SidebarContent />
        </aside>

        {sidebarOpen && (
          <>
            <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 39 }} />
            <aside className="app-sidebar open" style={{ zIndex: 40 }}>
              <SidebarContent />
            </aside>
          </>
        )}

        <main className="app-content">
          <header className="page-header">
            <div>
              <h1 style={{ fontSize: 20 }}>Penguji</h1>
              <p style={{ margin: 0 }}>Panel Penilaian</p>
            </div>
            <Link href="/" className="btn btn-ghost btn-sm"><Home size={16} /></Link>
          </header>
          <div style={{ padding: "24px" }}>
            {children}
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
