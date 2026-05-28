import { useEffect, useState } from 'react'
import FadeSection from '../components/FadeSection'
import { saveLead, formatPhone, validateEmail } from '../lib/leads'

const faqs = [
  {
    q: 'How do I know what my home is worth?',
    a: "Value is driven by recent comparable sales in your specific neighborhood, your home's condition and upgrades, and current supply and demand. In Daybreak, this gets nuanced — a home in Lake Village and a similar home in North Shore can sell very differently in the same month. I provide a free, detailed Comparative Market Analysis that accounts for neighborhood-level data, not just zip code averages.",
  },
  {
    q: 'When is the best time to sell in Daybreak?',
    a: "Spring (March–May) sees the highest buyer demand. But Daybreak's active community and strong year-round buyer pool mean well-priced homes sell across all seasons. Timing matters far less than pricing and presentation.",
  },
  {
    q: 'What should I do before listing?',
    a: "Focus on high-ROI improvements: deep clean, declutter, fresh neutral paint if needed, and curb appeal. I walk every home before listing and give specific, honest recommendations — I won't ask you to over-invest in renovations that won't return.",
  },
  {
    q: 'How do you market my home?',
    a: "Every listing gets professional photography, MLS placement, syndication to all major portals, targeted social and digital advertising, and outreach to my buyer network. Digital-first, because that's where buyers are.",
  },
  {
    q: "What's the difference between list price and net proceeds?",
    a: 'Net proceeds are what you walk away with after mortgage payoff, seller closing costs (typically 1–3%), commissions, and concessions. I provide a detailed net sheet before we list so there are no surprises.',
  },
  {
    q: 'What do Daybreak sellers need to know about HOA disclosures?',
    a: 'Utah law requires sellers to disclose HOA information — assessments, special assessments, pending litigation, and governing documents. In Daybreak, this includes the DCA Master Association and any applicable sub-association. All closing disclosures must go through homewisedocs.com. I manage this process so nothing falls through.',
  },
  {
    q: 'What is the Daybreak community enhancement fee?',
    a: 'At closing, Daybreak sellers pay 0.5% of the sale price as a community enhancement fee funding LiveDAYBREAK programming. I include this in your net sheet from day one.',
  },
  {
    q: 'Can you help me buy my next home while selling?',
    a: 'Absolutely. I help you evaluate simultaneous buy-sell options — selling first, bridge strategies, or contingent offers — based on your equity, timeline, and risk tolerance.',
  },
  {
    q: 'How do you handle multiple offers?',
    a: 'I present each offer with a side-by-side comparison covering price, financing, contingencies, closing timeline, and escalation clauses. The highest number isn\'t always the strongest offer. I help you evaluate the full picture.',
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--color-text)',
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: 'var(--color-accent)',
            fontSize: '18px',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: '22px',
            paddingLeft: '16px',
            borderLeft: '2px solid var(--color-accent)',
            marginLeft: '2px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--color-text-mid)',
              lineHeight: 1.8,
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  timeline: string
  message: string
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  timeline: '',
  message: '',
}

export default function Sellers() {
  useEffect(() => {
    document.title = 'Seller Resources | Tommy Wolf REALTOR®'
  }, [])

  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const e: Partial<FormState> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !validateEmail(form.email)) e.email = 'Valid email required'
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    // TODO: POST to Follow Up Boss API
    saveLead({ ...form, source: 'sellers-form' })
    setSubmitted(true)
  }

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    backgroundColor: '#1a1a1a',
    border: `1px solid ${err ? '#c0392b' : '#333'}`,
    padding: '12px 16px',
    color: '#fff',
    outline: 'none',
  })

  const selectStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    padding: '12px 16px',
    color: '#fff',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
    cursor: 'pointer',
  }

  return (
    <main>
      {/* HERO */}
      <FadeSection
        className="section section--primary"
        style={{ minHeight: '320px', display: 'flex', alignItems: 'center' }}
      >
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Seller Resources</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,5vw,56px)',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Selling Your Home in Daybreak & South Jordan
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 300,
              color: '#ccc',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Your questions answered before we even meet.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* FAQ ACCORDION */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '800px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Common Questions</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px,4vw,44px)',
              color: 'var(--color-text)',
              marginBottom: '48px',
            }}
          >
            Seller FAQ
          </h2>
          <div className="fade-up">
            {faqs.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* LEAD CAPTURE FORM */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '680px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px', color: 'var(--color-accent)' }}>Get Started</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,40px)',
              color: '#fff',
              marginBottom: '36px',
            }}
          >
            Ready to Sell? Let's Talk.
          </h2>

          {submitted ? (
            <div
              className="fade-up"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-accent)' }}>
                Message sent. I'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form
              className="fade-up"
              onSubmit={handleSubmit}
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* First / Last */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>First Name *</label>
                  <input
                    style={inputStyle(errors.firstName)}
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    placeholder="First"
                  />
                  {errors.firstName && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Last Name *</label>
                  <input
                    style={inputStyle(errors.lastName)}
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    placeholder="Last"
                  />
                  {errors.lastName && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.lastName}</p>}
                </div>
              </div>

              {/* Email / Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Email *</label>
                  <input
                    type="email"
                    style={inputStyle(errors.email)}
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="you@email.com"
                  />
                  {errors.email && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Phone</label>
                  <input
                    style={inputStyle()}
                    value={form.phone}
                    onChange={e => set('phone', formatPhone(e.target.value))}
                    placeholder="(801) 000-0000"
                  />
                </div>
              </div>

              {/* Property Address */}
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Property Address</label>
                <input
                  style={inputStyle()}
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="123 Main St, South Jordan, UT"
                />
              </div>

              {/* Timeline */}
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Timeline</label>
                <select
                  style={selectStyle}
                  value={form.timeline}
                  onChange={e => set('timeline', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option>Next 30 days</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                  <option>Just exploring</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Message</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle(), resize: 'vertical' }}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder="Tell me about your property and goals..."
                />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px' }}>
                REQUEST A FREE VALUATION
              </button>
            </form>
          )}
        </div>
      </FadeSection>
    </main>
  )
}
