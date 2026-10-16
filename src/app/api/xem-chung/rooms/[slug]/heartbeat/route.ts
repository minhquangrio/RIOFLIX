import { NextRequest, NextResponse } from "next/server";
import { watchPartyStore } from "@/lib/watch-party-store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const room = watchPartyStore.getRoom(slug);

    if (!room) {
      return NextResponse.json({ error: "Phòng không tồn tại hoặc đã đóng" }, { status: 404 });
    }

    const body = await req.json();
    const { user_id, user_name, user_avatar, current_time, is_playing, is_host } = body;

    if (user_id && user_name) {
      watchPartyStore.pingParticipant(slug, {
        user_id,
        user_name,
        user_avatar,
        last_ping: Date.now(),
      });
    }

    // Host updates video state
    if (is_host) {
      if (typeof current_time === "number") {
        watchPartyStore.updateRoomState(slug, { current_time });
      }
      if (typeof is_playing === "boolean") {
        watchPartyStore.updateRoomState(slug, { is_playing });
      }
    }

    const updatedRoom = watchPartyStore.getRoom(slug);
    const messages = watchPartyStore.getMessages(slug);
    const participants = watchPartyStore.getParticipants(slug);

    return NextResponse.json({
      room: updatedRoom,
      messages,
      participants,
    });
  } catch (error) {
    console.error("POST heartbeat error:", error);
    return NextResponse.json({ error: "Heartbeat failed" }, { status: 500 });
  }
}
