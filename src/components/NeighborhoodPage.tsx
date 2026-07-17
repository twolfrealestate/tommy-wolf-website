import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from './FadeSection'
import ImagePlaceholder from './ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../lib/leads'
import type { NeighborhoodConfig } from '../data/neighborhoods'

interface FormState {
  firstName: string; lastName: string; email: string; phone: string; message: string
}
const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', message: '' }

export default function NeighborhoodPage({ config }: { config: NeighborhoodConfig }) {
  const imgSrc = `/neighborhoods/${config.slug}.png`
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
    saveLead({ ...form, source: `${config.slug}-inquiry` })
    // Fire-and-forget send to Netlify function; localStorage already succeeded, so do not block the UI or surface errors
    try {
      fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: `Website - Neighborhood: ${config.name}`,
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

  const darkInput = (err?: string): React.CSSProperties => ({
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    backgroundColor: '#1a1a1a',
    border: `1px solid ${err ? '#c0392b' : '#333'}`,
    padding: '12px 16px',
    color: '#fff',
    outline: 'none',
  })

  return (
    <main>
      {/* Back link */}
      <div style={{ backgroundColor: 'var(--color-primary)', padding: '14px 24px' }}>
        <div className="content-wrap">
          <Link
            to="/service-areas/daybreak/neighborhoods"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-accent)',
            }}
          >
            ← ALL DAYBREAK NEIGHBORHOODS
          </Link>
        </div>
      </div>

      {/* HERO */}
      <FadeSection
        style={{
          position: 'relative',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ImagePlaceholder src={imgSrc} alt={config.name} fallbackLabel={config.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1 }} />
        <div className="content-wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '10px' }}>
            {config.types.join(' / ')} | Est. {config.year}
          </p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(34px,5vw,56px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '12px',
            }}
          >
            {config.name}
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#ccc' }}>
            Daybreak, South Jordan, UT
          </p>
        </div>
      </FadeSection>

      <div className="gold-rule-full" />

      {/* OVERVIEW */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <div className="fade-up" style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p className="eyebrow">About {config.name}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,34px)', color: 'var(--color-text)' }}>
              {config.h2}
            </h2>
            {config.paragraphs.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}>{p}</p>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* WHO IT'S BEST FOR */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,36px)', color: '#fff', marginBottom: '32px' }}>
            Who It's Best For
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {config.whoFor.map(w => (
              <div key={w.label} style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid var(--color-accent)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '10px' }}>
                  {w.label}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', lineHeight: 1.7 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* KEY HIGHLIGHTS */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,36px)', color: 'var(--color-text)', marginBottom: '32px' }}>
            Key Highlights
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {config.highlights.map(h => (
              <div key={h.label} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', padding: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{h.icon}</span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-mid)', lineHeight: 1.6 }}>{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* HOA & FEES */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '760px' }}>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--color-accent)', marginBottom: '20px' }}>
            HOA & Fees
          </h2>
          <div
            className="fade-up"
            style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '28px', borderLeft: '3px solid var(--color-accent)' }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ccc', lineHeight: 1.8 }}>{config.hoa}</p>
          </div>
        </div>
      </FadeSection>

      {/* MARKET SNAPSHOT */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            Market Snapshot
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Est. Price Range', value: config.priceRange },
              { label: 'Neighborhood Type', value: config.types[0] },
              { label: 'Avg DOM', value: '~21 days *' },
            ].map(stat => (
              <div key={stat.label} style={{ border: '1px solid var(--color-border)', borderTop: '2px solid var(--color-accent)', padding: '24px', textAlign: 'center', backgroundColor: '#fff' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--color-accent)', marginBottom: '8px' }}>{stat.value}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-text-light)', marginTop: '12px' }}>
            * All market data is approximate and updated periodically. Verify HOA fees and community rules at mydaybreak.com and through homewisedocs.com for any transaction.
          </p>
        </div>
      </FadeSection>

      {/* CONTACT FORM */}
      <FadeSection className="section section--primary">
        <div className="content-wrap" style={{ maxWidth: '620px' }}>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,36px)', color: '#fff', marginBottom: '28px' }}>
            Interested in {config.name}?
          </h2>

          {submitted ? (
            <div className="fade-up" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-accent)' }}>
                Message sent. I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form className="fade-up" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>First Name *</label>
                  <input style={darkInput(errors.firstName)} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First" />
                  {errors.firstName && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Last Name *</label>
                  <input style={darkInput(errors.lastName)} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last" />
                  {errors.lastName && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.lastName}</p>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Email *</label>
                  <input type="email" style={darkInput(errors.email)} value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
                  {errors.email && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Phone</label>
                  <input style={darkInput()} value={form.phone} onChange={e => set('phone', formatPhone(e.target.value))} placeholder="(801) 000-0000" />
                </div>
              </div>
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Message</label>
                <textarea rows={4} style={{ ...darkInput(), resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder={`Tell me about your interest in ${config.name}...`} />
              </div>
              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px' }}>
                CONTACT TOMMY
              </button>
            </form>
          )}

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#555', textAlign: 'center', marginTop: '24px' }}>
            All market data is approximate and updated periodically. Verify HOA fees and community rules at mydaybreak.com and through homewisedocs.com for any transaction.
          </p>
        </div>
      </FadeSection>
    </main>
  )
}
