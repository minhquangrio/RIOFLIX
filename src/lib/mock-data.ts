import { HeroSlide, MovieItem } from "@/types/movie";

export interface CategoryObj {
  name: string;
  slug: string;
}

export interface CountryObj {
  name: string;
  slug: string;
}

export interface ActorObj {
  id?: number | string;
  name: string;
  original_name?: string;
  image_url?: string;
}

export interface MovieDetail extends MovieItem {
  slug: string;
  originalTitle?: string;
  totalEpisodes?: number;
  episodesList?: { number: number; title: string; embedUrl?: string; m3u8Url?: string }[];
  actors?: string[];
  actorsList?: ActorObj[];
  director?: string;
  releaseYear?: number;
  views?: string;
  ratingScore?: number;
  duration?: string;
  quality?: string;
  language?: string;
  trailerUrl?: string;
  categoriesList?: CategoryObj[];
  countriesList?: CountryObj[];
  serverSources?: { id: string; name: string; type: "video" | "iframe"; url: string; episodesList?: { number: number; title: string; embedUrl?: string; m3u8Url?: string }[] }[];
}

export const heroSlidesData: HeroSlide[] = [
  {
    id: 66,
    title: "Khiến Em Rung Động",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1792068784_url.png",
    backdropUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1792068638_gemini-1792068134589.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1792068574_gemini-1792068554413.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1792068638_gemini-1792068134589.webp",
    year: 2026,
    country: "Hàn Quốc",
    episodes: "Tập 4",
    genres: ["Chính Kịch", "Lãng Mạn", "Hài Hước"],
    description: "Một chuyên viên marketing với quan điểm truyền thống về tình yêu và hôn nhân cố gắng xây dựng mối...",
    linkUrl: "/phim/khien-em-rung-dong",
    videoUrl: "",
    isTop10: true,
  },
  {
    id: 65,
    title: "100 Ngày Lừa Dối",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/logo/1791649977_url.png",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1791650055_gemini-1791649597482.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1791650031_gemini-1791649677022.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1791650055_gemini-1791649597482.webp",
    year: 2026,
    country: "Hàn Quốc",
    episodes: "Tập 2",
    genres: ["Tình Cảm", "Lãng Mạn", "Hành Động", "Gây Cấn"],
    description: "Nuôi hy vọng tìm được tự do, tên móc túi hàng đầu của Gyeongseong đã thâm nhập vào chính quyền...",
    linkUrl: "/phim/100-ngay-lua-doi",
    videoUrl: "",
    isTop10: true,
  },
  {
    id: 63,
    title: "Bác Sĩ X : Mafia Áo Trắng",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/logo/1791555246_url.png",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1791555199_gemini-1791555191116.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1791555094_Ba__n_sao_anifun_3971c868fb25e58d02c85544c1e266de.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1791555199_gemini-1791555191116.webp",
    year: 2026,
    country: "Hàn Quốc",
    episodes: "Tập 3",
    genres: ["Chính Kịch", "Bí Ẩn", "Hình Sự"],
    description: "Ở một bệnh viện nơi cái tôi và tham nhũng lộng hành, một bác sĩ phẫu thuật bí ẩn nhưng...",
    linkUrl: "/phim/bac-si-x-mafia-ao-trang",
    videoUrl: "",
    isTop10: true,
  },
  {
    id: 62,
    title: "Người Nhện: Khởi Đầu Mới",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/pic/1791220384_gemini-1791220374742.webp",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1791220151_gemini-1791220059992.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1791220104_gemini-1791220081119.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1791220151_gemini-1791220059992.webp",
    year: 2026,
    country: "Mỹ",
    episodes: "FULL",
    genres: ["Hành Động", "Khoa Học Viễn Tưởng", "Phiêu Lưu"],
    description: "Không còn Tony Stark, MJ hay Ned kề cận, Peter buộc phải đơn thân độc mã đối diện với phe...",
    linkUrl: "/phim/nguoi-nhen-khoi-dau-moi",
    videoUrl: "",
    isTop10: true,
  },
  {
    id: 61,
    title: "Không Thể Thay Thế",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1790661340_url.webp",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1790661002_gemini-1790660966646.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1790661357_gemini-1790660984451.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1790661002_gemini-1790660966646.webp",
    year: 2026,
    country: "Trung Quốc",
    episodes: "Hoàn Tất (20/20)",
    genres: ["Tình Cảm", "Chính Kịch"],
    description: "Từ Trì là cô gái xuất thân từ một thị trấn nhỏ, bước vào ngành tư vấn sau biến cố...",
    linkUrl: "/phim/khong-the-thay-the-2026",
    videoUrl: "",
    isTop10: true,
  },
  {
    id: 59,
    title: "Nhất Âu Xuân",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/pic/1789619984_url.webp",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1789619949_gemini-1789619940058.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1789619903_gemini-1789619891547.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1789619949_gemini-1789619940058.webp",
    year: 2026,
    country: "Trung Quốc",
    episodes: "Trọn bộ 30 tập",
    genres: ["Tình Cảm", "Chính Kịch", "Lãng Mạn", "Cổ Trang", "Gia Đình"],
    description: "Nhất Âu Xuân là một bộ phim phục thù mãn nhãn, xoay quanh hai nhân vật hợp sức báo thù,...",
    linkUrl: "/phim/nhat-au-xuan",
    videoUrl: "",
    isTop10: false,
  },
  {
    id: 58,
    title: "Yêu Được Không",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1789164214_url.webp",
    backdropUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1789164195_url.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1789164151_url.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1789164195_url.webp",
    year: 2026,
    country: "Thái Lan",
    episodes: "Tập 6",
    genres: ["Tình Cảm", "Chính Kịch", "Lãng Mạn"],
    description: "Cô tiểu thư lạnh lùng, cao ngạo của một đế chế kinh doanh bất ngờ sa vào lưới tình với...",
    linkUrl: "/phim/yeu-duoc-khong",
    videoUrl: "",
    isTop10: false,
  },
  {
    id: 57,
    title: "Đế Chế Đại Hàn (Phần 2)",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/pic/1788960708_MADE-IN-KOREA-2-9-9-2026.png",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1788960794_gemini-1788960370858.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1788960778_gemini-1788960393531.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1788960794_gemini-1788960370858.webp",
    year: 2026,
    country: "Hàn Quốc",
    episodes: "Trọn bộ 6 tập",
    genres: ["Chính Kịch", "Hành Động", "Bí Ẩn", "Hình Sự", "Gây Cấn"],
    description: "Phần 2 tiếp tục xoáy sâu vào những cuộc đấu đá quyền lực căng thẳng, lòng tham, sự trả thù...",
    linkUrl: "/phim/de-che-dai-han-phan-2",
    videoUrl: "",
    isTop10: false,
  },
  {
    id: 56,
    title: "Bốn Bàn Tay, Hai Bản Sonata",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/pic/1788018511_url.webp",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1788018347_gemini-1788018325083.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1788018470_2d403c2ce2a4ce0d04f3ceb1d341eb7b.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1788018347_gemini-1788018325083.webp",
    year: 2026,
    country: "Hàn Quốc",
    episodes: "Trọn bộ 12 tập",
    genres: ["Tình Cảm", "Chính Kịch"],
    description: "Khi hai nghệ sĩ piano trẻ đến từ hai thế giới hoàn toàn khác biệt gặp gỡ tại ngôi trường...",
    linkUrl: "/phim/bon-ban-tay-hai-ban-sonata",
    videoUrl: "",
    isTop10: false,
  },
  {
    id: 55,
    title: "Đầu Xuân Tươi Sáng",
    titleImageUrl: "https://sf-static.onflixcdn.com/images/pic/1787758430_url.webp",
    backdropUrl: "https://sf-static.onflixcdn.com/images/pic/1787758323_gemini-1787758310759.webp",
    characterUrl: "https://sf-static.onflixcdn.com/images/pic/1787758465_gemini-1787757138922.webp",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1787758323_gemini-1787758310759.webp",
    year: 2026,
    country: "Trung Quốc",
    episodes: "Trọn bộ 24 tập",
    genres: ["Tình Cảm", "Chính Kịch", "Lãng Mạn"],
    description: "Một nhân viên mới tốt bụng và người sếp tài năng xoay xở giữa nhịp sống công sở hối hả,...",
    linkUrl: "/phim/dau-xuan-tuoi-sang",
    videoUrl: "",
    isTop10: false,
  },
];


