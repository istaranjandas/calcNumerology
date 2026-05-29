export const PYTHAGOREAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
}

export const CHALDEAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
}

export const MASTER_NUMBERS = [11, 22, 33]
export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19]
export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U'])

export function isMaster(n: number): boolean {
  return MASTER_NUMBERS.includes(n)
}

export function isKarmicDebt(n: number): boolean {
  return KARMIC_DEBT_NUMBERS.includes(n)
}

export function isVowel(ch: string): boolean {
  return VOWELS.has(ch.toUpperCase())
}

export function digitSum(n: number): number {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((a, d) => a + Number(d), 0)
}

export function reduceNumber(n: number, keepMaster = true): number {
  let x = Math.abs(n)
  while (x > 9 && !(keepMaster && isMaster(x))) {
    x = digitSum(x)
  }
  return x
}

export function reduceSteps(n: number, keepMaster = true): number[] {
  const steps = [Math.abs(n)]
  let x = Math.abs(n)
  while (x > 9 && !(keepMaster && isMaster(x))) {
    x = digitSum(x)
    steps.push(x)
  }
  return steps
}

export function reduceTrace(n: number, keepMaster = true): string {
  return reduceSteps(n, keepMaster).join(' → ')
}

export function cleanLetters(name: string): string {
  return name.toUpperCase().replace(/[^A-Z]/g, '')
}

export function letterSum(
  name: string,
  map: Record<string, number>,
  filter?: (ch: string) => boolean,
): number {
  return cleanLetters(name)
    .split('')
    .filter((ch) => !filter || filter(ch))
    .reduce((a, ch) => a + (map[ch] || 0), 0)
}

export interface ParsedDob {
  year: number
  month: number
  day: number
}

export function parseDob(dob: string): ParsedDob {
  const [year, month, day] = dob.split('-').map(Number)
  return { year, month, day }
}
