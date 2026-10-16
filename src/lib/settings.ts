import { prisma } from "./prisma";

// Cache in-memory để tránh truy vấn DB lặp lại liên tục trên mỗi lượt SSR / render
const cachedSettings: Record<string, { value: string; expiry: number }> = {};
const CACHE_TTL_MS = 60 * 1000; // 60 giây

export async function getSystemSetting(key: string, defaultValue: string = ""): Promise<string> {
  const now = Date.now();
  if (cachedSettings[key] && cachedSettings[key].expiry > now) {
    return cachedSettings[key].value;
  }

  try {
    if (!prisma.systemSetting) {
      return defaultValue;
    }

    // Giới hạn timeout 1.5s để tránh treo SSR layout khi Database mất kết nối
    const fetchPromise = prisma.systemSetting.findUnique({
      where: { key },
    });

    const timeoutPromise = new Promise<{ value: string } | null>((_, reject) =>
      setTimeout(() => reject(new Error("DB_TIMEOUT")), 1500)
    );

    const setting = (await Promise.race([fetchPromise, timeoutPromise])) as { value: string } | null;
    const result = setting ? setting.value : defaultValue;

    cachedSettings[key] = { value: result, expiry: now + CACHE_TTL_MS };
    return result;
  } catch (error: unknown) {
    // Ghi nhận cảnh báo nhẹ nhàng trong môi trường dev mà không dùng console.error ném cả Error stack
    // (Next.js Turbopack sẽ coi console.error là lỗi SSR và hiện overlay đỏ)
    if (process.env.NODE_ENV === "development") {
      const err = error as { code?: string; message?: string } | undefined;
      const isConnectionIssue = err?.code === "45028" || err?.message === "DB_TIMEOUT" || err?.message?.includes("pool");
      if (isConnectionIssue) {
        console.warn(`[Settings] Cơ sở dữ liệu đang không phản hồi (khóa "${key}"), tạm dùng giá trị mặc định: "${defaultValue}"`);
      } else {
        console.warn(`[Settings] Không thể đọc khóa "${key}":`, err?.message || error);
      }
    }
    // Cache tạm giá trị mặc định trong 15s để không thử lại dồn dập
    cachedSettings[key] = { value: defaultValue, expiry: now + 15000 };
    return defaultValue;
  }
}

export async function setSystemSetting(key: string, value: string): Promise<boolean> {
  try {
    if (!prisma.systemSetting) {
      console.warn("[Settings] systemSetting model is not available on PrismaClient instance yet.");
      return false;
    }

    await prisma.systemSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    cachedSettings[key] = { value, expiry: Date.now() + CACHE_TTL_MS };
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string } | undefined;
    console.error(`[Settings] Error writing key "${key}":`, err?.message || error);
    return false;
  }
}

export async function isSearchIndexingBlocked(): Promise<boolean> {
  const value = await getSystemSetting("block_search_indexing", "false");
  return value === "true";
}

