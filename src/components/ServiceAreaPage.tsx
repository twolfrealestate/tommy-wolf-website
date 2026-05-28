import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from './FadeSection'
import ImagePlaceholder from './ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../lib/leads'

export interface ServiceAreaConfig {
  title: string
  subtitle: string
  slug: string
  imgSrc: string
  imgLabel: string
  eyebrow: string
  overview: string[]
  stats: { value: string; label: string }[]
  marketNote: string
  formSource: string
}

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

export default function ServiceAreaPage({ config }: { config: ServiceAreaConfig }) {
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
    saveLead({ ...form, source: config.formSource })
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
      {/* HERO — full bleed */}
      <FadeSection
        style={{
          position: 'relative',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ImagePlaceholder
            src={config.imgSrc}
            alt={config.imgLabel}
            fallbackLabel={config.imgLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1 }} />
        <div className="content-wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>{config.eyebrow}</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,5vw,60px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '18px',
            }}
          >
            {config.title}
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '20px',
              color: '#ccc',
            }}
          >
            {config.subtitle}
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* OVERVIEW — two column */}
      <FadeSection className="section section--light">
        <div
          className="content-wrap"
        >
          <div
            className="fade-up"
            style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <p className="eyebrow">{config.eyebrow}</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px,3vw,38px)',
                color: 'var(--color-text)',
              }}
            >
              {config.title}
            </h2>
            {config.overview.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: '15px',
                  color: 'var(--color-text-mid)',
                  lineHeight: 1.9,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* STATS ROW */}
      <FadeSection className="section section--dark">
        <div
          className="content-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {config.stats.map(stat => (
            <div
              key={stat.label}
              className="fade-up"
              style={{
                textAlign: 'center',
                padding: '32px 24px',
                borderTop: '2px solid var(--color-accent)',
                backgroundColor: '#1a1a1a',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '36px',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#888',
                }}
              >
                {stat.label} *
              </p>
            </div>
          ))}
        </div>
        <p
          className="fade-up"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: '#555',
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          * Updated periodically
        </p>
      </FadeSection>

      {/* MARKET NOTE */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '760px' }}>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: 'var(--color-text-mid)',
              lineHeight: 1.9,
            }}
          >
            {config.marketNote}
          </p>
        </div>
      </FadeSection>

      {/* CONTACT FORM */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '620px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Let's Talk</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(26px,3vw,38px)',
              color: '#fff',
              marginBottom: '32px',
            }}
          >
            Interested in {config.title.replace(' Real Estate', '')}?
          </h2>

          {submitted ? (
            <div
              className="fade-up"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '40px', textAlign: 'center' }}
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
                gap: '18px',
              }}
            >
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
                <textarea rows={4} style={{ ...darkInput(), resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell me about your goals..." />
              </div>
              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px' }}>
                LET'S CONNECT
              </button>
            </form>
          )}
        </div>
      </FadeSection>

      {/* CTA FOOTER */}
      <FadeSection className="section section--primary" style={{ textAlign: 'center' }}>
        <div className="content-wrap" style={{ maxWidth: '600px' }}>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(26px,3vw,40px)',
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Thinking of buying or selling in {config.title.replace(' Real Estate', '')}?
          </h2>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#aaa', marginBottom: '32px' }}>
            Let's talk.
          </p>
          <div className="fade-up">
            <Link to="/contact" className="btn-gold">CONTACT TOMMY</Link>
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
