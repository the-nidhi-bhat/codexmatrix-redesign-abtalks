"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { createChallenge } from "@/app/actions/challenge"

const tracks = [
  { label: "Web Dev", value: "web-dev" },
  { label: "DSA", value: "dsa" },
  { label: "ML/AI", value: "ml-ai" },
  { label: "App Dev", value: "app-dev" },
]

export function EmptyState() {
  const router = useRouter()
  const [track, setTrack] = useState("web-dev")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function startChallenge() {
    setPending(true)
    setError("")
    try {
      await createChallenge({ title: "ABTalkS 60-Day Challenge", commitment: "I will show up, build in public, and post proof every day.", track, durationDays: 60 })
      router.push("/dashboard")
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not start challenge")
      setPending(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
      <div className="rounded-3xl border border-dashed border-border-strong p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15"><Sparkles size={20} className="text-primary" /></div>
        <h2 className="font-display text-2xl tracking-wide">NO STREAK YET.</h2>
        <p className="mx-auto mt-2 max-w-[26rem] text-[13px] text-text-secondary">Pick a track and start your real ABTalkS challenge. Your dashboard fills up when you submit Day 1 proof.</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {tracks.map((item) => <button key={item.value} type="button" onClick={() => setTrack(item.value)} className={`rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-colors ${track === item.value ? "border-primary/40 bg-primary/15 text-primary" : "border-border-subtle bg-elevated text-text-secondary"}`}>{item.label}</button>)}
        </div>
        {error && <p className="mt-4 text-xs text-missed">{error}</p>}
        <motion.button type="button" disabled={pending} onClick={startChallenge} whileTap={{ scale: 0.96 }} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{pending ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />} {pending ? "Starting..." : "Start Day 1"}</motion.button>
      </div>
    </motion.div>
  )
}
