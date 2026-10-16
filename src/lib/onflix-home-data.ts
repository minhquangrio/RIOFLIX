import { MovieItem } from "@/types/movie";

export interface OnflixSection {
  title: string;
  viewAllUrl: string;
  movies: MovieItem[];
}

export const ONFLIX_HOME_SECTIONS: OnflixSection[] = [
  {
    "title": "Đề Xuất Cho Bạn",
    "viewAllUrl": "/chu-de/de-xuat-cho-ban",
    "movies": [
      {
        "id": "bai-hoc-dang-doi-2026",
        "title": "Bài Học Đáng Đời",
        "originalTitle": "Teach You a Lesson",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/619abfe679680341e3e84d469d843d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bai-hoc-dang-doi-2026"
      },
      {
        "id": "xanh-cham-day-troi",
        "title": "Xanh Chạm Đáy Trời",
        "originalTitle": "Azure Spring",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/69b81e27b4f605bde01880ca0c036811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/xanh-cham-day-troi"
      },
      {
        "id": "phu-nhan-dai-quan-the-ky-21",
        "title": "Phu Nhân Đại\r\n                                                                    Quân Thế Kỷ 21",
        "originalTitle": "Perfect Crown",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/988614236e07010fcb6765585d84b011.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/phu-nhan-dai-quan-the-ky-21"
      },
      {
        "id": "biet-doi-sieu-kho",
        "title": "Biệt Đội Siêu Khờ",
        "originalTitle": "The WONDERfools",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/40884e03d62406f9f73cfe6c005b4b11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/biet-doi-sieu-kho"
      },
      {
        "id": "cho-hoang-va-xuong",
        "title": "Chó Hoang và Xương",
        "originalTitle": "Love For You",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/1e946ad88b100507de125ef6fb5fe711.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cho-hoang-va-xuong"
      },
      {
        "id": "gia-toc-rong-phan-3",
        "title": "Gia Tộc Rồng (Phần 3)",
        "originalTitle": "House of the Dragon (season 3)",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/c1607e0f70870deecd4b67495fe06411.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/gia-toc-rong-phan-3"
      },
      {
        "id": "phi-vu-chung-cu",
        "title": "Phi Vụ Chung Cư",
        "originalTitle": "The Apartment Job",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/34e6e58ad8d306d2de3cd8cdd06eee11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/phi-vu-chung-cu"
      },
      {
        "id": "chuyen-tinh-ma-quai",
        "title": "Chuyện Tình Ma Quái",
        "originalTitle": "Spooky in Love ",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/826cec5456ff0217cedd2fcdc1946111.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chuyen-tinh-ma-quai"
      },
      {
        "id": "bach-hoa-sat",
        "title": "Bách Hoa Sát",
        "originalTitle": "Blossoms of Power",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/7c50a8eff4d20f25f6b1090b3a2e9211.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bach-hoa-sat"
      },
      {
        "id": "tuoc-cot",
        "title": "Tước Cốt",
        "originalTitle": "Key to the Phoenix Heart",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/873d41568de40383e7d17925c1a15811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tuoc-cot"
      },
      {
        "id": "toa-sang-nhu-nhung-vi-sao",
        "title": "Tỏa Sáng Như Những\r\n                                                                    Vì Sao",
        "originalTitle": "Road to Success",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/2fa94f41da190841cbce18a34c7f2811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/toa-sang-nhu-nhung-vi-sao"
      },
      {
        "id": "giay-phut-ay-vuot-gioi-han",
        "title": "Giây Phút Ấy Vượt\r\n                                                                    Giới Hạn",
        "originalTitle": "OVERDO",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/0e0d0ee2dfde01ccc224c9b2cde2bd11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/giay-phut-ay-vuot-gioi-han"
      }
    ]
  },
  {
    "title": "Đang Chiếu Phát",
    "viewAllUrl": "/kham-pha?type=dang_chieu",
    "movies": [
        {
            "id": "bac-si-x-mafia-ao-trang",
            "title": "Bác Sĩ X : Mafia Áo Trắng",
            "originalTitle": "Doctor X: Mafia in White",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/860ad16d584c0a3df4f0f867228cf111.webp",
            "quality": "HD",
            "episodes": "Tập 3",
            "linkUrl": "/phim/bac-si-x-mafia-ao-trang",
            "imdbScore": "9.0"
        },
        {
            "id": "my-nhan-du",
            "title": "Mỹ Nhân Dư",
            "originalTitle": "The Vanishing Beauty",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/7cc3da3704610d85f9404f33d5b0ec11.webp",
            "quality": "HD",
            "episodes": "Tập 17",
            "linkUrl": "/phim/my-nhan-du",
            "imdbScore": "8.0"
        },
        {
            "id": "mua-2-nguoi-chay-xuyen-khong-gian",
            "title": "[Mùa 2] Người Chạy Xuyên Không Gian",
            "originalTitle": "Dark Matter Season 2",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/4fee8b6bc15f0e71e88e5fe6acd84d11.webp",
            "quality": "HD",
            "episodes": "Tập 7",
            "linkUrl": "/phim/mua-2-nguoi-chay-xuyen-khong-gian",
            "imdbScore": "7.8"
        },
        {
            "id": "moi-tinh-dau-thu-hai",
            "title": "Mối Tình Đầu Thứ Hai",
            "originalTitle": "First Love Again",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/700e67c9a36d0c93e077a521c98f8e11.webp",
            "quality": "HD",
            "episodes": "Tập 10",
            "linkUrl": "/phim/moi-tinh-dau-thu-hai"
        },
        {
            "id": "fool-in-love-yeu-mot-ke-ngoc",
            "title": "Fool in Love: Yêu Một Kẻ Ngốc",
            "originalTitle": "Fool in Love",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/d8c10e9515300ce8fdd9c796543d6411.webp",
            "quality": "HD",
            "episodes": "Tập 3",
            "linkUrl": "/phim/fool-in-love-yeu-mot-ke-ngoc"
        },
        {
            "id": "khien-em-rung-dong",
            "title": "Khiến Em Rung Động",
            "originalTitle": "Make Me Tingle",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/10f02a42993f0022f07d8d23793ad711.webp",
            "quality": "HD",
            "episodes": "Tập 4",
            "linkUrl": "/phim/khien-em-rung-dong"
        },
        {
            "id": "chiec-ca-vat-roi-ram",
            "title": "Chiếc Cà Vạt Rối Rắm",
            "originalTitle": "Twisted Tie",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/385a3ec0002c0dcef329e634d69ae311.webp",
            "quality": "HD",
            "episodes": "Tập 2",
            "linkUrl": "/phim/chiec-ca-vat-roi-ram",
            "imdbScore": "7.0"
        },
        {
            "id": "mua-6-nhung-diep-vien-het-thoi-slow-horses",
            "title": "[Mùa 6] Những Điệp Viên Hết Thời - Slow Horses",
            "originalTitle": "Slow Horses Season 6",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/01c4e78e8ad7096cd51beacebbe36911.webp",
            "quality": "HD",
            "episodes": "Tập 5",
            "linkUrl": "/phim/mua-6-nhung-diep-vien-het-thoi-slow-horses",
            "imdbScore": "8.1"
        },
        {
            "id": "visionquest",
            "title": "VisionQuest",
            "originalTitle": "VisionQuest",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/a8a51975efc20f1ad1e38fdc8d8d9e11.webp",
            "quality": "HD",
            "episodes": "Tập 2",
            "linkUrl": "/phim/visionquest",
            "imdbScore": "9.1"
        },
        {
            "id": "tien-si-tinh-yeu",
            "title": "Tiến Sĩ Tình Yêu",
            "originalTitle": "Between Steps",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/f665879ca0170974c83668f5ed99b411.webp",
            "quality": "HD",
            "episodes": "Tập 4",
            "linkUrl": "/phim/tien-si-tinh-yeu",
            "imdbScore": "7.2"
        },
        {
            "id": "khom-khlang",
            "title": "Khom Khlang",
            "originalTitle": "Khom Khlang",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/f53397c82d0106ade2b7da517d12b011.webp",
            "quality": "HD",
            "episodes": "Tập 6",
            "linkUrl": "/phim/khom-khlang",
            "imdbScore": "9.0"
        },
        {
            "id": "carrie-2026",
            "title": "Carrie",
            "originalTitle": "Carrie",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/7bbdead3e4330e80e067d32eefe97e11.webp",
            "quality": "HD",
            "episodes": "Tập 0",
            "linkUrl": "/phim/carrie-2026",
            "imdbScore": "8.3"
        },
        {
            "id": "vua-hai-kich-2026",
            "title": "Vua Hài Kịch",
            "originalTitle": "King of Comedy",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/fb5c4b3abc0c0a5ac0b2fac1f255f311.webp",
            "quality": "HD",
            "episodes": "Tập 0",
            "linkUrl": "/phim/vua-hai-kich-2026"
        },
        {
            "id": "chuyen-xua-du-hong",
            "title": "Chuyện Xưa Dư Hồng",
            "originalTitle": "The Old Story of Yu Hong",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/81b7e53db58b0c7fede314f9608bb511.webp",
            "quality": "HD",
            "episodes": "Tập 24",
            "linkUrl": "/phim/chuyen-xua-du-hong",
            "imdbScore": "7.2"
        },
        {
            "id": "the-fire-4-elements-xich-tinh-ruc-lua",
            "title": "The Fire 4 Elements: Xích Tình Rực Lửa",
            "originalTitle": "The Fire 4 Elements",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/edd386ddd35f0439f2a5a18316c27011.webp",
            "quality": "HD",
            "episodes": "Tập 7",
            "linkUrl": "/phim/the-fire-4-elements-xich-tinh-ruc-lua",
            "imdbScore": "8.9"
        },
        {
            "id": "ban-4k-su-huynh-qua-can-trong",
            "title": "[Bản 4K] Sư Huynh Quá Cẩn Trọng",
            "originalTitle": "Pull Strings",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/660e9b8d6c99066ec3b2f868273da111.webp",
            "quality": "HD",
            "episodes": "Tập 7",
            "linkUrl": "/phim/ban-4k-su-huynh-qua-can-trong",
            "imdbScore": "6.2"
        },
        {
            "id": "ban-4k-hoa-khai-cam-tu",
            "title": "[Bản 4K] Hoa Khai Cẩm Tú",
            "originalTitle": "The Road to Splendor",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/543c94d44847003efb904c4efb1e9c11.webp",
            "quality": "HD",
            "episodes": "Tập 19",
            "linkUrl": "/phim/ban-4k-hoa-khai-cam-tu",
            "imdbScore": "7.4"
        },
        {
            "id": "knot-nut-that",
            "title": "KNOT: Nút Thắt",
            "originalTitle": " KNOT",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/8654ee617599000bec27e91ae2586a11.webp",
            "quality": "HD",
            "episodes": "Tập 8",
            "linkUrl": "/phim/knot-nut-that",
            "imdbScore": "6.7"
        },
        {
            "id": "ai-girl-ban-gai-nguoi-may",
            "title": "AI Girl: Bạn Gái Người Máy",
            "originalTitle": "AI Girl",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/e1d6933afc830a56ecd6708139ef6411.webp",
            "quality": "HD",
            "episodes": "Tập 7",
            "linkUrl": "/phim/ai-girl-ban-gai-nguoi-may",
            "imdbScore": "7.7"
        },
        {
            "id": "van-nhan-chi-thuong",
            "title": "Vạn Nhân Chi Thượng",
            "originalTitle": "Above Myriads",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/e5cda7b6f8ce0c59e06f2753b3760211.webp",
            "quality": "HD",
            "episodes": "Tập 9",
            "linkUrl": "/phim/van-nhan-chi-thuong",
            "imdbScore": "7.0"
        },
        {
            "id": "ban-4k-ai-girl-ban-gai-nguoi-may",
            "title": "[Bản 4K] AI Girl: Bạn Gái Người Máy",
            "originalTitle": "AI Girl",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/0f71ebaba0ef0216f8d32e58a69a6111.webp",
            "quality": "HD",
            "episodes": "Tập 4",
            "linkUrl": "/phim/ban-4k-ai-girl-ban-gai-nguoi-may",
            "imdbScore": "7.7"
        },
        {
            "id": "vung-dat-mua-xuan",
            "title": " Vùng Đất Mùa Xuân",
            "originalTitle": " The Forbidden Land",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/21e3a2d9df7a0a0dc8e4e3909e890411.webp",
            "quality": "HD",
            "episodes": "Tập 12",
            "linkUrl": "/phim/vung-dat-mua-xuan",
            "imdbScore": "8.0"
        },
        {
            "id": "truy-duoi-nguoc-thoi-gian",
            "title": "Truy Đuổi Ngược Thời Gian",
            "originalTitle": "Reverse Chase",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/96339112652a02a3d03c1d789cbd0311.webp",
            "quality": "HD",
            "episodes": "Tập 18",
            "linkUrl": "/phim/truy-duoi-nguoc-thoi-gian",
            "imdbScore": "7.0"
        },
        {
            "id": "trach-thien-ky",
            "title": "Trạch Thiên Ký",
            "originalTitle": "Fighter of the Destiny",
            "posterUrl": "https://pics.onflixcdn.com/vi/image/poster/3dc5b8af88360f80d8e1afb42dca9611.webp",
            "quality": "HD",
            "episodes": "Tập 25",
            "linkUrl": "/phim/trach-thien-ky",
            "imdbScore": "8.0"
        }
    ]
},
  {
    "title": "Phim Kỹ Xảo Mãn Nhãn",
    "viewAllUrl": "/chu-de/phim-ky-xao-man-nhan",
    "movies": [
      {
        "id": "transformers-chien-binh-cuoi-cung",
        "title": "Robot Đại Chiến 5: Chiến Binh Cuối Cùng",
        "originalTitle": "Transformers: The Last Knight",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/f1e668850faa0690e001e800e5ed4d11.webp",
        "quality": "HD",
        "episodes": "FULL",
        "linkUrl": "/phim/transformers-chien-binh-cuoi-cung"
      },
      {
        "id": "cuoc-chien-sinh-tu-ii",
        "title": "Cuộc Chiến Sinh Tử II",
        "originalTitle": "Mortal Kombat II",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/b6c7e58a1a6b07fcea3a97725ceacf11.webp",
        "quality": "HD",
        "episodes": "Full",
        "linkUrl": "/phim/cuoc-chien-sinh-tu-ii"
      },
      {
        "id": "transformers-quai-thu-troi-day",
        "title": "Transformers: Quái Thú Trỗi Dậy",
        "originalTitle": "Transformers: Rise of the Beasts",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/24b17aa2b84506fbcf5f047ce276a411.webp",
        "quality": "HD",
        "episodes": "Full",
        "linkUrl": "/phim/transformers-quai-thu-troi-day"
      },
      {
        "id": "ho-den-tu-than",
        "title": "Hố Đen Tử Thần",
        "originalTitle": "Interstellar",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/0e3047a524680b5edbec50fcc9fa0811.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/ho-den-tu-than"
      },
      {
        "id": "hanh-tinh-cat-phan-hai",
        "title": "Hành Tinh Cát: Phần Hai",
        "originalTitle": "Dune: Part Two",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/2326d10b1dbd0366dedc428508568d11.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/hanh-tinh-cat-phan-hai"
      },
      {
        "id": "hanh-tinh-cat",
        "title": "Hành Tinh Cát",
        "originalTitle": "Dune",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/808feb438bf20c53c76cbd1f432a9811.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/hanh-tinh-cat"
      },
      {
        "id": "thu-tu-phan-1",
        "title": "Wednesday",
        "originalTitle": "Wednesday",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/4569913f8faf073bd494eb91bc2ceb11.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/thu-tu-phan-1"
      },
      {
        "id": "wives-with-knives",
        "title": "Người Sắt 3",
        "originalTitle": "Iron Man 3",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/fed2cb08c68d04e9e2c483ccb458ab11.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/wives-with-knives"
      },
      {
        "id": "avengers-3-cuoc-chien-vo-cuc",
        "title": "Avengers 3: Cuộc Chiến Vô Cực",
        "originalTitle": "Avengers: Infinity War",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/1dd5de7a80690357ceb3d5fe5537c511.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/avengers-3-cuoc-chien-vo-cuc"
      },
      {
        "id": "avengers-2-de-che-ultron",
        "title": "Avengers 2: Đế Chế Ultron",
        "originalTitle": "Avengers: Age of Ultron",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/f6cd0b63f15d0069ff9ca51f57bfda11.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/avengers-2-de-che-ultron"
      },
      {
        "id": "avengers-1biet-doi-sieu-anh-hung",
        "title": "Avengers 1: Biệt Đội Siêu Anh Hùng",
        "originalTitle": "The Avengers",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/1ed2a824ae0f0b15da013f7e1f91d911.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/avengers-1biet-doi-sieu-anh-hung"
      },
      {
        "id": "avengers-hoi-ket",
        "title": "Avengers 4: Hồi Kết",
        "originalTitle": "Avengers: Endgame",
        "posterUrl": "https://pics.onflixcdn.com/image/poster/0f17be5f02060c2ac256811e02542011.webp",
        "quality": "HD",
        "episodes": "Hoàn tất",
        "linkUrl": "/phim/avengers-hoi-ket"
      }
    ]
  },
  {
    "title": "Phim Chất Lượng Cao và Phụ Đề Song Ngữ",
    "viewAllUrl": "/chu-de/phim-chat-luong-cao-va-phu-de-song-ngu",
    "movies": [
      {
        "id": "chua-te-cua-nhung-chiec-nhan-nhung-chiec-nhan-quyen-nang-phan-1",
        "title": "Chúa Tể Của Những Chiếc Nhẫn: Những Chiếc Nhẫn Quyền\r\n                                                                    Năng",
        "originalTitle": "The Lord of the Rings: The Rings of Power",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/c71026eb0c890b07cec82e68c6ed1011.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chua-te-cua-nhung-chiec-nhan-nhung-chiec-nhan-quyen-nang-phan-1"
      },
      {
        "id": "em-gai-2012",
        "title": "Em gái",
        "originalTitle": "Sister",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/6b5a323cbb6000cff8f9bc066737a711.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/em-gai-2012"
      },
      {
        "id": "giac-mo-dien-ro",
        "title": "Giấc Mơ Điên Rồ",
        "originalTitle": "Mad Concrete Dreams",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/1908dfa0fbd40834f6ce5f0a875df911.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/giac-mo-dien-ro"
      },
      {
        "id": "hom-nay-lai-ban-het",
        "title": "Hôm Nay Lại Bán Hết",
        "originalTitle": "Sold Out on You",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/85a05623408a047ef1fd71f744a27911.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hom-nay-lai-ban-het"
      },
      {
        "id": "bai-hoc-dang-doi-2026",
        "title": "Bài Học Đáng Đời",
        "originalTitle": "Teach You a Lesson",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/619abfe679680341e3e84d469d843d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bai-hoc-dang-doi-2026"
      },
      {
        "id": "vung-dat-vang",
        "title": "Vùng Đất Vàng",
        "originalTitle": "Gold Land",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/e1a65761fa340f04d5aa586bdaf61c11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vung-dat-vang"
      },
      {
        "id": "nguyet-lan-y-ky",
        "title": "Nguyệt Lân Ỷ Kỷ",
        "originalTitle": "Veil of Shadows",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/c326398cf9af0b50c90616fcbf46db11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguyet-lan-y-ky"
      },
      {
        "id": "mua-he-yeu-dau-cua-chung-ta",
        "title": "Mùa hè yêu dấu\r\n                                                                    của chúng ta",
        "originalTitle": "Our Beloved Summer",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/dd455c6af2810b6bebe421e3946f7d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mua-he-yeu-dau-cua-chung-ta"
      },
      {
        "id": "xanh-cham-day-troi",
        "title": "Xanh Chạm Đáy Trời",
        "originalTitle": "Azure Spring",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/69b81e27b4f605bde01880ca0c036811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/xanh-cham-day-troi"
      },
      {
        "id": "mua-he-yeu-dau-cua-chung-ta-nhung-ngay-he-ruc-nang-cua-chung-minh",
        "title": "Mùa hè yêu dấu\r\n                                                                    của chúng ta",
        "originalTitle": "Our Beloved Summer",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/dd455c6af2810b6bebe421e3946f7d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mua-he-yeu-dau-cua-chung-ta-nhung-ngay-he-ruc-nang-cua-chung-minh"
      },
      {
        "id": "vu-lam-linh",
        "title": "Vũ Lâm Linh",
        "originalTitle": "Zhan Zhao Adventures",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/2f70567870120c34d273ee66a8cce911.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vu-lam-linh"
      },
      {
        "id": "cuoc-phieu-luu-bien-hoa-2026",
        "title": "Cuộc phiêu lưu biến\r\n                                                                    hóa",
        "originalTitle": "Swapped",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/55744271df4f0d5ad3a7f4d509293111.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cuoc-phieu-luu-bien-hoa-2026"
      }
    ]
  },
  {
    "title": "Hoạt hình chọn lọc",
    "viewAllUrl": "/chu-de/hoat-hinh-chon-loc",
    "movies": [
      {
        "id": "chon-ngay-phi-thang",
        "title": "Trạch Nhật Phi Thăng",
        "originalTitle": "A Good Day to Ascend",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/5557350b76a9023ddf5e6e93ac9f0511.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chon-ngay-phi-thang"
      },
      {
        "id": "tham-tu-lung-danh-conan-28-du-anh-cua-doc-nhan",
        "title": "Thám Tử Lừng Danh Conan: Dư Ảnh Của Độc Nhãn",
        "originalTitle": "Meitantei Conan Movie 28: Sekigan no Flashback, Detective Conan Movie 28: One-Eyed Flashback",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/55891ea28c8ce84947d360430fd8ca6c",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tham-tu-lung-danh-conan-28-du-anh-cua-doc-nhan"
      },
      {
        "id": "kamitsubaki-shi-kensetsuchuu",
        "title": "Thành Phố Kamitsubaki Đang Được Xây Dựng",
        "originalTitle": "KAMITSUBAKI CITY UNDER CONSTRUCTION",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/9fc360f200b815b875fb76270eff3ae0",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/kamitsubaki-shi-kensetsuchuu"
      },
      {
        "id": "xi-trum-2025",
        "title": "Xì Trum (2025)",
        "originalTitle": "Smurfs",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e04d3f1c88488810cc1140f1989f17cc",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/xi-trum-2025"
      },
      {
        "id": "cau-be-den-tu-trai-dat",
        "title": "Cậu Bé Đến Từ Trái\r\n                                                                    Đất",
        "originalTitle": "Elio",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/64eb142a3c2f086629cedcddb206d5b4",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cau-be-den-tu-trai-dat"
      },
      {
        "id": "nhung-ke-xau-xa-2",
        "title": "Những Kẻ Xấu Xa 2",
        "originalTitle": "The Bad Guys 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f646eb858ad27410bf1f88f5d1f0475e",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhung-ke-xau-xa-2"
      },
      {
        "id": "hat-cung-tho-san-quy-kpop",
        "title": "Hát Cùng Thợ Săn\r\n                                                                    Quỷ Kpop",
        "originalTitle": "Untitled KPop Demon Hunters Follow-Up",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/7ad6494c74314f624f8f0aa389fa4cb5",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hat-cung-tho-san-quy-kpop"
      },
      {
        "id": "tham-tu-lung-danh-conan-du-anh-cua-doc-nhan",
        "title": "Thám Tử Lừng Danh Conan: Dư Ảnh Của Độc Nhãn",
        "originalTitle": "Meitantei Conan Movie 28: Sekigan no Flashback, Detective Conan Movie 28: One-Eyed Flashback",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/39564c84393909ddbc3f5c6099aa8082",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tham-tu-lung-danh-conan-du-anh-cua-doc-nhan"
      },
      {
        "id": "robot-hoang-da",
        "title": "Robot Hoang Dã",
        "originalTitle": "The Wild Robot",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f4c5f741a52fc56e25003c8ea3f503dd",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/robot-hoang-da"
      },
      {
        "id": "tham-tu-dong-vat-phan-5",
        "title": "Thám tử động vật\r\n                                                                    (Phần 5)",
        "originalTitle": "The Creature Cases (Season 5)",
        "posterUrl": "https://img.ophim.live/uploads/movies/tham-tu-dong-vat-phan-5-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tham-tu-dong-vat-phan-5"
      },
      {
        "id": "grand-blue-3rd-season",
        "title": "Grand Blue 3rd Season",
        "originalTitle": "Grand Blue Dreaming Season 3",
        "posterUrl": "https://phim.nguonc.com/public/images/Post/6/grand-blue-3rd-season.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/grand-blue-3rd-season"
      },
      {
        "id": "cuoc-phieu-luu-cung-superman-phan-3",
        "title": "Cuộc\r\n                                                                    Phiêu Lưu Cùng Superman (Phần 3)",
        "originalTitle": "My Adventures with Superman (Season 3)",
        "posterUrl": "https://phim.nguonc.com/public/images/Post/1/cuoc-phieu-luu-cung-superman-phan-3.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cuoc-phieu-luu-cung-superman-phan-3"
      }
    ]
  },
  {
    "title": "Phiêu Lưu Mạo Hiểm",
    "viewAllUrl": "/chu-de/phieu-luu-mao-hiem",
    "movies": [
      {
        "id": "chu-thuat-hoi-chien-0",
        "title": "Chú Thuật Hồi Chiến 2",
        "originalTitle": "Jujutsu Kaisen 2 || Sorcery Fight 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/668a7046105f97e3396101a7ae590c38",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chu-thuat-hoi-chien-0"
      },
      {
        "id": "jujutsu-kaisen-0-movie",
        "title": "Chú Thuật Hồi Chiến 2",
        "originalTitle": "Jujutsu Kaisen 2 || Sorcery Fight 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f3806f67fb75002a3f5956f01813e9aa",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/jujutsu-kaisen-0-movie"
      },
      {
        "id": "jujutsu-kaisen-0-chu-thuat-hoi-chien",
        "title": "Chú Thuật Hồi Chiến 2",
        "originalTitle": "Jujutsu Kaisen 2 || Sorcery Fight 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/5bf33e2cb96f8226bdfbc264844c8ee1",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/jujutsu-kaisen-0-chu-thuat-hoi-chien"
      },
      {
        "id": "chu-thuat-hoi-chien-2",
        "title": "Chú Thuật Hồi Chiến 2",
        "originalTitle": "Jujutsu Kaisen 2 || Sorcery Fight 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/39f1e88399e6a5682b4853a126ba229b",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chu-thuat-hoi-chien-2"
      },
      {
        "id": "son-ha-lenh-thien-nhai-khach",
        "title": "Sơn Hà Lệnh /\r\n                                                                    Thiên Nhai Khách",
        "originalTitle": "Word of Honor",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c7a97d9ca76558f0a92a009321167de4",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/son-ha-lenh-thien-nhai-khach"
      },
      {
        "id": "chu-thuat-hoi-chien-0-truong-chuyen-chu-thuat-tokyo",
        "title": "Chú Thuật Hồi Chiến 2",
        "originalTitle": "Jujutsu Kaisen 2 || Sorcery Fight 2",
        "posterUrl": "https://phimimg.com/upload/vod/20260207-1/c061a30c66499600aed1b4d8714d436e.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chu-thuat-hoi-chien-0-truong-chuyen-chu-thuat-tokyo"
      },
      {
        "id": "bebefinn-phan-2",
        "title": "Bebefinn (Phần 2)",
        "originalTitle": "Bebefinn (Season 2)",
        "posterUrl": "https://img.ophim.live/uploads/movies/bebefinn-phan-2-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bebefinn-phan-2"
      },
      {
        "id": "bebefinn-phan-1",
        "title": "Bebefinn (Phần 1)",
        "originalTitle": "Bebefinn (Season 1)",
        "posterUrl": "https://img.ophim.live/uploads/movies/bebefinn-phan-1-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bebefinn-phan-1"
      },
      {
        "id": "tinh-linh-long-ma",
        "title": "Tinh Linh Long Mã",
        "originalTitle": "Ride On",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c8de25a3d51c90ffcb651991e12c90db",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tinh-linh-long-ma"
      },
      {
        "id": "chay-di-cho-chi-phan-2",
        "title": "Chạy Đi Chờ Chi\r\n                                                                    (Phần 2)",
        "originalTitle": "Running Man Vietnam (Season 2)",
        "posterUrl": "https://img.ophim.live/uploads/movies/chay-di-cho-chi-phan-2-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chay-di-cho-chi-phan-2"
      },
      {
        "id": "tien-len-cac-be-cun-phan-3",
        "title": "Tiến lên, các\r\n                                                                    bé cún! (Phần 1)",
        "originalTitle": "Go Dog Go (Season 1)",
        "posterUrl": "https://img.ophim.live/uploads/movies/tien-len-cac-be-cun-phan-3-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tien-len-cac-be-cun-phan-3"
      },
      {
        "id": "tien-len-cac-be-cun-phan-3-2022",
        "title": "Tiến lên, các\r\n                                                                    bé cún! (Phần 1)",
        "originalTitle": "Go Dog Go (Season 1)",
        "posterUrl": "https://phimimg.com/upload/vod/20240521-1/9e81796ee9eb527efe1e2fc06730fb37.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tien-len-cac-be-cun-phan-3-2022"
      }
    ]
  },
  {
    "title": "Phim Truyền Hình Trung Quốc Đại Lục",
    "viewAllUrl": "/chu-de/phim-truyen-hinh-trung-quoc-dai-luc",
    "movies": [
      {
        "id": "dac-ky-nhan-the-stunt",
        "title": "Đặc Kỹ Nhân - The\r\n                                                                    Stunt",
        "originalTitle": "The Stunt",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/06909b4da3739282bfe09fa64acd33eb",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dac-ky-nhan-the-stunt"
      },
      {
        "id": "cau-chuyen-khoi-nghiep",
        "title": "Câu Chuyện Khởi\r\n                                                                    Nghiệp",
        "originalTitle": "Another Era",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/164792fb3ea8d5314bd75cb98da6cccd",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cau-chuyen-khoi-nghiep"
      },
      {
        "id": "ba-trum",
        "title": "Bà Trùm",
        "originalTitle": "Apple-Colada",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/dea3b34fda63c78704e62670f1dc2dee",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ba-trum"
      },
      {
        "id": "dac-ky-nhan",
        "title": "Đặc Kỹ Nhân - The\r\n                                                                    Stunt",
        "originalTitle": "The Stunt",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/765b3ccfbfb24dbd9e8cde34b7edf9d9",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dac-ky-nhan"
      },
      {
        "id": "agent-mr-chan",
        "title": "Agent Mr Chan",
        "originalTitle": "Agent Mr Chan",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e23b18f8e1603ff257ddbbe2c2658e0c",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/agent-mr-chan"
      },
      {
        "id": "cau-chuyen-thoi-dai-so",
        "title": "Câu Chuyện Thời Đại\r\n                                                                    Số",
        "originalTitle": "The Offliners",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/3c0e9f444d3cf797f1dd2ff26b8c8445",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cau-chuyen-thoi-dai-so"
      },
      {
        "id": "doi-tac-hon-nhan",
        "title": "Đối Tác Hôn Nhân",
        "originalTitle": "My Commissioned Lover",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/24c58f86cde3806a6cd7228a71fe48e9",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/doi-tac-hon-nhan"
      },
      {
        "id": "tay-bip-hollywood",
        "title": "Tay Bịp Hollywood",
        "originalTitle": "I Bet Your Pardon",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/091f2d962e97710c0d5e42c2f58ee81a",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tay-bip-hollywood"
      },
      {
        "id": "anh-hung-duong-pho",
        "title": "Anh hùng đường phố",
        "originalTitle": "Ratman to the Rescue",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/9ec5d860ce86c3d4e421d61f5943d829",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/anh-hung-duong-pho"
      },
      {
        "id": "la-thu-cua-con-dau-quy",
        "title": "Lá thư của con dấu\r\n                                                                    quỷ",
        "originalTitle": "Legend of the Demon Seal",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/70306c2eac671fabe865827609fd653d",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/la-thu-cua-con-dau-quy"
      },
      {
        "id": "nguoi-hung-blouse-trang",
        "title": "Người Hùng Blouse\r\n                                                                    Trắng",
        "originalTitle": "Big White Duel",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/fe29a6b755bc1cbb2c3a1449b6781951",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguoi-hung-blouse-trang"
      },
      {
        "id": "tuyet-phoi-to-tam-duong",
        "title": "Tuyệt Phối Tô Tâm\r\n                                                                    Đường",
        "originalTitle": "Taste of Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/ec1f70c5666944ebc3a09862806bcfe8",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tuyet-phoi-to-tam-duong"
      }
    ]
  },
  {
    "title": "Tình Yêu Là Những gì Trái Tim Muốn",
    "viewAllUrl": "/chu-de/tinh-yeu-la-nhung-gi-trai-tim-muon",
    "movies": [
      {
        "id": "dung-xin-anh-jane",
        "title": "Đừng Xin Anh Jane",
        "originalTitle": "Don’t Be Too Emotional",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/67e0f20d1134076cc81914b446c8cb11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dung-xin-anh-jane"
      },
      {
        "id": "bao-thu-2026",
        "title": "PAYBACK: Báo Thù",
        "originalTitle": "PAYBACK (UNCUT)",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/c8233e690484042dfd3c5721dfdba911.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bao-thu-2026"
      },
      {
        "id": "tinh-tao-roi-lookpeach",
        "title": "Peach\r\n                                                                    and me: Tỉnh Táo Rồi, Lookpeach",
        "originalTitle": "Peach and Me",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/e0b5e7f1ed2e012accf097d863ee6711.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tinh-tao-roi-lookpeach"
      },
      {
        "id": "loi-de-nghi-cua-cong-to-vien",
        "title": "Lời Đề Nghị Của\r\n                                                                    Công Tố Viên",
        "originalTitle": "The Prosecutor",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/d8f99c60e292018ef327500cee956f11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/loi-de-nghi-cua-cong-to-vien"
      },
      {
        "id": "tinh-yeu-dien-cuong",
        "title": "Tình Yêu Điên Cuồng",
        "originalTitle": "Crazy Love, Moo-Moo",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/40d808cd8664045aff18f71ce9844111.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tinh-yeu-dien-cuong"
      },
      {
        "id": "du-bao-tinh-yeu",
        "title": "Dự Báo Tình Yêu",
        "originalTitle": "A Breeze of Love",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/0e56cc796c2e008bf575f2e89999c011.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/du-bao-tinh-yeu"
      },
      {
        "id": "trong-chuyen-da-ngoai-toi-da-vao-mot-nhom-khong-may-than-thiet",
        "title": "Trong chuyến dã ngoại, tôi đã vào một nhóm không mấy\r\n                                                                    thân thiết",
        "originalTitle": "School Trip: Joined a Group I",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/e4078fc0c66b08ebc9853ec95df3d611.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/trong-chuyen-da-ngoai-toi-da-vao-mot-nhom-khong-may-than-thiet"
      },
      {
        "id": "ho-thue-toi-tan-tinh-sat-thu",
        "title": "Họ Thuê Tôi Tán\r\n                                                                    Tỉnh Sát Thủ",
        "originalTitle": " The Heart Killers",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/3fb4aa9ea34a0301c519053810e66411.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ho-thue-toi-tan-tinh-sat-thu"
      },
      {
        "id": "dung-dua-voi-lua",
        "title": "Đừng Đùa Với Lửa",
        "originalTitle": " Bed Friend (UNCUT)",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/b59e3e4780300d0becfaf6e635dd1911.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dung-dua-voi-lua"
      },
      {
        "id": "chang-trai-xinh-dep",
        "title": "Chàng Trai Xinh\r\n                                                                    Đẹp Của Tôi",
        "originalTitle": "My Beautiful Man",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/f9356da5fedc0c0dfd4f94f9ecdf6e11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chang-trai-xinh-dep"
      },
      {
        "id": "luan-ham",
        "title": "Luân Hãm",
        "originalTitle": "Lost To You",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/589aa206659c03ecfc18b1de33af6311.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/luan-ham"
      },
      {
        "id": "trai-tim-ngung-nhip-phan-1",
        "title": "Trái Tim Ngừng Nhịp",
        "originalTitle": "Heartstopper",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/8b7189da5c940ac0e7212c249cdbc011.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/trai-tim-ngung-nhip-phan-1"
      }
    ]
  },
  {
    "title": "Cổ trang huyền ảo",
    "viewAllUrl": "/chu-de/co-trang-huyen-ao",
    "movies": [
      {
        "id": "ky-an-bao-thanh-thien",
        "title": "Kỳ Án Bao Thanh Thiên",
        "originalTitle": "包青天再起風雲",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/bffd2dc7399e737187a6037d48f07212",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ky-an-bao-thanh-thien"
      },
      {
        "id": "chieu-dieu",
        "title": "Chiêu Diêu",
        "originalTitle": "The Legends",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/20ea1c72593402fd38c41bd486aa6702",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chieu-dieu"
      },
      {
        "id": "thien-doa-dao-hoa-nhat-the-khai",
        "title": "Thiên Đóa\r\n                                                                    Đào Hoa Nhất Thế Khai",
        "originalTitle": "The Blossoming Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/1c160908ab555078183c5dc768ae609f",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/thien-doa-dao-hoa-nhat-the-khai"
      },
      {
        "id": "huyen-mon-dai-su",
        "title": "Huyền Môn Đại Sư",
        "originalTitle": "The Taoism Grandmaster",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/4a793c01e9eeea49c45b0285063a7565",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/huyen-mon-dai-su"
      },
      {
        "id": "ky-an-nha-thanh-ii",
        "title": "KỲ ÁN NHÀ THANH II",
        "originalTitle": "KỲ ÁN NHÀ THANH II",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c53750a35c88a4dacbe42d28d7fb1df7",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ky-an-nha-thanh-ii"
      },
      {
        "id": "hoa-thien-cot",
        "title": "Hoa Thiên Cốt",
        "originalTitle": "The Journey of Flower",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/ebc6c3fea42042224ed8abbbf16bfa82",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hoa-thien-cot"
      },
      {
        "id": "son-ha-lenh-thien-nhai-khach",
        "title": "Sơn Hà Lệnh /\r\n                                                                    Thiên Nhai Khách",
        "originalTitle": "Word of Honor",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c7a97d9ca76558f0a92a009321167de4",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/son-ha-lenh-thien-nhai-khach"
      },
      {
        "id": "manh-the-thuc-than-2018",
        "title": "Manh Thê Thực Thần",
        "originalTitle": "Cinderella Chef",
        "posterUrl": "https://img.ophim.live/uploads/movies/manh-the-thuc-than-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/manh-the-thuc-than-2018"
      },
      {
        "id": "trang-vuong-chi-vuong",
        "title": "Trạng Vương Chi Vương",
        "originalTitle": "Justice Sung Begins",
        "posterUrl": "https://img.ophim.live/uploads/movies/trang-vuong-chi-vuong-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/trang-vuong-chi-vuong"
      },
      {
        "id": "tru-tien-thanh-van-chi-2",
        "title": "Tru Tiên - Thanh\r\n                                                                    Vân Chí 2",
        "originalTitle": "Legend Of Chusen 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/bf3a7bc11e3167ea387997722f033567",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tru-tien-thanh-van-chi-2"
      },
      {
        "id": "ngu-giao-ky-phan-1-du-quan-so-tuong-thuc",
        "title": "Ngự Giao Ký (Phần 2): Kháp Tự Cố Nhân Quy",
        "originalTitle": "The Blue Whisper: Part 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/77131752bf44c6be4080de3740e0dea3",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ngu-giao-ky-phan-1-du-quan-so-tuong-thuc"
      },
      {
        "id": "ngu-giao-ky-khap-tu-co-nhan-quy",
        "title": "Ngự Giao Ký (Phần 2): Kháp Tự Cố Nhân Quy",
        "originalTitle": "The Blue Whisper: Part 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/8018e402ba4ad9c4064368a0eb3f41b7",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ngu-giao-ky-khap-tu-co-nhan-quy"
      }
    ]
  },
  {
    "title": "Phim Hàn Quốc",
    "viewAllUrl": "/chu-de/phim-han-quoc",
    "movies": [
      {
        "id": "mua-he-yeu-dau-cua-chung-ta-nhung-ngay-he-ruc-nang-cua-chung-minh",
        "title": "Mùa hè yêu dấu\r\n                                                                    của chúng ta",
        "originalTitle": "Our Beloved Summer",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/dd455c6af2810b6bebe421e3946f7d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mua-he-yeu-dau-cua-chung-ta-nhung-ngay-he-ruc-nang-cua-chung-minh"
      },
      {
        "id": "mua-he-yeu-dau-cua-chung-ta",
        "title": "Mùa hè yêu dấu\r\n                                                                    của chúng ta",
        "originalTitle": "Our Beloved Summer",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/dd455c6af2810b6bebe421e3946f7d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mua-he-yeu-dau-cua-chung-ta"
      },
      {
        "id": "thien-duong-chet-choc",
        "title": "Thiên Đường Chết Chóc",
        "originalTitle": "Paradise Murdered",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/03c8a9bd0f0e908ed685aaf590981468",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/thien-duong-chet-choc"
      },
      {
        "id": "oasis",
        "title": "Oasis",
        "originalTitle": "Oasis",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/22bd74b31ac949400ab265d1b8d94bde",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/oasis"
      },
      {
        "id": "nguoi-thay-y-duc",
        "title": "Người Thầy Y Đức",
        "originalTitle": "Dr. Romantic",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/359278c5328c99ccbe829025f9a3ee1e",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguoi-thay-y-duc"
      },
      {
        "id": "nhiet-do-tinh-yeu",
        "title": "Nhiệt Độ Tình Yêu",
        "originalTitle": "Temperature Of Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/8821b9a29a8763688e170ded0a665d6a",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhiet-do-tinh-yeu"
      },
      {
        "id": "huong-vi-cua-bien",
        "title": "Hương Vị Của Biển",
        "originalTitle": "Fresh off the Sea",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/be697e10f6dfd1691ada1d46175d7d04",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/huong-vi-cua-bien"
      },
      {
        "id": "missing-you",
        "title": "Missing You",
        "originalTitle": "Missing You",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/acb046213e06395863a109a54def2771",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/missing-you"
      },
      {
        "id": "ca-phe-my-nam",
        "title": "Tiệm Cà Phê Mỹ Nam",
        "originalTitle": "Café Minamdang",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/86e2562253c843ae8b6feb10f63b5781",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ca-phe-my-nam"
      },
      {
        "id": "tiem-ca-phe-my-nam",
        "title": "Tiệm Cà Phê Mỹ Nam",
        "originalTitle": "Café Minamdang",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/61a679eb3c18fe5dadafec704920f23f",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tiem-ca-phe-my-nam"
      },
      {
        "id": "chiec-nhan-cua-nu-hoang",
        "title": "Chiếc Nhẫn Của Nữ\r\n                                                                    Hoàng",
        "originalTitle": "Queen Of Ring",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/9ec5a52aae74e9cba4ce23525f9be486",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chiec-nhan-cua-nu-hoang"
      },
      {
        "id": "duoi-bong-dien-ha",
        "title": "Dưới Bóng Điện Hạ",
        "originalTitle": "The King",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/1b849cde1c690dfed053db8169c72811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/duoi-bong-dien-ha"
      }
    ]
  },
  {
    "title": "Thanh xuân",
    "viewAllUrl": "/chu-de/thanh-xuan",
    "movies": [
      {
        "id": "mua-he-yeu-dau-cua-chung-ta",
        "title": "Mùa hè yêu dấu\r\n                                                                    của chúng ta",
        "originalTitle": "Our Beloved Summer",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/dd455c6af2810b6bebe421e3946f7d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mua-he-yeu-dau-cua-chung-ta"
      },
      {
        "id": "mua-xuan-tuoi-tre",
        "title": "Mùa Xuân Tuổi Trẻ",
        "originalTitle": "Spring of Youth",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e585e4a5e028c9eedea061281d187196",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mua-xuan-tuoi-tre"
      },
      {
        "id": "vung-trom-khong-the-giau",
        "title": "Vụng Trộm Không Thể\r\n                                                                    Giấu",
        "originalTitle": "Hidden Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/4dc9f065219cb9eb440b368d719d5c49",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vung-trom-khong-the-giau"
      },
      {
        "id": "khi-anh-chay-ve-phia-em",
        "title": "Khi Anh Chạy Về Phía\r\n                                                                    Em",
        "originalTitle": "When I Fly Towards You",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/e2e585fbb89a0022f1f6489c0c7be511.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/khi-anh-chay-ve-phia-em"
      },
      {
        "id": "anh-dao-ho-phach",
        "title": "Anh Đào Hổ Phách",
        "originalTitle": "Our Generation",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/76ad09ef3ae4027ff1ac1a3b4a9f9811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/anh-dao-ho-phach"
      },
      {
        "id": "chiec-bat-lua-va-vay-cong-chua",
        "title": "Chiếc Bật Lửa\r\n                                                                    Và Váy Công Chúa",
        "originalTitle": "The Lighter and the Princess",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/3677c46a1b5b0e5cf914d7c024940d11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chiec-bat-lua-va-vay-cong-chua"
      },
      {
        "id": "bi-mat-noi-goc-toi",
        "title": "Bí Mật Nơi Góc Tối",
        "originalTitle": "Our Secrets",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/339cec5f9ed904eac58941f54f91bb11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bi-mat-noi-goc-toi"
      },
      {
        "id": "chuyen-tinh-nang-phap-su",
        "title": "Ngưu Lang Chức Nữ",
        "originalTitle": "Head Over Heels",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/1d8bbaa116977f50bf8b4ccef198bce2",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/chuyen-tinh-nang-phap-su"
      },
      {
        "id": "hoan-vu",
        "title": "Hoán Vũ",
        "originalTitle": "Reborn",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/d4469d8cecc1476a1d63723a4904fea3",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hoan-vu"
      },
      {
        "id": "vi-nhung-gi-ta-da-yeu",
        "title": "Vì Những Gì Ta Đã Yêu",
        "originalTitle": "All That We Loved",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/5be8c93261609790fd9d1d1b94a772a7",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vi-nhung-gi-ta-da-yeu"
      },
      {
        "id": "ngay-xua-ngay-xua-phan-7",
        "title": "Xin Chào Ngày Xưa Ấy",
        "originalTitle": "My Huckleberry Friends",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/661979cd859d938d4501eba80f20655f",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ngay-xua-ngay-xua-phan-7"
      },
      {
        "id": "ve-dep-dich-thuc",
        "title": "Vẻ Đẹp Đích Thực",
        "originalTitle": "True Beauty",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/66fd8b46b982e7c37b328e3c3e8d6e65",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ve-dep-dich-thuc"
      }
    ]
  },
  {
    "title": "Phim \"chữa lành tâm hồn\"",
    "viewAllUrl": "/chu-de/phim-chua-lanh-tam-hon",
    "movies": [
      {
        "id": "ngay-tuyet-voi-de-tro-thanh-cun",
        "title": "Ngày Tuyệt\r\n                                                                    Vời Để Trở Thành Cún",
        "originalTitle": "A Good Day to be a Dog",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/a5e6ea303ec0188f68f41ad712901554",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ngay-tuyet-voi-de-tro-thanh-cun"
      },
      {
        "id": "lay-danh-nghia-nguoi-nha",
        "title": "Lấy Danh Nghĩa\r\n                                                                    Người Nhà",
        "originalTitle": "Go Ahead",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/014f4ba4e4adcea4be963e8358bb9d25",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/lay-danh-nghia-nguoi-nha"
      },
      {
        "id": "nguoi-thay-y-duc-3",
        "title": "Người Thầy Y Đức",
        "originalTitle": "Dr. Romantic",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/198cb0aa48543cf320add1d342067638",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguoi-thay-y-duc-3"
      },
      {
        "id": "man-thanh",
        "title": "Mạn Thành",
        "originalTitle": "City of Romance",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/8991aa58df710382e7326a5c7b13fe11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/man-thanh"
      },
      {
        "id": "dien-canh-ky",
        "title": "Điền Canh Kỷ",
        "originalTitle": "Romance On The Farm",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/adfe36ff3a1f0ee9ce6ad664c20be011.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dien-canh-ky"
      },
      {
        "id": "loi-hoi-dap-1988",
        "title": "Lời Hồi Đáp 1988",
        "originalTitle": "Reply 1988-LEE HYE RI",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/b88109cf08df0b2ecf43322cd961e311.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/loi-hoi-dap-1988"
      },
      {
        "id": "quy-lo-duong-ve-nha",
        "title": "Quy Lộ (Đường Về Nhà)",
        "originalTitle": "Road Home",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/0740f0c8714eca467a1bbbf07840fea5",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/quy-lo-duong-ve-nha"
      },
      {
        "id": "my-vi-yeu-duong",
        "title": "Mỹ Vị Yêu Đương",
        "originalTitle": "Tastefully Yours",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/10a84f84e1f8dbfd028fa0c8c7eea1b8",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/my-vi-yeu-duong"
      },
      {
        "id": "oc-dao-thanh-xuan",
        "title": "Ốc Đảo Thanh Xuân",
        "originalTitle": "Oasis",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c5ab849bc2a75659a3f6273b35f52736",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/oc-dao-thanh-xuan"
      },
      {
        "id": "khi-cuoc-doi-cho-ban-qua-quyt",
        "title": "Khi Cuộc Đời\r\n                                                                    Cho Bạn Quả Quýt",
        "originalTitle": "When Life Gives You Tangerines",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c9cbacdde93c9be082bf76ea1374e629",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/khi-cuoc-doi-cho-ban-qua-quyt"
      },
      {
        "id": "yeu-em",
        "title": "Yêu Em",
        "originalTitle": "The Best Thing",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/47e2dee34d2d0603f943c06850024711.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/yeu-em"
      },
      {
        "id": "khuc-bien-tau-anh-trang",
        "title": "Khúc Biến Tấu Ánh\r\n                                                                    Trăng",
        "originalTitle": "Moonlight",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/3bb923495507f06209a49a81c58548a5",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/khuc-bien-tau-anh-trang"
      }
    ]
  },
  {
    "title": "Phim chuyển thể từ tác phẩm văn học",
    "viewAllUrl": "/chu-de/phim-chuyen-the-tu-tac-pham-van-hoc",
    "movies": [
      {
        "id": "tran-tinh-lenh",
        "title": "Trần Tình Lệnh",
        "originalTitle": "The Untamed",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/837037fb5474f3094a963d9d3e029a3d",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tran-tinh-lenh"
      },
      {
        "id": "nguoi-lam-an-lon",
        "title": "Người Làm Ăn Lớn",
        "originalTitle": "Legend of the Magnate",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/bff95a4962e0b72751566ebcc1551e2b",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguoi-lam-an-lon"
      },
      {
        "id": "tho-san-tam-trach",
        "title": "Thợ Săn Tâm Trạch",
        "originalTitle": "Psych-Hunter",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/46e1489e8a0f9fccdaee879a069b0e54",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tho-san-tam-trach"
      },
      {
        "id": "vung-trom-khong-the-giau",
        "title": "Vụng Trộm Không Thể\r\n                                                                    Giấu",
        "originalTitle": "Hidden Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/4dc9f065219cb9eb440b368d719d5c49",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vung-trom-khong-the-giau"
      },
      {
        "id": "thuong-cong-chua",
        "title": "Thượng Công Chúa",
        "originalTitle": "Tigers Sniff the Rose",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/83b8f0c1cff6b7584b83d1907731aa20",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/thuong-cong-chua"
      },
      {
        "id": "ben-nhau-tron-doi",
        "title": "Bên Nhau Trọn Đời",
        "originalTitle": "My Sunshine",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/0c5f7f0e2daf24148afb970790c9c1ab",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ben-nhau-tron-doi"
      },
      {
        "id": "hoa-ra-em-rat-yeu-anh",
        "title": "Hóa Ra Em Rất Yêu Anh",
        "originalTitle": "Crush",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/4dfd8ddb3b37b37cc2d5aa382eeea673",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hoa-ra-em-rat-yeu-anh"
      },
      {
        "id": "tuoc-cot",
        "title": "Tước Cốt",
        "originalTitle": "Key to the Phoenix Heart",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/873d41568de40383e7d17925c1a15811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tuoc-cot"
      },
      {
        "id": "giay-phut-ay-vuot-gioi-han",
        "title": "Giây Phút Ấy Vượt\r\n                                                                    Giới Hạn",
        "originalTitle": "OVERDO",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/0e0d0ee2dfde01ccc224c9b2cde2bd11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/giay-phut-ay-vuot-gioi-han"
      },
      {
        "id": "duong-cung-ky-an-thanh-vu-phong-minh",
        "title": "Đường\r\n                                                                    Cung Kỳ Án: Thanh Vụ Phong Minh",
        "originalTitle": "Unveil: Jadewind",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/a3f06fb46d6e0c19cbe51c64eadf8a11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/duong-cung-ky-an-thanh-vu-phong-minh"
      },
      {
        "id": "van-tu-hanh",
        "title": "Vân Tú Hành",
        "originalTitle": "The Legend Of Rosy Clouds",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/1e3831bf340c0d86d00c6bd0486d5611.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/van-tu-hanh"
      },
      {
        "id": "du-tan-truong-an",
        "title": "Dữ Tấn Trường An",
        "originalTitle": "Shadow Love",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/7c924a75dbae0f5de21bbc34949bdc11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/du-tan-truong-an"
      }
    ]
  },
  {
    "title": "Phim 4K",
    "viewAllUrl": "/chu-de/phim-4k",
    "movies": [
      {
        "id": "robot-dai-chien-2-bai-binh-phuc-han",
        "title": "Robot\r\n                                                                    Đại Chiến 2: Bại Binh Phục Hận",
        "originalTitle": "Transformers: Revenge of the Fallen",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f4e1be6e817da4f59af4cd18270e76fe",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/robot-dai-chien-2-bai-binh-phuc-han"
      },
      {
        "id": "con-loc-quyen-luc",
        "title": "Giông Tố",
        "originalTitle": "Tempest",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/0ad9ad84fc130ca7ee183d02410d9411.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/con-loc-quyen-luc"
      },
      {
        "id": "84-met-vuong",
        "title": "84 Mét Vuông",
        "originalTitle": "Wall to Wall",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/0d7c5c197b3e8011a677589adc3304bc",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/84-met-vuong"
      },
      {
        "id": "mantis",
        "title": "Bọ Ngựa",
        "originalTitle": "Mantis",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e4a331acea95ef78da5b0884e0757090",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mantis"
      },
      {
        "id": "luoi-dao-hiem-hoc",
        "title": "Lưỡi Dao Hiểm Hóc",
        "originalTitle": "Hyper Knife",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/d51207bb12b5fe75b1c8b68b46fc1b93",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/luoi-dao-hiem-hoc"
      },
      {
        "id": "tin-tot-lanh",
        "title": "Tin Tốt Lành",
        "originalTitle": "Good News",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/af6ccd722b2493d37422380ab7265bf3",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tin-tot-lanh"
      },
      {
        "id": "nguu-lang-chuc-nu-2025",
        "title": "Ngưu Lang Chức Nữ",
        "originalTitle": "Head Over Heels",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/272abac0398747e18d9b72375fd6f5d1",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguu-lang-chuc-nu-2025"
      },
      {
        "id": "tham-tu-lung-danh-conan-28-du-anh-cua-doc-nhan",
        "title": "Thám Tử Lừng Danh Conan: Dư Ảnh Của Độc Nhãn",
        "originalTitle": "Meitantei Conan Movie 28: Sekigan no Flashback, Detective Conan Movie 28: One-Eyed Flashback",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/55891ea28c8ce84947d360430fd8ca6c",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tham-tu-lung-danh-conan-28-du-anh-cua-doc-nhan"
      },
      {
        "id": "bi-cuc-thai-lai",
        "title": "Bĩ Cực Thái Lai",
        "originalTitle": "Bugonia",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/8f3723f3081c0a4ce00b775805600196",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bi-cuc-thai-lai"
      },
      {
        "id": "nguoi-nhen-khong-con-nha",
        "title": "Người Nhện: Không\r\n                                                                    Còn Nhà",
        "originalTitle": "Spider-Man: No Way Home",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/8b2f8e332dbe440e30c8ed5697e08aa8",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguoi-nhen-khong-con-nha"
      },
      {
        "id": "xi-trum-2025",
        "title": "Xì Trum (2025)",
        "originalTitle": "Smurfs",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e04d3f1c88488810cc1140f1989f17cc",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/xi-trum-2025"
      },
      {
        "id": "hat-cung-tho-san-quy-kpop",
        "title": "Hát Cùng Thợ Săn\r\n                                                                    Quỷ Kpop",
        "originalTitle": "Untitled KPop Demon Hunters Follow-Up",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/7ad6494c74314f624f8f0aa389fa4cb5",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hat-cung-tho-san-quy-kpop"
      }
    ]
  },
  {
    "title": "Phim Công Sở",
    "viewAllUrl": "/chu-de/phim-cong-so",
    "movies": [
      {
        "id": "tinh-yeu-anh-danh-cho-em",
        "title": "Tình Yêu Anh Dành\r\n                                                                    Cho Em",
        "originalTitle": "The Love You Give Me",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c2a36e6f7d89035dc129357f83602a29",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tinh-yeu-anh-danh-cho-em"
      },
      {
        "id": "tinh-co-yeu-em",
        "title": "Tình Cờ Yêu Em",
        "originalTitle": "I Fell in Love By Accident",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e7a50314bb470e2ef1091e2ceea7ce96",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tinh-co-yeu-em"
      },
      {
        "id": "loi-noi-doi-khong-the-cuong-lai",
        "title": "Lời Nói Dối\r\n                                                                    Không Thể Cưỡng Lại",
        "originalTitle": "Liars in Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/a1140b7b7eabe1db81889347298f816c",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/loi-noi-doi-khong-the-cuong-lai"
      },
      {
        "id": "mui-doi-cuoc-song-khong-tron-ven",
        "title": "Mùi Đời:\r\n                                                                    Cuộc Sống Không Trọn Vẹn",
        "originalTitle": "Misaeng: Incomplete Life",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/c6ca117fc523f8e360a5ea2aa1caa2c3",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/mui-doi-cuoc-song-khong-tron-ven"
      },
      {
        "id": "hen-ho-chon-cong-so",
        "title": "Hẹn Hò Chốn Công Sở",
        "originalTitle": "Business Proposal",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/4191a4d974970c75d625ae796adbd511.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hen-ho-chon-cong-so"
      },
      {
        "id": "nu-hoang-nuoc-mat",
        "title": "Nữ Hoàng Nước Mắt",
        "originalTitle": "Queen of Tears",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/3cd246305e3a09b5cef0cf04f663ef11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nu-hoang-nuoc-mat"
      },
      {
        "id": "ha-tien-sinh-luu-luyen-khong-quen-noi-vuong-van-cua-ha-tien-sinh",
        "title": "Nỗi Vương Vấn\r\n                                                                    Của Hạ Tiên Sinh",
        "originalTitle": "Unforgettable Love",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/0b295d70b3a508eec28ab612513ff711.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ha-tien-sinh-luu-luyen-khong-quen-noi-vuong-van-cua-ha-tien-sinh"
      },
      {
        "id": "yet-hi",
        "title": "Yết Hí",
        "originalTitle": "Love Between Lines",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/3413247d120a0de3d862947cb7090711.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/yet-hi"
      },
      {
        "id": "cau-ut-nha-tai-phiet",
        "title": "Cậu Út Nhà Tài Phiệt",
        "originalTitle": "Reborn Rich",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f843c77d20eca6f2dfd45ba84c0e0770",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/cau-ut-nha-tai-phiet"
      },
      {
        "id": "tham-phan-ac-ma",
        "title": "Thẩm Phán Ác Ma",
        "originalTitle": "The Devil Judge",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/fdeb35b915e025a39ddeead32499453d",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tham-phan-ac-ma"
      },
      {
        "id": "vincenzo",
        "title": "Vincenzo",
        "originalTitle": "Vincenzo",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/7ad97d0d64410a7bd7aa9e4e2ac28a11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vincenzo"
      },
      {
        "id": "thu-ky-kim-sao-the",
        "title": "Thư Ký Kim Sao Thế?",
        "originalTitle": "What",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/993125d335c7d5637a303fc28a814dbd",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/thu-ky-kim-sao-the"
      }
    ]
  },
  {
    "title": "Hình sự tội phạm Hàn Quốc",
    "viewAllUrl": "/chu-de/hinh-su-toi-pham-han-quoc",
    "movies": [
      {
        "id": "nhung-tay-choi-sieu-dang-phan-1",
        "title": "Những Tay Chơi Siêu\r\n                                                                    Đẳng",
        "originalTitle": "The Player",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/64027a108e3b89076b1d394c0266073e",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhung-tay-choi-sieu-dang-phan-1"
      },
      {
        "id": "nhung-tay-choi-sieu-dang",
        "title": "Những Tay Chơi Siêu\r\n                                                                    Đẳng",
        "originalTitle": "The Player",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/6f5ae8e05c58a47d64469070f8a0e675",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhung-tay-choi-sieu-dang"
      },
      {
        "id": "ke-sat-nhan-dua-tre-co-the-chet",
        "title": "Kẻ Sát\r\n                                                                    Nhân: Đứa Trẻ Có Thể Chết",
        "originalTitle": "The Killer: A Girl Who Deserves to Die",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/832b98440a649e708e0680bd20ffb122",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ke-sat-nhan-dua-tre-co-the-chet"
      },
      {
        "id": "vay-ham-tren-khong",
        "title": "Vây Hãm Trên Không",
        "originalTitle": "Hijack 1971",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/432c14fc1f2bc10110a0a941daa1eb98",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vay-ham-tren-khong"
      },
      {
        "id": "nhung-ke-buon-lau",
        "title": "Những Kẻ Buôn Lậu",
        "originalTitle": "Smugglers",
        "posterUrl": "https://img.ophim.live/uploads/movies/nhung-ke-buon-lau-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhung-ke-buon-lau"
      },
      {
        "id": "rung-khong-tieng",
        "title": "Rừng không tiếng",
        "originalTitle": "The Frog",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/2780e78ca5692bf38c65841057c294a6",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/rung-khong-tieng"
      },
      {
        "id": "toi-ac-kinh-hoang-2023",
        "title": "Tội Ác Kinh Hoàng",
        "originalTitle": "The Worst of Evil",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/47884dde576e6cffb70051b0ea71fe9c",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/toi-ac-kinh-hoang-2023"
      },
      {
        "id": "nguoi-dan-ong-dau-tien",
        "title": "Người Đàn Ông Đầu\r\n                                                                    Tiên",
        "originalTitle": "First Man",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f410968b2a460c0c11c7c1575732e321",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nguoi-dan-ong-dau-tien"
      },
      {
        "id": "tho-san-dao-mo",
        "title": "Thợ Săn Dao Mổ",
        "originalTitle": "Hunter with a Scalpel",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/cc0723e6b3e930bde65859853ee58255",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tho-san-dao-mo"
      },
      {
        "id": "du-an-y",
        "title": "Project Y: Gái\r\n                                                                    Ngoan Đổi Đời",
        "originalTitle": "Project Y",
        "posterUrl": "https://phim.nguonc.com/public/images/Film/7W6pzpPVQKIy86XWfOEVfDxVAS2.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/du-an-y"
      },
      {
        "id": "an-sat",
        "title": "Ẩn Sát",
        "originalTitle": "Hindsight",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/ad7209440d4698b95084485161030b6e",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/an-sat"
      },
      {
        "id": "quy-co-an-danh-2025",
        "title": "Quý Cô Ẩn Danh",
        "originalTitle": "Ms. Incognito",
        "posterUrl": "https://phimimg.com/upload/vod/20250930-1/46ef1e773843dd43ca0d79bdc2bfb387.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/quy-co-an-danh-2025"
      }
    ]
  },
  {
    "title": "Phim Cổ Trang Huyền Huyễn Không Thể Bỏ Lỡ",
    "viewAllUrl": "/chu-de/phim-co-trang-huyen-huyen-khong-the-bo-lo",
    "movies": [
      {
        "id": "vinh-da-tinh-ha",
        "title": "Vĩnh Dạ Tinh Hà",
        "originalTitle": "Love Game in Eastern Fantasy",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/a8082ac2e22d0dc1ce5f0ad40ccdc511.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vinh-da-tinh-ha"
      },
      {
        "id": "ha-bach-te",
        "title": "Hà Bách Tế",
        "originalTitle": "Please Remember Me",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/da511e0c2ffb4ada72b63a6f7cfd088c",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/ha-bach-te"
      },
      {
        "id": "hoai-thuy-truc-dinh",
        "title": "Hoài Thủy Trúc Đình",
        "originalTitle": "Love in Pavilion",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/cd4ed3a3ddd18e53860d4fa4c9a1e465",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hoai-thuy-truc-dinh"
      },
      {
        "id": "thuong-lan-quyet",
        "title": "Thương Lan Quyết",
        "originalTitle": "Love Between Fairy and Devil",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/8d1c900e78d45bf7e46abbfcbe2f285a",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/thuong-lan-quyet"
      },
      {
        "id": "dai-mong-quy-ly",
        "title": "Đại Mộng Quy Ly",
        "originalTitle": "Fangs of Fortune",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/3824d0eb72654634e4bf11612383b898",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dai-mong-quy-ly"
      },
      {
        "id": "liet-hoa-nhu-ca",
        "title": "Liệt Hỏa Như Ca",
        "originalTitle": "Liehuo Ruge",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/f5c9c63cf48c9664beb2ce44685c354a",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/liet-hoa-nhu-ca"
      },
      {
        "id": "thien-doa-dao-hoa-nhat-the-khai",
        "title": "Thiên Đóa\r\n                                                                    Đào Hoa Nhất Thế Khai",
        "originalTitle": "The Blossoming Love",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/1c160908ab555078183c5dc768ae609f",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/thien-doa-dao-hoa-nhat-the-khai"
      },
      {
        "id": "pham-nhan-tu-tien-truyen",
        "title": "Phàm Nhân Tu Tiên\r\n                                                                    Truyện",
        "originalTitle": "The Immortal Ascension",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/1bb348ee48ce0a30d290079a5cca7b11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/pham-nhan-tu-tien-truyen"
      },
      {
        "id": "tu-hai-trong-minh",
        "title": "Tứ Hải Trọng Minh",
        "originalTitle": "Love",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/a0e8ae60b2810d8fdb3a9f7111253f11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tu-hai-trong-minh"
      },
      {
        "id": "bach-nguyet-phan-tinh",
        "title": "Bạch Nguyệt Phạn Tinh",
        "originalTitle": "Moonlight Mystique",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/0baaf86153320aaed168a9bbdb8c8811.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/bach-nguyet-phan-tinh"
      },
      {
        "id": "tien-dai-co-cay",
        "title": "Tiên Đài Có Cây",
        "originalTitle": "Love of the Divine Tree",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/828e56cf795e00e2e6b3089cfc4cb111.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/tien-dai-co-cay"
      },
      {
        "id": "van-chi-vu",
        "title": "Vân Chi Vũ",
        "originalTitle": "My Journey to You",
        "posterUrl": "https://pics.onflixcdn.com/image/wh_80/thumbnail/38d14f482b310a47fe6a2a5230b3ff11.webp",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/van-chi-vu"
      }
    ]
  },
  {
    "title": "Điện ảnh Âu Mỹ",
    "viewAllUrl": "/chu-de/dien-anh-au-my",
    "movies": [
      {
        "id": "dieu-bi-an",
        "title": "Điều Bí Ẩn",
        "originalTitle": "Mysteria",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/a3ee67ab07a557b8b3e1ec86bf5d7edd",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/dieu-bi-an"
      },
      {
        "id": "suy-doan-vo-toi",
        "title": "Suy Đoán Vô Tội",
        "originalTitle": "Presumed Innocent",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/bc624c3caa4693362396aff5f10bb1b8",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/suy-doan-vo-toi"
      },
      {
        "id": "nhung-chu-bo-yeu-nhac-phan-3",
        "title": "Những chú bọ\r\n                                                                    yêu nhạc (Phần 3)",
        "originalTitle": "Beat Bugs (Season 3)",
        "posterUrl": "https://phim.nguonc.com/public/images/Film/nhung-chu-bo-yeu-nhac-phan-3-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhung-chu-bo-yeu-nhac-phan-3"
      },
      {
        "id": "khung-troi-ao-mong",
        "title": "Khung trời ảo mộng",
        "originalTitle": "Vanilla Sky",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/d0a40fda543ca96b537f8703feddeb40",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/khung-troi-ao-mong"
      },
      {
        "id": "be-khoa-sinh-hoc-phan-2",
        "title": "Bẻ Khóa Sinh Học\r\n                                                                    (Phần 2)",
        "originalTitle": "Biohackers (Season 2)",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/9b83899e3c526dab0feabe4f69493215",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/be-khoa-sinh-hoc-phan-2"
      },
      {
        "id": "hunters-phan-2",
        "title": "Hunters (Phần 2)",
        "originalTitle": "Hunters (Season 2)",
        "posterUrl": "https://img.ophim.live/uploads/movies/hunters-phan-2-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/hunters-phan-2"
      },
      {
        "id": "fubarr",
        "title": "FUBAR 2",
        "originalTitle": "FUBAR 2",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/be544cf177de1389bec98302d842ea5a",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/fubarr"
      },
      {
        "id": "vuot-nguc-1",
        "title": "Vượt Ngục",
        "originalTitle": "Painkiller",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/665087f59052f36f8c8f3632e572841d",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/vuot-nguc-1"
      },
      {
        "id": "reacher-phan-3",
        "title": "Reacher (Phần 3)",
        "originalTitle": "Reacher (Season 3)",
        "posterUrl": "https://img.ophim.live/uploads/movies/reacher-phan-3-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/reacher-phan-3"
      },
      {
        "id": "reacher-phan-1",
        "title": "Reacher (Phần 1)",
        "originalTitle": "Reacher (Season 1)",
        "posterUrl": "https://img.ophim.live/uploads/movies/reacher-phan-1-thumb.jpg",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/reacher-phan-1"
      },
      {
        "id": "flash-gordon",
        "title": "Flash Gordon",
        "originalTitle": "Flash Gordon",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/9f31ed1eb4b2e43497489149f2f48157",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/flash-gordon"
      },
      {
        "id": "nhung-chu-bo-yeu-nhac-phan-2",
        "title": "Những chú bọ\r\n                                                                    yêu nhạc (Phần 2)",
        "originalTitle": "Beat Bugs (Season 2)",
        "posterUrl": "https://p3-sg.tiktokcdn.com/obj/tiktok-obj/e22c6d85bab539e1f66fed43f8fab71a",
        "quality": "HD",
        "episodes": "",
        "linkUrl": "/phim/nhung-chu-bo-yeu-nhac-phan-2"
      }
    ]
  }
];

