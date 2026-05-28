import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../../../components/FadeSection'
import ImagePlaceholder from '../../../components/ImagePlaceholder'
import neighborhoods from '../../../data/neighborhoods'

export default function NeighborhoodsIndex() {
  useEffect(() => {
    document.title = 'Daybreak Neighborhoods Guide | Tommy Wolf REALTOR®'
  }, [])

  return (
    <main>
      {/* HERO */}
      <FadeSection
        className="section section--primary"
        style={{ minHeight: '320px', display: 'flex', alignItems: 'center' }}
      >
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Daybreak, South Jordan</p>
          <h1
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px,5vw,56px)', color: '#fff', marginBottom: '18px' }}
          >
            Daybreak Neighborhoods
          </h1>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 300, color: '#ccc', maxWidth: '560px', margin: '0 auto' }}
          >
            11 distinct villages. One community. Here's how to choose the right one.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* INTRO */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.9, textAlign: 'center' }}
          >
            Daybreak isn't one neighborhood — it's a collection of 11 distinct villages developed in phases since 2004. They vary significantly in character, price range, density, proximity to amenities, and HOA structure. As a Daybreak resident and local REALTOR®, I can help you navigate each one.
          </p>
        </div>
      </FadeSection>

      {/* NEIGHBORHOOD GRID */}
      <FadeSection className="section section--light" style={{ paddingTop: 0 }}>
        <div className="content-wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {neighborhoods.map(n => (
              <div
                key={n.slug}
                className="fade-up"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--color-border)',
                  borderTop: '2px solid var(--color-accent)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Photo */}
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <ImagePlaceholder
                    src={`/neighborhoods/${n.slug}.png`}
                    alt={n.name}
                    fallbackLabel={n.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '22px',
                        color: 'var(--color-text)',
                        lineHeight: 1.2,
                      }}
                    >
                      {n.name}
                    </h2>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        backgroundColor: 'var(--color-bg-mid)',
                        color: 'var(--color-accent)',
                        padding: '3px 8px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Est. {n.year}
                    </span>
                  </div>

                  {/* Type pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {n.types.map(t => (
                      <span
                        key={t}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          backgroundColor: 'var(--color-primary)',
                          color: '#fff',
                          padding: '3px 8px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'var(--color-text-mid)',
                      lineHeight: 1.7,
                      flex: 1,
                    }}
                  >
                    {n.paragraphs[0].substring(0, 140).trimEnd()}…
                  </p>

                  <Link
                    to={`/service-areas/daybreak/neighborhoods/${n.slug}`}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-accent)',
                      marginTop: 'auto',
                    }}
                  >
                    EXPLORE →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* CONTACT NUDGE */}
      <FadeSection className="section section--primary" style={{ textAlign: 'center' }}>
        <div className="content-wrap" style={{ maxWidth: '600px' }}>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,40px)', color: '#fff', marginBottom: '16px' }}
          >
            Not sure which neighborhood fits your goals?
          </h2>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#aaa', marginBottom: '32px' }}
          >
            That's exactly what I'm here for.
          </p>
          <div className="fade-up">
            <Link to="/contact" className="btn-gold">LET'S TALK →</Link>
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
