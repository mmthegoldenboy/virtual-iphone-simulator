// 홈 화면 앱 목록입니다.
// image 가 있으면 PNG 아이콘을, 없으면 glyph 기본 아이콘을 표시합니다.
// dock: true 인 앱은 화면 하단 독에 배치됩니다.
import { imagePaths } from "@/data/image-paths";

export type AppGlyph = "contacts" | "tinder" | "clock";

export type AppInfo = {
  id: string;
  name: string;
  image?: string;
  glyph?: AppGlyph;
  dock?: boolean;
  popupTitle?: string;
  popupMessage?: string;
  url?: string;
};

const LOCKED_MESSAGE = "이 콘텐츠는 열람할 수 없습니다.";

export const apps: AppInfo[] = [
  {
    id: "photos",
    name: "사진",
    image: imagePaths.photos,
    popupTitle: "사진",
    popupMessage: LOCKED_MESSAGE,
  },
  {
    id: "notes",
    name: "메모",
    image: imagePaths.notes,
  },
  {
    id: "contacts",
    name: "연락처",
    glyph: "contacts",
    popupTitle: "연락처",
    popupMessage: LOCKED_MESSAGE,
  },
  {
    id: "tinder",
    name: "Tinder",
    glyph: "tinder",
    popupTitle: "Tinder",
    popupMessage: LOCKED_MESSAGE,
  },
  {
    id: "clock",
    name: "시계",
    glyph: "clock",
    popupTitle: "시계",
    popupMessage: LOCKED_MESSAGE,
  },
  {
    id: "phone",
    name: "전화",
    image: imagePaths.phone,
    dock: true,
    popupTitle: "전화",
    popupMessage: LOCKED_MESSAGE,
  },
  {
    id: "messages",
    name: "메시지",
    image: imagePaths.messages,
    dock: true,
  },
  {
    id: "mail",
    name: "메일",
    image: imagePaths.mail,
    dock: true,
    popupTitle: "메일",
    popupMessage: LOCKED_MESSAGE,
  },
  {
    id: "music",
    name: "음악",
    image: imagePaths.music,
    dock: true,
    url: "https://www.youtube.com/results?search_query=lofi+beats",
  },
];
