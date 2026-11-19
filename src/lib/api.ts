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
      // Only merge OPhim's servers when its movie for this slug is actually
      // the same film as the primary source (slug collisions across
      // providers are common).
      const ophimIsSameMovie = isSameProviderMovie(primaryData?.movie, ophimData.movie);
      if (!primaryData) {
        primaryData = ophimData;
        imgDomain = (ophimData.pathImage as string) || "https://img.ophim.live/uploads/movies/";
      }
      const epArr = ophimIsSameMovie ? (ophimData.episodes || []) : [];
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
      // NguonC slugs collide with unrelated titles (its "bat-tien" is the
      // Filipino film "Bất Tiện", not the animated "Bát Tiên!"), so only
      // merge its servers when it is the same movie as the primary source.
      const nguoncIsSameMovie = isSameProviderMovie(primaryData?.movie, nm);
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
      const epArr = nguoncIsSameMovie ? (nm.episodes || []) : [];
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

    // Drop duplicate server lists. The old code fabricated "Vietsub (SN)" /
    // "Vietsub (4K)" entries as literal copies of other providers' lists, so
    // those buttons always replayed the exact same stream (and when the
    // copied list came from a slug-collided provider, they always played the
    // wrong movie). Only genuinely distinct sources are offered now.
    const seenStreamSignatures = new Set<string>();
    const uniqueEpisodesLists = allEpisodesLists.filter(group => {
      const sig = (group.rawItems || [])
        .map(it => String(it?.link_m3u8 || it?.m3u8 || it?.link_embed || it?.embed || ""))
        .join("|");
      if (!sig || seenStreamSignatures.has(sig)) return false;
      seenStreamSignatures.add(sig);
      return true;
    });

    if (primaryData) {
      return {
        data: primaryData,
        imgDomain,
        allEpisodesLists: uniqueEpisodesLists
      };
    }
  } catch (e) {}
  return null;
}

// ─── Slug/title matching helpers ───────────────────────────────────────────
// Each source names movies differently (onflix: "mua-2-nguoi-x" while
// phimapi: "nguoi-x-phan-2"), so we generate alternative slugs and search
// keywords instead of trusting the raw stored slug.

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(slug: string): string[] {
  return normalizeText(slug).replace(/-/g, " ").split(" ").filter(Boolean);
}

