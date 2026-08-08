import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getChallenge } from "@/app/actions/challenge"
import { AppNav } from "@/components/app-nav"
import { DayExperience } from "@/components/day/day-experience"

export default async function DayPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  const challenge = await getChallenge()
  if (!challenge) redirect("/dashboard")

  const userName = session.user.name || session.user.email.split("@")[0]

  return (
    <div className="min-h-svh">
      <AppNav userName={userName} />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        <div className="animate-rise flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-widest text-ember">Daily check-in</span>
          <h1 className="text-balance font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {challenge.title}
          </h1>
        </div>
        <div className="animate-rise [animation-delay:80ms]">
          <DayExperience challenge={challenge} />
        </div>
      </main>
    </div>
  )
}
