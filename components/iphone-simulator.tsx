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

type BlockedApp = { title: string; message: string } | null;

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

    if (app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
      return;
    }

    setBlockedApp({
      title: app.popupTitle ?? app.name,
      message: app.popupMessage ?? "이 콘텐츠는 열람할 수 없습니다.",
    });
  }

  const goHome = () => setScreen("home");
  const inApp = screen === "messages" || screen === "notes";

  return (
    <main className="app-shell">
      <div className="iphone-frame">
        <span className="side-button side-action" aria-hidden="true" />
        <span className="side-button side-volume-up" aria-hidden="true" />
        <span className="side-button side-volume-down" aria-hidden="true" />
        <span className="side-button side-power" aria-hidden="true" />

        <div className="iphone-screen">
          <div className="dynamic-island" aria-hidden="true" />
          <StatusBar time={time} dark={inApp} />

          {screen === "lock" ? (
            <LockScreen time={time} date={date} onUnlock={goHome} />
          ) : (
            <HomeScreen onOpenApp={openApp} dimmed={inApp} />
          )}
          {screen === "messages" && <MessagesApp onClose={goHome} />}
          {screen === "notes" && <NotesApp onClose={goHome} />}

          {blockedApp && (
            <UnavailablePopup
              title={blockedApp.title}
              message={blockedApp.message}
              onClose={() => setBlockedApp(null)}
            />
          )}

          {screen !== "lock" && (
            <button
              type="button"
              className={`home-indicator${inApp ? " dark" : ""}`}
              onClick={goHome}
              aria-label="홈으로 이동"
            />
          )}
        </div>
      </div>
    </main>
  );
}
