"use client"

import { useState } from "react"
import { submitProof } from "@/app/actions/challenge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function ProofForm({ dayNumber }: { dayNumber: number }) {
  const [proofText, setProofText] = useState("")
  const [proofUrl, setProofUrl] = useState("")
  const [pending, setPending] = useState(false)

  const count = proofText.trim().length
  const valid = count >= 3

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || pending) return
    setPending(true)
    try {
      await submitProof({ dayNumber, proofText, proofUrl: proofUrl || undefined })
      toast.success(`Day ${dayNumber} committed. Streak intact.`)
      setProofText("")
      setProofUrl("")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit proof.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="proof" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Proof of work
          </Label>
          <span className={`font-mono text-xs ${valid ? "text-ember" : "text-muted-foreground"}`}>
            {count} chars
          </span>
        </div>
        <Textarea
          id="proof"
          value={proofText}
          onChange={(e) => setProofText(e.target.value)}
          placeholder="What did you do today? Be specific. Reps, distance, pages, lines shipped — the receipt that says you showed up."
          rows={5}
          className="resize-none bg-input font-sans text-base leading-relaxed"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="url" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Evidence link <span className="text-muted-foreground/60">(optional)</span>
        </Label>
        <Input
          id="url"
          type="url"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          placeholder="https://strava.com/... or a screenshot URL"
          className="bg-input font-mono text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={!valid || pending}
        className="h-12 bg-ember font-mono text-sm font-semibold uppercase tracking-widest text-ember-foreground hover:bg-ember/90"
      >
        {pending ? "Committing..." : `Commit day ${dayNumber}`}
      </Button>
    </form>
  )
}
