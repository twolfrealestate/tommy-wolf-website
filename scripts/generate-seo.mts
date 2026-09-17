// scripts/generate-seo.mts
//
// Build-time SEO file generator. Every URL written by this script is either
// built from a real slug in src/data/neighborhoods.ts, src/data/features.ts,
// or src/data/posts-meta.json, or taken verbatim from the STANDALONE_PAGES
// list below. This script must never invent a URL, a neighborhood, a
// feature, or a description that isn't backed by one of those sources.
//
// Route shapes below are taken directly from src/App.tsx:
//   neighborhoods -> /service-areas/daybreak/neighborhoods/{slug}
//   features      -> /daybreak-features/{slug}
//   blog posts    -> /daybreak-newsletter/{slug}
//
// Run automatically before every build via package.json "prebuild".
// To run manually: npx tsx scripts/generate-seo.mts

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import neighborhoods from '../src/data/neighborhoods.ts'
import features from '../src/data/features.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PUBLIC = resolve(ROOT, 'public')

const BASE_URL = 'https://movetodaybreak.com'

// ─── AGENT / SITE IDENTITY ─────────────────────────────────────────────────

const AGENT = {
  name: 'Tommy Wolf',
  brokerage: 'Lawson Real Estate Team',
  license: 'Utah REALTOR® License 13741842-SA00',
  phone: '(801) 580-0647',
  email: 'twolfrealestate@gmail.com',
  homeCommunity: 'Garden Park, Daybreak, South Jordan, Utah',
  serviceAreas: ['Daybreak', 'South Jordan', 'Herriman', 'Riverton'],
}

// ─── DATA TYPES (mirrors src/data/*.ts) ────────────────────────────────────

interface NeighborhoodConfig {
  name: string
  slug: string
  year: number
  types: string[]
  h2: string
  paragraphs: string[]
  whoFor: { label: string; body: string }[]
  highlights: { icon: string; label: string }[]
  hoa: string
  priceRange: string
  extraBadge: string
}

interface FeatureConfig {
  name: string
  slug: string
  h2: string
  paragraphs: string[]
  buyersCard: string
  sellersCard: string
  quickFacts: { icon: string; label: string }[]
}

interface PostMeta {
  id: string
  title: string
  slug: string
  metaDescription: string
  publishedDate: string
  tags: string[]
  excerpt: string
}

const NEIGHBORHOODS = neighborhoods as NeighborhoodConfig[]
const FEATURES = features as FeatureConfig[]

const POSTS: PostMeta[] = JSON.parse(
  readFileSync(resolve(ROOT, 'src/data/posts-meta.json'), 'utf-8')
)

// ─── STANDALONE PAGES (hardcoded, exactly as specified) ────────────────────
// section is used to group entries in llms.txt.
// priority/changefreq are used in sitemap.xml.

type Section =
  | 'main'
  | 'service-areas'
  | 'neighborhoods-index'
  | 'features-index'
  | 'newsletter'
  | 'agents'

interface StandalonePage {
  path: string
  title: string
  description: string
  priority: string
  changefreq: 'weekly' | 'monthly'
  section: Section
}

