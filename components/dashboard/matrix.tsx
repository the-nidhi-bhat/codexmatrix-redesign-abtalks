"use client"

import * as React from "react"
import Link from "next/link"
import { Flame, Link2, CalendarDays } from "lucide-react"
import type { DayCell } from "@/app/actions/challenge"
import { cellClasses, STATUS_LABEL } from "@/lib/matrix"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function Matrix({ days }: { days: DayCell[] }) {
  const [selected, setSelected] = React.useState<DayCell | null>(null)

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-sans text-lg font-semibold">The Matrix</h2>
          <p className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            60 days · one cell each
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px] bg-primary" /> done
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px] bg-destructive/20" /> miss
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px] bg-muted" /> next
          </span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
        {days.map((d) => {
          const interactive = d.status === "committed" || d.status === "today"
          return (
            <button
              key={d.dayNumber}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && setSelected(d)}
              aria-label={`Day ${d.dayNumber}: ${STATUS_LABEL[d.status]}`}
              title={`Day ${d.dayNumber} — ${STATUS_LABEL[d.status]}`}
              className={`group relative flex aspect-square items-center justify-center rounded-[5px] border font-mono text-[0.6rem] transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${cellClasses(
                d.status
              )} ${interactive ? "cursor-pointer hover:scale-[1.12]" : "cursor-default"}`}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                {d.dayNumber}
              </span>
            </button>
          )
        })}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-mono text-sm tracking-widest uppercase">
                  <Flame className="size-4 text-primary" />
                  Day {selected.dayNumber}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  {formatDate(selected.date)}
                </DialogDescription>
              </DialogHeader>

              {selected.status === "today" && !selected.proofText ? (
                <div className="flex flex-col gap-4 py-2">
                  <p className="text-sm text-muted-foreground">
                    Today is unlogged. Submit your proof to keep the streak
                    alive.
                  </p>
                  <Button render={<Link href="/day" />} className="w-full">
                    Log today&apos;s proof
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 py-1">
                  <p className="rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                    {selected.proofText || "No note recorded."}
                  </p>
                  {selected.proofUrl && (
                    <a
                      href={
                        selected.proofUrl.startsWith("http")
                          ? selected.proofUrl
                          : `https://${selected.proofUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-primary underline-offset-4 hover:underline"
                    >
                      <Link2 className="size-3.5" />
                      {selected.proofUrl}
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
