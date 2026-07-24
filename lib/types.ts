export type Position =
  | 'Prime Minister'
  | 'Deputy Prime Minister'
  | 'Leader of Opposition'
  | 'Deputy Leader of Opposition'
  | 'Member of Government'
  | 'Government Whip'
  | 'Member of Opposition'
  | 'Opposition Whip'

export type Side = 'Government' | 'Opposition'

export interface Argument {
  id: string
  claim: string
  mechanism: string
  impact: string
  weight: 'High' | 'Medium' | 'Framing'
}

export interface PainPoint {
  id: string
  title: string
  detail: string
}

export interface CaseFile {
  arguments: Argument[]
  painPoints: PainPoint[]
}

export interface RebuttalPoint {
  id: string
  targetClaim: string
  strategy: string
  response: string
  technique: string
}

export interface PredictedPoint {
  id: string
  title: string
  thrust: string
  preempt: string
}

export interface PredictedSpeech {
  fromPosition: Position
  nextPosition: Position
  nextSide: Side
  summary: string
  points: PredictedPoint[]
}

export interface HistoryEntry {
  id: string
  motion: string
  position: Position
  createdAt: number
  notes: string
}

export const POSITIONS: Position[] = [
  'Prime Minister',
  'Deputy Prime Minister',
  'Leader of Opposition',
  'Deputy Leader of Opposition',
  'Member of Government',
  'Government Whip',
  'Member of Opposition',
  'Opposition Whip',
]

export function sideForPosition(position: Position): Side {
  return position.includes('Opposition') ? 'Opposition' : 'Government'
}

/**
 * The order speakers deliver in a British Parliamentary round.
 * PM → LO → DPM → DLO → MG → MO → GW → OW
 */
export const SPEAKING_ORDER: Position[] = [
  'Prime Minister',
  'Leader of Opposition',
  'Deputy Prime Minister',
  'Deputy Leader of Opposition',
  'Member of Government',
  'Member of Opposition',
  'Government Whip',
  'Opposition Whip',
]

/**
 * The speaker who follows `position` in the speaking order. Wraps around
 * from the final speaker (Opposition Whip) back to the Prime Minister.
 */
export function nextSpeaker(position: Position): Position {
  const i = SPEAKING_ORDER.indexOf(position)
  if (i === -1) return SPEAKING_ORDER[0]
  return SPEAKING_ORDER[(i + 1) % SPEAKING_ORDER.length]
}
