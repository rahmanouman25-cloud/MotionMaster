'use client'

import { Gavel, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

export function SiteHeader() {
  const { theme, toggle, mounted } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Gavel className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="font-heading text-lg font-bold tracking-tight text-foreground">
              MotionMaster
            </p>
            <p className="text-xs text-muted-foreground">
              British Parliamentary prep cockpit
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {mounted && theme === 'dark' ? (
            <Sun className="size-4.5" aria-hidden="true" />
          ) : (
            <Moon className="size-4.5" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  )
}
