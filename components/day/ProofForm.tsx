"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GitCommit, Share2, Loader2 } from "lucide-react"
import confetti from "canvas-confetti"
import { submitProof } from "@/app/actions/challenge"

export function ProofForm({ day }: { day: number }) {
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setError("")
    try {
      await submitProof({ dayNumber: day, proofText: `ABTalkS Day ${day} proof`, githubUrl: github, linkedinUrl: linkedin })
      setStatus("success")
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({ particleCount: 70, spread: 65, startVelocity: 32, origin: { y: 0.65 }, colors: ["#818cf8", "#34d399", "#fbbf24"] })
      }
    } catch (caught) {
      setStatus("error")
      setError(caught instanceof Error ? caught.message : "Could not save proof")
    }
  }

  if (status === "success") {
    return <div className="mt-6 rounded-2xl border border-done/25 bg-done/10 p-6 text-center"><div className="stamp-ring mx-auto w-fit rounded-2xl px-5 py-2.5 font-marker text-xl">PROOF LOGGED</div><p className="mt-4 text-sm text-text-secondary">Day {day} is in the books.</p></div>
  }

  return <form onSubmit={handleSubmit} className="mt-6 space-y-3">
    <h3 className="font-display text-xl tracking-wide">SUBMIT PROOF</h3>
    <Field label="GitHub repo or commit URL" icon={<GitCommit size={15} />} value={github} onChange={setGithub} placeholder="https://github.com/you/project" />
    <Field label="LinkedIn post URL" icon={<Share2 size={15} />} value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/posts/you_..." />
    {error && <p className="text-xs text-missed">{error}</p>}
    <motion.button type="submit" disabled={status === "submitting" || !github || !linkedin} whileTap={{ scale: 0.97 }} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white disabled:bg-elevated disabled:text-text-tertiary">
      {status === "submitting" ? <><Loader2 size={16} className="animate-spin" /> Logging proof...</> : "Submit Proof"}
    </motion.button>
    <p className="text-center text-[11px] text-text-tertiary">Both links become part of your public ABTalkS streak.</p>
  </form>
}

function Field({ label, icon, value, onChange, placeholder }: { label: string; icon: React.ReactNode; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="block"><span className="mb-1.5 block text-[11px] uppercase tracking-wider text-text-tertiary">{label}</span><span className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-surface px-3.5 py-3"><span className="text-text-tertiary">{icon}</span><input required type="url" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-text-tertiary" /></span></label>
}

export default ProofForm
