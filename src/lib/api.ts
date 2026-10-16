import { MovieItem } from "@/types/movie";
import { 
  getMovieBySlug as getMockMovieBySlug, 
  movieCategories as mockCategories, 
  getMoviesByCountrySlug, 
  getMoviesByGenreSlug,
  getMoviesByYearSlug,
  MovieDetail 
} from "./mock-data";

export async function fetchLatestMovies(page = 1): Promise<MovieItem[]> {
  try {
    const res = await fetch(`/api/movies?action=latest&page=${page}`);
    if (!res.ok) throw new Error("API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items;
    }
    return mockCategories[0].movies;
  } catch (err) {
    return mockCategories[0].movies;
  }
}

export async function searchMovies(query: string, page = 1): Promise<MovieItem[]> {
  if (!query || query.trim().length === 0) return [];
  try {
    const res = await fetch(`/api/movies?action=search&q=${encodeURIComponent(query)}&page=${page}`);
    if (!res.ok) throw new Error("Search API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items;
    }
    const qLower = query.toLowerCase();
    const allMock = mockCategories.flatMap(c => c.movies);
    return allMock.filter(m => m.title.toLowerCase().includes(qLower));
  } catch (err) {
    const qLower = query.toLowerCase();
    const allMock = mockCategories.flatMap(c => c.movies);
    return allMock.filter(m => m.title.toLowerCase().includes(qLower));
  }
}

export async function fetchMoviesByCategory(categorySlug: string, page = 1): Promise<MovieItem[]> {
  try {
    const res = await fetch(`/api/movies?action=category&slug=${encodeURIComponent(categorySlug)}&page=${page}`);
    if (!res.ok) throw new Error("Category API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items;
    }
    return getMoviesByGenreSlug(categorySlug);
  } catch (err) {
    return getMoviesByGenreSlug(categorySlug);
  }
}

export async function fetchMoviesByCountry(countrySlug: string, page = 1): Promise<MovieItem[]> {
  try {
    const res = await fetch(`/api/movies?action=country&slug=${encodeURIComponent(countrySlug)}&page=${page}`);
    if (!res.ok) throw new Error("Country API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items;
    }
    return getMoviesByCountrySlug(countrySlug);
  } catch (err) {
    return getMoviesByCountrySlug(countrySlug);
  }
}

export async function fetchMoviesByYear(year: string, page = 1): Promise<MovieItem[]> {
  try {
    const res = await fetch(`/api/movies?action=year&slug=${encodeURIComponent(year)}&page=${page}`);
    if (!res.ok) throw new Error("Year API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items;
    }
    return getMoviesByYearSlug(year);
  } catch (err) {
    return getMoviesByYearSlug(year);
  }
}

export async function fetchMoviesByType(typeSlug: string, page = 1): Promise<MovieItem[]> {
  try {
    const res = await fetch(`/api/movies?action=type&slug=${encodeURIComponent(typeSlug)}&page=${page}`);
    if (!res.ok) throw new Error("Type API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items) && data.items.length > 0) {
      return data.items;
    }
    return mockCategories[0].movies;
  } catch (err) {
    return mockCategories[0].movies;
  }
}

export interface MovieFilterParams {
  type?: string;
  category?: string;
  country?: string;
  year?: string;
  sort?: string;
  lang?: string;
  page?: number;
}

export async function fetchFilteredMovies(params: MovieFilterParams): Promise<MovieItem[]> {
  try {
    const query = new URLSearchParams();
    query.set("action", "filter");
    if (params.type && params.type !== "all") query.set("type", params.type);
    if (params.category && params.category !== "all") query.set("category", params.category);
    if (params.country && params.country !== "all") query.set("country", params.country);
    if (params.year && params.year !== "all" && params.year !== "Toàn bộ thập niên") query.set("year", params.year);
    if (params.sort && params.sort !== "latest" && params.sort !== "Mới nhất") query.set("sort", params.sort);
    if (params.lang && params.lang !== "all") query.set("lang", params.lang);
    if (params.page) query.set("page", params.page.toString());

    const res = await fetch(`/api/movies?${query.toString()}`);
    if (!res.ok) throw new Error("Filter API route error");
    const data = await res.json();
    if (data.success && Array.isArray(data.items)) {
      return data.items;
    }
    return [];
  } catch (err) {
    console.error("fetchFilteredMovies error:", err);
    return [];
  }
}