export const allMoviesList: (MovieItem & { genreSlugs: string[]; countrySlug: string; yearSlug: string })[] = [
  // --- TRUNG QUỐC ---
  {
    id: "m1",
    title: "Tước Cốt",
    posterUrl: "https://sf-static.onflixcdn.com/images/default/1783767015_url.webp",
    episodes: "Tập 22",
    quality: "Vietsub 4K",
    linkUrl: "/phim/tuoc-cot",
    isTop10: true,
    year: 2026,
    genreSlugs: ["co-trang", "tinh-cam", "hanh-dong"],
    countrySlug: "trung-quoc",
    yearSlug: "2026",
  },
  {
    id: "m5",
    title: "Vân Tú Hành",
    posterUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1781950126_url.webp",
    episodes: "Tập 30/36",
    quality: "Thuyết Minh",
    linkUrl: "/phim/van-tu-hanh",
    isTop10: false,
    year: 2025,
    genreSlugs: ["co-trang", "tinh-cam", "chinh-kich", "hai-huoc"],
    countrySlug: "trung-quoc",
    yearSlug: "2025",
  },
  {
    id: "m7",
    title: "Mùa Hè Nồng Nhiệt",
    posterUrl: "https://sf-static.onflixcdn.com/images/default/1781589597_url.webp",
    episodes: "Hoàn Tất (29/29)",
    quality: "Vietsub 4K",
    linkUrl: "/phim/mua-he-nong-nhiet",
    isTop10: true,
    year: 2026,
    genreSlugs: ["tinh-cam", "chinh-kich", "tam-ly"],
    countrySlug: "trung-quoc",
    yearSlug: "2026",
  },
  {
    id: "m9",
    title: "Thiên Hương",
    posterUrl: "https://image.tmdb.org/t/p/original/n2SLnF3CyIcLQ5d7bfgWBXz1kY6.jpg",
    episodes: "Tập 18",
    quality: "Thuyết Minh 4K",
    linkUrl: "/phim/thien-huong",
    isTop10: true,
    year: 2026,
    genreSlugs: ["co-trang", "gia-tuong", "chinh-kich"],
    countrySlug: "trung-quoc",
    yearSlug: "2026",
  },
  {
    id: "m10",
    title: "Trường Tương Tư 2",
    posterUrl: "https://image.tmdb.org/t/p/w500/3CKWW5yiVS46G4bGsKfJs1Mdn4M.jpg",
    episodes: "FULL 23/23",
    quality: "Thuyết Minh 4K",
    linkUrl: "/phim/truong-tuong-tu-2",
    isTop10: true,
    year: 2025,
    genreSlugs: ["co-trang", "tinh-cam", "tam-ly"],
    countrySlug: "trung-quoc",
    yearSlug: "2025",
  },
  {
    id: "m11",
    title: "Dữ Phượng Hành",
    posterUrl: "https://image.tmdb.org/t/p/w500/fnASfC4pJ4NSzJ1ch7FBD99PiaZ.jpg",
    episodes: "FULL 39/39",
    quality: "Vietsub 4K",
    linkUrl: "/phim/du-phuong-hanh",
    isTop10: false,
    year: 2025,
    genreSlugs: ["co-trang", "gia-tuong", "hanh-dong"],
    countrySlug: "trung-quoc",
    yearSlug: "2025",
  },

  // --- HÀN QUỐC ---
  {
    id: "m2",
    title: "Chuyện Tình Ma Quái",
    posterUrl: "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
    episodes: "Tập 2",
    quality: "Vietsub",
    linkUrl: "/phim/chuyen-tinh-ma-quai",
    isTop10: true,
    year: 2026,
    genreSlugs: ["tinh-cam", "gia-tuong", "bi-an", "lang-man"],
    countrySlug: "han-quoc",
    yearSlug: "2026",
  },
  {
    id: "m8",
    title: "Lời nguyền Đông Cung",
    posterUrl: "https://image.tmdb.org/t/p/original/3CKWW5yiVS46G4bGsKfJs1Mdn4M.jpg",
    episodes: "Trọn bộ 8 tập",
    quality: "Vietsub 4K",
    linkUrl: "/phim/loi-nguyen-dong-cung",
    isTop10: true,
    year: 2026,
    genreSlugs: ["co-trang", "kinh-di", "hanh-dong", "gia-tuong"],
    countrySlug: "han-quoc",
    yearSlug: "2026",
  },
  {
    id: "m3",
    title: "Đặc Vụ Kim Tái Khởi Động",
    posterUrl: "https://image.tmdb.org/t/p/original/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",
    episodes: "Tập 8",
    quality: "Thuyết Minh",
    linkUrl: "/phim/dac-vu-kim-tai-khoi-dong",
    isTop10: false,
    year: 2026,
    genreSlugs: ["hanh-dong", "chinh-kich", "hinh-su"],
    countrySlug: "han-quoc",
    yearSlug: "2026",
  },
  {
    id: "m20",
    title: "Những Ghi Chú ở Hàng Cuối",
    posterUrl: "https://sf-static.onflixcdn.com/images/pic/1782485054_url.webp",
    episodes: "Trọn bộ 6 tập",
    quality: "Vietsub 4K",
    linkUrl: "/phim/nhung-ghi-chu-o-hang-cuoi",
    isTop10: false,
    year: 2026,
    genreSlugs: ["chinh-kich", "bi-an"],
    countrySlug: "han-quoc",
    yearSlug: "2026",
  },
  {
    id: "m12",
    title: "Nữ Hoàng Nước Mắt",
    posterUrl: "https://image.tmdb.org/t/p/w500/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
    episodes: "FULL 16/16",
    quality: "Vietsub 4K",
    linkUrl: "/phim/nu-hoang-nuoc-mat",
    isTop10: true,
    year: 2025,
    genreSlugs: ["tinh-cam", "chinh-kich", "hai-huoc"],
    countrySlug: "han-quoc",
    yearSlug: "2025",
  },
  {
    id: "m13",
    title: "Cõng Anh Mà Chạy",
    posterUrl: "https://image.tmdb.org/t/p/w500/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",
    episodes: "FULL 16/16",
    quality: "Vietsub 4K",
    linkUrl: "/phim/cong-anh-ma-chay",
    isTop10: true,
    year: 2025,
    genreSlugs: ["tinh-cam", "khoa-hoc-vien-tuong", "hai-huoc"],
    countrySlug: "han-quoc",
    yearSlug: "2025",
  },

  // --- ÂU MỸ ---
  {
    id: "m4",
    title: "Gia Tộc Rồng (Phần 3)",
    posterUrl: "https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    episodes: "Tập 5",
    quality: "Vietsub 4K",
    linkUrl: "/phim/gia-toc-rong-phan-3",
    isTop10: true,
    year: 2026,
    genreSlugs: ["hanh-dong", "co-trang", "khoa-hoc-vien-tuong", "phieu-luu"],
    countrySlug: "au-my",
    yearSlug: "2026",
  },
  {
    id: "m6",
    title: "Ám Ảnh",
    posterUrl: "https://image.tmdb.org/t/p/original/fnASfC4pJ4NSzJ1ch7FBD99PiaZ.jpg",
    episodes: "Full 4K",
    quality: "4K Vietsub",
    linkUrl: "/phim/am-anh-2026",
    isTop10: false,
    year: 2026,
    genreSlugs: ["kinh-di", "tam-ly"],
    countrySlug: "au-my",
    yearSlug: "2026",
  },
  {
    id: "m14",
    title: "Avatar 3: Khát Vọng Lửa",
    posterUrl: "https://image.tmdb.org/t/p/w500/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    episodes: "Phim Lẻ 4K",
    quality: "Thuyết Minh",
    linkUrl: "/phim/avatar-3",
    isTop10: true,
    year: 2026,
    genreSlugs: ["khoa-hoc-vien-tuong", "phieu-luu", "hanh-dong"],
    countrySlug: "au-my",
    yearSlug: "2026",
  },
  {
    id: "m15",
    title: "Nhiệm Vụ Bất Khả Thi 8",
    posterUrl: "https://image.tmdb.org/t/p/w500/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",
    episodes: "Phim Lẻ 4K",
    quality: "Vietsub 4K",
    linkUrl: "/phim/nhiem-vu-bat-kha-thi-8",
    isTop10: true,
    year: 2025,
    genreSlugs: ["hanh-dong", "phieu-luu"],
    countrySlug: "au-my",
    yearSlug: "2025",
  },

  // --- NHẬT BẢN / HOẠT HÌNH ---
  {
    id: "m16",
    title: "Chú Thuật Hồi Chiến (Phần 3)",
    posterUrl: "https://image.tmdb.org/t/p/w500/n2SLnF3CyIcLQ5d7bfgWBXz1kY6.jpg",
    episodes: "Tập 12/24",
    quality: "Vietsub 4K",
    linkUrl: "/phim/chu-thuat-hoi-chien-p3",
    isTop10: true,
    year: 2026,
    genreSlugs: ["hoat-hinh", "hanh-dong", "gia-tuong"],
    countrySlug: "nhat-ban",
    yearSlug: "2026",
  },
  {
    id: "m17",
    title: "Conan Movie 28",
    posterUrl: "https://image.tmdb.org/t/p/w500/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
    episodes: "Phim Lẻ",
    quality: "Thuyết Minh",
    linkUrl: "/phim/conan-movie-28",
    isTop10: true,
    year: 2026,
    genreSlugs: ["hoat-hinh", "tam-ly", "phieu-luu"],
    countrySlug: "nhat-ban",
    yearSlug: "2026",
  }
];

