// Dictionary of Chinese/Japanese actor names to formatted Pinyin/English/Vietnamese names and TMDB images
interface ActorMeta {
  formattedName: string;
  image: string;
}

const KNOWN_ACTORS_DATA: Record<string, ActorMeta> = {
  // Tôi Là Nhậm Phi Phàm actors
  "徐子璇": { formattedName: "Xu Zixuan", image: "https://image.tmdb.org/t/p/w185/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg" },
  "王俊笔": { formattedName: "Wang Junbi", image: "https://image.tmdb.org/t/p/w185/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg" },
  "吕昀峰": { formattedName: "Lu Yunfeng", image: "https://image.tmdb.org/t/p/w185/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg" },
  "Li Mingxuan": { formattedName: "Li Mingxuan", image: "https://image.tmdb.org/t/p/w185/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg" },
  "Xu Zixuan": { formattedName: "Xu Zixuan", image: "https://image.tmdb.org/t/p/w185/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg" },
  "Wang Junbi": { formattedName: "Wang Junbi", image: "https://image.tmdb.org/t/p/w185/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg" },
  "Lu Yunfeng": { formattedName: "Lu Yunfeng", image: "https://image.tmdb.org/t/p/w185/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg" },

  // Kungfu Nữ Túc actors
  "迪丽热巴": { formattedName: "Địch Lệ Nhiệt Ba", image: "https://image.tmdb.org/t/p/w185/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg" },
  "Địch Lệ Nhiệt Ba": { formattedName: "Địch Lệ Nhiệt Ba", image: "https://image.tmdb.org/t/p/w185/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg" },
  "Dilraba Dilmurat": { formattedName: "Địch Lệ Nhiệt Ba", image: "https://image.tmdb.org/t/p/w185/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg" },
  "佐藤健": { formattedName: "Sato Takeru", image: "https://image.tmdb.org/t/p/w185/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg" },
  "Sato Takeru": { formattedName: "Sato Takeru", image: "https://image.tmdb.org/t/p/w185/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg" },
  "蔡思貝": { formattedName: "Sisley Choi Si-Pui", image: "https://image.tmdb.org/t/p/w185/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg" },
  "Sisley Choi Si-Pui": { formattedName: "Sisley Choi Si-Pui", image: "https://image.tmdb.org/t/p/w185/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg" },
  "艾米": { formattedName: "Ngãi Mễ", image: "https://image.tmdb.org/t/p/w185/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg" },
  "Ngãi Mễ": { formattedName: "Ngãi Mễ", image: "https://image.tmdb.org/t/p/w185/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg" },
  "張繼聰": { formattedName: "Trương Kế Thông", image: "https://image.tmdb.org/t/p/w185/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg" },
  "Trương Kế Thông": { formattedName: "Trương Kế Thông", image: "https://image.tmdb.org/t/p/w185/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg" },
  "Jimmy O. Yang": { formattedName: "Jimmy O. Yang", image: "https://image.tmdb.org/t/p/w185/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg" },
  "劉嘉玲": { formattedName: "Lưu Gia Linh", image: "https://image.tmdb.org/t/p/w185/5Va4jk69gkdAcABtkTtcUz85RLA.jpg" },
  "Lưu Gia Linh": { formattedName: "Lưu Gia Linh", image: "https://image.tmdb.org/t/p/w185/5Va4jk69gkdAcABtkTtcUz85RLA.jpg" },
  "歐陽靖": { formattedName: "Jin Au-Yeung", image: "https://image.tmdb.org/t/p/w185/uZRNsDfYl5fnKtcLp7MQ3t90ZtS.jpg" },
  "Jin Au-Yeung": { formattedName: "Jin Au-Yeung", image: "https://image.tmdb.org/t/p/w185/uZRNsDfYl5fnKtcLp7MQ3t90ZtS.jpg" },
  "张艺兴": { formattedName: "Trương Nghệ Hưng", image: "https://image.tmdb.org/t/p/w185/wU8ZL6AIWlTHVPat2rfMDOImRMA.jpg" },
  "Trương Nghệ Hưng": { formattedName: "Trương Nghệ Hưng", image: "https://image.tmdb.org/t/p/w185/wU8ZL6AIWlTHVPat2rfMDOImRMA.jpg" },
  "张小斐": { formattedName: "Trương Tiểu Phỉ", image: "https://image.tmdb.org/t/p/w185/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg" },
  "Trương Tiểu Phỉ": { formattedName: "Trương Tiểu Phỉ", image: "https://image.tmdb.org/t/p/w185/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg" },
  "赵丽娜": { formattedName: "Zhao Lina", image: "https://image.tmdb.org/t/p/w185/imzFZnPk6WScr9z1zUWhcDUmYTL.jpg" },
  "Zhao Lina": { formattedName: "Zhao Lina", image: "https://image.tmdb.org/t/p/w185/imzFZnPk6WScr9z1zUWhcDUmYTL.jpg" },
  "雪野": { formattedName: "Xueye", image: "https://image.tmdb.org/t/p/w185/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg" },
  "Xueye": { formattedName: "Xueye", image: "https://image.tmdb.org/t/p/w185/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg" },
};

