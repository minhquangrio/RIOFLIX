"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { ActorItem } from "../page";
import { MovieItem } from "@/types/movie";
import { Heart, Share2, Loader2, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ActorDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [actor, setActor] = useState<ActorItem & { biography?: string; birthday?: string; place_of_birth?: string } | null>(null);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState("https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/actors/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.success && data.data?.info) {
            setActor(data.data.info);
            const rawImg = data.data.info.avatar_url || data.data.info.image_url || "";
            setImgSrc(
              rawImg
                ? rawImg.includes("themoviedb.org") || rawImg.includes("tmdb.org")
                  ? rawImg.replace(/\/w\d+\//, "/original/")
                  : rawImg
                : "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg"
            );
            setMovies(data.data.movies || []);
          } else {
            setActor(null);
            setMovies([]);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setActor(null);
          setMovies([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Đã sao chép liên kết diễn viên!"))
        .catch(() => alert("Không thể sao chép liên kết."));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
        <p className="text-sm font-semibold text-zinc-400">Đang tải thông tin diễn viên...</p>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4">
        <Header />
        <Sidebar />
        <div className="pt-32 text-center text-zinc-400">
          <h2 className="text-2xl font-bold text-white mb-2">Không tìm thấy diễn viên</h2>
          <p className="text-sm text-zinc-500 mb-6">Thông tin diễn viên này không tồn tại hoặc đã bị gỡ.</p>
          <Link href="/dien-vien">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all">
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách diễn viên
            </button>
          </Link>
        </div>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="pt-24 pb-16 px-4 md:px-12 lg:pl-32 max-w-7xl mx-auto min-h-screen">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/dien-vien" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-green-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Tất cả diễn viên
          </Link>
        </div>

        {/* Actor Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {/* Avatar Circle */}
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl shrink-0 bg-zinc-900">
            <img
              src={imgSrc}
              alt={actor.name}
              className="w-full h-full object-cover"
              onError={() => setImgSrc("https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg")}
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{actor.name}</h1>
            {actor.original_name && (
              <p className="text-zinc-400 text-lg mb-4 font-medium">{actor.original_name}</p>
            )}

            <div className="space-y-1.5 mb-6 text-sm text-zinc-400">
              {actor.place_of_birth && (
                <p>
                  <span className="text-zinc-500 font-medium">Nơi sinh:</span>{" "}
                  <span className="text-zinc-300 font-medium">{actor.place_of_birth}</span>
                </p>
              )}
              {actor.birthday && (
                <p>
                  <span className="text-zinc-500 font-medium">Ngày sinh:</span>{" "}
                  <span className="text-zinc-300 font-medium">{actor.birthday}</span>
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  isLiked
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700/60"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{isLiked ? "Đã thích" : "Yêu thích"}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-medium transition-all text-sm border border-zinc-700/60"
              >
                <Share2 className="w-5 h-5" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        {actor.biography && (
          <div className="mb-12 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full" />
              Tiểu sử
            </h3>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {actor.biography}
            </p>
          </div>
        )}

        {/* Filmography Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            Phim tham gia ({movies.length})
          </h3>
          {movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <p className="text-zinc-500 italic">Chưa có thông tin phim tham gia.</p>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
