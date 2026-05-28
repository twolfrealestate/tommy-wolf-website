import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'

interface FaqItem { q: string; a: string }
interface FaqSection { title: string; items: FaqItem[] }

const sections: FaqSection[] = [
  {
    title: 'HOA Structure',
    items: [
      {
        q: 'Who manages the Daybreak HOA?',
        a: 'The Daybreak Community Association (DCA) is the master HOA, professionally managed by CCMC. It handles common area landscaping, maintenance, facility management, design review, and accounting. Some neighborhoods also have sub-associations managed by separate companies including Densley Management, FCS Management, Treo Management, Evolution Community Management, and Mihi Management.',
      },
      {
        q: 'What are the three main organizations in Daybreak?',
        a: '(1) Daybreak Communities — the developer, handles new parks, facilities, and development. (2) Daybreak Community Association (DCA) — the HOA, manages daily operations, standards, and amenities. (3) LiveDAYBREAK — an independent non-profit focused on events and community programming, funded by enhancement fees, not HOA dues.',
      },
      {
        q: 'What is a sub-association?',
        a: 'Sub-associations govern specific buildings or complexes — typically townhomes and condos — and charge fees on top of the DCA Master Association. They have their own boards, governing documents, and fees covering exterior maintenance, landscaping, snow removal, insurance, and reserves.',
      },
      {
        q: 'What is a Benefited Service Area (BSA)?',
        a: "A BSA is a home category that receives specific shared services (like snow removal on shared driveways or exclusive amenity access) and pays an additional fee for those services on top of the master assessment.",
      },
    ],
  },
  {
    title: 'Assessments & Fees',
    items: [
      {
        q: 'How much are Daybreak HOA fees?',
        a: "As of 2026, the DCA Master Association quarterly assessment is $433.50 for most homeowners (~$144.50/month), which includes Quantum Fiber internet. Homes in Founder's Village Phase 1 pay $334.50/quarter (internet not included). Townhome and condo residents also pay sub-association fees ranging from ~$213–$450+/month on top of this.",
      },
      {
        q: 'When are dues due?',
        a: 'Quarterly on January 1, April 1, July 1, and October 1. Pay by the 15th to avoid late fees.',
      },
      {
        q: 'How can I pay?',
        a: 'Online resident portal, mail/drop-off check, or direct debit. For monthly payment plans: dcapayhelp@ccmcnet.com. Billing questions: (801) 254-8062.',
      },
      {
        q: 'Can I pay my Master Association and sub-association with the same check?',
        a: 'No — they must be paid separately. Funds cannot be transferred between accounts.',
      },
      {
        q: 'What is the community enhancement fee?',
        a: "A one-time 0.5% of sale price paid by the seller at closing to fund LiveDAYBREAK programming. I include this in every seller's net sheet.",
      },
      {
        q: 'Are fees negotiable?',
        a: 'No. Assessment rates are non-negotiable and charged to every unit regardless of type or location.',
      },
    ],
  },
  {
    title: 'Amenities',
    items: [
      {
        q: "What's included in the DCA assessment?",
        a: 'Quantum Fiber internet (500 Mbps), five community pools + splash pad, Daybreak Community Center (gym, indoor track, basketball, pool), Oquirrh Lake access, the Watercourse, watercraft rentals, 50+ miles of trails, dozens of parks, outdoor sport courts, and seasonal community garden plots.',
      },
      {
        q: 'How do I access amenities?',
        a: 'Pick up an amenity card at the Daybreak Community Center, 4544 W. Harvest Moon Drive. Guests need a temporary amenity pass.',
      },
      {
        q: 'Can I use my kayak on Oquirrh Lake?',
        a: 'Yes, with a seasonal permit ($12/year per watercraft). Swimming and wading in the lake are not permitted due to water quality preservation.',
      },
      {
        q: 'How does the Quantum Fiber internet work?',
        a: "500 Mbps Fiber-to-the-Home included in most homeowners' HOA assessment through a bulk agreement. Call (866) 316-1975 and identify yourself as a Daybreak Bulk HOA customer. Founder's Village Phase 1 is excluded — those homeowners choose their own provider.",
      },
    ],
  },
  {
    title: 'Community Rules',
    items: [
      {
        q: "Do I need approval to change my home's exterior?",
        a: 'Yes. All exterior modifications and landscaping changes require Design Review Committee approval before work begins. Applications at mydaybreak.com.',
      },
      {
        q: 'Can I park my boat or RV at home?',
        a: 'Allowed on streets/driveways for up to 24 hours in any four-day period. Long-term storage is prohibited. RV/boat storage available through Daybreak Communities — email RVlot@daybreakcommunities.com.',
      },
      {
        q: 'Can I rent out my home?',
        a: 'Yes, with restrictions. Must owner-occupy for 12 consecutive months first. Minimum lease: 30 days. Short-term rentals (Airbnb/VRBO) are prohibited and enforced.',
      },
      {
        q: 'What is the 12-month no-resale rule?',
        a: 'Buyers sign an affidavit at closing agreeing not to sell within 12 months. Exceptions: death, divorce, 60+ mile job transfer. Fine: $25,000.',
      },
      {
        q: 'Who handles snow removal?',
        a: 'South Jordan City plows public streets. Single-family homeowners clear their driveways, walks, and adjacent sidewalks. Some sub-associations include snow removal in their assessment.',
      },
      {
        q: 'Who do I contact for maintenance issues?',
        a: 'Common areas: DCA (801) 254-8062 / mydaybreak.com. Roads/lights: sjc.utah.gov/service-request. Utilities: utility company directly. Home warranty: your homebuilder.',
      },
    ],
  },
  {
    title: 'Schools & Community',
    items: [
      {
        q: 'What schools serve Daybreak?',
        a: 'Jordan School District schools: Daybreak Elementary (K-6), Eastlake Elementary (K-6), Golden Fields Elementary (K-6), Copper Mountain Middle (7-9), Mountain Creek Middle (7-9), Herriman High (10-12). Charters: Early Light Academy (K-9), American Academy of Innovation (6-12). Private: Daybreak Academy (Pre-K to 3rd + daycare). Verify boundaries at planning.jordandistrict.org/boundaries/',
      },
      {
        q: 'Is there public transit?',
        a: 'TRAX Red Line has three stops in Daybreak as of 2025. The newest (March 2025) serves Downtown Daybreak directly. Commute to downtown SLC is ~40 minutes.',
      },
    ],
  },
]

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
  useEffect(() => {
    document.title = 'Daybreak Community FAQ | Tommy Wolf REALTOR®'
  }, [])

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
            Whether you're a new resident, prospective buyer, or current homeowner — this page covers the most common questions about Daybreak's HOA structure, assessments, amenities, and community rules. Sources: the Daybreak Community Association Resident Guide and the 2026 Quarterly Assessment Rate Sheet.
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
