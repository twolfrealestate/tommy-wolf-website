import { useEffect, useState } from 'react'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function buildPrompt(month: string, year: string): string {
  const period = `${month} ${year}`
  return `A new Excel file for ${period} has been added to C:\\Projects\\tommy-wolf-website\\src\\data\\market\\. Run the script at scripts/parseMarketData.mjs to parse the new data, merge it with the existing data in src/data/marketData.js, and update the Daybreak Market Pulse charts. Confirm how many new sales records were added and what the calculated metrics are for ${period} for both Single Family and Townhome groups.`
}

function StepBox({ step, label, children }: { step: string; label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: '#111',
        border: '1px solid #2a2a2a',
        borderTop: '2px solid var(--color-accent)',
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            backgroundColor: 'var(--color-accent)',
            color: '#0A0A0A',
            padding: '3px 8px',
            flexShrink: 0,
          }}
        >
          {step}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#fff',
          }}
        >
          {label}
        </span>
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  )
}

function InstructionList({ items }: { items: string[] }) {
  return (
    <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ccc', lineHeight: 1.6 }}>
          {item}
        </li>
      ))}
    </ol>
  )
}

export default function AdminMarketUpdate() {
  useEffect(() => { document.title = 'Admin: Market Update | Tommy Wolf' }, [])

  const currentYear = String(new Date().getFullYear())
  const [month, setMonth] = useState(MONTH_NAMES[new Date().getMonth()])
  const [year, setYear] = useState(currentYear)
  const [filename, setFilename] = useState('')
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!filename.trim()) return
    setGenerated(true)
    setCopied(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildPrompt(month, year)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    padding: '11px 14px',
    color: '#fff',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-accent)',
    marginBottom: '6px',
  }

  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      {/* Admin banner */}
      <div
        style={{
          backgroundColor: 'var(--color-accent)',
          padding: '8px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Admin — Not Public Facing
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 80px' }}>
        {/* Heading */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-accent)',
            marginBottom: '14px',
          }}
        >
          Daybreak Market Pulse
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(30px,4vw,44px)',
            fontWeight: 400,
            color: '#fff',
            marginBottom: '8px',
            lineHeight: 1.15,
          }}
        >
          Monthly Market Update
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: '#666',
            marginBottom: '48px',
            lineHeight: 1.6,
          }}
        >
          Fill in the fields below to generate your step-by-step update instructions.
        </p>

        {/* Form */}
        <form
          onSubmit={handleGenerate}
          style={{
            backgroundColor: '#111',
            border: '1px solid #2a2a2a',
            padding: '32px',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Month Being Added</label>
              <select
                value={month}
                onChange={e => { setMonth(e.target.value); setGenerated(false) }}
                style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                required
              >
                {MONTH_NAMES.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input
                type="text"
                value={year}
                onChange={e => { setYear(e.target.value); setGenerated(false) }}
                style={inputStyle}
                placeholder="2026"
                required
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Excel Filename</label>
            <input
              type="text"
              value={filename}
              onChange={e => { setFilename(e.target.value); setGenerated(false) }}
              style={inputStyle}
              placeholder="Sales_Data_May_2026.xlsx"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{ alignSelf: 'flex-start', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.12em' }}
          >
            GENERATE MY INSTRUCTIONS
          </button>
        </form>

        {/* Generated steps */}
        {generated && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Step 1 */}
            <StepBox step="Step 1" label="Copy Your Excel File">
              <InstructionList items={[
                'Open File Explorer (Windows key + E)',
                'Navigate to: C:\\Projects\\tommy-wolf-website\\src\\data\\market\\',
                'Delete the old Excel file that is already in there',
                `Copy your new file "${filename}" into this folder`,
                'Rename it if needed so it ends in .xlsx',
              ]} />
            </StepBox>

            {/* Step 2 */}
            <StepBox step="Step 2" label="Run the Update in Claude Code">
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: '#888',
                  marginBottom: '14px',
                  lineHeight: 1.5,
                }}
              >
                Copy this prompt and paste it into Claude Code (your terminal session):
              </p>
              <div
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #333',
                  padding: '18px 20px',
                  marginBottom: '14px',
                  borderLeft: '2px solid var(--color-accent)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    color: '#e0d9cc',
                    lineHeight: 1.75,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {buildPrompt(month, year)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  backgroundColor: copied ? '#2a4a2a' : 'var(--color-accent)',
                  color: copied ? '#6fcf6f' : '#0A0A0A',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, color 0.2s',
                }}
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </StepBox>

            {/* Step 3 */}
            <StepBox step="Step 3" label="Deploy the Update">
              <InstructionList items={[
                'Open your second PowerShell window',
                'Type: cd C:\\Projects\\tommy-wolf-website and press Enter',
                'Type: npm run build and press Enter — wait for it to finish',
                'Go to netlify.com and log in',
                'Click your site → click Deploys',
                'Drag the dist folder from C:\\Projects\\tommy-wolf-website\\dist into the deploy box',
                'Wait 30 seconds — your live site is updated',
              ]} />
            </StepBox>

          </div>
        )}
      </div>
    </main>
  )
}
