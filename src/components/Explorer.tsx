import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ExplorerItem {
  id: string
  label: string
  sub?: string
  value?: number | string
  detail: ReactNode
}

export function Explorer({ items }: { items: ExplorerItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const active = items.find((i) => i.id === activeId) ?? items[0]

  return (
    <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-[236px_1fr] md:gap-5">
      <div className="flex flex-col gap-1.5 md:min-h-0 md:overflow-y-auto md:pr-1">
        {items.map((it) => {
          const on = it.id === active?.id
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setActiveId(it.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-3 py-1.5 text-left transition-colors',
                on
                  ? 'border-primary/30 bg-accent'
                  : 'border-border bg-card hover:bg-muted',
              )}
            >
              {it.value !== undefined && (
                <span
                  className={cn(
                    'flex h-8 w-8 flex-none items-center justify-center rounded-md font-serif text-base font-semibold',
                    on ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
                  )}
                >
                  {it.value}
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{it.label}</span>
                {it.sub && <span className="block truncate text-xs text-muted-foreground">{it.sub}</span>}
              </span>
            </button>
          )
        })}
      </div>
      <div className="rounded-xl border border-border bg-card/60 md:flex md:min-h-0 md:flex-col md:overflow-hidden">
        <div className="p-3 sm:p-4 md:flex-1 md:overflow-y-auto">{active?.detail}</div>
      </div>
    </div>
  )
}
