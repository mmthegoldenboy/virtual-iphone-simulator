// 실제 화면을 구현할 때 필요한 구성 요소를 한 번에 보관합니다.
// 뒤에서 실제 이미지를 넣고 싶다면 public/images 폴더에 같은 이름의 파일을 추가하면 됩니다.
const base = "";

export const imagePaths = {
  lockscreen: base ? `${base}/lockscreen.jpg` : "/images/lockscreen.svg",
  homescreen: base ? `${base}/homescreen.jpg` : "/images/homescreen.svg",
  messages: base ? `${base}/messages.png` : "/images/messages.svg",
  notes: base ? `${base}/notes.png` : "/images/notes.svg",
  chatBackground: base ? `${base}/chat-bg.jpg` : "/images/chat-bg.svg",
  notesBackground: base ? `${base}/notes-bg.jpg` : "/images/notes-bg.svg",
};
