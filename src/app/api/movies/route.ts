import { NextResponse } from "next/server";
import { cleanSlug } from "@/lib/utils";
import { fetchMovieDetailServer } from "@/lib/api";

function mapCategorySlug(slug: string): string {
  const clean = cleanSlug(slug);
  if (clean === "ngan" || clean === "phim-ngan" || clean === "short-drama") return "phim-ngan";
  if (clean === "lang-man") return "tinh-cam";
  if (clean === "phim-hai") return "hai-huoc";
  if (clean === "phim-tai-lieu") return "tai-lieu";
  if (clean === "toi-pham") return "hinh-su";
  if (clean === "tuoi-tre") return "hoc-duong";
  if (clean === "action-adventure") return "hanh-dong";
  if (clean === "huyen-huyen") return "than-thoai";
  if (clean === "khoa-hoc-vien-tuong") return "vien-tuong";
  if (clean === "lgbt") return "tinh-cam";
  if (clean === "chuyen-the") return "tam-ly";
  return clean;
}

function formatPoster(data: any, item: any): string {
  if (!item) return "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg";
  const rawUrl = item.poster_url || item.thumb_url || "";
  if (!rawUrl) return "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg";
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }
  const domainCdn = data?.data?.APP_DOMAIN_CDN_IMAGE || data?.pathImage || "https://phimimg.com";
  const cleanDomain = domainCdn.replace(/\/$/, "");
  const cleanPath = rawUrl.replace(/^\//, "");

  if (
    cleanPath.startsWith("upload/") ||
    cleanPath.startsWith("uploads/") ||
    cleanPath.startsWith("images/") ||
    cleanDomain.includes("/uploads")
  ) {
    return `${cleanDomain}/${cleanPath}`;
  }

  return `${cleanDomain}/uploads/movies/${cleanPath}`;
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "latest";
  const rawSlug = searchParams.get("slug") || "";
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";

  if (action === "detail" && rawSlug) {
    try {
      const movie = await fetchMovieDetailServer(rawSlug);
      return NextResponse.json({ success: true, movie });
    } catch (e) {
      return NextResponse.json({ success: false, error: "Movie detail fetch error" }, { status: 500 });
    }
  }

  // Multi-parameter filter options
  const typeParam = searchParams.get("type") || "";
  const categoryParam = searchParams.get("category") || "";
  const countryParam = searchParams.get("country") || "";
  const yearParam = searchParams.get("year") || "";
  const sortParam = searchParams.get("sort") || "";
  const langParam = searchParams.get("lang") || "";

  let targetUrl = "";

  const isFilterMode =
    action === "filter" ||
    Boolean(typeParam || categoryParam || countryParam || yearParam || sortParam || langParam);

  if (isFilterMode) {
    let typeSlug = "phim-bo";
    const t = typeParam || (action === "type" ? rawSlug : "");
    if (t === "single" || t === "phim-le") typeSlug = "phim-le";
    else if (t === "series" || t === "phim-bo") typeSlug = "phim-bo";
    else if (t === "chieu_rap" || t === "phim-chieu-rap") typeSlug = "phim-chieu-rap";
    else if (t === "hoat-hinh" || t === "phim-dang-chieu" || t === "dang_chieu") typeSlug = "hoat-hinh";
    else if (t === "tvshows" || t === "tv-shows") typeSlug = "tv-shows";
    else if (t && t !== "all" && t !== "phim-moi-cap-nhat") typeSlug = cleanSlug(t);

    targetUrl = `https://phimapi.com/v1/api/danh-sach/${typeSlug}?page=${page}`;

    if (categoryParam && categoryParam !== "all") {
      const catSlug = mapCategorySlug(categoryParam);
      targetUrl += `&category=${encodeURIComponent(catSlug)}`;
    }
    if (countryParam && countryParam !== "all") {
      targetUrl += `&country=${encodeURIComponent(cleanSlug(countryParam))}`;
    }
    if (yearParam && yearParam !== "all" && yearParam !== "Toàn bộ thập niên" && !isNaN(Number(yearParam))) {
      targetUrl += `&year=${encodeURIComponent(yearParam)}`;
    }
    if (sortParam) {
      if (sortParam === "year_desc" || sortParam === "Năm (Mới-Cũ)") {
        targetUrl += `&sort_field=year&sort_type=desc`;
      } else if (sortParam === "year_asc" || sortParam === "Năm (Cũ-Mới)") {
        targetUrl += `&sort_field=year&sort_type=asc`;
      } else if (sortParam === "tmdb" || sortParam === "Điểm TMDB") {
        targetUrl += `&sort_field=tmdb.vote_average&sort_type=desc`;
      } else if (sortParam === "latest" || sortParam === "Mới nhất") {
        targetUrl += `&sort_field=modified.time&sort_type=desc`;
      }
    }
    if (langParam && langParam !== "all") {
      targetUrl += `&sort_lang=${encodeURIComponent(langParam)}`;
    }
  } else if (action === "country") {
    targetUrl = `https://phimapi.com/v1/api/quoc-gia/${cleanSlug(rawSlug)}?page=${page}`;
  } else if (action === "category") {
    const catSlug = mapCategorySlug(rawSlug);
    targetUrl = `https://phimapi.com/v1/api/the-loai/${encodeURIComponent(catSlug)}?page=${page}`;
  } else if (action === "year") {
    targetUrl = `https://phimapi.com/v1/api/nam/${cleanSlug(rawSlug)}?page=${page}`;
  } else if (action === "type") {
    targetUrl = `https://phimapi.com/v1/api/danh-sach/${cleanSlug(rawSlug)}?page=${page}`;
  } else if (action === "search") {
    targetUrl = `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(query)}&page=${page}`;
  } else {
    targetUrl = `https://phimapi.com/v1/api/danh-sach/phim-bo?page=${page}`;
  }

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 120 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, items: [] });
    }

    const data = await res.json();
    const rawItems = data?.data?.items || data?.items || [];

    const items = rawItems.map((item: any) => ({
      id: item._id || item.slug,
      title: item.name || item.origin_name,
      posterUrl: formatPoster(data, item),
      year: item.year || 2026,
      episodes: item.episode_current || "FULL",
      quality: item.lang || item.quality || "Vietsub",
      linkUrl: `/phim/${item.slug}`,
      isTop10: false,
      modifiedTime: item.modified?.time || item.updatedAt || "",
    }));

    const pagination = data?.data?.params?.pagination || data?.data?.pagination || data?.pagination || {};
    const totalItems = Number(pagination.totalItems || pagination.totalItemsPerPage || items.length);
    const totalPages = Number(pagination.totalPages || 1);

    return NextResponse.json({
      success: true,
      items,
      page: Number(page),
      hasMore: items.length > 0,
      totalItems,
      totalPages,
      perPage: Number(pagination.totalItemsPerPage || items.length),
    });
  } catch (error) {
    return NextResponse.json({ success: false, items: [] });
  }
}
