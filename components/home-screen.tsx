"use client";

import { useState } from "react";
import { apps } from "@/data/apps";
import { imagePaths } from "@/data/image-paths";

type HomeScreenProps = {
  onOpenApp: (id: string) => void;
};

export default function HomeScreen({ onOpenApp }: HomeScreenProps) {
  return (
    <section
      className="home-screen"
      aria-label="홈 화면"
      style={{
        backgroundColor: "#6a4d7a",
        backgroundImage: `url(${imagePaths.homescreen})`,
      }}
    >
      <div className="home-content">
        <div className="app-grid">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="app-tile"
              onClick={() => onOpenApp(app.id)}
            >
              <AppIcon image={app.image} fallback={app.icon} />
              <span className="app-name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppIcon({ image, fallback }: { image: string; fallback: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="app-icon" aria-hidden="true">
      {image && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" onError={() => setFailed(true)} />
      ) : (
        fallback
      )}
    </span>
  );
}
