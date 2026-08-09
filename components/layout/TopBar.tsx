"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useApp, ScenarioKey } from "@/lib/store";
import { HelpPanel } from "./HelpPanel";
import { useShortcuts } from "@/hooks/useShortcuts";

const SCENARIO_LABELS: Record<ScenarioKey, string> = {
  active: "Nidhi — Day 12, active streak",
  "first-day": "Rohan — Day 1, no streak yet",
  "missed-day": "Aisha — missed a day",
  empty: "Karan — empty profile",
};

export function TopBar() {
  const { theme, setTheme, hydrated } = useTheme();
  const { scenario, setScenario } = useApp();
  const [helpOpen, setHelpOpen] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(false);
  useShortcuts(() => setHelpOpen(true));

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 h-14 flex items-center justify-between px-4 border-b border-border-subtle bg-base/85 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="ABTalks" width={28} height={28} className="rounded-md" />
          <span className="font-display text-lg tracking-wide hidden xs:inline">ABTALKS</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              onClick={() => setScenarioOpen((v) => !v)}
              className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-full border border-border-subtle bg-elevated text-text-secondary hover:text-text-primary transition-colors max-w-[38vw]"
              aria-label="Preview a demo state"
            >
              <span className="truncate">{SCENARIO_LABELS[scenario].split(" —")[0]}</span>
              <ChevronDown size={12} className="shrink-0" />
            </button>
            <AnimatePresence>
              {scenarioOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-border-subtle bg-surface shadow-2xl overflow-hidden"
                >
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-text-tertiary border-b border-border-subtle">
                    Preview demo state
                  </div>
                  {(Object.keys(SCENARIO_LABELS) as ScenarioKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setScenario(key);
                        setScenarioOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs hover:bg-elevated transition-colors ${
                        scenario === key ? "text-primary" : "text-text-secondary"
                      }`}
                    >
                      {SCENARIO_LABELS[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full border border-border-subtle bg-elevated text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {hydrated ? (
              theme === "dark" ? <Sun size={15} /> : <Moon size={15} />
            ) : (
              <span className="block size-[15px]" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => setHelpOpen(true)}
            className="p-2 rounded-full border border-border-subtle bg-elevated text-text-secondary hover:text-text-primary transition-colors"
            aria-label="How ABTalks works"
          >
            <Info size={15} />
          </button>
        </div>
      </header>

      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
