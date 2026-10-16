import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
  }

  try {
    const [totalUsers, totalAdmins, newUsersToday, activeUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "admin" } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.user.count({ where: { isActive: true } }),
    ]);

    // Người dùng mới 7 ngày qua (để vẽ biểu đồ)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    const registrationsByDay = await Promise.all(
      last7Days.map(async (date) => {
        const start = new Date(date.setHours(0, 0, 0, 0));
        const end = new Date(date.setHours(23, 59, 59, 999));
        const count = await prisma.user.count({
          where: { createdAt: { gte: start, lte: end } },
        });
        return {
          date: start.toLocaleDateString("vi-VN", { month: "short", day: "numeric" }),
          users: count,
        };
      })
    );

    return NextResponse.json({
      stats: {
        totalUsers,
        totalAdmins,
        newUsersToday,
        activeUsers,
      },
      chart: registrationsByDay,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Lỗi server." }, { status: 500 });
  }
}
