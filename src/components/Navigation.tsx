import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const SERVICE_AREAS = [
  { label: 'South Jordan', to: '/service-areas/south-jordan' },
  { label: 'Daybreak',     to: '/service-areas/daybreak' },
  { label: 'Herriman',     to: '/service-areas/herriman' },
  { label: 'Riverton',     to: '/service-areas/riverton' },
]

const DAYBREAK_FEATURES = [
  { label: 'Oquirrh Lake',        to: '/daybreak-features/oquirrh-lake' },
  { label: 'The Watercourse',      to: '/daybreak-features/watercourse' },
  { label: 'The Loop & Trails',    to: '/daybreak-features/the-loop' },
  { label: 'The Spoke Bike Park',  to: '/daybreak-features/the-spoke' },
  { label: 'Parks',                to: '/daybreak-features/parks' },
  { label: 'Pools',                to: '/daybreak-features/pools' },
  { label: 'Community Center',     to: '/daybreak-features/community-center' },
  { label: 'SoDa Row & Shopping',  to: '/daybreak-features/soda-row-shopping' },
  { label: 'Downtown Daybreak',    to: '/daybreak-features/downtown-daybreak' },
  { label: 'LiveDAYBREAK',         to: '/daybreak-features/livedaybreak' },
]

const MAIN_LINKS = [
  { label: 'Home',                   to: '/' },
  { label: 'Services',               to: '/services' },
  { label: 'Buyers',                 to: '/buyers' },
  { label: 'Sellers',                to: '/sellers' },
  { label: 'Newsletter',    to: '/daybreak-newsletter' },
  { label: 'Market Pulse',  to: '/daybreak-market-pulse' },
  { label: 'About',         to: '/about' },
  { label: 'Daybreak FAQ',  to: '/daybreak-faq' },
  { label: 'Contact',                to: '/contact' },
]

const linkBase: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#fff',
  transition: 'color 0.2s',
  whiteSpace: 'nowrap',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAreas, setMobileAreas] = useState(false)
  const [mobileFeatures, setMobileFeatures] = useState(false)
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Desktop / sticky nav bar ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'var(--color-primary)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-content)',
            margin: '0 auto',
            padding: '0 24px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>
                  TOMMY WOLF
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500, color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '3px' }}>
                  LAWSON REAL ESTATE TEAM
                </div>
              </div>
            </Link>
            <span id="nav-logo-sep" style={{ display: 'block', width: '1px', height: '32px', backgroundColor: '#2a2a2a', margin: '0 16px' }} />
            <img
              id="nav-lawson-logo"
              src="/lawson-logo.png"
              alt="Lawson Real Estate Team | eXp Luxury"
              style={{ height: '28px', width: 'auto', mixBlendMode: 'screen', opacity: 0.92 }}
            />
          </div>

          {/* Desktop links */}
          <div id="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
            {MAIN_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  ...linkBase,
                  color: isActive ? 'var(--color-accent)' : '#fff',
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                  paddingBottom: '2px',
                })}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
                onMouseLeave={e => {
                  // NavLink re-applies active style via `style` prop on next render; just reset for non-active
                  const el = e.currentTarget as HTMLElement
                  if (!el.getAttribute('aria-current')) el.style.color = '#fff'
                }}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Service Areas dropdown */}
            <div className="nav-dropdown-parent" style={{ position: 'relative' }}>
              <button style={{ ...linkBase, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Service Areas <ChevronDown />
              </button>
              <div className="nav-dropdown">
                {SERVICE_AREAS.map(item => (
                  <Link key={item.to} to={item.to}>{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Daybreak Features dropdown */}
            <div className="nav-dropdown-parent" style={{ position: 'relative' }}>
              <button style={{ ...linkBase, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Daybreak Features <ChevronDown />
              </button>
              <div className="nav-dropdown" style={{ minWidth: '240px' }}>
                {DAYBREAK_FEATURES.map(item => (
                  <Link key={item.to} to={item.to}>{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Home Valuation CTA */}
            <a
              href="/#home-valuation"
              className="btn-outline-gold"
              style={{ fontSize: '11px', padding: '7px 14px', flexShrink: 0 }}
            >
              Home Valuation
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            id="hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', flexShrink: 0 }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '24px' }}>
              <Bar style={{ transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <Bar style={{ opacity: mobileOpen ? 0 : 1 }} />
              <Bar style={{ transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0,
            backgroundColor: 'var(--color-primary)', zIndex: 999,
            overflowY: 'auto', display: 'flex', flexDirection: 'column',
          }}
        >
          {MAIN_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'block', padding: '14px 28px',
                fontFamily: 'var(--font-sans)', fontSize: '13px',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: location.pathname === link.to ? 'var(--color-accent)' : '#fff',
                borderBottom: '1px solid #1a1a1a',
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Service Areas */}
          <MobileAccordion
            label="Service Areas"
            open={mobileAreas}
            onToggle={() => setMobileAreas(o => !o)}
          >
            {SERVICE_AREAS.map(item => <MobileSubLink key={item.to} to={item.to} label={item.label} />)}
          </MobileAccordion>

          {/* Mobile Daybreak Features */}
          <MobileAccordion
            label="Daybreak Features"
            open={mobileFeatures}
            onToggle={() => setMobileFeatures(o => !o)}
          >
            {DAYBREAK_FEATURES.map(item => <MobileSubLink key={item.to} to={item.to} label={item.label} />)}
          </MobileAccordion>

          {/* Home Valuation — full-width at drawer bottom */}
          <div style={{ padding: '24px 28px', marginTop: 'auto' }}>
            <a
              href="/#home-valuation"
              className="btn-gold"
              style={{ display: 'block', textAlign: 'center', fontSize: '12px', padding: '14px 28px' }}
            >
              Get Home Valuation
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          #desktop-nav { display: none !important; }
          #hamburger   { display: flex !important; }
          nav { height: 60px !important; }
        }
        @media (max-width: 768px) {
          #nav-lawson-logo { display: none !important; }
          #nav-logo-sep    { display: none !important; }
        }
      `}</style>
    </>
  )
}

/* ── Small helpers ── */
function ChevronDown() {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ marginTop: '1px', flexShrink: 0 }}>
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function Bar({ style }: { style?: React.CSSProperties }) {
  return <span style={{ display: 'block', height: '2px', background: 'var(--color-accent)', transition: 'transform 0.2s, opacity 0.2s', ...style }} />
}

function MobileAccordion({ label, open, onToggle, children }: {
  label: string; open: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 28px', background: 'none', border: 'none',
          borderBottom: '1px solid #1a1a1a', cursor: 'pointer', width: '100%',
          fontFamily: 'var(--font-sans)', fontSize: '13px',
          textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff',
        }}
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M1 1L5 5L9 1" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && children}
    </>
  )
}

function MobileSubLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block', padding: '11px 48px',
        fontFamily: 'var(--font-sans)', fontSize: '12px',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: '#aaa', borderBottom: '1px solid #161616',
      }}
    >
      {label}
    </Link>
  )
}
