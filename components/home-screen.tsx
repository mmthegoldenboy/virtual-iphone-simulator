"use client";

import { useState } from "react";
import { apps, type AppGlyph, type AppInfo } from "@/data/apps";
import { imagePaths } from "@/data/image-paths";

type HomeScreenProps = {
  onOpenApp: (id: string) => void;
  dimmed?: boolean;
};

export default function HomeScreen({ onOpenApp, dimmed = false }: HomeScreenProps) {
  const gridApps = apps.filter((app) => !app.dock);
  const dockApps = apps.filter((app) => app.dock);

  return (
    <section
      className={`home-screen${dimmed ? " dimmed" : ""}`}
      aria-label="홈 화면"
      style={{ backgroundImage: `url(${imagePaths.homescreen})` }}
    >
      <div className="app-grid">
        {gridApps.map((app) => (
          <AppTile key={app.id} app={app} onOpen={onOpenApp} showName />
        ))}
      </div>

      <div className="home-bottom">
        <div className="search-pill" aria-hidden="true">
          <SearchIcon />
          검색
        </div>
        <nav className="dock" aria-label="독">
          {dockApps.map((app) => (
            <AppTile key={app.id} app={app} onOpen={onOpenApp} />
          ))}
        </nav>
      </div>
    </section>
  );
}

function AppTile({
  app,
  onOpen,
  showName = false,
}: {
  app: AppInfo;
  onOpen: (id: string) => void;
  showName?: boolean;
}) {
  return (
    <button type="button" className="app-tile" onClick={() => onOpen(app.id)} aria-label={app.name}>
      <AppIcon image={app.image} glyph={app.glyph} />
      {showName ? (
        <span className="app-name" aria-hidden="true">
          {app.name}
        </span>
      ) : null}
    </button>
  );
}

function AppIcon({ image, glyph }: { image?: string; glyph?: AppGlyph }) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      <span className="app-icon" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" draggable={false} onError={() => setFailed(true)} />
      </span>
    );
  }

  return (
    <span className={`app-icon glyph glyph-${glyph ?? "default"}`} aria-hidden="true">
      <GlyphSvg glyph={glyph} />
    </span>
  );
}

function GlyphSvg({ glyph }: { glyph?: AppGlyph }) {
  if (glyph === "contacts") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="9" r="4" />
        <path d="M4.5 20c.8-3.6 3.8-5.6 7.5-5.6s6.7 2 7.5 5.6z" />
      </svg>
    );
  }
  if (glyph === "tinder") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.6 2.5c.4 3-1.2 4.6-2.6 6-.6-1-.8-1.9-.8-2.9C6.7 7.3 5 10 5 13.3 5 17.6 8.1 21 12 21s7-3.1 7-7.4c0-4.9-3.4-8.6-6.4-11.1z" />
      </svg>
    );
  }
  if (glyph === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.2 2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.5-4.5" />
    </svg>
  );
}
