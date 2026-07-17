import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Lead capture ── */
function saveLead(data: Record<string, unknown>) {
  const leads: unknown[] = JSON.parse(localStorage.getItem('tw_leads') || '[]')
  leads.push({ ...data, timestamp: new Date().toISOString() })
  localStorage.setItem('tw_leads', JSON.stringify(leads))
  // TODO: POST to Follow Up Boss API with "Newsletter Subscriber" tag
}

/* ── Social icon SVGs (inline, no external deps) ── */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96C1 8.12 1 12 1 12s0 3.88.46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95C23 15.88 23 12 23 12s0-3.88-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  )
}

function SocialBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: hover ? 'var(--color-accent)' : '#555', transition: 'color 0.2s', display: 'inline-flex' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      to={to}
      style={{
        display: 'block', fontFamily: 'var(--font-sans)', fontSize: '13px',
        color: hover ? 'var(--color-accent)' : '#aaa', transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    saveLead({ email, source: 'footer-newsletter', isNewsletter: true })
    void (async () => {
      try {
        await fetch('/.netlify/functions/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'Footer Signup' }),
        })
      } catch (err) {
        console.error(err)
      }
    })()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
      {/* Gold top rule */}
      <div className="gold-rule-full" />

      <div className="content-wrap" style={{ padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '48px' }} className="footer-cols">

          {/* Col 1 — Brand + contact + newsletter signup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Logo */}
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#fff', letterSpacing: '0.05em', marginBottom: '5px' }}>
                TOMMY WOLF
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)' }}>
                Lawson Real Estate Team
              </div>
              <img
                src="/lawson-logo.png"
                alt="Lawson Real Estate Team | eXp Luxury"
                style={{ height: '28px', width: 'auto', mixBlendMode: 'screen', opacity: 0.85, marginTop: '12px', display: 'block' }}
              />
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '✉', text: 'twolfrealestate@gmail.com', href: '/contact' },
                { icon: '📞', text: '(801) 580-0647',           href: 'tel:+18015800647' },
                { icon: '📍', text: 'South Jordan, UT',       href: undefined },
              ].map(({ icon, text, href }) => (
                href ? (
                  <a key={text} href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{icon}</span>{text}
                  </a>
                ) : (
                  <span key={text} style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{icon}</span>{text}
                  </span>
                )
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <SocialBtn href="https://facebook.com"><FacebookIcon /></SocialBtn>
              <SocialBtn href="https://instagram.com"><InstagramIcon /></SocialBtn>
              <SocialBtn href="https://linkedin.com"><LinkedInIcon /></SocialBtn>
              <SocialBtn href="https://youtube.com"><YouTubeIcon /></SocialBtn>
            </div>

            {/* Newsletter micro-signup */}
            <div>
              <p className="eyebrow" style={{ marginBottom: '12px' }}>Stay in the Loop</p>
              {subscribed ? (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-accent)' }}>✓ You're subscribed!</p>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="form-input--dark"
                    style={{ fontSize: '13px', padding: '10px 14px' }}
                  />
                  <button
                    type="submit"
                    style={{
                      flexShrink: 0, backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)',
                      border: 'none', padding: '10px 16px', cursor: 'pointer',
                      fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>Quick Links</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/buyers">Buyers</FooterLink>
              <FooterLink to="/sellers">Sellers</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Col 3 — Explore */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>Explore</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: '8px' }}>
              Service Areas
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <FooterLink to="/service-areas/south-jordan">South Jordan</FooterLink>
              <FooterLink to="/service-areas/daybreak">Daybreak</FooterLink>
              <FooterLink to="/service-areas/herriman">Herriman</FooterLink>
              <FooterLink to="/service-areas/riverton">Riverton</FooterLink>
            </nav>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FooterLink to="/service-areas/daybreak/neighborhoods">Daybreak Neighborhoods</FooterLink>
              <FooterLink to="/daybreak-features">Daybreak Features</FooterLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #2a2a2a' }}>
        <div className="content-wrap" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#555' }}>
            © 2025 Tommy Wolf | Lawson Real Estate Team. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#444', lineHeight: 1.6 }}>
            Tommy Wolf | Lawson Real Estate Team | eXp Realty | Licensed in Utah | All information deemed reliable but not guaranteed.{' '}
            HOA fee data sourced from the 2026 DCA Quarterly Assessment Rate Sheet (2/20/2026) — verify at homewisedocs.com.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#444' }}>
            Tommy Wolf is a licensed REALTOR® in Utah. All information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
