"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GitCommit, Share2 } from "lucide-react";
import { TRUST_STATS } from "@/lib/mock-data";
import { CountUp } from "@/components/ui/CountUp";

export function Hero() {
  return (
    <section className="px-5 pt-8 pb-10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border border-border-subtle bg-elevated text-text-secondary mb-5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-done animate-pulse" />
        <CountUp to={TRUST_STATS.activeStudents} /> students building right now
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="font-display text-[13vw] xs:text-5xl leading-[0.95] tracking-wide"
      >
        CODE
        <br />
        <span className="relative marker-underline">
          EVERY DAY
          <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M2 14 C 60 20, 120 6, 180 12 S 280 18, 298 8"
              stroke="var(--accent-today)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <br />
        FOR 60.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-5 text-text-secondary text-[15px] leading-relaxed max-w-md"
      >
        Pick a track. Build something real every night. Post proof — a commit
        and a LinkedIn update — and let your streak do the talking to
        recruiters.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-7 flex flex-col xs:flex-row gap-3"
      >
        <Link href="/dashboard">
          <motion.span
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative flex items-center justify-center gap-2 w-full xs:w-auto px-6 py-3.5 rounded-full bg-primary text-white font-semibold text-sm overflow-hidden"
            style={{ boxShadow: "0 0 0 0 var(--accent-primary)" }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: ["0 0 0 0 rgba(129,140,248,0.5)", "0 0 0 14px rgba(129,140,248,0)"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative z-10">Join the 60-Day Challenge</span>
            <ArrowRight size={16} className="relative z-10" />
          </motion.span>
        </Link>
        <Link href="/day/12">
          <motion.span
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 w-full xs:w-auto px-6 py-3.5 rounded-full border border-border-strong text-sm font-medium text-text-primary"
          >
            See a sample day
          </motion.span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center gap-4 text-[11px] text-text-tertiary"
      >
        <span className="flex items-center gap-1.5">
          <GitCommit size={13} /> real commits
        </span>
        <span className="flex items-center gap-1.5">
          <Share2 size={13} /> real visibility
        </span>
      </motion.div>
    </section>
  );
}
