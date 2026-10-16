"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { 
  ArrowLeft, 
  Search, 
  Film, 
  Users, 
  Lock, 
  Globe, 
  Check, 
  Sparkles,
  Play
} from "lucide-react";

interface EpisodeItem {
  number: number;
  title: string;
  slug?: string;
  embedUrl?: string;
  m3u8Url?: string;
}

interface MovieSelectable {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  posterUrl: string;
  videoUrl: string;
  episodesList: EpisodeItem[];
}

export default function SelectMoviePage() {
  const router = useRouter();
  const [movies, setMovies] = useState<MovieSelectable[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieSelectable | null>(null);

  // Form states for creating room
  const [roomTitle, setRoomTitle] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeItem | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [hostName, setHostName] = useState("Thành viên RIOFLIX");
  const [maxViewers, setMaxViewers] = useState(50);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/xem-chung/movies?limit=24&q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          setMovies(data.items);
        }
      }
    } catch (err) {
      console.error("Lỗi nạp danh sách phim:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(searchQuery);
  };

  const handleOpenModal = (movie: MovieSelectable) => {
    setSelectedMovie(movie);
    setRoomTitle(`Phòng chiếu ${movie.title}`);
    const firstEp = movie.episodesList?.[0] || { number: 1, title: "Tập 1", embedUrl: movie.videoUrl };
    setSelectedEpisode(firstEp);
    setIsPrivate(false);
    setPassword("");
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie || !selectedEpisode) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/xem-chung/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: roomTitle || `Phòng chiếu ${selectedMovie.title}`,
          movie_id: selectedMovie.id,
          movie_slug: selectedMovie.slug,
          movie_title: selectedMovie.title,
          movie_poster: selectedMovie.posterUrl,
          episode_name: selectedEpisode.title,
          video_url: selectedEpisode.embedUrl || selectedEpisode.m3u8Url || selectedMovie.videoUrl,
          host_name: hostName || "Thành viên RIOFLIX",
          is_private: isPrivate,
          password: isPrivate ? password : "",
          max_viewers: maxViewers,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.slug) {
          router.push(`/xem-chung/room/${data.slug}`);
          return;
        }
      }
      alert("Không thể tạo phòng, vui lòng thử lại!");
    } catch (err) {
      console.error("Lỗi tạo phòng:", err);
      alert("Tạo phòng thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-12 lg:pl-32">
        {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/xem-chung">
            <button className="p-2.5 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Film className="w-6 h-6 text-green-500" />
              Chọn Phim Để Xem Chung
            </h1>
            <p className="text-xs text-zinc-400">Chọn bộ phim yêu thích để tạo phòng chiếu và mời bạn bè vào xem</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-zinc-900 border border-white/15 rounded-2xl px-3 py-1.5 focus-within:border-green-500/50 transition-all sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tên phim..."
            className="bg-transparent border-none outline-none text-sm text-white px-2.5 py-1.5 w-full placeholder:text-zinc-500"
          />
          <button type="submit" className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs font-semibold transition-all">
            Tìm
          </button>
        </form>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id || movie.slug}
              onClick={() => handleOpenModal(movie)}
              className="group relative bg-zinc-900/40 border border-white/10 hover:border-green-500/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10 flex flex-col"
            >
              {/* Poster Image */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                <img
                  src={movie.posterUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500"}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                {/* Hover overlay with button */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-black flex items-center justify-center mb-2 shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black translate-x-0.5" />
                  </div>
                  <span className="text-xs font-bold text-white">Tạo phòng</span>
                </div>
              </div>

              {/* Title & info */}
              <div className="p-3">
                <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-1 group-hover:text-green-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-medium">
                  {movie.originalTitle || "Vietsub / Thuyết minh"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-white/10">
          <p className="text-zinc-400 text-sm">Không tìm thấy phim phù hợp.</p>
        </div>
      )}

      {/* Modal Configure Room */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMovie.posterUrl}
                  alt={selectedMovie.title}
                  className="w-12 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold text-white line-clamp-1">{selectedMovie.title}</h3>
                  <p className="text-xs text-green-400 font-medium">Tạo phòng xem phim trực tuyến</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-5">
              {/* Room Title */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Tên phòng chiếu
                </label>
                <input
                  type="text"
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  placeholder="Nhập tên phòng chiếu..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 text-sm"
                />
              </div>

              {/* Host Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Tên người đại diện (Host)
                </label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="Nhập tên hiển thị..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 text-sm"
                />
              </div>

              {/* Episode Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Chọn tập phim
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 bg-zinc-950 rounded-xl border border-white/10">
                  {selectedMovie.episodesList?.map((ep) => {
                    const isSelected = selectedEpisode?.number === ep.number;
                    return (
                      <button
                        key={ep.number}
                        type="button"
                        onClick={() => setSelectedEpisode(ep)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-green-500 text-black font-bold shadow-md shadow-green-500/30"
                            : "bg-white/5 hover:bg-white/10 text-zinc-300"
                        }`}
                      >
                        {ep.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Privacy Option */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Chế độ phòng
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPrivate(false)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      !isPrivate
                        ? "border-green-500 bg-green-500/10 text-white"
                        : "border-white/10 bg-zinc-950 text-zinc-400"
                    }`}
                  >
                    <Globe className="w-4 h-4 text-green-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Công khai</div>
                      <div className="text-[10px] text-zinc-400">Mọi người đều có thể vào</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPrivate(true)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      isPrivate
                        ? "border-amber-500 bg-amber-500/10 text-white"
                        : "border-white/10 bg-zinc-950 text-zinc-400"
                    }`}
                  >
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Riêng tư</div>
                      <div className="text-[10px] text-zinc-400">Yêu cầu mật khẩu</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Password if Private */}
              {isPrivate && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Đặt mật khẩu phòng
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu..."
                    required={isPrivate}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>
              )}

              {/* Max Viewers Limit */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Giới hạn số người xem
                  </label>
                  <span className="text-xs font-bold text-green-400">{maxViewers} người</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={maxViewers}
                  onChange={(e) => setMaxViewers(parseInt(e.target.value))}
                  className="w-full accent-green-500 cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedMovie(null)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-bold text-sm transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {submitting ? "Đang tạo..." : "Khởi tạo phòng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
