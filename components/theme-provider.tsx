"use client"

import * as React from "react"

type Theme = "dark" | "light"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "sixty-theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark")
  const [hydrated, setHydrated] = React.useState(false)

  // Load stored preference (default dark) on mount.
  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial: Theme = stored ?? "dark"
    setThemeState(initial)
    setHydrated(true)
  }, [])

  // Apply the theme class to <html>.
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.classList.toggle("light", theme === "light")
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = React.useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = React.useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  )

  const value = React.useMemo(
    () => ({ theme, toggleTheme, setTheme, hydrated }),
    [theme, toggleTheme, setTheme, hydrated]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
