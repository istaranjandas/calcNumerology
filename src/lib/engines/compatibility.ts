import type {
  NumerologyInput,
  CompatibilityResult,
  CompatibilityPair,
} from '@/types/numerology'
import { PYTHAGOREAN, reduceNumber, letterSum, parseDob } from '@/lib/core'

type Relation = { friends: number[]; neutral: number[]; enemies: number[] }

const FRIENDSHIP: Record<number, Relation> = {
  1: { friends: [1, 2, 3, 5, 9], neutral: [4, 7], enemies: [6, 8] },
  2: { friends: [1, 2, 3, 5], neutral: [4, 6, 9], enemies: [7, 8] },
  3: { friends: [1, 2, 3, 6, 9], neutral: [4, 5, 7], enemies: [8] },
  4: { friends: [1, 5, 6, 7], neutral: [2, 3, 4, 9], enemies: [8] },
  5: { friends: [1, 3, 5, 6, 9], neutral: [2, 4, 7], enemies: [8] },
  6: { friends: [3, 4, 5, 6, 9], neutral: [2, 7, 8], enemies: [1] },
  7: { friends: [4, 5, 7], neutral: [1, 3, 6, 9], enemies: [2, 8] },
  8: { friends: [4, 5, 6], neutral: [1, 6, 8], enemies: [2, 3, 7] },
  9: { friends: [1, 3, 5, 6, 9], neutral: [2, 4, 7], enemies: [8] },
}

function lifePath(dob: string): number {
  const { year, month, day } = parseDob(dob)
  const total =
    reduceNumber(month, false) +
    reduceNumber(day, false) +
    reduceNumber(year, false)
  return reduceNumber(total, false)
}

function driver(dob: string): number {
  const { day } = parseDob(dob)
  return reduceNumber(day, false)
}

function nameNumber(name: string): number {
  return reduceNumber(letterSum(name, PYTHAGOREAN), false)
}

function verdictFor(a: number, b: number): string {
  if (a === b) return 'Great match'
  const ra = FRIENDSHIP[a]
  const rb = FRIENDSHIP[b]
  if ((ra && ra.enemies.includes(b)) || (rb && rb.enemies.includes(a))) return 'Needs effort'
  if ((ra && ra.friends.includes(b)) || (rb && rb.friends.includes(a))) return 'Great match'
  return 'Workable'
}

function pointsFor(verdict: string): number {
  if (verdict === 'Great match') return 100
  if (verdict === 'Workable') return 60
  return 30
}

function summaryFor(score: number): string {
  if (score >= 80)
    return 'You two share a strong and natural bond that flows with ease.'
  if (score >= 50)
    return 'You have a balanced match where some care and effort keeps things happy.'
  return 'This is a challenging pair, so patience and understanding will be key.'
}

export function computeCompatibility(
  a: NumerologyInput,
  b: NumerologyInput,
): CompatibilityResult {
  const aspects: { aspect: string; a: number; b: number }[] = [
    { aspect: 'Life Path', a: lifePath(a.dob), b: lifePath(b.dob) },
    { aspect: 'Driver', a: driver(a.dob), b: driver(b.dob) },
    { aspect: 'Name', a: nameNumber(a.name), b: nameNumber(b.name) },
  ]

  const pairs: CompatibilityPair[] = aspects.map((item) => ({
    aspect: item.aspect,
    a: item.a,
    b: item.b,
    verdict: verdictFor(item.a, item.b),
  }))

  const totalPoints = pairs.reduce((sum, pair) => sum + pointsFor(pair.verdict), 0)
  const scorePercent = Math.round(totalPoints / pairs.length)

  return {
    scorePercent,
    summary: summaryFor(scorePercent),
    pairs,
  }
}
