import { NextResponse } from "next/server";
import { heroSlidesData } from "@/lib/mock-data";
import { HeroSlide } from "@/types/movie";

// In-memory cache for ultra-fast response and reducing requests to onflix.lol
let cachedSlides: HeroSlide[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

function cleanHtml(str: string): string {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").trim();
}

function normalizeImageUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const cleanPath = url.replace(/^\//, "");
  return `https://sf-static.onflixcdn.com/${cleanPath}`;
}

async function scrapeOnflixBanner(): Promise<HeroSlide[] | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch("https://onflix.lol/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: controller.signal,
      next: { revalidate: 1800 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[Banner Sync] onflix.lol returned status: ${res.status}`);
      return null;
    }

    const html = await res.text();

    // Match the JSON items array in the RSC or DOM
    const regex = /\\?"items\\?":\s*(\[[\s\S]*?\])\s*\}\]/;
    const match = html.match(regex);
    if (!match) {
      console.warn("[Banner Sync] Regex match failed for slider items");
      return null;
    }

    let raw = match[1];
    if (raw.includes('\\"')) {
      raw = raw.replace(/\\"/g, '"');
    }

    const parsedArray = JSON.parse(raw);
    if (!Array.isArray(parsedArray) || parsedArray.length === 0) {
      return null;
    }

    const slides: HeroSlide[] = parsedArray.map((item: any, idx: number) => {
      const genres =
        typeof item.genre === "string"
          ? item.genre
              .split(",")
              .map((g: string) => g.trim())
              .filter(Boolean)
          : [];

      const bgUrl = normalizeImageUrl(item.background_url || item.image_url);
      const charUrl = normalizeImageUrl(item.character_image_url);
      const titleImg = normalizeImageUrl(item.title_image_url);

      return {
        id: item.id || idx + 1,
        title: item.title || "",
        titleImageUrl: titleImg,
        backdropUrl: bgUrl,
        characterUrl: charUrl,
        posterUrl: bgUrl,
        year: item.year || 2026,
        country: item.country || "Châu Á",
        episodes: item.episode_current || "",
        genres: genres.length > 0 ? genres : ["Phim Mới"],
        description: cleanHtml(item.description || ""),
        linkUrl: item.link_url || `/phim/${item.movie_id}`,
        videoUrl: item.video_url || "",
        isTop10: idx < 5,
      };
    });

    return slides;
  } catch (err: any) {
    console.error("[Banner Sync] Error scraping onflix.lol:", err?.message || err);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("refresh") === "true" || searchParams.get("refresh") === "1";
  const now = Date.now();

  // If cached and still valid, return cache directly
  if (!forceRefresh && cachedSlides && cachedSlides.length > 0 && now - lastCacheTime < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      fromCache: true,
      lastUpdated: new Date(lastCacheTime).toISOString(),
      slides: cachedSlides,
    });
  }

  // Scrape fresh data from onflix.lol
  const liveSlides = await scrapeOnflixBanner();

  if (liveSlides && liveSlides.length > 0) {
    cachedSlides = liveSlides;
    lastCacheTime = now;
    return NextResponse.json({
      success: true,
      fromCache: false,
      lastUpdated: new Date(now).toISOString(),
      slides: liveSlides,
    });
  }

  // Fallback: If live scrape failed, use cached slides if available, else static mock
  const fallback = cachedSlides || heroSlidesData;
  return NextResponse.json({
    success: true,
    fromCache: true,
    isFallback: true,
    lastUpdated: new Date(lastCacheTime || now).toISOString(),
    slides: fallback,
  });
}