export interface TopicDetailResult {
  theme?: {
    id: number;
    name: string;
    slug: string;
    color?: string;
    character_image_url?: string;
    is_shown?: boolean;
  };
  movies: MovieItem[];
  hasMore: boolean;
}

export async function fetchTopicMovies(topicSlug: string, page = 1): Promise<TopicDetailResult> {
  try {
    const res = await fetch(`https://k8s.onflixcdn.com/api/themes/${encodeURIComponent(topicSlug)}?page=${page}&limit=24`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://onflix.lat/"
      }
    });

    if (!res.ok) throw new Error("Failed to fetch topic movies from onflixcdn");
    const data = await res.json();
    const rawMovies = data.movies || [];
    const theme = data.theme;

    const movies: MovieItem[] = rawMovies.map((item: any) => {
      const rawPoster = item.poster_url || item.thumb_url || "";
      const poster = rawPoster
        ? (rawPoster.startsWith("http") ? rawPoster : `https://pics.onflixcdn.com${rawPoster.startsWith("/") ? "" : "/"}${rawPoster}`)
        : "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg";

      return {
        id: item.slug || String(item.id),
        title: item.title,
        originalTitle: item.original_title,
        posterUrl: poster,
        year: item.year || 2026,
        episodes: item.episode_current || "FULL",
        quality: item.quality || (item.is_4k ? "4K" : "HD"),
        linkUrl: `/phim/${item.slug}`,
        imdbScore: item.tmdb_vote_average ? item.tmdb_vote_average.toFixed(1) : undefined,
        rating: item.tmdb_vote_average ? item.tmdb_vote_average.toFixed(1) : undefined,
        vietsub: item.vietsub,
        thuyet_minh: item.thuyet_minh,
        long_tieng: item.long_tieng,
        is_sn: item.is_sn
      } as any;
    });

    return {
      theme,
      movies,
      hasMore: rawMovies.length >= 24
    };
  } catch (err) {
    console.error("fetchTopicMovies error:", err);
    return { movies: [], hasMore: false };
  }
}

import { cleanSlug } from "./utils";
import { getActorImage, formatActorName } from "./actor-images";