function uniqueKeepOrder(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    const key = it.toLowerCase();
    if (!it || seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

const NOISE_TOKENS = ["vietsub", "thuyetminh", "full", "vs", "tm", "longtieng"];

function isYearToken(w: string): boolean {
  return /^(19|20)\d{2}$/.test(w);
}

// Alternative slugs across providers ("mua-2-X" -> "X-phan-2", ...)
export function buildSlugCandidates(slug: string): string[] {
  const candidates: string[] = [slug];

  const cleaned = slug.replace(/-\d{4}$/, "").replace(/-(vietsub|thuyetminh|full)$/i, "");
  if (cleaned !== slug) candidates.push(cleaned);

  // "mua-2-nguoi-x" -> "nguoi-x-phan-2"
  let m = cleaned.match(/^mua[-_]?(\d+)[-_](.+)$/);
  if (m) candidates.push(`${m[2]}-phan-${m[1]}`);
  // "<name>-mua-2" / "<name>-season-2" -> "<name>-phan-2" and "<name>-mua-2"
  m = cleaned.match(/^(.*?)[-_](?:mua|season)[-_](\d+)$/);
  if (m) {
    candidates.push(`${m[1]}-phan-${m[2]}`);
    candidates.push(`${m[1]}-mua-${m[2]}`);
  }
  // "<name>-phan-2" -> "<name>-mua-2"
  m = cleaned.match(/^(.*?)[-_]phan[-_](\d+)$/);
  if (m) candidates.push(`${m[1]}-mua-${m[2]}`);

  // Title shortening: providers often cut the name at the colon subtitle,
  // while onflix-style SEO slugs keep it
  // ("bac-si-x-mafia-ao-trang" -> try "bac-si-x-mafia-ao", "bac-si-x-mafia", "bac-si-x").
  const toks = cleaned.split("-").filter(Boolean);
  for (let i = toks.length - 1; i >= Math.max(2, toks.length - 3); i--) {
    candidates.push(toks.slice(0, i).join("-"));
  }

  // Each candidate also without trailing year
  const expanded = candidates.flatMap(c => {
    const noYear = c.replace(/-\d{4}$/, "");
    return [c, noYear !== c ? noYear : ""].filter(Boolean);
  });

  return uniqueKeepOrder(expanded);
}

// Human-readable search keywords derived from the slug.
export function buildSearchKeywords(slug: string): string[] {
  const words = tokenize(slug);
  const core = words.filter(w => !isYearToken(w) && !NOISE_TOKENS.includes(w));

  // Drop leading "mua 2" / trailing "phan 2" season markers
  const dropLeadSeason = [...core];
  if (dropLeadSeason[0] === "mua" && /^\d+$/.test(dropLeadSeason[1] || "")) {
    dropLeadSeason.splice(0, 2);
  }
  const dropTailSeason = [...core];
  if (
    /^(phan|mua|season)$/.test(dropTailSeason[dropTailSeason.length - 2] || "") &&
    /^\d+$/.test(dropTailSeason[dropTailSeason.length - 1] || "")
  ) {
    dropTailSeason.splice(-2);
  }

  const kws = [
    dropLeadSeason.join(" "),
    dropTailSeason.join(" "),
    core.join(" "),
    words.join(" "),
  ];
  // Drop trailing words ("bac si x mafia ao trang" -> ... -> "bac si x") for
  // providers that store only the shortened main title.
  const baseTokens = dropLeadSeason.length >= 3 ? dropLeadSeason : core;
  for (let k = baseTokens.length - 1; k >= Math.max(2, baseTokens.length - 3); k--) {
    kws.push(baseTokens.slice(0, k).join(" "));
  }

  return uniqueKeepOrder(kws).filter(k => k.split(" ").length >= 2).slice(0, 8);
}

// Check whether a provider movie name still matches the target slug.
// Accepts Jaccard similarity, or a "shortened title" (all name tokens are in
// the target and drop no more than ~60% of the words) so that
// "bac-si-x-mafia-ao-trang" can resolve to the provider's "Bác Sĩ X" while a
// 2-word prefix colliding with a different movie ("Bác Sĩ ...") is rejected.
function nameMatchesTarget(targetSlug: string, providerName: string): boolean {
  const a = new Set(tokenize(targetSlug).filter(w => !isYearToken(w) && !NOISE_TOKENS.includes(w)));
  const b = new Set(tokenize(providerName).filter(w => !isYearToken(w) && !NOISE_TOKENS.includes(w)));
  if (a.size === 0 || b.size === 0) return false;
  let overlap = 0;
  for (const w of b) if (a.has(w)) overlap++;
  if (overlap === 0) return false;
  const jaccard = overlap / new Set([...a, ...b]).size;
  const containment = overlap / b.size;
  const lengthRatio = b.size / a.size;
  return jaccard >= 0.3 || (containment >= 0.9 && lengthRatio >= 0.4);
}

// Jaccard similarity between the stored slug and a provider slug.
export function slugSimilarity(targetSlug: string, itemSlug: string): number {
  const aTokens = tokenize(targetSlug).filter(w => !isYearToken(w) && !NOISE_TOKENS.includes(w));
  const bTokens = tokenize(itemSlug).filter(w => !isYearToken(w) && !NOISE_TOKENS.includes(w));
  if (aTokens.length === 0 || bTokens.length === 0) return 0;
  const a = new Set(aTokens);
  const b = new Set(bTokens);
  let overlap = 0;
  for (const w of a) if (b.has(w)) overlap++;
  if (overlap === 0) return 0;
  const union = new Set([...a, ...b]).size;
  return overlap / union;
}

// ─── Provider movie identity ─────────────────────────────────────────────────
// The same slug can point to DIFFERENT movies at different providers:
// phimapi's "bat-tien" is "Bát Tiên!" (2026, animation) while NguonC's
// "bat-tien" is "Bất Tiện" (2024, Filipino drama). normalizeText() strips
// Vietnamese diacritics, so both read as "bat tien" — a provider-vs-provider
// comparison must therefore KEEP diacritics first, and only fall back to
// year / original (Latin) title when the unaccented forms collide.

function titleTokenSet(input: string, stripDiacritics: boolean): Set<string> {
  let s = (input || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ");
  if (stripDiacritics) {
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  }
  s = s.replace(/\s+/g, " ").trim();
  return new Set(s.split(" ").filter(w => w && !NOISE_TOKENS.includes(w) && !isYearToken(w)));
}

function tokenOverlapCount(a: Set<string>, b: Set<string>): number {
  let overlap = 0;
  for (const w of b) if (a.has(w)) overlap++;
  return overlap;
}

// A raw provider movie object; shapes differ per provider, so only the
// identity-relevant fields are typed (they arrive as arbitrary JSON).
type ProviderMovie = Record<string, unknown> | null | undefined;

// Providers expose the title/year under slightly different field names.
function providerMovieName(m: ProviderMovie): string {
  return String(m?.name || m?.film_name || m?.title || "");
}
function providerMovieOriginName(m: ProviderMovie): string {
  return String(m?.origin_name || m?.original_name || "");
}
function providerMovieYear(m: ProviderMovie): number | null {
  const match = String(m?.year || "").match(/(?:19|20)\d{2}/);
  return match ? parseInt(match[0], 10) : null;
}

// Years: compatible when either side is unknown or they're within 1 year.
function providerYearsCompatible(a: ProviderMovie, b: ProviderMovie): boolean {
  const ya = providerMovieYear(a);
  const yb = providerMovieYear(b);
  if (!ya || !yb) return true;
  return Math.abs(ya - yb) <= 1;
}

// Original titles: compatible when either side is unknown or they share a token.
function providerOriginsCompatible(a: ProviderMovie, b: ProviderMovie): boolean {
  const oa = titleTokenSet(providerMovieOriginName(a), true);
  const ob = titleTokenSet(providerMovieOriginName(b), true);
  if (oa.size === 0 || ob.size === 0) return true;
  return tokenOverlapCount(oa, ob) > 0;
}

// True when two raw provider movie objects refer to the same film.
export function isSameProviderMovie(primary: ProviderMovie, candidate: ProviderMovie): boolean {
  if (!primary || !candidate) return true;

  const pName = titleTokenSet(providerMovieName(primary), false);
  const cName = titleTokenSet(providerMovieName(candidate), false);
  if (pName.size > 0 && cName.size > 0) {
    const overlap = tokenOverlapCount(pName, cName);
    const union = new Set([...pName, ...cName]).size;
    if (overlap > 0 && overlap / union >= 0.6) return true; // clearly the same title
    if (overlap === 0) {
      // Titles share nothing with diacritics on. They may still be the same
      // movie stored with/without marks ("Bát Tiên" vs "Bat Tien") — or two
      // different movies that slug-collide ("Bát Tiên" vs "Bất Tiện").
      // Decide only with independent evidence: year + original title.
      const pPlain = titleTokenSet(providerMovieName(primary), true);
      const cPlain = titleTokenSet(providerMovieName(candidate), true);
      if (tokenOverlapCount(pPlain, cPlain) === 0) return false;
      return providerYearsCompatible(primary, candidate) &&
        providerOriginsCompatible(primary, candidate);
    }
    // Partial title overlap (e.g. season-wording variants): confirm below.
  }

  return providerYearsCompatible(primary, candidate) &&
    providerOriginsCompatible(primary, candidate);
}

export async function fetchMovieDetailServer(slug: string): Promise<MovieDetail> {
  let fetched = await tryFetchRawMovieData(slug);

  // Fallback 1: try slug variants across providers (year/suffix/season naming
  // and shortened prefixes for titles cut at the colon subtitle). A variant is
  // only accepted when the provider's movie name still resembles the request.
  if (!fetched) {
    for (const cand of buildSlugCandidates(slug)) {
      if (cand === slug) continue;
      const found = await tryFetchRawMovieData(cand);
      if (!found) continue;
      const movieName = String(found.data?.movie?.name || found.data?.movie?.origin_name || "");
      if (!nameMatchesTarget(slug, movieName)) continue;
      fetched = found;
      break;
    }
  }

  // Fallback 2: search by readable keywords and pick the best-matching result
  if (!fetched) {
    for (const keyword of buildSearchKeywords(slug)) {
      try {
        const searchRes = (await safeFetchJson(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&limit=8`
        )) as { data?: { items?: { slug?: string }[] } } | null;
        const items = searchRes?.data?.items ?? [];
        const ranked = items
          .map((it) => {
            const itemSlug = String(it?.slug || "");
            return { slug: itemSlug, score: slugSimilarity(slug, itemSlug) };
          })
          .filter(c => c.slug && c.score >= 0.35)
          .sort((x, y) => y.score - x.score)
          .slice(0, 3);
        for (const cand of ranked) {
          const found = await tryFetchRawMovieData(cand.slug);
          if (found) {
            fetched = found;
            break;
          }
        }
        if (fetched) break;
      } catch {}
    }
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