export const movieCategories = [
  {
    title: "Phim Mới Cập Nhật",
    movies: allMoviesList.slice(0, 8),
  },
  {
    title: "Phim Bộ Độc Quyền Hot",
    movies: allMoviesList.slice(4, 12),
  }
];

export function getMoviesByGenreSlug(genreSlug: string): MovieItem[] {
  const norm = genreSlug.toLowerCase().trim();
  const matched = allMoviesList.filter(m => m.genreSlugs.some(g => g.includes(norm) || norm.includes(g)));
  return matched.length > 0 ? matched : allMoviesList.slice(0, 8);
}

export function getMoviesByCountrySlug(countrySlug: string): MovieItem[] {
  const norm = countrySlug.toLowerCase().trim();
  const matched = allMoviesList.filter(m => m.countrySlug === norm || norm.includes(m.countrySlug));
  return matched.length > 0 ? matched : allMoviesList.filter(m => m.countrySlug === "trung-quoc");
}

export function getMoviesByYearSlug(yearSlug: string): MovieItem[] {
  const norm = yearSlug.toLowerCase().trim();
  const matched = allMoviesList.filter(m => m.yearSlug === norm || (m.year || 2026).toString() === norm);
  return matched.length > 0 ? matched : allMoviesList.slice(0, 8);
}

