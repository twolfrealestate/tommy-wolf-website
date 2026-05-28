import { useState } from 'react'

interface Props {
  src: string
  alt?: string
  fallbackLabel?: string
  className?: string
  style?: React.CSSProperties
}

export default function ImagePlaceholder({ src, alt = '', fallbackLabel, className = '', style }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className={`img-placeholder ${className}`} style={style} role="img" aria-label={alt || fallbackLabel}>
        <span className="img-placeholder__label">{fallbackLabel || alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setErrored(true)}
    />
  )
}
