import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder'
import FadeSection from '../components/FadeSection'
import { saveLead, formatPhone } from '../lib/leads'

/* ─── Neighborhood data ────────────────────────────────────── */
const NEIGHBORHOODS = [
  { name: 'Founders Park Village', teaser: 'The original 2004 village — front-porch charm & mature trees', slug: 'founders-park-village' },
  { name: 'North Shore Village',   teaser: 'Affordable lakeside living on Daybreak\'s northern shore',    slug: 'north-shore-village' },
  { name: 'Heights Park Village',  teaser: 'Elevated lake & Wasatch views in the Upper Villages',         slug: 'heights-park-village' },
  { name: 'Lake Village',          teaser: 'Waterfront & water-view homes on Oquirrh Lake\'s west shore', slug: 'lake-village' },
  { name: 'Eastlake Village',      teaser: 'Premier homes & Promenade Park on the lake\'s east shore',    slug: 'eastlake-village' },
  { name: 'Garden Park',           teaser: '55+ active adult community with a private 14,000 sq ft club', slug: 'garden-park' },
  { name: 'SoDa Row',              teaser: 'Daybreak\'s urban core — walk to shops, dining & the lake',   slug: 'soda-row' },
  { name: 'South Station Village', teaser: 'Transit-oriented townhomes steps from TRAX & downtown',       slug: 'south-station-village' },
  { name: 'Highland Park Village', teaser: 'The Loop trails, The Hub pool & competitive Upper Village pricing', slug: 'highland-park-village' },
  { name: 'SpringHouse Village',   teaser: '55+ resort-style living with a private community center',     slug: 'springhouse-village' },
  { name: 'Creekside Village',     teaser: '15-acre Brookside Park, creek trails & multi-builder variety', slug: 'creekside-village' },
]

