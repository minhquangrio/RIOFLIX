import { NextRequest, NextResponse } from "next/server";
import { watchPartyStore } from "@/lib/watch-party-store";
import { cleanSlug } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      movie_id,
      movie_slug,
      movie_title,
      movie_poster,
      episode_name,
      video_url,
      host_user_id,
      host_name,
      host_avatar,
      is_private,
      password,
      max_viewers,
    } = body;

    if (!title || !movie_title) {
      return NextResponse.json({ error: "Thiếu thông tin phòng hoặc phim" }, { status: 400 });
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const slug = `room-${cleanSlug(title).slice(0, 30) || "xem-chung"}-${randomSuffix}`;

    const newRoom = watchPartyStore.createRoom({
      slug,
      title,
      movie_id: movie_id || movie_slug || "phim",
      movie_slug: movie_slug || "phim",
      movie_title,
      movie_poster: movie_poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
      episode_name: episode_name || "Tập 1",
      video_url: video_url || "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      host_user_id: host_user_id || "guest-" + Date.now(),
      host_name: host_name || "Thành viên RIOFLIX",
      host_avatar: host_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(host_name || "Guest"),
      host_avatar_frame: "https://sf-static.onflixcdn.com/images/pic/1768582864_url.webp",
      is_private: !!is_private,
      password: password || "",
      max_viewers: max_viewers ? parseInt(max_viewers) : 50,
      scheduled_time: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, room: newRoom, slug: newRoom.slug });
  } catch (error) {
    console.error("POST /api/xem-chung/create error:", error);
    return NextResponse.json({ error: "Tạo phòng thất bại" }, { status: 500 });
  }
}
