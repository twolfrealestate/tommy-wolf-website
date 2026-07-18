import { useEffect, useState } from 'react'
import FadeSection from '../components/FadeSection'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../lib/leads'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  intent: string
  message: string
  isNewsletter: boolean
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  intent: '',
  message: '',
  isNewsletter: false,
}

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/tommywolfrealestate/',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/movetodaybreak/?hl=en',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | Tommy Wolf REALTOR®'
  }, [])

  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {}
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
    saveLead({ ...form, source: 'contact-form' })
    // Fire-and-forget send to Netlify function; localStorage already succeeded, so do not block the UI or surface errors
    try {
      fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Website - Contact Form',
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
    backgroundColor: '#111',
    border: `1px solid ${err ? '#c0392b' : '#333'}`,
    padding: '12px 16px',
    color: '#fff',
    outline: 'none',
  })

  const selectStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    backgroundColor: '#111',
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
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Get in Touch</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,5vw,56px)',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Let's Connect
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 300,
              color: '#ccc',
            }}
          >
            I typically respond within one business day.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* TWO-COLUMN */}
      <FadeSection className="section section--light">
        <div
          className="content-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '0',
            alignItems: 'stretch',
            minHeight: '560px',
          }}
        >
          {/* LEFT — contact info */}
          <div
            className="fade-up"
            style={{
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              backgroundColor: 'var(--color-bg)',
            }}
          >
            {/* Headshot circle */}
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--color-accent)',
                flexShrink: 0,
              }}
            >
              <ImagePlaceholder
                src="/headshot.png"
                alt="Tommy Wolf"
                fallbackLabel="Tommy Wolf"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '26px',
                  color: 'var(--color-text)',
                  marginBottom: '4px',
                }}
              >
                Tommy Wolf
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-accent)',
                }}
              >
                REALTOR® | Lawson Real Estate Team
              </p>
            </div>

            <span className="gold-rule-short" style={{ margin: '0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="mailto:twolfrealestate@gmail.com" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)' }}>
                📧 twolfrealestate@gmail.com
              </a>
              <a href="tel:+18015800647" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)' }}>
                📞 (801) 580-0647
              </a>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)' }}>
                📍 South Jordan, UT 84009
              </p>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  style={{
                    color: 'var(--color-text)',
                    transition: 'color 0.15s',
                    display: 'block',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text)')}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'var(--color-text-light)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Licensed in Utah
            </p>
          </div>

          {/* RIGHT — form */}
          <div
            className="fade-up"
            style={{ backgroundColor: 'var(--color-bg-dark)', padding: '48px' }}
          >
            <p className="eyebrow" style={{ marginBottom: '12px' }}>Send a Message</p>

            {submitted ? (
              <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-accent)' }}>
                  Message sent. I'll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '24px' }}
              >
                {/* First / Last */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label" style={{ color: 'var(--color-accent)' }}>First Name *</label>
                    <input
                      style={darkInput(errors.firstName)}
                      value={form.firstName}
                      onChange={e => set('firstName', e.target.value)}
                      placeholder="First"
                    />
                    {errors.firstName && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'var(--color-accent)' }}>Last Name *</label>
                    <input
                      style={darkInput(errors.lastName)}
                      value={form.lastName}
                      onChange={e => set('lastName', e.target.value)}
                      placeholder="Last"
                    />
                    {errors.lastName && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email / Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="form-label" style={{ color: 'var(--color-accent)' }}>Email *</label>
                    <input
                      type="email"
                      style={darkInput(errors.email)}
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="you@email.com"
                    />
                    {errors.email && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'var(--color-accent)' }}>Phone</label>
                    <input
                      style={darkInput()}
                      value={form.phone}
                      onChange={e => set('phone', formatPhone(e.target.value))}
                      placeholder="(801) 000-0000"
                    />
                  </div>
                </div>

                {/* Intent */}
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>What can I help you with?</label>
                  <select
                    style={selectStyle}
                    value={form.intent}
                    onChange={e => set('intent', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option>Buying</option>
                    <option>Selling</option>
                    <option>Home Valuation</option>
                    <option>Daybreak Neighborhood Question</option>
                    <option>General Question</option>
                    <option>Newsletter</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Message</label>
                  <textarea
                    rows={5}
                    style={{ ...darkInput(), resize: 'vertical' }}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="How can I help you?"
                  />
                </div>

                {/* Newsletter checkbox */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: '#aaa',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.isNewsletter}
                    onChange={e => set('isNewsletter', e.target.checked)}
                    style={{ accentColor: 'var(--color-accent)', width: '16px', height: '16px' }}
                  />
                  Sign me up for the Daybreak Real Estate Newsletter
                </label>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px' }}>
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeSection>

      {/* TRUST ROW */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { title: 'Licensed REALTOR®', body: 'Utah licensed. Local expertise in Daybreak, South Jordan, Herriman, and Riverton.' },
              { title: 'Quick Response', body: 'Within one business day. I take every inquiry seriously.' },
              { title: 'No Pressure', body: 'Just an honest conversation about your real estate goals.' },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderTop: '2px solid var(--color-accent)',
                  padding: '28px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#fff',
                    marginBottom: '10px',
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#888', lineHeight: 1.7 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
