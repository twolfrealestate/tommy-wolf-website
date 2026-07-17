import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const VALID_TYPES = ['Buyer', 'Seller', 'Renter']

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

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

  const { source, type, firstName, lastName, email, phone, address, message } = data

  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) }
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim() || 'Unknown'
  const leadSource = source || 'Website'
  const includeType = type && VALID_TYPES.includes(type)

  // Build the metadata <head> per the Real Estate Lead Metadata Specification.
  const metaTags = [
    '<meta name="lead_information_version" content="1.0" />',
    `<meta name="lead_source" content="${escapeHtml(leadSource)}" />`,
    includeType ? `<meta name="lead_type" content="${escapeHtml(type)}" />` : null,
    `<meta name="lead_name" content="${escapeHtml(fullName)}" />`,
    `<meta name="lead_email" content="${escapeHtml(email)}" />`,
    phone ? `<meta name="lead_phone" content="${escapeHtml(phone)}" />` : null,
    address ? `<meta name="lead_property_address" content="${escapeHtml(address)}" />` : null,
    message ? `<meta name="lead_message" content="${escapeHtml(message)}" />` : null,
  ].filter(Boolean).join('\n    ')

  // Human-readable body as a fallback if the parser fails.
  const bodyRows = [
    `<p><strong>Source:</strong> ${escapeHtml(leadSource)}</p>`,
    includeType ? `<p><strong>Type:</strong> ${escapeHtml(type)}</p>` : null,
    `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : null,
    address ? `<p><strong>Property Address:</strong> ${escapeHtml(address)}</p>` : null,
    message ? `<p><strong>Message:</strong> ${escapeHtml(message)}</p>` : null,
  ].filter(Boolean).join('\n    ')

  const html = `<!DOCTYPE html>
<html>
  <head>
    ${metaTags}
  </head>
  <body>
    <h2>New Lead</h2>
    ${bodyRows}
  </body>
</html>`

  try {
    await resend.emails.send({
      from: 'Movetodaybreak Leads <leads@mail.movetodaybreak.com>',
      to: 'tommy_wolf@mail.brivity.com',
      subject: 'New Lead: ' + leadSource,
      html,
    })
    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send lead' }) }
  }
}
