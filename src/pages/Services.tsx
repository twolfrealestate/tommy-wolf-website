import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import { saveLead, formatPhone } from '../lib/leads'

/* ─── Data ─────────────────────────────────────────────────── */
const LISTING_SERVICES = [
  { icon: '📷', title: 'Professional Photography & Video',          desc: 'High-resolution stills, twilight shots, and walkthrough video that make your listing stand out online.' },
  { icon: '📊', title: 'Comparative Market Analysis',               desc: 'Neighborhood-level pricing backed by current data — not automated estimates — so you list at the right number.' },
  { icon: '📣', title: 'Targeted Digital Marketing',                desc: 'Paid social, search, and display campaigns aimed at the buyers most likely to convert on your home.' },
  { icon: '🔑', title: 'MLS & Syndication',                        desc: 'Full MLS entry plus syndication to Zillow, Realtor.com, Homes.com, and every major portal automatically.' },
  { icon: '🤝', title: 'Offer Negotiation & Strategy',              desc: 'Side-by-side offer comparison, escalation clause analysis, and strategy for maximizing your net proceeds.' },
  { icon: '📋', title: 'Transaction Coordination',                  desc: 'Deadlines, disclosures, title, and HOA docs tracked and managed from contract to close.' },
  { icon: '🏡', title: 'Pre-Listing Consultation',                  desc: 'An honest walkthrough with specific, ROI-focused recommendations before a single dollar is spent on prep.' },
  { icon: '📅', title: 'Open House Coordination',                   desc: 'Professionally staged and marketed open houses that create urgency and generate competitive offers.' },
  { icon: '📞', title: 'Consistent Communication',                  desc: 'Regular updates on showing feedback, market activity, and offer status — no chasing required.' },
]

const BUYER_SERVICES = [
  { icon: '🎯', title: 'Needs Assessment',                          desc: 'A real conversation about your goals, timeline, budget, and lifestyle before we ever tour a home.' },
  { icon: '🔍', title: 'Custom Property Search',                    desc: 'Curated MLS alerts based on your exact criteria — not generic Zillow notifications.' },
  { icon: '🏘️', title: 'Neighborhood Guidance',                    desc: 'Expert coverage of all 11 Daybreak villages plus South Jordan, Herriman, and Riverton.' },
  { icon: '📝', title: 'Offer Preparation & Strategy',              desc: 'Competitive offer structuring, escalation clauses, and earnest money guidance to win in any market.' },
  { icon: '🔎', title: 'Inspection & Due Diligence',               desc: 'Trusted inspector referrals, review of findings, and negotiation of repair credits or price adjustments.' },
  { icon: '🏦', title: 'Trusted Lender Referrals',                  desc: 'Connections to local lenders who close on time and give you honest pre-approval numbers.' },
]

