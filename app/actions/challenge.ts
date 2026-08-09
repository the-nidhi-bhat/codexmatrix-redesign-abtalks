"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { challenge, dayLog } from "@/lib/db/schema"
import { and, asc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    // In development, return a demo user id so the dashboard can render
    // without an authenticated session. In production, keep the strict
    // behavior and throw an error.
    if (process.env.NODE_ENV === "development") {
      return "dev-user"
    }
    throw new Error("Unauthorized")
  }
  return session.user.id
}

// ---------------------------------------------------------------------------
// Date helpers — everything is computed in plain calendar-day terms (UTC-safe
// by using ISO date strings YYYY-MM-DD).
// ---------------------------------------------------------------------------
function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function todayISO(): string {
  return toISODate(new Date())
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00Z")
  d.setUTCDate(d.getUTCDate() + days)
  return toISODate(d)
}

function daysBetween(startIso: string, endIso: string): number {
  const a = new Date(startIso + "T00:00:00Z").getTime()
  const b = new Date(endIso + "T00:00:00Z").getTime()
  return Math.round((b - a) / 86_400_000)
}

// ---------------------------------------------------------------------------
// Types shared with the client
// ---------------------------------------------------------------------------
export type DayStatus = "committed" | "missed" | "today" | "upcoming"

export type DayCell = {
  dayNumber: number
  date: string
  status: DayStatus
  proofText: string
  proofUrl: string | null
}

export type ChallengeState = {
  id: number
  title: string
  commitment: string
  durationDays: number
  startDate: string
  currentDay: number // 1-based index of "today" within the challenge, clamped
  days: DayCell[]
  currentStreak: number
  longestStreak: number
  totalCommitted: number
  completionRate: number // 0-100 over elapsed days
  isComplete: boolean
}

// ---------------------------------------------------------------------------
// Read the active challenge for the current user (or null if none).
// ---------------------------------------------------------------------------
export async function getChallenge(): Promise<ChallengeState | null> {
  const userId = await getUserId()
  let c: any
  try {
    const rows = await db
      .select()
      .from(challenge)
      .where(and(eq(challenge.userId, userId), eq(challenge.isActive, true)))
      .limit(1)
    c = rows[0]
  } catch (err) {
    // If the DB isn't configured locally (e.g., no DATABASE_URL), allow
    // the app to render an empty dashboard during development instead of
    // crashing the server.
    console.error("getChallenge: DB query failed", err)
    return null
  }
  if (!c) return null

  const logs = await db
    .select()
    .from(dayLog)
    .where(and(eq(dayLog.userId, userId), eq(dayLog.challengeId, c.id)))
    .orderBy(asc(dayLog.dayNumber))

  const logByDay = new Map<number, (typeof logs)[number]>()
  for (const l of logs) logByDay.set(l.dayNumber, l)

  const today = todayISO()
  const start = c.startDate
  // Day 1 == startDate. currentDay is 1-based.
  const elapsed = daysBetween(start, today) // 0 on start day
  const currentDay = Math.min(Math.max(elapsed + 1, 1), c.durationDays)
  const isComplete = elapsed >= c.durationDays

  const days: DayCell[] = []
  for (let n = 1; n <= c.durationDays; n++) {
    const date = addDays(start, n - 1)
    const log = logByDay.get(n)
    let status: DayStatus
    if (log) {
      status = "committed"
    } else if (date === today) {
      status = "today"
    } else if (date < today) {
      status = "missed"
    } else {
      status = "upcoming"
    }
    days.push({
      dayNumber: n,
      date,
      status,
      proofText: log?.proofText ?? "",
      proofUrl: log?.proofUrl ?? null,
    })
  }

  // --- Streak computation (server-side, source of truth) ------------------
  const committedDays = new Set(logs.map((l) => l.dayNumber))
  const totalCommitted = committedDays.size

  let longestStreak = 0
  let run = 0
  for (let n = 1; n <= c.durationDays; n++) {
    if (committedDays.has(n)) {
      run++
      longestStreak = Math.max(longestStreak, run)
    } else {
      run = 0
    }
  }

  // Current streak: consecutive committed days ending at today or yesterday.
  // We look backwards from the most recent day that could be committed.
  let currentStreak = 0
  const anchor = Math.min(currentDay, c.durationDays)
  // If today isn't committed yet, the streak can still be "alive" from prior days.
  let cursor = committedDays.has(anchor) ? anchor : anchor - 1
  while (cursor >= 1 && committedDays.has(cursor)) {
    currentStreak++
    cursor--
  }

  const elapsedDays = Math.min(Math.max(elapsed + 1, 0), c.durationDays)
  const completionRate =
    elapsedDays > 0 ? Math.round((totalCommitted / elapsedDays) * 100) : 0

  return {
    id: c.id,
    title: c.title,
    commitment: c.commitment,
    durationDays: c.durationDays,
    startDate: start,
    currentDay,
    days,
    currentStreak,
    longestStreak,
    totalCommitted,
    completionRate: Math.min(completionRate, 100),
    isComplete,
  }
}

