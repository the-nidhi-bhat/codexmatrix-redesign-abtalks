"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { HelpPanel } from "@/components/help-panel"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/day", label: "Today" },
]

export function AppNav({ userName }: { userName?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Brand href="/dashboard" />
          <nav className="hidden items-center gap-1 sm:flex">
            {LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-0.5">
          {userName ? (
            <span className="mr-2 hidden font-mono text-xs text-muted-foreground md:inline">
              {userName}
            </span>
          ) : null}
          <HelpPanel />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  )
}
