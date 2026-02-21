"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    FileCheck,
    CreditCard,
    Calendar,
    Trophy,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
    Shield,
    FileText,
    Search,
    Bell,
    PanelLeft,
    BarChart,
    ClipboardEdit,
    UserCog
} from "lucide-react";
import Link from "next/link";
import { getMenuItemsForRole, UserRole } from "@/lib/access-control";

// Map icon strings to components
const ICON_MAP: Record<string, any> = {
    LayoutDashboard,
    Users,
    FileCheck,
    CreditCard,
    Calendar,
    Trophy,
    Settings,
    FileText,
    BarChart,
    ClipboardEdit,
    UserCog
};

interface AdminSidebarProps {
    children: React.ReactNode;
    userRole: UserRole | null;
    adminName: string;
}

export default function AdminSidebar({ children, userRole, adminName }: AdminSidebarProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const rawMenuItems = userRole ? getMenuItemsForRole(userRole) : [];

    const menuItems = rawMenuItems.map(item => ({
        ...item,
        icon: ICON_MAP[item.icon] || LayoutDashboard, // Fallback icon
        active: pathname === item.href
    }));

    const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
        return (
            <Link
                href={item.href}
                className={`nav-link group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${item.active
                    ? "active bg-white text-teal-600 shadow-clay-sm"
                    : "text-ink-500 hover:bg-surface-50 hover:text-ink-900"
                    }`}
            >
                <item.icon className={`w-5 h-5 transition-colors ${item.active ? 'text-teal-500' : 'text-ink-400 group-hover:text-ink-600'}`} />
                <span className="flex-1 font-medium text-sm">{item.name}</span>
                {item.active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                )}
            </Link>
        );
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="min-h-screen font-sans bg-surface-100/50">
            {/* Mobile Header (Glass) */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 -ml-2 rounded-xl text-ink-600 hover:bg-surface-100"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <span className="font-bold text-ink-900">Panel Admin</span>

                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {adminName.charAt(0)}
                </div>
            </div>

            <div className="flex items-start">
                {/* Desktop Sidebar (Glass Panel) */}
                <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-50">
                    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-clay-lg">
                        {/* Brand Area */}
                        <div className="px-6 py-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-lg text-ink-900 leading-tight">Panel <span className="text-teal-600">Admin</span></h1>
                                    <p className="text-xs text-ink-400 font-medium tracking-wide">Al-Imam PPDB</p>
                                </div>
                            </div>

                            {/* Search Bar - Aesthetic Only */}
                            <div className="relative group">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-ink-400 group-focus-within:text-teal-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Cari menu..."
                                    className="w-full bg-surface-50 border-0 rounded-xl pl-9 pr-4 py-2 text-sm text-ink-800 placeholder:text-ink-400 focus:ring-2 focus:ring-teal-500/10 focus:bg-white transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-hide py-2">
                            <p className="px-4 text-xs font-bold text-ink-400 uppercase tracking-wider mb-2 mt-2">Menu Utama</p>
                            {menuItems.map((item) => (
                                <NavLink key={item.name} item={item} />
                            ))}
                        </nav>

                        {/* User Profile / Footer */}
                        <div className="p-4 border-t border-ink-100/50 bg-white/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white transition-colors cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center text-ink-600 font-bold group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                    {adminName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-ink-900 truncate">{adminName}</p>
                                    <p className="text-xs text-ink-500 truncate capitalize">
                                        {userRole?.replace('_', ' ')}
                                    </p>
                                </div>
                                <button onClick={handleLogout} className="p-2 text-ink-400 hover:text-red-600 transition-colors" title="Logout">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Sidebar Overlay */}
                <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className="absolute inset-0 bg-ink-900/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <div className={`absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="flex flex-col h-full bg-white">
                            <div className="p-6 flex items-center justify-between border-b border-surface-100">
                                <span className="font-bold text-xl text-ink-900">Menu</span>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 bg-surface-100 rounded-full text-ink-500">
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
                            <div className="p-4 border-t border-surface-100">
                                <button onClick={handleLogout} className="w-full btn-secondary text-red-600 bg-red-50 border-red-100 hover:bg-red-100 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2">
                                    <LogOut className="w-4 h-4" /> Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 lg:pl-72 min-w-0 transition-all duration-300">
                    {/* Desktop Topbar - Floating Glass */}
                    <header className="hidden lg:flex sticky top-4 z-30 mx-8 mt-4 rounded-2xl glass px-6 py-3 items-center justify-between shadow-clay-sm border border-white/40">
                        <div className="flex items-center gap-4">
                            <button onClick={() => { }} className="text-ink-400 hover:text-ink-600"><PanelLeft className="w-5 h-5" /></button>
                            <div className="h-4 w-px bg-ink-200" />
                            <div className="flex items-center gap-2 text-sm text-ink-500">
                                <Home className="w-4 h-4" />
                                <span className="opacity-50">/</span>
                                <span className="font-medium text-ink-900">Dashboard</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-ink-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-ink-100">
                                <Link href="/" className="text-sm font-medium text-teal-600 hover:underline">Lihat Website</Link>
                            </div>
                        </div>
                    </header>

                    {/* Content Wrapper */}
                    <div className="pt-16 lg:pt-0 p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
