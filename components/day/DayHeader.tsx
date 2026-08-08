"use client";

import { motion } from "framer-motion";
import { CountdownBadge } from "./CountdownBadge";
import { Track } from "@/lib/mock-data";

export function DayHeader({ day, track, isToday }: { day: number; track: Track; isToday: boolean }) {
  return (
    <div className="px-5 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium">
          {track}
        </span>
        {isToday && <CountdownBadge />}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="font-display text-6xl tracking-wide mt-3 leading-none"
      >
        DAY {day}
      </motion.h1>
      {!isToday && (
        <p className="text-[12px] text-text-tertiary mt-1.5">
          Viewing outside today&apos;s window — you can still submit late proof.
        </p>
      )}
    </div>
  );
}
