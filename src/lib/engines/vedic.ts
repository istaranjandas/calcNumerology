import type {
  NumerologyInput,
  NumberResult,
  EngineSection,
  LoShuGrid,
  LoShuPlane,
} from '@/types/numerology'
import { CHALDEAN, reduceNumber, reduceTrace, letterSum, parseDob } from '@/lib/core'
import { getMeaning } from '@/lib/content/meanings'

const FRIENDLY_NUMBERS: Record<number, number[]> = {
  1: [1, 3, 5, 9],
  2: [1, 4, 7, 8],
  3: [1, 2, 3, 5, 9],
  4: [1, 2, 7, 8],
  5: [1, 3, 5, 6, 9],
  6: [1, 4, 5, 6, 9],
  7: [1, 2, 4, 8],
  8: [1, 2, 4, 7, 8],
  9: [1, 3, 5, 6, 9],
}

const PLANE_DEFS: { name: string; numbers: number[] }[] = [
  { name: 'Mind / Mental', numbers: [4, 9, 2] },
  { name: 'Soul / Emotional', numbers: [3, 5, 7] },
  { name: 'Practical / Physical', numbers: [8, 1, 6] },
  { name: 'Thought', numbers: [4, 3, 8] },
  { name: 'Will', numbers: [9, 5, 1] },
  { name: 'Action', numbers: [2, 7, 6] },
  { name: 'Determination', numbers: [4, 5, 6] },
  { name: 'Compassion', numbers: [2, 5, 8] },
]

function buildLoShu(dob: string): LoShuGrid {
  const { year, month, day } = parseDob(dob)
  const dd = String(day).padStart(2, '0')
  const mm = String(month).padStart(2, '0')
  const yyyy = String(year)
  const digits = (dd + mm + yyyy).split('').map(Number)

  const counts: Record<number, number> = {}
  for (let n = 1; n <= 9; n++) counts[n] = 0
  for (const d of digits) {
    if (d >= 1 && d <= 9) counts[d] += 1
  }

  const cells = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ]

  const missing: number[] = []
  const repeating: { number: number; count: number }[] = []
  for (let n = 1; n <= 9; n++) {
    if (counts[n] === 0) missing.push(n)
    if (counts[n] >= 2) repeating.push({ number: n, count: counts[n] })
  }

  const planes: LoShuPlane[] = PLANE_DEFS.map((p) => ({
    name: p.name,
    numbers: p.numbers,
    complete: p.numbers.every((n) => counts[n] >= 1),
  }))

  return { counts, cells, missing, repeating, planes, arrows: [] }
}

export function computeVedic(input: NumerologyInput): EngineSection {
  const { day, month, year } = parseDob(input.dob)

  const mulank = reduceNumber(day, false)
  const dateDigitSum = String(day).split('').concat(String(month).split(''), String(year).split(''))
    .reduce((a, d) => a + Number(d), 0)
  const bhagyank = reduceNumber(dateDigitSum, false)
  const naameRaw = letterSum(input.name, CHALDEAN)
  const naamank = reduceNumber(naameRaw, false)

  const mulankResult: NumberResult = {
    key: 'mulank',
    label: 'Mulank',
    altLabel: 'Driver',
    value: mulank,
    isMaster: false,
    source: 'From your day of birth',
    breakdown: reduceTrace(day, false),
    meaning: getMeaning(mulank).summary,
    keywords: getMeaning(mulank).keywords,
  }

  const bhagyankResult: NumberResult = {
    key: 'bhagyank',
    label: 'Bhagyank',
    altLabel: 'Destiny',
    value: bhagyank,
    isMaster: false,
    source: 'From your full birth date',
    breakdown: reduceTrace(dateDigitSum, false),
    meaning: getMeaning(bhagyank).summary,
    keywords: getMeaning(bhagyank).keywords,
  }

  const naamankResult: NumberResult = {
    key: 'naamank',
    label: 'Naamank',
    altLabel: 'Name',
    value: naamank,
    isMaster: false,
    source: 'From your name (Chaldean values)',
    breakdown: reduceTrace(naameRaw, false),
    meaning: getMeaning(naamank).summary,
    keywords: getMeaning(naamank).keywords,
  }

  const lucky = getMeaning(mulank).lucky
  const luckyParts: string[] = []
  if (lucky) {
    if (lucky.colors.length) luckyParts.push(`Colours: ${lucky.colors.join(', ')}`)
    if (lucky.days.length) luckyParts.push(`Days: ${lucky.days.join(', ')}`)
    if (lucky.numbers.length) luckyParts.push(`Numbers: ${lucky.numbers.join(', ')}`)
  }
  const luckyMeaning = luckyParts.length
    ? luckyParts.join(' • ')
    : 'Lucky details are not set for this number yet.'

  const luckyResult: NumberResult = {
    key: 'lucky',
    label: 'Lucky Picks',
    value: mulank,
    isMaster: false,
    source: 'Lucky picks for your Mulank',
    meaning: luckyMeaning,
    keywords: (FRIENDLY_NUMBERS[mulank] ?? []).map((n) => String(n)),
  }

  return {
    id: 'vedic',
    title: 'Indian / Vedic',
    description: 'Mulank, Bhagyank, Naamank and your Lo Shu grid.',
    results: [mulankResult, bhagyankResult, naamankResult, luckyResult],
    loShu: buildLoShu(input.dob),
  }
}
