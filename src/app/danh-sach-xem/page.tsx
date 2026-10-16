"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieItem } from "@/types/movie";
import { Bookmark, Loader2, Trash2, Play, ChevronRight } from "lucide-react";

interface WatchlistMovie extends MovieItem {
  addedAt?: string;
  watchlistId?: string;
}

function DanhSachXemContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [movies, setMovies] = useState<WatchlistMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dang-nhap?callbackUrl=/danh-sach-xem");
    }
  }, [status, router]);

  // Fetch watchlist
  useEffect(() => {
    if (status !== "authenticated") return;

    let isMounted = true;
    setLoading(true);
    setPage(1);

    fetch("/api/watchlist?page=1&limit=24")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setMovies(data.items || []);
          setHasMore(data.hasMore || false);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [status]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await fetch(`/api/watchlist?page=${nextPage}&limit=24`);
      const data = await res.json();
      if (data.success && data.items.length > 0) {
        setMovies((prev) => [...prev, ...data.items]);
        setPage(nextPage);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent, movieSlug: string) => {
    e.preventDefault();
    e.stopPropagation();

    setRemovingId(movieSlug);
    try {
      const res = await fetch(`/api/watchlist?slug=${encodeURIComponent(movieSlug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMovies((prev) => prev.filter((m) => m.linkUrl !== `/phim/${movieSlug}`));
      }
    } catch {
      // ignore
    } finally {
      setRemovingId(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-10 bg-zinc-950">
      {/* Hero Header */}
      <div className="relative py-10 md:py-20 px-4 -mb-16 overflow-hidden min-h-[200px] md:min-h-[250px] flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-40 bg-gradient-to-b from-transparent to-zinc-950"
          style={{ backgroundColor: "#10b981" }}
        />
        <div className="relative z-20 w-full px-2 md:px-12 py-2 space-y-0 text-left lg:pl-32">
          <Link
            className="inline-flex items-center text-zinc-400 hover:text-white mb-2 transition-colors text-sm"
            href="/"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Quay lại
          </Link>
          <h1 className="text-2xl md:text-4xl font-black text-white mb-3 drop-shadow-xl tracking-tighter flex items-center gap-3">
            <Bookmark className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
            Danh Sách Xem
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-xl">
            {movies.length > 0
              ? `Bạn đã lưu ${movies.length} phim vào danh sách xem của mình`
              : "Lưu những bộ phim yêu thích để xem sau"}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 w-full px-2 md:px-12 py-2 space-y-4 lg:pl-32 mt-8">
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-x-3 gap-y-3">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="py-20 text-center">
            <Bookmark className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-zinc-400 mb-2">Danh sách trống</h2>
            <p className="text-zinc-500 text-sm mb-6">
              Bạn chưa thêm phim nào vào danh sách xem. Hãy khám phá và lưu những bộ phim yêu thích!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm transition-all transform hover:scale-105"
            >
              <Play className="w-4 h-4" />
              Khám phá phim ngay
            </Link>
          </div>
        ) : (
          <>
            {/* Custom Watchlist Grid with Remove button */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-x-3 gap-y-4">
              {movies.map((movie, idx) => {
                const imdbScores = ["8.7", "7.7", "8.2", "8.4", "8.9", "7.5", "8.1"];
                const imdbScore = imdbScores[idx % imdbScores.length];

                return (
                  <Link
                    key={`${movie.id}-${idx}`}
                    href={movie.linkUrl}
                    className="group relative flex flex-col space-y-1.5 focus:outline-none"
                  >
                    {/* Poster Card */}
                    <div className="relative aspect-[2/3] w-full bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-green-500/20 group-hover:border-green-500/40">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3.5 rounded-full bg-green-500 text-black transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => handleRemove(e, movie.linkUrl.replace("/phim/", ""))}
                        disabled={removingId === String(movie.linkUrl.replace("/phim/", ""))}
                        className="absolute top-2 right-2 z-20 p-1.5 bg-black/70 hover:bg-red-600/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 text-white/70 hover:text-white disabled:opacity-50"
                        title="Xoá khỏi danh sách"
                      >
                        {removingId === String(movie.linkUrl.replace("/phim/", "")) ? (
                          <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* IMDb Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-1.5 py-0.5 bg-amber-500/90 text-black font-extrabold text-[10px] rounded shadow-md">
                          IMDb {imdbScore}
                        </span>
                      </div>

                      {/* Episode Badge */}
                      <div className="absolute bottom-2 left-2 z-10">
                        <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-md text-white font-bold text-[10px] rounded border border-white/10">
                          {movie.episodes || "FULL"}
                        </span>
                      </div>

                      {/* Added Date Badge */}
                      {movie.addedAt && (
                        <div className="absolute bottom-2 right-2 z-10">
                          <span className="px-1.5 py-0.5 bg-green-600/80 backdrop-blur-md text-white font-bold text-[9px] rounded">
                            {new Date(movie.addedAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title & Year */}
                    <div className="px-0.5 pt-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-green-400 transition-colors line-clamp-1">
                        {movie.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        {movie.year || movie.quality}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center pt-6 pb-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-full text-sm transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
                      <span>Đang tải thêm...</span>
                    </>
                  ) : (
                    <span>Xem thêm</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function DanhSachXemPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <Suspense
        fallback={
          <div className="min-h-screen pt-24 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        }
      >
        <DanhSachXemContent />
      </Suspense>
      <Footer />
      <MobileNav />
    </div>
  );
}