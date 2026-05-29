import type { NumberResult } from '@/types/numerology'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const GRADIENTS: Record<number, string> = {
  1: 'from-rose-400 to-rose-600',
  2: 'from-orange-400 to-amber-500',
  3: 'from-amber-400 to-yellow-500',
  4: 'from-lime-400 to-green-600',
  5: 'from-emerald-400 to-teal-600',
  6: 'from-cyan-400 to-sky-600',
  7: 'from-blue-400 to-indigo-600',
  8: 'from-violet-400 to-purple-600',
  9: 'from-fuchsia-400 to-pink-600',
}

function gradientFor(value: number, isMaster: boolean): string {
  if (isMaster) return 'from-amber-300 to-amber-500'
  return GRADIENTS[value] ?? 'from-slate-400 to-slate-600'
}

export function ResultCard({
  result,
  index = 0,
}: {
  result: NumberResult
  index?: number
}) {
  const grad = gradientFor(result.value, result.isMaster)
  return (
    <div
      className={cn(
        'group relative flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all animate-rise-in hover:-translate-y-0.5 hover:shadow-md',
        result.isMaster && 'ring-1 ring-amber-300/60',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          'flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-gradient-to-br text-3xl font-extrabold text-white shadow-lg ring-1 ring-inset ring-white/30 transition-transform group-hover:scale-105',
          grad,
          result.isMaster && 'text-amber-950 animate-glow',
        )}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        aria-label={`${result.label} ${result.value}`}
      >
        {result.value}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground">{result.label}</span>
          {result.altLabel && (
            <span className="text-xs text-muted-foreground">({result.altLabel})</span>
          )}
          {result.isMaster && <Badge variant="master">Master</Badge>}
          {result.isKarmicDebt && <Badge variant="karmic">Karmic debt</Badge>}
        </div>
        {result.source && (
          <p className="mt-0.5 text-xs text-muted-foreground">{result.source}</p>
        )}
        {result.meaning && (
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{result.meaning}</p>
        )}
        {result.keywords && result.keywords.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.keywords.map((k) => (
              <span
                key={k}
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {k}
              </span>
            ))}
          </div>
        )}
        {result.breakdown && (
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">{result.breakdown}</p>
        )}
      </div>
    </div>
  )
}
