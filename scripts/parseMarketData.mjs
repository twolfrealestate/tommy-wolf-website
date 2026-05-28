// scripts/parseMarketData.mjs
// Run with: node scripts/parseMarketData.mjs
// Reads the .xlsx from src/data/market/, calculates metrics, merges into src/data/marketData.js

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import pkg from 'xlsx'
const { readFile, utils, SSF } = pkg

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')
const MARKET_DIR = join(ROOT, 'src', 'data', 'market')
const OUTPUT_FILE = join(ROOT, 'src', 'data', 'marketData.js')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const SHEET_NAME = 'res_website_template_export'
const TARGET_ZIP = '84009'

// ── Find Excel file ──────────────────────────────────────────────────────────
if (!existsSync(MARKET_DIR)) {
  console.error(`Directory not found: ${MARKET_DIR}`)
  process.exit(1)
}

const xlsxFiles = readdirSync(MARKET_DIR).filter(f => f.toLowerCase().endsWith('.xlsx'))
if (xlsxFiles.length === 0) {
  console.error('No .xlsx file found in src/data/market/')
  process.exit(1)
}
if (xlsxFiles.length > 1) {
  console.warn(`Multiple .xlsx files found — using: ${xlsxFiles[0]}`)
}

const xlsxPath = join(MARKET_DIR, xlsxFiles[0])
console.log(`\nReading: ${xlsxFiles[0]}`)

// ── Parse workbook ───────────────────────────────────────────────────────────
const workbook = readFile(xlsxPath)
const sheet = workbook.Sheets[SHEET_NAME]
if (!sheet) {
  const available = workbook.SheetNames.join(', ')
  console.error(`Sheet "${SHEET_NAME}" not found.\nAvailable sheets: ${available}`)
  process.exit(1)
}

const rows = utils.sheet_to_json(sheet, { cellDates: true, raw: true })
console.log(`Total rows in sheet: ${rows.length}`)

// ── Filter to zip 84009 ──────────────────────────────────────────────────────
const filtered = rows.filter(r => {
  const zip = String(r['Zip'] ?? '').trim().replace(/\.0+$/, '')
  return zip === TARGET_ZIP
})
console.log(`Rows after zip filter (${TARGET_ZIP}): ${filtered.length}`)

