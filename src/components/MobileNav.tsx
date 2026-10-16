"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Calendar, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Trang chủ", href: "/", icon: Home },
    { label: "Khám Phá", href: "/kham-pha", icon: LayoutDashboard },
    { label: "Lịch Chiếu", href: "/lich-chieu", icon: Calendar },
    { label: "Tài Khoản", href: "/ho-so", icon: User },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 lg:hidden w-auto">
      <div className="flex items-center gap-1 p-1.5 bg-zinc-950/85 backdrop-blur-2xl border border-white/15 rounded-full shadow-2xl shadow-black">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={idx}
              href={item.href}
              className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all duration-200 min-w-[68px] ${
                isActive
                  ? "bg-green-500 text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-105"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[9px] whitespace-nowrap font-medium mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
