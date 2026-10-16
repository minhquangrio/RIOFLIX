"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieItem } from "@/types/movie";
import {
  History,
  Clock,
  Trash2,
  ChevronLeft,
  Play,
  Loader2,
  Eye,
  Trash,
} from "lucide-react";

interface HistoryItem extends MovieItem {
  watchedAt?: string;
  watchedProgress?: number; // seconds watched
  totalDuration?: number; // total seconds
  episodeNumber?: string | number;
  episodeTitle?: string;
}

function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0p";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}p`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}g${remainMins > 0 ? remainMins + "p" : ""}`;
}

function getProgressPercent(item: HistoryItem): number {
  if (!item.totalDuration || item.totalDuration <= 0) return 0;
  const pct = ((item.watchedProgress || 0) / item.totalDuration) * 100;
  return Math.min(Math.max(pct, 0), 100);
}

function LichSuContent() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rioflix_watch_history") || localStorage.getItem("onflix_watch_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Sort by most recently watched first
          parsed.sort((a: HistoryItem, b: HistoryItem) => {
            const dateA = a.watchedAt ? new Date(a.watchedAt).getTime() : 0;
            const dateB = b.watchedAt ? new Date(b.watchedAt).getTime() : 0;
            return dateB - dateA;
          });
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse watch history:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("rioflix_watch_history");
    localStorage.removeItem("onflix_watch_history");
    setHistory([]);
    setShowConfirmClear(false);
  };

  const handleRemoveItem = (id: string | number) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("rioflix_watch_history", JSON.stringify(updated));
    localStorage.setItem("onflix_watch_history", JSON.stringify(updated));
  };

  // Group by date for beautiful grouping
  const groupedByDate: Record<string, HistoryItem[]> = {};
  history.forEach((item) => {
    if (item.watchedAt) {
      const date = new Date(item.watchedAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let key: string;
      if (date.toDateString() === today.toDateString()) {
        key = "Hôm nay";
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = "Hôm qua";
      } else {
        key = date.toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
      if (!groupedByDate[key]) groupedByDate[key] = [];
      groupedByDate[key].push(item);
    } else {
      if (!groupedByDate["Khác"]) groupedByDate["Khác"] = [];
      groupedByDate["Khác"].push(item);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-10 bg-zinc-950">
      {/* Hero Header */}
      <div className="relative py-12 md:py-20 px-4 overflow-hidden min-h-[220px] md:min-h-[260px] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative z-20 w-full px-2 md:px-12 lg:pl-32">
          <Link
            href="/"
            className="inline-flex items-center text-zinc-400 hover:text-green-400 mb-4 transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Quay lại trang chủ
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight flex items-center gap-3">
                <History className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
                Lịch sử xem
              </h1>
              <p className="text-zinc-400 mt-2 text-sm md:text-base font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {history.length > 0
                  ? `${history.length} phim đã xem`
                  : "Chưa có phim nào"}
              </p>
            </div>

            {history.length > 0 && (
              <div className="flex items-center gap-3">
                {showConfirmClear ? (
                  <div className="flex items-center gap-2 bg-zinc-900/80 border border-red-500/30 rounded-xl p-2 backdrop-blur-sm">
                    <span className="text-xs text-zinc-300 font-medium px-2">
                      Xóa tất cả?
                    </span>
                    <button
                      onClick={handleClearHistory}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => setShowConfirmClear(false)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-all"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowConfirmClear(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-red-600/20 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 rounded-xl text-xs font-bold transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa lịch sử</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-2 md:px-12 lg:pl-32 mt-4">
        {history.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <Eye className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Chưa có lịch sử xem
            </h3>
            <p className="text-zinc-500 text-sm max-w-md mb-8">
              Những bộ phim bạn đã xem sẽ xuất hiện ở đây. Hãy khám phá kho phim
              của RIOFLIX ngay!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              Khám phá phim ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-8 pb-16">
            {Object.entries(groupedByDate).map(([dateLabel, items]) => (
              <section key={dateLabel}>
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 border-l-4 border-green-500 pl-3">
                  {dateLabel}
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">
                    {items.length} phim
                  </span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {items.map((item) => {
                    const progress = getProgressPercent(item);
                    const watchedText = item.watchedProgress
                      ? `Đã xem: ${formatDuration(item.watchedProgress)}`
                      : "Đã xem";
                    const totalText = item.totalDuration
                      ? formatDuration(item.totalDuration)
                      : "";

                    return (
                      <div
                        key={item.id}
                        className="group relative flex flex-col space-y-1.5"
                      >
                        <Link
                          href={item.linkUrl}
                          className="block focus:outline-none"
                        >
                          {/* Poster */}
                          <div className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-white/5 transition-all duration-300 group-hover:scale-[1.03] group-hover:border-green-500/40 group-hover:shadow-lg group-hover:shadow-green-500/10">
                            <img
                              src={item.posterUrl}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="p-3 rounded-full bg-green-500 text-black transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                                <Play className="w-5 h-5 fill-current translate-x-0.5" />
                              </div>
                            </div>

                            {/* Episode badge */}
                            {item.episodeNumber && (
                              <div className="absolute top-2 left-2 z-10">
                                <span className="rounded-[4px] bg-purple-600/90 px-1.5 py-[2px] text-[10px] md:text-[11px] font-bold text-white shadow-sm border border-white/10 tracking-wide">
                                  {typeof item.episodeNumber === "string"
                                    ? item.episodeNumber
                                    : `Tập ${item.episodeNumber}`}
                                </span>
                              </div>
                            )}

                            {/* Quality badge */}
                            {item.quality && (
                              <div className="absolute top-2 right-2 z-10">
                                <span className="rounded-[4px] bg-zinc-700/80 px-1.5 py-[2px] text-[9px] md:text-[10px] font-medium text-zinc-200 border border-white/5 uppercase">
                                  {item.quality}
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* Info below poster */}
                        <div className="px-0.5 transition-opacity duration-200">
                          <Link href={item.linkUrl}>
                            <h3
                              className="truncate text-[13px] font-semibold text-zinc-100 leading-snug group-hover:text-green-400 transition-colors"
                              title={item.title}
                            >
                              {item.title}
                            </h3>
                          </Link>

                          <div className="mt-2 flex flex-col gap-1.5">
                            {/* Time info */}
                            <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400 leading-none">
                              <span>{watchedText}</span>
                              {totalText && <span>{totalText}</span>}
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-600 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute -top-1.5 -right-1.5 z-20 w-6 h-6 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:border-red-500"
                          title="Xóa khỏi lịch sử"
                        >
                          <Trash className="w-3 h-3 text-zinc-400 hover:text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LichSuPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <LichSuContent />
      <Footer />
      <MobileNav />
    </div>
  );
}