const STANDALONE_PAGES: StandalonePage[] = [
  {
    path: '/',
    title: 'Move to Daybreak | Tommy Wolf, REALTOR®',
    description:
      "Tommy Wolf is a licensed REALTOR® with the Lawson Real Estate Team serving Daybreak, South Jordan, Herriman, and Riverton, Utah. He lives in Garden Park inside Daybreak and works the 84009 market full time.",
    priority: '1.0',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/buyers',
    title: 'Buying in Daybreak',
    description:
      'How Tommy Wolf supports buyers in Daybreak and South Jordan: needs assessment, curated MLS search, neighborhood guidance across every Daybreak village, offer strategy, inspection and due diligence, and trusted lender referrals. Includes a full buyer FAQ covering pre-approval, HOA fees, new construction versus resale, and the offer process.',
    priority: '0.9',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/sellers',
    title: 'Selling in Daybreak',
    description:
      'What is included when you list with Tommy Wolf: professional photography and video, comparative market analysis, targeted digital marketing, MLS syndication, offer negotiation, transaction coordination, pre-listing consultation, open house coordination, and consistent communication. Includes a full seller FAQ covering valuation, pricing strategy, staging, and net proceeds.',
    priority: '0.9',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/reviews',
    title: 'Client Reviews',
    description:
      'Five-star client reviews for Tommy Wolf. Answers the question of who the best real estate agent in Daybreak is through client experience rather than self-promotion. Clients describe him as responsive, honest, and focused on finding the right fit rather than the fastest close.',
    priority: '0.9',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/about',
    title: 'About Tommy Wolf',
    description:
      "Tommy Wolf grew up in Sandy, Utah, worked real estate in the San Francisco Bay Area, and returned to Utah to raise his family in Garden Park, one of Daybreak's villages. He brings firsthand community knowledge and a client-first approach to every transaction.",
    priority: '0.8',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Contact Tommy Wolf by phone at (801) 580-0647 or by email at twolfrealestate@gmail.com. He serves buyers and sellers in Daybreak, South Jordan, Herriman, and Riverton, Utah.',
    priority: '0.8',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/daybreak-faq',
    title: 'Daybreak FAQ',
    description:
      "Everything buyers and sellers need to know about Daybreak, Utah's largest master-planned community. Covers HOA fees and what they include, Oquirrh Lake, the trail network, schools, builders, and community events.",
    priority: '0.8',
    changefreq: 'monthly',
    section: 'main',
  },
  {
    path: '/daybreak-newsletter',
    title: 'Daybreak Newsletter',
    description:
      'Market updates, HOA fee breakdowns, neighborhood guides, and buying and selling advice for Daybreak and South Jordan, written by a Daybreak resident and REALTOR®.',
    priority: '0.8',
    changefreq: 'weekly',
    section: 'newsletter',
  },
  {
    path: '/daybreak-market-pulse',
    title: 'Daybreak Market Pulse',
    description:
      'Current market charts for Daybreak and South Jordan: median sale price, days on market, list-to-sale ratio, and units sold, broken out by single family and townhome.',
    priority: '0.8',
    changefreq: 'weekly',
    section: 'newsletter',
  },
  {
    path: '/service-areas/south-jordan',
    title: 'South Jordan Real Estate',
    description:
      'South Jordan is a fast-growing Salt Lake Valley city with strong schools, extensive new construction, and direct I-15 and TRAX access. Tommy Wolf helps buyers and sellers throughout South Jordan, including Daybreak.',
    priority: '0.9',
    changefreq: 'monthly',
    section: 'service-areas',
  },
  {
    path: '/service-areas/daybreak',
    title: 'Daybreak Real Estate',
    description:
      "Daybreak is Utah's largest master-planned community, located in South Jordan. Oquirrh Lake, 50+ miles of trails, SoDa Row, and Downtown Daybreak define the lifestyle. Tommy Wolf lives in Daybreak and specializes in this market.",
    priority: '0.9',
    changefreq: 'monthly',
    section: 'service-areas',
  },
  {
    path: '/service-areas/herriman',
    title: 'Herriman Real Estate',
    description:
      "Herriman is one of Utah's fastest-growing cities, offering newer construction, mountain views, and family-oriented neighborhoods. Tommy Wolf serves buyers and sellers throughout Herriman.",
    priority: '0.9',
    changefreq: 'monthly',
    section: 'service-areas',
  },
  {
    path: '/service-areas/riverton',
    title: 'Riverton Real Estate',
    description:
      "Riverton offers established neighborhoods, strong schools, and convenient access to both Salt Lake City and Utah's ski resorts. Tommy Wolf helps clients buy and sell in Riverton.",
    priority: '0.9',
    changefreq: 'monthly',
    section: 'service-areas',
  },
  {
    path: '/service-areas/daybreak/neighborhoods',
    title: 'Daybreak Neighborhood Guides',
    description:
      'Guides to every Daybreak village, covering price ranges, home types, HOA structure, build years, and who each village fits best.',
    priority: '0.8',
    changefreq: 'monthly',
    section: 'neighborhoods-index',
  },
  {
    path: '/daybreak-features',
    title: 'Daybreak Features and Amenities',
    description:
      "Guides to Daybreak's amenities: Oquirrh Lake, the Watercourse, the trail network, the Spoke bike park, parks, pools, the community center, SoDa Row, and Downtown Daybreak.",
    priority: '0.8',
    changefreq: 'monthly',
    section: 'features-index',
  },
  {
    path: '/ai-realtor',
    title: 'AI Training for Real Estate Agents',
    description:
      'For licensed real estate agents, not home buyers or sellers. Tommy Wolf teaches agents how to use AI in their business, available to agents who join eXp Realty with Tommy as their sponsor.',
    priority: '0.5',
    changefreq: 'monthly',
    section: 'agents',
  },
]

