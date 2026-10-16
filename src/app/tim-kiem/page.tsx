"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieRow } from "@/components/MovieRow";
import { searchMovies } from "@/lib/api";
import { MovieItem } from "@/types/movie";
import { Loader2, Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!query) {
      setMovies([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    searchMovies(query).then((res) => {
      if (isMounted) {
        setMovies(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <>
      {/* Search Header */}
      <div className="mb-8 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl border border-green-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kết quả tìm kiếm cho: <span className="text-green-500">&quot;{query}&quot;</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Tìm thấy {movies.length} kết quả phim phù hợp.
            </p>
          </div>
        </div>
      </div>

      {/* Search Results Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Đang tìm kiếm phim...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
          <Search className="w-12 h-12 text-zinc-600" />
          <h3 className="text-lg font-bold text-zinc-300">Không tìm thấy kết quả nào</h3>
          <p className="text-xs text-zinc-500 max-w-sm">
            Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả tên phim.
          </p>
        </div>
      ) : (
        <MovieRow title={`Kết quả cho "${query}"`} movies={movies} />
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-screen pt-20 pb-20 container mx-auto px-4 md:px-8 lg:pl-28">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        }>
          <SearchContent />
        </Suspense>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
