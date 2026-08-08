import type { DayStatus } from "@/app/actions/challenge"

// Maps a day status to its cell class. The ember ramp is the signature of the
// whole product — committed days glow, misses stay dark.
export function cellClasses(status: DayStatus): string {
  switch (status) {
    case "committed":
      return "bg-primary text-primary-foreground border-primary/40 shadow-[0_0_12px_-2px_var(--color-primary)]"
    case "today":
      return "bg-accent text-accent-foreground border-primary/60 animate-ember"
    case "missed":
      return "bg-destructive/10 text-destructive/70 border-destructive/25"
    case "upcoming":
    default:
      return "bg-muted/50 text-muted-foreground/50 border-border"
  }
}

export const STATUS_LABEL: Record<DayStatus, string> = {
  committed: "Proof committed",
  today: "Today — awaiting proof",
  missed: "Missed",
  upcoming: "Upcoming",
}
