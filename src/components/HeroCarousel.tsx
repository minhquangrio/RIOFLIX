"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HeroSlide } from "@/types/movie";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[50vh] sm:h-[65vh] md:h-[80vh] bg-zinc-950 overflow-hidden group">
      {/* Background Image / Video Player */}
      {slides.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Container */}
            <div className="absolute inset-0">
              {isCurrent && slide.videoUrl ? (
                <video
                  ref={videoRef}
                  src={slide.videoUrl}
                  poster={slide.backdropUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover scale-105"
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-105 group-hover:scale-110"
                  style={{ backgroundImage: `url(${slide.backdropUrl})` }}
                />
              )}
            </div>

            {/* 3D Character Cutout Layer if available */}
            {slide.characterUrl && (
              <div className="absolute top-0 right-0 md:right-16 lg:right-32 bottom-0 w-full md:w-3/5 z-10 pointer-events-none flex items-end justify-end overflow-hidden">
                <img
                  src={slide.characterUrl}
                  alt={slide.title}
                  className={`w-[105%] h-[90%] md:w-auto md:h-full max-w-none object-contain object-bottom transition-all duration-1000 ease-out delay-200 ${
                    isCurrent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  } [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] drop-shadow-2xl`}
                />
              </div>
            )}

            {/* Gradient Overlays for Cinematic Depth */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] md:h-2/3 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10 pointer-events-none" />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-zinc-950/95 via-zinc-950/50 to-transparent z-10 pointer-events-none" />
            <div className="hidden lg:block absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-zinc-950/80 to-transparent z-10 pointer-events-none" />

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
              <div className="w-full h-full px-4 md:px-12 flex flex-col justify-end pb-8 sm:pb-12 lg:pl-28">
                <div className="max-w-2xl space-y-3 md:space-y-5 animate-in slide-in-from-left-10 fade-in duration-700">
                  {/* Title Logo or Title Text */}
                  {slide.titleImageUrl ? (
                    <img
                      src={slide.titleImageUrl}
                      alt={slide.title}
                      className="h-12 sm:h-20 md:h-24 lg:h-32 w-auto max-w-[75%] md:max-w-md object-contain origin-left mb-2 drop-shadow-2xl"
                    />
                  ) : (
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                  )}

                  {/* Metadata Info */}
                  <div className="flex items-center flex-wrap gap-2 text-xs md:text-sm font-medium text-zinc-100">
                    {slide.isTop10 && (
                      <span className="px-2 py-0.5 bg-green-500 text-black font-extrabold text-[11px] rounded shadow-md">
                        TOP 10
                      </span>
                    )}
                    <span className="text-zinc-200">{slide.year}</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-300">{slide.country}</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-green-400 font-semibold">{slide.episodes}</span>
                  </div>

                  {/* Genre Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {slide.genres.map((g, gIdx) => (
                      <span
                        key={gIdx}
                        className="px-2.5 py-1 text-[10px] md:text-xs font-medium text-zinc-200 bg-white/10 border border-white/15 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="hidden lg:block text-zinc-300 text-sm md:text-base max-w-xl line-clamp-3 leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-3 pointer-events-auto">
                    <Link
                      href={slide.linkUrl}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-extrabold rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Xem Ngay</span>
                    </Link>

                    {slide.videoUrl && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 text-zinc-300 hover:border-white hover:text-white bg-zinc-900/60 hover:bg-zinc-800 transition-all backdrop-blur-md"
                        aria-label="Toggle Sound"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Chevrons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/50 hover:bg-green-500 hover:text-black text-white rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hidden md:block lg:left-28 backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/50 hover:bg-green-500 hover:text-black text-white rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hidden md:block backdrop-blur-md"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-4 right-6 md:bottom-6 md:right-10 flex gap-1.5 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-6 h-2 bg-green-500 shadow-[0_0_8px_#22c55e]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
