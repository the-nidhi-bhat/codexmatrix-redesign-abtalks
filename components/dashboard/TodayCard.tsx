"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { getChallengeDay } from "@/lib/mock-data";

export function TodayCard() {
  const { profile, proofs } = useApp();
  if (profile.currentDay < 1) return null;

  const today = getChallengeDay(profile.currentDay, profile.track);
  const submitted = Boolean(proofs[profile.currentDay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="mx-5 mt-5"
    >
      <Link href={`/day/${profile.currentDay}`}>
        <motion.div
          whileTap={{ scale: 0.985 }}
          className="p-4 rounded-2xl bg-surface border border-border-subtle flex items-center gap-3"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
                Today · Day {profile.currentDay}
              </span>
              {submitted && (
                <span className="flex items-center gap-1 text-[10px] text-done font-medium">
                  <CheckCircle2 size={11} /> submitted
                </span>
              )}
            </div>
            <p className="font-semibold text-[15px] truncate">{today.title}</p>
            <p className="text-[12px] text-text-secondary mt-0.5 line-clamp-1">
              {profile.track} track · midnight IST deadline
            </p>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
