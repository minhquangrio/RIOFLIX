import { cleanSlug } from "./utils";

export interface ActorInfo {
  id: number;
  slug: string;
  name: string;
  original_name?: string;
  character?: string;
  avatar_url: string;
  image_url: string;
  biography?: string;
  birthday?: string;
  place_of_birth?: string;
  popularity?: number;
}

export const FAMOUS_ACTORS: ActorInfo[] = [
  {
    id: 1,
    slug: "dich-le-nhiet-ba",
    name: "Địch Lệ Nhiệt Ba",
    original_name: "Dilraba Dilmurat (迪丽热巴)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg",
    image_url: "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg",
    biography: "Địch Lệ Nhiệt Ba sinh ngày 3 tháng 6 năm 1992 tại Ô Lỗ Mộc Tề, Tân Cương, là một nữ diễn viên, người mẫu nổi tiếng người Trung Quốc gốc Duy Ngô Nhĩ. Cô nổi tiếng với các tác phẩm Tam Sinh Tam Thế Thập Lý Đào Hoa, Em Là Niềm Kiêu Hãnh Của Anh, An Lạc Truyện...",
    birthday: "03/06/1992",
    place_of_birth: "Tân Cương, Trung Quốc",
    popularity: 98.5
  },
  {
    id: 2,
    slug: "sato-takeru",
    name: "Sato Takeru",
    original_name: "佐藤健 (Takeru Satoh)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    image_url: "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    biography: "Sato Takeru sinh ngày 21 tháng 3 năm 1989 tại Iwatsuki, Saitama, Nhật Bản. Anh là nam diễn viên hàng đầu Nhật Bản nổi tiếng với vai Himura Kenshin trong loạt phim điện ảnh Rurouni Kenshin, Kamen Rider Den-O và Mãi Mãi Bên Em.",
    birthday: "21/03/1989",
    place_of_birth: "Saitama, Nhật Bản",
    popularity: 95.2
  },
  {
    id: 3,
    slug: "trieu-lo-tu",
    name: "Triệu Lộ Tư",
    original_name: "Zhao Lusi (赵露思)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    image_url: "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    biography: "Triệu Lộ Tư sinh ngày 9 tháng 11 năm 1998 tại Thành Đô, Tứ Xuyên. Cô được mệnh danh là 'Mỹ nữ xuyên không' qua loạt phim như Trần Thiên Thiên Trong Lời Đồn, Tinh Hán Xán Lạn, Vụng Trộm Không Thể Che Giấu...",
    birthday: "09/11/1998",
    place_of_birth: "Tứ Xuyên, Trung Quốc",
    popularity: 97.8
  },
  {
    id: 4,
    slug: "truong-nghe-hung",
    name: "Trương Nghệ Hưng",
    original_name: "Lay Zhang (张艺兴)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/wU8ZL6AIWlTHVPat2rfMDOImRMA.jpg",
    image_url: "https://image.tmdb.org/t/p/original/wU8ZL6AIWlTHVPat2rfMDOImRMA.jpg",
    biography: "Trương Nghệ Hưng (Lay Zhang) sinh ngày 7 tháng 10 năm 1991 tại Trường Sa, Hồ Nam. Anh là ca sĩ, vũ công, diễn viên nổi tiếng, từng là thành viên nhóm nhạc EXO. Anh ghi dấu ấn qua các phim Lao Cửu Môn, Được Ăn Cả Ngã Về Không...",
    birthday: "07/10/1991",
    place_of_birth: "Hồ Nam, Trung Quốc",
    popularity: 94.6
  },
  {
    id: 5,
    slug: "tieu-chien",
    name: "Tiêu Chiến",
    original_name: "Xiao Zhan (肖战)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    image_url: "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    biography: "Tiêu Chiến sinh ngày 5 tháng 10 năm 1991 tại Trùng Khánh. Anh là nam diễn viên, ca sĩ nổi tiếng toàn cầu sau vai diễn Ngụy Vô Tiện trong siêu phẩm Trần Tình Lệnh, cùng các phim Ngọc Cốt Dao, Nắng Gắt Bên Tôi...",
    birthday: "05/10/1991",
    place_of_birth: "Trùng Khánh, Trung Quốc",
    popularity: 99.4
  },
  {
    id: 6,
    slug: "vuong-nhat-bac",
    name: "Vương Nhất Bác",
    original_name: "Wang Yibo (王一博)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg",
    image_url: "https://image.tmdb.org/t/p/original/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg",
    biography: "Vương Nhất Bác sinh ngày 5 tháng 8 năm 1997 tại Lạc Dương, Hà Nam. Anh là nam ca sĩ, vũ công chuyên nghiệp, tay đua mô tô và diễn viên hàng đầu Trung Quốc nổi tiếng với Trần Tình Lệnh, Hữu Phỉ, Phong Khởi Lạc Dương, Vua Trời Phủ...",
    birthday: "05/08/1997",
    place_of_birth: "Hà Nam, Trung Quốc",
    popularity: 98.9
  },
  {
    id: 7,
    slug: "trieu-le-dinh",
    name: "Triệu Lệ Dĩnh",
    original_name: "Zhao Liying (赵丽颖)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg",
    image_url: "https://image.tmdb.org/t/p/original/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg",
    biography: "Triệu Lệ Dĩnh sinh ngày 16 tháng 10 năm 1987 tại Lang Phường, Hà Bắc. Cô là nữ hoàng rating của màn ảnh phim truyền hình Trung Quốc với hàng loạt tác phẩm đình đám như Hoa Thiên Cốt, Sở Kiều Truyện, Minh Lan Truyện, Dữ Phượng Hành...",
    birthday: "16/10/1987",
    place_of_birth: "Hà Bắc, Trung Quốc",
    popularity: 99.1
  },
  {
    id: 8,
    slug: "luu-diec-phi",
    name: "Lưu Diệc Phi",
    original_name: "Crystal Liu (刘亦菲)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/5Va4jk69gkdAcABtkTtcUz85RLA.jpg",
    image_url: "https://image.tmdb.org/t/p/original/5Va4jk69gkdAcABtkTtcUz85RLA.jpg",
    biography: "Lưu Diệc Phi sinh ngày 25 tháng 8 năm 1987 tại Vũ Hán, Hồ Bắc. Được mệnh danh là 'Thần tiên tỷ tỷ', cô nổi tiếng vai Vương Ngữ Yên (Thiên Long Bát Bộ), Tiểu Long Nữ (Thần Điêu Đại Hiệp), Mộng Hoa Lục, Đi Đến Nơi Có Gió...",
    birthday: "25/08/1987",
    place_of_birth: "Hồ Bắc, Trung Quốc",
    popularity: 97.5
  },
  {
    id: 9,
    slug: "song-joong-ki",
    name: "Song Joong Ki",
    original_name: "송중기 (Song Joong-ki)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg",
    image_url: "https://image.tmdb.org/t/p/original/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg",
    biography: "Song Joong Ki sinh ngày 19 tháng 9 năm 1985 tại Daejeon, Hàn Quốc. Anh là nam diễn viên hàng đầu Hàn Quốc với các phim bom tấn như Hậu Duệ Mặt Trời, Vincenzo, Cậu Út Nhà Tài Phiệt, Chuyện Tình Ở Sungkyunkwan...",
    birthday: "19/09/1985",
    place_of_birth: "Daejeon, Hàn Quốc",
    popularity: 96.7
  },
  {
    id: 10,
    slug: "kim-soo-hyun",
    name: "Kim Soo Hyun",
    original_name: "김수현 (Kim Soo-hyun)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/uZRNsDfYl5fnKtcLp7MQ3t90ZtS.jpg",
    image_url: "https://image.tmdb.org/t/p/original/uZRNsDfYl5fnKtcLp7MQ3t90ZtS.jpg",
    biography: "Kim Soo Hyun sinh ngày 16 tháng 2 năm 1988 tại Seoul. Anh là một trong những nam diễn viên cát-xê cao nhất Hàn Quốc, nổi tiếng qua Vì Sao Đưa Anh Tới, Mặt Trăng Ôm Mặt Trời, Điên Thì Có Sao, Nữ Hoàng Nước Mắt...",
    birthday: "16/02/1988",
    place_of_birth: "Seoul, Hàn Quốc",
    popularity: 98.2
  },
  {
    id: 11,
    slug: "duong-mich",
    name: "Dương Mịch",
    original_name: "Yang Mi (杨幂)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/imzFZnPk6WScr9z1zUWhcDUmYTL.jpg",
    image_url: "https://image.tmdb.org/t/p/original/imzFZnPk6WScr9z1zUWhcDUmYTL.jpg",
    biography: "Dương Mịch sinh ngày 12 tháng 9 năm 1986 tại Bắc Kinh. Cô là nữ diễn viên, nhà sản xuất phim đình đám của Trung Quốc nổi danh qua Cung Tỏa Tâm Ngọc, Tam Sinh Tam Thế Thập Lý Đào Hoa, Phù Dao Hoàng Hậu...",
    birthday: "12/09/1986",
    place_of_birth: "Bắc Kinh, Trung Quốc",
    popularity: 96.9
  },
  {
    id: 12,
    slug: "vuong-hac-de",
    name: "Vương Hạc Đệ",
    original_name: "Dylan Wang (王鹤棣)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg",
    image_url: "https://image.tmdb.org/t/p/original/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg",
    biography: "Vương Hạc Đệ sinh ngày 20 tháng 12 năm 1998 tại Lạc Sơn, Tứ Xuyên. Anh nổi tiếng qua vai Đạo Minh Tự trong Vườn Sao Băng 2018 và bùng nổ toàn Châu Á với vai Ma Tôn Đông Phương Thanh Thương trong Thương Lan Quyết...",
    birthday: "20/12/1998",
    place_of_birth: "Tứ Xuyên, Trung Quốc",
    popularity: 97.1
  },
  {
    id: 13,
    slug: "iu-lee-ji-eun",
    name: "IU (Lee Ji-eun)",
    original_name: "이지은 (Lee Ji-eun)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    image_url: "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    biography: "IU (Lee Ji-eun) sinh ngày 16 tháng 5 năm 1993 tại Seoul. Cô là 'Em gái quốc dân', ca sĩ kiêm diễn viên xuất sắc với các phim Hotel Del Luna, My Mister (Ông Chú Của Tôi), Moon Lovers...",
    birthday: "16/05/1993",
    place_of_birth: "Seoul, Hàn Quốc",
    popularity: 98.7
  },
  {
    id: 14,
    slug: "ngu-thu-han",
    name: "Ngu Thư Hân",
    original_name: "Esther Yu (虞书欣)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg",
    image_url: "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg",
    biography: "Ngu Thư Hân sinh ngày 18 tháng 12 năm 1995 tại Thượng Hải. Nữ diễn viên, ca sĩ nổi bật với vẻ đẹp ngọt ngào qua Thương Lan Quyết, Vân Chi Vũ, Vĩnh Dạ Tinh Hà...",
    birthday: "18/12/1995",
    place_of_birth: "Thượng Hải, Trung Quốc",
    popularity: 96.4
  },
  {
    id: 15,
    slug: "nhan-gia-luan",
    name: "Nhậm Gia Luân",
    original_name: "Ren Jialun (任嘉伦)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    image_url: "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    biography: "Nhậm Gia Luân sinh ngày 11 tháng 4 năm 1989 tại Thanh Đảo, Sơn Đông. Anh là nam diễn viên được khán giả yêu mến qua Cẩm Y Chi Hạ, Châu Sinh Như Cố, Một Đời Một Kiếp...",
    birthday: "11/04/1989",
    place_of_birth: "Sơn Đông, Trung Quốc",
    popularity: 95.8
  },
  {
    id: 16,
    slug: "park-seo-jun",
    name: "Park Seo Jun",
    original_name: "박서준 (Park Seo-jun)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    image_url: "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    biography: "Park Seo Jun sinh ngày 16 tháng 12 năm 1988 tại Seoul. Anh sở hữu hàng loạt phim truyền hình ăn khách như Thư Ký Kim Sao Thế?, Tầng Lớp Itaewon, Thanh Xuân Vật Vã...",
    birthday: "16/12/1988",
    place_of_birth: "Seoul, Hàn Quốc",
    popularity: 96.0
  },
  {
    id: 17,
    slug: "truong-tieu-phi",
    name: "Trương Tiểu Phỉ",
    original_name: "Zhang Xiaofei (张小斐)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg",
    image_url: "https://image.tmdb.org/t/p/original/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg",
    biography: "Trương Tiểu Phỉ sinh ngày 10 tháng 1 năm 1986 tại An Sơn, Liêu Ninh. Cô là nữ diễn viên thực lực nổi tiếng sau bộ phim điện ảnh kỷ lục doanh thu Xin Chào, Lý Hoán Anh.",
    birthday: "10/01/1986",
    place_of_birth: "Liêu Ninh, Trung Quốc",
    popularity: 91.2
  },
  {
    id: 18,
    slug: "luu-gia-linh",
    name: "Lưu Gia Linh",
    original_name: "Carina Lau (劉嘉玲)",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/5Va4jk69gkdAcABtkTtcUz85RLA.jpg",
    image_url: "https://image.tmdb.org/t/p/original/5Va4jk69gkdAcABtkTtcUz85RLA.jpg",
    biography: "Lưu Gia Linh sinh ngày 8 tháng 12 năm 1965 tại Tô Châu. Cô là nữ minh tinh điện ảnh Hồng Kông huyền thoại, từng đoạt nhiều giải thưởng Kim Tượng đỉnh cao.",
    birthday: "08/12/1965",
    place_of_birth: "Tô Châu, Trung Quốc",
    popularity: 92.4
  },
  {
    id: 19,
    slug: "truong-ke-thong",
    name: "Trương Kế Thông",
    original_name: "Louis Cheung (張繼聰)",
    character: "Diễn viên phụ",
    avatar_url: "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    image_url: "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    biography: "Trương Kế Thông sinh ngày 11 tháng 1 năm 1980 tại Hồng Kông. Anh là nam ca sĩ, diễn viên hài hước tài năng của màn ảnh TVB và điện ảnh Hồng Kông.",
    birthday: "11/01/1980",
    place_of_birth: "Hồng Kông",
    popularity: 88.5
  },
  {
    id: 20,
    slug: "ngai-me",
    name: "Ngãi Mễ",
    original_name: "Aimee (艾米)",
    character: "Diễn viên trẻ",
    avatar_url: "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    image_url: "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    biography: "Ngãi Mễ sinh ngày 13 tháng 7 năm 2008 tại Bắc Kinh. Cô là nữ diễn viên trẻ tài năng đầy triển vọng của màn ảnh Hoa ngữ.",
    birthday: "13/07/2008",
    place_of_birth: "Bắc Kinh, Trung Quốc",
    popularity: 90.1
  },
  {
    id: 21,
    slug: "xu-zixuan",
    name: "Xu Zixuan (Từ Tử Tuyền)",
    original_name: "徐子璇",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg",
    image_url: "https://image.tmdb.org/t/p/original/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg",
    biography: "Từ Tử Tuyền là nữ diễn viên triển vọng xuất hiện trong các dự án phim truyền hình mới.",
    birthday: "15/08/1996",
    place_of_birth: "Trung Quốc",
    popularity: 85.0
  },
  {
    id: 22,
    slug: "wang-junbi",
    name: "Wang Junbi (Vương Tuấn Bút)",
    original_name: "王俊笔",
    character: "Diễn viên chính",
    avatar_url: "https://image.tmdb.org/t/p/original/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg",
    image_url: "https://image.tmdb.org/t/p/original/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg",
    biography: "Vương Tuấn Bút là nam diễn viên năng động của màn ảnh nhỏ.",
    birthday: "20/02/1995",
    place_of_birth: "Trung Quốc",
    popularity: 84.2
  },
  {
    id: 23,
    slug: "lu-yunfeng",
    name: "Lu Yunfeng (Lữ Vân Phong)",
    original_name: "吕昀峰",
    character: "Diễn viên",
    avatar_url: "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    image_url: "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    biography: "Lữ Vân Phong sinh ngày 6 tháng 11 năm 1995 tại Sơn Đông, Trung Quốc.",
    birthday: "06/11/1995",
    place_of_birth: "Sơn Đông, Trung Quốc",
    popularity: 86.1
  },
  {
    id: 24,
    slug: "sisley-choi-si-pui",
    name: "Sisley Choi (Thái Tư Bối)",
    original_name: "蔡思貝",
    character: "Diễn viên TVB",
    avatar_url: "https://image.tmdb.org/t/p/original/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg",
    image_url: "https://image.tmdb.org/t/p/original/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg",
    biography: "Thái Tư Bối sinh ngày 6 tháng 2 năm 1991, là Á hậu 1 Hoa hậu Hồng Kông 2013 và Thị Hậu TVB.",
    birthday: "06/02/1991",
    place_of_birth: "Hồng Kông",
    popularity: 91.0
  }
];

