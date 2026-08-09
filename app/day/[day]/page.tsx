import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getChallenge } from "@/app/actions/challenge"
import { DayExperience } from "@/components/day/day-experience"
import { TopBar } from "@/components/layout/TopBar"
import { BottomNav } from "@/components/layout/BottomNav"

export const dynamic = "force-dynamic"

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")
  const { day: dayParam } = await params
  const challenge = await getChallenge()
  const requestedDay = Number.parseInt(dayParam, 10) || 1

  return (
    <>
      <TopBar />
      <main className="mx-auto min-h-screen max-w-6xl px-5 pb-28 pt-24 md:px-8">
        {challenge ? <DayExperience challenge={challenge} initialDay={requestedDay} /> : <p className="font-mono text-sm text-muted-foreground">Start your ABTalkS challenge from the dashboard.</p>}
      </main>
      <BottomNav />
    </>
  )
}
