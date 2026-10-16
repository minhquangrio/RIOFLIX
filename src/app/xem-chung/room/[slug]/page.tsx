"use client";

import React, { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { 
  ArrowLeft, 
  Users, 
  Share2, 
  Send, 
  Lock, 
  Play, 
  Pause, 
  Crown, 
  ShieldAlert, 
  Radio, 
  Smile, 
  Check, 
  Volume2, 
  VolumeX,
  Sparkles,
  MessageSquare,
  UserCheck,
  Power
} from "lucide-react";

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
  max_viewers: number;
  current_viewers: number;
  scheduled_time: string;
  status: "active" | "ended";
  current_time: number;
  is_playing: boolean;
}

interface WatchMessage {
  id: string;
  room_id: string;
  user_id?: string;
  user_name: string;
  user_avatar?: string;
  user_role: "host" | "viewer" | "system";
  content: string;
  created_at: string;
}

interface Participant {
  user_id: string;
  user_name: string;
  user_avatar?: string;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
}

export default function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [room, setRoom] = useState<WatchRoomItem | null>(null);
  const [messages, setMessages] = useState<WatchMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  // User identity state
  const [userId] = useState(() => {
    if (typeof window !== "undefined") {
      let saved = localStorage.getItem("rioflix_watch_uid");
      if (!saved) {
        saved = "user-" + Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("rioflix_watch_uid", saved);
      }
      return saved;
    }
    return "user-guest";
  });

  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("rioflix_watch_uname") || "Bạn bè (" + userId.slice(-4) + ")";
    }
    return "Bạn bè";
  });

  const [userAvatar] = useState(() => `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userId)}`);

  // UI tabs & controls
  const [activeTab, setActiveTab] = useState<"chat" | "users">("chat");
  const [inputMsg, setInputMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  
  // Video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const isHost = room ? room.host_user_id === userId || userId.includes("host") : false;

  // Poll heartbeat and room state
  const fetchRoomState = async () => {
    try {
      const res = await fetch(`/api/xem-chung/rooms/${slug}/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          user_avatar: userAvatar,
          current_time: videoRef.current ? videoRef.current.currentTime : 0,
          is_playing: videoRef.current ? !videoRef.current.paused : true,
          is_host: isHost,
        }),
      });

      if (!res.ok) {
        if (res.status === 404) {
          setErrorMsg("Phòng chiếu đã kết thúc hoặc không tồn tại!");
        }
        return;
      }

      const data = await res.json();
      if (data.room) {
        setRoom(data.room);

        // Sync video time for viewers (not host)
        if (!isHost && videoRef.current && data.room) {
          const diff = Math.abs(videoRef.current.currentTime - data.room.current_time);
          if (diff > 3) {
            videoRef.current.currentTime = data.room.current_time;
          }
          if (data.room.is_playing && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          } else if (!data.room.is_playing && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      }
      if (Array.isArray(data.messages)) setMessages(data.messages);
      if (Array.isArray(data.participants)) setParticipants(data.participants);
    } catch (err) {
      console.error("Heartbeat error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomState();
    const interval = setInterval(fetchRoomState, 3000);
    return () => clearInterval(interval);
  }, [slug, userId]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !room) return;

    const text = inputMsg.trim();
    setInputMsg("");

    try {
      const res = await fetch(`/api/xem-chung/rooms/${slug}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          user_avatar: userAvatar,
          user_role: isHost ? "host" : "viewer",
          content: text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  const handleSendEmoji = (emoji: string) => {
    // Send as chat message
    fetch(`/api/xem-chung/rooms/${slug}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        user_name: userName,
        user_avatar: userAvatar,
        user_role: isHost ? "host" : "viewer",
        content: emoji,
      }),
    });

    // Spawn floating emoji animation
    const newEmoji: FloatingEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: 20 + Math.random() * 60,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== newEmoji.id));
    }, 2500);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleEndRoom = async () => {
    try {
      await fetch(`/api/xem-chung/rooms/${slug}`, { method: "DELETE" });
      router.push("/xem-chung");
    } catch (err) {
      console.error("Lỗi kết thúc phòng:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-zinc-400 text-sm font-medium">Đang kết nối phòng chiếu...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !room) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Không Thể Vào Phòng</h2>
          <p className="text-zinc-400 text-sm mb-6">{errorMsg || "Phòng xem chung đã đóng hoặc hết hiệu lực."}</p>
          <Link href="/xem-chung">
            <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black font-bold text-sm transition-all inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại Xem Chung
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <div className="flex flex-col pt-16 lg:pl-24">
        {/* Top Bar Navigation */}
      <div className="h-16 bg-zinc-900/90 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-16 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/xem-chung">
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-white text-sm sm:text-base truncate">{room.title}</h1>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30 uppercase tracking-wider shrink-0">
                {room.episode_name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 truncate">{room.movie_title}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Viewer count badge */}
          <div className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-green-400" />
            <span>{room.current_viewers} đang xem</span>
          </div>

          {/* Share link button */}
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? "Đã chép link!" : "Mời bạn"}</span>
          </button>

          {/* End room button for Host */}
          {isHost && (
            <button
              onClick={() => setShowEndModal(true)}
              className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Power className="w-4 h-4" />
              <span className="hidden sm:inline">Kết thúc phòng</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 p-2 sm:p-4 max-w-[1800px] w-full mx-auto">
        {/* Left Column: Sync Player */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Video Container */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
            {room.video_url.includes("embed") ||
            room.video_url.includes("player") ||
            room.video_url.includes("phim") ||
            room.video_url.includes("kkphim") ||
            !room.video_url.endsWith(".mp4") ? (
              <iframe
                src={room.video_url}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full border-0"
              />
            ) : (
              <video
                ref={videoRef}
                src={room.video_url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}

            {/* Floating Emojis Animation Canvas */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {floatingEmojis.map((item) => (
                <div
                  key={item.id}
                  style={{ left: `${item.left}%` }}
                  className="absolute bottom-6 text-3xl sm:text-4xl animate-bounce duration-1000 transition-all opacity-90 drop-shadow-lg"
                >
                  {item.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Emoji Bar & Status Bar */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Cảm xúc nhanh:
              </span>
              <div className="flex items-center gap-1.5">
                {["❤️", "🔥", "😂", "👏", "😮", "😢"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendEmoji(emoji)}
                    className="p-1.5 hover:scale-125 transition-transform text-lg"
                    title={`Gửi ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>Host: <strong className="text-white">{room.host_name}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chat & Members Sidebar */}
        <div className="flex flex-col bg-zinc-900/80 border border-white/10 rounded-2xl h-[550px] lg:h-[calc(100vh-140px)] overflow-hidden">
          {/* Tabs header */}
          <div className="flex border-b border-white/10 bg-zinc-950/50">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "chat"
                  ? "border-green-500 text-green-400 bg-green-500/5"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Trò chuyện ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "users"
                  ? "border-green-500 text-green-400 bg-green-500/5"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Người xem ({participants.length || room.current_viewers})
            </button>
          </div>

          {/* Tab Content: Chat */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Messages list */}
              <div ref={chatListRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg) => {
                  if (msg.user_role === "system") {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400 inline-block">
                          {msg.content}
                        </span>
                      </div>
                    );
                  }

                  const isMe = msg.user_id === userId;
                  const isHostMsg = msg.user_role === "host";

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 ${isMe ? "flex-row-reverse" : ""}`}
                    >
                      <img
                        src={msg.user_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                        alt={msg.user_name}
                        className="w-7 h-7 rounded-full bg-zinc-800 shrink-0 object-cover mt-0.5"
                      />
                      <div className={`max-w-[78%] ${isMe ? "items-end" : "items-start"}`}>
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          <span className="text-[11px] font-semibold text-zinc-400">
                            {msg.user_name}
                          </span>
                          {isHostMsg && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30 flex items-center gap-0.5">
                              <Crown className="w-2.5 h-2.5" />
                              Host
                            </span>
                          )}
                        </div>
                        <div
                          className={`p-2.5 rounded-2xl text-xs leading-relaxed break-words ${
                            isMe
                              ? "bg-green-600 text-white rounded-tr-none"
                              : isHostMsg
                              ? "bg-amber-950/60 border border-amber-500/30 text-amber-100 rounded-tl-none"
                              : "bg-zinc-800/90 text-zinc-200 rounded-tl-none"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-zinc-950/80 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Nhập tin nhắn trò chuyện..."
                  className="flex-1 bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim()}
                  className="p-2.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-40 text-black font-bold transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab Content: Users */}
          {activeTab === "users" && (
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {participants.length > 0 ? (
                participants.map((p) => {
                  const isUserHost = p.user_id === room.host_user_id;
                  return (
                    <div
                      key={p.user_id}
                      className="p-2.5 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.user_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                          alt={p.user_name}
                          className="w-8 h-8 rounded-full bg-zinc-800 object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {p.user_name}
                            {p.user_id === userId && (
                              <span className="text-[10px] text-green-400 font-normal">(Bạn)</span>
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-500">Đang online</span>
                        </div>
                      </div>

                      {isUserHost && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          Chủ phòng
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 text-xs text-zinc-500">
                  Đang có {room.current_viewers} người xem trực tuyến trong phòng.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* End Room Confirmation Modal for Host */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-3">
              <Power className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Xác Nhận Đóng Phòng?</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Hành động này sẽ xóa phòng chiếu vĩnh viễn và chấm dứt kết nối của tất cả người xem trong phòng! ⚠️
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleEndRoom}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all"
              >
                Kết thúc ngay
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
