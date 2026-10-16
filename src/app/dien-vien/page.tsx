"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cleanSlug } from "@/lib/utils";

export interface ActorItem {
  id: number;
  slug: string;
  name: string;
  original_name?: string;
  character?: string;
  avatar_url?: string;
  image_url?: string;
}

function ActorCard({ actor, className = "" }: { actor: ActorItem; className?: string }) {
  const rawImg = actor.avatar_url || actor.image_url || "";
  const [imgSrc, setImgSrc] = useState(
    rawImg
      ? rawImg.includes("themoviedb.org") || rawImg.includes("tmdb.org")
        ? rawImg.replace(/\/w\d+\//, "/original/")
        : rawImg
      : "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg"
  );

  const actorSlug = `${cleanSlug(actor.name)}-${actor.id}`;

  return (
    <Link href={`/dien-vien/${actorSlug}`} className={`group block ${className}`}>
      <div className="relative aspect-square mb-3 overflow-hidden rounded-full bg-zinc-800 border border-zinc-700/50 shadow-lg w-full mx-auto transition-transform group-hover:scale-105">
        <img
          src={imgSrc}
          alt={actor.name}
          className="w-full h-full object-cover"
          onError={() => setImgSrc("https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg")}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="text-center">
        <h3 className="text-white font-medium text-base truncate group-hover:text-green-400 transition-colors">
          {actor.name}
        </h3>
        {actor.character && (
          <p className="text-zinc-500 text-xs truncate mt-0.5">{actor.character}</p>
        )}
        {actor.original_name && actor.original_name !== actor.name && (
          <p className="text-zinc-600 text-xs truncate">{actor.original_name}</p>
        )}
      </div>
    </Link>
  );
}

function DienVienContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [actors, setActors] = useState<ActorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = new URLSearchParams();
    if (query) params.append("q", query);
    params.append("page", pageParam.toString());
    params.append("limit", "24");

    fetch(`/api/actors?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.success) {
            setActors(data.data || []);
            setTotalItems(data.total || 0);
            setTotalPages(data.totalPages || 1);
          } else {
            setActors([]);
            setTotalItems(0);
            setTotalPages(1);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setActors([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [query, pageParam]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", newPage.toString());
    router.push(`/dien-vien?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative z-20 w-full px-4 md:px-12 lg:pl-14 py-2 space-y-0 pt-24 min-h-screen lg:pl-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Diễn viên</h1>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-full aspect-square bg-zinc-800 rounded-full animate-pulse mb-3" />
              <div className="w-2/3 h-4 bg-zinc-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {actors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {actors.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy diễn viên nào</h3>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                disabled={pageParam <= 1}
                onClick={() => handlePageChange(pageParam - 1)}
                className={`p-2 rounded-lg bg-zinc-800 text-white transition-colors ${
                  pageParam <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-700"
                }`}
                aria-label="Trang trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-400 text-sm">
                Trang <span className="text-white font-bold">{pageParam}</span> / {totalPages}
              </div>

              <button
                disabled={pageParam >= totalPages}
                onClick={() => handlePageChange(pageParam + 1)}
                className={`p-2 rounded-lg bg-zinc-800 text-white transition-colors ${
                  pageParam >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-700"
                }`}
                aria-label="Trang tiếp"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function DienVienPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
          </div>
        }
      >
        <DienVienContent />
      </Suspense>
      <Footer />
      <MobileNav />
    </div>
  );
}