// Pool of varied, high quality actor profile pictures for fallback
const FALLBACK_ACTOR_IMAGES = [
  "https://image.tmdb.org/t/p/w185/fhWQ0c3FSzkcDjMPubI2oQxW7EM.jpg",
  "https://image.tmdb.org/t/p/w185/dKWtZXEnTOedUUnDwBCZZN7w2uG.jpg",
  "https://image.tmdb.org/t/p/w185/kMoFQdV3Do1kIuDMq2dYOYNrMZ2.jpg",
  "https://image.tmdb.org/t/p/w185/iC3qFWSfopItdRhpnXMxYiOOAjK.jpg",
  "https://image.tmdb.org/t/p/w185/ypmPVRkZkjtS7qE3P8nU5GYCXnT.jpg",
  "https://image.tmdb.org/t/p/w185/1QfCVmdNo4AqBdN54kc9DTBx84X.jpg",
  "https://image.tmdb.org/t/p/w185/5Va4jk69gkdAcABtkTtcUz85RLA.jpg",
  "https://image.tmdb.org/t/p/w185/uZRNsDfYl5fnKtcLp7MQ3t90ZtS.jpg",
  "https://image.tmdb.org/t/p/w185/wU8ZL6AIWlTHVPat2rfMDOImRMA.jpg",
  "https://image.tmdb.org/t/p/w185/9PNUlzUS7bn5p6OsRnkSCzUI1FV.jpg",
  "https://image.tmdb.org/t/p/w185/imzFZnPk6WScr9z1zUWhcDUmYTL.jpg",
  "https://image.tmdb.org/t/p/w185/w3rUy8HTFl7d8PUqRET2Xx0rRhd.jpg",
];

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function formatActorName(actorName: string): string {
  if (!actorName) return "";
  const trimmed = actorName.trim();
  if (KNOWN_ACTORS_DATA[trimmed]) {
    return KNOWN_ACTORS_DATA[trimmed].formattedName;
  }
  return trimmed;
}

export function getActorImage(actorName: string): string {
  if (!actorName) return FALLBACK_ACTOR_IMAGES[0];
  const trimmed = actorName.trim();

  if (KNOWN_ACTORS_DATA[trimmed]?.image) {
    return KNOWN_ACTORS_DATA[trimmed].image;
  }

  // Check substring match
  for (const [key, meta] of Object.entries(KNOWN_ACTORS_DATA)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase()) && meta.image) {
      return meta.image;
    }
  }

  // Fallback to deterministic name hash
  const hash = stringHash(trimmed);
  const index = hash % FALLBACK_ACTOR_IMAGES.length;
  return FALLBACK_ACTOR_IMAGES[index];
}
