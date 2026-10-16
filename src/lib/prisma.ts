import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function getPrismaInstance(): PrismaClient {
  if (global.__prisma) {
    return global.__prisma;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient: Client } = require("@prisma/client");
  const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
  const adapter = new PrismaBetterSqlite3({ url: rawUrl });

  const client: PrismaClient = new Client({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    global.__prisma = client;
  }
  return client;
}

export const prisma = getPrismaInstance();

