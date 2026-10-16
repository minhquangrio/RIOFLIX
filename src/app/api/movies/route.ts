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


async function fetchFromOnflixApi(params: {
  category?: string;
  country?: string;
  year?: string;
  type?: string;
  sort?: string;
  lang?: string;
  page?: string;
}) {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== "all") query.set("category", params.category);
    if (params.country && params.country !== "all") query.set("country", params.country);
    if (params.year && params.year !== "all" && params.year !== "Toàn bộ thập niên" && !isNaN(Number(params.year))) {
      query.set("year", params.year);
    }
    if (params.type && params.type !== "all") {
      let t = params.type;
      if (t === "phim-dang-chieu" || t === "dang_chieu") t = "dang_chieu";
      else if (t === "phim-chieu-rap" || t === "chieu_rap") t = "chieu_rap";
      else if (t === "tv-shows" || t === "tv_show" || t === "tvshows") t = "tv_show";
      else if (t === "single" || t === "phim-le") t = "phim-le";
      else if (t === "series" || t === "phim-bo") t = "phim-bo";
      query.set("type", t);
    }
    if (params.sort) {
      if (params.sort === "latest" || params.sort === "Mới nhất") query.set("sort", "newest");
      else if (params.sort === "tmdb" || params.sort === "Điểm TMDB") query.set("sort", "tmdb_score");
      else if (params.sort === "year_desc" || params.sort === "Năm (Mới-Cũ)") query.set("sort", "year_desc");
      else if (params.sort === "year_asc" || params.sort === "Năm (Cũ-Mới)") query.set("sort", "year_asc");
      else query.set("sort", params.sort);
    }
    if (params.lang && params.lang !== "all") query.set("lang", params.lang);
    query.set("page", params.page || "1");
    query.set("limit", "24");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://k8s.onflixcdn.com/api/movies?${query.toString()}`, {
      signal: controller.signal,
      next: { revalidate: 180 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://onflix.lat/",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    const rawList = data.data || [];
    if (!Array.isArray(rawList) || rawList.length === 0) return null;

    const items = rawList.map((item: any) => ({
      id: item.id || item.slug,
      title: item.title,
      originalTitle: item.original_title,
      posterUrl: item.poster_url || item.thumb_url || "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
      year: item.year || 2026,
      episodes: item.episode_current || "FULL",
      quality: item.quality || (item.is_4k ? "4K" : "HD"),
      linkUrl: `/phim/${item.slug}`,
      isTop10: false,
      imdbScore: item.tmdb_vote_average ? item.tmdb_vote_average.toFixed(1) : undefined,
      rating: item.tmdb_vote_average ? item.tmdb_vote_average.toFixed(1) : undefined,
      vietsub: item.vietsub,
      thuyet_minh: item.thuyet_minh,
      long_tieng: item.long_tieng,
      is_sn: item.is_sn,
    }));

    const pagination = data.pagination || {};
    return {
      items,
      totalItems: Number(pagination.total_items || items.length),
      totalPages: Number(pagination.total_pages || 1),
    };
  } catch (e) {
    return null;
  }
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
    // 1. Prioritize Onflix primary API (100% exact match to onflix.lat)
    const onflixData = await fetchFromOnflixApi({
      category: categoryParam,
      country: countryParam,
      year: yearParam,
      type: typeParam || (action === "type" ? rawSlug : ""),
      sort: sortParam,
      lang: langParam,
      page,
    });

    if (onflixData && onflixData.items.length > 0) {
      return NextResponse.json({
        success: true,
        items: onflixData.items,
        page: Number(page),
        hasMore: onflixData.items.length >= 24,
        totalItems: onflixData.totalItems,
        totalPages: onflixData.totalPages,
        perPage: 24,
      });
    }

    // 2. Fallback to PhimAPI if Onflix returns empty or fails
    let typeSlug = "phim-bo";
    const t = typeParam || (action === "type" ? rawSlug : "");
    if (t === "single" || t === "phim-le") typeSlug = "phim-le";
    else if (t === "series" || t === "phim-bo") typeSlug = "phim-bo";
    else if (t === "chieu_rap" || t === "phim-chieu-rap") typeSlug = "phim-chieu-rap";
    else if (t === "hoat-hinh") typeSlug = "hoat-hinh";
    else if (t === "dang_chieu" || t === "phim-dang-chieu") typeSlug = "phim-bo";
    else if (t === "tvshows" || t === "tv-shows" || t === "tv_show") typeSlug = "tv-shows";
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
    // Check onflix API first for country queries too
    const onflixCountry = await fetchFromOnflixApi({ country: cleanSlug(rawSlug), page });
    if (onflixCountry && onflixCountry.items.length > 0) {
      return NextResponse.json({
        success: true,
        items: onflixCountry.items,
        page: Number(page),
        hasMore: onflixCountry.items.length >= 24,
        totalItems: onflixCountry.totalItems,
        totalPages: onflixCountry.totalPages,
        perPage: 24,
      });
    }
    targetUrl = `https://phimapi.com/v1/api/quoc-gia/${cleanSlug(rawSlug)}?page=${page}`;
  } else if (action === "category") {
    const catSlug = mapCategorySlug(rawSlug);
    targetUrl = `https://phimapi.com/v1/api/the-loai/${encodeURIComponent(catSlug)}?page=${page}`;
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
