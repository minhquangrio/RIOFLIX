"use client";

import React, { useState, useEffect, useRef, use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Hls from "hls.js";
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
  Server,
  Loader2,
  Film,
  MessageCircle,
  Lightbulb,
  Info,
  ChevronRight,
  Star,
  Eye,
  Calendar,
  AlertTriangle
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function WatchMovieContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const slugArray = resolvedParams.slug || [];
  const movieSlug = slugArray[0] || "";

  const queryServer = searchParams.get("server") || searchParams.get("sv");
  const queryEp = searchParams.get("ep") || searchParams.get("tap");

  const requestedServerSlug = queryServer || slugArray[1] || "";
  const requestedTypeSlug = slugArray[2] || "";
  const requestedEpSlug = queryEp || slugArray[3] || slugArray[1] || "";

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLightsOff, setIsLightsOff] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [bilingual, setBilingual] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [relatedMovies, setRelatedMovies] = useState<MovieItem[]>([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{ name: string; text: string; time: string }[]>([
    { name: "Minh Tuấn", text: "Phim xem siêu cuốn, chất lượng mượt lắm admin ơi!", time: "10 phút trước" },
    { name: "Phương Anh", text: "Mong admin ra tập mới sớm hơn nha, hóng quá!", time: "1 giờ trước" },
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Player mode & error handling state
  const [playerMode, setPlayerMode] = useState<"hls" | "iframe">("hls");
  const [streamError, setStreamError] = useState<{ isGeoBlocked?: boolean; message: string } | null>(null);
  const failedServersRef = useRef<Set<string>>(new Set());

  // Load saved preferences
  useEffect(() => {
    try {
      const savedSkip = localStorage.getItem("rioflix_skip_intro");
      if (savedSkip === "true") setSkipIntro(true);
      const savedAuto = localStorage.getItem("rioflix_auto_next");
      if (savedAuto === "true") setAutoNext(true);
      const savedBilingual = localStorage.getItem("rioflix_bilingual");
      if (savedBilingual === "true") setBilingual(true);
    } catch (e) {}
  }, []);

  const triggerToast = (msg?: string) => {
    setToastText(msg || "Đã bỏ qua 85 giây giới thiệu!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  const handleSkipIntroAction = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime || 0;
      const targetTime = current < 85 ? 85 : current + 85;
      videoRef.current.currentTime = Math.min(targetTime, videoRef.current.duration || targetTime);
      triggerToast("Đã bỏ qua 85 giây giới thiệu!");
    } else if (iframeRef.current) {
      const win = iframeRef.current.contentWindow;
      if (win) {
        try {
          win.postMessage({ type: "artplayer:seek", data: 85 }, "*");
          win.postMessage({ type: "artplayer:currentTime", data: 85 }, "*");
          win.postMessage({ command: "seek", time: 85 }, "*");
          win.postMessage({ event: "seek", value: 85 }, "*");
          win.postMessage({ action: "seek", time: 85 }, "*");
          win.postMessage(JSON.stringify({ event: "command", func: "seekTo", args: [85, true] }), "*");
          win.postMessage(JSON.stringify({ type: "skip_intro", time: 85 }), "*");
        } catch (e) {}
      }

      try {
        const src = iframeRef.current.src;
        if (src) {
          let updatedSrc = src;
          if (updatedSrc.includes("#t=")) {
            updatedSrc = updatedSrc.replace(/#t=\d+/, "#t=85");
          } else if (updatedSrc.includes("start=")) {
            updatedSrc = updatedSrc.replace(/start=\d+/, "start=85");
          } else {
            const sep = updatedSrc.includes("?") ? "&" : "?";
            updatedSrc = `${updatedSrc}${sep}start=85#t=85`;
          }
          iframeRef.current.src = updatedSrc;
        }
      } catch (e) {}

      triggerToast("Đã bỏ qua 85 giây giới thiệu!");
    }
  };

  const handleToggleSkipIntro = () => {
    const nextVal = !skipIntro;
    setSkipIntro(nextVal);
    try {
      localStorage.setItem("rioflix_skip_intro", String(nextVal));
    } catch (e) {}
    if (nextVal) {
      handleSkipIntroAction();
    }
  };

  const handleToggleAutoNext = () => {
    const nextVal = !autoNext;
    setAutoNext(nextVal);
    try {
      localStorage.setItem("rioflix_auto_next", String(nextVal));
    } catch (e) {}
  };

  const handleToggleBilingual = () => {
    const nextVal = !bilingual;
    setBilingual(nextVal);
    try {
      localStorage.setItem("rioflix_bilingual", String(nextVal));
    } catch (e) {}

    if (nextVal) {
      // Look for a bilingual / thuyet minh / dub server
      const bilingualServer = movie?.serverSources?.find(s => 
        s.name.toLowerCase().includes("song ngữ") || 
        s.name.toLowerCase().includes("thuyết minh") || 
        s.name.toLowerCase().includes("lồng tiếng") ||
        s.name.toLowerCase().includes("dub")
      );
      if (bilingualServer) {
        setActiveServerId(bilingualServer.id);
        triggerToast(`🌐 Đã chuyển sang Server ${bilingualServer.name}`);
      } else {
        triggerToast("🌐 Đã bật chế độ xem Song Ngữ (Phụ đề kép / Thuyết minh)");
      }
    } else {
      // Switch back to primary Vietsub server if available
      const primaryServer = movie?.serverSources?.[0];
      if (primaryServer && primaryServer.id !== activeServerId) {
        setActiveServerId(primaryServer.id);
      }
      triggerToast("✓ Đã tắt chế độ Song Ngữ (Về Vietsub)");
    }
  };

  useEffect(() => {
    if (!movieSlug) return;
    let isMounted = true;
    setLoading(true);

    fetchMovieDetail(movieSlug).then((data) => {
      if (isMounted) {
        setMovie(data);

        // Select server matching requestedServerSlug or default to first
        let selectedServer = data.serverSources?.[0];
        if (requestedServerSlug && data.serverSources) {
          const matchedServer = data.serverSources.find(s => 
            s.id.toLowerCase() === requestedServerSlug.toLowerCase() ||
            s.id.toLowerCase().includes(requestedServerSlug.toLowerCase()) || 
            s.name.toLowerCase().includes(requestedServerSlug.toLowerCase())
          );
          if (matchedServer) selectedServer = matchedServer;
        }

        if (selectedServer) {
          setActiveServerId(selectedServer.id);
        }

        // Select episode matching requestedEpSlug or default to first
        if (requestedEpSlug && selectedServer?.episodesList) {
          const epIdx = selectedServer.episodesList.findIndex((e: any) => 
            String(e.slug) === String(requestedEpSlug) || 
            String(e.number) === String(requestedEpSlug) ||
            String(e.title || "").toLowerCase().includes(requestedEpSlug.toLowerCase()) ||
            (requestedEpSlug === "1" && (e.number === 1 || e.slug === "tap-1" || e.slug === "tap-01" || e.slug === "1"))
          );
          if (epIdx !== -1) {
            setActiveEpisodeIndex(epIdx);
          }
        }

        setLoading(false);
      }
    });

    fetchLatestMovies(1).then((res) => {
      if (isMounted) {
        setRelatedMovies(res.slice(0, 10));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [movieSlug, requestedServerSlug, requestedEpSlug]);

  // Save watch history to localStorage
  useEffect(() => {
    if (!movie || !movieSlug) return;

    const historyItem = {
      id: movieSlug,
      title: movie.title,
      originalTitle: movie.originalTitle || "",
      posterUrl: movie.posterUrl,
      quality: movie.quality || "HD",
      episodes: movie.episodes || "",
      linkUrl: `/xem-phim/${movieSlug}?server=${activeServerId || requestedServerSlug || "server-0"}&ep=${activeEpisodeIndex + 1}`,
      episodeNumber: `Tập ${activeEpisodeIndex + 1}`,
      watchedAt: new Date().toISOString(),
      watchedProgress: 0,
      totalDuration: 0,
    };

    try {
      const stored = localStorage.getItem("rioflix_watch_history") || localStorage.getItem("onflix_watch_history");
      let history = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(history)) history = [];

      // Remove duplicate if exists
      const filtered = history.filter((item: any) => item.id !== movieSlug);

      // Add to beginning
      filtered.unshift(historyItem);

      // Keep max 50 items
      const trimmed = filtered.slice(0, 50);

      localStorage.setItem("rioflix_watch_history", JSON.stringify(trimmed));
      localStorage.setItem("onflix_watch_history", JSON.stringify(trimmed));
    } catch (e) {
      console.error("Failed to save watch history:", e);
    }
  }, [movie, movieSlug, requestedServerSlug, requestedEpSlug, activeEpisodeIndex, activeServerId]);

  const currentServer = movie?.serverSources?.find(s => s.id === activeServerId) || movie?.serverSources?.[0];
  const currentEpisodesList = currentServer?.episodesList || movie?.episodesList || [];
  const currentEp = currentEpisodesList[activeEpisodeIndex] || currentEpisodesList[0];
  
  let rawEmbedUrl = (currentEp as any)?.embedUrl || "";
  let rawM3u8Url = (currentEp as any)?.m3u8Url || "";
  let rawServerUrl = currentServer?.url || movie?.videoUrl || "";

  // Robust extraction of direct m3u8 stream from m3u8Url, embedUrl or serverUrl
  let directM3u8Url = rawM3u8Url;
  if (!directM3u8Url) {
    const candidateUrls = [rawEmbedUrl, rawServerUrl];
    for (const cand of candidateUrls) {
      if (!cand) continue;
      if (cand.includes(".m3u8") && !cand.includes("player") && !cand.includes("iframe")) {
        directM3u8Url = cand;
        break;
      }
      if (cand.includes("url=")) {
        try {
          const uStr = cand.startsWith("http") || cand.startsWith("//") ? cand : `http://localhost${cand.startsWith("/") ? "" : "/"}${cand}`;
          const parsed = new URL(uStr);
          const uParam = parsed.searchParams.get("url");
          if (uParam) {
            directM3u8Url = decodeURIComponent(uParam);
            break;
          }
        } catch (e) {
          const match = cand.match(/url=([^&]+)/);
          if (match && match[1]) {
            directM3u8Url = decodeURIComponent(match[1]);
            break;
          }
        }
      }
    }
  }

  // Use Server-side Proxy stream to bypass client-side domain blocking
  const proxiedStreamUrl = directM3u8Url ? `/api/stream?url=${encodeURIComponent(directM3u8Url)}` : "";

  // User selected player mode or fallback
  const isIframe = playerMode === "iframe" || (!directM3u8Url && Boolean(
    rawEmbedUrl || 
    currentServer?.type === "iframe" || 
    rawServerUrl.includes("embed") || 
    rawServerUrl.includes("iframe") || 
    rawServerUrl.includes("player") || 
    rawServerUrl.includes("share")
  ));

  let iframeSourceUrl = rawEmbedUrl || (directM3u8Url ? `/player-proxy/player/?url=${encodeURIComponent(directM3u8Url)}` : rawServerUrl);
  // Always rewrite player.phimapi.com to /player-proxy so client never connects to 3rd party domain
  iframeSourceUrl = iframeSourceUrl.replace(/https?:\/\/player\.phimapi\.com/g, "/player-proxy");

  // HLS.js effect for direct & server-proxied m3u8 playback on HTML5 video element
  useEffect(() => {
    if (loading || !movie || isIframe || !proxiedStreamUrl || !videoRef.current) return;
    const video = videoRef.current;
    let hlsInstance: Hls | null = null;
    let isSubscribed = true;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hlsInstance = hls;

      hls.loadSource(proxiedStreamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!isSubscribed) return;
        setStreamError(null);
        if (isPlaying) {
          video.play().catch(() => {});
        }
      });

      hls.on(Hls.Events.ERROR, async (_event, data) => {
        if (!isSubscribed) return;
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR: {
              if (activeServerId) {
                failedServersRef.current.add(activeServerId);
              }

              // Check if the stream was blocked by geo-filtering (e.g. Cloudflare WARP/VPN)
              let isGeoBlocked = false;
              try {
                const checkRes = await fetch(proxiedStreamUrl, { method: "HEAD" });
                if (checkRes.headers.get("X-Stream-Error") === "geo_blocked") {
                  isGeoBlocked = true;
                }
              } catch {}

              // Look for another available server that hasn't failed yet
              const candidateServers = movie?.serverSources?.filter(
                s => !failedServersRef.current.has(s.id) && (s.episodesList?.length ?? 0) > 0
              );

              if (candidateServers && candidateServers.length > 0) {
                const nextServer = candidateServers[0];
                triggerToast(`⚠️ Đang chuyển sang server ${nextServer.name}...`);
                setActiveServerId(nextServer.id);
              } else {
                // All HLS servers exhausted
                hls.destroy();
                setStreamError({
                  isGeoBlocked,
                  message: isGeoBlocked
                    ? "Nguồn phim yêu cầu mạng trong nước (phát hiện Cloudflare WARP hoặc VPN đang bật). Hãy tạm tắt WARP/VPN hoặc chuyển sang Player Dự phòng."
                    : "Không thể kết nối tới luồng video trực tiếp từ máy chủ nguồn. Bạn có thể chuyển sang Player Dự phòng để tiếp tục xem."
                });
              }
              break;
            }
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = proxiedStreamUrl;
      if (isPlaying) {
        video.play().catch(() => {});
      }
    }

    return () => {
      isSubscribed = false;
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [loading, movie, proxiedStreamUrl, isIframe, activeEpisodeIndex, activeServerId, isPlaying]);

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
        <p className="text-sm font-semibold text-zinc-400">Đang chuẩn bị trình phát video...</p>
      </div>
    );
  }

  const handleStartPlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleEpisodeChange = (idx: number) => {
    setActiveEpisodeIndex(idx);
    setIsPlaying(true);
    setStreamError(null);
    failedServersRef.current.clear();
  };

  const handleServerChange = (serverId: string) => {
    setActiveServerId(serverId);
    setIsPlaying(true);
    setStreamError(null);
    failedServersRef.current.delete(serverId);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      { name: "Khách hàng", text: commentText.trim(), time: "Vừa xong" },
      ...comments,
    ]);
    setCommentText("");
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isLightsOff ? "bg-black" : "bg-zinc-950"} text-white selection:bg-green-500 selection:text-black`}>
      {/* Dim overlay when lights off */}
      {isLightsOff && (
        <div 
          onClick={() => setIsLightsOff(false)}
          className="fixed inset-0 bg-black/90 z-40 cursor-pointer backdrop-blur-sm flex items-center justify-center"
        >
          <p className="text-zinc-500 text-xs bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 pointer-events-none">
            Bấm vào bất kỳ đâu để bật lại đèn
          </p>
        </div>
      )}

      <div className={isLightsOff ? "opacity-20 pointer-events-none transition-opacity" : ""}>
        <Header />
        <Sidebar />
      </div>

      <main className="min-h-screen pt-20 pb-20 lg:pl-28 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto space-y-4">
          {/* Breadcrumb Header */}
          <div className="px-1 text-xs text-zinc-400 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-green-400 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <Link href={`/phim/${movie.slug}`} className="hover:text-green-400 transition-colors">{movie.title}</Link>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <span className="text-green-500 font-semibold">Tập {activeEpisodeIndex + 1}</span>
          </div>

          {/* Video Player Section - Beautiful Balanced Widescreen Player */}
          <section className={`w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl relative ${isLightsOff ? "z-50" : ""}`}>
            {/* Player Frame */}
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              {/* Toast Notification */}
              {showToast && (
                <div className="absolute top-4 right-4 z-40 bg-green-600/90 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xl backdrop-blur-md animate-bounce flex items-center gap-2 border border-green-400/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>{toastText}</span>
                </div>
              )}

              {/* Bilingual Active Badge */}
              {bilingual && (
                <div className="absolute top-4 left-4 z-30 bg-black/75 text-green-400 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-green-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Chế độ Song Ngữ / Thuyết Minh</span>
                </div>
              )}

              {/* Floating Skip Intro Overlay Button - Only render when skipIntro is ON */}
              {skipIntro && (
                <button
                  type="button"
                  onClick={handleSkipIntroAction}
                  className="absolute bottom-6 right-6 z-30 bg-black/80 hover:bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-green-500/40 backdrop-blur-md transition-all shadow-lg flex items-center gap-2 group/skip hover:scale-105"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 group-hover/skip:bg-white animate-ping" />
                  <span>Bỏ qua intro (+85s)</span>
                </button>
              )}

              {isIframe ? (
                <iframe
                  key={`${movie.slug}-${activeEpisodeIndex}-${activeServerId}`}
                  ref={iframeRef}
                  src={iframeSourceUrl}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    key={`${movie.slug}-${activeEpisodeIndex}-${activeServerId}`}
                    ref={videoRef}
                    className="w-full h-full object-contain bg-black"
                    controls={isPlaying && !streamError}
                    autoPlay
                    playsInline
                    poster={movie.backdropUrl}
                    onPlay={() => {
                      setIsPlaying(true);
                      if (skipIntro && videoRef.current && videoRef.current.currentTime < 5) {
                        videoRef.current.currentTime = 85;
                        triggerToast();
                      }
                    }}
                    onTimeUpdate={() => {
                      if (skipIntro && videoRef.current && videoRef.current.currentTime > 0 && videoRef.current.currentTime < 3) {
                        videoRef.current.currentTime = 85;
                        triggerToast();
                      }
                    }}
                    onEnded={() => {
                      if (autoNext && activeEpisodeIndex < currentEpisodesList.length - 1) {
                        handleEpisodeChange(activeEpisodeIndex + 1);
                      }
                    }}
                  >
                    Trình duyệt của bạn không hỗ trợ phát video HTML5.
                  </video>

                  {/* Stream Error Overlay */}
                  {streamError && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                        {streamError.isGeoBlocked ? "Máy chủ nguồn yêu cầu mạng trong nước" : "Không thể tải luồng video trực tiếp"}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mb-6 leading-relaxed">
                        {streamError.message}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setPlayerMode("iframe");
                            setStreamError(null);
                          }}
                          className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                        >
                          <Film className="w-4 h-4" />
                          <span>Chuyển sang Player Dự phòng</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            failedServersRef.current.clear();
                            setStreamError(null);
                            setActiveServerId(movie?.serverSources?.[0]?.id || null);
                          }}
                          className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm rounded-xl border border-zinc-700 transition-all"
                        >
                          Thử lại kết nối
                        </button>
                      </div>
                    </div>
                  )}

                  {!isPlaying && !streamError && (
                    <div 
                      onClick={handleStartPlay}
                      className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/40 z-20"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.6)] transform group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current translate-x-1" />
                      </div>
                      <p className="mt-4 text-sm sm:text-base font-bold text-white tracking-wide">
                        Phát Tập {activeEpisodeIndex + 1} - {movie.title}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Target Site Matching Player Control Bar (Chuyển tập, Bỏ qua giới thiệu, Song Ngữ, Server Switcher) */}
            <div className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800/80 flex flex-col gap-3">
              {/* Row 1: Toggles directly matching onflix.lat screenshot */}
              <div className="flex items-center justify-between gap-4 flex-wrap text-xs font-semibold text-zinc-400 border-b border-zinc-900/80 pb-3">
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Auto Next Switch */}
                  <button 
                    type="button"
                    onClick={handleToggleAutoNext}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <span>Chuyển tập</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase transition-colors ${autoNext ? "bg-green-500 text-black" : "bg-zinc-800 text-zinc-400"}`}>
                      {autoNext ? "ON" : "OFF"}
                    </span>
                  </button>

                  {/* Skip Intro Switch */}
                  <button 
                    type="button"
                    onClick={handleToggleSkipIntro}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <span>Bỏ qua giới thiệu</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase transition-colors ${skipIntro ? "bg-green-500 text-black" : "bg-zinc-800 text-zinc-400"}`}>
                      {skipIntro ? "ON" : "OFF"}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Bilingual Subtitle Switch */}
                  <button 
                    type="button"
                    onClick={handleToggleBilingual}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <span>Song Ngữ</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase transition-colors ${bilingual ? "bg-green-500 text-black" : "bg-zinc-800 text-zinc-400"}`}>
                      {bilingual ? "ON" : "OFF"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Row 2: Server selector & action buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mr-2">
                    <Server className="w-4 h-4 text-green-500" />
                    Nguồn phát:
                  </span>
                  {movie.serverSources?.map((server) => (
                    <button
                      key={server.id}
                      onClick={() => handleServerChange(server.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        activeServerId === server.id
                          ? "bg-green-600 text-white shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                      }`}
                    >
                      {server.name}
                    </button>
                  ))}

                  {/* Player Mode Switcher */}
                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg ml-1">
                    <button
                      type="button"
                      onClick={() => {
                        setPlayerMode("hls");
                        setStreamError(null);
                        failedServersRef.current.clear();
                      }}
                      className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                        playerMode === "hls"
                          ? "bg-green-600 text-white shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                      title="Phát qua luồng HLS trực tiếp"
                    >
                      ⚡ HLS (VIP)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPlayerMode("iframe");
                        setStreamError(null);
                      }}
                      className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                        playerMode === "iframe"
                          ? "bg-green-600 text-white shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                      title="Phát qua trình phát nhúng dự phòng"
                    >
                      🖥️ Dự phòng
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsLightsOff(!isLightsOff)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      isLightsOff
                        ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                        : "bg-zinc-800 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-700"
                    }`}
                    title="Tắt/Bật đèn"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span className="hidden sm:inline">{isLightsOff ? "Bật đèn" : "Tắt đèn"}</span>
                  </button>

                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      isSaved
                        ? "bg-green-500/20 border-green-500 text-green-400"
                        : "bg-zinc-800 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-700"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    <span className="hidden sm:inline">{isSaved ? "Đã lưu" : "Lưu phim"}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Đã sao chép liên kết phim!");
                    }}
                    className="p-2 rounded-lg bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all"
                    title="Chia sẻ"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Content Details & Episodes Grid */}
        <div className="max-w-[1400px] mx-auto px-1 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Metadata Header */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {movie.title}
                  </h1>
                  {movie.originalTitle && (
                    <p className="text-sm text-zinc-400 font-medium mt-1">
                      {movie.originalTitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isLiked
                        ? "bg-red-500/20 border-red-500 text-red-500"
                        : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    <span>Yêu thích</span>
                  </button>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
                <div className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/20">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{movie.ratingScore || 9.8} / 10</span>
                </div>

                <div className="flex items-center gap-1.5 font-medium">
                  <Eye className="w-4 h-4 text-green-500" />
                  <span>{movie.views || "1.8M"} lượt xem</span>
                </div>

                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>{movie.releaseYear}</span>
                </div>

                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-600/20 text-green-400 border border-green-500/30">
                  {movie.quality || "FHD"}
                </span>

                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-zinc-800 text-zinc-300">
                  {movie.language || "Vietsub"}
                </span>
              </div>

              {/* Categories & Countries Links */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-zinc-500 font-bold uppercase mr-1">Thể loại:</span>
                {movie.categoriesList?.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={`/the-loai/${cat.slug}`}
                    className="px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700 rounded-lg hover:border-green-500 hover:text-green-400 transition-all uppercase"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Description */}
              <div className="pt-3 border-t border-zinc-800/60">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-green-500" />
                  Nội dung phim
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
                  {movie.description}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                Bình luận cộng đồng ({comments.length})
              </h3>

              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Viết bình luận của bạn về tập phim này..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-all resize-none min-h-[90px]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-green-900/20"
                  >
                    Gửi bình luận
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                {comments.map((c, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/40">
                    <div className="w-9 h-9 rounded-full bg-green-600/20 border border-green-500/30 flex items-center justify-center font-bold text-green-400 text-xs shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{c.name}</span>
                        <span className="text-[10px] text-zinc-500">{c.time}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column (1 col): Episode Selector & Related */}
          <div className="space-y-6">
            {/* Episode Grid Container */}
            <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-green-500" />
                  Danh sách tập
                </h3>
                <span className="text-xs font-semibold text-green-400 bg-green-600/10 px-2 py-0.5 rounded border border-green-500/20">
                  {currentEpisodesList.length} tập
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2 max-h-[380px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                {currentEpisodesList.map((ep, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEpisodeChange(idx)}
                    className={`py-2.5 text-xs font-bold rounded-xl transition-all border ${
                      activeEpisodeIndex === idx
                        ? "bg-green-600 text-white border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-105"
                        : "bg-zinc-800 text-zinc-300 border-white/5 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    Tập {ep.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Poster & Quick Link back to info */}
            <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-16 rounded-lg aspect-[2/3] object-cover border border-zinc-700"
              />
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-bold text-white truncate">{movie.title}</p>
                <p className="text-[11px] text-zinc-400 line-clamp-1">Đạo diễn: {movie.director}</p>
                <Link
                  href={`/phim/${movie.slug}`}
                  className="inline-block text-[11px] text-green-400 hover:underline font-semibold"
                >
                  Xem trang thông tin phim →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        <div className="container mx-auto px-4 md:px-8 lg:pl-28 mt-12 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-4 border-green-600 pl-3">
            Phim Đề Xuất Cùng Thể Loại
          </h2>
          <MovieGrid movies={relatedMovies} />
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

export default function WatchMoviePage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Đang chuẩn bị trình phát video...</p>
        </div>
      }
    >
      <WatchMovieContent {...props} />
    </Suspense>
  );
}
