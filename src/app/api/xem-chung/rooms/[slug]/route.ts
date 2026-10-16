import { NextRequest, NextResponse } from "next/server";
import { watchPartyStore } from "@/lib/watch-party-store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const room = watchPartyStore.getRoom(slug);

    if (!room) {
      return NextResponse.json({ error: "Phòng không tồn tại hoặc đã đóng" }, { status: 404 });
    }

    const messages = watchPartyStore.getMessages(slug);
    const participants = watchPartyStore.getParticipants(slug);

    return NextResponse.json({
      room,
      messages,
      participants,
    });
  } catch (error) {
    console.error("GET /api/xem-chung/rooms/[slug] error:", error);
    return NextResponse.json({ error: "Không thể lấy thông tin phòng" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const success = watchPartyStore.endRoom(slug);

    if (!success) {
      return NextResponse.json({ error: "Không tìm thấy phòng" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Đã đóng phòng thành công" });
  } catch (error) {
    console.error("DELETE /api/xem-chung/rooms/[slug] error:", error);
    return NextResponse.json({ error: "Đóng phòng thất bại" }, { status: 500 });
  }
}
