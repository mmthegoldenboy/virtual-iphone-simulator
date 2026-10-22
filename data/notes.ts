// 메모 데이터를 수정할 땐 이 파일만 바꾸면 됩니다.
// 잠금 메모는 locked: true, password: "260213" 값을 유지해 주세요.
export type Note = {
  id: string;
  title: string;
  preview: string;
  content: string;
  locked?: boolean;
  password?: string;
};

export const notes: Note[] = [
  {
    id: "daily-plan",
    title: "오늘 할 일",
    preview: "운동, 장보기, 점심 약속 정리.",
    content:
      "1. 오전에 30분 산책하기\n2. 우유와 과일 사오기\n3. 점심 약속 시간 확인하기\n4. 저녁에는 집 정리 20분 하기",
  },
  {
    id: "locked-memo",
    title: "잠금 메모",
    preview: "보안 설정이 되어 있는 비밀 메모입니다.",
    content:
      "비밀 메모\n\n오늘의 아이디어:\n- 밤에는 조용한 음악 듣기\n- 작은 산책은 기분을 좋게 만든다\n- 침대에 누워서 생각 정리하기",
    locked: true,
    password: "260213",
  },
  {
    id: "trip-idea",
    title: "여행 아이디어",
    preview: "3월에 바다 근처로 가고 싶다.",
    content:
      "여행 아이디어\n\n- 3월에 바다 근처로 떠나기\n- 바다를 바라보며 사진 찍기\n- 작은 카페에서 느리게 시간을 보내기\n- 집으로 돌아오는 길에 기념품 사기",
  },
];
