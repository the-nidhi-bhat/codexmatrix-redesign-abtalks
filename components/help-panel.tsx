"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Keyboard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

type Shortcut = {
  keys: string[]
  label: string
}

const SHORTCUTS: { group: string; items: Shortcut[] }[] = [
  {
    group: "Navigation",
    items: [
      { keys: ["G", "D"], label: "Go to dashboard" },
      { keys: ["G", "T"], label: "Go to today" },
      { keys: ["G", "H"], label: "Go home" },
    ],
  },
  {
    group: "Actions",
    items: [
      { keys: ["N"], label: "Focus proof entry (on Today)" },
      { keys: ["T"], label: "Toggle light / dark" },
      { keys: ["?"], label: "Open this panel" },
      { keys: ["Esc"], label: "Close panel" },
    ],
  },
]

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 font-mono text-[0.7rem] font-medium text-foreground shadow-[0_1px_0_0_var(--color-border)]">
      {children}
    </kbd>
  )
}

export function HelpPanel() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { toggleTheme } = useTheme()
  const lastKey = React.useRef<{ key: string; at: number } | null>(null)

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      if (typing) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toLowerCase()

      if (key === "?") {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      if (key === "t") {
        toggleTheme()
        return
      }

      // Two-key "g" chords for navigation.
      const now = Date.now()
      const prev = lastKey.current
      if (prev && prev.key === "g" && now - prev.at < 800) {
        if (key === "d") router.push("/dashboard")
        else if (key === "t") router.push("/day")
        else if (key === "h") router.push("/")
        lastKey.current = null
        return
      }
      lastKey.current = { key, at: now }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router, toggleTheme])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Keyboard shortcuts" />
        }
      >
        <Keyboard />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm tracking-widest uppercase">
            Keyboard shortcuts
          </DialogTitle>
          <DialogDescription>
            Move fast. The console rewards momentum.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          {SHORTCUTS.map((section) => (
            <div key={section.group} className="flex flex-col gap-2">
              <p className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                {section.group}
              </p>
              <ul className="flex flex-col gap-1.5">
                {section.items.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-foreground/90">{s.label}</span>
                    <span className="flex items-center gap-1">
                      {s.keys.map((k) => (
                        <Kbd key={k}>{k}</Kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
