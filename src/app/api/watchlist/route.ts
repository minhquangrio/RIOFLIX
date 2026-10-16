import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Lấy danh sách xem của user
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "list";

  // Check if a specific movie is in watchlist
  if (action === "check") {
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ success: false, inWatchlist: false });
    }
    try {
      const item = await prisma.watchlist.findUnique({
        where: {
          userId_movieSlug: {
            userId: session.user.id,
            movieSlug: slug,
          },
        },
      });
      return NextResponse.json({ success: true, inWatchlist: !!item });
    } catch {
      return NextResponse.json({ success: false, inWatchlist: false });
    }
  }

  // List action
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  try {
    const [items, total] = await Promise.all([
      prisma.watchlist.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.watchlist.count({
        where: { userId: session.user.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      items: items.map((item: any) => ({
        id: item.movieId,
        title: item.title,
        posterUrl: item.posterUrl || "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
        year: item.year,
        quality: item.quality,
        episodes: item.episodes,
        linkUrl: `/phim/${item.movieSlug}`,
        addedAt: item.createdAt,
      })),
      total,
      page,
      hasMore: skip + items.length < total,
    });
  } catch (error) {
    console.error("Watchlist GET error:", error);
    return NextResponse.json({ success: false, items: [], total: 0, message: "Lỗi server" }, { status: 500 });
  }
}

// POST: Thêm phim vào danh sách xem
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { movieId, movieSlug, title, posterUrl, year, quality, episodes } = body;

    if (!movieSlug || !title) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin phim" }, { status: 400 });
    }

    // Kiểm tra đã tồn tại chưa
    const existing = await prisma.watchlist.findUnique({
      where: {
        userId_movieSlug: {
          userId: session.user.id,
          movieSlug,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ success: true, message: "Phim đã có trong danh sách", exists: true });
    }

    await prisma.watchlist.create({
      data: {
        userId: session.user.id,
        movieId: movieId || movieSlug,
        movieSlug,
        title,
        posterUrl: posterUrl || null,
        year: year ? parseInt(year) : null,
        quality: quality || null,
        episodes: episodes || null,
      },
    });

    return NextResponse.json({ success: true, message: "Đã thêm vào danh sách xem" });
  } catch (error) {
    console.error("Watchlist POST error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// DELETE: Xoá phim khỏi danh sách xem
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const movieSlug = searchParams.get("slug");

    if (!movieSlug) {
      return NextResponse.json({ success: false, message: "Thiếu slug phim" }, { status: 400 });
    }

    await prisma.watchlist.deleteMany({
      where: {
        userId: session.user.id,
        movieSlug,
      },
    });

    return NextResponse.json({ success: true, message: "Đã xoá khỏi danh sách xem" });
  } catch (error) {
    console.error("Watchlist DELETE error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}