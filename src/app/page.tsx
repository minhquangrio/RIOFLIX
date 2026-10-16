"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MovieRow } from "@/components/MovieRow";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { heroSlidesData } from "@/lib/mock-data";
import { RIOFLIX_HOME_SECTIONS } from "@/lib/onflix-home-data";
import { MovieItem, HeroSlide } from "@/types/movie";

export default function Home() {
  const [historyMovies, setHistoryMovies] = useState<MovieItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(heroSlidesData);

  useEffect(() => {
    // Read user watch history from localStorage
    try {
      const historyStr = localStorage.getItem("rioflix_watch_history") || localStorage.getItem("onflix_watch_history");
      if (historyStr) {
        const parsed = JSON.parse(historyStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistoryMovies(parsed);
        }
      }
    } catch (e) {}

    // Synchronize latest hero banner slides from onflix.lol
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.slides) && data.slides.length > 0) {
          setHeroSlides(data.slides);
        }
      })
      .catch((err) => {
        console.warn("Failed to sync hero banner from API:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      {/* Top Header Navigation */}
      <Header />

      {/* Desktop Left Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="min-h-screen">
        {/* Featured Hero Carousel Banner */}
        <HeroCarousel slides={heroSlides} />

        {/* Movie Rows Section - 100% Matched 19 Sections from onflix.lat */}
        <div className="space-y-4 pt-4 pb-12">
          {/* Render Watch History if available */}
          {historyMovies.length > 0 && (
            <MovieRow
              title="Lịch sử xem"
              movies={historyMovies}
              viewAllUrl="/lich-su"
            />
          )}

          {/* Render 1:1 Matched Sections from onflix.lat */}
          {RIOFLIX_HOME_SECTIONS.map((section, index) => (
            <MovieRow
              key={index}
              title={section.title}
              movies={section.movies}
              viewAllUrl={section.viewAllUrl}
            />
          ))}
        </div>

        {/* Footer Section */}
        <Footer />
      </main>

      {/* Floating Bottom Navigation Bar for Mobile */}
      <MobileNav />
    </div>
  );
}
