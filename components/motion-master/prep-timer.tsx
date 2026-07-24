'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TOTAL_SECONDS = 15 * 60

export function PrepTimer() {
  const [remaining, setRemaining] = useState(TOTAL_SECONDS)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const progress = ((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100
  const isDone = remaining === 0

  const reset = () => {
    setRunning(false)
    setRemaining(TOTAL_SECONDS)
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Timer className="size-4" aria-hidden="true" />
        Prep timer
      </div>

      <div
        className="mt-4 text-center font-heading text-5xl font-bold tabular-nums tracking-tight"
        aria-live="polite"
        role="timer"
      >
        <span className={isDone ? 'text-destructive' : 'text-foreground'}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        {isDone ? "Time's up — speak now." : 'of 15:00 standard BP prep'}
      </p>

      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-destructive' : 'bg-primary'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {running ? (
          <Button size="lg" className="h-10" onClick={() => setRunning(false)}>
            <Pause className="size-4" aria-hidden="true" />
            Pause
          </Button>
        ) : (
          <Button
            size="lg"
            className="h-10"
            onClick={() => setRunning(true)}
            disabled={isDone}
          >
            <Play className="size-4" aria-hidden="true" />
            Start
          </Button>
        )}
        <Button variant="outline" size="lg" className="h-10" onClick={reset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset
        </Button>
      </div>
    </section>
  )
}