if (filtered.length === 0) {
  console.error('No rows matched the zip filter — check column name "Zip" and value 84009')
  process.exit(1)
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function median(values) {
  if (!values || values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
}

function parsePeriod(dateVal) {
  if (!dateVal) return null
  let d
  if (dateVal instanceof Date) {
    d = dateVal
  } else if (typeof dateVal === 'number') {
    const parsed = SSF.parse_date_code(dateVal)
    d = new Date(parsed.y, parsed.m - 1, parsed.d)
  } else {
    d = new Date(String(dateVal))
  }
  if (isNaN(d.getTime())) return null
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function periodToSortKey(period) {
  const [mon, year] = period.split(' ')
  return parseInt(year) * 100 + MONTHS.indexOf(mon) + 1
}

function getGroup(propType) {
  const t = String(propType ?? '').trim()
  if (t === 'Single Family') return 'Single Family'
  if (t === 'Townhouse' || t === 'Twin' || t === 'Condo') return 'Townhome'
  return null
}

// ── Accumulate by group + period ─────────────────────────────────────────────
const acc = {}
let skippedDate = 0
let skippedGroup = 0

for (const row of filtered) {
  const group = getGroup(row['Property Type'])
  if (!group) { skippedGroup++; continue }

  const period = parsePeriod(row['Sold Date'])
  if (!period) { skippedDate++; continue }

  if (!acc[group]) acc[group] = {}
  if (!acc[group][period]) acc[group][period] = { soldPrices: [], doms: [], ratios: [] }

  const soldPrice = Number(row['Sold Price'])
  const listPrice = Number(row['List Price'])
  const domRaw = row['DOM']

  if (!isNaN(soldPrice) && soldPrice > 0) {
    acc[group][period].soldPrices.push(soldPrice)
    if (!isNaN(listPrice) && listPrice > 0) {
      acc[group][period].ratios.push((soldPrice / listPrice) * 100)
    }
  }

  // Exclude null/blank DOM from Days on Market calculations
  if (domRaw !== null && domRaw !== undefined && domRaw !== '' && !isNaN(Number(domRaw))) {
    acc[group][period].doms.push(Number(domRaw))
  }
}

if (skippedDate > 0) console.warn(`  Skipped ${skippedDate} rows with unparseable Sold Date`)
if (skippedGroup > 0) console.log(`  Skipped ${skippedGroup} rows with unrecognized Property Type (not SF/Townhouse/Twin/Condo)`)

// ── Build "All" group (Single Family + Townhome combined) ────────────────────
const allPeriodAcc = {}
for (const group of ['Single Family', 'Townhome']) {
  if (!acc[group]) continue
  for (const [period, data] of Object.entries(acc[group])) {
    if (!allPeriodAcc[period]) allPeriodAcc[period] = { soldPrices: [], doms: [], ratios: [] }
    allPeriodAcc[period].soldPrices.push(...data.soldPrices)
    allPeriodAcc[period].doms.push(...data.doms)
    allPeriodAcc[period].ratios.push(...data.ratios)
  }
}
if (Object.keys(allPeriodAcc).length > 0) acc['All'] = allPeriodAcc

// ── Calculate metrics for each group ────────────────────────────────────────
const newData = {}
for (const [group, periods] of Object.entries(acc)) {
  newData[group] = []
  for (const [period, data] of Object.entries(periods)) {
    newData[group].push({
      period,
      medianPrice: Math.round(median(data.soldPrices) ?? 0),
      medianDOM: Math.round(median(data.doms) ?? 0),
      totalSold: data.soldPrices.length,
      listToSaleRatio: parseFloat(((median(data.ratios) ?? 0)).toFixed(2)),
    })
  }
  newData[group].sort((a, b) => periodToSortKey(a.period) - periodToSortKey(b.period))
}

// ── Load and merge with existing data ────────────────────────────────────────
let existing = {}
try {
  const content = readFileSync(OUTPUT_FILE, 'utf8')
  const MARKER_START = 'const marketData = '
  const MARKER_END = '\nexport const lastUpdated'
  const start = content.indexOf(MARKER_START)
  const end = content.indexOf(MARKER_END)
  if (start !== -1 && end > start) {
    existing = JSON.parse(content.slice(start + MARKER_START.length, end).trim())
    const existingCount = Object.values(existing).reduce((n, arr) => n + arr.length, 0)
    console.log(`Loaded existing marketData.js (${existingCount} existing data points)`)
  }
} catch {
  console.log('No existing marketData.js found — creating fresh.')
}

const allGroups = new Set([...Object.keys(existing), ...Object.keys(newData)])
const merged = {}
for (const group of allGroups) {
  const map = {}
  for (const entry of (existing[group] || [])) map[entry.period] = entry
  for (const entry of (newData[group] || [])) map[entry.period] = entry // new overwrites existing
  merged[group] = Object.values(map).sort((a, b) => periodToSortKey(a.period) - periodToSortKey(b.period))
}

// ── Summary ──────────────────────────────────────────────────────────────────
const allPeriodsFlat = Object.values(merged).flat().map(e => e.period)
const mostRecent = [...allPeriodsFlat].sort((a, b) => periodToSortKey(b) - periodToSortKey(a))[0] ?? 'Unknown'
const totalPoints = Object.values(merged).reduce((n, arr) => n + arr.length, 0)

for (const [group, entries] of Object.entries(merged)) {
  console.log(`  ${group}: ${entries.length} months`)
}

// ── Write output ─────────────────────────────────────────────────────────────
const output = `// Auto-generated by scripts/parseMarketData.mjs — do not edit manually
// Source: ${xlsxFiles[0]}
// Generated: ${new Date().toISOString().split('T')[0]}

const marketData = ${JSON.stringify(merged, null, 2)}

export const lastUpdated = '${mostRecent}'
export default marketData
`

writeFileSync(OUTPUT_FILE, output, 'utf8')
console.log(`\n✓ Written to src/data/marketData.js`)
console.log(`  ${totalPoints} total data points across all groups`)
console.log(`  Most recent period: ${mostRecent}\n`)
