import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import { usePageMeta } from '../hooks/usePageMeta'
import sections, { type FaqItem } from '../data/daybreakFaq'

function AccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--color-text)',
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: 'var(--color-accent)',
            fontSize: '18px',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: '20px',
            paddingLeft: '16px',
            borderLeft: '2px solid var(--color-accent)',
            marginLeft: '2px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)', lineHeight: 1.8 }}>
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function DaybreakFaq() {
  usePageMeta(
    'Daybreak FAQ | Tommy Wolf, Daybreak REALTOR®',
    'Daybreak, Utah FAQ: HOA fees, amenities, rules, and schools, plus home buying answers on down payments, credit scores, and costs from a resident REALTOR®.'
  )

  return (
    <main>
      {/* HERO */}
      <FadeSection
        className="section section--primary"
        style={{ minHeight: '320px', display: 'flex', alignItems: 'center' }}
      >
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Community Guide</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(34px,5vw,56px)',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Daybreak Community FAQ
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 300,
              color: '#ccc',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Your questions about living in Daybreak, answered.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* INTRO */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: 'var(--color-text-mid)',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            Whether you're a new resident, prospective buyer, or current homeowner, this page covers the most common questions about Daybreak's HOA structure, assessments, amenities, community rules, and schools, plus general home buying questions about down payments, credit scores, costs, and timing. Daybreak answers are sourced from the Daybreak Community Association Resident Guide and the 2026 Quarterly Assessment Rate Sheet. Market figures come from my Daybreak Market Pulse data and Freddie Mac. Loan figures are general guidelines, so confirm what applies to you with a lender.
          </p>

          {sections.map(section => (
            <div key={section.title} className="fade-up" style={{ marginBottom: '40px' }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-accent)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {section.title}
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
              </div>
              {section.items.map((item, i) => (
                <AccordionItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          ))}
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
              fontSize: 'clamp(26px,3vw,40px)',
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Have a question not answered here?
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#aaa',
              marginBottom: '32px',
            }}
          >
            I'm a Daybreak resident and licensed REALTOR® — I'm happy to answer anything.
          </p>
          <div className="fade-up">
            <Link to="/contact" className="btn-gold">ASK TOMMY</Link>
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