/* ─── NeighborhoodCard ─────────────────────────────────────── */
function NeighborhoodCard({ name, teaser, slug }: { name: string; teaser: string; slug: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={`/service-areas/daybreak/neighborhoods/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        flexShrink: 0,
        width: '280px',
        backgroundColor: '#111111',
        border: hovered ? '1px solid var(--color-accent)' : '1px solid #222',
        padding: '28px 24px',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        textDecoration: 'none',
        scrollSnapAlign: 'start',
      }}
    >
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400, color: '#fff', marginBottom: '10px', lineHeight: 1.2 }}>
        {name}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-accent)', lineHeight: 1.5, fontWeight: 400 }}>
        {teaser}
      </p>
    </Link>
  )
}

/* ─── Feature icon item ────────────────────────────────────── */
function FeatureItem({ icon, label, description }: { icon: string; label: string; description: string }) {
  return (
    <div className="fade-up" style={{ textAlign: 'center', flex: '1 1 200px' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px', lineHeight: 1 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '8px' }}>
        {label}
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', fontWeight: 300, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  )
}

/* ─── Form field helper ────────────────────────────────────── */
function Field({
  label, id, value, onChange, error, type = 'text', placeholder, required,
}: {
  label: string; id: string; value: string
  onChange: (v: string) => void; error?: string
  type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
      {error && (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#c0392b' }}>{error}</span>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  useEffect(() => {
    document.title = 'Home | Tommy Wolf REALTOR® | Lawson Real Estate Team'
  }, [])

  /* valuation form state */
  const [form, setForm] = useState({ firstName: '', lastName: '', address: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function set(field: string) {
    return (val: string) => {
      setForm(f => ({ ...f, [field]: val }))
      setErrors(e => ({ ...e, [field]: '' }))
    }
  }

  function handleValuationSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim())  errs.lastName  = 'Last name is required'
    if (!form.address.trim())   errs.address   = 'Property address is required'
    if (!form.email.trim())     errs.email     = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (Object.keys(errs).length) { setErrors(errs); return }

    saveLead({ ...form, source: 'home-valuation' })
    // TODO: POST to Follow Up Boss API
    setSubmitted(true)
  }

  return (
    <main>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO (100vh, full bleed)
      ══════════════════════════════════════════ */}
      <FadeSection
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            backgroundColor: '#1a1a1a',
          }}
        >
          <source src="/website-loop.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.50)', zIndex: 1 }} />

        {/* Hero content — z-index 2 sits above overlay */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '20px' }}>
            Daybreak &amp; South Jordan, Utah
          </p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(44px, 6vw, 72px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Find Your Place in Daybreak
          </h1>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.88)', marginBottom: '0' }}
          >
            Local expertise. Honest guidance. Real results.
          </p>
          <span
            className="fade-up"
            style={{ display: 'block', width: '60px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '24px auto' }}
          />
          <div className="fade-up" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/service-areas/daybreak/neighborhoods" className="btn-outline-gold">
              Explore Neighborhoods
            </Link>
            <a href="#home-valuation" className="btn-gold">
              Get Home Value
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 2 — HOME VALUATION
      ══════════════════════════════════════════ */}
      <FadeSection
        id="home-valuation"
        as="section"
        style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--section-pad-desktop) 24px' }}
      >
        <div className="content-wrap" style={{ maxWidth: '760px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px', textAlign: 'center' }}>Free Home Valuation</p>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,44px)', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '16px' }}
          >
            What Is Your Home Worth?
          </h2>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', textAlign: 'center', lineHeight: 1.7, marginBottom: '48px' }}
          >
            Get a complimentary, no-obligation valuation from a local expert who actually lives in the community.
          </p>

          {/* Card */}
          <div
            className="fade-up"
            style={{
              backgroundColor: '#fff',
              border: '1px solid var(--color-border)',
              padding: '40px',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  Thank you — I'll be in touch within 24 hours.
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)' }}>
                  Your valuation request has been received.
                </p>
              </div>
            ) : (
              <form onSubmit={handleValuationSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Row 1: First / Last */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
                  <Field label="First Name" id="firstName" value={form.firstName} onChange={set('firstName')} error={errors.firstName} required />
                  <Field label="Last Name"  id="lastName"  value={form.lastName}  onChange={set('lastName')}  error={errors.lastName}  required />
                </div>

                {/* Row 2: Address */}
                <Field label="Property Address" id="address" value={form.address} onChange={set('address')} error={errors.address} required placeholder="123 Daybreak Pkwy, South Jordan, UT" />

                {/* Row 3: Email / Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
                  <Field label="Email" id="email" type="email" value={form.email} onChange={set('email')} error={errors.email} required placeholder="you@email.com" />
                  <Field
                    label="Phone"
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={v => set('phone')(formatPhone(v))}
                    placeholder="(801) 000-0000"
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', fontSize: '13px', padding: '16px', textAlign: 'center', letterSpacing: '0.12em' }}>
                  Request My Valuation
                </button>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-text-light)', textAlign: 'center' }}>
                  No obligation. Response within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .form-row-2 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 3 — SERVICES PREVIEW
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg-dark)', padding: 'var(--section-pad-desktop) 24px' }}>
        <div className="content-wrap">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>What I Offer</p>
            <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,44px)', color: '#fff' }}>
              Full-Service Real Estate
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="services-grid">
            {[
              {
                title: 'LISTING SERVICES',
                body: 'From pricing strategy to professional photography and targeted digital marketing — every detail handled so your home sells for top dollar.',
              },
              {
                title: 'BUYER REPRESENTATION',
                body: 'First-time buyer or relocating from out of state, I guide you from search to keys with local knowledge you can\'t Google.',
              },
              {
                title: 'MARKET INTELLIGENCE',
                body: 'Hyperlocal Daybreak data, neighborhood-by-neighborhood analysis, and transparent pricing advice.',
              },
            ].map(card => (
              <div
                key={card.title}
                className="fade-up"
                style={{
                  backgroundColor: '#161616',
                  borderTop: '2px solid var(--color-accent)',
                  padding: '32px 28px',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '16px' }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#ccc', fontWeight: 300, lineHeight: 1.75 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="fade-up" style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              to="/services"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-accent)')}
            >
              View All Services →
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .services-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 4 — NEIGHBORHOODS PREVIEW
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--section-pad-desktop) 0' }}>
        {/* Header — has horizontal padding */}
        <div className="content-wrap fade-up" style={{ padding: '0 24px', marginBottom: '48px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Daybreak's 11 Neighborhoods</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,44px)', color: 'var(--color-primary)', marginBottom: '20px' }}>
            Every Village Has a Personality
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            Daybreak isn't one market — it's 11 distinct neighborhoods, each with its own character, price point, and HOA structure. I know them all firsthand.
          </p>
        </div>

        {/* Horizontal scroll strip */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            padding: '4px 24px 20px',
            scrollbarWidth: 'none',
          }}
          className="nhd-strip"
        >
          {NEIGHBORHOODS.map(n => (
            <NeighborhoodCard key={n.slug} {...n} />
          ))}
        </div>

        <div className="fade-up" style={{ textAlign: 'center', marginTop: '40px', padding: '0 24px' }}>
          <Link to="/service-areas/daybreak/neighborhoods" className="btn-gold">
            Explore All Neighborhoods →
          </Link>
        </div>

        <style>{`
          .nhd-strip::-webkit-scrollbar { display: none; }
          @media (min-width: 1024px) {
            .nhd-strip {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr);
              overflow-x: visible !important;
              padding: 4px 24px 0 !important;
              max-width: var(--max-content);
              margin: 0 auto;
            }
            .nhd-strip > a { width: auto !important; }
          }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 5 — DAYBREAK FEATURES PREVIEW
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg-dark)', padding: 'var(--section-pad-desktop) 24px' }}>
        <div className="content-wrap">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Daybreak Features</p>
            <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,44px)', color: '#fff', marginBottom: '20px' }}>
              The Amenities That Make Daybreak Worth It
            </h2>
            <p
              className="fade-up"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 300, color: '#aaa', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}
            >
              Your HOA covers more than you think. From a 65-acre private lake to 50+ miles of trails to a brand-new ballpark — here's what daily life actually looks like.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
            <FeatureItem icon="🌊" label="Oquirrh Lake"       description="65-acre private freshwater lake — boating, fishing & shoreline trails" />
            <FeatureItem icon="🚴" label="The Loop & Trails"  description="50+ miles of maintained trails including a protected Bike Highway" />
            <FeatureItem icon="🏊" label="5 Community Pools"  description="Included in your HOA — open Memorial Day through Labor Day" />
            <FeatureItem icon="⚾" label="Downtown Daybreak"  description="Salt Lake Bees ballpark, Megaplex cinema & a TRAX stop" />
          </div>

          <div className="fade-up" style={{ textAlign: 'center' }}>
            <Link
              to="/daybreak-features"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-accent)')}
            >
              Explore All Features →
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 6 — ABOUT PREVIEW (two-column)
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '420px' }} className="about-grid">
          {/* Left — photo */}
          <div style={{ overflow: 'hidden', minHeight: '420px' }}>
            <ImagePlaceholder
              src="/headshot.png"
              alt="Tommy Wolf REALTOR"
              fallbackLabel="Tommy Wolf"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>

          {/* Right — dark panel */}
          <div
            className="fade-up"
            style={{
              backgroundColor: 'var(--color-primary)',
              padding: '64px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <p className="eyebrow">Your Local Realtor®</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3vw,40px)', color: '#fff', lineHeight: 1.15 }}>
              Hi, I'm Tommy Wolf
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
              I'm a REALTOR® and proud Daybreak resident — raised in Sandy, refined in the Bay Area, and planted right here in South Jordan with my wife and two kids. That personal stake shapes how I serve every client.
            </p>
            <span className="gold-rule-full" style={{ maxWidth: '60px' }} />
            <div>
              <Link to="/about" className="btn-outline-gold">
                Learn More →
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; }
            .about-grid > div:first-child { min-height: 280px !important; height: 280px; }
          }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 7 — CONTACT CTA
      ══════════════════════════════════════════ */}
      <FadeSection style={{ backgroundColor: 'var(--color-primary)', padding: 'var(--section-pad-desktop) 24px' }}>
        <div className="content-wrap" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,48px)', color: '#fff', marginBottom: '20px' }}
          >
            Ready to Take the Next Step?
          </h2>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'rgba(255,255,255,0.75)', fontWeight: 300, lineHeight: 1.7, marginBottom: '40px' }}
          >
            Buying, selling, or just exploring — I'm here for the honest conversation.
          </p>
          <div className="fade-up" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">
              Contact Me
            </Link>
            <a href="#home-valuation" className="btn-outline-gold">
              Get Home Value
            </a>
          </div>
        </div>
      </FadeSection>

    </main>
  )
}
