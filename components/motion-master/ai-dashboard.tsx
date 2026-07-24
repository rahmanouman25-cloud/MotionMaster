'use client'

import {
  AlertTriangle,
  ArrowRight,
  Cog,
  FileText,
  Mic,
  RefreshCw,
  ShieldAlert,
  Swords,
  Target,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CaseFile, PredictedSpeech, RebuttalPoint } from '@/lib/types'

type Tab = 'case' | 'refutation' | 'next'

interface AiDashboardProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  caseFile: CaseFile | null
  rebuttal: RebuttalPoint[] | null
  nextSpeech: PredictedSpeech | null
  outline: string
  onOutlineChange: (value: string) => void
  onRegenerateCase: () => void
  onRunRefutation: () => void
  onPredictNext: () => void
}

const weightStyles: Record<string, string> = {
  High: 'bg-primary/12 text-primary',
  Medium: 'bg-accent/25 text-accent-foreground',
  Framing: 'bg-muted text-muted-foreground',
}

export function AiDashboard({
  activeTab,
  onTabChange,
  caseFile,
  rebuttal,
  nextSpeech,
  outline,
  onOutlineChange,
  onRegenerateCase,
  onRunRefutation,
  onPredictNext,
}: AiDashboardProps) {
  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 pt-4 sm:px-6">
        <div
          role="tablist"
          aria-label="AI coach modes"
          className="flex gap-1"
        >
          <TabButton
            active={activeTab === 'case'}
            onClick={() => onTabChange('case')}
            icon={<FileText className="size-4" aria-hidden="true" />}
            label="Case File Generator"
          />
          <TabButton
            active={activeTab === 'refutation'}
            onClick={() => onTabChange('refutation')}
            icon={<Swords className="size-4" aria-hidden="true" />}
            label="Refutation Bot"
          />
          <TabButton
            active={activeTab === 'next'}
            onClick={() => onTabChange('next')}
            icon={<Mic className="size-4" aria-hidden="true" />}
            label="Next Speaker"
          />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === 'case' ? (
          <CaseFileView caseFile={caseFile} onRegenerate={onRegenerateCase} />
        ) : activeTab === 'refutation' ? (
          <RefutationView
            rebuttal={rebuttal}
            outline={outline}
            onOutlineChange={onOutlineChange}
            onRun={onRunRefutation}
          />
        ) : (
          <NextSpeakerView
            nextSpeech={nextSpeech}
            onPredict={onPredictNext}
          />
        )}
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        active
          ? 'flex items-center gap-2 border-b-2 border-primary px-3 pb-3 text-sm font-semibold text-foreground'
          : 'flex items-center gap-2 border-b-2 border-transparent px-3 pb-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
      }
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </button>
  )
}

