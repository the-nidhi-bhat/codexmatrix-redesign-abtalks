"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, GitCommit, Share2, Flame, Snowflake, Keyboard } from "lucide-react";

export function HelpPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed right-0 top-0 h-dvh w-full sm:w-[420px] bg-surface border-l border-border-subtle z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border-subtle px-5 py-4 flex items-center justify-between">
              <h2 className="font-display text-xl tracking-wide">How it works</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-elevated transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div className="space-y-3">
                {[
                  { n: "01", title: "Pick a track", body: "Web Dev, DSA, ML/AI, or App Dev. One track, 60 days." },
                  { n: "02", title: "Build daily", body: "A new task unlocks every day. Small enough to ship in one sitting." },
                  { n: "03", title: "Post proof", body: "A GitHub commit + a LinkedIn post. That's what recruiters see." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3 p-3 rounded-xl bg-elevated border border-border-subtle">
                    <span className="font-display text-primary text-lg leading-none">{s.n}</span>
                    <div>
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-text-tertiary mb-2">Proof, explained</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm p-2.5 rounded-lg bg-elevated border border-border-subtle">
                    <GitCommit size={15} className="text-done shrink-0" />
                    <span className="text-text-secondary">A public GitHub repo or commit link for today&apos;s build.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm p-2.5 rounded-lg bg-elevated border border-border-subtle">
                    <Share2 size={15} className="text-primary shrink-0" />
                    <span className="text-text-secondary">A LinkedIn post so your streak becomes visible, not just logged.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-text-tertiary mb-2">Streaks &amp; freezes</h3>
                <div className="flex items-start gap-2.5 text-sm p-3 rounded-lg bg-today/10 border border-today/20">
                  <Flame size={16} className="text-today shrink-0 mt-0.5" />
                  <p className="text-text-secondary">
                    Miss midnight and your streak resets — unless you spend a{" "}
                    <span className="text-freeze inline-flex items-center gap-1 font-medium">
                      <Snowflake size={13} /> streak freeze
                    </span>
                    . Everyone gets one per challenge, for the night college life wins.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-text-tertiary mb-2 flex items-center gap-1.5">
                  <Keyboard size={12} /> Keyboard shortcuts
                </h3>
                <div className="rounded-lg border border-border-subtle divide-y divide-border-subtle overflow-hidden">
                  {[
                    { keys: ["G", "H"], desc: "Go to Home" },
                    { keys: ["G", "D"], desc: "Go to Dashboard" },
                    { keys: ["T"], desc: "Toggle light / dark" },
                    { keys: ["?"], desc: "Open this panel" },
                  ].map((s) => (
                    <div key={s.desc} className="flex items-center justify-between px-3 py-2 bg-elevated">
                      <span className="text-[12px] text-text-secondary">{s.desc}</span>
                      <span className="flex gap-1">
                        {s.keys.map((k) => (
                          <kbd
                            key={k}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border-strong bg-surface text-text-primary"
                          >
                            {k}
                          </kbd>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-text-tertiary mt-1.5">
                  Disabled while typing in a field, so they never interrupt a form.
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-text-tertiary mb-2">FAQ</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-elevated border border-border-subtle">
                    <p className="font-medium">Coding at 2 AM after class?</p>
                    <p className="text-text-secondary text-xs mt-1">
                      The deadline is midnight IST, not bedtime. Submit whenever you finish — most students do.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-elevated border border-border-subtle">
                    <p className="font-medium">What counts as &quot;proof&quot;?</p>
                    <p className="text-text-secondary text-xs mt-1">
                      Real, working code pushed publicly — not a screenshot. See each day&apos;s requirements tab.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
