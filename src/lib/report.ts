import type { NumerologyInput, EngineSection, PredictiveResult } from '@/types/numerology'
import { computeVedic } from '@/lib/engines/vedic'
import { computePythagorean } from '@/lib/engines/pythagorean'
import { computeChaldean } from '@/lib/engines/chaldean'
import { computePredictive } from '@/lib/engines/predictive'

export interface NumerologyReport {
  vedic: EngineSection
  pythagorean: EngineSection
  chaldean: EngineSection
  predictive: PredictiveResult
}

export function computeReport(input: NumerologyInput): NumerologyReport {
  return {
    vedic: computeVedic(input),
    pythagorean: computePythagorean(input),
    chaldean: computeChaldean(input),
    predictive: computePredictive(input),
  }
}
