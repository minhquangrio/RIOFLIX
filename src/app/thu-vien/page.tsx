"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import {
  ChevronLeft,
  History,
  Bookmark,
  Heart,
  MessageSquare,
  User,
  X,
  Play,
  Film,
} from "lucide-react";

interface LibraryItem {
  id: string | number;
  title: string;
  posterUrl: string;
  linkUrl: string;
}

const DEFAULT_HISTORY_ITEMS: LibraryItem[] = [
  {
    id: "transformers-5",
    title: "Robot Đại Chiến 5: Chiến Binh Cuối Cùng",
    posterUrl:
      "https://pics.onflixcdn.com/vi/image/wh_80/thumbnail/f1e668850faa0690e001e800e5ed4d11.webp",
    linkUrl: "/phim/transformers-chien-binh-cuoi-cung",
  },
  {
    id: "thien-huong",
    title: "Thiên Hương",
    posterUrl:
      "https://pics.onflixcdn.com/vi/image/wh_80/thumbnail/4acc4168c91402ccccb26e8158f1e911.webp",
    linkUrl: "/phim/thien-huong",
  },
  {
    id: "kungfu-nu-tuc",
    title: "Kungfu Nữ Túc (Đội Bóng Nữ Kung Fu)",
    posterUrl:
      "https://phimimg.com/uploads/movies/20260713/kungfu-nu-tuc-doi-bong-nu-kung-fu-poster.webp",
    linkUrl: "/phim/kungfu-nu-tuc-doi-bong-nu-kung-fu",
  },
  {
    id: "sep-oi-mai-dung-gap-nhau",
    title: "Sếp Ơi, Mai Đừng Gặp Nhau!",
    posterUrl:
      "https://pics.onflixcdn.com/vi/image/wh_80/thumbnail/48eb0dbbfe880f8af28ddb1422be2811.webp",
    linkUrl: "/phim/sep-oi-mai-dung-gap-nhau",
  },
  {
    id: "tuoc-cot",
    title: "Tước Cốt",
    posterUrl:
      "https://pics.onflixcdn.com/vi/image/wh_80/thumbnail/873d41568de40383e7d17925c1a15811.webp",
    linkUrl: "/phim/tuoc-cot",
  },
  {
    id: "nghich-thien-ta-than",
    title: "Nghịch Thiên Tà Thần",
    posterUrl:
      "https://pics.onflixcdn.com/vi/image/wh_80/thumbnail/3862ca2f0e050b29ce801df5c69b1811.webp",
    linkUrl: "/phim/nghich-thien-ta-than",
  },
  {
    id: "truy-tim-long-dien-huong",
    title: "Truy Tìm Long Diên Hương",
    posterUrl:
      "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c48088ce24825b1a110c0df76386b07d",
    linkUrl: "/phim/truy-tim-long-dien-huong",
  },
  {
    id: "em-trai",
    title: "Em Trai",
    posterUrl:
      "https://pics.onflixcdn.com/vi/image/wh_80/thumbnail/0753d067e2850272d4b0c175c810db11.webp",
    linkUrl: "/phim/em-trai",
  },
];

type TabType = "history" | "watch_later" | "favorites" | "posts" | "actors";

