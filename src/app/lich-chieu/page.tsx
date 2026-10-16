"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { fetchMoviesByType, fetchLatestMovies } from "@/lib/api";
import { MovieItem } from "@/types/movie";
import { Calendar, ChevronLeft, Clock, Loader2 } from "lucide-react";

const DAYS_OF_WEEK = [
  { id: "t2", label: "Thứ 2", shortLabel: "T2", dayIndex: 1 },
  { id: "t3", label: "Thứ 3", shortLabel: "T3", dayIndex: 2 },
  { id: "t4", label: "Thứ 4", shortLabel: "T4", dayIndex: 3 },
  { id: "t5", label: "Thứ 5", shortLabel: "T5", dayIndex: 4 },
  { id: "t6", label: "Thứ 6", shortLabel: "T6", dayIndex: 5 },
  { id: "t7", label: "Thứ 7", shortLabel: "T7", dayIndex: 6 },
  { id: "cn", label: "C.Nhật", shortLabel: "CN", dayIndex: 0 },
];

function getCurrentDayId(): string {
  const today = new Date().getDay();
  const found = DAYS_OF_WEEK.find((d) => d.dayIndex === today);
  return found ? found.id : "t2";
}

function LichChieuContent() {
  const [activeDay, setActiveDay] = useState<string>(getCurrentDayId());
  const [allMovies, setAllMovies] = useState<MovieItem[]>([]);
  const [dayMovies, setDayMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch real ongoing movies from API across pages
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadInitialData = async () => {
      try {
        // Fetch pages 1 to 5 of series & ongoing movies to get complete schedule data
        const responses = await Promise.all([
          fetchMoviesByType("phim-bo", 1),
          fetchMoviesByType("phim-bo", 2),
          fetchMoviesByType("phim-bo", 3),
          fetchMoviesByType("phim-bo", 4),
          fetchMoviesByType("hoat-hinh", 1),
          fetchMoviesByType("hoat-hinh", 2),
        ]);

        const combined = responses.flat();

        // Deduplicate movies by ID
        const uniqueMap = new Map<string, MovieItem>();
        combined.forEach((m) => {
          const key = String(m.id);
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, m);
          }
        });

        const movieList = Array.from(uniqueMap.values());

        if (isMounted) {
          setAllMovies(movieList.length > 0 ? movieList : await fetchLatestMovies(1));
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          const fallback = await fetchLatestMovies(1);
          setAllMovies(fallback);
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter movies matching selected day of week based on actual API update date (modifiedTime)
  useEffect(() => {
    if (allMovies.length === 0) return;

    const currentDayObj = DAYS_OF_WEEK.find((d) => d.id === activeDay);
    const targetDayIndex = currentDayObj ? currentDayObj.dayIndex : 1;

    // Filter real movies whose updated day matches targetDayIndex
    const filtered = allMovies.filter((movie) => {
      if (!movie.modifiedTime) return false;
      const date = new Date(movie.modifiedTime);
      return !isNaN(date.getTime()) && date.getDay() === targetDayIndex;
    });

    // Fallback: If OPHIM API has fewer movies updated on a specific day in recent pages, fill with next items
    if (filtered.length === 0) {
      const fallbackList = allMovies.filter((m) => {
        const charCode = (String(m.id).charCodeAt(0) || 0) % 7;
        return charCode === targetDayIndex;
      });
      setDayMovies(fallbackList.length > 0 ? fallbackList : allMovies.slice(0, 14));
    } else {
      setDayMovies(filtered);
    }
  }, [activeDay, allMovies]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const newMovies = await fetchMoviesByType("phim-bo", nextPage + 4);
      if (newMovies && newMovies.length > 0) {
        setAllMovies((prev) => {
          const merged = new Map<string, MovieItem>();
          [...prev, ...newMovies].forEach((m) => merged.set(String(m.id), m));
          return Array.from(merged.values());
        });
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-10 bg-zinc-950">
      {/* Hero Header Block */}
      <div className="relative py-10 md:py-20 px-4 -mb-16 overflow-hidden min-h-[250px] md:min-h-[300px] flex items-center justify-center">
        <div 
          className="absolute inset-0 opacity-40 bg-gradient-to-b from-transparent to-zinc-950"
          style={{ backgroundColor: "#f97316" }}
        />
        <div className="relative z-20 w-full px-2 md:px-12 py-2 space-y-0 text-left lg:pl-32">
          <Link
            className="inline-flex items-center text-zinc-400 hover:text-white mb-2 transition-colors text-sm"
            href="/"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Quay lại
          </Link>
          <h1 className="text-2xl md:text-4xl font-black text-white mb-6 drop-shadow-xl tracking-tighter flex items-center gap-3">
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
            Lịch Chiếu Phim
          </h1>

          {/* Days of Week Selection Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DAYS_OF_WEEK.map((day) => {
              const isActive = activeDay === day.id;
              return (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`flex flex-col items-center justify-center min-w-[64px] h-16 rounded-xl border transition-all ${
                    isActive
                      ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20 scale-105"
                      : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <span className="text-xs font-medium uppercase opacity-80">{day.label}</span>
                  <span className="text-lg font-bold">{day.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 w-full px-2 md:px-12 py-2 space-y-0 lg:pl-32 mt-8">
        <div className="flex items-center gap-2 mb-6 text-orange-400">
          <Clock className="w-5 h-5" />
          <span className="text-sm font-medium">Hôm nay có gì mới?</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-x-3 gap-y-3">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <MovieGrid
            movies={dayMovies}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loadingMore={loadingMore}
            columnsClass="grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-x-3 gap-y-3"
          />
        )}
      </div>
    </div>
  );
}

export default function LichChieuPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500 selection:text-black">
      <Header />
      <Sidebar />
      <Suspense
        fallback={
          <div className="min-h-screen pt-24 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        }
      >
        <LichChieuContent />
      </Suspense>
      <Footer />
      <MobileNav />
    </div>
  );
}
