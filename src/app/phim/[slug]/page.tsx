"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { fetchMovieDetail, fetchLatestMovies } from "@/lib/api";
import { MovieDetail } from "@/lib/mock-data";
import { MovieItem } from "@/types/movie";
import { 
  Play, 
  Heart, 
  Bookmark, 
  Share2, 
  Captions,
  Volume2,
  MessageCircle,
  Server,
  Loader2,
  ChevronDown,
  Film,
  Check
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MovieDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { data: session } = useSession();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"vietsub" | "thuyetminh" | "related" | "actors" | "trailer">("vietsub");
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savingWatchlist, setSavingWatchlist] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState<MovieItem[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchMovieDetail(slug).then((data) => {
      if (isMounted) {
        setMovie(data);
        if (data.serverSources && data.serverSources.length > 0) {
          setActiveServerId(data.serverSources[0].id);
        }
        setLoading(false);
      }
    });

    fetchLatestMovies(1).then((res) => {
      if (isMounted) {
        setRelatedMovies(res.slice(0, 8));
      }
    });

    // Check if movie is in watchlist
    if (session?.user?.id) {
      fetch(`/api/watchlist?action=check&slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.inWatchlist) setIsSaved(true);
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, [slug, session]);

  // Handle save to watchlist
  const handleSave = async () => {
    if (!session?.user?.id) {
      window.location.href = `/dang-nhap?callbackUrl=/phim/${slug}`;
      return;
    }

    if (savingWatchlist) return;

    if (isSaved) {
      // Remove
      setSavingWatchlist(true);
      try {
        const res = await fetch(`/api/watchlist?slug=${encodeURIComponent(slug)}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) setIsSaved(false);
      } catch {}
      finally { setSavingWatchlist(false); }
    } else {
      // Add
      setSavingWatchlist(true);
      try {
        const res = await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieId: movie?.id || slug,
            movieSlug: slug,
            title: movie?.title || slug,
            posterUrl: movie?.posterUrl,
            year: movie?.releaseYear,
            quality: movie?.quality,
            episodes: movie?.episodes,
          }),
        });
        const data = await res.json();
        if (data.success) setIsSaved(true);
      } catch {}
      finally { setSavingWatchlist(false); }
    }
  };

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
        <p className="text-sm font-semibold text-zinc-400">Đang tải thông tin phim từ RIOFLIX...</p>
      </div>
    );
  }

  const vietsubServers = movie?.serverSources?.filter(
    (s) => !s.name.toLowerCase().includes("thuyết minh") && !s.name.toLowerCase().includes("thuyet minh")
  ) || [];

  const thuyetMinhServers = movie?.serverSources?.filter(
    (s) => s.name.toLowerCase().includes("thuyết minh") || s.name.toLowerCase().includes("thuyet minh")
  ) || [];

  const displayServers = activeTab === "thuyetminh" ? (thuyetMinhServers.length > 0 ? thuyetMinhServers : movie.serverSources || []) : (vietsubServers.length > 0 ? vietsubServers : movie.serverSources || []);
  const currentServer = displayServers.find((s) => s.id === activeServerId) || displayServers[0] || movie.serverSources?.[0];
  const currentEpisodesList = currentServer?.episodesList || movie.episodesList || [];
  const currentEp = currentEpisodesList[activeEpisodeIndex] || currentEpisodesList[0];

  const rawSourceUrl = (currentEp as any)?.embedUrl || (currentEp as any)?.m3u8Url || currentServer?.url || movie.videoUrl || "";
  let directM3u8Url = (currentEp as any)?.m3u8Url || "";
  if (!directM3u8Url && rawSourceUrl.includes(".m3u8")) {
    directM3u8Url = rawSourceUrl;
  }
  const proxiedStreamUrl = directM3u8Url ? `/api/stream?url=${encodeURIComponent(directM3u8Url)}` : "";
  const videoSourceUrl = proxiedStreamUrl || rawSourceUrl;

  const handleStartPlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleEpisodeChange = (idx: number) => {
    setActiveEpisodeIndex(idx);
    setIsPlaying(true);
  };

  const handleServerChange = (serverId: string) => {
    setActiveServerId(serverId);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-[calc(100vh-4rem)] w-full transition-all duration-300 flex flex-col justify-between pt-16">
        <div>
          <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Top Backdrop Header */}
            <div className="relative w-full min-h-[25vh] md:min-h-[55vh] flex items-center overflow-hidden">
              <div className="absolute top-0 right-0 w-full md:w-[50%] h-[250px] md:h-full pt-0 md:pt-0 pointer-events-none">
                <img
                  src={movie.backdropUrl}
                  className="w-full h-full object-cover"
                  alt={movie.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/60 md:via-zinc-950/60 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
              </div>

              <div className="absolute inset-0 w-full z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent md:bg-gradient-to-r md:from-zinc-950 md:via-zinc-950/40 pointer-events-none" />

              <div className="relative z-20 container px-4 lg:pl-32 flex flex-col justify-end md:justify-center h-full pt-20 pb-0 md:pb-0 pointer-events-none">
                <div className="max-w-4xl w-full pointer-events-auto">
                  <div className="flex flex-col md:flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
                    <div className="md:hidden shrink-0 mb-2 pt-20">
                      <img
                        src={movie.posterUrl}
                        className="w-40 sm:w-48 rounded-xl shadow-2xl border border-zinc-800 aspect-[2/3] object-cover"
                        alt={movie.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2 md:mb-4">
                        <span className="bg-green-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                          {movie.quality || "FHD"}
                        </span>
                        <span className="text-zinc-300 text-xs md:text-sm font-medium">
                          {movie.releaseYear}
                        </span>
                      </div>
                      <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-1 md:mb-2 line-clamp-2 md:line-clamp-none">
                        {movie.title}
                      </h1>
                      {movie.originalTitle && (
                        <h2 className="text-sm md:text-2xl text-zinc-400 font-medium line-clamp-1 md:line-clamp-none">
                          {movie.originalTitle}
                        </h2>
                      )}
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-green-400 font-medium text-sm md:text-base">
                        <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                        <span>{movie.episodes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="hidden lg:flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-300">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 hidden md:inline">Đạo diễn:</span>
                        <span className="text-white font-medium line-clamp-1">{movie.director}</span>
                      </div>
                      <span className="text-zinc-700 hidden md:inline">|</span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Thời lượng:</span>
                        <span className="text-white font-medium">{movie.duration}</span>
                      </div>
                    </div>

                    <div className="hidden lg:block line-clamp-2 text-zinc-400 text-sm max-w-2xl">
                      <span className="text-zinc-500">Diễn viên: </span>
                      <span className="text-zinc-300">
                        {movie.actors?.join(", ")}
                      </span>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 pt-2 w-full">
                      <Link
                        href={`/xem-phim/${movie.slug}`}
                        className="w-full md:w-auto z-10 relative bg-green-600 hover:bg-green-700 text-white font-bold py-3 md:py-3.5 px-8 rounded flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-green-900/20 text-sm md:text-base whitespace-nowrap overflow-hidden"
                      >
                        <Play className="fill-current w-4 h-4 md:w-5 md:h-5 relative z-10" />
                        <span className="md:hidden relative z-10">XEM NGAY</span>
                        <span className="hidden md:inline relative z-10">CHIẾU PHÁT</span>
                      </Link>

                      <div className="flex justify-center z-10">
                        <div className="flex items-center rounded-lg border border-white/5 overflow-hidden w-full md:w-auto justify-center">
                          <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`group relative flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:bg-white/10 active:bg-white/20 ${
                              isLiked ? "text-red-500" : "text-zinc-300 hover:text-white"
                            }`}
                            title="Yêu thích"
                          >
                            <Heart className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110 ${isLiked ? "fill-current" : ""}`} />
                            <span className="hidden md:inline-block text-xs md:text-sm font-semibold">Thích</span>
                          </button>
                          <div className="w-px h-6 bg-white/10" />
                          <button
                            onClick={handleSave}
                            disabled={savingWatchlist}
                            className={`group relative flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:bg-white/10 active:bg-white/20 disabled:opacity-50 ${
                              isSaved ? "text-green-500" : "text-zinc-300 hover:text-white"
                            }`}
                            title={isSaved ? "Đã lưu vào danh sách xem" : "Xem sau"}
                          >
                            {savingWatchlist ? (
                              <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                            ) : (
                              <Bookmark className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110 ${isSaved ? "fill-current" : ""}`} />
                            )}
                            <span className="hidden md:inline-block text-xs md:text-sm font-semibold">
                              {isSaved ? "Đã lưu" : "Xem sau"}
                            </span>
                          </button>
                          <div className="w-px h-6 bg-white/10" />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.href);
                              alert("Đã sao chép liên kết phim!");
                            }}
                            className="group relative flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:bg-white/10 active:bg-white/20 text-zinc-300 hover:text-white"
                            title="Chia sẻ"
                          >
                            <Share2 className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110" />
                            <span className="hidden md:inline-block text-xs md:text-sm font-semibold">Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Layout (1/3 Left info - 2/3 Right tabs & player) */}
            <div className="lg:pl-32 px-2 py-2 flex flex-col lg:flex-row gap-1 lg:gap-5">
              {/* Left Column: Info & Metadata */}
              <div className="w-full lg:w-1/3 space-y-4 lg:space-y-8 p-1 lg:p-3 h-fit lg:border-r lg:border-zinc-800">
                <div className="space-y-8">
                  {/* Synopsis */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold border-l-4 border-green-600 pl-3 uppercase">
                      Nội dung
                    </h3>
                    <div className="text-zinc-400 leading-relaxed text-sm text-justify">
                      <p>{movie.description}</p>
                    </div>
                  </div>

                  {/* Director & Actors */}
                  <div className="space-y-6 pt-4 border-t border-zinc-800/50">
                    <div>
                      <h4 className="text-zinc-500 mb-2 text-sm font-bold uppercase">Đạo diễn</h4>
                      <p className="text-white text-sm">{movie.director}</p>
                    </div>

                    <div>
                      <h4 className="text-zinc-500 mb-2 text-sm font-bold uppercase">Diễn viên</h4>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {movie.actorsList?.map((actor, idx) => (
                          <div key={idx} className="group flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-2 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-green-600 transition-colors shadow-sm bg-zinc-900">
                              <img
                                src={actor.image_url || "https://image.tmdb.org/t/p/w185/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg"}
                                alt={actor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[11px] font-medium text-zinc-400 group-hover:text-green-500 transition-all line-clamp-2 leading-tight px-1">
                              {actor.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Thể loại */}
                    <div>
                      <h4 className="text-zinc-500 mb-2 text-sm font-bold uppercase">Thể loại</h4>
                      <div className="flex flex-wrap gap-2">
                        {movie.categoriesList?.map((cat, idx) => (
                          <Link
                            key={idx}
                            href={`/the-loai/${cat.slug}`}
                            className="bg-zinc-900 border border-zinc-800 hover:border-green-600 hover:text-green-500 text-zinc-400 px-2 py-1 rounded text-[10px] md:text-xs font-medium transition-all uppercase"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Thông tin thêm */}
                    <div>
                      <h4 className="text-zinc-500 mb-2 text-sm font-bold uppercase">
                        Thông tin thêm
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                          <span className="text-zinc-400">Quốc gia:</span>
                          <span className="text-white text-right font-medium">
                            {movie.countriesList?.map((c, idx) => (
                              <React.Fragment key={idx}>
                                {idx > 0 && ", "}
                                <Link href={`/quoc-gia/${c.slug}`} className="hover:text-green-500 transition-colors">
                                  {c.name}
                                </Link>
                              </React.Fragment>
                            ))}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-400">Năm:</span>
                          <span className="text-white text-right">
                            <Link href={`/nam/${movie.releaseYear}`} className="hover:text-green-500 transition-colors">
                              {movie.releaseYear}
                            </Link>
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-400">Chất lượng:</span>
                          <span className="text-white text-right">{movie.quality}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-zinc-400">Ngôn ngữ:</span>
                          <span className="text-white text-right">{movie.language}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Player & Tabs */}
              <div className="w-full lg:w-2/3 space-y-8">
                <div>
                  {/* Tab list */}
                  <div className="inline-flex items-center w-full justify-start border-b border-zinc-800 bg-transparent p-0 h-auto overflow-x-auto custom-scrollbar">
                    <button
                      onClick={() => {
                        setActiveTab("vietsub");
                        if (vietsubServers.length > 0) setActiveServerId(vietsubServers[0].id);
                        else if (movie.serverSources?.[0]) setActiveServerId(movie.serverSources[0].id);
                      }}
                      className={`justify-center whitespace-nowrap py-2 text-sm border-b-2 px-4 font-bold uppercase flex items-center gap-2 transition-all ${
                        activeTab === "vietsub"
                          ? "border-green-600 text-green-500 bg-transparent"
                          : "border-transparent text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Captions className="w-4 h-4" />
                      Phụ Đề
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("thuyetminh");
                        if (thuyetMinhServers.length > 0) setActiveServerId(thuyetMinhServers[0].id);
                        else if (movie.serverSources?.[0]) setActiveServerId(movie.serverSources[0].id);
                      }}
                      className={`justify-center whitespace-nowrap py-2 text-sm border-b-2 px-4 font-bold uppercase flex items-center gap-2 transition-all ${
                        activeTab === "thuyetminh"
                          ? "border-green-600 text-green-500 bg-transparent"
                          : "border-transparent text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      Thuyết Minh
                    </button>

                    <div className="h-4 w-px bg-zinc-800 mx-2 self-center" />
                    <button
                      onClick={() => setActiveTab("related")}
                      className={`justify-center whitespace-nowrap py-2 text-sm border-b-2 px-4 font-bold transition-all ${
                        activeTab === "related"
                          ? "border-green-600 text-green-500 bg-transparent"
                          : "border-transparent text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Đề xuất
                    </button>
                    <button
                      onClick={() => setActiveTab("actors")}
                      className={`justify-center whitespace-nowrap py-2 text-sm border-b-2 px-4 font-bold transition-all ${
                        activeTab === "actors"
                          ? "border-green-600 text-green-500 bg-transparent"
                          : "border-transparent text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Diễn viên
                    </button>
                    {movie.trailerUrl && (
                      <button
                        onClick={() => setActiveTab("trailer")}
                        className={`justify-center whitespace-nowrap py-2 text-sm border-b-2 px-4 font-bold transition-all ${
                          activeTab === "trailer"
                            ? "border-green-600 text-green-500 bg-transparent"
                            : "border-transparent text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        Trailer
                      </button>
                    )}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[200px] mt-4">
                    {(activeTab === "vietsub" || activeTab === "thuyetminh") && (
                      <div className="space-y-6">
                        {/* Server selection */}
                        {displayServers && displayServers.length > 0 && (
                          <div className="p-3.5 bg-zinc-900/90 rounded-xl border border-zinc-800/80 flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider shrink-0">
                              <Server className="w-3.5 h-3.5 text-green-500" />
                              <span>MÁY CHỦ:</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {displayServers.map((server) => (
                                <button
                                  key={server.id}
                                  onClick={() => setActiveServerId(server.id)}
                                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 border ${
                                    activeServerId === server.id
                                      ? "bg-green-600 text-white border-green-500 shadow-md shadow-green-950/40"
                                      : "bg-zinc-800/80 text-zinc-300 border-zinc-700/60 hover:bg-zinc-700 hover:text-white"
                                  }`}
                                >
                                  <span>{server.name}</span>
                                  <span className="opacity-60 text-[11px]">| {server.episodesList?.length || 0}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Episodes Grid - Matching onflix.lat style */}
                        <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 space-y-4">
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              Danh sách tập ({currentEpisodesList.length} / {currentEpisodesList.length})
                            </h4>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-zinc-400">Hiện ảnh</span>
                              <button
                                type="button"
                                onClick={() => setShowThumbnails(!showThumbnails)}
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                  showThumbnails ? "bg-green-600" : "bg-zinc-700"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    showThumbnails ? "translate-x-4" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {!showThumbnails ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
                              {currentEpisodesList.map((ep, idx) => (
                                <Link
                                  key={idx}
                                  href={`/xem-phim/${movie.slug}?server=${currentServer?.id || ""}&ep=${ep.number}`}
                                  className="group flex items-center justify-start px-3.5 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 hover:border-green-500 hover:bg-zinc-700/90 transition-all text-xs font-semibold text-zinc-200 hover:text-white shadow-sm"
                                >
                                  <Play className="w-3.5 h-3.5 text-zinc-400 group-hover:text-green-400 fill-current shrink-0 mr-2" />
                                  <span className="truncate">{ep.title || `Tập ${ep.number}`}</span>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                              {currentEpisodesList.map((ep, idx) => (
                                <Link
                                  key={idx}
                                  href={`/xem-phim/${movie.slug}?server=${currentServer?.id || ""}&ep=${ep.number}`}
                                  className="group relative flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-green-500 hover:bg-zinc-800/80 transition-all duration-300 text-center shadow-md hover:scale-105"
                                >
                                  <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-1.5 group-hover:bg-green-600 group-hover:text-white transition-all text-green-400 shrink-0">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                  </div>
                                  <span className="text-xs font-bold text-white group-hover:text-green-400 transition-colors truncate w-full">
                                    {ep.title || `Tập ${ep.number}`}
                                  </span>
                                  <span className="text-[10px] text-zinc-400 mt-0.5">{currentServer?.name || "HD"}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "related" && (
                      <div className="py-4">
                        <MovieGrid movies={relatedMovies} />
                      </div>
                    )}

                    {activeTab === "actors" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                        {movie.actorsList?.map((actor, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-zinc-800 border border-zinc-700">
                              <img
                                src={actor.image_url || "https://image.tmdb.org/t/p/w185/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg"}
                                alt={actor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white truncate">{actor.name}</p>
                              <p className="text-[10px] text-zinc-400">Diễn viên</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "trailer" && movie.trailerUrl && (
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
                        <iframe
                          src={movie.trailerUrl.replace("watch?v=", "embed/")}
                          className="w-full h-full border-none"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="pt-4 border-t border-zinc-800">
                  <div className="w-full max-w-9xl mx-auto py-1 px-1 md:px-0">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                        <MessageCircle className="w-7 h-7 text-green-500" />
                        Bình luận
                        <span className="text-base font-normal text-zinc-500">(0)</span>
                      </h3>
                    </div>

                    <div className="bg-zinc-900/50 rounded-xl p-4 mb-8 border border-zinc-800/50">
                      <div className="flex flex-col items-center justify-center py-8 text-center bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                        <p className="text-zinc-400 mb-4 text-sm">
                          Đăng nhập để tham gia thảo luận cùng cộng đồng RIOFLIX
                        </p>
                        <Link href="/dang-nhap">
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-zinc-950 transition-colors h-10 px-4 py-2 bg-green-600/10 text-green-500 border border-green-500/20 hover:bg-green-600/20">
                            Đăng nhập ngay
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <MobileNav />
      </main>
    </div>
  );
}
