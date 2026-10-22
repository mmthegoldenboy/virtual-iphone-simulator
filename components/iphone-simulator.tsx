"use client";

import { useState } from "react";
import { apps } from "@/data/apps";
import { useClock } from "@/components/use-clock";
import StatusBar from "@/components/status-bar";
import LockScreen from "@/components/lock-screen";
import HomeScreen from "@/components/home-screen";
import MessagesApp from "@/components/messages-app";
import NotesApp from "@/components/notes-app";
import UnavailablePopup from "@/components/unavailable-popup";

type Screen = "lock" | "home" | "messages" | "notes";

type BlockedApp = {
  title: string;
  message: string;
} | null;

export default function IphoneSimulator() {
  const { time, date } = useClock();
  const [screen, setScreen] = useState<Screen>("lock");
  const [blockedApp, setBlockedApp] = useState<BlockedApp>(null);

  function openApp(id: string) {
    const app = apps.find((item) => item.id === id);
    if (!app) return;

    if (app.id === "messages" || app.id === "notes") {
      setScreen(app.id);
      return;
    }

    if (app.id === "music" && app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
      return;
    }

    setBlockedApp({
      title: app.popupTitle ?? "이 콘텐츠는 열람할 수 없습니다.",
      message: app.popupMessage ?? "이 앱은 이 시뮬레이터에서 지원하지 않습니다.",
    });
  }

  const goHome = () => setScreen("home");
  const inApp = screen === "messages" || screen === "notes";

  return (
    <main className="app-shell">
      <div className="iphone-frame">
        <div className="iphone-screen">
          <div className="notch" aria-hidden="true" />
          <StatusBar time={time} dark={inApp} />

          {screen === "lock" && <LockScreen time={time} date={date} onUnlock={goHome} />}
          {screen !== "lock" && <HomeScreen onOpenApp={openApp} />}
          {screen === "messages" && <MessagesApp onClose={goHome} />}
          {screen === "notes" && <NotesApp onClose={goHome} />}

          {blockedApp && (
            <UnavailablePopup
              title={blockedApp.title}
              message={blockedApp.message}
              onClose={() => setBlockedApp(null)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
