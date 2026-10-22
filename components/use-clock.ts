"use client";

import { useEffect, useState } from "react";

function format(now: Date) {
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const time = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes}`;
  const date = now.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return { time, date };
}

export function useClock() {
  const [value, setValue] = useState({ time: "", date: "" });

  useEffect(() => {
    setValue(format(new Date()));
    const id = setInterval(() => setValue(format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);

  return value;
}
