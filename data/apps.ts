// 앱 아이콘 및 화면별 이미지 경로를 쉽게 수정할 수 있게 한 곳에 모아둡니다.
// 필요하면 파일명을 바꾸거나 실제 이미지 파일을 추가해도 됩니다.
export const appArtwork = {
  messages: "/images/messages.svg",
  notes: "/images/notes.svg",
  lockscreen: "/images/lockscreen.svg",
  homescreen: "/images/homescreen.svg",
  chatBackground: "/images/chat-bg.svg",
  notesBackground: "/images/notes-bg.svg",
};

export const apps = [
  { id: "messages", name: "메시지", icon: "💬", image: appArtwork.messages },
  { id: "photos", name: "사진", icon: "🖼️", image: "" },
  { id: "notes", name: "메모", icon: "📝", image: appArtwork.notes },
  { id: "phone", name: "전화", icon: "📞", image: "" },
  { id: "contacts", name: "연락처", icon: "👥", image: "" },
  { id: "tinder", name: "Tinder", icon: "💘", image: "" },
  { id: "mail", name: "메일", icon: "✉️", image: "" },
  { id: "clock", name: "시계", icon: "⏰", image: "" },
];
