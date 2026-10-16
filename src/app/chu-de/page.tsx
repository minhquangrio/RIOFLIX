/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { getAllTopics, TopicMeta } from "@/lib/onflix-home-data";
import { Search, Hash, Sparkles, ChevronRight, Film, Layers } from "lucide-react";

const CATEGORY_TAGS = [
  "Tất cả",
  "Hành động & Viễn tưởng",
  "Phim Hàn",
  "Cổ trang & Trung Quốc",
  "Lãng mạn",
  "Anime & Hoạt hình",
  "Chất lượng cao",
  "Tuyển tập"
];

function TopicCard({ topic, index }: { topic: TopicMeta; index: number }) {
  const gradients = [
    "from-emerald-900/40 via-zinc-900 to-zinc-950 border-emerald-500/20 hover:border-emerald-500/50",
    "from-blue-900/40 via-zinc-900 to-zinc-950 border-blue-500/20 hover:border-blue-500/50",
    "from-purple-900/40 via-zinc-900 to-zinc-950 border-purple-500/20 hover:border-purple-500/50",
    "from-amber-900/40 via-zinc-900 to-zinc-950 border-amber-500/20 hover:border-amber-500/50",
    "from-rose-900/40 via-zinc-900 to-zinc-950 border-rose-500/20 hover:border-rose-500/50",
    "from-cyan-900/40 via-zinc-900 to-zinc-950 border-cyan-500/20 hover:border-cyan-500/50",
  ];

  const currentGradient = gradients[index % gradients.length];

  return (
    <Link
      href={topic.url}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-b p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10 ${currentGradient}`}
    >
      {/* Background glow effect on hover */}
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-green-500/10 blur-2xl transition-all duration-500 group-hover:bg-green-500/20 group-hover:scale-125" />

      <div>
        {/* Header Tag & Counter */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 px-3 py-1 text-xs font-semibold text-zinc-300 backdrop-blur-sm">
            <Hash className="h-3.5 w-3.5 text-green-400" />
            {topic.tag}
          </span>
          <span className="text-xs font-medium text-zinc-400 bg-black/40 px-2.5 py-1 rounded-full border border-zinc-800">
            {topic.movieCount} phim
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-green-400 line-clamp-2 mb-2">
          {topic.title}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-5 leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* Poster Stack Collage */}
      <div className="mt-2 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center -space-x-3 overflow-hidden p-1">
            {topic.samplePosters.map((poster, i) => (
              <div
                key={i}
                className="relative h-14 w-10 sm:h-16 sm:w-12 flex-shrink-0 overflow-hidden rounded-md border border-zinc-700/80 bg-zinc-800 shadow-md transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ zIndex: 3 - i }}
              >
                <img
                  src={poster}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://image.tmdb.org/t/p/w500/vH5Eb3KtoXnVb6jQ0nbpiEF0BFb.jpg";
                  }}
                />
              </div>
            ))}
            {topic.samplePosters.length === 0 && (
              <div className="h-14 w-10 sm:h-16 sm:w-12 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-600">
                <Film className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Action Button Indicator */}
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-green-400 transition-colors">
            <span>Khám phá</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ChuDePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const allTopics = useMemo(() => getAllTopics(), []);

  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const matchesSearch =
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "Tất cả" || topic.tag === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [allTopics, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-screen pt-24 pb-20 container mx-auto px-4 md:px-8 lg:pl-32">
        {/* Page Hero Header */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-green-950/40 p-6 sm:p-10 border border-zinc-800 shadow-2xl">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 text-xs font-medium text-green-400 mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Tuyển Tập Điện Ảnh Đặc Sắc</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Chủ Đề & <span className="text-green-500">Tuyển Tập Phim</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mb-6">
              Khám phá các bộ sưu tập phim được tuyển chọn theo từng chủ đề độc đáo, giúp bạn dễ dàng tìm thấy những bộ phim phù hợp với gu thưởng thức điện ảnh của riêng mình.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-green-400" />
                <span><strong className="text-white font-bold">{allTopics.length}</strong> Chủ đề đặc sắc</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-green-400" />
                <span>Hàng trăm phim chất lượng cao</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Tìm chủ đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="text-xs sm:text-sm text-zinc-400 self-end sm:self-center">
              Hiển thị <span className="font-bold text-white">{filteredTopics.length}</span> chủ đề
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORY_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedCategory(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tag
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/20 font-bold"
                    : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredTopics.map((topic, idx) => (
              <TopicCard key={topic.slug} topic={topic} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 border-dashed">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy chủ đề phù hợp</h3>
            <p className="text-sm text-zinc-400 mb-6">Thử từ khóa tìm kiếm khác hoặc chuyển danh mục bộ lọc.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tất cả");
              }}
              className="px-5 py-2.5 rounded-xl bg-green-500 text-black font-semibold text-sm hover:bg-green-400 transition-colors"
            >
              Xem tất cả chủ đề
            </button>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
