import type {
  NumerologyInput,
  NumberResult,
  PredictiveResult,
  PinnacleOrChallenge,
} from '@/types/numerology'
import { reduceNumber, reduceTrace, parseDob, isMaster } from '@/lib/core'
import { getMeaning } from '@/lib/content/meanings'

const CHALLENGE_NOTES: Record<number, string> = {
  0: 'A rare challenge of choice — you already hold the tools, so the lesson is to use them with balance and not coast.',
  1: 'Learn to stand on your own, trust your ideas, and lead without leaning on others.',
  2: 'Build patience and tact; handle sensitivity and other people without losing yourself.',
  3: 'Speak up and create freely; beat self-doubt and scattered focus.',
  4: 'Bring order and steady effort; avoid cutting corners and resisting hard work.',
  5: 'Use freedom wisely; stay grounded and avoid restless, reckless change.',
  6: 'Balance duty and care; serve others without controlling them or carrying too much.',
  7: 'Trust and open up; move past doubt, isolation, and over-thinking.',
  8: 'Handle money and power with fairness; avoid being driven only by status or control.',
}

function makePersonal(
  key: string,
  label: string,
  value: number,
  source: string,
  breakdown: string,
): NumberResult {
  const meaning = getMeaning(value)
  return {
    key,
    label,
    value,
    isMaster: isMaster(value),
    source,
    breakdown,
    meaning: meaning.summary,
    keywords: meaning.keywords,
  }
}

export function computePredictive(input: NumerologyInput, today?: Date): PredictiveResult {
  const now = today ?? new Date()
  const { year, month, day } = parseDob(input.dob)

  const personalYearTotal =
    reduceNumber(month, false) + reduceNumber(day, false) + reduceNumber(now.getFullYear(), false)
  const personalYearValue = reduceNumber(personalYearTotal, false)
  const personalYear = makePersonal(
    'personalYear',
    'Personal Year',
    personalYearValue,
    'Your theme for this calendar year',
    reduceTrace(personalYearTotal),
  )

  const personalMonthTotal = personalYearValue + (now.getMonth() + 1)
  const personalMonthValue = reduceNumber(personalMonthTotal, false)
  const personalMonth = makePersonal(
    'personalMonth',
    'Personal Month',
    personalMonthValue,
    'Your theme for this month',
    reduceTrace(personalMonthTotal),
  )

  const personalDayTotal = personalMonthValue + now.getDate()
  const personalDayValue = reduceNumber(personalDayTotal, false)
  const personalDay = makePersonal(
    'personalDay',
    'Personal Day',
    personalDayValue,
    'Your theme for today',
    reduceTrace(personalDayTotal),
  )

  const m = reduceNumber(month, false)
  const d = reduceNumber(day, false)
  const y = reduceNumber(year, false)

  const p1 = reduceNumber(m + d, true)
  const p2 = reduceNumber(d + y, true)
  const p3 = reduceNumber(p1 + p2, true)
  const p4 = reduceNumber(m + y, true)

  const pinnaclePeriods = [
    'First Pinnacle (early life)',
    'Second Pinnacle',
    'Third Pinnacle',
    'Fourth Pinnacle (later life)',
  ]
  const pinnacleValues = [p1, p2, p3, p4]
  const pinnacles: PinnacleOrChallenge[] = pinnacleValues.map((value, i) => ({
    period: pinnaclePeriods[i],
    value,
    meaning: getMeaning(value).summary,
  }))

  const c1 = Math.abs(m - d)
  const c2 = Math.abs(d - y)
  const c3 = Math.abs(c1 - c2)
  const c4 = Math.abs(m - y)

  const challengePeriods = [
    'First Challenge',
    'Second Challenge',
    'Third (Main) Challenge',
    'Fourth Challenge',
  ]
  const challengeValues = [c1, c2, c3, c4]
  const challenges: PinnacleOrChallenge[] = challengeValues.map((value, i) => ({
    period: challengePeriods[i],
    value,
    meaning: CHALLENGE_NOTES[value],
  }))

  return { personalYear, personalMonth, personalDay, pinnacles, challenges }
}
