"use client";

import { useEffect, useRef, useState } from "react";

/** Keep a readable icon even when a configured asset cannot be loaded. */
export default function AppIcon({
  image,
  glyph,
  id,
}: {
  image: string;
  glyph: string;
  id: string;
}) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Static HTML images can fail before React attaches the error handler.
    if (imageRef.current?.complete && imageRef.current.naturalWidth === 0) {
      setFailed(true);
    }
  }, [image]);
  return (
    <span className={`app-icon icon-${id}`}>
      {image && !failed ? (
        <img
          ref={imageRef}
          src={image}
          alt=""
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <span aria-hidden="true">{glyph}</span>
      )}
    </span>
  );
}
