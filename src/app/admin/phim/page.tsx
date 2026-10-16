"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Edit3,
  ExternalLink,
  Film,
  Loader2,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
  Tv,
  Clapperboard,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MovieItem } from "@/types/movie";

interface EditableMovie extends MovieItem {
  status?: "visible" | "hidden";
}

const CATEGORY_FILTERS = [
  { label: "Mới cập nhật", action: "latest", slug: "" },
  { label: "Phim lẻ", action: "type", slug: "phim-le" },
  { label: "Phim bộ", action: "type", slug: "phim-bo" },
  { label: "Chiếu rạp", action: "type", slug: "phim-chieu-rap" },
];

function StatCard({ icon: Icon, label, value, color, sub }: { icon: React.ElementType; label: string; value: number | string; color: string; sub?: string }) {
  return (
    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:border-white/20 transition-all">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-zinc-400 font-medium">{label}</p>
        <p className="text-2xl font-extrabold text-white mt-0.5">{typeof value === 'number' ? value.toLocaleString('vi-VN') : value}</p>
        {sub && <p className="text-[11px] text-zinc-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<EditableMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(CATEGORY_FILTERS[0]);
  const [editingMovie, setEditingMovie] = useState<EditableMovie | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | number | null>(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statsSummary, setStatsSummary] = useState({
    total: 29039,
    single: 16855,
    series: 8726,
    anime: 3458,
  });

  const loadStats = useCallback(async () => {
    try {
      const [seriesRes, singleRes, animeRes] = await Promise.all([
        fetch("/api/movies?action=type&slug=phim-bo").then((r) => r.json()),
        fetch("/api/movies?action=type&slug=phim-le").then((r) => r.json()),
        fetch("/api/movies?action=type&slug=hoat-hinh").then((r) => r.json()),
      ]);
      const seriesCount = Number(seriesRes.totalItems || 8726);
      const singleCount = Number(singleRes.totalItems || 16855);
      const animeCount = Number(animeRes.totalItems || 3458);
      const totalCount = seriesCount + singleCount + animeCount;

      setStatsSummary({
        total: totalCount,
        series: seriesCount,
        single: singleCount,
        anime: animeCount,
      });
    } catch {}
  }, []);

  const loadMovies = useCallback(async (targetPage = 1) => {
    setLoading(true);
    setPage(targetPage);
    const params = new URLSearchParams({ action: activeFilter.action, page: String(targetPage) });
    if (activeFilter.slug) params.set("slug", activeFilter.slug);

    try {
      const res = await fetch(`/api/movies?${params.toString()}`);
      const data = await res.json();
      const items = data.items || [];
      setMovies(items.map((movie: MovieItem) => ({ ...movie, status: "visible" })));
      setTotalMovies(Number(data.totalItems || items.length));
      setTotalPages(Number(data.totalPages || Math.ceil((data.totalItems || items.length) / 24)));
    } catch {
      setMovies([]);
      setTotalMovies(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  const filteredMovies = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return movies;

    return movies.filter((movie) =>
      [movie.title, movie.originalTitle, movie.quality, movie.episodes, String(movie.year || "")]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(keyword))
    );
  }, [movies, search]);

  const updateMovie = (patch: Partial<EditableMovie>) => {
    if (!editingMovie) return;
    const updated = { ...editingMovie, ...patch };
    setEditingMovie(updated);
    setMovies((current) => current.map((movie) => (movie.id === updated.id ? updated : movie)));
  };

  const deleteMovie = (id: string | number) => {
    setMovies((current) => current.filter((movie) => movie.id !== id));
    setConfirmDelete(null);
    if (editingMovie?.id === id) setEditingMovie(null);
  };

  const formatYear = (year?: number) => year || "Đang cập nhật";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-green-400" />
            Quản lý phim
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Tổng cộng: <span className="text-white font-semibold">{statsSummary.total.toLocaleString("vi-VN")}</span> phim từ hệ thống RIOFLIX
            <span className="text-zinc-500"> · Danh mục đang chọn có {totalMovies.toLocaleString("vi-VN")} phim</span>
          </p>
        </div>
        <button
          onClick={() => { loadStats(); loadMovies(page); }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-sm font-medium transition-all"
        >
          <RefreshCw className="w-4 h-4" />Làm mới
        </button>
      </div>

      {/* Stat Cards Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Film}
          label="Tổng phim hệ thống"
          value={statsSummary.total}
          color="bg-green-500/20 text-green-400"
          sub="Kho phim RIOFLIX"
        />
        <StatCard
          icon={Clapperboard}
          label="Phim Lẻ"
          value={statsSummary.single}
          color="bg-blue-500/20 text-blue-400"
          sub="Phim điện ảnh / Single"
        />
        <StatCard
          icon={Tv}
          label="Phim Bộ"
          value={statsSummary.series}
          color="bg-purple-500/20 text-purple-400"
          sub="Phim truyền hình / Series"
        />
        <StatCard
          icon={Sparkles}
          label="Phim Hoạt Hình"
          value={statsSummary.anime}
          color="bg-amber-500/20 text-amber-400"
          sub="Anime & Cartoon"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên phim, năm, chất lượng..."
            className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_FILTERS.map((filter) => (
            <button
              key={`${filter.action}-${filter.slug}`}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeFilter.label === filter.label
                  ? "bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.25)]"
                  : "bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-16 text-zinc-400 text-sm">Không tìm thấy phim nào</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-950/50">
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide">Phim</th>
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide hidden md:table-cell">Năm</th>
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide hidden sm:table-cell">Tập / chất lượng</th>
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide">Trạng thái</th>
                      <th className="text-right px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wide">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMovies.map((movie) => (
                      <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 min-w-[240px]">
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="w-12 h-16 rounded-lg object-cover bg-zinc-800 border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-white truncate">{movie.title}</p>
                              <p className="text-xs text-zinc-400 truncate">{movie.originalTitle || movie.linkUrl}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-400 hidden md:table-cell text-xs">{formatYear(movie.year)}</td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-[11px] font-bold">{movie.episodes || "FULL"}</span>
                            <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-[11px] font-bold">{movie.quality || "Vietsub"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${movie.status === "hidden" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                            {movie.status === "hidden" ? "Đã ẩn" : "Hiển thị"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={movie.linkUrl}
                              className="p-2 rounded-lg bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600 hover:text-white transition-all"
                              title="Xem phim"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setEditingMovie(movie)}
                              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                              title="Sửa thông tin"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            {confirmDelete === movie.id ? (
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => deleteMovie(movie.id)} className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-all">Xoá</button>
                                <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-all">Huỷ</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(movie.id)}
                                className="p-2 rounded-lg bg-zinc-700/80 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                                title="Xoá khỏi danh sách"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-zinc-950/40">
                  <p className="text-xs text-zinc-400">
                    Trang <span className="font-bold text-white">{page}</span> / <span className="font-bold text-white">{totalPages.toLocaleString("vi-VN")}</span> (Tổng {totalMovies.toLocaleString("vi-VN")} phim)
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={page <= 1 || loading}
                      onClick={() => loadMovies(page - 1)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-zinc-300 hover:text-white transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" /> Trang trước
                    </button>
                    <button
                      disabled={page >= totalPages || loading}
                      onClick={() => loadMovies(page + 1)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-zinc-300 hover:text-white transition-all"
                    >
                      Trang sau <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 h-fit xl:sticky xl:top-8">
          {editingMovie ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-green-400">Chỉnh sửa nhanh</p>
                  <h2 className="text-lg font-extrabold text-white mt-1 line-clamp-2">{editingMovie.title}</h2>
                </div>
                <button onClick={() => setEditingMovie(null)} className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-[86px_1fr] gap-4">
                <img src={editingMovie.posterUrl} alt={editingMovie.title} className="w-full aspect-[2/3] rounded-xl object-cover bg-zinc-800 border border-white/10" />
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Trạng thái</label>
                  <select
                    value={editingMovie.status || "visible"}
                    onChange={(e) => updateMovie({ status: e.target.value as EditableMovie["status"] })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50"
                  >
                    <option value="visible">Hiển thị</option>
                    <option value="hidden">Ẩn phim</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Tên phim</label>
                <input
                  value={editingMovie.title}
                  onChange={(e) => updateMovie({ title: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50"
                />
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Năm phát hành</label>
                <input
                  type="number"
                  value={editingMovie.year || ""}
                  onChange={(e) => updateMovie({ year: Number(e.target.value) || undefined })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50"
                />
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Tập / chất lượng</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={editingMovie.episodes || ""}
                    onChange={(e) => updateMovie({ episodes: e.target.value })}
                    placeholder="FULL"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50"
                  />
                  <input
                    value={editingMovie.quality || ""}
                    onChange={(e) => updateMovie({ quality: e.target.value })}
                    placeholder="Vietsub"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              <button
                onClick={() => setEditingMovie(null)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-all"
              >
                <Save className="w-4 h-4" />Lưu thay đổi tạm thời
              </button>
              <p className="text-xs leading-5 text-zinc-500">
                Lưu ý: dữ liệu phim hiện lấy từ API công khai nên thao tác sửa/xoá chỉ áp dụng trên phiên quản trị hiện tại. Cần thêm model Movie và API admin riêng để lưu vĩnh viễn.
              </p>
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                <Edit3 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Chọn một phim để chỉnh sửa</h2>
              <p className="text-sm text-zinc-500 mt-2">Admin có thể tìm kiếm, xem nhanh, chỉnh sửa trạng thái hoặc xoá phim khỏi danh sách hiển thị tạm thời.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
