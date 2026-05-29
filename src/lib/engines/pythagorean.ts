import type { NumerologyInput, NumberResult, EngineSection } from '@/types/numerology'
import {
  PYTHAGOREAN,
  KARMIC_DEBT_NUMBERS,
  isMaster,
  isVowel,
  digitSum,
  reduceNumber,
  reduceTrace,
  letterSum,
  parseDob,
} from '@/lib/core'
import { getMeaning } from '@/lib/content/meanings'

function decorate(result: NumberResult): NumberResult {
  const meaning = getMeaning(result.value)
  return { ...result, meaning: meaning.summary, keywords: meaning.keywords }
}

function makeResult(
  key: string,
  label: string,
  rawTotal: number,
  value: number,
  source: string,
  breakdown: string,
): NumberResult {
  return decorate({
    key,
    label,
    value,
    isMaster: isMaster(value),
    isKarmicDebt: KARMIC_DEBT_NUMBERS.includes(rawTotal),
    source,
    breakdown,
  })
}

export function computePythagorean(input: NumerologyInput): EngineSection {
  const { year, month, day } = parseDob(input.dob)

  const lifePathTotal = digitSum(day) + digitSum(month) + digitSum(year)
  const lifePathValue = reduceNumber(lifePathTotal)
  const lifePath = makeResult(
    'lifePath',
    'Life Path',
    lifePathTotal,
    lifePathValue,
    'From your full date of birth',
    reduceTrace(lifePathTotal),
  )

  const expressionTotal = letterSum(input.name, PYTHAGOREAN)
  const expressionValue = reduceNumber(expressionTotal)
  const expression = makeResult(
    'expression',
    'Expression / Destiny',
    expressionTotal,
    expressionValue,
    'From all letters of your name',
    reduceTrace(expressionTotal),
  )

  const soulUrgeTotal = letterSum(input.name, PYTHAGOREAN, isVowel)
  const soulUrge = makeResult(
    'soulUrge',
    "Soul Urge / Heart's Desire",
    soulUrgeTotal,
    reduceNumber(soulUrgeTotal),
    'From the vowels in your name',
    reduceTrace(soulUrgeTotal),
  )

  const personalityTotal = letterSum(input.name, PYTHAGOREAN, (ch) => !isVowel(ch))
  const personality = makeResult(
    'personality',
    'Personality',
    personalityTotal,
    reduceNumber(personalityTotal),
    'From the consonants in your name',
    reduceTrace(personalityTotal),
  )

  const birthday = makeResult(
    'birthday',
    'Birthday',
    day,
    reduceNumber(day),
    'From the day you were born',
    reduceTrace(day),
  )

  const maturityTotal = lifePathValue + expressionValue
  const maturity = makeResult(
    'maturity',
    'Maturity',
    maturityTotal,
    reduceNumber(maturityTotal),
    'Life Path + Expression, reduced',
    reduceTrace(maturityTotal),
  )

  return {
    id: 'pythagorean',
    title: 'Pythagorean (Western)',
    description: 'Core numbers from your name and birth date using the Western system.',
    results: [lifePath, expression, soulUrge, personality, birthday, maturity],
  }
}
