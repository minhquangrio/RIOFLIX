"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { RioflixLogo } from "./icons";
import { searchMovies } from "@/lib/api";
import { MovieItem } from "@/types/movie";
import { cleanSlug, getCategorySlug } from "@/lib/utils";
import { 
  ChevronDown, 
  Search, 
  Bell, 
  LogIn, 
  LayoutGrid, 
  X,
  Play,
  Loader2,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Bookmark,
  Home,
  Tv,
  Clapperboard,
  Film,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MovieItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  // Close menus on path change
  useEffect(() => {
    setShowMobileMenu(false);
    setShowSearchDropdown(false);
    setShowUserMenu(false);
  }, [pathname]);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      setShowSearchDropdown(true);
      searchMovies(searchQuery).then((results) => {
        setSearchResults(results.slice(0, 6));
        setIsSearching(false);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    "Action & Adventure",
    "Âm Nhạc",
    "Bí Ẩn",
    "Chiến Tranh",
    "Chính Kịch",
    "Chương Trình Truyền Hình",
    "Chuyển Thể",
    "Cổ Trang",
    "Đang cập nhật",
    "Gây Cấn",
    "Gia Đình",
    "Giả Tưởng",
    "Hài Hước",
    "Hành Động",
    "Hình Sự",
    "Hoạt Hình",
    "Học Đường",
    "Huyền Huyễn",
    "Khoa Học",
    "Khoa Học Viễn Tưởng",
    "Kinh Dị",
    "Kinh Điển",
    "Lãng Mạn",
    "LGBT",
    "Lịch Sử",
    "Miền Tây",
    "Phiêu Lưu",
    "Phim 18+",
    "Phim Hài",
    "Phim Ngắn",
    "Phim Tài Liệu",
    "Tâm Lý",
    "Thể Thao",
    "Tình Cảm",
    "Tội Phạm",
    "Tuổi Trẻ",
    "Võ Thuật"
  ];

  const countries = [
    "Trung Quốc", "Hàn Quốc", "Âu Mỹ", "Nhật Bản", "Thái Lan", 
    "Việt Nam", "Đài Loan", "Hồng Kông", "Ấn Độ", "Anh", "Pháp", "Đức"
  ];
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

  // Avatar initials
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "admin";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-[2px]">
        <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Section: Logo & Desktop Navigation */}
          <div className="flex items-center gap-3">
            {/* Mobile Grid Menu button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md text-zinc-400 hover:text-green-500 hover:bg-zinc-800/60 lg:hidden transition-colors"
              aria-label="Toggle Navigation"
            >
              <LayoutGrid className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <RioflixLogo />
            </Link>

            {/* Desktop Nav Links */}
            <nav ref={navDropdownRef} className="hidden lg:flex items-center gap-6 ml-8">
              {/* Category Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("genre")}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors outline-none group"
                >
                  <span>Thể loại</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "genre" ? "rotate-180 text-green-500" : ""}`} />
                </button>
                {activeDropdown === "genre" && (
                  <div className="absolute top-full left-0 mt-2 w-[540px] md:w-[620px] p-4 bg-zinc-950/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-xl grid grid-cols-3 gap-x-2 gap-y-1.5 max-h-[480px] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200 scrollbar-thin scrollbar-thumb-zinc-800">
                    {categories.map((cat, idx) => (
                      <Link 
                        key={idx} 
                        href={`/the-loai/${getCategorySlug(cat)}`}
                        className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-all truncate flex items-center justify-start"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Country Dropdown */}
              <div className="relative">
                <button onClick={() => toggleDropdown("country")}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors outline-none">
                  <span>Quốc gia</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "country" ? "rotate-180 text-green-500" : ""}`} />
                </button>
                {activeDropdown === "country" && (
                  <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-zinc-950/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-xl grid grid-cols-2 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {countries.map((c, idx) => (
                      <Link key={idx} href={`/quoc-gia/${cleanSlug(c)}`}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-all truncate"
                        onClick={() => setActiveDropdown(null)}>{c}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Year Dropdown */}
              <div className="relative">
                <button onClick={() => toggleDropdown("year")}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors outline-none">
                  <span>Năm</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "year" ? "rotate-180 text-green-500" : ""}`} />
                </button>
                {activeDropdown === "year" && (
                  <div className="absolute top-full left-0 mt-2 w-56 p-3 bg-zinc-950/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-xl grid grid-cols-2 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[320px] overflow-y-auto">
                    {years.map((y, idx) => (
                      <Link key={idx} href={`/nam/${y}`}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-all"
                        onClick={() => setActiveDropdown(null)}>Năm {y}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/phim-bo" className={`${pathname === "/phim-bo" ? "text-white" : "text-zinc-400 hover:text-white"} text-sm font-medium transition-colors hidden xl:block`}>Phim Bộ</Link>
              <Link href="/phim-le" className={`${pathname === "/phim-le" ? "text-white" : "text-zinc-400 hover:text-white"} text-sm font-medium transition-colors hidden xl:block`}>Phim Lẻ</Link>
              <Link href="/dien-vien" className={`${pathname === "/dien-vien" ? "text-white" : "text-zinc-400 hover:text-white"} text-sm font-medium transition-colors hidden xl:block`}>Diễn viên</Link>
              <Link href="/lich-chieu" className={`${pathname === "/lich-chieu" ? "text-white" : "text-zinc-400 hover:text-white"} text-sm font-medium transition-colors hidden xl:block`}>Lịch chiếu</Link>
            </nav>
          </div>

          {/* Right Section: Search & Auth */}
          <div className="flex items-center gap-2 sm:gap-4 relative">
            {/* Search bar */}
            <form onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-zinc-900/60 border border-white/10 rounded-full px-3.5 py-1.5 w-[140px] sm:w-[220px] lg:w-[300px] transition-all focus-within:bg-zinc-900 focus-within:border-green-500/50 focus-within:ring-2 focus-within:ring-green-500/20">
              <Search className="h-4 w-4 text-zinc-400 shrink-0" />
              <input type="text"
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-white ml-2 w-full placeholder:text-zinc-500"
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              />
              {isSearching ? (
                <Loader2 className="h-4 w-4 text-green-500 animate-spin shrink-0" />
              ) : searchQuery ? (
                <button type="button" onClick={() => setSearchQuery("")} className="text-zinc-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              ) : null}

              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50 max-h-[380px] overflow-y-auto space-y-1">
                  {searchResults.length === 0 && !isSearching ? (
                    <div className="p-3 text-center text-xs text-zinc-400">Không tìm thấy phim phù hợp</div>
                  ) : (
                    searchResults.map((item) => (
                      <Link key={item.id} href={item.linkUrl}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all group">
                        <img src={item.posterUrl} alt={item.title} className="w-10 h-14 object-cover rounded-lg shrink-0 border border-white/10" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white group-hover:text-green-400 transition-colors truncate">{item.title}</h4>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{item.year} • {item.episodes}</p>
                        </div>
                        <Play className="w-4 h-4 text-zinc-500 group-hover:text-green-400 shrink-0" />
                      </Link>
                    ))
                  )}
                </div>
              )}
            </form>

            {/* Notifications */}
            <Link href="/thong-bao" className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors relative hidden sm:block">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
            </Link>

            <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

            {/* Auth Section */}
            {status === "loading" ? (
              <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
            ) : session?.user ? (
              /* User Avatar + Dropdown */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-full hover:bg-white/10 p-1 pr-2 transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0 border-2 border-green-500/50 group-hover:border-green-400 transition-colors">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name || ""} className="w-full h-full rounded-full object-cover" />
                    ) : getInitials(session.user.name)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-white max-w-[100px] truncate">
                    {session.user.name?.split(" ").slice(-1)[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 p-2 bg-zinc-900/98 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User info */}
                    <div className="px-3 py-2 mb-1 border-b border-white/10">
                      <p className="text-sm font-semibold text-white truncate">{session.user.name}</p>
                      <p className="text-xs text-zinc-400 truncate">{session.user.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-wide">Admin</span>
                      )}
                    </div>

                    {/* Menu items */}
                    {isAdmin && (
                      <Link href="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                        <LayoutDashboard className="w-4 h-4 text-green-400" />
                        Bảng điều khiển
                      </Link>
                    )}
                    <Link href="/ho-so"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                      <User className="w-4 h-4" />
                      Hồ sơ của tôi
                    </Link>
                    <Link href="/danh-sach-xem"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                      <Bookmark className="w-4 h-4" />
                      Danh sách xem
                    </Link>

                    <div className="border-t border-white/10 mt-1 pt-1">
                      <button
                        onClick={() => { setShowUserMenu(false); signOut({ callbackUrl: "/" }); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <div className="flex items-center gap-2">
                <Link href="/dang-nhap">
                  <button className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold h-9 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md gap-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
                    <LogIn className="h-4 w-4 text-green-400" />
                    <span className="hidden sm:inline">Đăng nhập</span>
                  </button>
                </Link>
                <Link href="/dang-ky" className="hidden sm:block">
                  <button className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold h-9 px-4 bg-green-600 hover:bg-green-500 text-white gap-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
                    Đăng ký
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay using React Portal */}
      {mounted && showMobileMenu && createPortal(
        <div className="fixed inset-0 z-[9999] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-[300px] max-w-[85vw] bg-zinc-950 border-r border-white/10 h-full flex flex-col z-10 overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-950/95 backdrop-blur-md z-20">
              <Link href="/" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-2">
                <RioflixLogo />
              </Link>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6 flex-1">
              {/* Quick Nav Links */}
              <div className="space-y-1">
                <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">Khám phá nhanh</p>
                <Link href="/" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Home className="w-4 h-4 text-green-500" /> Trang chủ
                </Link>
                <Link href="/kham-pha" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Khám Phá Phim
                </Link>
                <Link href="/phim-bo" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Tv className="w-4 h-4 text-purple-400" /> Phim Bộ
                </Link>
                <Link href="/phim-le" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Clapperboard className="w-4 h-4 text-blue-400" /> Phim Lẻ
                </Link>
                <Link href="/chu-de" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Film className="w-4 h-4 text-emerald-400" /> Chủ Đề Phim
                </Link>
                <Link href="/dien-vien" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Users className="w-4 h-4 text-rose-400" /> Diễn Viên
                </Link>
                <Link href="/lich-chieu" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Calendar className="w-4 h-4 text-sky-400" /> Lịch Chiếu Phim
                </Link>
                <Link href="/xem-chung" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-all">
                  <Users className="w-4 h-4 text-pink-400" /> Xem Chung
                </Link>
              </div>

              {/* Categories Section */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">Thể loại phim</p>
                <div className="grid grid-cols-2 gap-1 px-1">
                  {categories.slice(0, 16).map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/the-loai/${getCategorySlug(cat)}`}
                      onClick={() => setShowMobileMenu(false)}
                      className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all truncate"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Countries Section */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">Quốc gia</p>
                <div className="grid grid-cols-2 gap-1 px-1">
                  {countries.map((c, idx) => (
                    <Link
                      key={idx}
                      href={`/quoc-gia/${cleanSlug(c)}`}
                      onClick={() => setShowMobileMenu(false)}
                      className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all truncate"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
