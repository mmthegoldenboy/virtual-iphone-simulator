import { imagePaths as appArtwork } from "./image-paths";

export const apps = [
  {
    id: "messages",
    name: "메시지",
    icon: "●",
    image: appArtwork.messages,
    popupTitle: null,
    popupMessage: null,
  },
  {
    id: "photos",
    name: "사진",
    icon: "✿",
    image: appArtwork.photos,
    popupTitle: "사진",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "notes",
    name: "메모",
    icon: "≡",
    image: appArtwork.notes,
    popupTitle: null,
    popupMessage: null,
  },
  {
    id: "phone",
    name: "전화",
    icon: "☎",
    image: appArtwork.phone,
    popupTitle: "전화",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "contacts",
    name: "연락처",
    icon: "◎",
    image: "",
    popupTitle: "연락처",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "tinder",
    name: "Tinder",
    icon: "♨",
    image: "",
    popupTitle: "Tinder",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "mail",
    name: "메일",
    icon: "✉",
    image: appArtwork.mail,
    popupTitle: "메일",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "music",
    name: "음악",
    icon: "♫",
    image: appArtwork.music,
    popupTitle: "음악",
    popupMessage: "YouTube 음악 페이지로 이동합니다.",
    url: "https://www.youtube.com/results?search_query=lofi+beats",
  },
  {
    id: "clock",
    name: "시계",
    icon: "◷",
    image: "",
    popupTitle: "시계",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
];

export const dockAppIds = ["phone", "messages", "mail", "music"];
