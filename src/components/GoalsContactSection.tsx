import { useState } from 'react'
import FadeSection from './FadeSection'
import { saveLead, formatPhone } from '../lib/leads'

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
   "LET'S TALK ABOUT YOUR GOALS" CONTACT FORM
   Shared section used at the bottom of the Buyers and Sellers pages.
═══════════════════════════════════════════════════════════ */
export default function GoalsContactSection() {
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
              <Field label="First Name" id="goals-firstName" value={form.firstName} onChange={set('firstName')} error={errors.firstName} required half />
              <Field label="Last Name"  id="goals-lastName"  value={form.lastName}  onChange={set('lastName')}  error={errors.lastName}  required half />

              {/* Email / Phone */}
              <Field label="Email" id="goals-email" type="email" value={form.email} onChange={set('email')} error={errors.email} required half placeholder="you@email.com" />
              <Field
                label="Phone" id="goals-phone" type="tel"
                value={form.phone}
                onChange={v => set('phone')(formatPhone(v))}
                placeholder="(801) 000-0000"
                half
              />

              {/* Intent — full width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: '1 / -1' }}>
                <label htmlFor="goals-intent" className="form-label">I'm interested in</label>
                <select
                  id="goals-intent"
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
                <label htmlFor="goals-message" className="form-label">Message</label>
                <textarea
                  id="goals-message"
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
  )
}
