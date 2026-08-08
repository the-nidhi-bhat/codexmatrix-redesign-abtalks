"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Flame, Lock, Snowflake, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/store";
import { DayStatus, getChallengeDay } from "@/lib/mock-data";

const STATUS_STYLE: Record<DayStatus, string> = {
  done: "bg-done/15 text-done border-done/30",
  missed: "bg-missed/15 text-missed border-missed/30",
  today: "bg-today text-black border-today font-bold",
  locked: "bg-elevated text-text-tertiary border-border-subtle",
  frozen: "bg-freeze/15 text-freeze border-freeze/30",
};

const STATUS_ICON: Record<DayStatus, React.ReactNode> = {
  done: <Check size={11} strokeWidth={3} />,
  missed: <X size={11} strokeWidth={3} />,
  today: <Flame size={12} strokeWidth={2.5} />,
  locked: <Lock size={10} />,
  frozen: <Snowflake size={11} />,
};

export function DayMatrix() {
  const { dayStates, profile, proofs } = useApp();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="px-5 mt-7">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xl tracking-wide">60-DAY MAP</h2>
        <div className="flex items-center gap-2.5 text-[10px] text-text-tertiary">
          <Legend color="var(--accent-done)" label="Done" />
          <Legend color="var(--accent-missed)" label="Missed" />
          <Legend color="var(--accent-freeze)" label="Frozen" />
        </div>
      </div>

      <div className="grid grid-cols-8 xs:grid-cols-10 gap-1.5">
        {Array.from({ length: 60 }, (_, i) => i + 1).map((day) => {
          const status = dayStates[day];
          return (
            <motion.button
              key={day}
              onClick={() => status !== "locked" && setSelected(day)}
              whileTap={status !== "locked" ? { scale: 0.88 } : undefined}
              disabled={status === "locked"}
              className={`aspect-square rounded-lg border flex items-center justify-center text-[10px] relative ${STATUS_STYLE[status]} ${
                status === "locked" ? "cursor-default" : "cursor-pointer"
              }`}
              aria-label={`Day ${day}: ${status}`}
            >
              {status === "today" ? (
                STATUS_ICON[status]
              ) : status === "locked" ? (
                <span className="opacity-50">{day}</span>
              ) : (
                <span className="absolute inset-0 flex items-center justify-center opacity-90">
                  {STATUS_ICON[status]}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <DayPreviewModal
            day={selected}
            status={dayStates[selected]}
            track={profile.track}
            hasProof={Boolean(proofs[selected])}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function DayPreviewModal({
  day,
  status,
  track,
  hasProof,
  onClose,
}: {
  day: number;
  status: DayStatus;
  track: import("@/lib/mock-data").Track;
  hasProof: boolean;
  onClose: () => void;
}) {
  const info = getChallengeDay(day, track);

  const statusCopy: Record<DayStatus, string> = {
    done: "Completed",
    missed: "Missed — streak reset here",
    today: "Today's task",
    locked: "Not unlocked yet",
    frozen: "Protected by a streak freeze",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="fixed left-1/2 bottom-0 xs:bottom-auto xs:top-1/2 -translate-x-1/2 xs:-translate-y-1/2 w-full xs:w-[380px] max-w-[calc(100%-2rem)] xs:max-w-[380px] bg-surface border border-border-subtle rounded-t-3xl xs:rounded-3xl z-50 p-5"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className={`text-[10px] px-2 py-1 rounded-full font-medium ${STATUS_STYLE[status]}`}
            >
              {statusCopy[status]}
            </span>
            <h3 className="font-display text-2xl mt-2">DAY {day}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-elevated" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm font-medium">{info.title}</p>
        <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed line-clamp-3">
          {info.overview}
        </p>
        {hasProof && (
          <p className="text-[12px] text-done mt-2 flex items-center gap-1">
            <Check size={13} /> Proof submitted
          </p>
        )}
        {status !== "locked" && (
          <Link href={`/day/${day}`}>
            <motion.span
              whileTap={{ scale: 0.97 }}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-white text-sm font-semibold"
            >
              Open Day {day} <ArrowRight size={14} />
            </motion.span>
          </Link>
        )}
      </motion.div>
    </>
  );
}
