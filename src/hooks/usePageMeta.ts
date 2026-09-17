import { useEffect } from 'react'

const DEFAULT_TITLE = typeof document !== 'undefined' ? document.title : ''
const DEFAULT_DESCRIPTION =
  typeof document !== 'undefined'
    ? document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    : ''

function setDescription(content: string) {
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setDescription(description)

    return () => {
      document.title = DEFAULT_TITLE
      setDescription(DEFAULT_DESCRIPTION)
    }
  }, [title, description])
}
