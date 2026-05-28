import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import ImagePlaceholder from '../components/ImagePlaceholder'

export default function About() {
  useEffect(() => {
    document.title = 'About Tommy Wolf | Daybreak & South Jordan REALTOR®'
  }, [])

  return (
    <main>
      {/* HERO — full bleed image with overlay */}
      <FadeSection
        style={{
          position: 'relative',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ImagePlaceholder
            src="/easter-family.jpg"
            alt="Tommy Wolf REALTOR"
            fallbackLabel="Tommy Wolf"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.60)',
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div
          className="content-wrap"
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}
        >
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Meet Your REALTOR®</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(44px,6vw,64px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Tommy Wolf
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
            REALTOR® | South Jordan, Daybreak & Surrounding Communities
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* BIO — two column */}
      <FadeSection className="section section--light">
        <div
          className="content-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '420px 1fr',
            gap: '0',
            alignItems: 'stretch',
          }}
        >
          {/* Left image */}
          <div
            className="fade-up"
            style={{ height: '480px', overflow: 'hidden' }}
          >
            <ImagePlaceholder
              src="/headshot.png"
              alt="Tommy Wolf REALTOR"
              fallbackLabel="Tommy Wolf"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>

          {/* Right content */}
          <div
            className="fade-up"
            style={{
              padding: '48px',
              backgroundColor: 'var(--color-bg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <p className="eyebrow">Your Local REALTOR®</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px,4vw,42px)',
                color: 'var(--color-text)',
              }}
            >
              Hi, I'm Tommy Wolf
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}>
              I'm a licensed REALTOR® and proud Daybreak resident. My wife and I are raising our two children here and have genuinely put down roots in this community. I grew up in Sandy, and after nearly a decade working in real estate in the Bay Area, we made the deliberate choice to come home to Utah — and to Daybreak specifically.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}>
              That personal connection shapes everything about how I serve clients. I live in the community I sell. I understand the differences between neighborhoods — why a home in Lake Village commands a premium over a similar home in North Shore, how the new Downtown Daybreak development is affecting nearby values, which villages are appreciating fastest, and what Daybreak's HOA structure really means for a buyer's total monthly cost.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}>
              My service area covers all of South Jordan, Herriman, and Riverton as well. These are communities I know well — their schools, new developments, price trends, and character. Whether you're buying your first home, upsizing, or selling after years in the community, I bring local expertise most agents simply can't match.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}>
              I'm not just here to close a transaction. I'm here to serve my neighbors — honestly, transparently, and with your long-term interests at heart.
            </p>
            <div>
              <Link to="/contact" className="btn-outline-gold">LET'S CONNECT →</Link>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* WHY WORK WITH ME */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <p className="eyebrow fade-up" style={{ textAlign: 'center', marginBottom: '12px' }}>Why Tommy</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,44px)',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            Why Work With a Neighbor?
          </h2>
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: '🏘️',
                title: 'I Live Here',
                body: 'Raising my family in Daybreak. My personal stake in this community means you get an honest assessment — not a pitch.',
              },
              {
                icon: '📊',
                title: 'Hyperlocal Expertise',
                body: 'From sub-association fee differences to which neighborhoods are growing fastest to how Downtown Daybreak affects values — I track the details that matter.',
              },
              {
                icon: '🤝',
                title: 'Relationship First',
                body: 'My goal is a long-term relationship built on trust. Not a one-time commission.',
              },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  backgroundColor: '#1a1a1a',
                  borderTop: '2px solid var(--color-accent)',
                  padding: '32px',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#fff',
                    marginBottom: '12px',
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', lineHeight: 1.7 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* SERVICE AREAS */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,40px)',
              color: 'var(--color-text)',
              marginBottom: '36px',
              textAlign: 'center',
            }}
          >
            Communities I Serve
          </h2>
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { name: 'South Jordan', slug: 'south-jordan', desc: "Utah's fastest-growing city and home to Daybreak — a diverse, thriving community with top schools and direct Silicon Slopes access." },
              { name: 'Daybreak', slug: 'daybreak', desc: "Utah's premier master-planned community with 11 distinct neighborhoods, resort-style amenities, and a genuine sense of place." },
              { name: 'Herriman', slug: 'herriman', desc: 'Mountain views, newer construction, and competitive prices — Herriman offers space and scenery at the valley\'s southwest corner.' },
              { name: 'Riverton', slug: 'riverton', desc: 'Established neighborhoods with larger lots, mature trees, and a strong community identity in the heart of the south valley.' },
            ].map(area => (
              <div
                key={area.name}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderTop: '2px solid var(--color-accent)',
                  padding: '28px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    color: '#fff',
                    marginBottom: '10px',
                  }}
                >
                  {area.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', lineHeight: 1.7, marginBottom: '16px' }}>
                  {area.desc}
                </p>
                <Link
                  to={`/service-areas/${area.slug}`}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-accent)',
                  }}
                >
                  EXPLORE →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* CONTACT NUDGE */}
      <FadeSection
        className="section section--primary"
        style={{ textAlign: 'center' }}
      >
        <div className="content-wrap" style={{ maxWidth: '600px' }}>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,44px)',
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Let's Start the Conversation
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#aaa',
              marginBottom: '36px',
            }}
          >
            No pressure, no obligation — just an honest conversation about your real estate goals.
          </p>
          <div className="fade-up" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">CONTACT TOMMY</Link>
            <Link to="/#home-valuation" className="btn-outline-gold">GET HOME VALUE</Link>
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
