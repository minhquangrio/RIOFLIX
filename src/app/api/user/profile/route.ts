import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Lấy thông tin chi tiết người dùng hiện tại
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });
  }

  try {
    const [user, watchlistCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.watchlist.count({
        where: { userId: session.user.id },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ success: false, message: "Không tìm thấy tài khoản" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        watchlistCount,
      },
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 500 });
  }
}

// PUT: Cập nhật thông tin người dùng (Họ tên, Ảnh đại diện)
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, image } = body;

    if (name !== undefined && typeof name === "string" && name.trim().length === 0) {
      return NextResponse.json({ success: false, message: "Họ tên không được để trống" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(image !== undefined && { image }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật hồ sơ thành công",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ success: false, message: "Lỗi cập nhật hồ sơ" }, { status: 500 });
  }
}
