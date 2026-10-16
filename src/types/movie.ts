export interface MovieItem {
  id: number | string;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  backdropUrl?: string;
  bannerTitleUrl?: string;
  year?: number;
  country?: string;
  episodes?: string;
  rating?: string;
  imdbScore?: string;
  quality?: string; // e.g. "4K", "FHD", "Vietsub", "Thuyết Minh"
  genres?: string[];
  description?: string;
  linkUrl: string;
  videoUrl?: string;
  isTop10?: boolean;
  modifiedTime?: string;
  vietsub?: number;
  thuyet_minh?: number;
  long_tieng?: number;
  is_sn?: boolean;
}

export interface HeroSlide {
  id: number | string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  characterUrl?: string;
  titleImageUrl?: string;
  year: number;
  country: string;
  episodes: string;
  genres: string[];
  description: string;
  linkUrl: string;
  videoUrl?: string;
  isTop10?: boolean;
}

