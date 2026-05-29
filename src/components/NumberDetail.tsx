import type { NumberResult } from '@/types/numerology'
import { getMeaning } from '@/lib/content/meanings'
import { Badge } from '@/components/ui/badge'

function FactRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  )
}

export function NumberDetail({ result }: { result: NumberResult }) {
  const meaning = getMeaning(result.value)
  const keywords =
    result.keywords && result.keywords.length ? result.keywords : meaning.keywords

  return (
    <div className="grid animate-fade-in gap-5 md:grid-cols-[1.6fr_1fr] md:gap-7">
      <div>
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="shrink-0 font-serif text-6xl font-semibold leading-none text-primary">
            {result.value}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-2xl font-semibold text-foreground">{result.label}</h2>
              {result.isMaster && <Badge variant="master">Master number</Badge>}
              {result.isKarmicDebt && <Badge variant="karmic">Karmic debt</Badge>}
            </div>
            {result.altLabel && (
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {result.altLabel}
              </p>
            )}
            {result.source && (
              <p className="mt-1 text-sm text-muted-foreground">{result.source}</p>
            )}
          </div>
        </div>

        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          {result.meaning || meaning.summary}
        </p>
        {meaning.detail && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meaning.detail}</p>
        )}
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
        {keywords.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Keywords
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {keywords.map((k) => (
                <Badge key={k} variant="muted">{k}</Badge>
              ))}
            </div>
          </div>
        )}

        {meaning.lucky && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Lucky for you
            </p>
            <FactRow label="Colours" value={meaning.lucky.colors.join(', ')} />
            <FactRow label="Days" value={meaning.lucky.days.join(', ')} />
            <FactRow label="Numbers" value={meaning.lucky.numbers.join(', ')} />
          </div>
        )}

        {result.breakdown && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              How it is calculated
            </p>
            <p className="mt-1 break-words font-mono text-sm text-foreground/80">{result.breakdown}</p>
          </div>
        )}
      </div>
    </div>
  )
}
