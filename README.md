# iPhone 시뮬레이터

Next.js 14, React, TypeScript로 만든 한국어 단일 페이지 시뮬레이터입니다. 홈 화면에서 메시지와 메모를 열고, 하단 홈 막대를 누르면 돌아옵니다. 오른쪽 측면 버튼으로 화면을 잠그거나 잠금을 해제합니다.

## 개발

`npm install` 후 `npm run dev`로 실행합니다. `npm run lint`와 `npx tsc --noEmit`으로 코드를 확인합니다.

## 데이터와 이미지

- `data/apps.ts`: 앱 이름, 대체 아이콘, 안내 문구와 독 구성
- `data/image-paths.ts`: 모든 이미지 경로
- `data/contacts.ts`: 연락처와 이름/아바타 대체 표시
- `data/conversations.ts`: 대화 내용
- `data/notes.ts`: 메모 내용과 잠금 화면 데모 설정
- `data/notifications.ts`: 잠금 화면 알림

이미지는 `public/images/`에 둡니다. 이미지 로딩에 실패하면 아이콘은 글리프로, 배경은 기본 색상으로 표시됩니다. 대화는 읽기 전용이며 메모 잠금은 UI 시뮬레이션입니다. 실제 인증이나 저장 기능은 없습니다.

## Netlify

`netlify.toml`은 `npm run build`와 게시 디렉터리 `out`을 설정합니다. Next.js의 `output: "export"`로 정적 파일을 생성하며, 서버 함수나 Vercel 전용 기능이 필요하지 않습니다. 모든 화면은 루트 경로 안에서 전환됩니다. 도메인에 맞춘 별도의 base path는 필요하지 않습니다.
