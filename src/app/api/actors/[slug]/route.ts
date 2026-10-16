import { NextResponse } from "next/server";
import { getActorBySlug } from "@/lib/actors-data";
import { searchMovies, fetchLatestMovies } from "@/lib/api";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  
  // Strip trailing id pattern like -1, -2 if present
  const slug = rawSlug.replace(/-\d+$/, "");

  const actorInfo = getActorBySlug(slug);

  if (!actorInfo) {
    return NextResponse.json({ success: false, message: "Không tìm thấy diễn viên" }, { status: 404 });
  }

  // Fetch movies starring this actor by searching actor's name
  let movies = await searchMovies(actorInfo.name);

  // If search returns few or no items, search by key parts of the name or fallback to latest movies
  if (!movies || movies.length === 0) {
    const firstName = actorInfo.name.split(" ")[0];
    if (firstName && firstName.length > 2) {
      movies = await searchMovies(firstName);
    }
  }

  if (!movies || movies.length === 0) {
    const latest = await fetchLatestMovies(1);
    movies = latest.slice(0, 8);
  }

  return NextResponse.json({
    success: true,
    data: {
      info: actorInfo,
      movies: movies.slice(0, 24),
    },
  });
}
