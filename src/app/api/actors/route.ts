import { NextResponse } from "next/server";
import { FAMOUS_ACTORS } from "@/lib/actors-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "24", 10);

  let filtered = FAMOUS_ACTORS;

  if (query.trim()) {
    const qLower = query.toLowerCase().trim();
    filtered = FAMOUS_ACTORS.filter(
      (a) =>
        a.name.toLowerCase().includes(qLower) ||
        (a.original_name && a.original_name.toLowerCase().includes(qLower)) ||
        a.slug.toLowerCase().includes(qLower)
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    data: paginatedData,
    total,
    page,
    totalPages,
    limit,
  });
}
