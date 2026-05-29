import type { PinnacleOrChallenge } from '@/types/numerology'

export function PeriodList({
  title,
  intro,
  items,
}: {
  title: string
  intro?: string
  items: PinnacleOrChallenge[]
}) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
      {intro && <p className="mt-0.5 text-sm text-muted-foreground">{intro}</p>}
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {items.map((it, i) => (
          <div
            key={`${it.period}-${i}`}
            className="flex gap-3 rounded-lg border border-border bg-card p-3"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-accent font-serif text-xl font-semibold text-primary">
              {it.value}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{it.period}</p>
              {it.meaning && (
                <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">{it.meaning}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
