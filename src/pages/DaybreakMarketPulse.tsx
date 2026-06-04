import { useEffect, useMemo, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LabelList,
} from 'recharts'
import FadeSection from '../components/FadeSection'
import { saveLead, validateEmail } from '../lib/leads'
import marketData, { lastUpdated } from '../data/marketData.js'
import type { MonthEntry } from '../data/marketData.js'

// ── Types ────────────────────────────────────────────────────────────────────
interface ChartEntry {
  label: string
  medianPrice: number
  dom: number
  sold: number
  ratio: number
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function medianOf(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function toChartEntries(entries: MonthEntry[], timePeriod: string): ChartEntry[] {
  if (entries.length === 0) return []

  if (timePeriod === 'Monthly') {
    return entries.map(e => ({
      label: e.period,
      medianPrice: e.medianPrice,
      dom: e.medianDOM,
      sold: e.totalSold,
      ratio: e.listToSaleRatio,
    }))
  }

  if (timePeriod === 'Quarterly') {
    const buckets: Record<string, MonthEntry[]> = {}
    for (const e of entries) {
      const [mon, year] = e.period.split(' ')
      const q = Math.floor(MONTHS.indexOf(mon) / 3) + 1
      const key = `Q${q} ${year}`
      if (!buckets[key]) buckets[key] = []
      buckets[key].push(e)
    }
    return Object.entries(buckets)
      .sort(([a], [b]) => {
        const [qa, ya] = a.split(' ')
        const [qb, yb] = b.split(' ')
        return parseInt(ya) !== parseInt(yb)
          ? parseInt(ya) - parseInt(yb)
          : parseInt(qa[1]) - parseInt(qb[1])
      })
      .map(([label, group]) => ({
        label,
        medianPrice: Math.round(medianOf(group.map(e => e.medianPrice))),
        dom: Math.round(medianOf(group.filter(e => e.medianDOM > 0).map(e => e.medianDOM))),
        sold: group.reduce((s, e) => s + e.totalSold, 0),
        ratio: parseFloat(medianOf(group.map(e => e.listToSaleRatio)).toFixed(2)),
      }))
  }

  if (timePeriod === 'Yearly') {
    const buckets: Record<string, MonthEntry[]> = {}
    for (const e of entries) {
      const year = e.period.split(' ')[1]
      if (!buckets[year]) buckets[year] = []
      buckets[year].push(e)
    }
    return Object.entries(buckets)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([label, group]) => ({
        label,
        medianPrice: Math.round(medianOf(group.map(e => e.medianPrice))),
        dom: Math.round(medianOf(group.filter(e => e.medianDOM > 0).map(e => e.medianDOM))),
        sold: group.reduce((s, e) => s + e.totalSold, 0),
        ratio: parseFloat(medianOf(group.map(e => e.listToSaleRatio)).toFixed(2)),
      }))
  }

  return []
}

// ── Constants ────────────────────────────────────────────────────────────────
const CHART_TOOLTIP_STYLE = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  backgroundColor: '#1a1a1a',
  border: '1px solid #333',
  color: '#fff',
}

