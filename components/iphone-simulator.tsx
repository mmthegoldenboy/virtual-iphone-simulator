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

export default function IphoneSimulator() {
  const { time, date } = useClock();
  const [screen, setScreen] = useState<Screen>("lock");
  const [blockedApp, setBlockedApp] = useState<string | null>(null);

  function openApp(id: string) {
    if (id === "messages" || id === "notes") {
      setScreen(id);
      return;
    }
    setBlockedApp(apps.find((a) => a.id === id)?.name ?? id);
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
            <UnavailablePopup appName={blockedApp} onClose={() => setBlockedApp(null)} />
          )}
        </div>
      </div>
    </main>
  );
}
