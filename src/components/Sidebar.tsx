"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  TvMinimal, 
  Tv, 
  LayoutDashboard, 
  Hash, 
  UsersRound, 
  Library, 
  History 
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Trang chủ", href: "/", icon: Home },
    { label: "Phim Hàn", href: "/phim-han", icon: TvMinimal },
    { label: "Phim Trung", href: "/phim-trung", icon: Tv },
    { label: "Duyệt Tìm", href: "/kham-pha", icon: LayoutDashboard },
    { label: "Chủ đề", href: "/chu-de", icon: Hash },
    { label: "Xem Chung", href: "/xem-chung", icon: UsersRound },
    { label: "Thư viện", href: "/thu-vien", icon: Library },
    { label: "Lịch sử", href: "/lich-su", icon: History },
  ];

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-24 z-40 hidden lg:flex flex-col items-center py-6 gap-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={idx}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full py-2.5 gap-1 transition-all duration-200 group relative ${
              isActive ? "text-green-500 font-bold" : "text-zinc-500 hover:text-white"
            }`}
          >
            {/* Green Active Left Indicator */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 bg-green-500 rounded-r-full shadow-[0_0_12px_#22c55e]" />
            )}

            {/* Icon Container */}
            <div
              className={`p-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "bg-green-500/10 text-green-500"
                  : "group-hover:bg-white/10 group-hover:scale-110"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-green-500/20" : ""}`} />
            </div>

            <span className="text-[11px] tracking-wide font-medium">
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
