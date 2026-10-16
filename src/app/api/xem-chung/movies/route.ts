import { NextRequest, NextResponse } from "next/server";
import { fetchLatestMovies, fetchMovieDetail } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const query = searchParams.get("q") || "";

    const movies = await fetchLatestMovies(page);
    let items = movies;
    if (query) {
      const qLower = query.toLowerCase();
      items = items.filter(
        (m) =>
          m.title.toLowerCase().includes(qLower) ||
          (m.originalTitle && m.originalTitle.toLowerCase().includes(qLower))
      );
    }

    items = items.slice(0, limit);

    // Enrich items with episode information for room selection
    const enrichedItems = await Promise.all(
      items.map(async (m) => {
        const slug = m.linkUrl ? m.linkUrl.replace(/^\/phim\//, "") : String(m.id);
        try {
          const detail = await fetchMovieDetail(slug);
          const episodesList = detail.serverSources?.[0]?.episodesList || detail.episodesList || [
            { number: 1, title: "Tập 1", slug: "1", embedUrl: detail.videoUrl, m3u8Url: detail.videoUrl }
          ];
          const firstEp = episodesList[0];
          const bestVideoUrl = firstEp?.embedUrl || firstEp?.m3u8Url || detail.videoUrl;

          return {
            ...m,
            slug,
            videoUrl: bestVideoUrl,
            episodesList,
            serverSources: detail.serverSources,
          };
        } catch (e) {
          return {
            ...m,
            slug,
            videoUrl: m.linkUrl,
            episodesList: [{ number: 1, title: "Tập 1", slug: "1", embedUrl: m.linkUrl, m3u8Url: "" }]
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      items: enrichedItems,
      page,
      limit,
    });
  } catch (error) {
    console.error("GET /api/xem-chung/movies error:", error);
    return NextResponse.json({ error: "Không thể nạp danh sách phim" }, { status: 500 });
  }
}
