import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_MARKETING_API_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let data
  try {
    data = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { email, firstName, source } = data

  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) }
  }

  console.log('Newsletter subscribe request', { email, source })

  try {
    await resend.contacts.create({
      email,
      ...(firstName ? { firstName } : {}),
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    })
    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to subscribe' }) }
  }
}
