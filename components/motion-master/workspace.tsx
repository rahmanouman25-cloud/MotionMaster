'use client'

import { NotebookPen, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WorkspaceProps {
  notes: string
  onNotesChange: (value: string) => void
  onSave: () => void
  canSave: boolean
}

export function Workspace({
  notes,
  onNotesChange,
  onSave,
  canSave,
}: WorkspaceProps) {
  const words = notes.trim() ? notes.trim().split(/\s+/).length : 0

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <NotebookPen className="size-4" aria-hidden="true" />
          Your workspace
        </div>
        <span className="text-xs text-muted-foreground">{words} words</span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Draft your speech here as you review the AI advice — signposting, POIs to take, rebuttals to land, and your framing..."
        className="mt-3 min-h-64 w-full flex-1 resize-y rounded-lg border border-input bg-background p-3.5 text-sm leading-relaxed text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      />

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Saved to this session automatically.
        </p>
        <Button size="sm" onClick={onSave} disabled={!canSave}>
          <Save className="size-3.5" aria-hidden="true" />
          Save motion to history
        </Button>
      </div>
    </section>
  )
}
