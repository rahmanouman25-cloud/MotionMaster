import type {
  CaseFile,
  Position,
  PredictedSpeech,
  RebuttalPoint,
  Side,
} from './types'
import { nextSpeaker, sideForPosition } from './types'

const uid = () => Math.random().toString(36).slice(2, 10)

function cleanMotion(motion: string): string {
  const trimmed = motion.trim().replace(/\.$/, '')
  if (!trimmed) return 'this policy'
  return trimmed
    .replace(/^this house would\s+/i, '')
    .replace(/^this house believes that\s+/i, '')
    .replace(/^thw\s+/i, '')
    .replace(/^thbt\s+/i, '')
}

/**
 * Mock "AI" case-file generator. Swap this function body for a real
 * model call later — the shape it returns is all the UI depends on.
 */
export function generateCaseFile(motion: string, position: Position): CaseFile {
  const side: Side = sideForPosition(position)
  const topic = cleanMotion(motion)
  const proponent = side === 'Government'

  const govArguments = [
    {
      claim: `The status quo actively harms the most vulnerable stakeholders in "${topic}".`,
      mechanism:
        'Establish the burden: show who is affected, why current incentives fail them, and how the policy re-aligns those incentives.',
      impact:
        'Frames the round around harm-reduction, forcing Opposition to defend an indefensible baseline.',
      weight: 'High' as const,
    },
    {
      claim: `The policy corrects a structural market or institutional failure.`,
      mechanism:
        'Identify the failure (information asymmetry, externality, or entrenched power), then trace how the mechanism internalises the cost.',
      impact:
        'Wins the "principle" clash by grounding the case in fairness rather than mere outcomes.',
      weight: 'High' as const,
    },
    {
      claim: `Implementation is credible and the long-term equilibrium is better for everyone.`,
      mechanism:
        'Sketch a realistic enforcement path, pre-empt slippery-slope fears, and weigh the new steady state against today.',
      impact:
        'Neutralises practicality attacks and lets you claim the comparative even if Opposition wins a minor point.',
      weight: 'Framing' as const,
    },
  ]

  const oppArguments = [
    {
      claim: `The policy on "${topic}" removes agency and choice from the people it claims to help.`,
      mechanism:
        'Show the coercion: who loses the ability to decide, and why that autonomy is more valuable than the promised benefit.',
      impact:
        'Reframes the debate as rights vs. paternalism — a clash Government struggles to win cleanly.',
      weight: 'High' as const,
    },
    {
      claim: `The benefits are speculative while the harms are immediate and concrete.`,
      mechanism:
        'Contrast a guaranteed, near-term cost against a best-case, uncertain upside, then weigh probability × magnitude.',
      impact:
        'Puts the burden of proof back on Government and exploits any hand-waving in their mechanism.',
      weight: 'Medium' as const,
    },
    {
      claim: `There is a better, less drastic alternative that captures most of the upside.`,
      mechanism:
        'Offer a counter-model (regulation, funding, or a nudge) and argue it dominates on the same metric Government chose.',
      impact:
        'Denies Government the comparative — even a "good" policy loses to a better one.',
      weight: 'Framing' as const,
    },
  ]

  const chosen = proponent ? govArguments : oppArguments

  const govPain = [
    {
      title: 'Weigh mechanism over assertion',
      detail:
        'Opposition will assert harms without a link. Demand the chain of logic — most of their impacts collapse without it.',
    },
    {
      title: 'The "who decides" question',
      detail:
        'They will frame this as paternalism. Pre-empt it: show the choice was never free in the first place.',
    },
  ]

  const oppPain = [
    {
      title: 'Attack the implementation gap',
      detail:
        'Government rarely proves the policy is enforceable. Press for the actor, the funding, and the failure mode.',
    },
    {
      title: 'Expose the counterfactual',
      detail:
        'Ask what actually changes on day one. If the harm persists under their model, their comparative disappears.',
    },
  ]

  const painSource = proponent ? govPain : oppPain

  return {
    arguments: chosen.map((a) => ({ ...a, id: uid() })),
    painPoints: painSource.map((p) => ({ ...p, id: uid() })),
  }
}

/**
 * Mock "AI" refutation breakdown. It lightly reacts to the user's outline
 * (using the first few non-empty lines) so the output feels responsive.
 */
