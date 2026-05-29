export interface NumerologyInput {
  name: string
  dob: string
}

export interface NumberResult {
  key: string
  label: string
  altLabel?: string
  value: number
  isMaster: boolean
  isKarmicDebt?: boolean
  source: string
  breakdown?: string
  meaning?: string
  keywords?: string[]
}

export interface LoShuPlane {
  name: string
  numbers: number[]
  complete: boolean
}

export interface LoShuArrow {
  name: string
  type: 'present' | 'missing'
  numbers: number[]
  meaning: string
}

export interface LoShuGrid {
  counts: Record<number, number>
  cells: number[][]
  missing: number[]
  repeating: { number: number; count: number }[]
  planes: LoShuPlane[]
  arrows: LoShuArrow[]
}

export interface PinnacleOrChallenge {
  period: string
  value: number
  meaning?: string
}

export interface PredictiveResult {
  personalYear: NumberResult
  personalMonth: NumberResult
  personalDay: NumberResult
  pinnacles: PinnacleOrChallenge[]
  challenges: PinnacleOrChallenge[]
}

export interface CompatibilityPair {
  aspect: string
  a: number
  b: number
  verdict: string
}

export interface CompatibilityResult {
  scorePercent: number
  summary: string
  pairs: CompatibilityPair[]
}

export interface NumberMeaning {
  number: number
  title: string
  keywords: string[]
  summary: string
  detail?: string
  lucky?: {
    colors: string[]
    days: string[]
    numbers: number[]
  }
}

export type EngineId =
  | 'vedic'
  | 'pythagorean'
  | 'chaldean'
  | 'predictive'
  | 'compatibility'

export interface EngineSection {
  id: EngineId
  title: string
  description: string
  results: NumberResult[]
  loShu?: LoShuGrid
}
