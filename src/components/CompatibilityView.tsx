import type { CompatibilityResult, CompatibilityPair } from '@/types/numerology'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const RING_SIZE = 128
const RING_STROKE = 11
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function verdictClasses(verdict: string): string {
  if (verdict === 'Great match') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  if (verdict === 'Workable') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  return 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
}

function ScoreRing({ percent }: { percent: number }) {
  const safe = Math.max(0, Math.min(100, percent))
  const offset = RING_CIRCUMFERENCE - (safe / 100) * RING_CIRCUMFERENCE
  const center = RING_SIZE / 2
  return (
    <div className="relative shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="-rotate-90"
        role="img"
        aria-label={`Compatibility score ${safe} percent`}
      >
        <circle cx={center} cy={center} r={RING_RADIUS} fill="none" strokeWidth={RING_STROKE} className="stroke-muted" />
        <circle
          cx={center}
          cy={center}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tracking-tight">{safe}%</span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Match</span>
      </div>
    </div>
  )
}

function PairRow({ pair }: { pair: CompatibilityPair }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card/50 px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{pair.aspect}</p>
        <p className="text-sm text-muted-foreground">
          {pair.a} <span className="text-muted-foreground/70">↔</span> {pair.b}
        </p>
      </div>
      <Badge className={cn('shrink-0', verdictClasses(pair.verdict))}>{pair.verdict}</Badge>
    </li>
  )
}

export function CompatibilityView({ result }: { result: CompatibilityResult }) {
  return (
    <div className="grid animate-fade-in gap-5 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="flex items-center gap-4">
        <ScoreRing percent={result.scorePercent} />
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{result.summary}</p>
      </div>
      <ul className="space-y-2">
        {result.pairs.map((pair, index) => (
          <PairRow key={`${pair.aspect}-${index}`} pair={pair} />
        ))}
      </ul>
    </div>
  )
}