// ── ChartCard ────────────────────────────────────────────────────────────────
function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#fff', borderTop: '2px solid var(--color-accent)', padding: '28px' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--color-text)', marginBottom: '4px' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '6px' }}>
        {subtitle}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '20px' }}>
        Last Updated: {lastUpdated}
      </p>
      {children}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DaybreakMarketPulse() {
  useEffect(() => { document.title = 'Daybreak Market Pulse | Tommy Wolf REALTOR®' }, [])

  const [timePeriod, setTimePeriod] = useState('Monthly')
  const [homeType, setHomeType] = useState('All Types')
  const [subEmail, setSubEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  // Map UI label to data key
  const dataKey = homeType === 'Single Family' ? 'Single Family'
    : homeType === 'Townhome' ? 'Townhome'
    : 'All'

  const sourceEntries: MonthEntry[] = marketData[dataKey] ?? []

  const chartData: ChartEntry[] = useMemo(
    () => toChartEntries(sourceEntries, timePeriod),
    [sourceEntries, timePeriod]
  )

  const hasData = chartData.length > 0

  // Dynamic Y-axis domain for list-to-sale ratio
  const ratioMin = hasData ? Math.floor(Math.min(...chartData.map(d => d.ratio)) - 1) : 95
  const ratioMax = hasData ? Math.ceil(Math.max(...chartData.map(d => d.ratio)) + 1) : 105

  function handleSubscribe(ev: React.FormEvent) {
    ev.preventDefault()
    if (!subEmail.trim() || !validateEmail(subEmail)) return
    saveLead({ email: subEmail, source: 'market-pulse-subscribe', isNewsletter: true })
    setSubDone(true)
  }

  const filterSelectStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    color: 'var(--color-accent)',
    padding: '8px 32px 8px 12px',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A84C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    cursor: 'pointer',
  }

  return (
    <main>
      {/* HERO */}
      <FadeSection className="section section--primary" style={{ minHeight: '320px', display: 'flex', alignItems: 'center' }}>
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Data & Trends</p>
          <h1
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,56px)', color: '#fff', marginBottom: '20px' }}
          >
            Daybreak Market Pulse
          </h1>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 300, color: '#ccc', maxWidth: '520px', margin: '0 auto' }}
          >
            Real data. Real trends. Updated regularly.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* INTRO */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '800px' }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.7, marginBottom: '24px' }}>
            Visual snapshots of real estate trends in Daybreak and surrounding South Jordan neighborhoods. Charts updated periodically.
          </p>
          <div
            className="fade-up"
            style={{
              backgroundColor: '#fff',
              padding: '20px 20px 20px 22px',
              border: '1px solid var(--color-border)',
              borderLeft: '2px solid var(--color-accent)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>
              Data reflects closed MLS transactions in zip code 84009 and is for informational purposes. For a current CMA specific to your home, contact Tommy directly.
            </p>
          </div>
        </div>
      </FadeSection>

      {/* FILTER BAR */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          backgroundColor: 'var(--color-primary)',
          borderBottom: '1px solid #2a2a2a',
          zIndex: 100,
          padding: '14px 24px',
        }}
      >
        <div className="content-wrap" style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
              Time Period
            </label>
            <select style={filterSelectStyle} value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
              Home Type
            </label>
            <select style={filterSelectStyle} value={homeType} onChange={e => setHomeType(e.target.value)}>
              <option>All Types</option>
              <option>Single Family</option>
              <option>Townhome</option>
            </select>
          </div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#555', marginLeft: 'auto' }}>
            Showing: {timePeriod} · {homeType}
          </span>
        </div>
      </div>

      {/* CHARTS */}
      <FadeSection className="section section--light">
        {!hasData && (
          <div className="content-wrap" style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-light)' }}>
              No data available for this selection. Run <code>node scripts/parseMarketData.mjs</code> to populate chart data.
            </p>
          </div>
        )}
        <div
          className="content-wrap"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}
        >
          {/* Chart 1: Median Sale Price */}
          <div className="fade-up">
            <ChartCard title="Median Sale Price" subtitle={`Closed transactions, zip 84009 · ${homeType}`}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
                  <XAxis dataKey="label" tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }} />
                  <YAxis
                    tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }}
                    tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={v => [`$${Number(v).toLocaleString()}`, 'Median Price']}
                  />
                  <Line type="monotone" dataKey="medianPrice" stroke="#0A0A0A" strokeWidth={2} dot={{ fill: '#C9A84C', r: 4 }}>
                    <LabelList dataKey="medianPrice" position="top" formatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fill: '#555' }} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Chart 2: Days on Market */}
          <div className="fade-up">
            <ChartCard title="Days on Market" subtitle={`Median days from list to contract · ${homeType}`}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
                  <XAxis dataKey="label" tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }} />
                  <YAxis tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={v => [Number(v), 'Days']}
                  />
                  <Bar dataKey="dom" fill="#C9A84C" radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="dom" position="top" style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fill: '#555' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Chart 3: Homes Sold */}
          <div className="fade-up">
            <ChartCard title="Homes Sold" subtitle={`Total closed sales per period · ${homeType}`}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
                  <XAxis dataKey="label" tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }} />
                  <YAxis tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={v => [Number(v), 'Homes Sold']}
                  />
                  <Bar dataKey="sold" fill="#0A0A0A" radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="sold" position="top" style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fill: '#555' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Chart 4: List-to-Sale Ratio */}
          <div className="fade-up">
            <ChartCard title="List-to-Sale Ratio (%)" subtitle={`Sale price as % of list price · ${homeType}`}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
                  <XAxis dataKey="label" tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }} />
                  <YAxis
                    domain={[ratioMin, ratioMax]}
                    tick={{ fontFamily: 'var(--font-sans)', fontSize: 11 }}
                    tickFormatter={v => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={v => [`${Number(v).toFixed(2)}%`, 'List-to-Sale']}
                  />
                  <ReferenceLine y={100} stroke="#888" strokeDasharray="4 4" label={{ value: '100%', fontSize: 11, fill: '#888' }} />
                  <Line type="monotone" dataKey="ratio" stroke="#C9A84C" strokeWidth={2} dot={{ fill: '#C9A84C', r: 4 }}>
                    <LabelList dataKey="ratio" position="top" formatter={(v: number) => `${v.toFixed(1)}%`} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fill: '#555' }} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </FadeSection>

      {/* SUBSCRIBE NUDGE */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Stay Informed</p>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}
          >
            Get Market Updates in Your Inbox
          </h2>

          {subDone ? (
            <div className="fade-up" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--color-accent)' }}>
                You're subscribed.
              </p>
            </div>
          ) : (
            <form
              className="fade-up"
              onSubmit={handleSubscribe}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                style={{
                  flex: '1 1 220px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  padding: '12px 16px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn-gold" style={{ whiteSpace: 'nowrap' }}>
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </FadeSection>
    </main>
  )
}
