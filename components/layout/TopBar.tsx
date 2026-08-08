"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Info, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { HelpPanel } from "./HelpPanel"
import { useShortcuts } from "@/hooks/useShortcuts"

export function TopBar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [helpOpen, setHelpOpen] = useState(false)
  const mountedTheme = resolvedTheme === "light" || resolvedTheme === "dark"
  useShortcuts(() => setHelpOpen(true))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border-subtle bg-base/85 px-4 backdrop-blur-xl">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="ABTalkS" width={28} height={28} className="rounded-md" style={{ height: "auto" }} />
          <span className="hidden font-display text-lg tracking-wide xs:inline">ABTALKS</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full border border-border-subtle bg-elevated p-2 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Toggle theme"
          >
            {!mountedTheme ? <span className="block size-[15px]" aria-hidden="true" /> : resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setHelpOpen(true)}
            className="rounded-full border border-border-subtle bg-elevated p-2 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="How ABTalkS works"
          >
            <Info size={15} />
          </button>
        </div>
      </header>
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}
