import { useEffect, useState } from 'react'
import FadeSection from '../components/FadeSection'
import { saveLead, formatPhone, validateEmail } from '../lib/leads'

const faqs = [
  {
    q: 'How do I know how much home I can afford?',
    a: 'Start with a lender pre-approval — it tells you your actual buying power and makes your offer competitive. Your monthly cost includes principal, interest, property taxes, HOA fees (which vary significantly by Daybreak neighborhood), and homeowner\'s insurance. I always recommend pre-approval before touring so we\'re shopping in the right range from day one.',
  },
  {
    q: 'What are HOA fees in Daybreak and what do they cover?',
    a: 'Most Daybreak homeowners pay the DCA Master Association quarterly assessment of $433.50 (2026 rate, ~$144.50/month), which includes Quantum Fiber internet (500 Mbps), five community pools, the Community Center and gym, Oquirrh Lake access, the Watercourse, watercraft rentals, 50+ miles of trails, and dozens of parks. If you live in a townhome or condo, a sub-association fee applies on top of this — ranging from ~$213/month (South Station Townhomes) to over $400/month (Garden Park Condos). Knowing the full fee picture before you make an offer is something I make a priority.',
  },
  {
    q: 'What makes each Daybreak neighborhood different?',
    a: "Each of Daybreak's 11 neighborhoods has its own character, price range, HOA structure, and amenity proximity. Founders Park Village is the most established with mature trees and the original community feel. North Shore has the most affordable density options with lake access. Lake Village and SoDa Row offer the closest lake and downtown access. Garden Park and SpringHouse are 55+ communities. Highland Park and Heights Park are newer Upper Villages west of Mountain View Corridor. Understanding which neighborhood fits your lifestyle is something I specialize in — I live here.",
  },
  {
    q: 'What is earnest money and how much do I need?',
    a: "Earnest money is a good-faith deposit submitted with your offer, typically 1–2% of the purchase price in Utah. It's applied toward your down payment or closing costs at closing. If you back out for a reason covered by your contract contingencies, you get it back.",
  },
  {
    q: 'What are closing costs for buyers?',
    a: 'Buyers typically pay 2–4% of the loan amount — covering lender fees, title insurance, escrow fees, prepaid taxes, and homeowner\'s insurance. Your lender provides a Loan Estimate within 3 days of application.',
  },
  {
    q: 'What is the 12-month no-resale rule in Daybreak?',
    a: 'Daybreak HOA rules require buyers to sign an affidavit at closing agreeing not to resell within 12 months. Exceptions: death, divorce, job transfer of 60+ miles. Violating this carries a $25,000 fine. I make sure every buyer understands this before we write an offer.',
  },
  {
    q: 'Are short-term rentals allowed in Daybreak?',
    a: 'No. Airbnb, VRBO, and similar platforms are prohibited. For long-term rentals, you must have owner-occupied the home for 12 consecutive months first. The HOA enforces these rules.',
  },
  {
    q: 'Do I need a REALTOR® to buy new construction?',
    a: "Yes — and it costs you nothing. The builder pays the buyer's agent commission. Their sales rep works for the builder, not you. I can review contract language, negotiate incentives, and walk the design studio with you — all at no extra cost.",
  },
  {
    q: 'What is a sub-association in Daybreak and why does it matter?',
    a: "Sub-associations govern specific buildings or complexes — typically townhomes and condos — and charge fees on top of the Master Association. Before any offer, I'll help you understand every fee that applies and what you get for it.",
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border)',
      }}
    >
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
  timeline: string
  budget: string
  message: string
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  timeline: '',
  budget: '',
  message: '',
}

export default function Buyers() {
  useEffect(() => {
    document.title = 'Buyer Resources | Tommy Wolf REALTOR®'
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
    saveLead({ ...form, source: 'buyers-form' })
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
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Buyer Resources</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,5vw,56px)',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Buying a Home in Daybreak & South Jordan
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
            Answers to the questions buyers ask me most.
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
            Buyer FAQ
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
            Ready to Start Your Search?
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
                Message sent. I'll be in touch soon.
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

              {/* Timeline / Budget */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Timeline</label>
                  <select
                    style={selectStyle}
                    value={form.timeline}
                    onChange={e => set('timeline', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option>ASAP</option>
                    <option>1–3 months</option>
                    <option>3–6 months</option>
                    <option>Just exploring</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Budget</label>
                  <select
                    style={selectStyle}
                    value={form.budget}
                    onChange={e => set('budget', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option>Under $400K</option>
                    <option>$400K–$600K</option>
                    <option>$600K–$800K</option>
                    <option>$800K–$1M</option>
                    <option>$1M+</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Message</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle(), resize: 'vertical' }}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder="Tell me a bit about what you're looking for..."
                />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px' }}>
                LET'S CONNECT
              </button>
            </form>
          )}
        </div>
      </FadeSection>
    </main>
  )
}
