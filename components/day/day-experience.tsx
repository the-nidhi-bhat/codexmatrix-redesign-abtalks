"use client"

import { useState } from "react"
import Link from "next/link"
import type { ChallengeState, DayCell } from "@/app/actions/challenge"
import { ProofForm } from "@/components/day/proof-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check, Lock, Flame, CircleDashed, X } from "lucide-react"

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

const statusMeta: Record<
  DayCell["status"],
  { label: string; className: string; Icon: typeof Check }
> = {
  committed: { label: "Committed", className: "text-ember", Icon: Check },
  today: { label: "Today — open", className: "text-foreground", Icon: Flame },
  missed: { label: "Missed", className: "text-destructive", Icon: X },
  upcoming: { label: "Locked", className: "text-muted-foreground", Icon: Lock },
}

export function DayExperience({ challenge, initialDay }: { challenge: ChallengeState; initialDay?: number }) {
  const [selected, setSelected] = useState(Math.min(Math.max(initialDay ?? challenge.currentDay, 1), challenge.durationDays))
  const day = challenge.days[selected - 1]
  const meta = statusMeta[day.status]

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      {/* Navigator */}
      <aside className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Timeline</span>
          <span className="font-mono text-xs text-muted-foreground">
            {challenge.totalCommitted}/{challenge.durationDays}
          </span>
        </div>

        <div className="grid grid-cols-10 gap-1.5">
          {challenge.days.map((d) => {
            const isSel = d.dayNumber === selected
            const base = "aspect-square rounded-[3px] text-[9px] font-mono transition-all"
            const color =
              d.status === "committed"
                ? "bg-ember text-ember-foreground"
                : d.status === "today"
                  ? "bg-ember/20 text-ember ring-1 ring-ember"
                  : d.status === "missed"
                    ? "bg-destructive/15 text-destructive/70"
                    : "bg-secondary text-muted-foreground/50"
            return (
              <button
                key={d.dayNumber}
                onClick={() => setSelected(d.dayNumber)}
                className={`${base} ${color} ${isSel ? "scale-110 ring-2 ring-foreground" : "hover:scale-105"}`}
                aria-label={`Day ${d.dayNumber}, ${statusMeta[d.status].label}`}
                aria-current={isSel}
              >
                {d.dayNumber}
              </button>
            )
          })}
        </div>

        <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Flame className="size-4 text-ember" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Streak</span>
          </div>
          <p className="font-mono text-3xl font-bold text-foreground">
            {challenge.currentStreak}
            <span className="ml-1 text-sm font-normal text-muted-foreground">days</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Longest run: <span className="font-mono text-foreground">{challenge.longestStreak}</span> days
          </p>
        </div>
      </aside>

      {/* Focus panel */}
      <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 md:p-8">
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {formatDate(day.date)}
            </span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground">
              Day {day.dayNumber}
              <span className="text-muted-foreground"> / {challenge.durationDays}</span>
            </h2>
          </div>
          <div className={`flex items-center gap-2 rounded-full border border-border px-3 py-1.5 ${meta.className}`}>
            <meta.Icon className="size-4" />
            <span className="font-mono text-xs uppercase tracking-wider">{meta.label}</span>
          </div>
        </header>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelected((s) => Math.max(1, s - 1))}
            disabled={selected === 1}
            className="font-mono text-xs"
          >
            <ChevronLeft className="size-4" /> Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelected((s) => Math.min(challenge.durationDays, s + 1))}
            disabled={selected === challenge.durationDays}
            className="font-mono text-xs"
          >
            Next <ChevronRight className="size-4" />
          </Button>
          {selected !== challenge.currentDay && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelected(challenge.currentDay)}
              className="font-mono text-xs text-ember"
            >
              Jump to today
            </Button>
          )}
        </div>

        <div className="h-px w-full bg-border" />

        {/* Body by status */}
        {day.status === "today" && (
          <div className="flex flex-col gap-5">
            <p className="text-pretty leading-relaxed text-muted-foreground">
              This window closes at midnight. Log your proof to keep the streak alive.
            </p>
            <ProofForm dayNumber={day.dayNumber} />
          </div>
        )}

        {day.status === "committed" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-ember">
              <Check className="size-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Proof on record</span>
            </div>
            <blockquote className="rounded-lg border border-ember/30 bg-ember/5 p-5 text-pretty leading-relaxed text-foreground">
              {day.proofText || "No note recorded."}
            </blockquote>
            {day.proofUrl && (
              <a
                href={day.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit font-mono text-sm text-ember underline underline-offset-4 hover:text-ember/80"
              >
                View evidence →
              </a>
            )}
          </div>
        )}

        {day.status === "missed" && (
          <div className="flex flex-col items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-6">
            <div className="flex items-center gap-2 text-destructive">
              <X className="size-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Day missed</span>
            </div>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              This day is closed and cannot be backfilled — that&apos;s the point. Missing a day resets your current
              streak, but the challenge continues. Show up today.
            </p>
          </div>
        )}

        {day.status === "upcoming" && (
          <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-secondary/40 p-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CircleDashed className="size-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Not yet unlocked</span>
            </div>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              This day opens on {formatDate(day.date)}. You can only commit proof for the current day — no working ahead.
            </p>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">Your commitment</p>
          <Link href="/dashboard" className="font-mono text-xs text-ember hover:underline">
            Back to dashboard →
          </Link>
        </div>
        {challenge.commitment && (
          <p className="-mt-3 text-pretty text-sm italic leading-relaxed text-foreground">
            &ldquo;{challenge.commitment}&rdquo;
          </p>
        )}
      </section>
    </div>
  )
}
