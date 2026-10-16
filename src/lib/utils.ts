import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanSlug(str: string): string {
  if (!str) return "";
  return decodeURIComponent(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function getCategorySlug(str: string): string {
  const cleaned = cleanSlug(str);
  if (cleaned === "phim-ngan" || cleaned === "short-drama") return "ngan";
  if (cleaned === "lang-man") return "tinh-cam";
  if (cleaned === "phim-hai") return "hai-huoc";
  if (cleaned === "phim-tai-lieu") return "tai-lieu";
  if (cleaned === "toi-pham") return "hinh-su";
  if (cleaned === "tuoi-tre") return "hoc-duong";
  if (cleaned === "action-adventure") return "hanh-dong";
  if (cleaned === "huyen-huyen") return "than-thoai";
  if (cleaned === "khoa-hoc-vien-tuong") return "vien-tuong";
  if (cleaned === "lgbt") return "tinh-cam";
  if (cleaned === "chuyen-the") return "tam-ly";
  return cleaned;
}

export function getCategoryTitle(slug: string): string {
  const clean = cleanSlug(slug);
  if (clean === "ngan" || clean === "phim-ngan") return "Phim Ngắn";
  if (clean === "hoat-hinh") return "Phim Hoạt Hình";
  if (clean === "phim-bo") return "Phim Bộ";
  if (clean === "phim-le") return "Phim Lẻ";
  if (clean === "phim-chieu-rap") return "Phim Chiếu Rạp";
  if (clean === "tv-shows") return "TV Shows";
  if (clean === "hanh-dong") return "Hành Động";
  if (clean === "tinh-cam") return "Tình Cảm";
  if (clean === "co-trang") return "Cổ Trang";
  if (clean === "hai-huoc") return "Hài Hước";
  if (clean === "tam-ly") return "Tâm Lý";
  if (clean === "hinh-su") return "Hình Sự";
  if (clean === "chien-tranh") return "Chiến Tranh";
  if (clean === "the-thao") return "Thể Thao";
  if (clean === "vo-thuat") return "Võ Thuật";
  if (clean === "vien-tuong") return "Viễn Tưởng";
  if (clean === "phieu-luu") return "Phiêu Lưu";
  if (clean === "khoa-hoc") return "Khoa Học";
  if (clean === "kinh-di") return "Kinh Dị";
  if (clean === "am-nhac") return "Âm Nhạc";
  if (clean === "than-thoai") return "Thần Thoại";
  if (clean === "tai-lieu") return "Tài Liệu";
  if (clean === "gia-dinh") return "Gia Đình";
  if (clean === "chinh-kich") return "Chính Kịch";
  if (clean === "bi-an") return "Bí Ẩn";
  if (clean === "hoc-duong") return "Học Đường";
  if (clean === "kinh-dien") return "Kinh Điển";

  return slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Thể Loại";
}

