/**
 * Shared review-card UI — used on both the Reviews page and the Home page
 * reviews block. No icon library: the star is a hand-built inline SVG,
 * filled with the site's champagne gold and repeated five times.
 */

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#C9A84C" aria-hidden="true" focusable="false">
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.401 8.171L12 19.771l-7.335 3.393 1.401-8.171L.132 9.211l8.2-1.193z" />
    </svg>
  )
}

export function FiveStars() {
  return (
    <div
      role="img"
      aria-label="5 out of 5 stars"
      style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}
    >
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
    </div>
  )
}

export default function ReviewCard({ text }: { text: string }) {
  return (
    <div
      className="fade-up"
      style={{
        backgroundColor: '#fff',
        borderTop: '2px solid var(--color-accent)',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FiveStars />
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.75, fontWeight: 300 }}>
        {text}
      </p>
    </div>
  )
}
