import { useEffect, useState } from 'react'

interface Lead {
  timestamp?: string
  source?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  intent?: string
  isNewsletter?: boolean
  [key: string]: unknown
}

function loadLeads(): Lead[] {
  try {
    const raw = localStorage.getItem('tw_leads')
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export default function AdminLeads() {
  useEffect(() => {
    document.title = 'Admin Leads | Tommy Wolf'
  }, [])

  const [leads, setLeads] = useState<Lead[]>(() => loadLeads())

  function clearLeads() {
    if (!confirm('Clear all leads from localStorage?')) return
    localStorage.removeItem('tw_leads')
    setLeads([])
  }

  function formatDate(ts?: string) {
    if (!ts) return '—'
    try { return new Date(ts).toLocaleString() } catch { return ts }
  }

  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Dev banner */}
      <div
        style={{
          backgroundColor: '#c0392b',
          color: '#fff',
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          textAlign: 'center',
          padding: '10px 24px',
          letterSpacing: '0.05em',
        }}
      >
        Development mode — replace with Follow Up Boss integration before going live.
      </div>

      <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '6px' }}>
              Admin
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: '#fff' }}>
              Leads ({leads.length})
            </h1>
          </div>
          <button
            onClick={clearLeads}
            className="btn-gold"
            style={{ fontSize: '11px' }}
          >
            CLEAR ALL LEADS
          </button>
        </div>

        {leads.length === 0 ? (
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#555' }}>No leads captured yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '13px' }}>
              <thead>
                <tr>
                  {['Timestamp', 'Source', 'Name', 'Email', 'Phone', 'Intent', 'Newsletter'].map(col => (
                    <th
                      key={col}
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        backgroundColor: '#1a1a1a',
                        color: 'var(--color-accent)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontSize: '11px',
                        borderBottom: '2px solid var(--color-accent)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...leads].reverse().map((lead, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: '1px solid #222' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', color: '#888', whiteSpace: 'nowrap' }}>{formatDate(lead.timestamp)}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>{lead.source || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#fff' }}>
                      {[lead.firstName, lead.lastName].filter(Boolean).join(' ') || '—'}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#ccc' }}>{lead.email || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#ccc' }}>{lead.phone || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#ccc' }}>{lead.intent || '—'}</td>
                    <td style={{ padding: '12px 16px', color: lead.isNewsletter ? 'var(--color-accent)' : '#555' }}>
                      {lead.isNewsletter ? 'Yes' : 'No'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
