"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MovieItem } from "@/types/movie";
import { Play, ChevronRight, ChevronLeft } from "lucide-react";

interface MovieRowProps {
  title: string;
  movies: MovieItem[];
  viewAllUrl?: string;
}

export function MovieRow({ title, movies, viewAllUrl = "#" }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4 space-y-3 lg:pl-28 pr-2 sm:pr-8 relative">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-5 bg-green-500 rounded-full inline-block" />
          {title}
        </h2>
        <Link
          href={viewAllUrl}
          className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors flex items-center gap-0.5 group"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="relative group/row">
        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/80 hover:bg-green-500 hover:text-black text-white rounded-full border border-white/10 opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-2xl hidden sm:flex items-center justify-center -translate-x-3"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Items Row */}
        <div
          ref={rowRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={movie.linkUrl}
              className="group relative flex flex-col space-y-1.5 focus:outline-none min-w-[135px] w-[135px] sm:min-w-[165px] sm:w-[165px] md:min-w-[185px] md:w-[185px] shrink-0 snap-start"
            >
              {/* Poster Image Container */}
              <div className="relative aspect-[2/3] w-full bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-green-500/20 group-hover:border-green-500/40">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-green-500 text-black transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Quality & Episode Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {movie.isTop10 && (
                    <span className="px-1.5 py-0.5 bg-green-500 text-black font-extrabold text-[9px] rounded shadow">
                      TOP 10
                    </span>
                  )}
                  {movie.quality && (
                    <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-md text-white font-medium text-[9px] rounded border border-white/20">
                      {movie.quality}
                    </span>
                  )}
                </div>

                {movie.episodes && (
                  <div className="absolute bottom-2 right-2 z-10">
                    <span className="px-1.5 py-0.5 bg-zinc-950/90 backdrop-blur-md text-green-400 font-semibold text-[10px] rounded border border-green-500/30">
                      {movie.episodes}
                    </span>
                  </div>
                )}
              </div>

              {/* Movie Title below */}
              <div className="px-0.5 pt-1">
                <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-green-400 transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                {movie.year && (
                  <p className="text-[11px] text-zinc-500 font-medium">{movie.year}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/80 hover:bg-green-500 hover:text-black text-white rounded-full border border-white/10 opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-2xl hidden sm:flex items-center justify-center translate-x-3"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
