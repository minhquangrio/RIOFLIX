"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { getTopicBySlug, TopicMeta } from "@/lib/onflix-home-data";
import { fetchMoviesByCategory, searchMovies, fetchLatestMovies, fetchTopicMovies } from "@/lib/api";
import { MovieItem } from "@/types/movie";
import { cleanSlug } from "@/lib/utils";
import { ChevronLeft, Hash, Loader2 } from "lucide-react";

interface TopicDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug;
  const decodedSlug = cleanSlug(rawSlug);

  const [topic, setTopic] = useState<TopicMeta | null>(null);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTopic = async () => {
      setLoading(true);
      const staticTopicData = getTopicBySlug(rawSlug) || getTopicBySlug(decodedSlug);

      try {
        const topicRes = await fetchTopicMovies(decodedSlug, 1);
        if (!isMounted) return;

        if (topicRes.movies && topicRes.movies.length > 0) {
          const themeTitle = topicRes.theme?.name || staticTopicData?.title || fallbackTopicTitle(rawSlug, decodedSlug);
          setTopic({
            title: themeTitle,
            slug: decodedSlug,
            url: `/chu-de/${decodedSlug}`,
            movieCount: topicRes.movies.length,
            movies: topicRes.movies,
            samplePosters: topicRes.movies.slice(0, 3).map((m) => m.posterUrl),
            description: staticTopicData?.description || `Tuyển tập phim ${themeTitle} đặc sắc chất lượng cao chọn lọc.`,
            tag: staticTopicData?.tag || "Tuyển tập",
          });
          setMovies(topicRes.movies);
          setHasMore(topicRes.hasMore);
          setPage(1);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error loading topic API:", err);
      }

      if (staticTopicData) {
        if (!isMounted) return;
        setTopic(staticTopicData);
        setMovies(staticTopicData.movies);
        setHasMore(false);
        setLoading(false);
        return;
      }

      const fallbackTitle = rawSlug
        .replace(/-/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const fallbackTopic: TopicMeta = {
        title: fallbackTopicTitle(rawSlug, fallbackTitle),
        slug: decodedSlug,
        url: `/chu-de/${decodedSlug}`,
        movieCount: 0,
        movies: [],
        samplePosters: [],
        description: `Tuyển tập phim ${fallbackTitle} đặc sắc chất lượng cao chọn lọc.`,
        tag: "Tuyển tập",
      };

      if (isMounted) {
        setTopic(fallbackTopic);
      }

      try {
        const res = await fetchMoviesByCategory(decodedSlug, 1);
        if (!isMounted) return;

        if (res && res.length > 0) {
          setMovies(res);
          setHasMore(res.length >= 12);
        } else {
          const sRes = await searchMovies(fallbackTitle, 1);
          if (!isMounted) return;

          if (sRes && sRes.length > 0) {
            setMovies(sRes);
            setHasMore(sRes.length >= 12);
          } else {
            const lRes = await fetchLatestMovies(1);
            if (isMounted) {
              setMovies(lRes);
              setHasMore(false);
            }
          }
        }
      } catch {
        // Fallback catch
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTopic();

    return () => {
      isMounted = false;
    };
  }, [rawSlug, decodedSlug]);

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    fetchTopicMovies(decodedSlug, nextPage)
      .then((res) => {
        if (res.movies && res.movies.length > 0) {
          setMovies((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const filtered = res.movies.filter((m) => !existingIds.has(m.id));
            return [...prev, ...filtered];
          });
          setPage(nextPage);
          setHasMore(res.hasMore);
        } else {
          fetchMoviesByCategory(decodedSlug, nextPage).then((newMovies) => {
            if (newMovies && newMovies.length > 0) {
              setMovies((prev) => [...prev, ...newMovies]);
              setPage(nextPage);
              setHasMore(newMovies.length >= 12);
            } else {
              setHasMore(false);
            }
          });
        }
        setLoadingMore(false);
      })
      .catch(() => {
        setHasMore(false);
        setLoadingMore(false);
      });
  };

  const title = topic?.title || "Chủ Đề Phim";

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />

      <main className="min-h-screen pt-24 pb-20 container mx-auto px-4 md:px-8 lg:pl-32">
        {/* Back Button Navigation */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/chu-de"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-green-400" />
            <span>Tất cả chủ đề</span>
          </Link>
        </div>

        {/* Hero Topic Header */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-green-950/40 p-6 sm:p-8 border border-zinc-800 shadow-2xl">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                <Hash className="h-3.5 w-3.5" />
                {topic?.tag || "Chủ đề phim"}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {movies.length} phim trong danh sách
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Chủ Đề: <span className="text-green-500">{title}</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {topic?.description || `Tổng hợp danh sách các phim thuộc chủ đề ${title} mới nhất.`}
            </p>
          </div>
        </div>

        {/* Movies Grid Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
            <p className="text-sm font-semibold text-zinc-400">Đang tải danh sách phim theo chủ đề...</p>
          </div>
        ) : movies.length > 0 ? (
          <MovieGrid
            movies={movies}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loadingMore={loadingMore}
          />
        ) : (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 border-dashed">
            <div className="text-4xl mb-3">🎬</div>
            <h3 className="text-lg font-bold text-white mb-2">Đang cập nhật danh sách phim</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-4">Chưa có bộ phim nào được liệt kê trong chủ đề này.</p>
            <Link
              href="/chu-de"
              className="inline-block px-5 py-2.5 rounded-xl bg-green-500 text-black font-semibold text-sm hover:bg-green-400 transition-colors"
            >
              Quay lại danh sách chủ đề
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

function fallbackTopicTitle(slug: string, raw: string): string {
  const map: Record<string, string> = {
    "de-xuat-cho-ban": "Đề Xuất Cho Bạn",
    "dang-chieu-phat": "Đang Chiếu Phát",
    "phim-ky-xao-man-nhan": "Phim Kỹ Xảo Mãn Nhãn",
    "phim-chat-luong-cao-va-phu-de-song-ngu": "Phim Chất Lượng Cao & Phụ Đề Song Ngữ",
    "hoat-hinh-chon-loc": "Hoạt Hình Chọn Lọc",
    "phieu-luu-mao-hiem": "Phiêu Lưu Mạo Hiểm",
    "phim-truyen-hinh-trung-quoc-dai-luc": "Phim Truyền Hình Trung Quốc",
    "tinh-yeu-la-nhung-gi-trai-tim-muon": "Tình Yêu Là Những Gì Trái Tim Muốn",
    "co-trang-huyen-ao": "Cổ Trang Huyền Ảo",
    "phim-han-quoc": "Phim Hàn Quốc",
    "thanh-xuan": "Thanh Xuân",
    "phim-chuyen-the-tu-tac-pham-van-hoc": "Phim Chuyển Thể Từ Tác Phẩm Văn Học",
    "phim-4k": "Phim 4K",
    "phim-cong-so": "Phim Công Sở",
    "hinh-su-toi-pham-han-quoc": "Hình Sự Tội Phạm Hàn Quốc",
    "phim-co-trang-huyen-huyen-khong-the-bo-lo": "Phim Cổ Trang Huyền Huyễn",
    "dien-anh-au-my": "Điện Ảnh Âu Mỹ",
  };

  return map[slug] || raw;
}
