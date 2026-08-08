"use client";

import { motion } from "framer-motion";
import { Compass, Hammer, Send } from "lucide-react";

const STEPS = [
  {
    icon: Compass,
    title: "Pick a track",
    body: "Web Dev, DSA, ML/AI, or App Dev. Built to fit around your classes, not replace them.",
    color: "var(--accent-primary)",
  },
  {
    icon: Hammer,
    title: "Build daily",
    body: "One task unlocks each day — scoped to finish in a single sitting, even a late one.",
    color: "var(--accent-today)",
  },
  {
    icon: Send,
    title: "Post proof",
    body: "A GitHub commit and a LinkedIn post. Your streak becomes a public, recruiter-visible signal.",
    color: "var(--accent-done)",
  },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-12">
      <h2 className="font-display text-3xl tracking-wide mb-1">THE LOOP.</h2>
      <p className="text-text-secondary text-sm mb-7">Same three moves, sixty times.</p>

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-4 rounded-2xl bg-surface border border-border-subtle"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `color-mix(in srgb, ${step.color} 16%, transparent)` }}
              >
                <Icon size={20} style={{ color: step.color }} />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-sm text-text-tertiary">0{i + 1}</span>
                  <h3 className="font-semibold text-[15px]">{step.title}</h3>
                </div>
                <p className="text-text-secondary text-[13px] mt-1 leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
