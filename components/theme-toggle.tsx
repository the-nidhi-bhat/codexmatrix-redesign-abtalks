"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
    >
      {mounted ? (theme === "dark" ? <Sun size={15} /> : <Moon size={15} />) : (
        <span className="block size-[15px]" aria-hidden="true" />
      )}
    </Button>
  )
}