/* ─── Shared field component ────────────────────────────────── */
function Field({
  label, id, value, onChange, error, type = 'text', placeholder, required, half,
}: {
  label: string; id: string; value: string
  onChange: (v: string) => void; error?: string
  type?: string; placeholder?: string; required?: boolean; half?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: half ? undefined : '1 / -1' }}>
      <label htmlFor={id} className="form-label">
        {label}{required && <span style={{ color: 'var(--color-accent)' }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
        style={{ borderColor: error ? '#c0392b' : undefined }}
      />
      {error && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#c0392b' }}>{error}</span>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SERVICES PAGE
═══════════════════════════════════════════════════════════ */
export default function Services() {
  useEffect(() => { document.title = 'Services | Tommy Wolf REALTOR®' }, [])

  /* ── contact form state ── */
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', intent: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function set(field: string) {
    return (val: string) => {
      setForm(f => ({ ...f, [field]: val }))
      setErrors(e => ({ ...e, [field]: '' }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim())  errs.lastName  = 'Required'
    if (!form.email.trim())     errs.email     = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (Object.keys(errs).length) { setErrors(errs); return }

    saveLead({ ...form, source: 'services-form' })
    // TODO: POST to Follow Up Boss API
    // Fire-and-forget send to Netlify function; localStorage already succeeded, so do not block the UI or surface errors
    try {
      fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Website - Services Page',
          type: 'Buyer',
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      }).catch(err => console.error('send-lead failed', err))
    } catch (err) {
      console.error('send-lead failed', err)
    }
    setSubmitted(true)
  }

  return (
    <main>

      {/* ══════════════════════════════════════════
          HERO — 320px, bg #0A0A0A
      ══════════════════════════════════════════ */}
      <FadeSection
        style={{
          backgroundColor: 'var(--color-primary)',
          height: '320px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="content-wrap" style={{ padding: '0 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Services</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            Real Estate Services
          </h1>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', maxWidth: '560px' }}
          >
            Everything you need to buy or sell with confidence in South Jordan and Daybreak.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* ══════════════════════════════════════════
          LISTING SERVICES — bg #FAFAF8
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--section-pad-desktop) 24px' }}>
        <div className="content-wrap">
          {/* Section header */}
          <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
            <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>For Sellers</p>
            <h2
              className="fade-up"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4vw, 44px)', color: 'var(--color-primary)', marginBottom: '20px', lineHeight: 1.15 }}
            >
              What's Included When You List With Me
            </h2>
            <p
              className="fade-up"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.75 }}
            >
              When you hire me to sell your home, you get a complete marketing and transaction management partner — not just a sign in the yard.
            </p>
          </div>

          {/* 3×3 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="services-grid">
            {LISTING_SERVICES.map(item => (
              <div
                key={item.title}
                className="fade-up"
                style={{
                  backgroundColor: '#fff',
                  borderTop: '2px solid var(--color-accent)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{item.icon}</span>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-primary)',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)', lineHeight: 1.7, fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          BUYER SERVICES — bg #111111
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg-dark)', padding: 'var(--section-pad-desktop) 24px' }}>
        <div className="content-wrap">
          {/* Section header */}
          <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
            <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>For Buyers</p>
            <h2
              className="fade-up"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4vw, 44px)', color: '#fff', lineHeight: 1.15 }}
            >
              How I Support Buyers
            </h2>
          </div>

          {/* 2-column list */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 48px' }} className="buyers-grid">
            {BUYER_SERVICES.map(item => (
              <div
                key={item.title}
                className="fade-up"
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
              >
                <span style={{ fontSize: '26px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#fff',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', lineHeight: 1.7, fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA nudge */}
          <div className="fade-up" style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#aaa', fontWeight: 300 }}>
              Buying a home in Daybreak or South Jordan? Let's talk.
            </p>
            <Link to="/buyers" className="btn-outline-gold" style={{ fontSize: '11px', padding: '10px 22px' }}>
              Buyer Resources →
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) { .buyers-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          CONTACT FORM — bg #FAFAF8
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--section-pad-desktop) 24px' }}>
        <div className="content-wrap" style={{ maxWidth: '760px' }}>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4vw, 44px)', color: 'var(--color-primary)', marginBottom: '48px', textAlign: 'center' }}
          >
            Let's Talk About Your Goals
          </h2>

          <div
            className="fade-up"
            style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', padding: '40px' }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '48px', color: 'var(--color-accent)', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  Message sent — I'll be in touch soon.
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)' }}>
                  I typically respond within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
                className="contact-form"
              >
                {/* First / Last */}
                <Field label="First Name" id="svc-firstName" value={form.firstName} onChange={set('firstName')} error={errors.firstName} required half />
                <Field label="Last Name"  id="svc-lastName"  value={form.lastName}  onChange={set('lastName')}  error={errors.lastName}  required half />

                {/* Email / Phone */}
                <Field label="Email" id="svc-email" type="email" value={form.email} onChange={set('email')} error={errors.email} required half placeholder="you@email.com" />
                <Field
                  label="Phone" id="svc-phone" type="tel"
                  value={form.phone}
                  onChange={v => set('phone')(formatPhone(v))}
                  placeholder="(801) 000-0000"
                  half
                />

                {/* Intent — full width */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: '1 / -1' }}>
                  <label htmlFor="svc-intent" className="form-label">I'm interested in</label>
                  <select
                    id="svc-intent"
                    value={form.intent}
                    onChange={e => set('intent')(e.target.value)}
                    className="form-input"
                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23888\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px', cursor: 'pointer' }}
                  >
                    <option value="">Select one...</option>
                    <option value="Buying">Buying</option>
                    <option value="Selling">Selling</option>
                    <option value="Both">Both</option>
                    <option value="Just Exploring">Just Exploring</option>
                  </select>
                </div>

                {/* Message — full width */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: '1 / -1' }}>
                  <label htmlFor="svc-message" className="form-label">Message</label>
                  <textarea
                    id="svc-message"
                    value={form.message}
                    onChange={e => set('message')(e.target.value)}
                    rows={5}
                    placeholder="Tell me a bit about what you're looking for..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Submit — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: '100%', fontSize: '13px', padding: '16px', letterSpacing: '0.12em' }}
                  >
                    Send My Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 560px) {
            .contact-form { grid-template-columns: 1fr !important; }
            .contact-form > * { grid-column: 1 / -1 !important; }
          }
        `}</style>
      </FadeSection>

    </main>
  )
}
