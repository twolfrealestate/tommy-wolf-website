import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_MARKETING_API_KEY)

const POSTS_META_URL =
  'https://raw.githubusercontent.com/twolfrealestate/tommy-wolf-website/master/src/data/posts-meta.json'

const buildEmailHtml = (post) => {
  const summary = post.excerpt || post.metaDescription || ''
  const postUrl = `https://movetodaybreak.com/daybreak-newsletter/${post.slug}`

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${post.title}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#0A0A0A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FAFAF8;">
            <tr>
              <td style="padding:40px 40px 24px 40px;">
                <h1 style="margin:0 0 20px 0; font-family:Georgia, 'Times New Roman', serif; font-weight:400; font-size:30px; line-height:1.2; color:#0A0A0A;">
                  ${post.title}
                </h1>
                <p style="margin:0 0 32px 0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; color:#333333;">
                  ${summary}
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#C9A84C;">
                      <a href="${postUrl}" style="display:inline-block; padding:14px 28px; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; letter-spacing:1px; text-transform:uppercase; color:#0A0A0A; text-decoration:none;">
                        Read the Full Post
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 40px 40px; border-top:1px solid #E0DDD7;">
                <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; color:#888888;">
                  Tommy Wolf, REALTOR® &middot; Lawson Real Estate Team, eXp Realty<br />
                  <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#C9A84C; text-decoration:underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const res = await fetch(POSTS_META_URL)
    if (!res.ok) {
      throw new Error(`Failed to fetch posts-meta.json: ${res.status}`)
    }
    const posts = await res.json()

    if (!Array.isArray(posts) || posts.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ skipped: true, reason: 'no posts' }) }
    }

    // Find the post with the highest id.
    const newestPost = posts.reduce((max, post) =>
      Number(post.id) > Number(max.id) ? post : max
    )
    const newestId = Number(newestPost.id)
    const broadcastName = `newsletter-post-${newestId}`

    // Use Resend as the source of truth — check whether this post was already sent.
    const { data: listData, error: listError } = await resend.broadcasts.list()
    if (listError) {
      throw new Error('Broadcast list failed: ' + JSON.stringify(listError))
    }
    const broadcasts = listData?.data || listData || []
    const alreadySent = Array.isArray(broadcasts)
      && broadcasts.some((b) => b?.name === broadcastName)

    if (alreadySent) {
      return { statusCode: 200, body: JSON.stringify({ skipped: true, reason: 'already sent' }) }
    }

    const html = buildEmailHtml(newestPost)

    const { data: createData, error: createError } = await resend.broadcasts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      from: process.env.NEWSLETTER_FROM_EMAIL,
      subject: newestPost.title,
      html,
      name: broadcastName,
    })
    if (createError) {
      throw new Error('Broadcast create failed: ' + JSON.stringify(createError))
    }

    const broadcastId = createData.id
    const { data: sendData, error: sendError } = await resend.broadcasts.send(broadcastId)
    if (sendError) {
      throw new Error('Broadcast send failed: ' + JSON.stringify(sendError))
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, sentPostId: newestId, title: newestPost.title }),
    }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send broadcast' }) }
  }
}