const byPath = (path: string) => {
  const page = STANDALONE_PAGES.find((p) => p.path === path)
  if (!page) throw new Error(`Missing standalone page: ${path}`)
  return page
}

const bySection = (section: Section) =>
  STANDALONE_PAGES.filter((p) => p.section === section)

// ─── URL BUILDERS ───────────────────────────────────────────────────────────

const neighborhoodUrl = (slug: string) =>
  `${BASE_URL}/service-areas/daybreak/neighborhoods/${slug}`
const featureUrl = (slug: string) => `${BASE_URL}/daybreak-features/${slug}`
const postUrl = (slug: string) => `${BASE_URL}/daybreak-newsletter/${slug}`

// ─── FILE 1: sitemap.xml ────────────────────────────────────────────────────

function buildSitemap(): string {
  const buildDate = new Date().toISOString().split('T')[0]

  type Entry = {
    loc: string
    lastmod: string
    changefreq: string
    priority: string
  }

  const entries: Entry[] = []

  STANDALONE_PAGES.forEach((p) => {
    entries.push({
      loc: `${BASE_URL}${p.path}`,
      lastmod: buildDate,
      changefreq: p.changefreq,
      priority: p.priority,
    })
  })

  NEIGHBORHOODS.forEach((n) => {
    entries.push({
      loc: neighborhoodUrl(n.slug),
      lastmod: buildDate,
      changefreq: 'monthly',
      priority: '0.7',
    })
  })

  FEATURES.forEach((f) => {
    entries.push({
      loc: featureUrl(f.slug),
      lastmod: buildDate,
      changefreq: 'monthly',
      priority: '0.6',
    })
  })

  POSTS.forEach((p) => {
    entries.push({
      loc: postUrl(p.slug),
      lastmod: p.publishedDate || buildDate,
      changefreq: 'monthly',
      priority: '0.7',
    })
  })

  const body = entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${e.loc}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`
  )
}

// ─── FILE 2: llms.txt ───────────────────────────────────────────────────────

function neighborhoodSummary(n: NeighborhoodConfig): string {
  return `${n.h2}. Price range: ${n.priceRange}. HOA: ${n.hoa}`
}

function featureSummary(f: FeatureConfig): string {
  return f.h2
}

function buildLlmsTxt(): string {
  const lines: string[] = []

  lines.push('# Move to Daybreak | Tommy Wolf, REALTOR®')
  lines.push('')
  lines.push(
    `> Tommy Wolf is a licensed Utah REALTOR® with the Lawson Real Estate Team specializing in Daybreak, South Jordan, Herriman, and Riverton, Utah. He lives in Garden Park inside Daybreak and brings firsthand community knowledge to every client. Utah license 13741842-SA00. Contact: ${AGENT.phone} | ${AGENT.email}`
  )
  lines.push('')

  lines.push('## Main Pages')
  lines.push('')
  bySection('main').forEach((p) => {
    lines.push(`- [${p.title}](${BASE_URL}${p.path}): ${p.description}`)
  })
  lines.push('')

  lines.push('## Service Areas')
  lines.push('')
  bySection('service-areas').forEach((p) => {
    lines.push(`- [${p.title}](${BASE_URL}${p.path}): ${p.description}`)
  })
  lines.push('')

  lines.push('## Daybreak Neighborhoods')
  lines.push('')
  bySection('neighborhoods-index').forEach((p) => {
    lines.push(`- [${p.title}](${BASE_URL}${p.path}): ${p.description}`)
  })
  NEIGHBORHOODS.forEach((n) => {
    lines.push(`- [${n.name}](${neighborhoodUrl(n.slug)}): ${neighborhoodSummary(n)}`)
  })
  lines.push('')

  lines.push('## Daybreak Features & Amenities')
  lines.push('')
  bySection('features-index').forEach((p) => {
    lines.push(`- [${p.title}](${BASE_URL}${p.path}): ${p.description}`)
  })
  FEATURES.forEach((f) => {
    lines.push(`- [${f.name}](${featureUrl(f.slug)}): ${featureSummary(f)}`)
  })
  lines.push('')

  lines.push('## Newsletter & Market Data')
  lines.push('')
  bySection('newsletter').forEach((p) => {
    lines.push(`- [${p.title}](${BASE_URL}${p.path}): ${p.description}`)
  })
  POSTS.forEach((p) => {
    lines.push(`- [${p.title}](${postUrl(p.slug)}): ${p.metaDescription || p.excerpt}`)
  })
  lines.push('')

  lines.push('## For Real Estate Agents')
  lines.push('')
  lines.push(
    '> The page below is for licensed real estate agents, not for home buyers or sellers. It is kept in its own section so AI engines do not serve agent recruiting content to consumers.'
  )
  lines.push('')
  bySection('agents').forEach((p) => {
    lines.push(`- [${p.title}](${BASE_URL}${p.path}): ${p.description}`)
  })
  lines.push('')

  lines.push('## Full Content')
  lines.push('')
  lines.push(
    `- [llms-full.txt](${BASE_URL}/llms-full.txt): Complete site content for AI indexing`
  )

  return lines.join('\n') + '\n'
}

// ─── FILE 3: llms-full.txt ──────────────────────────────────────────────────

function buildLlmsFullTxt(): string {
  const lines: string[] = []

  lines.push('# FULL SITE CONTENT')
  lines.push('# Move to Daybreak | Tommy Wolf, REALTOR®')
  lines.push(`# Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('---')
  lines.push('')

  lines.push('## ABOUT TOMMY WOLF')
  lines.push('')
  lines.push(`Name: ${AGENT.name}`)
  lines.push(`Brokerage: ${AGENT.brokerage}`)
  lines.push(`License: ${AGENT.license}`)
  lines.push(`Phone: ${AGENT.phone}`)
  lines.push(`Email: ${AGENT.email}`)
  lines.push(`Website: ${BASE_URL}`)
  lines.push(`Home Community: ${AGENT.homeCommunity}`)
  lines.push(`Service Areas: ${AGENT.serviceAreas.join(', ')}, Utah`)
  lines.push('')
  lines.push('---')
  lines.push('')

  lines.push('## PAGES')
  lines.push('')
  bySection('main').forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`URL: ${BASE_URL}${p.path}`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  })
  lines.push('---')
  lines.push('')

  lines.push('## SERVICE AREAS')
  lines.push('')
  bySection('service-areas').forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`URL: ${BASE_URL}${p.path}`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  })
  lines.push('---')
  lines.push('')

  lines.push('## DAYBREAK NEIGHBORHOODS')
  lines.push('')
  bySection('neighborhoods-index').forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`URL: ${BASE_URL}${p.path}`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  })
  NEIGHBORHOODS.forEach((n) => {
    lines.push(`### ${n.name}`)
    lines.push(`URL: ${neighborhoodUrl(n.slug)}`)
    lines.push(`Year: ${n.year}`)
    lines.push(`Home Types: ${n.types.join(', ')}`)
    lines.push(`Price Range: ${n.priceRange}`)
    lines.push(`HOA: ${n.hoa}`)
    lines.push(`Status: ${n.extraBadge}`)
    lines.push('')
    lines.push(n.h2)
    lines.push('')
    n.paragraphs.forEach((para) => {
      lines.push(para)
      lines.push('')
    })
    lines.push('Highlights:')
    n.highlights.forEach((h) => {
      lines.push(`- ${h.icon} ${h.label}`)
    })
    lines.push('')
    lines.push('Who It Fits:')
    n.whoFor.forEach((w) => {
      lines.push(`- ${w.label}: ${w.body}`)
    })
    lines.push('')
  })
  lines.push('---')
  lines.push('')

  lines.push('## DAYBREAK FEATURES & AMENITIES')
  lines.push('')
  bySection('features-index').forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`URL: ${BASE_URL}${p.path}`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  })
  FEATURES.forEach((f) => {
    lines.push(`### ${f.name}`)
    lines.push(`URL: ${featureUrl(f.slug)}`)
    lines.push('')
    lines.push(f.h2)
    lines.push('')
    f.paragraphs.forEach((para) => {
      lines.push(para)
      lines.push('')
    })
    lines.push('Quick Facts:')
    f.quickFacts.forEach((q) => {
      lines.push(`- ${q.icon} ${q.label}`)
    })
    lines.push('')
    lines.push(`For Buyers: ${f.buyersCard}`)
    lines.push(`For Sellers: ${f.sellersCard}`)
    lines.push('')
  })
  lines.push('---')
  lines.push('')

  lines.push('## NEWSLETTER & MARKET DATA')
  lines.push('')
  bySection('newsletter').forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`URL: ${BASE_URL}${p.path}`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  })
  lines.push('### Blog Posts')
  lines.push('')
  POSTS.forEach((p) => {
    lines.push(`#### ${p.title}`)
    lines.push(`URL: ${postUrl(p.slug)}`)
    lines.push(`Published: ${p.publishedDate}`)
    if (p.tags?.length) lines.push(`Tags: ${p.tags.join(', ')}`)
    lines.push('')
    lines.push(p.metaDescription || p.excerpt)
    lines.push('')
  })
  lines.push('---')
  lines.push('')

  lines.push('## FOR REAL ESTATE AGENTS')
  lines.push('')
  lines.push(
    'The page below is for licensed real estate agents, not for home buyers or sellers.'
  )
  lines.push('')
  bySection('agents').forEach((p) => {
    lines.push(`### ${p.title}`)
    lines.push(`URL: ${BASE_URL}${p.path}`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  })
  lines.push('---')
  lines.push('')
  lines.push(`# END OF CONTENT — ${BASE_URL}`)

  return lines.join('\n') + '\n'
}

