import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Thông tin không hợp lệ." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Mật khẩu phải có ít nhất 6 ký tự." }, { status: 400 });
    }

    // Tìm token hợp lệ
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn." },
        { status: 400 }
      );
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 12);

    // Cập nhật mật khẩu
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Xóa token đã dùng
    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Mật khẩu đã được đặt lại thành công!" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Đã xảy ra lỗi. Vui lòng thử lại." }, { status: 500 });
  }
}
