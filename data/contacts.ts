// 연락처 데이터를 수정할 때는 이 파일만 바꾸면 됩니다.
// name 이 비어 있으면 phone 이, 둘 다 없으면 "알 수 없는 번호"가 표시됩니다.
export type Contact = {
  id: string;
  name?: string;
  phone?: string;
  avatarText?: string;
  avatarColor?: "blue" | "green" | "orange" | "gray";
  lastPreview: string;
  unreadCount?: number;
  typing?: boolean;
};

export const contacts: Contact[] = [
  {
    id: "captain-hollander",
    name: "Captain Hollander",
    avatarText: "CH",
    avatarColor: "blue",
    lastPreview: "작성 중…",
    unreadCount: 1,
    typing: true,
  },
  {
    id: "unknown-number",
    phone: "010-2602-1300",
    avatarColor: "gray",
    lastPreview: "이 번호로 연락 주세요.",
    unreadCount: 1,
  },
  {
    id: "mia",
    name: "Mia",
    avatarText: "M",
    avatarColor: "orange",
    lastPreview: "혹시 점심 같이 먹을래?",
    unreadCount: 2,
  },
  {
    id: "jun",
    name: "Jun",
    avatarText: "J",
    avatarColor: "green",
    lastPreview: "감사해.",
  },
];

export function getDisplayName(contact?: Pick<Contact, "name" | "phone">) {
  const name = contact?.name?.trim();
  if (name) return name;
  const phone = contact?.phone?.trim();
  if (phone) return phone;
  return "알 수 없는 번호";
}
