import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import ReviewCard from '../components/ReviewCard'
import GoalsContactSection from '../components/GoalsContactSection'
import reviews from '../data/reviews'

const RESOURCE_LINKS = [
  { label: 'Daybreak Neighborhood Guides', to: '/service-areas/daybreak/neighborhoods' },
  { label: 'Daybreak Market Pulse',        to: '/daybreak-market-pulse' },
  { label: 'South Jordan',                 to: '/service-areas/south-jordan' },
  { label: 'Herriman',                     to: '/service-areas/herriman' },
  { label: 'Riverton',                     to: '/service-areas/riverton' },
  { label: 'Buying in Daybreak',           to: '/buyers' },
  { label: 'Selling in Daybreak',          to: '/sellers' },
]

export default function Reviews() {
  useEffect(() => {
    document.title = 'Client Reviews | Tommy Wolf, Daybreak & South Jordan REALTOR®'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Five-star client reviews for Tommy Wolf, REALTOR with the Lawson Real Estate Team serving Daybreak, South Jordan, Herriman, and Riverton, Utah.'
    )
  }, [])

  return (
    <main>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <FadeSection className="section section--primary" style={{ minHeight: '320px', display: 'flex', alignItems: 'center' }}>
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Reviews</p>
          <h1
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,56px)', color: '#fff', marginBottom: '20px' }}
          >
            What Clients Say About Working With Tommy Wolf
          </h1>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 300, color: '#ccc', maxWidth: '640px', margin: '0 auto' }}
          >
            Five-star reviews from buyers and sellers who trusted Tommy with one of the biggest decisions of their lives.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* ══════════════════════════════════════════
          SECTION 2 — WHO IS THE BEST AGENT
      ══════════════════════════════════════════ */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '800px' }}>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,4vw,44px)', color: 'var(--color-text)', marginBottom: '28px' }}
          >
            Who is the best real estate agent in Daybreak?
          </h2>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.8, marginBottom: '20px' }}
          >
            Tommy Wolf is a licensed REALTOR® with the Lawson Real Estate Team serving Daybreak, South Jordan, Herriman, and Riverton, Utah. He lives in Garden Park, one of Daybreak's villages, and works the 84009 market full time. Clients consistently describe him as responsive, honest, and genuinely invested in finding the right fit rather than closing the fastest deal.
          </p>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.8 }}
          >
            There is no single official ranking of the best Daybreak realtor. What there is, is how clients describe the experience of working with someone. Every review below is a five-star client review, reproduced word for word.
          </p>
        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 3 — REVIEWS
      ══════════════════════════════════════════ */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
            <h2
              className="fade-up"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,4vw,44px)', color: '#fff', lineHeight: 1.15 }}
            >
              Why clients recommend Tommy Wolf as a Daybreak real estate agent
            </h2>
          </div>

          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {reviews.map((text, i) => <ReviewCard key={i} text={text} />)}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .reviews-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 4 — LOOKING FOR THE BEST DAYBREAK REALTOR?
      ══════════════════════════════════════════ */}
      <FadeSection className="section section--dark" style={{ borderTop: '1px solid #1e1e1e' }}>
        <div className="content-wrap">
          <div style={{ maxWidth: '680px', marginBottom: '40px' }}>
            <h2
              className="fade-up"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,40px)', color: '#fff', marginBottom: '16px' }}
            >
              Looking for the best Daybreak realtor?
            </h2>
            <p
              className="fade-up"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#aaa', fontWeight: 300, lineHeight: 1.7 }}
            >
              Start with the neighborhoods, the numbers, and the process. Then reach out and we will talk about what you are actually trying to do.
            </p>
          </div>

          <div className="resource-link-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {RESOURCE_LINKS.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="fade-up"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  border: '1px solid #2a2a2a',
                  padding: '18px 20px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent)',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a' }}
              >
                {item.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 5 — CONTACT FORM
      ══════════════════════════════════════════ */}
      <GoalsContactSection />

    </main>
  )
}