export function generateRebuttal(
  outline: string,
  motion: string,
  position: Position,
): RebuttalPoint[] {
  const side = sideForPosition(position)
  const topic = cleanMotion(motion)
  const lines = outline
    .split('\n')
    .map((l) => l.replace(/^[-*\d.\s]+/, '').trim())
    .filter(Boolean)

  const opponent = side === 'Government' ? 'Opposition' : 'Government'

  const fallbackClaims = [
    `${opponent}'s framing of "${topic}"`,
    `${opponent}'s central impact claim`,
    `${opponent}'s practicality argument`,
  ]

  const targets = [0, 1, 2].map(
    (i) => lines[i] ?? fallbackClaims[i],
  )

  const templates = [
    {
      strategy: 'Take out the link',
      response:
        'Concede the premise for free, then sever the causal chain: even if their fact is true, it does not produce the harm they claim.',
      technique: 'Even-if / de-link',
    },
    {
      strategy: 'Mitigate the impact',
      response:
        'Grant that some harm exists, then shrink it — smaller scale, lower probability, or already solved elsewhere in the round.',
      technique: 'Comparative weighing',
    },
    {
      strategy: 'Turn the argument',
      response:
        'Show their own logic supports your side: the mechanism they describe actually delivers your impacts more reliably.',
      technique: 'Turn / flip',
    },
  ]

  return targets.map((target, i) => ({
    id: uid(),
    targetClaim: target,
    strategy: templates[i].strategy,
    response: templates[i].response,
    technique: templates[i].technique,
  }))
}

/**
 * Role-specific job descriptions for the speaker who follows you.
 * Keyed by position so the predicted speech matches each seat's real duty.
 */
const roleBrief: Record<Position, string> = {
  'Prime Minister':
    'opens the round, defines the motion, and sets the Government model.',
  'Leader of Opposition':
    'responds to the Government model and frames the core Opposition clash.',
  'Deputy Prime Minister':
    'rebuilds the Government case and rebuts the Leader of Opposition.',
  'Deputy Leader of Opposition':
    'rebuts the Deputy PM and extends the Opposition case.',
  'Member of Government':
    'brings a fresh Closing Government extension that reframes the debate.',
  'Member of Opposition':
    'brings a fresh Closing Opposition extension and answers the top half.',
  'Government Whip':
    'summarises the round and crystallises the key Government clashes.',
  'Opposition Whip':
    'summarises the round and crystallises the key Opposition clashes.',
}

/**
 * Mock "AI" prediction of the NEXT speaker's speech, following BP order
 * (PM → LO → DPM → DLO → MG → MO → GW → OW). Given your position, it
 * forecasts what the speaker after you will run and how to pre-empt it.
 */
export function generateNextSpeech(
  motion: string,
  position: Position,
): PredictedSpeech {
  const nextPosition = nextSpeaker(position)
  const nextSide = sideForPosition(nextPosition)
  const topic = cleanMotion(motion)
  const defending = nextSide === 'Government'

  const govPoints = [
    {
      title: 'Rebuild the model',
      thrust: `Re-explains how the policy on "${topic}" works and patches any gap the prior speaker exposed.`,
      preempt:
        'Lock them to specifics now — actor, funding, timeline — so a vague rebuild reads as dodging.',
    },
    {
      title: 'Weigh on the principle',
      thrust:
        'Frames the clash as fairness or duty, arguing the state is obligated to act regardless of messy outcomes.',
      preempt:
        'Have a competing principle ready (autonomy, consent) so the framing battle is not conceded for free.',
    },
    {
      title: 'Characterise the harm',
      thrust:
        'Paints a vivid picture of the status-quo victim to make inaction feel unacceptable.',
      preempt:
        'Grant the sympathy but sever the link: show their model does not actually reach that victim.',
    },
  ]

  const oppPoints = [
    {
      title: 'Attack the mechanism',
      thrust: `Argues the policy on "${topic}" cannot deliver — the causal chain breaks at implementation.`,
      preempt:
        'Pre-empt by proving your enforcement path in your own speech, before they can call it hand-waving.',
    },
    {
      title: 'Reframe as coercion',
      thrust:
        'Casts the motion as removing choice from the very people it claims to help.',
      preempt:
        'Show the choice was never free under the status quo, so your model expands agency rather than shrinking it.',
    },
    {
      title: 'Offer a counter-model',
      thrust:
        'Proposes a lighter alternative that claims most of the upside with fewer costs.',
      preempt:
        'Weigh why the half-measure fails on the exact metric you chose, denying them the comparative.',
    },
  ]

  const chosen = defending ? govPoints : oppPoints

  return {
    fromPosition: position,
    nextPosition,
    nextSide,
    summary: `As ${nextSide}, the ${nextPosition} ${roleBrief[nextPosition]} Here is the speech to expect next — and how to get ahead of it.`,
    points: chosen.map((p) => ({ ...p, id: uid() })),
  }
}
