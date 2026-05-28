import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../../components/FadeSection'
import ImagePlaceholder from '../../components/ImagePlaceholder'
import features from '../../data/features'

const INDEX_CARDS = [
  { slug: 'oquirrh-lake', desc: 'A 65-acre private freshwater lake at the heart of Daybreak — one of the most unique residential amenities in the Western United States.' },
  { slug: 'watercourse', desc: "A chain of calm waterways winding through Daybreak's Upper Villages, completed in 2024, with paddling, trails, and pocket parks throughout." },
  { slug: 'the-loop', desc: "50+ miles of trails and a dedicated Bike Highway threading through every village — Daybreak's backbone for non-motorized mobility." },
  { slug: 'the-spoke', desc: 'A half-mile BMX and mountain bike park in the Upper Villages with features for all skill levels — from beginner berms to expert gaps.' },
  { slug: 'parks', desc: "Three dozen parks spread throughout the community — each unique, each designed for a 5-minute walk from every home." },
  { slug: 'pools', desc: 'Five community pools and a splash pad — open Memorial Day through Labor Day — plus neighborhood-specific pools in select communities.' },
  { slug: 'community-center', desc: 'A full club-quality gym, indoor track, basketball courts, group fitness classes, and a community swimming pool at the Daybreak Community Center.' },
  { slug: 'soda-row-shopping', desc: "Daybreak's original town center with dining, boutiques, coffee, barbershops, and the Beach Club — all walkable from the lake and surrounding neighborhoods." },
  { slug: 'downtown-daybreak', desc: "Utah's first sports and entertainment district — home to the Salt Lake Bees ballpark, Megaplex theater, new restaurants, a TRAX stop, and the U of U Health Center." },
  { slug: 'livedaybreak', desc: "The independent non-profit behind Daybreak's community culture — events, concerts, volunteer opportunities, and the programming that makes neighbors into friends." },
]

export default function DaybreakFeaturesIndex() {
  useEffect(() => {
    document.title = 'Daybreak Features & Amenities | Tommy Wolf REALTOR®'
  }, [])

  return (
    <main>
      {/* HERO */}
      <FadeSection
        className="section section--primary"
        style={{ minHeight: '400px', display: 'flex', alignItems: 'center' }}
      >
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Daybreak Features</p>
          <h1
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px,6vw,64px)', color: '#fff', marginBottom: '18px' }}
          >
            Life in Daybreak
          </h1>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 300, color: '#ccc', maxWidth: '600px', margin: '0 auto' }}
          >
            The amenities included with your HOA — and why they matter when you buy or sell.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* INTRO */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Why This Matters</p>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,40px)', color: 'var(--color-text)', marginBottom: '24px' }}
          >
            Your HOA Covers More Than You Think
          </h2>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}
          >
            Daybreak's Master Association assessment of $433.50/quarter ($144.50/month) covers access to some of the most impressive residential amenities in the entire state of Utah. Understanding what's included — and what it's worth — is critical context for every buyer evaluating Daybreak and every seller positioning their home. Here's a closer look at each feature.
          </p>
        </div>
      </FadeSection>

      {/* FEATURE GRID */}
      <FadeSection className="section section--light" style={{ paddingTop: 0 }}>
        <div className="content-wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {INDEX_CARDS.map(card => {
              const f = features.find(ft => ft.slug === card.slug)!
              return (
                <div
                  key={card.slug}
                  className="fade-up"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid var(--color-border)',
                    borderTop: '2px solid var(--color-accent)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <ImagePlaceholder
                      src={`/features/${card.slug}.png`}
                      alt={f.name}
                      fallbackLabel={f.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text)' }}>
                      {f.name}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)', lineHeight: 1.7, flex: 1 }}>
                      {card.desc}
                    </p>
                    <Link
                      to={`/daybreak-features/${card.slug}`}
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
              )
            })}
          </div>
        </div>
      </FadeSection>

      {/* HOA NOTE */}
      <FadeSection className="section section--dark" style={{ textAlign: 'center' }}>
        <div className="content-wrap" style={{ maxWidth: '700px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>What's Included in Your Assessment</p>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,40px)', color: '#fff', marginBottom: '20px' }}
          >
            $433.50/Quarter. $144.50/Month.
          </h2>
          <p
            className="fade-up"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: '#ccc', lineHeight: 1.9 }}
          >
            All of the above (except Downtown Daybreak's ticketed events and some programming) is included in the DCA Master Association quarterly assessment. For sellers, these amenities are a key differentiator when marketing your home. For buyers, understanding what you're getting — and what neighboring developments don't offer — is part of making a smart purchase decision.
          </p>
        </div>
      </FadeSection>

      {/* CONTACT NUDGE */}
      <FadeSection className="section section--primary" style={{ textAlign: 'center' }}>
        <div className="content-wrap" style={{ maxWidth: '600px' }}>
          <h2
            className="fade-up"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,38px)', color: '#fff', marginBottom: '16px' }}
          >
            Have questions about Daybreak's amenities and how they affect property values?
          </h2>
          <div className="fade-up">
            <Link to="/contact" className="btn-gold">ASK TOMMY →</Link>
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
