import type { PredictiveResult, NumberResult, PinnacleOrChallenge } from '@/types/numerology'
import { ResultCard } from '@/components/ResultCard'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const PINNACLE_GRADIENTS: Record<number, string> = {
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

function pinnacleGradient(value: number): string {
  return PINNACLE_GRADIENTS[value] ?? 'from-amber-300 to-amber-500'
}

function PinnacleStep({ item, index }: { item: PinnacleOrChallenge; index: number }) {
  return (
    <div
      className="relative flex flex-1 basis-full flex-col items-center text-center sm:basis-0 animate-rise-in"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {item.period}
      </p>
      <div
        className={cn(
          'mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-extrabold text-white shadow-lg ring-2 ring-card ring-inset',
          pinnacleGradient(item.value),
        )}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        aria-label={`${item.period} ${item.value}`}
      >
        {item.value}
      </div>
      {item.meaning && (
        <p className="mt-2 max-w-[18rem] text-xs leading-relaxed text-muted-foreground">
          {item.meaning}
        </p>
      )}
    </div>
  )
}

function ChallengeRow({ item, index }: { item: PinnacleOrChallenge; index: number }) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4 animate-rise-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-muted text-xl font-bold text-muted-foreground ring-1 ring-inset ring-border">
        {item.value}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground">{item.period}</span>
          <Badge variant="muted">Lesson</Badge>
        </div>
        {item.meaning && (
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.meaning}</p>
        )}
      </div>
    </div>
  )
}

export function PredictiveView({ data }: { data: PredictiveResult }) {
  const timing: NumberResult[] = [data.personalYear, data.personalMonth, data.personalDay]
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Timing</CardTitle>
          <CardDescription>How this year, month, and day feel for you right now.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {timing.map((result, i) => (
              <ResultCard key={result.key} result={result} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pinnacles</CardTitle>
          <CardDescription>The four big life stages and what each one brings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-wrap items-start justify-between gap-y-8 gap-x-4">
            <div
              className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent sm:block"
              aria-hidden="true"
            />
            {data.pinnacles.map((item, i) => (
              <PinnacleStep key={item.period} item={item} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Challenges</CardTitle>
          <CardDescription>Gentle lessons to work on across the same life stages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.challenges.map((item, i) => (
              <ChallengeRow key={item.period} item={item} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
