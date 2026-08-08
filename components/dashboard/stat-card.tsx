import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent = false,
  className,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  suffix?: string
  accent?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-border bg-card p-5",
        accent && "border-primary/40 bg-primary/[0.06]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
          {label}
        </span>
        <Icon
          className={cn(
            "size-4",
            accent ? "text-primary" : "text-muted-foreground/60"
          )}
        />
      </div>
      <p className="mt-4 flex items-baseline gap-1">
        <span
          className={cn(
            "font-mono text-3xl font-bold tabular-nums",
            accent ? "text-primary" : "text-foreground"
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="font-mono text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </p>
    </div>
  )
}
