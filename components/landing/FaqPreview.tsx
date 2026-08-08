"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "I only get free time at 2 AM. Is that a problem?",
    a: "No — the deadline is midnight IST, not a bedtime. Most of the ABTalks feed is timestamped between 11 PM and 3 AM. Build whenever your day allows it.",
  },
  {
    q: "What if I miss a day?",
    a: "Your streak resets — unless you spend your one streak freeze, which every student gets per challenge for exactly this reason. Your overall progress and past days still stay on record.",
  },
  {
    q: "What actually counts as \u201cproof\u201d?",
    a: "A public GitHub commit or repo, plus a LinkedIn post. Not a screenshot, not a private repo — it has to be visible to the recruiters who check.",
  },
  {
    q: "Do I need to be a strong coder to start?",
    a: "No. Day 1 is deliberately small. The challenge is built around consistency, not difficulty — the difficulty ramps with you.",
  },
];

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-5 py-12">
      <h2 className="font-display text-3xl tracking-wide mb-1">REAL QUESTIONS.</h2>
      <p className="text-text-secondary text-sm mb-7">The ones every batch actually asks.</p>

      <div className="space-y-2.5">
        {FAQS.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div
              key={faq.q}
              className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left"
                aria-expanded={open}
              >
                <span className="text-[14px] font-medium leading-snug">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="shrink-0 text-text-tertiary"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-[13px] text-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
