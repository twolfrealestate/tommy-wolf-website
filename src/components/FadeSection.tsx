import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  id?: string
  className?: string
  style?: React.CSSProperties
  /** Rendered HTML element. Defaults to 'section'. */
  as?: keyof JSX.IntrinsicElements
  /** IntersectionObserver threshold (0–1). Default 0.08. */
  threshold?: number
}

/**
 * Wraps a section. On first intersection every child with className
 * "fade-up" gets "is-visible" added, staggered 100 ms apart.
 * No replay on scroll-back.
 */
export default function FadeSection({
  children,
  id,
  className,
  style,
  as: Tag = 'section',
  threshold = 0.08,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const targets = el.querySelectorAll<HTMLElement>('.fade-up')
        targets.forEach((t, i) => {
          setTimeout(() => t.classList.add('is-visible'), i * 100)
        })
        observer.disconnect()
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    // @ts-expect-error – polymorphic tag ref typing
    <Tag ref={ref} id={id} className={className} style={style}>
      {children}
    </Tag>
  )
}
