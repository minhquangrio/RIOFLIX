"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { MovieGrid } from "@/components/MovieGrid";
import { fetchFilteredMovies, fetchMoviesByCategory } from "@/lib/api";
import { getMoviesByGenreSlug } from "@/lib/mock-data";
import { MovieItem } from "@/types/movie";
import { cleanSlug, getCategoryTitle, getCategorySlug } from "@/lib/utils";
import { Loader2, Film, Filter, RotateCcw } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const TOP_TABS = [
  { id: "all", label: "Tất cả", slug: "all" },
  { id: "phim-le", label: "Phim Lẻ", slug: "phim-le" },
  { id: "phim-bo", label: "Phim Bộ", slug: "phim-bo" },
  { id: "phim-chieu-rap", label: "Phim Chiếu Rạp", slug: "phim-chieu-rap" },
  { id: "hoat-hinh", label: "Phim Hoạt Hình", slug: "hoat-hinh" },
  { id: "tv-shows", label: "TV Shows", slug: "tv-shows" },
];

const CATEGORIES = [
  { id: "all", label: "Tất cả thể loại", slug: "all" },
  { id: "hanh-dong", label: "Hành Động", slug: "hanh-dong" },
  { id: "tinh-cam", label: "Tình Cảm", slug: "tinh-cam" },
  { id: "co-trang", label: "Cổ Trang", slug: "co-trang" },
  { id: "hai-huoc", label: "Hài Hước", slug: "hai-huoc" },
  { id: "tam-ly", label: "Tâm Lý", slug: "tam-ly" },
  { id: "hinh-su", label: "Hình Sự", slug: "hinh-su" },
  { id: "chien-tranh", label: "Chiến Tranh", slug: "chien-tranh" },
  { id: "the-thao", label: "Thể Thao", slug: "the-thao" },
  { id: "vo-thuat", label: "Võ Thuật", slug: "vo-thuat" },
  { id: "vien-tuong", label: "Viễn Tưởng", slug: "vien-tuong" },
  { id: "phieu-luu", label: "Phiêu Lưu", slug: "phieu-luu" },
  { id: "khoa-hoc", label: "Khoa Học", slug: "khoa-hoc" },
  { id: "kinh-di", label: "Kinh Dị", slug: "kinh-di" },
  { id: "am-nhac", label: "Âm Nhạc", slug: "am-nhac" },
  { id: "than-thoai", label: "Thần Thoại", slug: "than-thoai" },
  { id: "tai-lieu", label: "Tài Liệu", slug: "tai-lieu" },
  { id: "gia-dinh", label: "Gia Đình", slug: "gia-dinh" },
  { id: "chinh-kich", label: "Chính kịch", slug: "chinh-kich" },
  { id: "bi-an", label: "Bí ẩn", slug: "bi-an" },
  { id: "hoc-duong", label: "Học Đường", slug: "hoc-duong" },
  { id: "kinh-dien", label: "Kinh Điển", slug: "kinh-dien" },
  { id: "hoat-hinh", label: "Hoạt Hình", slug: "hoat-hinh" },
  { id: "ngan", label: "Phim Ngắn", slug: "ngan" }
];

const COUNTRIES = [
  { id: "all", label: "Toàn bộ khu vực" },
  { id: "trung-quoc", label: "Trung Quốc" },
  { id: "han-quoc", label: "Hàn Quốc" },
  { id: "au-my", label: "Âu Mỹ" },
  { id: "nhat-ban", label: "Nhật Bản" },
  { id: "thai-lan", label: "Thái Lan" },
  { id: "viet-nam", label: "Việt Nam" },
  { id: "dai-loan", label: "Đài Loan" },
  { id: "hong-kong", label: "Hồng Kông" },
  { id: "an-do", label: "Ấn Độ" },
  { id: "anh", label: "Anh" },
  { id: "phap", label: "Pháp" }
];

const LANGUAGES = [
  { id: "all", label: "Toàn bộ ngôn ngữ" },
  { id: "vietsub", label: "Phụ đề" },
  { id: "thuyet-minh", label: "Thuyết Minh" },
  { id: "long-tieng", label: "Lồng Tiếng" },
];