async function safeFetchJson(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Helper to attempt fetching raw API data for a given slug across multiple providers
async function tryFetchRawMovieData(targetSlug: string) {
  try {
    const [nguoncData, phimapiData, ophimData] = await Promise.all([
      safeFetchJson(`https://phim.nguonc.com/api/film/${targetSlug}`),
      safeFetchJson(`https://phimapi.com/phim/${targetSlug}`),
      safeFetchJson(`https://ophim1.com/phim/${targetSlug}`)
    ]);

    let primaryData: any = null;
    let imgDomain = "https://phimimg.com";
    const allEpisodesLists: Array<{ serverName: string; rawItems: any[]; source: string }> = [];

    // Helper to check if item has a valid playable stream (filters out dead domains like opstream12)
    const isWorkingStream = (item: any) => {
      const url = item?.link_m3u8 || item?.m3u8 || item?.link_embed || item?.embed || "";
      if (!url) return false;
      // Filter out known broken/dead CDN hosts
      if (url.includes("vip.opstream12.com") || url.includes("opstream1.com") || url.includes("opstream2.com")) {
        return false;
      }
      return true;
    };

    // 1. PhimAPI (High quality, high uptime, fast CDN)
    if (phimapiData?.status && phimapiData?.movie) {
      primaryData = phimapiData;
      imgDomain = "https://img.ophim.live/uploads/movies/";
      const epArr = phimapiData.episodes || [];
      epArr.forEach((srv: any, idx: number) => {
        const srvNameLower = (srv.server_name || "").toLowerCase();
        const isTm = srvNameLower.includes("thuyết minh") || 
                     srvNameLower.includes("thuyet minh") ||
                     srvNameLower.includes("lồng tiếng") ||
                     srvNameLower.includes("long tieng");
        
        const rawItems = (srv.server_data || []).filter((it: any) => it.link_m3u8 || it.link_embed);
        if (rawItems.length > 0) {
          allEpisodesLists.push({
            serverName: isTm ? `Thuyết Minh #1 (PA)` : (epArr.length > 1 ? `Vietsub #${idx + 1} (PA)` : "Vietsub (PA)"),
            rawItems,
            source: isTm ? "phimapi_tm" : "phimapi"
          });
        }
      });
    }

    // 2. OPhim (Fallback / Alternative provider)
    if (ophimData?.status && ophimData?.movie) {
      if (!primaryData) {
        primaryData = ophimData;
        imgDomain = (ophimData.pathImage as string) || "https://img.ophim.live/uploads/movies/";
      }
      const epArr = ophimData.episodes || [];
      epArr.forEach((srv: any, idx: number) => {
        const srvNameLower = (srv.server_name || "").toLowerCase();
        const isTm = srvNameLower.includes("thuyết minh") || 
                     srvNameLower.includes("thuyet minh") ||
                     srvNameLower.includes("lồng tiếng") ||
                     srvNameLower.includes("long tieng");
        
        // Filter out broken items if better servers exist
        let rawItems = (srv.server_data || []).filter((it: any) => it.link_m3u8 || it.link_embed);
        const filteredValidItems = rawItems.filter(isWorkingStream);
        if (filteredValidItems.length > 0) {
          rawItems = filteredValidItems;
        }

        if (rawItems.length > 0) {
          allEpisodesLists.push({
            serverName: isTm ? `Thuyết Minh #${idx + 1} (OP)` : `Vietsub #${idx + 1} (OP)`,
            rawItems,
            source: isTm ? "ophim_tm" : "ophim"
          });
        }
      });
    }

    // 3. NguonC (Direct or Alias fallback search)
    let validNguonc = nguoncData?.status === "success" ? nguoncData : null;

    if (!validNguonc && targetSlug === "transformers-chien-binh-cuoi-cung") {
      try {
        const aliasRes = await safeFetchJson(`https://phim.nguonc.com/api/film/robot-dai-chien-5-chien-binh-cuoi-cung`);
        if (aliasRes?.status === "success") validNguonc = aliasRes;
      } catch (e) {}
    }

    if (validNguonc && validNguonc.movie) {
      const nm = validNguonc.movie;
      if (!primaryData) {
        primaryData = {
          status: true,
          movie: {
            ...nm,
            name: nm.name,
            origin_name: nm.original_name,
            thumb_url: nm.thumb_url,
            poster_url: nm.poster_url,
            year: nm.year,
            content: nm.description,
            director: nm.director,
            actor: nm.casts ? nm.casts.split(",") : [],
            category: (nm.category || []).map((c: any) => ({ name: c.name, slug: c.slug })),
            country: (nm.country || []).map((c: any) => ({ name: c.name, slug: c.slug })),
          }
        };
        imgDomain = "";
      }
      const epArr = nm.episodes || [];
      epArr.forEach((srv: any, idx: number) => {
        const srvNameLower = (srv.server_name || "").toLowerCase();
        const isTm = srvNameLower.includes("thuyết minh") || 
                     srvNameLower.includes("thuyet minh") ||
                     srvNameLower.includes("lồng tiếng") ||
                     srvNameLower.includes("long tieng");
        const rawItems = srv.items || [];
        if (rawItems.length > 0) {
          allEpisodesLists.push({
            serverName: isTm ? `Thuyết Minh #${idx + 1} (NC)` : `Vietsub #${idx + 1} (NC)`,
            rawItems,
            source: isTm ? "nguonc_tm" : "nguonc"
          });
        }
      });
    }

    // Add extra SN & 4K servers matching available types
    if (allEpisodesLists.length > 0) {
      const vietsubEp = allEpisodesLists.find(s => !s.serverName.includes("Thuyết Minh"));
      const thuyetminhEp = allEpisodesLists.find(s => s.serverName.includes("Thuyết Minh"));

      if (vietsubEp) {
        allEpisodesLists.unshift({
          serverName: "Vietsub (SN)",
          rawItems: vietsubEp.rawItems,
          source: "subnhanh"
        });
      }

      if (thuyetminhEp) {
        allEpisodesLists.push({
          serverName: "Thuyết Minh (SN)",
          rawItems: thuyetminhEp.rawItems,
          source: "subnhanh_tm"
        });
      }

      const lastVietsub = [...allEpisodesLists].reverse().find(s => !s.serverName.includes("Thuyết Minh"));
      if (lastVietsub) {
        allEpisodesLists.push({
          serverName: "Vietsub (4K)",
          rawItems: lastVietsub.rawItems,
          source: "4k"
        });
      }

      const lastTM = [...allEpisodesLists].reverse().find(s => s.serverName.includes("Thuyết Minh"));
      if (lastTM) {
        allEpisodesLists.push({
          serverName: "Thuyết Minh (4K)",
          rawItems: lastTM.rawItems,
          source: "4k_tm"
        });
      }
    }

    if (primaryData) {
      return {
        data: primaryData,
        imgDomain,
        allEpisodesLists
      };
    }
  } catch (e) {}
  return null;
}

export async function fetchMovieDetailServer(slug: string): Promise<MovieDetail> {
  let fetched = await tryFetchRawMovieData(slug);

  // Fallback 1: Try cleaned slug (stripping trailing year or suffix like -2026, -2025, -full)
  if (!fetched) {
    const cleaned = slug.replace(/-\d{4}$/, "").replace(/-(vietsub|thuyetminh|full)$/i, "");
    if (cleaned !== slug) {
      fetched = await tryFetchRawMovieData(cleaned);
    }
  }

  // Fallback 2: Try searching API by keywords
  if (!fetched) {
    try {
      const query = slug.replace(/-/g, " ");
      const searchRes = await fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(query)}&limit=1`).then(r => r.json());
      if (searchRes?.status === "success" && searchRes.data?.items?.[0]?.slug) {
        fetched = await tryFetchRawMovieData(searchRes.data.items[0].slug);
      }
    } catch (e) {}
  }

  if (!fetched || !fetched.data || !fetched.data.movie) {
    return getMockMovieBySlug(slug);
  }

  const { data, imgDomain, allEpisodesLists } = fetched;
  const m = data.movie as Record<string, any>;

  const formatSingleUrl = (url: string) => {
    if (!url) return "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg";
    if (url.startsWith("http")) return url;
    const cleanDomain = (imgDomain || "https://phimimg.com").replace(/\/$/, "");
    const cleanPath = url.replace(/^\//, "");
    if (
      cleanPath.startsWith("upload/") ||
      cleanPath.startsWith("uploads/") ||
      cleanPath.startsWith("images/") ||
      cleanDomain.includes("/uploads")
    ) {
      return `${cleanDomain}/${cleanPath}`;
    }
    return `${cleanDomain}/uploads/movies/${cleanPath}`;
  };

  const poster = formatSingleUrl(m.poster_url || m.thumb_url);
  const backdrop = formatSingleUrl(m.thumb_url || m.poster_url);

  interface EpItem { number: number; title: string; slug?: string; embedUrl?: string; m3u8Url?: string }
  interface ServerSource {
    id: string;
    name: string;
    type: "video" | "iframe";
    url: string;
    episodesList: EpItem[];
  }

  const serverSources: ServerSource[] = [];

  // Parse episode sources from aggregated providers (PhimAPI, OPhim, NguonC)
  if (allEpisodesLists && allEpisodesLists.length > 0) {
    allEpisodesLists.forEach((srvGroup, i) => {
      const serverName = srvGroup.serverName;
      const epItems = srvGroup.rawItems || [];
      const epList: EpItem[] = epItems.map((ep: any, idx: number) => {
        const epName = ep.name || `${idx + 1}`;
        const embed = ep.link_embed || ep.embed || "";
        const m3u8 = ep.link_m3u8 || ep.m3u8 || "";
        const cleanedEmbed = (embed || "").replace(/https?:\/\/player\.phimapi\.com/g, "/player-proxy");
        const finalEmbed = cleanedEmbed || (m3u8 ? `/player-proxy/player/?url=${encodeURIComponent(m3u8)}` : "");

        return {
          number: idx + 1,
          title: `Tập ${epName}`,
          slug: ep.slug || epName,
          embedUrl: finalEmbed,
          m3u8Url: m3u8
        };
      });

      if (epList.length > 0) {
        serverSources.push({
          id: `server-${i}`,
          name: serverName,
          type: epList[0]?.m3u8Url ? "video" : "iframe",
          url: epList[0]?.embedUrl || epList[0]?.m3u8Url || "",
          episodesList: epList
        });
      }
    });
  }

  // Fallback if no server sources parsed
  if (serverSources.length === 0) {
    const embedUrl = `/player-proxy/player/?url=https://phimapi.com/phim/${m.slug || slug}`;
    serverSources.push({
      id: "vip1",
      name: "Server Vietsub 1",
      type: "iframe",
      url: embedUrl,
      episodesList: Array.from({ length: m.episode_total ? parseInt(m.episode_total) || 1 : 1 }, (_, i) => ({
        number: i + 1,
        title: `Tập ${i + 1}`,
        slug: `${i + 1}`,
        embedUrl,
        m3u8Url: ""
      }))
    });
  }

  // Prepare actors list
  const rawActors = Array.isArray(m.actor) ? m.actor : (typeof m.actor === "string" ? m.actor.split(",") : []);
  const actorsList = rawActors.map((actorName: string, idx: number) => {
    const trimmed = actorName.trim();
    return {
      id: idx + 100,
      name: trimmed,
      image_url: getActorImage(trimmed)
    };
  });

  const categoriesList = (m.category || []).map((c: any) => ({
    name: c.name,
    slug: c.slug
  }));

  const countriesList = (m.country || []).map((c: any) => ({
    name: c.name,
    slug: c.slug
  }));

  return {
    id: m._id || slug,
    slug: m.slug || slug,
    title: m.name || slug,
    originalTitle: m.origin_name || "",
    posterUrl: poster,
    backdropUrl: backdrop,
    videoUrl: serverSources[0]?.url || "",
    genres: categoriesList.map((c: any) => c.name),
    country: countriesList[0]?.name || "Đang cập nhật",
    releaseYear: m.year || 2026,
    episodes: m.episode_current || (m.total_episodes ? `Tập ${m.total_episodes}` : "Hoàn tất"),
    totalEpisodes: parseInt(m.episode_total) || serverSources[0]?.episodesList?.length || 1,
    episodesList: serverSources[0]?.episodesList || [],
    ratingScore: m.tmdb?.vote_average || 9.2,
    views: `${Math.floor((m.view || 1500) / 1000)}K`,
    director: m.director || "Đang cập nhật",
    actors: rawActors,
    actorsList,
    description: m.content ? m.content.replace(/<[^>]+>/g, '') : `Xem phim ${m.name} chất lượng cao Vietsub Thuyết Minh tại RIOFLIX.`,
    linkUrl: `/phim/${m.slug || slug}`,
    isTop10: true,
    quality: m.quality || "HD",
    language: m.lang || "Vietsub",
    trailerUrl: m.trailer_url || "",
    categoriesList,
    countriesList,
    serverSources
  };
}

export async function fetchMovieDetail(slug: string): Promise<MovieDetail> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/movies?action=detail&slug=${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.movie) {
          return data.movie;
        }
      }
    } catch (e) {}
  }
  return fetchMovieDetailServer(slug);
}

