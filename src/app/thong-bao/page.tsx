"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Bell, Film, Sparkles, CheckCircle2, Flame, ShieldAlert, ArrowLeft } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "update" | "feature" | "system" | "movie";
  link?: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "🔥 Cập nhật tập mới",
      description: "Quang Âm Chi Ngoại vừa ra mắt tập mới với độ phân giải 4K sắc nét!",
      time: "10 phút trước",
      type: "movie",
      link: "/xem-phim/quang-am-chi-ngoai",
      isRead: false,
    },
    {
      id: "2",
      title: "✨ Tính năng Xem Chung (Watch Party)",
      description: "Bạn đã có thể tạo phòng xem phim cùng bạn bè với tính năng đồng bộ video thời gian thực!",
      time: "2 giờ trước",
      type: "feature",
      link: "/xem-chung",
      isRead: false,
    },
    {
      id: "3",
      title: "🎬 Nâng cấp hệ thống phát video",
      description: "Đã tối ưu đường truyền CDN siêu tốc và chuyển đổi luồng phát dự phòng tự động.",
      time: "1 ngày trước",
      type: "system",
      isRead: true,
    },
    {
      id: "4",
      title: "⭐ Danh sách phim mới cập nhật",
      description: "Hàng loạt bom tấn Chiếu Rạp và Phim Bộ Hàn/Trung/Âu Mỹ vừa được bổ sung vào thư viện.",
      time: "2 ngày trước",
      type: "update",
      link: "/kham-pha",
      isRead: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? ({ ...n, isRead: true }) : n));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-screen pt-24 pb-20 lg:pl-28 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-800/80 pb-5">
            <div className="flex items-center gap-3">
              <Link 
                href="/"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                  <Bell className="w-7 h-7 text-green-500" />
                  Thông Báo
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Cập nhật tập phim mới, sự kiện và các tính năng mới nhất từ RIOFLIX.
                </p>
              </div>
            </div>

            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Đánh dấu đã đọc tất cả
            </button>
          </div>

          {/* List of Notifications */}
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  item.isRead 
                    ? "bg-zinc-900/40 border-zinc-800/60 opacity-80" 
                    : "bg-zinc-900/90 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${
                  item.type === "movie" 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                    : item.type === "feature"
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}>
                  {item.type === "movie" ? (
                    <Flame className="w-5 h-5" />
                  ) : item.type === "feature" ? (
                    <Sparkles className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      {item.title}
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                    </h2>
                    <span className="text-[11px] text-zinc-500 shrink-0 font-medium">{item.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  {item.link && (
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 hover:text-green-300 mt-3 transition-colors"
                    >
                      <span>Xem ngay</span>
                      <span>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
