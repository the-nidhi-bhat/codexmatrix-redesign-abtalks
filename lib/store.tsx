"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { DAY_STATES, PROFILE_SCENARIOS, type DayStatus, type Proof } from "./mock-data"

type ScenarioKey = keyof typeof PROFILE_SCENARIOS
interface AppState {
  scenario: ScenarioKey
  setScenario: (scenario: ScenarioKey) => void
  profile: (typeof PROFILE_SCENARIOS)[ScenarioKey]
  dayStates: Record<number, DayStatus>
  proofs: Record<number, Proof>
  submitProof: (proof: Proof) => void
  useStreakFreeze: (day: number) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = useState<ScenarioKey>("active")
  const [proofs, setProofs] = useState<Record<number, Proof>>({})
  const [extraDayStates, setExtraDayStates] = useState<Record<number, DayStatus>>({})
  const submitProof = useCallback((proof: Proof) => {
    setProofs((previous) => ({ ...previous, [proof.day]: proof }))
    setExtraDayStates((previous) => ({ ...previous, [proof.day]: "done" }))
  }, [])
  const useStreakFreeze = useCallback((day: number) => {
    setExtraDayStates((previous) => ({ ...previous, [day]: "frozen" }))
  }, [])
  const profile = PROFILE_SCENARIOS[scenario]
  const dayStates = useMemo(() => ({ ...DAY_STATES[scenario], ...extraDayStates }), [scenario, extraDayStates])
  return <AppContext.Provider value={{ scenario, setScenario, profile, dayStates, proofs, submitProof, useStreakFreeze }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}

export type { ScenarioKey }
