import React from "react";
import Link from "next/link";
import { RioflixLogo, RoPhimIcon, TelegramIcon } from "./icons";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900/80 pt-16 pb-24 lg:pb-12 mt-16 text-zinc-400">
      <div className="container mx-auto px-4 md:px-8 lg:pl-28">
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <RioflixLogo />
            </Link>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Trải nghiệm điện ảnh đỉnh cao ngay tại nhà. Hàng ngàn bộ phim bom tấn, phim bộ và show truyền hình hấp dẫn đang chờ bạn khám phá.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/rioflix.vip"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-green-600 transition-all border border-white/5"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-green-600 transition-all border border-white/5"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://t.me/rioflixvip"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-green-600 transition-all border border-white/5"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.rophim.stream/"
                target="_blank"
                rel="noopener noreferrer"
                title="Rổ Phim - Phim hay cả Rổ!"
                className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-green-600 transition-all border border-white/5 flex items-center justify-center"
              >
                <RoPhimIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Discover Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Khám phá
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/phim-le" className="hover:text-green-400 transition-colors">
                  Phim lẻ mới nhất
                </Link>
              </li>
              <li>
                <Link href="/phim-bo" className="hover:text-green-400 transition-colors">
                  Phim bộ độc quyền
                </Link>
              </li>
              <li>
                <Link href="/phim-han" className="hover:text-green-400 transition-colors">
                  Phim Hàn Quốc
                </Link>
              </li>
              <li>
                <Link href="/phim-trung" className="hover:text-green-400 transition-colors">
                  Phim Trung Quốc
                </Link>
              </li>
              <li>
                <Link href="/phim-au-my" className="hover:text-green-400 transition-colors">
                  Phim Âu Mỹ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Hỗ trợ
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Liên hệ quảng cáo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Liên hệ
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                <span>Việt Nam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span>+84 1900 RIOFLIX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span>contact@rioflix.lat</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-zinc-500 text-center md:text-left">
            © 2026 <span className="text-zinc-200 font-semibold">RIOFLIX</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