// ---------------------------------------------------------------------------
// Create (or restart) the active challenge.
// ---------------------------------------------------------------------------
export async function createChallenge(input: {
  title: string
  commitment: string
  track?: string
  durationDays?: number
}) {
  const userId = await getUserId()

  // Deactivate any existing active challenge.
  await db
    .update(challenge)
    .set({ isActive: false })
    .where(and(eq(challenge.userId, userId), eq(challenge.isActive, true)))

  const title = input.title.trim().slice(0, 120) || "My 60-Day Challenge"
  const commitment = input.commitment.trim().slice(0, 400)
  const track = (input.track || "fullstack").trim().slice(0, 40)
  const durationDays = Math.min(Math.max(input.durationDays ?? 60, 7), 365)

  await db.insert(challenge).values({
    userId,
    title,
    commitment,
    track,
    durationDays,
    startDate: todayISO(),
    isActive: true,
  })

  revalidatePath("/dashboard")
  revalidatePath("/day")
}

// ---------------------------------------------------------------------------
// Submit proof for a specific day. Only today's day is submittable.
// ---------------------------------------------------------------------------
export async function submitProof(input: {
  dayNumber: number
  proofText: string
  proofUrl?: string
  githubUrl?: string
  linkedinUrl?: string
}) {
  const userId = await getUserId()

  const rows = await db
    .select()
    .from(challenge)
    .where(and(eq(challenge.userId, userId), eq(challenge.isActive, true)))
    .limit(1)
  const c = rows[0]
  if (!c) throw new Error("No active challenge")

  const today = todayISO()
  const elapsed = daysBetween(c.startDate, today)
  const currentDay = elapsed + 1

  if (input.dayNumber !== currentDay) {
    throw new Error("You can only submit proof for today.")
  }
  if (currentDay < 1 || currentDay > c.durationDays) {
    throw new Error("Challenge is not active today.")
  }

  const proofText = input.proofText.trim().slice(0, 2000)
  if (proofText.length < 3) {
    throw new Error("Proof must be at least 3 characters.")
  }
  const proofUrl = input.proofUrl?.trim().slice(0, 500) || null
  const githubUrl = input.githubUrl?.trim().slice(0, 500) || null
  const linkedinUrl = input.linkedinUrl?.trim().slice(0, 500) || null

  // Prevent duplicate submissions for the same day.
  const existing = await db
    .select()
    .from(dayLog)
    .where(and(eq(dayLog.challengeId, c.id), eq(dayLog.dayNumber, currentDay)))
    .limit(1)

  if (existing[0]) {
    await db
      .update(dayLog)
      .set({ proofText, proofUrl, githubUrl, linkedinUrl })
      .where(and(eq(dayLog.id, existing[0].id), eq(dayLog.userId, userId)))
  } else {
    await db.insert(dayLog).values({
      userId,
      challengeId: c.id,
      dayNumber: currentDay,
      logDate: today,
      proofText,
      proofUrl,
      githubUrl,
      linkedinUrl,
    })
  }

  revalidatePath("/dashboard")
  revalidatePath("/day")
}

// ---------------------------------------------------------------------------
// Spend the single freeze on the previous missed day.
// ---------------------------------------------------------------------------
export async function useStreakFreeze(dayNumber: number) {
  const userId = await getUserId()
  const rows = await db.select().from(challenge).where(and(eq(challenge.userId, userId), eq(challenge.isActive, true))).limit(1)
  const c = rows[0]
  if (!c || c.freezeUsed) throw new Error("No streak freeze available")
  const target = Math.max(1, Math.floor(dayNumber))
  const existing = await db.select().from(dayLog).where(and(eq(dayLog.challengeId, c.id), eq(dayLog.dayNumber, target))).limit(1)
  if (existing[0]) throw new Error("That day is already committed")
  await db.insert(dayLog).values({ userId, challengeId: c.id, dayNumber: target, logDate: addDays(c.startDate, target - 1), proofText: "Streak freeze used", proofUrl: null, githubUrl: null, linkedinUrl: null })
  await db.update(challenge).set({ freezeUsed: true }).where(and(eq(challenge.id, c.id), eq(challenge.userId, userId)))
  revalidatePath("/dashboard")
  revalidatePath("/day")
}

// ---------------------------------------------------------------------------
// Aggregate community stats for the landing page (no auth required).
// ---------------------------------------------------------------------------
export async function getCommunityStats() {
  const allChallenges = await db.select().from(challenge)
  const allLogs = await db.select().from(dayLog)
  return {
    challengers: new Set(allChallenges.map((c) => c.userId)).size,
    proofsSubmitted: allLogs.length,
    activeChallenges: allChallenges.filter((c) => c.isActive).length,
  }
}
