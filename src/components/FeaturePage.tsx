import { Link } from 'react-router-dom'
import FadeSection from './FadeSection'
import ImagePlaceholder from './ImagePlaceholder'
import type { FeatureConfig } from '../data/features'

export default function FeaturePage({ config }: { config: FeatureConfig }) {
  const imgSrc = `/features/${config.slug}.png`

  return (
    <main>
      {/* Back link */}
      <div style={{ backgroundColor: 'var(--color-primary)', padding: '14px 24px' }}>
        <div className="content-wrap">
          <Link
            to="/daybreak-features"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-accent)',
            }}
          >
            ← ALL DAYBREAK FEATURES
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
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Daybreak Features</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(34px,5vw,56px)',
              fontWeight: 400,
              color: '#fff',
            }}
          >
            {config.name}
          </h1>
        </div>
      </FadeSection>

      <div className="gold-rule-full" />

      {/* OVERVIEW */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <div className="fade-up" style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p className="eyebrow">About {config.name}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--color-text)' }}>
              {config.h2}
            </h2>
            {config.paragraphs.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9 }}>{p}</p>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* WHY IT MATTERS */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,34px)', color: '#fff', marginBottom: '28px' }}>
            What This Means for Buyers & Sellers
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid var(--color-accent)', padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '14px' }}>
                Buyers
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ccc', lineHeight: 1.8 }}>{config.buyersCard}</p>
            </div>
            <div style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid var(--color-accent)', padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '14px' }}>
                Sellers
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ccc', lineHeight: 1.8 }}>{config.sellersCard}</p>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* QUICK FACTS */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            Quick Facts
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {config.quickFacts.map(f => (
              <div key={f.label} style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', padding: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{f.icon}</span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-mid)', lineHeight: 1.6 }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* CONTACT NUDGE */}
      <FadeSection className="section section--primary" style={{ textAlign: 'center' }}>
        <div className="content-wrap" style={{ maxWidth: '600px' }}>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,36px)', color: '#fff', marginBottom: '16px' }}>
            Want to see this in person or talk about a home near {config.name}?
          </h2>
          <div className="fade-up" style={{ marginBottom: '20px' }}>
            <Link to="/contact" className="btn-gold">CONTACT TOMMY →</Link>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#555', marginTop: '24px' }}>
            Amenity details sourced from Daybreak Community Association and daybreakutah.com. Information subject to change. Verify current access and hours at mydaybreak.com.
          </p>
        </div>
      </FadeSection>
    </main>
  )
}
