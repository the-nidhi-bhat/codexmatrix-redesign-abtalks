"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Target, Snowflake } from "lucide-react";
import { useApp } from "@/lib/store";

export function StatsGrid() {
  const { profile } = useApp();
  const progressPct = Math.round((profile.currentDay / 60) * 100);

  return (
    <div className="px-5 mt-5 grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="col-span-2 p-4 rounded-2xl bg-gradient-to-br from-today/15 to-transparent border border-today/20 flex items-center justify-between"
      >
        <div>
          <p className="text-[11px] uppercase tracking-wider text-text-tertiary mb-1">Current streak</p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl text-today">{profile.currentStreak}</span>
            <span className="text-sm text-text-secondary">
              day{profile.currentStreak === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <motion.div
          animate={
            profile.currentStreak > 0
              ? { scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }
              : { opacity: 0.35 }
          }
          transition={{ duration: 2.2, repeat: profile.currentStreak > 0 ? Infinity : 0, ease: "easeInOut" }}
        >
          <Flame
            size={40}
            className={profile.currentStreak > 0 ? "text-today" : "text-text-tertiary"}
            fill={profile.currentStreak > 0 ? "var(--accent-today)" : "none"}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-2xl bg-surface border border-border-subtle"
      >
        <div className="flex items-center gap-1.5 text-text-tertiary mb-2">
          <Target size={13} />
          <p className="text-[11px] uppercase tracking-wider">Progress</p>
        </div>
        <p className="font-display text-2xl">
          {profile.currentDay}
          <span className="text-text-tertiary text-sm font-body">/60</span>
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-elevated-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <p className="text-[11px] text-text-tertiary mt-1.5">{progressPct}% complete</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-4 rounded-2xl bg-surface border border-border-subtle"
      >
        <div className="flex items-center gap-1.5 text-text-tertiary mb-2">
          <TrendingUp size={13} />
          <p className="text-[11px] uppercase tracking-wider">Consistency</p>
        </div>
        <p className="font-display text-2xl">{profile.consistencyScore}%</p>
        <p className="text-[11px] text-text-tertiary mt-1.5">
          Longest streak: {profile.longestStreak}d
        </p>
      </motion.div>

      {profile.streakFreezesAvailable > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 flex items-center gap-2.5 p-3 rounded-xl bg-freeze/10 border border-freeze/20"
        >
          <Snowflake size={16} className="text-freeze shrink-0" />
          <p className="text-[12px] text-text-secondary">
            <span className="text-freeze font-medium">{profile.streakFreezesAvailable} streak freeze</span>{" "}
            available — auto-protects your streak the next time you miss a day.
          </p>
        </motion.div>
      )}
    </div>
  );
}
