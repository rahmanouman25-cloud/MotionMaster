'use client'

import { useCallback, useEffect, useState } from 'react'
import { AiDashboard } from '@/components/motion-master/ai-dashboard'
import { HistoryLog } from '@/components/motion-master/history-log'
import { MotionSelector } from '@/components/motion-master/motion-selector'
import { PrepTimer } from '@/components/motion-master/prep-timer'
import { SiteHeader } from '@/components/motion-master/site-header'
import { Workspace } from '@/components/motion-master/workspace'
import {
  generateCaseFile,
  generateNextSpeech,
  generateRebuttal,
} from '@/lib/mock-ai'
import type {
  CaseFile,
  HistoryEntry,
  Position,
  PredictedSpeech,
  RebuttalPoint,
} from '@/lib/types'

const HISTORY_KEY = 'motionmaster:history'

export default function Page() {
  const [motion, setMotion] = useState('This House would ban private schooling')
  const [position, setPosition] = useState<Position>('Prime Minister')
  const [activeTab, setActiveTab] = useState<'case' | 'refutation' | 'next'>(
    'case',
  )

  const [caseFile, setCaseFile] = useState<CaseFile | null>(null)
  const [outline, setOutline] = useState('')
  const [rebuttal, setRebuttal] = useState<RebuttalPoint[] | null>(null)
  const [nextSpeech, setNextSpeech] = useState<PredictedSpeech | null>(null)
  const [notes, setNotes] = useState('')

  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // Load persisted history on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY)
      if (raw) setHistory(JSON.parse(raw) as HistoryEntry[])
    } catch {
      // ignore malformed storage
    }
  }, [])

  // Persist history whenever it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    } catch {
      // ignore quota errors
    }
  }, [history])

  const handleGenerate = useCallback(() => {
    setCaseFile(generateCaseFile(motion, position))
    setNextSpeech(generateNextSpeech(motion, position))
    setActiveTab('case')
  }, [motion, position])

  const handleRegenerateCase = useCallback(() => {
    setCaseFile(generateCaseFile(motion, position))
  }, [motion, position])

  const handleRunRefutation = useCallback(() => {
    setRebuttal(generateRebuttal(outline, motion, position))
  }, [outline, motion, position])

  const handlePredictNext = useCallback(() => {
    setNextSpeech(generateNextSpeech(motion, position))
  }, [motion, position])

  const handleSaveHistory = useCallback(() => {
    const entry: HistoryEntry = {
      id: Math.random().toString(36).slice(2, 10),
      motion,
      position,
      createdAt: Date.now(),
      notes,
    }
    setHistory((prev) => [entry, ...prev].slice(0, 50))
    setActiveId(entry.id)
  }, [motion, position, notes])

  const handleLoadEntry = useCallback((entry: HistoryEntry) => {
    setMotion(entry.motion)
    setPosition(entry.position)
    setNotes(entry.notes)
    setActiveId(entry.id)
    setCaseFile(generateCaseFile(entry.motion, entry.position))
    setNextSpeech(generateNextSpeech(entry.motion, entry.position))
    setRebuttal(null)
    setActiveTab('case')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleDeleteEntry = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((e) => e.id !== id))
      if (activeId === id) setActiveId(null)
    },
    [activeId],
  )

  const handleClearHistory = useCallback(() => {
    setHistory([])
    setActiveId(null)
  }, [])

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            Prep your next round in one place
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
            Set your motion and position, let the AI coach build your case file
            and refutations, draft in the workspace, and keep the timer running.
          </p>
        </div>

        <MotionSelector
          motion={motion}
          position={position}
          onMotionChange={setMotion}
          onPositionChange={setPosition}
          onGenerate={handleGenerate}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <AiDashboard
              activeTab={activeTab}
              onTabChange={setActiveTab}
              caseFile={caseFile}
              rebuttal={rebuttal}
              nextSpeech={nextSpeech}
              outline={outline}
              onOutlineChange={setOutline}
              onRegenerateCase={handleRegenerateCase}
              onRunRefutation={handleRunRefutation}
              onPredictNext={handlePredictNext}
            />
            <Workspace
              notes={notes}
              onNotesChange={setNotes}
              onSave={handleSaveHistory}
              canSave={motion.trim().length > 0}
            />
          </div>

          <aside className="flex flex-col gap-6">
            <PrepTimer />
            <HistoryLog
              entries={history}
              activeId={activeId}
              onLoad={handleLoadEntry}
              onDelete={handleDeleteEntry}
              onClear={handleClearHistory}
            />
          </aside>
        </div>
      </main>
    </div>
  )
}
