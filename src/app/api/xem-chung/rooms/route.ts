import { NextResponse } from "next/server";
import { watchPartyStore } from "@/lib/watch-party-store";

export async function GET() {
  try {
    const rooms = watchPartyStore.getRooms();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("GET /api/xem-chung/rooms error:", error);
    return NextResponse.json({ error: "Không thể nạp danh sách phòng chiếu" }, { status: 500 });
  }
}
