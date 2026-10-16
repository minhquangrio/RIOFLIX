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
      return NextResponse.json({ error: "Phòng không tồn tại" }, { status: 404 });
    }

    const body = await req.json();
    const { user_id, user_name, user_avatar, user_role, content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Nội dung tin nhắn không được để trống" }, { status: 400 });
    }

    const newMsg = watchPartyStore.addMessage({
      room_id: slug,
      user_id,
      user_name: user_name || "Ẩn danh",
      user_avatar,
      user_role: user_role || "viewer",
      content: content.trim(),
    });

    const messages = watchPartyStore.getMessages(slug);

    return NextResponse.json({
      success: true,
      message: newMsg,
      messages,
    });
  } catch (error) {
    console.error("POST message error:", error);
    return NextResponse.json({ error: "Gửi tin nhắn thất bại" }, { status: 500 });
  }
}
