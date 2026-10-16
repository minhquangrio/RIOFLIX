"use client";

import React, { useState, useEffect, use } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { fetchMoviesByCountry } from "@/lib/api";
import { getMoviesByCountrySlug } from "@/lib/mock-data";
import { MovieItem } from "@/types/movie";
import { cleanSlug } from "@/lib/utils";
import { Loader2, Globe } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CountryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug;
  const decodedSlug = cleanSlug(rawSlug);

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const countryName = rawSlug
    ? decodeURIComponent(rawSlug)
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Quốc Gia";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setPage(1);

    fetchMoviesByCountry(decodedSlug, 1)
      .then((res) => {
        if (isMounted) {
          const finalMovies = res && res.length > 0 ? res : getMoviesByCountrySlug(decodedSlug);
          setMovies(finalMovies);
          setHasMore(res.length >= 20);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMovies(getMoviesByCountrySlug(decodedSlug));
          setHasMore(false);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [decodedSlug]);

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    fetchMoviesByCountry(decodedSlug, nextPage)
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
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Phim Quốc Gia: <span className="text-green-500">{countryName}</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Danh sách những bộ phim hay sản xuất từ {countryName}.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
            <p className="text-sm font-semibold text-zinc-400">Đang tải danh sách phim...</p>
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
