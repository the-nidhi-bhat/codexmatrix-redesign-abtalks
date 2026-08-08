"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, Flame } from "lucide-react";
import { useApp } from "@/lib/store";

export function BottomNav() {
  const pathname = usePathname();
  const { profile } = useApp();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    {
      href: `/day/${profile.currentDay || 1}`,
      label: `Day ${profile.currentDay || 1}`,
      icon: Flame,
      match: "/day",
    },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border-subtle bg-base/90 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {items.map((item) => {
          const active = item.match ? pathname.startsWith(item.match) : pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 w-16 h-full"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute top-1.5 w-10 h-10 rounded-full bg-primary/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={19}
                strokeWidth={active ? 2.4 : 1.8}
                className={`relative z-10 ${active ? "text-primary" : "text-text-tertiary"}`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium ${
                  active ? "text-primary" : "text-text-tertiary"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
