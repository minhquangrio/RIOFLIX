"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { 
  Users, 
  Plus, 
  RefreshCw, 
  Lock, 
  Play, 
  Radio, 
  Tv, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));
  if (diffInSeconds < 60) return "vừa xong";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ngày trước`;
}

interface WatchRoomItem {
  id: string;
  slug: string;
  title: string;
  movie_id: string;
  movie_slug: string;
  movie_title: string;
  movie_poster: string;
  episode_name: string;
  video_url: string;
  host_user_id: string;
  host_name: string;
  host_avatar: string;
  host_avatar_frame?: string;
  is_private: boolean;
  password?: string;
  max_viewers: number;
  current_viewers: number;
  scheduled_time: string;
  status: "active" | "ended";
}

export default function XemChungPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<WatchRoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [selectedPrivateRoom, setSelectedPrivateRoom] = useState<WatchRoomItem | null>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [passError, setPassError] = useState("");

  const fetchRooms = async (showRefreshToast = false) => {
    if (showRefreshToast) setRefreshing(true);
    try {
      const res = await fetch(`/api/xem-chung/rooms?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setRooms(data);
        }
      }
    } catch (err) {
      console.error("Lỗi nạp danh sách phòng:", err);
    } finally {
      setLoading(false);
      if (showRefreshToast) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = roomCode.trim();
    if (clean) {
      router.push(`/xem-chung/room/${clean}`);
    }
  };

  const handleRoomClick = (room: WatchRoomItem) => {
    if (room.is_private) {
      setSelectedPrivateRoom(room);
      setInputPassword("");
      setPassError("");
    } else {
      router.push(`/xem-chung/room/${room.slug}`);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrivateRoom) return;
    if (selectedPrivateRoom.password && inputPassword !== selectedPrivateRoom.password) {
      setPassError("Mật khẩu phòng không đúng!");
      return;
    }
    router.push(`/xem-chung/room/${selectedPrivateRoom.slug}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-12 lg:pl-32">
        {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900/30 via-zinc-900 to-black border border-white/10 p-6 sm:p-10 mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Xem Chung Trực Tuyến
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Cùng Bạn Bè Xem Phim <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Thời Gian Thực
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg mb-8 leading-relaxed">
            Tạo phòng chiếu phim trực tuyến nhanh chóng, mời bạn bè cùng xem và trò chuyện thời gian thực cực kỳ thú vị.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href="/xem-chung/select-movie">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-green-500/25 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                <Plus className="w-5 h-5" />
                Tạo phòng xem chung
              </button>
            </Link>

            {/* Form tham gia bằng mã phòng */}
            <form onSubmit={handleJoinByCode} className="flex items-center bg-zinc-900/90 border border-white/15 rounded-2xl px-3 py-1.5 focus-within:border-green-500/50 transition-all sm:w-80">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Nhập mã hoặc tên phòng..."
                className="bg-transparent border-none outline-none text-sm text-white px-2 py-1.5 w-full placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={!roomCode.trim()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white text-xs font-semibold transition-all shrink-0 flex items-center gap-1"
              >
                Tham gia
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Rooms Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-green-500/10 text-green-500">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Phòng chiếu đang hoạt động
              </h2>
              <p className="text-xs text-zinc-400">Tham gia các phòng chiếu công khai hoặc tạo phòng riêng cho bạn</p>
            </div>
          </div>

          <button
            onClick={() => fetchRooms(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-2 text-xs font-medium"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-green-500" : ""}`} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>

        {/* Room Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => {
              const formattedTime = formatDistanceToNow(new Date(room.scheduled_time));

              return (
                <div
                  key={room.id}
                  onClick={() => handleRoomClick(room)}
                  className="group relative bg-zinc-900/60 border border-white/10 hover:border-green-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10 flex flex-col"
                >
                  {/* Poster Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                    <img
                      src={room.movie_poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500"}
                      alt={room.movie_title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    {/* Live Badge & Viewers Count */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Trực tiếp
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                      {room.is_private && (
                        <span className="p-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30">
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1 border border-white/10">
                        <Users className="w-3 h-3 text-green-400" />
                        {room.current_viewers}/{room.max_viewers}
                      </span>
                    </div>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-black translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-green-400 transition-colors">
                        {room.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-1 font-medium">
                        {room.movie_title} • <span className="text-green-400 font-semibold">{room.episode_name}</span>
                      </p>
                    </div>

                    {/* Host Info & Time */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                          <img
                            src={room.host_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Host"}
                            alt={room.host_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-zinc-300 truncate max-w-[100px]">
                          {room.host_name}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500">{formattedTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
              <Tv className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Chưa có phòng chiếu nào đang mở</h3>
            <p className="text-zinc-400 text-sm mb-6">Hãy là người đầu tiên tạo phòng xem chung và rủ bạn bè vào thưởng thức phim!</p>
            <Link href="/xem-chung/select-movie">
              <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black font-bold text-sm transition-all inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tạo phòng ngay
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Password Modal for Private Room */}
      {selectedPrivateRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Phòng Bảo Mật</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Phòng &quot;{selectedPrivateRoom.title}&quot; yêu cầu mật khẩu để tham gia.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="Nhập mật khẩu phòng..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 text-sm"
                />
                {passError && <p className="text-xs text-red-400 mt-1.5">{passError}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPrivateRoom(null)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black font-bold text-sm transition-all shadow-lg shadow-green-500/20"
                >
                  Vào phòng
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
