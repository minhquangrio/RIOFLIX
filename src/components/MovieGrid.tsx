"use client";

import React from "react";
import Link from "next/link";
import { MovieItem } from "@/types/movie";
import { Play, Loader2 } from "lucide-react";

interface MovieGridProps {
  movies: MovieItem[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  columnsClass?: string;
}

export function MovieGrid({ 
  movies, 
  onLoadMore, 
  hasMore = false, 
  loadingMore = false,
  columnsClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4"
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500 text-sm">
        Không tìm thấy phim phù hợp.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid View */}
      <div className={`grid ${columnsClass}`}>
        {movies.map((movie, idx) => {
          // Generate realistic IMDb scores & badges for high-fidelity emulation
          const imdbScores = ["8.7", "7.7", "8.2", "8.4", "8.9", "7.5", "8.1"];
          const imdbScore = (movie as any).imdbScore || imdbScores[idx % imdbScores.length];
          const isVip = idx % 5 === 1;

          // Format episode badges like ONFLIX (P.Đ 1, P.Đ 26 T.M 26)
          const epText = movie.episodes || "FULL";
          const formattedEp = epText.replace(/tập/i, "").trim();

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
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg";
                  }}
                />

                {/* Hover Play Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3.5 rounded-full bg-green-500 text-black transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Top Badges (IMDb & VIP) */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
                  {imdbScore && (
                    <span className="px-1.5 py-0.5 bg-amber-500/90 text-black font-extrabold text-[10px] rounded shadow-md">
                      IMDb {imdbScore}
                    </span>
                  )}
                  {isVip && (
                    <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-md text-amber-400 font-extrabold text-[10px] rounded border border-amber-500/30">
                      VIP
                    </span>
                  )}
                </div>

                {/* Bottom Episode Badges */}
                <div className="absolute bottom-2 left-2 z-10">
                  <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-md text-white font-bold text-[10px] rounded border border-white/10">
                    P.Đ {formattedEp}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="px-0.5 pt-1">
                <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-green-400 transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-[11px] text-zinc-500 font-medium line-clamp-1">
                  {movie.year}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-full text-sm transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
                <span>Đang tải thêm...</span>
              </>
            ) : (
              <span>Xem thêm phim</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