export const RIOFLIX_HOME_SECTIONS = ONFLIX_HOME_SECTIONS;

export interface TopicMeta {
  title: string;
  slug: string;
  url: string;
  movieCount: number;
  movies: MovieItem[];
  samplePosters: string[];
  description: string;
  tag: string;
}

export function getAllTopics(): TopicMeta[] {
  return ONFLIX_HOME_SECTIONS.map((sec) => {
    const rawSlug = sec.viewAllUrl.replace("/chu-de/", "");
    const cleanTitle = sec.title.replace(/\r?\n\s*/g, " ").trim();
    const samplePosters = sec.movies
      .slice(0, 3)
      .map((m) => m.posterUrl)
      .filter(Boolean);

    let tag = "Tuyển tập";
    if (cleanTitle.toLowerCase().includes("hoạt hình")) tag = "Anime & Hoạt hình";
    else if (cleanTitle.toLowerCase().includes("hàn quốc")) tag = "Phim Hàn";
    else if (cleanTitle.toLowerCase().includes("trung quốc") || cleanTitle.toLowerCase().includes("cổ trang")) tag = "Cổ trang & Trung Quốc";
    else if (cleanTitle.toLowerCase().includes("4k") || cleanTitle.toLowerCase().includes("chất lượng cao")) tag = "Chất lượng cao";
    else if (cleanTitle.toLowerCase().includes("tình yêu") || cleanTitle.toLowerCase().includes("thanh xuân")) tag = "Lãng mạn";
    else if (cleanTitle.toLowerCase().includes("kỹ xảo") || cleanTitle.toLowerCase().includes("phiêu lưu")) tag = "Hành động & Viễn tưởng";

    return {
      title: cleanTitle,
      slug: rawSlug,
      url: `/chu-de/${rawSlug}`,
      movieCount: sec.movies.length,
      movies: sec.movies,
      samplePosters,
      description: `Tuyển tập phim ${cleanTitle} chọn lọc hay nhất với chất lượng cao vietsub thuyết minh.`,
      tag
    };
  });
}

export function getTopicBySlug(slug: string): TopicMeta | null {
  const topics = getAllTopics();
  const found = topics.find((t) => t.slug === slug || t.slug === decodeURIComponent(slug));
  if (found) return found;

  const cleanedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  return topics.find((t) => t.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanedSlug) || null;
}

