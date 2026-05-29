import type { LoShuGrid } from '@/types/numerology'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function Cell({ digit, count }: { digit: number; count: number }) {
  const present = count > 0
  return (
    <div
      className={cn(
        'relative flex aspect-square items-center justify-center rounded-lg border-2 font-serif text-2xl font-semibold tabular-nums',
        present
          ? 'border-primary/40 bg-accent text-primary'
          : 'border-dashed border-border text-muted-foreground/40',
      )}
      aria-label={present ? `${digit} appears ${count} time${count > 1 ? 's' : ''}` : `${digit} is missing`}
    >
      <span>{present ? String(digit).repeat(count) : digit}</span>
      {present && count >= 2 && (
        <span className="absolute right-0.5 top-0.5 rounded-full bg-primary px-1 text-[9px] font-bold leading-tight text-primary-foreground">
          ×{count}
        </span>
      )}
    </div>
  )
}

export function LoShuGridView({ grid }: { grid: LoShuGrid }) {
  const rows: { name: string; on: boolean }[] = [
    ...grid.planes.map((p) => ({ name: p.name, on: p.complete })),
    ...grid.arrows.map((a) => ({ name: a.name, on: a.type === 'present' })),
  ]

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-lg font-semibold text-foreground">Lo Shu Grid</h2>
      <p className="text-xs text-muted-foreground">Your birth digits on the ancient 3×3 magic square.</p>

      <div className="mt-3 grid gap-5 md:grid-cols-[200px_1fr] md:items-start">
        <div className="grid grid-cols-3 gap-2">
          {grid.cells.flat().map((d) => (
            <Cell key={d} digit={d} count={grid.counts[d] ?? 0} />
          ))}
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Planes &amp; Arrows</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            {rows.map((row) => (
              <div
                key={row.name}
                className={cn(
                  'flex items-center justify-between gap-1.5 rounded border px-2 py-1 text-[11px] leading-none',
                  row.on ? 'border-primary/30 bg-primary/5' : 'border-dashed border-border',
                )}
              >
                <span className="truncate font-medium text-foreground">{row.name}</span>
                <span
                  className={cn(
                    'h-1.5 w-1.5 flex-none rounded-full',
                    row.on ? 'bg-primary' : 'bg-muted-foreground/30',
                  )}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Missing</span>
              {grid.missing.length ? (
                grid.missing.map((n) => <Badge key={n} variant="muted">{n}</Badge>)
              ) : (
                <span className="text-xs text-muted-foreground">none</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Repeating</span>
              {grid.repeating.length ? (
                grid.repeating.map((r) => <Badge key={r.number}>{r.number}×{r.count}</Badge>)
              ) : (
                <span className="text-xs text-muted-foreground">none</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
