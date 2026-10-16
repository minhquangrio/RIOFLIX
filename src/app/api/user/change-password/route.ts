import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST: Đổi mật khẩu người dùng
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, message: "Vui lòng nhập đầy đủ các trường thông tin" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Mật khẩu mới và xác nhận mật khẩu không khớp" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.password) {
      return NextResponse.json({ success: false, message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return NextResponse.json({ success: false, message: "Mật khẩu hiện tại không đúng" }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập tiếp theo.",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống khi đổi mật khẩu" }, { status: 500 });
  }
}
