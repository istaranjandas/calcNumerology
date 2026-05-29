import type { NumerologyInput, NumberResult, EngineSection } from '@/types/numerology'
import { CHALDEAN, reduceNumber, reduceTrace, letterSum, cleanLetters } from '@/lib/core'
import { getMeaning } from '@/lib/content/meanings'

const COMPOUND_MEANINGS: Record<number, string> = {
  10: 'The Wheel of Fortune — honour and faith, rise then fall, self-effort decides.',
  11: 'The Clenched Hand — hidden trials and treachery, warns of dangers from others.',
  12: 'The Sacrifice — the victim, mental worry, often suffers for others.',
  13: 'Regeneration and Change — upheaval and power, a warning number, not unlucky.',
  14: 'Movement and Luck — gain through dealings with people, but beware speculation.',
  15: 'The Magician — magnetism and gifts, drama and money, used well or badly.',
  16: 'The Shattered Tower — accident and fall of plans, a fatalistic warning.',
  17: 'The Star of the Magi — peace and immortality, spiritual rise above trials.',
  18: 'Materialism Destroying Spiritual — quarrels, deceit, social upheaval, very hard.',
  19: 'The Prince of Heaven — success, honour and happiness, one of the best.',
  20: 'The Awakening — a call to action, new purpose, judgement and renewal.',
  21: 'The Crown of the Magi — victory after long struggle, advancement and honour.',
  22: 'Caution — illusion and false judgement, a good person fooled, take care.',
  23: 'The Royal Star of the Lion — help from superiors, success and protection.',
  24: 'Gain through Love — help from the opposite sex and people of rank.',
  25: 'Strength through Experience — success won by trials and hard lessons.',
  26: 'Grave Warnings of the Future — ruin through bad partners and advice.',
  27: 'The Sceptre — command, reward and authority, a number of good promise.',
  28: 'The Trusting Lamb — great promise lost through trust, gains then losses.',
  29: 'Grace and Treachery — uncertainty and deception from others, much trial.',
  30: 'Thoughtful Deduction — mental power and retrospection, neither good nor bad.',
}

function compoundMeaning(total: number): string {
  return (
    COMPOUND_MEANINGS[total] ??
    'A compound number — its force is read through its single-digit root and life context.'
  )
}

export function computeChaldean(input: NumerologyInput): EngineSection {
  const compoundTotal = letterSum(input.name, CHALDEAN)
  const nameValue = reduceNumber(compoundTotal, false)
  const nameMeaning = getMeaning(nameValue)

  const nameResult: NumberResult = {
    key: 'chaldeanName',
    label: 'Chaldean Name Number',
    value: nameValue,
    isMaster: false,
    source: 'From your name (Chaldean map)',
    breakdown: `${cleanLetters(input.name)} = ${reduceTrace(compoundTotal, false)}`,
    meaning: nameMeaning.summary,
    keywords: nameMeaning.keywords,
  }

  const compoundResult: NumberResult = {
    key: 'compound',
    label: 'Compound Number',
    value: compoundTotal,
    isMaster: false,
    source: 'The compound number behind your name',
    breakdown: `${cleanLetters(input.name)} = ${compoundTotal}`,
    meaning: compoundMeaning(compoundTotal),
  }

  return {
    id: 'chaldean',
    title: 'Chaldean',
    description:
      'Chaldean uses an older letter-to-number map than Pythagorean and never gives the letter the value 9.',
    results: [nameResult, compoundResult],
  }
}