function CaseFileView({
  caseFile,
  onRegenerate,
}: {
  caseFile: CaseFile | null
  onRegenerate: () => void
}) {
  if (!caseFile) {
    return (
      <EmptyState
        icon={<FileText className="size-6" aria-hidden="true" />}
        title="No case file yet"
        body="Enter a motion and hit Generate prep to build three core arguments with mechanisms plus your opponent's pain points."
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Core arguments
        </h2>
        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RefreshCw className="size-3.5" aria-hidden="true" />
          Regenerate
        </Button>
      </div>

      <ol className="space-y-3">
        {caseFile.arguments.map((arg, i) => (
          <li
            key={arg.id}
            className="rounded-xl border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="font-medium leading-snug text-foreground text-pretty">
                  {arg.claim}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${weightStyles[arg.weight]}`}
              >
                {arg.weight}
              </span>
            </div>

            <div className="mt-3 grid gap-2 pl-9 text-sm">
              <p className="flex gap-2 text-muted-foreground">
                <Cog className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-foreground">
                    Mechanism:{' '}
                  </span>
                  {arg.mechanism}
                </span>
              </p>
              <p className="flex gap-2 text-muted-foreground">
                <Zap className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-foreground">Impact: </span>
                  {arg.impact}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div>
        <h2 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-destructive">
          <AlertTriangle className="size-4" aria-hidden="true" />
          Opposition pain points
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {caseFile.painPoints.map((point) => (
            <div
              key={point.id}
              className="rounded-xl border border-destructive/25 bg-destructive/5 p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {point.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RefutationView({
  rebuttal,
  outline,
  onOutlineChange,
  onRun,
}: {
  rebuttal: RebuttalPoint[] | null
  outline: string
  onOutlineChange: (value: string) => void
  onRun: () => void
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-1.5">
        <label
          htmlFor="outline"
          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Their speech outline
        </label>
        <textarea
          id="outline"
          value={outline}
          onChange={(e) => onOutlineChange(e.target.value)}
          rows={5}
          placeholder={`Paste the opponent's key points, one per line...\n1. Private schools entrench inequality\n2. Banning them boosts state funding\n3. It's a fairness issue`}
          className="w-full resize-y rounded-lg border border-input bg-background p-3.5 text-sm leading-relaxed text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={onRun}>
            <Swords className="size-3.5" aria-hidden="true" />
            Break down rebuttal
          </Button>
        </div>
      </div>

      {rebuttal ? (
        <div className="space-y-3">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
            3-point rebuttal
          </h2>
          {rebuttal.map((point, i) => (
            <div
              key={point.id}
              className="rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
                  {i + 1}
                </span>
                <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[0.7rem] font-semibold text-primary">
                  {point.strategy}
                </span>
                <span className="ml-auto text-[0.7rem] font-medium text-muted-foreground">
                  {point.technique}
                </span>
              </div>
              <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
                <Target className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-foreground">Target: </span>
                  {point.targetClaim}
                </span>
              </p>
              <p className="mt-2 pl-6 text-sm leading-relaxed text-foreground">
                {point.response}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Swords className="size-6" aria-hidden="true" />}
          title="No rebuttal generated yet"
          body="Drop in the points you expect from the other bench, then break them down into a clean 3-point response."
        />
      )}
    </div>
  )
}

function NextSpeakerView({
  nextSpeech,
  onPredict,
}: {
  nextSpeech: PredictedSpeech | null
  onPredict: () => void
}) {
  if (!nextSpeech) {
    return (
      <div className="space-y-5">
        <div className="flex justify-end">
          <Button size="sm" onClick={onPredict}>
            <Mic className="size-3.5" aria-hidden="true" />
            Predict next speech
          </Button>
        </div>
        <EmptyState
          icon={<Mic className="size-6" aria-hidden="true" />}
          title="No prediction yet"
          body="Following the BP speaking order, predict the speech from the speaker who follows your position — and how to pre-empt each point."
        />
      </div>
    )
  }

  const sideStyles =
    nextSpeech.nextSide === 'Government'
      ? 'bg-primary/12 text-primary'
      : 'bg-destructive/12 text-destructive'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Speaking order forecast
        </h2>
        <Button variant="outline" size="sm" onClick={onPredict}>
          <RefreshCw className="size-3.5" aria-hidden="true" />
          Refresh
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            You: {nextSpeech.fromPosition}
          </span>
          <ArrowRight
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${sideStyles}`}
          >
            <span className="size-1.5 rounded-full bg-current" />
            Next: {nextSpeech.nextPosition}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
          {nextSpeech.summary}
        </p>
      </div>

      <ol className="space-y-3">
        {nextSpeech.points.map((point, i) => (
          <li
            key={point.id}
            className="rounded-xl border border-border bg-background p-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
                {i + 1}
              </span>
              <div className="grid gap-2">
                <p className="font-medium leading-snug text-foreground text-pretty">
                  {point.title}
                </p>
                <p className="flex gap-2 text-sm text-muted-foreground">
                  <Mic
                    className="mt-0.5 size-4 shrink-0 text-foreground"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold text-foreground">
                      They will say:{' '}
                    </span>
                    {point.thrust}
                  </span>
                </p>
                <p className="flex gap-2 text-sm text-muted-foreground">
                  <ShieldAlert
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold text-foreground">
                      Pre-empt:{' '}
                    </span>
                    {point.preempt}
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function EmptyState({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 py-10 text-center">
      <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground">
        {icon}
      </span>
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground text-pretty">
        {body}
      </p>
    </div>
  )
}
