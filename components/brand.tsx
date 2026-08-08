import Link from "next/link"
import { cn } from "@/lib/utils"

export function Brand({
  className,
  href = "/",
}: {
  className?: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-sm font-bold tracking-[0.35em] uppercase",
        className
      )}
    >
      <span
        aria-hidden
        className="inline-block size-2.5 rounded-[3px] bg-primary transition-transform group-hover:rotate-45"
      />
      ABTalkS
    </Link>
  )
}
