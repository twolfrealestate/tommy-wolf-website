import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FadeSection from '../components/FadeSection'
import { saveLead, validateEmail } from '../lib/leads'
import posts from '../data/posts'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function DaybreakNewsletterPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find(p => p.slug === slug)

  useEffect(() => {
    document.title = post ? `${post.title} | Tommy Wolf REALTOR®` : 'Post Not Found | Tommy Wolf REALTOR®'
  }, [post])

  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  function handleSubscribe(ev: React.FormEvent) {
    ev.preventDefault()
    if (!email.trim() || !validateEmail(email)) return
    // TODO: POST to Follow Up Boss with "Newsletter Subscriber" tag
    saveLead({ email, source: 'newsletter-post-subscribe', isNewsletter: true })
    void (async () => {
      try {
        await fetch('/.netlify/functions/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'Blog Post Signup' }),
        })
      } catch (err) {
        console.error(err)
      }
    })()
    setSubDone(true)
  }

  if (!post) {
    return (
      <main>
        <FadeSection
          className="section section--primary"
          style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '16px' }}>404</p>
            <h1
              className="fade-up"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,52px)', color: '#fff', marginBottom: '24px' }}
            >
              Post Not Found
            </h1>
            <Link to="/daybreak-newsletter" className="btn-outline-gold fade-up">
              ← BACK TO NEWSLETTER
            </Link>
          </div>
        </FadeSection>
      </main>
    )
  }

  return (
    <main>
      {/* HERO */}
      <FadeSection
        className="section section--primary"
        style={{ minHeight: '280px', display: 'flex', alignItems: 'center' }}
      >
        <div className="content-wrap" style={{ maxWidth: '760px' }}>
          <Link
            to="/daybreak-newsletter"
            className="fade-up"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-accent)',
              marginBottom: '24px',
            }}
          >
            ← BACK TO NEWSLETTER
          </Link>
          <p
            className="eyebrow fade-up"
            style={{ marginBottom: '12px' }}
          >
            {formatDate(post.publishedDate)}
          </p>
          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px,4vw,52px)',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            {post.title}
          </h1>
          <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {post.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  backgroundColor: 'rgba(201,168,76,0.15)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  padding: '4px 12px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* BODY */}
      <FadeSection className="section section--light">
        <div
          className="content-wrap fade-up"
          style={{
            maxWidth: '760px',
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'var(--color-text)',
          }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </FadeSection>

      {/* CONDENSED SUBSCRIBE */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Stay Informed</p>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px,3vw,36px)',
              color: '#fff',
              marginBottom: '28px',
            }}
          >
            Get the Newsletter
          </h2>

          {subDone ? (
            <div
              className="fade-up"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--color-accent)' }}>
                You're subscribed.
              </p>
            </div>
          ) : (
            <form
              className="fade-up"
              onSubmit={handleSubscribe}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: '1 1 220px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  padding: '12px 16px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn-gold" style={{ whiteSpace: 'nowrap' }}>
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </FadeSection>
    </main>
  )
}
