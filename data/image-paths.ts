// 실제 화면을 구현할 때 필요한 구성 요소를 한 번에 보관합니다.
const base = "";

export const imagePaths = {
  lockscreen: base ? `${base}/lockscreen.jpg` : "/images/lockscreen.png",
  homescreen: base ? `${base}/homescreen.jpg` : "/images/homescreen.png",
  messages: base ? `${base}/messages.png` : "/images/messages.png",
  notes: base ? `${base}/notes.png` : "/images/notes.png",
  music: base ? `${base}/music.png` : "/images/music.png",
  mail: base ? `${base}/mail.png` : "/images/mail.png",
  phone: base ? `${base}/phone.png` : "/images/phone.png",
  photos: base ? `${base}/photos.png` : "/images/photos.png",
};
