import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET - Lấy danh sách users
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server." }, { status: 500 });
  }
}

// PATCH - Cập nhật role hoặc trạng thái user
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
  }

  try {
    const { id, role, isActive } = await req.json();
    if (!id) return NextResponse.json({ error: "Thiếu ID." }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (role !== undefined) data.role = role;
    if (isActive !== undefined) data.isActive = isActive;

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });
    return NextResponse.json({ user: updated });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server." }, { status: 500 });
  }
}

// DELETE - Xóa user
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Thiếu ID." }, { status: 400 });

    // Không cho phép xóa chính mình
    if (id === (session.user as any).id) {
      return NextResponse.json({ error: "Không thể xóa tài khoản của chính mình." }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "Đã xóa người dùng." });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server." }, { status: 500 });
  }
}
