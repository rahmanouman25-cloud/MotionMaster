'use client'

import { History, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sideForPosition, type HistoryEntry } from '@/lib/types'

interface HistoryLogProps {
  entries: HistoryEntry[]
  activeId: string | null
  onLoad: (entry: HistoryEntry) => void
  onDelete: (id: string) => void
  onClear: () => void
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function HistoryLog({
  entries,
  activeId,
  onLoad,
  onDelete,
  onClear,
}: HistoryLogProps) {
  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <History className="size-4" aria-hidden="true" />
          History log
        </div>
        {entries.length > 0 && (
          <Button variant="ghost" size="xs" onClick={onClear}>
            Clear all
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground text-pretty">
          Prepared motions you save will appear here and persist across
          refreshes.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {entries.map((entry) => {
            const side = sideForPosition(entry.position)
            const isActive = entry.id === activeId
            return (
              <li key={entry.id}>
                <div
                  className={
                    isActive
                      ? 'group flex items-start gap-2 rounded-lg border border-primary/40 bg-primary/5 p-3'
                      : 'group flex items-start gap-2 rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/30 hover:bg-muted/50'
                  }
                >
                  <button
                    type="button"
                    onClick={() => onLoad(entry)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-sm font-medium text-foreground">
                      {entry.motion || 'Untitled motion'}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className={
                          side === 'Government'
                            ? 'font-medium text-primary'
                            : 'font-medium text-destructive'
                        }
                      >
                        {entry.position}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{formatTime(entry.createdAt)}</span>
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(entry.id)}
                    aria-label="Delete entry"
                    className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
