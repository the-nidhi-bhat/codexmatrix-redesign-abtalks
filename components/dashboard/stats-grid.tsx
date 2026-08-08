import { Flame, Trophy, CheckCircle2, Percent } from "lucide-react"
import type { ChallengeState } from "@/app/actions/challenge"
import { StatCard } from "@/components/dashboard/stat-card"

export function StatsGrid({ challenge }: { challenge: ChallengeState }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard
        icon={Flame}
        label="Current streak"
        value={challenge.currentStreak}
        suffix="days"
        accent
      />
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
    </div>
  )
}