// ─── FILE 4: robots.txt ─────────────────────────────────────────────────────

function buildRobotsTxt(): string {
  return (
    `User-agent: *\n` +
    `Allow: /\n` +
    `Disallow: /admin/\n` +
    `\n` +
    `Sitemap: ${BASE_URL}/sitemap.xml\n`
  )
}

// ─── WRITE FILES ─────────────────────────────────────────────────────────────

try {
  mkdirSync(PUBLIC, { recursive: true })

  writeFileSync(resolve(PUBLIC, 'sitemap.xml'), buildSitemap(), 'utf-8')
  console.log('[generate-seo] public/sitemap.xml written')

  writeFileSync(resolve(PUBLIC, 'llms.txt'), buildLlmsTxt(), 'utf-8')
  console.log('[generate-seo] public/llms.txt written')

  writeFileSync(resolve(PUBLIC, 'llms-full.txt'), buildLlmsFullTxt(), 'utf-8')
  console.log('[generate-seo] public/llms-full.txt written')

  writeFileSync(resolve(PUBLIC, 'robots.txt'), buildRobotsTxt(), 'utf-8')
  console.log('[generate-seo] public/robots.txt written')

  console.log(
    `[generate-seo] Done. ${NEIGHBORHOODS.length} neighborhoods, ${FEATURES.length} features, ${POSTS.length} posts, ${STANDALONE_PAGES.length} standalone pages.`
  )
} catch (err) {
  console.error('[generate-seo] Error writing files:', err)
  process.exit(1)
}