import { getActorImage } from "./actor-images";

export function getMovieBySlug(slug: string): MovieDetail {
  const normalizedSlug = slug.toLowerCase().trim();

  const detailsDatabase: Record<string, Partial<MovieDetail>> = {
    "toi-la-nham-phi-pham": {
      title: "Kungfu Nữ Túc (Đội Bóng Nữ Kung Fu)",
      originalTitle: "Kung Fu Soccer",
      slug: "toi-la-nham-phi-pham",
      backdropUrl: "https://phimimg.com/uploads/movies/20260713/kungfu-nu-tuc-doi-bong-nu-kung-fu-thumb.webp",
      posterUrl: "https://phimimg.com/uploads/movies/20260713/kungfu-nu-tuc-doi-bong-nu-kung-fu-poster.webp",
      videoUrl: "/player-proxy/player/?url=https://v7.kkphimplayer7.com/20260712/VyM0LcAY/index.m3u8",
      genres: ["Chính Kịch", "Hài Hước", "Hành Động", "Tâm Lý"],
      country: "Hồng Kông, Trung Quốc",
      releaseYear: 2026,
      episodes: "Trọn bộ",
      totalEpisodes: 1,
      ratingScore: 6.3,
      views: "1.8M",
      director: "Châu Tinh Trì",
      actors: ["Địch Lệ Nhiệt Ba", "Sato Takeru", "Sisley Choi Si-Pui", "Ngãi Mễ", "Trương Kế Thông", "Jimmy O. Yang", "Lưu Gia Linh", "Jin Au-Yeung", "Trương Nghệ Hưng", "张小斐", "赵丽娜", "Xueye"],
      description: "Bộ phim kể về đội bóng đá nữ Nga Mi từ chỗ bị đánh giá thấp đã từng bước vươn lên chinh phục giải đấu Supreme Invincible Cup. Dưới sự dẫn dắt của đội trưởng, tiền đạo chủ lực và người huấn luyện, các cô gái kết hợp võ thuật với bóng đá để vượt qua những đối thủ sở hữu tuyệt kỹ, theo đuổi giấc mơ vô địch bằng tinh thần đồng đội và ý chí không bỏ cuộc.",
      trailerUrl: "https://www.youtube.com/watch?v=x-HE-g5YwZE",
      quality: "CAM",
      language: "Vietsub",
    },
    "kungfu-nu-tuc-doi-bong-nu-kung-fu": {
      title: "Kungfu Nữ Túc (Đội Bóng Nữ Kung Fu)",
      originalTitle: "Kung Fu Soccer",
      slug: "kungfu-nu-tuc-doi-bong-nu-kung-fu",
      backdropUrl: "https://phimimg.com/uploads/movies/20260713/kungfu-nu-tuc-doi-bong-nu-kung-fu-thumb.webp",
      posterUrl: "https://phimimg.com/uploads/movies/20260713/kungfu-nu-tuc-doi-bong-nu-kung-fu-poster.webp",
      videoUrl: "/player-proxy/player/?url=https://v7.kkphimplayer7.com/20260712/VyM0LcAY/index.m3u8",
      genres: ["Chính Kịch", "Hài Hước", "Hành Động", "Tâm Lý"],
      country: "Hồng Kông, Trung Quốc",
      releaseYear: 2026,
      episodes: "Trọn bộ",
      totalEpisodes: 1,
      ratingScore: 6.3,
      views: "1.8M",
      director: "Châu Tinh Trì",
      actors: ["Địch Lệ Nhiệt Ba", "Sato Takeru", "Sisley Choi Si-Pui", "Ngãi Mễ", "Trương Kế Thông", "Jimmy O. Yang", "Lưu Gia Linh", "Jin Au-Yeung", "Trương Nghệ Hưng", "张小斐", "赵丽娜", "Xueye"],
      description: "Bộ phim kể về đội bóng đá nữ Nga Mi từ chỗ bị đánh giá thấp đã từng bước vươn lên chinh phục giải đấu Supreme Invincible Cup. Dưới sự dẫn dắt của đội trưởng, tiền đạo chủ lực và người huấn luyện, các cô gái kết hợp võ thuật với bóng đá để vượt qua những đối thủ sở hữu tuyệt kỹ, theo đuổi giấc mơ vô địch bằng tinh thần đồng đội và ý chí không bỏ cuộc.",
      trailerUrl: "https://www.youtube.com/watch?v=x-HE-g5YwZE",
      quality: "CAM",
      language: "Vietsub",
    },
    "van-tu-hanh": {
      title: "Vân Tú Hành",
      slug: "van-tu-hanh",
      backdropUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1781950126_url.webp",
      posterUrl: "https://sf-static.onflixcdn.com/images/vi_content_cdn/1781950126_url.webp",
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      genres: ["Tình Cảm", "Chính Kịch", "Cổ Trang", "Tâm Lý"],
      country: "Trung Quốc",
      releaseYear: 2025,
      episodes: "Tập 30",
      totalEpisodes: 36,
      ratingScore: 9.7,
      views: "2.1M",
      director: "Chu Thiếu Kiệt",
      actors: ["Lý Nhất Đồng", "Tăng Thuấn Hy", "Đặng Vi"],
      description: "Vân Tú Hành là một bộ phim cổ trang do Chu Thiếu Kiệt (Chúc Khanh Hảo) đạo diễn, Lý Nhất Đồng đóng chính.",
    },
    "mua-he-nong-nhiet": {
      title: "Mùa Hè Nồng Nhiệt",
      slug: "mua-he-nong-nhiet",
      backdropUrl: "https://sf-static.onflixcdn.com/images/default/1781589597_url.webp",
      posterUrl: "https://sf-static.onflixcdn.com/images/default/1781589597_url.webp",
      videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      genres: ["Tình Cảm", "Chính Kịch", "Tâm Lý"],
      country: "Trung Quốc",
      releaseYear: 2026,
      episodes: "Hoàn Tất (29/29)",
      totalEpisodes: 29,
      ratingScore: 9.6,
      views: "1.2M",
      director: "Trương Ngọc Thành",
      actors: ["Trương Tĩnh Nghi", "Lý Hiện", "Trương Nhược Quân"],
      description: "Bộ phim kể về câu chuyện cô gái Chu Vãn vì muốn cứu bà mà cố tình tiếp cận chàng thanh niên bí ẩn Lục Lăng.",
    },
    "chuyen-tinh-ma-quai": {
      title: "Chuyện Tình Ma Quái",
      slug: "chuyen-tinh-ma-quai",
      backdropUrl: "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
      posterUrl: "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
      videoUrl: "https://occ-0-325-395.1.nflxso.net/so/soa1/999/2072187719688133121.mp4?v=1&e=1784432277&t=NJp4wPD0lTp967TesaPtSHYU5kw",
      genres: ["Giả Tưởng", "Lãng Mạn", "Bí Ẩn"],
      country: "Hàn Quốc",
      releaseYear: 2026,
      episodes: "Tập 2 / 16",
      totalEpisodes: 16,
      ratingScore: 9.8,
      views: "2.4M",
      director: "Kim Won-seok",
      actors: ["Park Eun Bin", "Cha Eun Woo", "Lee Soo Hyuk"],
      description: "Phim kể về Cheon Yeo-ri (do Park Eun Bin thủ vai) - một nữ thừa kế khách sạn xinh đẹp và cuộc gặp gỡ bí ẩn định mệnh làm đảo lộn cuộc sống.",
    },
    "loi-nguyen-dong-cung": {
      title: "Lời nguyền Đông Cung",
      slug: "loi-nguyen-dong-cung",
      backdropUrl: "https://image.tmdb.org/t/p/original/3CKWW5yiVS46G4bGsKfJs1Mdn4M.jpg",
      posterUrl: "https://image.tmdb.org/t/p/original/3CKWW5yiVS46G4bGsKfJs1Mdn4M.jpg",
      videoUrl: "https://occ-0-325-395.1.nflxso.net/so/soa1/292/2068991510727603713.mp4?v=1&e=1784330945&t=SqGhKPLjG7JIOEa_lnARbHPhbkA",
      genres: ["Giả Tưởng", "Hành Động", "Kinh Dị", "Lịch Sử"],
      country: "Hàn Quốc",
      releaseYear: 2026,
      episodes: "Trọn bộ 8 tập",
      totalEpisodes: 8,
      ratingScore: 9.5,
      views: "850K",
      director: "Park Shin-woo",
      actors: ["Kim Soo Hyun", "Kim Ji Won"],
      description: "Một nam nhân có thể bước vào thế giới linh hồn và một cung nữ có thể nghe thấy người thì thầm của linh hồn bắt tay nhau để giải mở bí ẩn hoàng cung.",
    },
    "tuoc-cot": {
      title: "Tước Cốt",
      slug: "tuoc-cot",
      backdropUrl: "https://sf-static.onflixcdn.com/images/default/1783767015_url.webp",
      posterUrl: "https://sf-static.onflixcdn.com/images/default/1783767015_url.webp",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      genres: ["Lãng Mạn", "Cổ Trang"],
      country: "Trung Quốc",
      releaseYear: 2026,
      episodes: "Tập 22 / 30",
      totalEpisodes: 30,
      ratingScore: 9.4,
      views: "1.9M",
      director: "Chu Thiếu Kiệt",
      actors: ["Tiêu Chiến", "Nhậm Mẫn"],
      description: "Tên tướng độc ác ép cưới cô tiểu thư giàu có giả mạo, kẻ tham lam và say mê cơ nghiệp chốn vương triều.",
    },
    "dac-vu-kim-tai-khoi-dong": {
      title: "Đặc Vụ Kim Tái Khởi Động",
      slug: "dac-vu-kim-tai-khoi-dong",
      backdropUrl: "https://image.tmdb.org/t/p/original/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",
      posterUrl: "https://image.tmdb.org/t/p/original/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",
      videoUrl: "https://occ-0-64-58.1.nflxso.net/so/soa5/381/2062564114569950721.mp4?v=1&e=1783181803&t=QoN1m6qUN86GxW_qKtKNwP3xYKw",
      genres: ["Chính Kịch", "Hành Động", "Hình Sự"],
      country: "Hàn Quốc",
      releaseYear: 2026,
      episodes: "Tập 8 / 12",
      totalEpisodes: 12,
      ratingScore: 9.7,
      views: "3.1M",
      director: "Ryoo Seung-wan",
      actors: ["Ma Dong-seok", "Lee Byung-hun"],
      description: "Khi con gái mất tích, một ông bố tưởng như bình thường phải đánh thức những kĩ năng đặc nhiệm sát thủ từng bị chôn giấu.",
    },
    "gia-toc-rong-phan-3": {
      title: "Gia Tộc Rồng (Phần 3)",
      slug: "gia-toc-rong-phan-3",
      backdropUrl: "https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
      posterUrl: "https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
      videoUrl: "https://stream.onflixcdn.pics/GIA%20TO%CC%A3%CC%82C%20RO%CC%82%CC%80NG%20-%20MU%CC%80A%203%20-%20HOUSE%20OF%20THE%20DRAGON%20S3%20-%20TRAILER%20TA%CC%A3%CC%82P%20CUO%CC%82%CC%81I%20-%20HBO%20VIE%CC%A3%CC%82T%20NAM%2006-2026%20-%20YouTube.mp4",
      genres: ["Chính Kịch", "Hành Động", "Khoa Học Viễn Tưởng", "Phiêu Lưu"],
      country: "Âu Mỹ",
      releaseYear: 2026,
      episodes: "Tập 5",
      totalEpisodes: 10,
      ratingScore: 9.9,
      views: "4.5M",
      director: "Ryan Condal",
      actors: ["Matt Smith", "Emma D'Arcy", "Olivia Cooke"],
      description: "Phần 3 tiếp tục câu chuyện về Vũ điệu của loài Rồng (Dance of the Dragons) – cuộc nội chiến tàn khốc giữa hai phe Rồng thống trị gia tộc Targaryen.",
    }
  };

  const found = detailsDatabase[normalizedSlug];

  const defaultTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const totalEp = found?.totalEpisodes || 24;

  const episodesList = Array.from({ length: totalEp }, (_, i) => ({
    number: i + 1,
    title: totalEp === 1 ? "Full" : `Tập ${i + 1}`,
  }));

  const mainVideo = found?.videoUrl || "https://vjs.zencdn.net/v/oceans.mp4";

  const rawActorNames = found?.actors || ["Địch Lệ Nhiệt Ba", "Sato Takeru", "Sisley Choi Si-Pui", "Ngãi Mễ"];
  const actorsList = rawActorNames.map((name, idx) => ({
    id: idx + 1000,
    name: name,
    image_url: getActorImage(name),
  }));

  const categoriesList = (found?.genres || ["Hành Động", "Chính Kịch", "Tình Cảm"]).map(g => ({
    name: g,
    slug: g.toLowerCase().replace(/\s+/g, "-"),
  }));

  const countriesList = (found?.country ? found.country.split(", ") : ["Quốc tế"]).map(c => ({
    name: c,
    slug: c.toLowerCase().replace(/\s+/g, "-"),
  }));

  return {
    id: slug,
    slug: normalizedSlug,
    title: found?.title || defaultTitle,
    originalTitle: found?.originalTitle || "",
    posterUrl: found?.posterUrl || "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
    backdropUrl: found?.backdropUrl || "https://image.tmdb.org/t/p/original/w7Q53AmbEvrbpR2nRE8qBHJcbi2.jpg",
    videoUrl: mainVideo,
    genres: found?.genres || ["Hành Động", "Chính Kịch", "Tình Cảm"],
    country: found?.country || "Hàn Quốc",
    releaseYear: found?.releaseYear || 2026,
    episodes: found?.episodes || (totalEp === 1 ? "Full" : `Tập 1 / ${totalEp}`),
    totalEpisodes: totalEp,
    episodesList: episodesList,
    ratingScore: found?.ratingScore || 9.5,
    views: found?.views || "1.5M",
    director: found?.director || "Đang cập nhật",
    actors: rawActorNames,
    actorsList: actorsList,
    description: found?.description || `Xem phim ${defaultTitle} chất lượng 4K Vietsub Thuyết Minh đầy đủ các tập tại RIOFLIX.`,
    linkUrl: `/phim/${normalizedSlug}`,
    isTop10: true,
    quality: found?.quality || "FHD",
    language: found?.language || "Vietsub",
    trailerUrl: found?.trailerUrl || "",
    categoriesList,
    countriesList,
    serverSources: [
      { id: "vip1", name: "Vietsub (PA)", type: "video", url: mainVideo },
      { id: "vip2", name: "Server Fast-CDN #2", type: "video", url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" },
    ]
  };
}
