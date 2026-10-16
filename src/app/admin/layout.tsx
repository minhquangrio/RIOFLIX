"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, Users, Film, BarChart3, 
  Settings, LogOut, ChevronLeft, Menu, X,
  Shield
} from "lucide-react";
import { signOut } from "next-auth/react";
import { RioflixLogo } from "@/components/icons";

const navItems = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/nguoi-dung", label: "Người dùng", icon: Users },
  { href: "/admin/phim", label: "Quản lý phim", icon: Film },
  { href: "/admin/cai-dat", label: "Cài đặt SEO", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: { href: string; exact?: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        {!collapsed && <RioflixLogo />}
        {!collapsed && (
          <span className="text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full uppercase tracking-wide">
            Admin
          </span>
        )}
      </div>

      {/* User info */}
      {!collapsed && session?.user && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {session.user.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{session.user.name}</p>
              <p className="text-[11px] text-zinc-400 truncate">{session.user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive(item)
                ? "bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-2 pb-4 border-t border-white/10 pt-3 space-y-1">
        <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all ${collapsed ? "justify-center" : ""}`}>
          <ChevronLeft className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Về trang chủ</span>}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col fixed top-0 left-0 h-full bg-zinc-900/95 border-r border-white/10 backdrop-blur-xl transition-all duration-300 z-40 ${collapsed ? "w-16" : "w-60"}`}>
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors shadow-lg"
        >
          <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-60 bg-zinc-900 border-r border-white/10">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${collapsed ? "lg:pl-16" : "lg:pl-60"}`}>
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <RioflixLogo />
          <span className="text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full uppercase">Admin</span>
        </div>

        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
