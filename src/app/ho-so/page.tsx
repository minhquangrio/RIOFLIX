"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { 
  User, 
  Lock, 
  Bookmark, 
  Settings, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Camera, 
  Calendar, 
  Mail, 
  Trash2,
  Film,
  ExternalLink,
  Save,
  KeyRound
} from "lucide-react";

// Curated RIOFLIX Preset Avatars
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
];

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt: string;
  watchlistCount: number;
}

interface WatchlistItem {
  id: string;
  title: string;
  posterUrl: string;
  year?: number;
  quality?: string;
  episodes?: string;
  linkUrl: string;
}

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "watchlist" | "preferences">("profile");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  // Profile Form States
  const [nameInput, setNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Watchlist States
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);

  // Notification States
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Preferences States
  const [autoNext, setAutoNext] = useState(true);
  const [qualityPref, setQualityPref] = useState("FHD");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dang-nhap?callbackUrl=/ho-so");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setNameInput(data.user.name || "");
        setImageInput(data.user.image || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    setLoadingWatchlist(true);
    try {
      const res = await fetch("/api/watchlist?limit=50");
      const data = await res.json();
      if (data.success) {
        setWatchlistItems(data.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  useEffect(() => {
    if (activeTab === "watchlist") {
      fetchWatchlist();
    }
  }, [activeTab]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setMessage({ type: "error", text: "Vui lòng nhập họ tên đầy đủ" });
      return;
    }

    setUpdatingProfile(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput.trim(),
          image: imageInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setProfile(data.user);
        await updateSession();
      } else {
        setMessage({ type: "error", text: data.message || "Cập nhật thất bại" });
      }
    } catch {
      setMessage({ type: "error", text: "Có lỗi xảy ra, vui lòng thử lại" });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Vui lòng điền đầy đủ thông tin mật khẩu" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu mới và xác nhận mật khẩu không trùng khớp" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Mật khẩu mới phải có ít nhất 6 ký tự" });
      return;
    }

    setUpdatingPassword(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.message || "Đổi mật khẩu thất bại" });
      }
    } catch {
      setMessage({ type: "error", text: "Có lỗi xảy ra khi đổi mật khẩu" });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleRemoveWatchlistItem = async (slug: string) => {
    try {
      const res = await fetch(`/api/watchlist?slug=${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setWatchlistItems((prev) => prev.filter((item) => !item.linkUrl.endsWith(slug)));
        if (profile) {
          setProfile({ ...profile, watchlistCount: Math.max(0, profile.watchlistCount - 1) });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
          <p className="text-sm text-zinc-400 font-medium">Đang tải hồ sơ người dùng...</p>
        </div>
      </div>
    );
  }

  const userAvatar = imageInput || profile?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  const joinedYear = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("vi-VN", { month: "long", year: "numeric" }) : "Mới tham gia";

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-screen pt-20 pb-20 container mx-auto px-4 md:px-8 lg:pl-28 space-y-6">
        {/* Banner Card & User Overview */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-green-950/40 border border-zinc-800/80 p-6 md:p-8 shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Circle */}
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-green-500/30 shadow-xl bg-zinc-900 flex items-center justify-center">
                <img
                  src={userAvatar}
                  alt={profile?.name || "User"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-1 right-1 p-2 bg-green-500 text-black rounded-full shadow-lg border border-zinc-900">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {profile?.name || session?.user?.name || "Thành viên RIOFLIX"}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold self-center md:self-auto">
                  <Sparkles className="w-3.5 h-3.5" />
                  {profile?.role === "admin" ? "Quản Trị Viên" : "Thành viên VIP"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs md:text-sm text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span>{profile?.email || session?.user?.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span>Tham gia: {joinedYear}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Trạng thái: Hoạt động</span>
                </div>
              </div>
            </div>

            {/* Watchlist Quick Stats Card */}
            <div className="flex items-center gap-4 bg-zinc-950/60 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-zinc-800/80">
              <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{profile?.watchlistCount || 0}</p>
                <p className="text-xs text-zinc-400 font-medium">Phim đã lưu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Toast Notification */}
        {message && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
              message.type === "success"
                ? "bg-green-950/40 border-green-500/30 text-green-300"
                : "bg-red-950/40 border-red-500/30 text-red-300"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Main Tabs Navigation */}
        <div className="flex border-b border-zinc-800 overflow-x-auto scrollbar-hide gap-2 md:gap-4 pb-1">
          <button
            onClick={() => { setActiveTab("profile"); setMessage(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-green-500 text-black shadow-lg shadow-green-950/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Thông tin cá nhân</span>
          </button>

          <button
            onClick={() => { setActiveTab("security"); setMessage(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "security"
                ? "bg-green-500 text-black shadow-lg shadow-green-950/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Đổi mật khẩu</span>
          </button>

          <button
            onClick={() => { setActiveTab("watchlist"); setMessage(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "watchlist"
                ? "bg-green-500 text-black shadow-lg shadow-green-950/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Danh sách đã lưu ({profile?.watchlistCount || 0})</span>
          </button>

          <button
            onClick={() => { setActiveTab("preferences"); setMessage(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "preferences"
                ? "bg-green-500 text-black shadow-lg shadow-green-950/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cài đặt xem phim</span>
          </button>
        </div>

        {/* Tab 1: Profile Edit */}
        {activeTab === "profile" && (
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-green-500" />
              <span>Cập Nhật Thông Tin Cá Nhân</span>
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Nhập họ và tên..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-zinc-600 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Địa chỉ Email (Không thể thay đổi)
                </label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800/60 rounded-xl text-zinc-500 cursor-not-allowed text-sm"
                />
              </div>

              {/* Preset Avatar Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Chọn Ảnh Đại Diện (Bộ Sưu Tập RIOFLIX)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {PRESET_AVATARS.map((avatarUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageInput(avatarUrl)}
                      className={`relative rounded-full overflow-hidden border-2 transition-all p-0.5 aspect-square ${
                        imageInput === avatarUrl
                          ? "border-green-500 ring-2 ring-green-500/40 scale-105"
                          : "border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={avatarUrl} alt={`Avatar ${idx}`} className="w-full h-full object-cover rounded-full" />
                      {imageInput === avatarUrl && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-500 fill-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Hoặc Tùy Chỉnh Link Ảnh Avatar (URL)
                </label>
                <input
                  type="text"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="https://example.com/my-avatar.jpg"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-zinc-600 outline-none transition-all text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-lg shadow-green-950/50 disabled:opacity-50"
                >
                  {updatingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Lưu thay đổi</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Security & Password */}
        {activeTab === "security" && (
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-green-500" />
              <span>Đổi Mật Khẩu Tài Khoản</span>
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-5 max-w-xl">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-zinc-600 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Mật khẩu mới (Tối thiểu 6 ký tự)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-zinc-600 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-zinc-600 outline-none transition-all text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-lg shadow-green-950/50 disabled:opacity-50"
                >
                  {updatingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang cập nhật...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Cập nhật mật khẩu</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Watchlist */}
        {activeTab === "watchlist" && (
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-green-500" />
                <span>Danh Sách Phim Đã Lưu</span>
              </h2>
              <Link
                href="/danh-sach-xem"
                className="text-xs font-semibold text-green-500 hover:underline inline-flex items-center gap-1"
              >
                <span>Xem tất cả trang danh sách</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loadingWatchlist ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                <p className="text-xs text-zinc-400">Đang tải danh sách phim đã lưu...</p>
              </div>
            ) : watchlistItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {watchlistItems.map((item) => {
                  const slug = item.linkUrl.replace("/phim/", "");
                  return (
                    <div
                      key={item.id}
                      className="group relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-green-500/50 transition-all flex flex-col justify-between"
                    >
                      <Link href={item.linkUrl} className="block relative aspect-[2/3] overflow-hidden">
                        <img
                          src={item.posterUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {item.quality && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-green-400 text-[10px] font-bold rounded backdrop-blur-sm border border-green-500/30">
                            {item.quality}
                          </span>
                        )}
                      </Link>

                      <div className="p-3 space-y-1">
                        <Link href={item.linkUrl} className="font-bold text-sm text-white line-clamp-1 hover:text-green-400 transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-xs text-zinc-400">{item.year || "Phim mới"}</p>
                      </div>

                      <button
                        onClick={() => handleRemoveWatchlistItem(slug)}
                        title="Xoá khỏi danh sách"
                        className="absolute top-2 right-2 p-1.5 bg-black/80 text-zinc-400 hover:text-red-400 rounded-lg backdrop-blur-sm border border-zinc-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-zinc-950/40 rounded-xl border border-zinc-800/50">
                <Film className="w-10 h-10 text-zinc-600" />
                <p className="text-sm font-semibold text-zinc-300">Chưa có phim nào trong danh sách xem</p>
                <p className="text-xs text-zinc-500 max-w-sm">
                  Hãy bấm vào nút Bookmark khi xem bất kỳ bộ phim nào để thêm vào danh sách yêu thích của bạn.
                </p>
                <Link
                  href="/kham-pha"
                  className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold text-xs rounded-xl transition-all"
                >
                  Khám phá phim ngay
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Preferences */}
        {activeTab === "preferences" && (
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 md:p-8 space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-500" />
              <span>Cài Đặt Trải Nghiệm Xem Phim</span>
            </h2>

            <div className="space-y-6 divide-y divide-zinc-800/60">
              {/* Toggle Auto-next */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-white">Tự động phát tập tiếp theo</p>
                  <p className="text-xs text-zinc-400">Tự động chuyển sang tập kế tiếp khi bộ phim kết thúc.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoNext(!autoNext)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    autoNext ? "bg-green-500" : "bg-zinc-800"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      autoNext ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Resolution selection */}
              <div className="flex items-center justify-between pt-6">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-white">Chất lượng trình phát ưu tiên</p>
                  <p className="text-xs text-zinc-400">Tự động chọn độ phân giải tốt nhất khi mở trình phát.</p>
                </div>
                <select
                  value={qualityPref}
                  onChange={(e) => setQualityPref(e.target.value)}
                  className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-green-400 focus:outline-none"
                >
                  <option value="FHD">Full HD (1080p)</option>
                  <option value="HD">HD (720p)</option>
                  <option value="AUTO">Tự động (Auto)</option>
                </select>
              </div>

              {/* Theme info */}
              <div className="flex items-center justify-between pt-6">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-white">Giao diện (Theme)</p>
                  <p className="text-xs text-zinc-400">Mặc định chế độ tối cao cấp (Cinema Dark Mode).</p>
                </div>
                <span className="px-3 py-1 bg-zinc-950 text-zinc-400 text-xs font-semibold rounded-lg border border-zinc-800">
                  Dark Mode
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
