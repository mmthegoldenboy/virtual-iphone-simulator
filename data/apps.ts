// 앱 아이콘 및 화면별 이미지 경로를 쉽게 수정할 수 있게 한 곳에 모아둡니다.
// 필요하면 파일명을 바꾸거나 실제 이미지 파일을 추가해도 됩니다.

export const appArtwork = {
  messages: "/images/messages.png",
  notes: "/images/notes.png",
  music: "/images/music.png",
  lockscreen: "/images/lockscreen.png",
  homescreen: "/images/homescreen.png",
  chatBackground: "",
  notesBackground: "",
};

export const apps = [
  {
    id: "messages",
    name: "메시지",
    icon: "💬",
    image: appArtwork.messages,
    popupTitle: null,
    popupMessage: null,
  },
  {
    id: "photos",
    name: "사진",
    icon: "🖼️",
    image: "/images/photos.png",
    popupTitle: "사진",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "notes",
    name: "메모",
    icon: "📝",
    image: appArtwork.notes,
    popupTitle: null,
    popupMessage: null,
  },
  {
    id: "phone",
    name: "전화",
    icon: "📞",
    image: "/images/phone.png",
    popupTitle: "전화",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "contacts",
    name: "연락처",
    icon: "👥",
    image: "",
    popupTitle: "연락처",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "tinder",
    name: "Tinder",
    icon: "💘",
    image: "",
    popupTitle: "Tinder",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "mail",
    name: "메일",
    icon: "✉️",
    image: "/images/mail.png",
    popupTitle: "메일",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
  {
    id: "music",
    name: "음악",
    icon: "🎵",
    image: appArtwork.music,
    popupTitle: "음악",
    popupMessage: "YouTube 음악 페이지로 이동합니다.",
    url: "https://www.youtube.com/results?search_query=lofi+beats",
  },
  {
    id: "clock",
    name: "시계",
    icon: "⏰",
    image: "",
    popupTitle: "시계",
    popupMessage: "이 콘텐츠는 열람할 수 없습니다.",
  },
];
