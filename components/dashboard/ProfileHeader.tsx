"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy } from "lucide-react";
import { useApp } from "@/lib/store";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#67e8f9"];

export function ProfileHeader() {
  const { profile } = useApp();
  const color = AVATAR_COLORS[profile.avatarSeed.length % AVATAR_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3.5 px-5 pt-5"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center font-display text-lg shrink-0"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 22%, transparent)`, color }}
      >
        {initials(profile.name)}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-[17px] truncate">{profile.name}</h1>
          {profile.badges.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-today/15 text-today font-medium shrink-0">
              {profile.badges[0]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
          <GraduationCap size={12} className="shrink-0" />
          <span className="truncate">
            {profile.branch} · {profile.college}
          </span>
        </div>
        {profile.rank > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-text-tertiary mt-0.5">
            <Trophy size={12} className="shrink-0" />
            <span>
              Rank #{profile.rank} of {profile.totalStudents}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
