"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { fetchMoviesByType } from "@/lib/api";
import { MovieItem } from "@/types/movie";
import { Loader2, Film } from "lucide-react";

export default function PhimLePage() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchMoviesByType("phim-le", 1)
      .then((res) => {
        if (isMounted) {
          setMovies(res);
          setHasMore(res.length >= 20);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    fetchMoviesByType("phim-le", nextPage)
      .then((newMovies) => {
        if (newMovies && newMovies.length > 0) {
          setMovies((prev) => [...prev, ...newMovies]);
          setPage(nextPage);
          setHasMore(newMovies.length >= 20);
        } else {
          setHasMore(false);
        }
        setLoadingMore(false);
      })
      .catch(() => {
        setHasMore(false);
        setLoadingMore(false);
      });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-screen pt-20 pb-20 container mx-auto px-4 md:px-8 lg:pl-28">
        <div className="mb-8 border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl border border-green-500/20">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Phim Lẻ Chiếu Rạp
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Kho phim lẻ, phim điện ảnh, bom tấn chiếu rạp 4K mới nhất.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
            <p className="text-sm font-semibold text-zinc-400">Đang tải danh sách phim lẻ...</p>
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loadingMore={loadingMore}
          />
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
