'use client'

import { ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { POSITIONS, sideForPosition, type Position } from '@/lib/types'

interface MotionSelectorProps {
  motion: string
  position: Position
  onMotionChange: (value: string) => void
  onPositionChange: (value: Position) => void
  onGenerate: () => void
}

const EXAMPLE = 'This House would ban private schooling'

export function MotionSelector({
  motion,
  position,
  onMotionChange,
  onPositionChange,
  onGenerate,
}: MotionSelectorProps) {
  const side = sideForPosition(position)

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="grid gap-1.5">
            <label
              htmlFor="motion"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Debate motion
            </label>
            <input
              id="motion"
              value={motion}
              onChange={(e) => onMotionChange(e.target.value)}
              placeholder={EXAMPLE}
              className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>

          <div className="grid gap-1.5">
            <label
              htmlFor="position"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Your position
            </label>
            <div className="relative">
              <select
                id="position"
                value={position}
                onChange={(e) => onPositionChange(e.target.value as Position)}
                className="h-11 w-full appearance-none rounded-lg border border-input bg-background pl-3.5 pr-9 text-sm text-foreground shadow-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:w-56"
              >
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={onGenerate}
          className="h-11 w-full px-5 text-sm md:w-auto"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Generate prep
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span
          className={
            side === 'Government'
              ? 'inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 font-medium text-primary'
              : 'inline-flex items-center gap-1.5 rounded-full bg-destructive/12 px-2.5 py-1 font-medium text-destructive'
          }
        >
          <span className="size-1.5 rounded-full bg-current" />
          {side} bench
        </span>
        <button
          type="button"
          onClick={() => onMotionChange(EXAMPLE)}
          className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          Use example motion
        </button>
      </div>
    </section>
  )
}
