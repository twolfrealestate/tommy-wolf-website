/* Shared skeleton used by every stub page */
import { Link } from 'react-router-dom'

interface Props {
  title: string
  prompt: number
  backTo?: string
  backLabel?: string
}

export default function SkeletonPage({ title, prompt, backTo, backLabel }: Props) {
  return (
    <main>
      <div
        className="section section--primary"
        style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
          {backTo && (
            <Link
              to={backTo}
              style={{
                display: 'block', marginBottom: '24px',
                fontFamily: 'var(--font-sans)', fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: 'var(--color-accent)',
              }}
            >
              ← {backLabel ?? 'Back'}
            </Link>
          )}
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Coming in Prompt {prompt}</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,56px)', color: '#fff' }}>
            {title}
          </h1>
        </div>
      </div>
    </main>
  )
}
