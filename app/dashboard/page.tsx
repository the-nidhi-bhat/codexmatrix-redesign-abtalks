import Link from "next/link"
import { getChallenge } from "@/app/actions/challenge"
import { DayExperience } from "@/components/day/day-experience"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { TopBar } from "@/components/layout/TopBar"
import { BottomNav } from "@/components/layout/BottomNav"

export default async function DashboardPage() {
  const challenge = await getChallenge()

  return (
    <>
      <TopBar />
      <main className="mx-auto min-h-screen max-w-6xl px-5 pb-28 pt-24 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">ABTalkS / Dashboard</p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-wide text-foreground md:text-6xl">Your proof board</h1>
          </div>
          <Link href="/" className="hidden rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground md:block">Home</Link>
        </div>
        {challenge ? <DayExperience challenge={challenge} /> : <EmptyState />}
      </main>
      <BottomNav />
    </>
  )
}
