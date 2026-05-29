import { useState } from 'react'
import type { FormEvent } from 'react'
import { Star, Hash, Sigma, CalendarClock, Users } from 'lucide-react'
import { Backdrop } from '@/components/Backdrop'
import { ThemeToggle } from '@/components/ThemeToggle'
import { NumberDetail } from '@/components/NumberDetail'
import { LoShuGridView } from '@/components/LoShuGridView'
import { PeriodList } from '@/components/PeriodList'
import { CompatibilityView } from '@/components/CompatibilityView'
import { Explorer } from '@/components/Explorer'
import type { ExplorerItem } from '@/components/Explorer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { computeReport } from '@/lib/report'
import type { NumerologyReport } from '@/lib/report'
import { computeCompatibility } from '@/lib/engines/compatibility'
import type { NumerologyInput, CompatibilityResult } from '@/types/numerology'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1899 }, (_, i) => CURRENT_YEAR - i)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const selectClass =
  'h-9 w-full min-w-0 rounded-md border border-input bg-card px-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

function toDob(day: string, month: string, year: string): string {
  if (!day || !month || !year) return ''
  return `${year}-${pad2(Number(month))}-${pad2(Number(day))}`
}

interface DobValue {
  day: string
  month: string
  year: string
}

function DobFields({
  value,
  onChange,
}: {
  value: DobValue
  onChange: (next: DobValue) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <select aria-label="Day of birth" className={selectClass} value={value.day} onChange={(e) => onChange({ ...value, day: e.target.value })}>
        <option value="">Day</option>
        {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>
      <select aria-label="Month of birth" className={selectClass} value={value.month} onChange={(e) => onChange({ ...value, month: e.target.value })}>
        <option value="">Month</option>
        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
      </select>
      <select aria-label="Year of birth" className={selectClass} value={value.year} onChange={(e) => onChange({ ...value, year: e.target.value })}>
        <option value="">Year</option>
        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  )
}

type TabId = 'vedic' | 'pythagorean' | 'chaldean' | 'predictive' | 'compatibility'

const TABS: { id: TabId; label: string; Icon: typeof Star }[] = [
  { id: 'vedic', label: 'Vedic', Icon: Star },
  { id: 'pythagorean', label: 'Pythagorean', Icon: Hash },
  { id: 'chaldean', label: 'Chaldean', Icon: Sigma },
  { id: 'predictive', label: 'Timing', Icon: CalendarClock },
  { id: 'compatibility', label: 'Compatibility', Icon: Users },
]

function buildItems(tab: TabId, report: NumerologyReport): ExplorerItem[] {
  if (tab === 'vedic') {
    const items: ExplorerItem[] = report.vedic.results.map((r) => ({
      id: r.key,
      label: r.label,
      sub: r.altLabel,
      value: r.value,
      detail: <NumberDetail result={r} />,
    }))
    if (report.vedic.loShu) {
      items.push({
        id: 'loshu',
        label: 'Lo Shu Grid',
        sub: 'Birth chart',
        detail: <LoShuGridView grid={report.vedic.loShu} />,
      })
    }
    return items
  }
  if (tab === 'pythagorean') {
    return report.pythagorean.results.map((r) => ({
      id: r.key, label: r.label, sub: r.altLabel, value: r.value, detail: <NumberDetail result={r} />,
    }))
  }
  if (tab === 'chaldean') {
    return report.chaldean.results.map((r) => ({
      id: r.key, label: r.label, sub: r.altLabel, value: r.value, detail: <NumberDetail result={r} />,
    }))
  }
  const p = report.predictive
  return [
    { id: 'year', label: p.personalYear.label, sub: p.personalYear.altLabel ?? 'This year', value: p.personalYear.value, detail: <NumberDetail result={p.personalYear} /> },
    { id: 'month', label: p.personalMonth.label, sub: p.personalMonth.altLabel ?? 'This month', value: p.personalMonth.value, detail: <NumberDetail result={p.personalMonth} /> },
    { id: 'day', label: p.personalDay.label, sub: p.personalDay.altLabel ?? 'Today', value: p.personalDay.value, detail: <NumberDetail result={p.personalDay} /> },
    { id: 'pinnacles', label: 'Pinnacles', sub: 'Life stages', detail: <PeriodList title="Pinnacles" intro="The four life stages you move through." items={p.pinnacles} /> },
    { id: 'challenges', label: 'Challenges', sub: 'Life lessons', detail: <PeriodList title="Challenges" intro="The lessons each stage asks you to learn." items={p.challenges} /> },
  ]
}

function App() {
  const [name, setName] = useState('')
  const [dob, setDob] = useState<DobValue>({ day: '', month: '', year: '' })
  const [error, setError] = useState('')
  const [report, setReport] = useState<NumerologyReport | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('vedic')
  const [reportId, setReportId] = useState(0)
  const [committed, setCommitted] = useState<NumerologyInput | null>(null)

  const [name2, setName2] = useState('')
  const [dob2, setDob2] = useState<DobValue>({ day: '', month: '', year: '' })
  const [match, setMatch] = useState<CompatibilityResult | null>(null)
  const [matchError, setMatchError] = useState('')

  function handleCalculate(e: FormEvent) {
    e.preventDefault()
    const dobStr = toDob(dob.day, dob.month, dob.year)
    if (!name.trim() || !/[A-Za-z]/.test(name)) {
      setError('Please enter a name with letters.')
      return
    }
    if (!dobStr) {
      setError('Please select your full date of birth.')
      return
    }
    if (new Date(dobStr) > new Date()) {
      setError('Birth date cannot be in the future.')
      return
    }
    setError('')
    const input: NumerologyInput = { name, dob: dobStr }
    setReport(computeReport(input))
    setCommitted(input)
    setReportId((n) => n + 1)
    setMatch(null)
    setMatchError('')
  }

  function handleMatch(e: FormEvent) {
    e.preventDefault()
    const dobStr = toDob(dob.day, dob.month, dob.year)
    const dob2Str = toDob(dob2.day, dob2.month, dob2.year)
    if (!name2.trim() || !/[A-Za-z]/.test(name2) || !dob2Str) {
      setMatchError('Please enter the other person name and full date of birth.')
      return
    }
    setMatchError('')
    const a: NumerologyInput = committed ?? { name, dob: dobStr }
    const b: NumerologyInput = { name: name2, dob: dob2Str }
    setMatch(computeCompatibility(a, b))
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden md:h-screen md:overflow-hidden">
      <Backdrop />
      <div className="flex w-full flex-1 flex-col gap-3 px-5 py-3 md:min-h-0 md:gap-3 md:px-8 md:py-4">
        <header className="flex flex-none items-center justify-between gap-4 border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-accent font-serif text-base font-semibold text-primary">
              N
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Numerology
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Across every system
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <form
          onSubmit={handleCalculate}
          autoComplete="off"
          className="flex flex-none flex-wrap items-end gap-3"
        >
          <div className="min-w-0 flex-1 space-y-1">
            <Label htmlFor="name" className="text-xs uppercase tracking-wide text-muted-foreground">
              Full name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" className="h-9" autoFocus />
          </div>
          <div className="w-full max-w-full space-y-1 sm:w-[22rem]">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Date of birth</Label>
            <DobFields value={dob} onChange={setDob} />
          </div>
          <Button type="submit" size="lg" className="flex-none">
            {report ? 'Update' : 'Reveal my numbers'}
          </Button>
        </form>
        {error && (
          <p className="flex-none rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}

        {report ? (
          <main className="flex flex-1 flex-col gap-3 md:min-h-0">
            <div className="flex flex-none flex-wrap gap-x-5 gap-y-2 border-b border-border">
              {TABS.map((t) => {
                const active = activeTab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={
                      'relative flex items-center gap-1.5 pb-2 text-sm font-medium transition-colors ' +
                      (active ? 'text-primary' : 'text-muted-foreground hover:text-foreground')
                    }
                  >
                    <t.Icon className="h-4 w-4" /> {t.label}
                    {active && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
                  </button>
                )
              })}
            </div>

            <div className="md:min-h-0 md:flex-1">
              {activeTab === 'compatibility' ? (
                <div className="h-full md:overflow-y-auto">
                  <form onSubmit={handleMatch} className="flex flex-wrap items-end gap-3">
                    <div className="min-w-0 flex-1 space-y-1">
                      <Label htmlFor="name2" className="text-xs uppercase tracking-wide text-muted-foreground">
                        Their full name
                      </Label>
                      <Input id="name2" value={name2} onChange={(e) => setName2(e.target.value)} placeholder="e.g. Arjun Mehta" className="h-9" />
                    </div>
                    <div className="w-full max-w-full space-y-1 sm:w-[22rem]">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">Their date of birth</Label>
                      <DobFields value={dob2} onChange={setDob2} />
                    </div>
                    <Button type="submit" size="lg" className="flex-none">Check match</Button>
                  </form>
                  {matchError && (
                    <p className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{matchError}</p>
                  )}
                  {match && (
                    <div className="mt-4">
                      <CompatibilityView result={match} />
                    </div>
                  )}
                </div>
              ) : (
                <Explorer key={`${activeTab}-${reportId}`} items={buildItems(activeTab, report)} />
              )}
            </div>
          </main>
        ) : (
          <main className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="max-w-md">
              <p className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                Your numbers, beautifully read.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your name and date of birth above, then explore your Vedic, Pythagorean, Chaldean, timing and compatibility numbers — each on its own, no scrolling.
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

export default App
