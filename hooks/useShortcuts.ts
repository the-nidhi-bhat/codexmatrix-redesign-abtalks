"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

/**
 * Power-user shortcuts, discoverable from the info button (most people
 * never open a README, so the in-app help panel is the source of truth).
 *
 *  t         toggle light / dark
 *  ?         open the help panel
 *  g then h  go home ("/")
 *  g then d  go to dashboard
 *  Escape    close help panel (handled by the panel itself)
 *
 * Shortcuts are ignored while the user is typing in an input/textarea so
 * they never hijack normal form use (e.g. typing "t" into a GitHub URL).
 */
export function useShortcuts(openHelp: () => void) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const pendingG = useRef(false);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function isTypingTarget(el: EventTarget | null) {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || el.isContentEditable;
    }

    function handleKeydown(e: KeyboardEvent) {
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;

      if (pendingG.current) {
        pendingG.current = false;
        if (pendingTimer.current) clearTimeout(pendingTimer.current);
        if (e.key === "h") {
          e.preventDefault();
          router.push("/");
        } else if (e.key === "d") {
          e.preventDefault();
          router.push("/dashboard");
        }
        return;
      }

      switch (e.key) {
        case "g":
          pendingG.current = true;
          pendingTimer.current = setTimeout(() => {
            pendingG.current = false;
          }, 900);
          break;
        case "t":
          setTheme(theme === "dark" ? "light" : "dark");
          break;
        case "?":
          e.preventDefault();
          openHelp();
          break;
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
    };
  }, [router, setTheme, theme, openHelp]);
}