export function getActorBySlug(slug: string): ActorInfo | null {
  const clean = cleanSlug(slug);
  // Match exact slug or slug stripping trailing id e.g. dich-le-nhiet-ba-1 -> dich-le-nhiet-ba
  const match = FAMOUS_ACTORS.find(a => a.slug === clean || clean.startsWith(a.slug));
  if (match) return match;

  // Search by name similarity
  const readableName = clean.replace(/-/g, " ");
  const matchByName = FAMOUS_ACTORS.find(a => a.name.toLowerCase().includes(readableName.toLowerCase()));
  if (matchByName) return matchByName;

  // Fallback actor profile generator
  return {
    id: Math.abs(stringHash(clean)),
    slug: clean,
    name: formatSlugToName(clean),
    character: "Diễn viên",
    avatar_url: getActorFallbackAvatar(clean),
    image_url: getActorFallbackAvatar(clean),
    biography: `Thông tin chi tiết về diễn viên ${formatSlugToName(clean)} đang được cập nhật liên tục tại RIOFLIX.`,
    place_of_birth: "Đang cập nhật",
    popularity: 80.0
  };
}

function formatSlugToName(slug: string): string {
  const words = slug.replace(/-\d+$/, "").split("-");
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getActorFallbackAvatar(seed: string): string {
  const pool = [
    "https://image.tmdb.org/t/p/original/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg",
    "https://image.tmdb.org/t/p/original/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
    "https://image.tmdb.org/t/p/original/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
    "https://image.tmdb.org/t/p/original/wU8ZL6AIWlTHVPat2rfMDOImRMA.jpg",
    "https://image.tmdb.org/t/p/original/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
    "https://image.tmdb.org/t/p/original/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg",
    "https://image.tmdb.org/t/p/original/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg",
    "https://image.tmdb.org/t/p/original/5Va4jk69gkdAcABtkTtcUz85RLA.jpg",
    "https://image.tmdb.org/t/p/original/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg",
    "https://image.tmdb.org/t/p/original/uZRNsDfYl5fnKtcLp7MQ3t90ZtS.jpg"
  ];
  return pool[stringHash(seed) % pool.length];
}
