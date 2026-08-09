"use client"

import { motion } from "framer-motion"
import { Flame, Trophy, CheckCircle2, Percent } from "lucide-react"
import type { ChallengeState } from "@/app/actions/challenge"
import { StatCard } from "@/components/dashboard/stat-card"

export function StatsGrid({ challenge }: { challenge: ChallengeState }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.3 }}>
      <StatCard
        icon={Flame}
        label="Current streak"
        value={challenge.currentStreak}
        suffix="days"
        accent
      />
      </motion.div>
      <StatCard
        icon={Trophy}
        label="Longest streak"
        value={challenge.longestStreak}
        suffix="days"
      />
      <StatCard
        icon={CheckCircle2}
        label="Days committed"
        value={challenge.totalCommitted}
        suffix={`/ ${challenge.durationDays}`}
      />
      <StatCard
        icon={Percent}
        label="Completion"
        value={challenge.completionRate}
        suffix="%"
      />
    </motion.div>
  )
}
