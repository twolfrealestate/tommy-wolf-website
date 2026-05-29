import { useEffect, useRef, useState } from 'react'
import FadeSection from '../components/FadeSection'

const ANCHOR_LINKS = [
  { label: 'Overview',          id: 'overview' },
  { label: 'The System',        id: 'system' },
  { label: 'Time Savings',      id: 'time-savings' },
  { label: 'Get the Blueprint', id: 'blueprint' },
  { label: 'Revenue Potential', id: 'revenue' },
  { label: 'Schedule a Demo',   id: 'demo' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─── System card data ─────────────────────────────────────── */
const MARKETING_CARDS = [
  {
    name: 'Market Update Project',
    desc: 'Turns your raw MLS export into a branded quarterly market report graphic and three ready-to-use direct mail copy blocks — postcard, letter, and social snapshot — in one upload.',
  },
  {
    name: 'Social Media System',
    desc: 'Produces platform-ready posts for Facebook, Instagram, and LinkedIn plus a full SEO blog post from a single prompt. Generates branded graphics automatically. No design tool required.',
  },
  {
    name: 'Real Estate Custom Farmer',
    desc: 'Creates personalized, print-ready prospect flyers from your CRM export — one per contact, branded and tailored to each prospect\'s pipeline stage and situation.',
  },
  {
    name: 'Newsletter / Blog System',
    desc: 'Writes SEO-optimized blog posts formatted and ready to paste directly into your website. Works from MLS data, a local news URL, or any real estate topic you describe.',
  },
  {
    name: 'Market Graph Generator',
    desc: 'Converts raw MLS data into branded social media graphics in three platform sizes — Facebook, Instagram, LinkedIn — plus a ready-to-post caption for each, automatically.',
  },
  {
    name: 'Website Builder',
    desc: 'A complete personal real estate website built with modern tools, hosted free, and live at your own custom domain. Built using AI from start to finish — no developer needed.',
  },
  {
    name: 'Website Editor',
    desc: 'Your ongoing AI assistant for all site updates, blog posts, code changes, and content edits. It already knows your site structure, so you never re-explain anything.',
  },
  {
    name: 'Email Generator',
    desc: 'Writes personalized outreach emails for individual prospects or full group blasts across three lifecycle stages: prospecting, follow-up, and post-close.',
  },
  {
    name: 'SEO Backlink Builder',
    desc: 'Writes weekly SEO articles designed for local publication pitches, including outreach email templates and a follow-up workflow to earn backlinks to your site.',
  },
  {
    name: 'Social Video Generator (Optional)',
    desc: 'Manages full social video production including edit brief, AI voiceover direction, captioning, and file delivery. Requires a Descript subscription in addition to Claude.',
  },
]

const RECRUITING_CARDS = [
  {
    name: 'Recruiting Ad Generator',
    desc: 'Creates platform-optimized paid ads for Reddit, LinkedIn, and Facebook targeting licensed agents of any brokerage. Produces all three ads plus branded graphics in one session, with built-in compliance guidance for each platform\'s ad policies.',
  },
  {
    name: 'Recruiting Email Generator',
    desc: 'Takes a list of agents with verified emails, segments them by brokerage, and writes tailored recruiting emails using each brokerage\'s specific structure and known pain points. Produces one template per segment and individual send-ready emails for the full list.',
  },
  {
    name: 'Recruitment Website Editor',
    desc: 'For agents who want to build a standalone recruiting site separate from their real estate site. Covers full setup, content strategy, and ongoing management — the same workflow as the standard website editor, purpose-built for eXp agent recruitment.',
  },
]

/* ─── Time savings data ────────────────────────────────────── */
const TIME_ROWS: {
  label: string; without: number; withAI: number
  withoutLabel: string; withAILabel: string; isTotal?: boolean
}[] = [
  { label: 'Social media content & graphics', without: 8,   withAI: 1,   withoutLabel: '8 hrs',      withAILabel: '1 hr' },
  { label: 'Market reports & data graphics',  without: 5,   withAI: 0.5, withoutLabel: '5 hrs',      withAILabel: '0.5 hrs' },
  { label: 'Blog & newsletter writing',        without: 5,   withAI: 0.5, withoutLabel: '5 hrs',      withAILabel: '0.5 hrs' },
  { label: 'Prospect emails & outreach',       without: 4,   withAI: 0.5, withoutLabel: '4 hrs',      withAILabel: '0.5 hrs' },
  { label: 'SEO content & backlink outreach',  without: 4,   withAI: 0.5, withoutLabel: '4 hrs',      withAILabel: '0.5 hrs' },
  { label: 'Recruiting ads & emails',          without: 5,   withAI: 1,   withoutLabel: '5 hrs',      withAILabel: '1 hr' },
  { label: 'Social video production',          without: 4,   withAI: 1,   withoutLabel: '4 hrs',      withAILabel: '1 hr' },
  { label: 'Website updates & content',        without: 3,   withAI: 0.5, withoutLabel: '3 hrs',      withAILabel: '0.5 hrs' },
  { label: 'TOTAL',                            without: 38,  withAI: 5.5, withoutLabel: '38 hrs/wk',  withAILabel: '5.5 hrs/wk', isTotal: true },
]

/* ─── Revenue section data ─────────────────────────────────── */
const REVENUE_STEPS = [
  {
    num: '1',
    text: 'You sponsor a licensed agent into eXp under your name.',
  },
  {
    num: '2',
    text: 'That agent closes transactions. eXp collects their standard company dollar from each closing.',
  },
  {
    num: '3',
    text: 'You receive 3.5% of that company dollar for every transaction your sponsored agent completes — up to $2,800 per agent per year.',
  },
]

const REVENUE_ROWS: {
  year: string; newAgents: string; total: string; active: string; revenue: string
  highlight?: boolean; isCumulative?: boolean
}[] = [
  { year: '1', newAgents: '15', total: '15',  active: '8',  revenue: '$6,400' },
  { year: '2', newAgents: '24', total: '39',  active: '29', revenue: '$23,200' },
  { year: '3', newAgents: '36', total: '75',  active: '52', revenue: '$41,600',  highlight: true },
  { year: '3-Year Cumulative', newAgents: '—', total: '—', active: '—', revenue: '~$71,200', highlight: true, isCumulative: true },
]

function SystemCard({ name, desc, dark = false }: { name: string; desc: string; dark?: boolean }) {
  return (
    <div
      style={{
        backgroundColor: dark ? '#1a1a1a' : '#fff',
        border: dark ? 'none' : '1px solid rgba(201, 168, 76, 0.3)',
        borderTop: dark ? '2px solid var(--color-accent)' : undefined,
        borderRadius: dark ? '0' : '4px',
        padding: '24px',
      }}
    >
      <h4
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          fontWeight: 600,
          color: dark ? '#fff' : 'var(--color-text)',
          marginBottom: '10px',
          lineHeight: 1.2,
        }}
      >
        {name}
      </h4>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 300,
          color: dark ? '#aaa' : 'var(--color-text-mid)',
          lineHeight: 1.75,
        }}
      >
        {desc}
      </p>
    </div>
  )
}

