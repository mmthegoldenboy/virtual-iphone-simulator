"use client";

import { useState } from "react";

export function AppIcon({ id, image }: { id: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  return <span className={`app-icon icon-${id}`}>
    {image && !failed ? <img src={image} alt="" draggable={false} onError={() => setFailed(true)} /> :
      <svg viewBox="0 0 48 48" aria-hidden="true" fill="currentColor">
        {id === "messages" && <path d="M24 9C13 9 5 15 5 23c0 5 3 9 8 12l-2 6 9-4h4c11 0 19-6 19-14S35 9 24 9Z" />}
        {id === "mail" && <><rect x="6" y="11" width="36" height="27" rx="4" /><path d="m7 13 17 14 17-14M7 36l12-12m22 12L29 24" fill="none" stroke="#4294e5" strokeWidth="2" /></>}
        {id === "phone" && <path d="m12 7 8 9-5 5c3 6 6 9 12 12l5-5 9 7c-2 9-9 9-16 5C14 34 7 26 5 17 3 10 6 7 12 7Z" />}
        {id === "tinder" && <path d="M28 5c1 9-4 12-8 15-1-3-3-5-5-6C4 27 9 42 24 42c18 0 24-21 4-37Z" />}
        {id === "notes" && <><path d="M7 9h34v32H7Z" /><path d="M12 21h24m-24 7h24m-24 7h18" stroke="#b7b7ac" strokeWidth="2" /><path d="M7 9h34v7H7Z" fill="#f1c744" /></>}
        {id === "photos" && <>{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="24" cy="15" rx="6" ry="11" fill={`hsl(${i * 45} 75% 60%)`} opacity=".8" transform={`rotate(${i * 45} 24 24)`} />)}</>}
      </svg>}
  </span>;
}
