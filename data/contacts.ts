// 연락처 데이터를 수정할 때는 이 파일만 바꾸면 됩니다.
// 이름, 아바타 문구, 마지막 미리보기 문구를 예쁘게 수정할 수 있습니다.
export type Contact = {
  id: string;
  name: string;
  phone?: string;
  avatarText: string;
  profileImage?: string;
  lastPreview: string;
  unreadCount?: number;
};

export const contacts: Contact[] = [
  {
    id: "captain-hollander",
    name: "Captain Hollander",
    avatarText: "CH",
    lastPreview: "작성 중…",
    unreadCount: 1,
  },
  {
    id: "mia",
    name: "Mia",
    avatarText: "M",
    lastPreview: "미안, 오늘 저녁에 볼 수 있을까?",
    unreadCount: 2,
  },
  {
    id: "jun",
    name: "Jun",
    avatarText: "J",
    lastPreview: "사진 보내줄게. 고마워.",
  },
];
