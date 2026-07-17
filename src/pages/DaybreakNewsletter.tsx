import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import { saveLead, validateEmail } from '../lib/leads'
import posts from '../data/posts'

const ALL_TAGS = ['ALL', 'MARKET UPDATE', 'HOA', 'DEVELOPMENT', 'BUYERS', 'SELLERS']

function tagMatches(postTags: string[], filter: string) {
  if (filter === 'ALL') return true
  return postTags.some(t => t.toLowerCase() === filter.toLowerCase())
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function DaybreakNewsletter() {
  useEffect(() => {
    document.title = 'Daybreak Newsletter | Tommy Wolf REALTOR®'
  }, [])

  const [activeTag, setActiveTag] = useState('ALL')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = posts.filter(p => tagMatches(p.tags, activeTag))

  function handleSubscribe(ev: React.FormEvent) {
    ev.preventDefault()
    if (!email.trim() || !validateEmail(email)) return
    // TODO: POST to Follow Up Boss with "Newsletter Subscriber" tag
    saveLead({ firstName, email, role, source: 'newsletter-subscribe', isNewsletter: true })
    void (async () => {
      try {
        await fetch('/.netlify/functions/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName, source: 'Newsletter Page' }),
        })
      } catch (err) {
        console.error(err)
      }
    })()
    setSubscribed(true)
  }

  const selectStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    padding: '12px 16px',
    color: '#fff',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
    cursor: 'pointer',
  }

  return (
    <main>
      {/* HERO */}
      <FadeSection
        className="section section--primary"
        style={{ minHeight: '320px', display: 'flex', alignItems: 'center' }}
      >
        <div className="content-wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>Newsletter</p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px,5vw,56px)',
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            The Daybreak Real Estate Newsletter
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
            Hyperlocal news that actually affects your home's value.
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* ABOUT */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <p className="eyebrow fade-up" style={{ textAlign: 'center', marginBottom: '12px' }}>Why This Newsletter</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,44px)',
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            Different by Design
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
                icon: '📍',
                title: 'Hyperlocal Focus',
                body: 'Not general Utah market news. Specific to Daybreak, South Jordan, Herriman, and Riverton — the neighborhoods you actually care about.',
              },
              {
                icon: '📈',
                title: 'Market-Moving Intel',
                body: "HOA fee changes, new development updates, neighborhood data, and Daybreak-specific insights you won't find on Zillow.",
              },
              {
                icon: '📬',
                title: 'No Spam',
                body: 'Monthly email, easy unsubscribe. Just the information that helps you make smarter real estate decisions.',
              },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  backgroundColor: '#fff',
                  borderTop: '2px solid var(--color-accent)',
                  padding: '28px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-text)',
                    marginBottom: '10px',
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* SUBSCRIBE */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Join the List</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,40px)',
              color: '#fff',
              marginBottom: '36px',
            }}
          >
            Subscribe — It's Free
          </h2>

          {subscribed ? (
            <div
              className="fade-up"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-accent)' }}>
                You're subscribed. Welcome to the list.
              </p>
            </div>
          ) : (
            <form
              className="fade-up"
              onSubmit={handleSubscribe}
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>First Name</label>
                <input
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    backgroundColor: '#111',
                    border: '1px solid #333',
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                  }}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Email *</label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    backgroundColor: '#111',
                    border: '1px solid #333',
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                  }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>I'm a...</label>
                <select
                  style={selectStyle}
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option>Homeowner</option>
                  <option>Prospective Buyer</option>
                  <option>Real Estate Professional</option>
                  <option>Just Curious</option>
                </select>
              </div>
              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px' }}>
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </FadeSection>

      {/* POSTS */}
      <FadeSection className="section section--light">
        <div className="content-wrap">
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px,4vw,44px)',
              color: 'var(--color-text)',
              marginBottom: '32px',
            }}
          >
            Latest Issues & Posts
          </h2>

          {/* Tag filter */}
          <div
            className="fade-up"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}
          >
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '8px 16px',
                  border: '1px solid var(--color-primary)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s, color 0.15s',
                  backgroundColor: activeTag === tag ? 'var(--color-accent)' : 'transparent',
                  color: activeTag === tag ? 'var(--color-primary)' : 'var(--color-text)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map(post => (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid var(--color-accent)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {formatDate(post.publishedDate)}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    color: 'var(--color-text)',
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        backgroundColor: 'var(--color-bg-mid)',
                        color: 'var(--color-text-mid)',
                        padding: '4px 10px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>
                  {post.excerpt}
                </p>
                <Link
                  to={`/daybreak-newsletter/${post.slug}`}
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
                  READ MORE →
                </Link>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-mid)' }}>
                No posts in this category yet.
              </p>
            )}
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
