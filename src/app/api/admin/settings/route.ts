import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isSearchIndexingBlocked, setSystemSetting } from "@/lib/settings";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
    }

    const blockSearchIndexing = await isSearchIndexingBlocked();
    return NextResponse.json({ blockSearchIndexing });
  } catch (error) {
    console.error("[API Admin Settings GET]", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
    }

    const body = await request.json();
    const { blockSearchIndexing } = body;

    if (typeof blockSearchIndexing !== "boolean") {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const success = await setSystemSetting("block_search_indexing", String(blockSearchIndexing));

    if (!success) {
      return NextResponse.json({ error: "Không thể lưu cài đặt" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blockSearchIndexing,
      message: blockSearchIndexing
        ? "Đã BẬT chặn Google & công cụ tìm kiếm"
        : "Đã TẮT chặn Google (Cho phép tìm kiếm)",
    });
  } catch (error) {
    console.error("[API Admin Settings POST]", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
