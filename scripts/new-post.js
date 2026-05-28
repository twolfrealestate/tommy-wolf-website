// scripts/new-post.js
// Interactive CLI for adding a new blog post.
// Updates src/data/posts-meta.json and src/data/posts.ts in one step.
// Usage: npm run new-post

import { createInterface } from 'readline/promises'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const rl = createInterface({ input: process.stdin, output: process.stdout })

function ask(q) {
  return rl.question(q).then(a => a.trim())
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  console.log('\n── New Blog Post ──────────────────────────────\n')

  const title = await ask('Title: ')
  if (!title) { console.error('Title is required.'); process.exit(1) }

  const suggestedSlug = slugify(title)
  const slugInput = await ask(`Slug [${suggestedSlug}]: `)
  const slug = slugInput || suggestedSlug

  const metaDescription = await ask('Meta description: ')
  const excerpt = await ask('Excerpt: ')
  const tagsInput = await ask('Tags (comma-separated): ')
  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)

  rl.close()

  // ── Derive id and date ────────────────────────────────────────────────────

  const publishedDate = new Date().toISOString().split('T')[0]

  const metaPath = resolve(ROOT, 'src/data/posts-meta.json')
  const existingMeta = JSON.parse(readFileSync(metaPath, 'utf-8'))

  const maxId = existingMeta.reduce((max, p) => Math.max(max, parseInt(p.id) || 0), 0)
  const id = String(maxId + 1)

  // ── Append to posts-meta.json ─────────────────────────────────────────────

  const newMeta = { id, title, slug, metaDescription, publishedDate, tags, excerpt }
  existingMeta.push(newMeta)
  writeFileSync(metaPath, JSON.stringify(existingMeta, null, 2) + '\n', 'utf-8')

  // ── Insert body entry into posts.ts bodies object ─────────────────────────

  const postsPath = resolve(ROOT, 'src/data/posts.ts')
  const postsContent = readFileSync(postsPath, 'utf-8')

  const bodiesStart = postsContent.indexOf('const bodies')
  if (bodiesStart === -1) {
    console.error('Could not find `const bodies` in posts.ts. Add the entry manually.')
    process.exit(1)
  }

  // Find the closing `}` of the bodies object (first `\n}` after bodiesStart)
  const closingPos = postsContent.indexOf('\n}', bodiesStart) + 1
  const newBodyLine = `  '${slug}': '<p>Write your post content here.</p>',\n`
  const updatedPosts =
    postsContent.slice(0, closingPos) + newBodyLine + postsContent.slice(closingPos)

  writeFileSync(postsPath, updatedPosts, 'utf-8')

  // ── Confirmation ──────────────────────────────────────────────────────────

  console.log('\n✓ Post added successfully\n')
  console.log(`  Title:         ${title}`)
  console.log(`  Slug:          ${slug}`)
  console.log(`  ID:            ${id}`)
  console.log(`  Published:     ${publishedDate}`)
  console.log(`  Tags:          ${tags.join(', ') || '(none)'}`)
  console.log('\nNext step: open src/data/posts.ts and replace the placeholder')
  console.log(`body for '${slug}' with your article content.\n`)
}

main().catch(err => {
  console.error('\nError:', err.message)
  process.exit(1)
})
