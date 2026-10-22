// 연락처 데이터를 수정할 때는 이 파일만 바꾸면 됩니다.
// 이름, 아바타 문구, 마지막 미리보기 문구를 예쁘게 수정할 수 있습니다.

export type Contact = {
  id: string;
  name?: string;
  phone?: string;
  avatarText?: string;
  profileImage?: string;
  lastPreview: string;
  unreadCount?: number;
};

export const contacts: Contact[] = [
  {
    id: "captain-hollander",
    name: "Captain Hollander",
    phone: "+82 10-1234-5678",
    avatarText: "CH",
    lastPreview: "작성 중…",
    unreadCount: 1,
  },
  {
    id: "unknown-1",
    phone: "+82 10-9876-5432",
    avatarText: "N",
    lastPreview: "메시지가 도착했습니다.",
  },
  {
    id: "unknown-2",
    phone: "+82 10-3333-2222",
    avatarText: "U",
    lastPreview: "지금 통화 가능해?",
  },
];

export function contactName(contact?: Contact): string {
  return contact?.name?.trim() || contact?.phone?.trim() || "알 수 없는 연락처";
}

export function contactInitials(contact?: Contact): string {
  return (
    contact?.avatarText?.trim() ||
    contact?.name?.trim().slice(0, 2) ||
    contact?.phone?.replace(/\D/g, "").slice(-2) ||
    "?"
  );
}
