import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Vui lòng nhập email." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    // Luôn trả về success để tránh leak thông tin user
    if (!user) {
      return NextResponse.json({ message: "Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu." });
    }

    // Tạo token reset (hết hạn sau 1 giờ)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    // Xóa token cũ nếu có
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    // Lưu token mới
    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expires },
    });

    // Gửi email
    const resetUrl = `${process.env.NEXTAUTH_URL}/dat-lai-mat-khau?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Đặt lại mật khẩu RIOFLIX",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #09090b; color: #fff; padding: 40px; border-radius: 16px;">
          <h1 style="color: #22c55e; margin-bottom: 8px;">RIOFLIX</h1>
          <h2 style="color: #ffffff; font-size: 20px;">Đặt lại mật khẩu</h2>
          <p style="color: #a1a1aa;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản <strong style="color:#fff">${email}</strong>.</p>
          <p style="color: #a1a1aa;">Nhấn vào nút bên dưới để đặt lại mật khẩu. Link này có hiệu lực trong <strong style="color:#fff">1 giờ</strong>.</p>
          <a href="${resetUrl}" style="display:inline-block; margin: 24px 0; padding: 14px 32px; background: #22c55e; color: #000; font-weight: 700; border-radius: 12px; text-decoration: none; font-size: 15px;">Đặt lại mật khẩu</a>
          <p style="color: #52525b; font-size: 13px;">Nếu bạn không yêu cầu điều này, hãy bỏ qua email này. Mật khẩu sẽ không thay đổi.</p>
          <hr style="border-color:#27272a; margin: 24px 0;">
          <p style="color: #52525b; font-size: 12px;">© 2026 RIOFLIX - Kho Phim Giải Trí Đỉnh Cao</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Đã xảy ra lỗi. Vui lòng thử lại." }, { status: 500 });
  }
}
