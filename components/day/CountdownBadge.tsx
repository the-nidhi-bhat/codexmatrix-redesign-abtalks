"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getCountdownToMidnightIST } from "@/lib/utils";

export function CountdownBadge() {
  const [time, setTime] = useState(getCountdownToMidnightIST());

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdownToMidnightIST()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const urgent = time.totalMs < 1000 * 60 * 60 * 2;

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border ${
        urgent
          ? "bg-missed/15 border-missed/30 text-missed"
          : "bg-elevated border-border-subtle text-text-secondary"
      }`}
    >
      <Clock size={12} />
      <span className="tabular-nums">
        {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </span>
      <span>left · midnight IST</span>
    </div>
  );
}
