"use client";

import { useEffect, useState } from "react";

function yangonNow(): string {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const yangon = new Date(utcMs + 6.5 * 60 * 60_000);
  const hh = String(yangon.getHours()).padStart(2, "0");
  const mm = String(yangon.getMinutes()).padStart(2, "0");
  const ss = String(yangon.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function YangonClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(yangonNow());
    const id = setInterval(() => setTime(yangonNow()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time ?? "--:--:--"}
    </span>
  );
}
