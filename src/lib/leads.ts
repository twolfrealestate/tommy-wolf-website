/** Save a lead to localStorage. Replace the body of this function
 *  with a Follow Up Boss API call once credentials are available. */
export function saveLead(data: Record<string, unknown>) {
  const leads: unknown[] = JSON.parse(localStorage.getItem('tw_leads') || '[]')
  leads.push({ ...data, timestamp: new Date().toISOString() })
  localStorage.setItem('tw_leads', JSON.stringify(leads))
  // TODO: POST to Follow Up Boss API
}

/** Returns true if the string is a plausibly valid email address. */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

/** Format a raw digit string to (XXX) XXX-XXXX */
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}
