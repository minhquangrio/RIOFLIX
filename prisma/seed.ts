import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url: rawUrl });
const prisma = new PrismaClient({ adapter });

async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

async function main() {
  const adminEmail = "minhquang1701@gmail.com";
  const adminPassword = "nhokity123";
  const adminName = "Admin Rioflix";

  // Kiểm tra admin đã tồn tại chưa
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    if (existing.role !== "admin") {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "admin" },
      });
      console.log(`✅ Đã nâng cấp ${adminEmail} lên admin.`);
    } else {
      console.log(`ℹ️  Admin ${adminEmail} đã tồn tại.`);
    }
  } else {
    const hashedPassword = await hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      },
    });

    console.log(`✅ Đã tạo tài khoản admin: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
