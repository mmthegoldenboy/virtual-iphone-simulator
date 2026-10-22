// 메시지 대화 데이터를 수정할 때는 이 파일만 다루면 됩니다.
// 각 메시지는 sender 값을 "other" 또는 "me"로 지정하고, 시간과 읽음 상태를 편집할 수 있습니다.
export type Message = {
  id: string;
  sender: "other" | "me";
  content: string;
  time?: string;
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
        content: "가족 비상 상황 때문에 일주일 정도 자리를 비울 거야."
      },
      {
        id: "other-3",
        sender: "other",
        content: "내가 없는 동안 사람을 초대하는건 되지만, 청소는 제대로 해."
      },
      { id: "other-4", sender: "other", content: "집에 도착하면 연락하고." },
      { id: "me-1", sender: "me", content: "무슨 일인데요?" },
      { id: "me-2", sender: "me", content: "괜찮아요?" },
      { id: "me-3", sender: "me", content: "나는 개 목걸이 차고 있는데 토끼가 없으면 혼자 웃기잖아요." },
      { id: "me-4", sender: "me", content: "내가 돕게 해 줘요.", read: true },
    ],
  },
  {
    id: "mia-chat",
    contactId: "mia",
    messages: [
      { id: "mia-1", sender: "other", content: "내일 바빠?💕", time: "어제" },
      { id: "mia-2", sender: "me", content: "글쎄.", time: "어제" },
      { id: "mia-3", sender: "other", content: "네 퍽버니가 널 기다리고 있는데.", time: "어제" },
    ],
  },
  {
    id: "sveta-chat",
    contactId: "sveta",
    messages: [
      { id: "sveta-1", sender: "other", content: "어디야?" },
      { id: "sveta-2", sender: "me", content: "우버 불렀어." },
      { id: "sveta-3", sender: "other", content: "뭐라고?" },
      { id: "sveta-4", sender: "other", content: "벌써?" },
      { id: "sveta-5", sender: "other", content: "너 변했어." },
      { id: "sveta-6", sender: "me", content: "통금 있다니까." },
      { id: "sveta-7", sender: "other", content: "언제 이렇게 착한 아이가 된 거야?🤣" },
      { id: "sveta-8", sender: "me", content: "시끄러." },
      { id: "sveta-9", sender: "me", content: "보고 싶어." },
      { id: "sveta-10", sender: "me", content: "너 없는 몬트리올은 외로워." },
      { id: "sveta-11", sender: "other", content: "나도 알아, 일류샤." },
      { id: "sveta-12", sender: "other", content: "너 때문에 젖었거든." },
      { id: "sveta-13", sender: "other", content: "지금 전화해." },
    ],
  },
  {
    id: "mia-chat",
    contactId: "mia",
    messages: [
      { id: "mia-1", sender: "other", content: "내일 바빠?💕", time: "어제" },
      { id: "mia-2", sender: "me", content: "글쎄.", time: "어제" },
      { id: "mia-3", sender: "other", content: "네 퍽버니가 널 기다리고 있는데.", time: "어제" },
    ],
  },
];
