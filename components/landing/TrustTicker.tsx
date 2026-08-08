"use client";

import { COLLEGES } from "@/lib/mock-data";

export function TrustTicker() {
  const doubled = [...COLLEGES, ...COLLEGES];

  return (
    <section className="py-5 border-y border-border-subtle overflow-hidden">
      <p className="px-5 text-[10px] uppercase tracking-wider text-text-tertiary mb-3">
        Students building in from
      </p>
      <div className="relative">
        <div className="flex gap-8 animate-[scroll_28s_linear_infinite] motion-reduce:animate-none w-max px-5">
          {doubled.map((college, i) => (
            <span
              key={i}
              className="text-sm font-medium text-text-secondary whitespace-nowrap shrink-0"
            >
              {college}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-base to-transparent" />
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
