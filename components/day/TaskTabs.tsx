"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ChallengeDay } from "@/lib/mock-data";

const TABS = ["Overview", "Requirements", "Resources"] as const;

export function TaskTabs({ info }: { info: ChallengeDay }) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Overview");

  return (
    <div className="mt-5">
      <div className="flex gap-1 p-1 rounded-full bg-elevated border border-border-subtle w-full">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="relative flex-1 py-2 text-xs font-medium rounded-full"
          >
            {active === tab && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${active === tab ? "text-white" : "text-text-secondary"}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4 p-4 rounded-2xl bg-surface border border-border-subtle min-h-[120px]"
      >
        {active === "Overview" && (
          <p className="text-[13px] text-text-secondary leading-relaxed">{info.overview}</p>
        )}
        {active === "Requirements" && (
          <ul className="space-y-2.5">
            {info.requirements.map((req, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] text-text-secondary leading-relaxed">
                <span className="shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center mt-0.5 font-semibold">
                  {i + 1}
                </span>
                {req}
              </li>
            ))}
          </ul>
        )}
        {active === "Resources" && (
          <ul className="space-y-2">
            {info.resources.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[13px] text-primary py-1.5 group"
                >
                  {r.label}
                  <ExternalLink size={13} className="opacity-60 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
