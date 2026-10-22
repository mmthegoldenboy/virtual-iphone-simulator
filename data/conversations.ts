// 메시지 대화 데이터를 수정할 때는 이 파일만 다루면 됩니다.
// 각 메시지는 sender 값을 "other" 또는 "me"로 지정하고, 읽음 상태를 편집할 수 있습니다.
export type Message = {
  id: string;
  sender: "other" | "me";
  content: string;
  read?: boolean;
};

export type Conversation = {
  id: string;
  contactId: string;
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: "captain-hollander-chat",
    contactId: "captain-hollander",
    messages: [
      { id: "other-1", sender: "other", content: "먼저 돌아갈게." },
      {
        id: "other-2",
        sender: "other",
        content: "가족 비상 상황 때문에 일주일 정도 자리를 비울 거야.",
      },
      {
        id: "other-3",
        sender: "other",
        content: "내가 없는 동안 사람을 초대하는건 되지만, 청소는 제대로 해.",
      },
      { id: "other-4", sender: "other", content: "집에 도착하면 연락하고." },
      { id: "me-1", sender: "me", content: "무슨 일인데요?" },
      { id: "me-2", sender: "me", content: "괜찮아요?" },
      {
        id: "me-3",
        sender: "me",
        content: "나는 개 목걸이 차고 있는데 토끼가 없으면 혼자 웃기잖아요.",
        read: true,
      },
    ],
  },
  {
    id: "unknown-number-chat",
    contactId: "unknown-number",
    messages: [
      { id: "unknown-1", sender: "other", content: "안녕하세요. 지난번에 연락드렸던 사람입니다." },
      { id: "unknown-2", sender: "other", content: "이 번호로 연락 주세요." },
    ],
  },
  {
    id: "mia-chat",
    contactId: "mia",
    messages: [
      { id: "mia-1", sender: "other", content: "오늘 일정은 어때?" },
      { id: "mia-2", sender: "me", content: "좋아, 보강이랑 약속이 있어." },
      { id: "mia-3", sender: "other", content: "혹시 점심 같이 먹을래?" },
    ],
  },
  {
    id: "jun-chat",
    contactId: "jun",
    messages: [
      { id: "jun-1", sender: "other", content: "사진 보내줄게." },
      { id: "jun-2", sender: "me", content: "감사해.", read: true },
    ],
  },
];