const YEARS = [
  { id: "all", label: "Toàn bộ thập niên" },
  { id: "2026", label: "2026" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
  { id: "2021", label: "2021" },
  { id: "2020", label: "2020" },
  { id: "2019", label: "2019" },
  { id: "2018", label: "2018" },
  { id: "2017", label: "2017" },
  { id: "2016", label: "2016" },
  { id: "2015", label: "2015" }
];

const SORTS = [
  { id: "latest", label: "Mới nhất" },
  { id: "tmdb", label: "Điểm TMDB" },
  { id: "year_desc", label: "Năm (Mới-Cũ)" },
  { id: "year_asc", label: "Năm (Cũ-Mới)" }
];

function CategoryContent({ rawSlug }: { rawSlug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Normalize current category slug
  const currentCategorySlug = getCategorySlug(rawSlug);
  const categoryTitle = getCategoryTitle(currentCategorySlug);

  // Filter params from URL searchParams
  const typeParam = searchParams.get("type") || "all";
  const categoryParam = searchParams.get("category") || currentCategorySlug;
  const countryParam = searchParams.get("country") || "all";
  const yearParam = searchParams.get("year") || "all";
  const langParam = searchParams.get("lang") || "all";
  const sortParam = searchParams.get("sort") || "latest";

  const [showFilters, setShowFilters] = useState(true);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Calculate active filter count (excluding default current category)
  const activeFiltersCount = [
    typeParam !== "all",
    categoryParam !== currentCategorySlug && categoryParam !== "all",
    countryParam !== "all",
    yearParam !== "all",
    langParam !== "all",
    sortParam !== "latest"
  ].filter(Boolean).length;

  const updateFilters = (newFilters: {
    type?: string;
    category?: string;
    country?: string;
    year?: string;
    lang?: string;
    sort?: string;
  }) => {
    // If a different category is chosen, navigate directly to that category page
    if (newFilters.category && newFilters.category !== categoryParam && newFilters.category !== "all") {
      router.push(`/the-loai/${newFilters.category}`);
      return;
    }

    const params = new URLSearchParams();
    const finalType = newFilters.type !== undefined ? newFilters.type : typeParam;
    const finalCat = newFilters.category !== undefined ? newFilters.category : categoryParam;
    const finalCountry = newFilters.country !== undefined ? newFilters.country : countryParam;
    const finalYear = newFilters.year !== undefined ? newFilters.year : yearParam;
    const finalLang = newFilters.lang !== undefined ? newFilters.lang : langParam;
    const finalSort = newFilters.sort !== undefined ? newFilters.sort : sortParam;

    if (finalType && finalType !== "all") params.set("type", finalType);
    if (finalCat && finalCat !== currentCategorySlug && finalCat !== "all") params.set("category", finalCat);
    if (finalCountry && finalCountry !== "all") params.set("country", finalCountry);
    if (finalYear && finalYear !== "all") params.set("year", finalYear);
    if (finalLang && finalLang !== "all") params.set("lang", finalLang);
    if (finalSort && finalSort !== "latest") params.set("sort", finalSort);

    const queryString = params.toString();
    const basePath = `/the-loai/${currentCategorySlug}`;
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  const handleResetFilters = () => {
    router.push(`/the-loai/${currentCategorySlug}`);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setPage(1);

    const loadData = async () => {
      try {
        const isDefaultState = 
          typeParam === "all" &&
          (categoryParam === currentCategorySlug || categoryParam === "all") &&
          countryParam === "all" &&
          yearParam === "all" &&
          langParam === "all" &&
          sortParam === "latest";

        let res: MovieItem[] = [];
        if (isDefaultState) {
          res = await fetchMoviesByCategory(currentCategorySlug, 1);
        } else {
          res = await fetchFilteredMovies({
            type: typeParam,
            category: categoryParam,
            country: countryParam,
            year: yearParam,
            lang: langParam,
            sort: sortParam,
            page: 1,
          });
        }

        if (isMounted) {
          const finalMovies = res && res.length > 0 ? res : getMoviesByGenreSlug(currentCategorySlug);
          setMovies(finalMovies);
          setHasMore(finalMovies.length >= 12);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          const mockMovies = getMoviesByGenreSlug(currentCategorySlug);
          setMovies(mockMovies);
          setHasMore(false);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentCategorySlug, typeParam, categoryParam, countryParam, yearParam, langParam, sortParam]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const isDefaultState = 
        typeParam === "all" &&
        (categoryParam === currentCategorySlug || categoryParam === "all") &&
        countryParam === "all" &&
        yearParam === "all" &&
        langParam === "all" &&
        sortParam === "latest";

      let newMovies: MovieItem[] = [];
      if (isDefaultState) {
        newMovies = await fetchMoviesByCategory(currentCategorySlug, nextPage);
      } else {
        newMovies = await fetchFilteredMovies({
          type: typeParam,
          category: categoryParam,
          country: countryParam,
          year: yearParam,
          lang: langParam,
          sort: sortParam,
          page: nextPage,
        });
      }

      if (newMovies && newMovies.length > 0) {
        setMovies((prev) => [...prev, ...newMovies]);
        setPage(nextPage);
        setHasMore(newMovies.length >= 12);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-20 container mx-auto px-4 md:px-8 lg:pl-28 space-y-4">
      {/* Category Title Header */}
      <div className="border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl border border-green-500/20">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Thể Loại: <span className="text-green-500">{categoryTitle}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Tuyển tập những bộ phim {categoryTitle} mới nhất và chất lượng cao.
            </p>
          </div>
        </div>
      </div>

      {/* Header Title & Top Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto scrollbar-hide py-1">
          {TOP_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => updateFilters({ type: tab.id })}
              className={`text-sm md:text-lg font-bold border-b-2 transition-all whitespace-nowrap pb-1 px-1 ${
                typeParam === tab.id || (typeParam === "" && tab.id === "all")
                  ? "border-green-500 text-green-500"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Expand / Collapse & Active Filter indicator */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors border border-zinc-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-green-500" />
              <span>Đặt lại ({activeFiltersCount})</span>
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs md:text-sm font-medium transition-colors"
          >
            <Filter className="w-4 h-4 text-green-500" />
            <span>{showFilters ? "Thu gọn bộ lọc" : "Bộ lọc nâng cao"}</span>
          </button>
        </div>
      </div>

      {/* Filter Drawer Panel */}
      {showFilters && (
        <div className="space-y-4 pb-4 mb-6 bg-zinc-900/80 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-zinc-800/80 shadow-2xl transition-all">
          {/* Category / Thể loại */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 text-sm">
            <span className="text-zinc-400 min-w-[90px] pt-1.5 font-semibold whitespace-nowrap text-xs md:text-sm">
              Thể loại:
            </span>
            <div className="flex-1 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = categoryParam === cat.id || (categoryParam === "all" && cat.id === currentCategorySlug);
                return (
                  <button
                    key={cat.id}
                    onClick={() => updateFilters({ category: cat.id })}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                      isActive
                        ? "bg-green-600 text-white font-semibold shadow-md shadow-green-900/30"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-950/70 border border-zinc-800/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Country / Khu vực */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 text-sm pt-2 border-t border-zinc-800/50">
            <span className="text-zinc-400 min-w-[90px] pt-1.5 font-semibold whitespace-nowrap text-xs md:text-sm">
              Khu vực:
            </span>
            <div className="flex-1 flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => updateFilters({ country: c.id })}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                    countryParam === c.id
                      ? "bg-green-600 text-white font-semibold shadow-md shadow-green-900/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-950/70 border border-zinc-800/50"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language / Ngôn ngữ */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 text-sm pt-2 border-t border-zinc-800/50">
            <span className="text-zinc-400 min-w-[90px] pt-1.5 font-semibold whitespace-nowrap text-xs md:text-sm">
              Ngôn ngữ:
            </span>
            <div className="flex-1 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => updateFilters({ lang: l.id })}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                    langParam === l.id
                      ? "bg-green-600 text-white font-semibold shadow-md shadow-green-900/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-950/70 border border-zinc-800/50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Year / Năm phát hành */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 text-sm pt-2 border-t border-zinc-800/50">
            <span className="text-zinc-400 min-w-[90px] pt-1.5 font-semibold whitespace-nowrap text-xs md:text-sm">
              Năm phát hành:
            </span>
            <div className="flex-1 flex flex-wrap gap-2">
              {YEARS.map((y) => (
                <button
                  key={y.id}
                  onClick={() => updateFilters({ year: y.id })}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                    yearParam === y.id
                      ? "bg-green-600 text-white font-semibold shadow-md shadow-green-900/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-950/70 border border-zinc-800/50"
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort / Sắp xếp */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 text-sm pt-2 border-t border-zinc-800/50">
            <span className="text-zinc-400 min-w-[90px] pt-1.5 font-semibold whitespace-nowrap text-xs md:text-sm">
              Sắp xếp:
            </span>
            <div className="flex-1 flex flex-wrap gap-2">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateFilters({ sort: s.id })}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                    sortParam === s.id
                      ? "bg-green-600 text-white font-semibold shadow-md shadow-green-900/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-950/70 border border-zinc-800/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Movies Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Đang tải danh sách phim...</p>
        </div>
      ) : movies.length > 0 ? (
        <MovieGrid
          movies={movies}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 my-6">
          <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-500">
            <Filter className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-lg font-bold text-white">Không tìm thấy phim phù hợp</h3>
            <p className="text-sm text-zinc-400">
              Hãy thử thay đổi các tiêu chí bộ lọc hoặc đặt lại bộ lọc để xem danh sách đầy đủ.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-all shadow-lg shadow-green-900/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      )}
    </main>
  );
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug;

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      <Header />
      <Sidebar />
      <Suspense
        fallback={
          <div className="min-h-screen pt-24 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        }
      >
        <CategoryContent rawSlug={rawSlug} />
      </Suspense>
      <Footer />
      <MobileNav />
    </div>
  );
}