export default function AIRealtor() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [anchorVisible, setAnchorVisible] = useState(false)

  useEffect(() => {
    document.title = 'Become an AI Realtor | Tommy Wolf'
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setAnchorVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <main>

      {/* ── Sticky anchor nav (shown after hero scrolls out of view) ── */}
      <nav
        className="ai-anchor-nav"
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 900,
          backgroundColor: '#111111',
          borderBottom: '1px solid var(--color-accent)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          opacity: anchorVisible ? 1 : 0,
          pointerEvents: anchorVisible ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            padding: '0 24px',
            maxWidth: '1200px',
            margin: '0 auto',
            whiteSpace: 'nowrap',
          }}
        >
          {ANCHOR_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#aaa',
                background: 'none',
                border: 'none',
                borderBottom: '2px solid transparent',
                cursor: 'pointer',
                padding: '14px 16px',
                transition: 'color 0.2s, border-color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.color = 'var(--color-accent)'
                el.style.borderBottomColor = 'var(--color-accent)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.color = '#aaa'
                el.style.borderBottomColor = 'transparent'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <div
        ref={heroRef}
        id="overview"
        style={{
          backgroundColor: 'var(--color-primary)',
          padding: 'clamp(80px, 12vw, 140px) 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '72vh',
        }}
      >
        <div style={{ maxWidth: '860px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '24px' }}>
            AI + Real Estate
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '32px',
            }}
          >
            Be the Realtor who replaces other Realtors with AI
          </h1>
          <span
            style={{
              display: 'block',
              width: '60px',
              height: '1px',
              backgroundColor: 'var(--color-accent)',
              margin: '0 auto 32px',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.80)',
              lineHeight: 1.8,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            By now you've heard it a hundred times: "AI won't replace Realtors — but Realtors who know
            how to use AI will replace those who don't." Everyone says it. Almost no one shows you how.
            This is how. A complete, running AI system built on a single $20/month Claude subscription —
            no expensive software stacks, no technical background required. Just a smarter way to work,
            starting the day you set it up.
          </p>
        </div>
      </div>

      <div className="gold-rule-full" />

      {/* ══════════════════════════════════════════
          SECTION 2 — VIDEO PLACEHOLDER
      ══════════════════════════════════════════ */}
      <FadeSection
        id="video"
        className="section section--light"
      >
        <div
          className="content-wrap fade-up"
          style={{ maxWidth: '896px' }}
        >
          {/* 16:9 aspect-ratio container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              backgroundColor: 'var(--color-primary)',
              border: '1px solid var(--color-accent)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              {/* Play button icon */}
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  border: '2px solid var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polygon points="8,5 19,12 8,19" fill="var(--color-accent)" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-accent)',
                }}
              >
                Overview video coming soon
              </p>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 3 — THE SYSTEM
      ══════════════════════════════════════════ */}
      <section id="system">

        {/* Group 1 — Marketing System (light) */}
        <FadeSection style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--section-pad-desktop) 24px' }}>
          <div className="content-wrap">
            <p className="eyebrow fade-up" style={{ marginBottom: '12px', textAlign: 'center' }}>Platform</p>
            <h2
              className="fade-up"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px,4vw,44px)',
                color: 'var(--color-text)',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              Everything Runs on One Platform
            </h2>
            <p
              className="fade-up"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 300,
                color: 'var(--color-text-mid)',
                textAlign: 'center',
                lineHeight: 1.7,
                maxWidth: '680px',
                margin: '0 auto 56px',
              }}
            >
              The system is split into two parts: a complete marketing engine for your real estate practice,
              and a full recruiting operation for building your eXp downline. Every project runs inside
              Claude — the same $20/month subscription.
            </p>

            <p
              className="fade-up"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-accent)',
                marginBottom: '24px',
              }}
            >
              Your Marketing System
            </p>

            <div className="fade-up system-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }}>
              {MARKETING_CARDS.map(card => (
                <SystemCard key={card.name} name={card.name} desc={card.desc} />
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Group 2 — Recruiting System (dark) */}
        <FadeSection style={{ backgroundColor: 'var(--color-primary)', padding: 'var(--section-pad-desktop) 24px' }}>
          <div className="content-wrap">
            <p
              className="fade-up"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-accent)',
                marginBottom: '24px',
              }}
            >
              Your Recruiting System
            </p>
            <div className="fade-up system-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }}>
              {RECRUITING_CARDS.map(card => (
                <SystemCard key={card.name} name={card.name} desc={card.desc} dark />
              ))}
            </div>
          </div>
        </FadeSection>

      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — TIME SAVINGS
      ══════════════════════════════════════════ */}
      <FadeSection
        id="time-savings"
        style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--section-pad-desktop) 24px' }}
      >
        <div className="content-wrap">
          <p className="eyebrow fade-up" style={{ marginBottom: '12px', textAlign: 'center' }}>Time Savings</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px,4vw,44px)',
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            What This System Actually Gives You Back
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--color-text-mid)',
              textAlign: 'center',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto 48px',
            }}
          >
            Here is a realistic comparison of weekly time spent on marketing and recruiting tasks — manually versus with the AI system running.
          </p>

          {/* Legend */}
          <div
            className="fade-up"
            style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '40px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: '#e06b5a', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-mid)' }}>Without AI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: '#14b8a6', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-mid)' }}>With AI</span>
            </div>
          </div>

          {/* Bar chart */}
          <div
            className="fade-up"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            {TIME_ROWS.map((row) => (
              <div
                key={row.label}
                className="time-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  borderTop: row.isTotal ? '2px solid var(--color-border)' : 'none',
                  borderBottom: '1px solid rgba(224,221,215,0.6)',
                  padding: row.isTotal ? '16px 0 14px' : '10px 0',
                  marginTop: row.isTotal ? '8px' : '0',
                }}
              >
                {/* Label */}
                <div
                  className="time-label"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: row.isTotal ? '13px' : '12px',
                    fontWeight: row.isTotal ? 700 : 400,
                    color: row.isTotal ? 'var(--color-text)' : 'var(--color-text-mid)',
                    textAlign: 'right',
                    paddingRight: '12px',
                    lineHeight: 1.4,
                  }}
                >
                  {row.label}
                </div>

                {/* Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {/* Without AI */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        height: row.isTotal ? '22px' : '16px',
                        width: `${(row.without / 38) * 100}%`,
                        minWidth: '24px',
                        backgroundColor: '#e06b5a',
                        borderRadius: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: row.isTotal ? '13px' : '11px',
                        fontWeight: row.isTotal ? 700 : 400,
                        color: 'var(--color-text-mid)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.withoutLabel}
                    </span>
                  </div>
                  {/* With AI */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        height: row.isTotal ? '22px' : '16px',
                        width: `${(row.withAI / 38) * 100}%`,
                        minWidth: '24px',
                        backgroundColor: '#14b8a6',
                        borderRadius: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: row.isTotal ? '13px' : '11px',
                        fontWeight: row.isTotal ? 700 : 400,
                        color: 'var(--color-text-mid)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.withAILabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Callout stat */}
          <div className="fade-up" style={{ textAlign: 'center', margin: '64px auto 20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(72px,12vw,108px)',
                fontWeight: 400,
                color: 'var(--color-accent)',
                lineHeight: 1,
                marginBottom: '10px',
              }}
            >
              32+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--color-text)',
              }}
            >
              hours saved every week
            </div>
          </div>

          {/* Footnote */}
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-text-light)',
              textAlign: 'center',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Without AI column reflects maximum manual labor for each category. With AI column reflects time to prompt, review, and publish.
          </p>
        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 6 — REVENUE POTENTIAL
      ══════════════════════════════════════════ */}
      <FadeSection
        id="revenue"
        style={{ backgroundColor: 'var(--color-bg-dark)', padding: 'var(--section-pad-desktop) 24px' }}
      >
        <div className="content-wrap" style={{ maxWidth: '800px' }}>

          {/* Header */}
          <p className="eyebrow fade-up" style={{ marginBottom: '12px', textAlign: 'center' }}>Revenue Potential</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px,4vw,44px)',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            How the Money Compounds
          </h2>

          {/* Intro */}
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            When you join eXp Realty, you gain access to a revenue share program funded entirely from
            eXp's portion of the commission split — not from your earnings or your recruits'. When you
            sponsor an agent, you receive a percentage of what eXp collects from that agent's production.
            This is not a recruitment fee and it costs the agent you bring in nothing extra.
          </p>

          {/* 3-step flow */}
          <div className="fade-up rev-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginBottom: '48px' }}>
            {REVENUE_STEPS.map(step => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '24px',
                  backgroundColor: '#1a1a1a',
                  borderTop: '2px solid var(--color-accent)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: '16px',
                    color: 'var(--color-accent)',
                  }}
                >
                  {step.num}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.80)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* After steps */}
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            The compounding effect comes from volume and time. Each agent you recruit adds a recurring
            revenue stream to your business. The more agents you bring in — and the longer they stay
            active — the more that base grows without additional effort from you.
          </p>

          {/* Disclaimer note */}
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontStyle: 'italic',
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            The following illustration uses publicly documented eXp Tier 1 revenue share rates (3.5% of
            company dollar, capped at $2,800/year per agent) and assumes an average of $800/year per
            active sponsored agent based on typical Utah production. These are illustrative figures, not
            guarantees of income.
          </p>

          {/* Revenue table */}
          <div className="fade-up" style={{ overflowX: 'auto', marginBottom: '28px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <thead>
                <tr>
                  {['Year', 'New Agents Recruited', 'Total Agents', 'Est. Active Agents', 'Est. Annual Revenue Share'].map(h => (
                    <th
                      key={h}
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#888',
                        padding: '10px 14px',
                        borderBottom: '1px solid #2a2a2a',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REVENUE_ROWS.map(row => (
                  <tr
                    key={row.year}
                    style={{
                      backgroundColor: row.highlight ? 'rgba(201,168,76,0.10)' : 'transparent',
                      borderTop: row.isCumulative ? '2px solid rgba(201,168,76,0.35)' : 'none',
                    }}
                  >
                    {[row.year, row.newAgents, row.total, row.active, row.revenue].map((cell, i) => (
                      <td
                        key={i}
                        style={{
                          fontSize: '13px',
                          fontWeight: row.highlight ? 600 : 400,
                          color: row.highlight ? '#fff' : '#bbb',
                          padding: '12px 14px',
                          borderBottom: '1px solid #1e1e1e',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Assumptions */}
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: '#666',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}
          >
            <strong style={{ color: '#888', fontWeight: 600 }}>Assumptions:</strong>{' '}
            1 new agent/month in Year 1 ramping to 3/month by Year 3. 75% active retention rate.
            Average revenue share of $800/year per active agent based on 10–12 transactions at
            $450K–$500K average sale price and eXp's documented 3.5% Tier 1 rate. Revenue share is
            funded from eXp's company dollar — no cost to the sponsored agent.
          </p>

          {/* Closing paragraph */}
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.70)',
              lineHeight: 1.8,
            }}
          >
            This does not include stock awards, the ICON Program (up to $16,000 in EXPI stock annually
            for qualifying top producers), or cross-referral volume from a growing network of agents.
            The recruiting system exists to make the front end — finding, targeting, and converting
            agents — as efficient as the rest of your business.
          </p>

        </div>
      </FadeSection>

      {/* ══════════════════════════════════════════
          SECTION 7 — SCHEDULE A DEMO
      ══════════════════════════════════════════ */}
      <FadeSection
        id="demo"
        className="section section--primary"
        style={{ textAlign: 'center' }}
      >
        <div className="content-wrap" style={{ maxWidth: '640px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Schedule a Demo</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,5vw,52px)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '24px',
            }}
          >
            See It in Action
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              marginBottom: '40px',
            }}
          >
            If you want to watch the system run live — from uploading an MLS spreadsheet to a finished
            market report, or from a blank recruiting list to a segmented batch of outreach emails —
            schedule a walkthrough. No pitch. Just the system working the way it would for you.
          </p>

          <div className="fade-up">
            {/* TODO: Replace placeholder with Tommy's Google Calendar booking URL */}
            <a
              href="#"
              className="btn-gold"
              style={{ fontSize: '13px', padding: '16px 32px', letterSpacing: '0.1em', display: 'inline-block' }}
            >
              Schedule a Demo
            </a>
          </div>

          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.45)',
              marginTop: '32px',
              lineHeight: 2,
            }}
          >
            Tommy Wolf | eXp Realty
            <br />
            <a
              href="tel:8015800647"
              style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              801-580-0647
            </a>
            {' | '}
            <a
              href="mailto:twolfrealestate@gmail.com"
              style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              twolfrealestate@gmail.com
            </a>
          </p>
        </div>
      </FadeSection>

      <style>{`
        @media (max-width: 1024px) {
          .ai-anchor-nav { top: 60px !important; }
        }
        @media (max-width: 768px) {
          .system-grid { grid-template-columns: 1fr !important; }
          .time-row { grid-template-columns: 1fr !important; gap: 6px !important; }
          .time-label { text-align: left !important; padding-right: 0 !important; }
          .rev-steps { grid-template-columns: 1fr !important; }
        }
        .ai-anchor-nav::-webkit-scrollbar { display: none; }
      `}</style>

    </main>
  )
}