export default function ThuVienPage() {
  const [activeTab, setActiveTab] = useState<TabType>("history");
  const [historyItems, setHistoryItems] = useState<LibraryItem[]>([]);
  const [watchLaterItems, setWatchLaterItems] = useState<LibraryItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<LibraryItem[]>([]);

  // Load user items from localStorage with fallbacks
  useEffect(() => {
    try {
      // History
      const storedHistory = localStorage.getItem("rioflix_watch_history") || localStorage.getItem("onflix_watch_history");
      if (storedHistory) {
        const parsed = JSON.parse(storedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped: LibraryItem[] = parsed.map((item: any) => ({
            id: item.id || item.slug || item.linkUrl,
            title: item.title || item.name,
            posterUrl: item.posterUrl || item.poster_url || item.thumbUrl,
            linkUrl: item.linkUrl || `/phim/${item.slug || item.id}`,
          }));
          setHistoryItems(mapped);
        } else {
          setHistoryItems(DEFAULT_HISTORY_ITEMS);
        }
      } else {
        setHistoryItems(DEFAULT_HISTORY_ITEMS);
      }

      // Watch Later
      const storedWatchLater = localStorage.getItem("onflix_watch_later");
      if (storedWatchLater) {
        const parsed = JSON.parse(storedWatchLater);
        if (Array.isArray(parsed)) {
          setWatchLaterItems(parsed);
        }
      }

      // Favorites
      const storedFavs = localStorage.getItem("onflix_favorites");
      if (storedFavs) {
        const parsed = JSON.parse(storedFavs);
        if (Array.isArray(parsed)) {
          setFavoriteItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load library items:", e);
      setHistoryItems(DEFAULT_HISTORY_ITEMS);
    }
  }, []);

  // Remove item handler
  const handleRemoveItem = (id: string | number, tab: TabType) => {
    if (tab === "history") {
      const updated = historyItems.filter((item) => item.id !== id);
      setHistoryItems(updated);
      localStorage.setItem("onflix_watch_history", JSON.stringify(updated));
    } else if (tab === "watch_later") {
      const updated = watchLaterItems.filter((item) => item.id !== id);
      setWatchLaterItems(updated);
      localStorage.setItem("onflix_watch_later", JSON.stringify(updated));
    } else if (tab === "favorites") {
      const updated = favoriteItems.filter((item) => item.id !== id);
      setFavoriteItems(updated);
      localStorage.setItem("onflix_favorites", JSON.stringify(updated));
    }
  };

  const tabs = [
    { id: "history" as TabType, label: "Lịch sử", icon: History },
    { id: "watch_later" as TabType, label: "Xem sau", icon: Bookmark },
    { id: "favorites" as TabType, label: "Yêu thích", icon: Heart },
    { id: "posts" as TabType, label: "Bài viết", icon: MessageSquare },
    { id: "actors" as TabType, label: "Diễn viên", icon: User },
  ];

  const getActiveTabItems = () => {
    switch (activeTab) {
      case "history":
        return historyItems;
      case "watch_later":
        return watchLaterItems;
      case "favorites":
        return favoriteItems;
      default:
        return [];
    }
  };

  const currentItems = getActiveTabItems();

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-[calc(100vh-4rem)] w-full transition-all duration-300 flex flex-col justify-between">
        <div>
          <div className="min-h-screen pt-0 md:pt-0 pb-10 bg-zinc-950">
            {/* Hero Banner Section matching target site exact layout */}
            <div className="relative py-10 md:py-20 px-4 -mb-20 overflow-hidden min-h-[250px] md:min-h-[300px] flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-40 bg-gradient-to-b from-transparent to-zinc-950"
                style={{ backgroundColor: "rgb(59, 130, 246)" }}
              />
              <div className="relative z-20 w-full px-2 md:px-12 lg:pl-14 py-2 space-y-0 text-left lg:pl-32">
                <Link
                  className="inline-flex items-center text-zinc-400 hover:text-white mb-2 transition-colors"
                  href="/"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Quay lại
                </Link>
                <h1 className="text-2xl md:text-4xl font-black text-white mb-6 drop-shadow-xl tracking-tighter">
                  Thư viện của bạn
                </h1>

                {/* Tabs bar */}
                <div className="flex gap-4 border-b border-white/10 w-full overflow-x-auto pb-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                          isActive
                            ? "border-white text-white"
                            : "border-transparent text-zinc-400 hover:text-white hover:border-white/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Grid Content Section */}
            <div className="relative z-20 w-full px-2 md:px-12 lg:pl-14 py-2 space-y-0 lg:pl-32 mt-6">
              {activeTab === "posts" || activeTab === "actors" ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                    {activeTab === "posts" ? (
                      <MessageSquare className="w-8 h-8" />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-300 mb-1">
                    {activeTab === "posts"
                      ? "Chưa có bài viết nào"
                      : "Chưa có diễn viên yêu thích"}
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-sm">
                    {activeTab === "posts"
                      ? "Những bài viết bạn lưu sẽ hiển thị ở đây."
                      : "Những diễn viên bạn theo dõi sẽ hiển thị ở đây."}
                  </p>
                </div>
              ) : currentItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                    <Film className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-300 mb-1">
                    Danh sách trống
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-sm mb-6">
                    {activeTab === "history"
                      ? "Chưa có lịch sử xem nào trong thư viện."
                      : activeTab === "watch_later"
                      ? "Bạn chưa thêm phim nào vào danh sách xem sau."
                      : "Chưa có phim yêu thích trong thư viện."}
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-xs transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Khám phá phim ngay
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-x-3 gap-y-3">
                  {currentItems.map((item) => (
                    <div key={item.id} className="w-full">
                      <div className="group relative block w-full h-full">
                        <Link className="block w-full" href={item.linkUrl}>
                          <div className="aspect-[9/13] w-full overflow-hidden rounded-md bg-zinc-800 relative z-0 transition-opacity duration-300">
                            <img
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              src={item.posterUrl}
                            />
                            {/* Delete button */}
                            <div className="absolute top-2 right-2 z-20">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveItem(item.id, activeTab);
                                }}
                                className="group/btn flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-rose-500 hover:border-rose-500 transition-all shadow-lg"
                                title="Xóa"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="absolute bottom-1 left-1 z-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </div>
                        </Link>
                        <div className="mt-2.5 px-0.5">
                          <h3
                            className="truncate text-[10px] md:text-[14px] font-semibold text-zinc-100 leading-snug transition-colors group-hover:text-green-500"
                            title={item.title}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>

      <MobileNav />
    </div>
  );
}
