# Tommy Wolf Real Estate Website — Claude Code Reference

## Project Overview

Personal real estate website for Tommy Wolf, REALTOR® on the Lawson Real Estate Team (eXp Realty), licensed in Utah. Tommy is a Daybreak resident specializing in Daybreak and South Jordan. The site is a lead-capture and content marketing tool — not a listing portal. No MLS data, no property search.

**Live domain:** movetodaybreak.com  
**Hosting:** Netlify (drag-and-drop deployment)  
**Contact:** twolfrealestate@gmail.com | (801) 580-0647

---

## Tech Stack

| Tool | Version | Notes |
|---|---|---|
| React | 18 | Functional components only |
| Vite | 5 | Dev server and build tool |
| TypeScript | 5 | Strict mode |
| Tailwind CSS | 3 | Utility classes available, but most styling is inline CSS via `style={{}}` |
| React Router | 6 | `BrowserRouter`, `Routes`, `Route` |
| Recharts | Latest | Used on the Market Pulse page for charts |

Run dev server: `npm run dev` (defaults to port 5173, falls back to 5174)  
Build for production: `npm run build` → outputs to `dist/`

---

## Design System — Lawson Aesthetic

All design tokens live in `src/index.css` as CSS custom properties.

### Colors
```css
--color-primary:      #0A0A0A   /* near-black — hero backgrounds, nav, footer */
--color-accent:       #C9A84C   /* gold — eyebrow text, borders, CTAs */
--color-accent-light: #E8D5A3   /* light gold — hover states */
--color-bg:           #FAFAF8   /* off-white — light section backgrounds */
--color-bg-dark:      #111111   /* dark section backgrounds */
--color-bg-mid:       #F2F0EB   /* subtle warm gray */
--color-text:         #1A1A1A   /* body text */
--color-text-mid:     #555555   /* secondary body text */
--color-text-light:   #888888   /* captions, footnotes */
--color-border:       #E0DDD7   /* light section borders */
```

### Typography
- **Headings:** `Cormorant Garamond` (Google Font) — serif, weight 400, loaded in `index.html`
- **Body/UI:** `Jost` (Google Font) — sans-serif, weights 300/400/500/600
- CSS vars: `--font-serif` and `--font-sans`

### Key CSS Classes (defined in `src/index.css`)
- `.eyebrow` — gold uppercase tracking label above headings
- `.gold-rule-full` — 1px full-width gold horizontal rule (used at every hero→content transition)
- `.gold-rule-short` — short decorative gold rule
- `.section` — base section padding
- `.section--light` — `--color-bg` background
- `.section--dark` — `--color-bg-dark` background
- `.section--primary` — `--color-primary` (near-black) background
- `.content-wrap` — max-width 1200px, centered
- `.btn-gold` — filled gold button
- `.btn-outline-gold` — outlined gold button
- `.form-label` — uppercase label style
- `.form-input` — standard light-mode input
- `.form-input--dark` — dark-mode input (used in footer newsletter)
- `.fade-up` — triggers scroll animation (applied via `FadeSection` + `IntersectionObserver`)
- `.img-placeholder` — fallback dark box when image is missing

### Section Pattern
Every page section follows this alternating rhythm:
```
Hero (full-bleed, dark overlay, white text)
<div className="gold-rule-full" />
section--light → section--dark → section--light → ...
section--primary (CTAs/contact forms)
```

---

## Project Structure

```
tommy-wolf-website/
├── public/
│   ├── headshot.png              ← Tommy's photo (used in About section on Home, About page)
│   ├── website-loop.mp4          ← Looping background video for Home page hero
│   ├── areas/
│   │   └── daybreak.png          ← Service area hero photos (south-jordan.png, herriman.png, riverton.png MISSING)
│   ├── neighborhoods/
│   │   ├── founders-park-village.png
│   │   ├── north-shore-village.png
│   │   ├── heights-park-village.png
│   │   ├── lake-village.png
│   │   ├── eastlake-village.png
│   │   ├── garden-park.png
│   │   ├── soda-row.png
│   │   ├── south-station-village.png
│   │   ├── highland-park-village.png
│   │   ├── springhouse-village.png
│   │   └── creekside-village.png
│   └── features/
│       ├── oquirrh-lake.png
│       ├── watercourse.png
│       ├── the-loop.png
│       ├── parks.png
│       └── beach-club.png        ← (the-spoke, pools, community-center, soda-row-shopping, downtown-daybreak, livedaybreak MISSING)
├── src/
│   ├── App.tsx                   ← All routes defined here
│   ├── main.tsx                  ← React entry point
│   ├── index.css                 ← Design system, all CSS custom properties
│   ├── components/
│   │   ├── Navigation.tsx        ← Sticky nav, mobile hamburger, accordion dropdowns
│   │   ├── Footer.tsx            ← 3-col footer, newsletter signup, social icons
│   │   ├── FadeSection.tsx       ← Wrapper div that triggers IntersectionObserver fade-in
│   │   ├── ImagePlaceholder.tsx  ← Image with onError fallback to dark box with gold label
│   │   ├── ServiceAreaPage.tsx   ← Shared template for SouthJordan/Herriman/Riverton
│   │   ├── NeighborhoodPage.tsx  ← Shared template for all 11 Daybreak neighborhood pages
│   │   └── FeaturePage.tsx       ← Shared template for all Daybreak feature pages
│   ├── data/
│   │   ├── posts.ts              ← Blog/newsletter post data (add new posts here)
│   │   ├── neighborhoods.ts      ← All 11 neighborhood configs (NeighborhoodConfig interface)
│   │   └── features.ts           ← All Daybreak feature configs (FeatureConfig interface)
│   ├── lib/
│   │   └── leads.ts              ← saveLead(), validateEmail(), formatPhone() — shared utilities
│   └── pages/
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Services.tsx
│       ├── Buyers.tsx
│       ├── Sellers.tsx
│       ├── DaybreakFaq.tsx
│       ├── DaybreakNewsletter.tsx
│       ├── DaybreakNewsletterPost.tsx  ← Reads slug from URL, looks up post in posts.ts
│       ├── DaybreakMarketPulse.tsx     ← Recharts graphs page
│       ├── AdminLeads.tsx              ← Dev tool at /admin/leads, reads tw_leads from localStorage
│       ├── SkeletonPage.tsx            ← Placeholder for unbuilt pages
│       ├── service-areas/
│       │   ├── Daybreak.tsx            ← Custom full page (not ServiceAreaPage template)
│       │   ├── SouthJordan.tsx         ← Uses ServiceAreaPage template
│       │   ├── Herriman.tsx            ← Uses ServiceAreaPage template
│       │   ├── Riverton.tsx            ← Uses ServiceAreaPage template
│       │   └── neighborhoods/
│       │       ├── index.tsx           ← Grid of all 11 neighborhood cards
│       │       ├── FoundersParkVillage.tsx
│       │       ├── NorthShoreVillage.tsx
│       │       ├── HeightsParkVillage.tsx
│       │       ├── LakeVillage.tsx
│       │       ├── EastlakeVillage.tsx
│       │       ├── GardenPark.tsx
│       │       ├── SodaRow.tsx
│       │       ├── SouthStationVillage.tsx
│       │       ├── HighlandParkVillage.tsx
│       │       ├── SpringHouseVillage.tsx
│       │       └── CreeksideVillage.tsx
│       └── daybreak-features/
│           ├── index.tsx               ← Grid of all feature cards
│           ├── OquirrhLake.tsx
│           ├── Watercourse.tsx
│           ├── TheLoop.tsx
│           ├── TheSpoke.tsx
│           ├── Parks.tsx
│           ├── Pools.tsx
│           ├── CommunityCenter.tsx
│           ├── SodaRowShopping.tsx
│           ├── DowntownDaybreak.tsx
│           └── LiveDaybreak.tsx
```

---

## All Routes

Defined in `src/App.tsx`.

| Route | Component | Notes |
|---|---|---|
| `/` | `Home` | Video hero, valuation form, neighborhoods strip, features preview, about preview |
| `/services` | `Services` | Services overview page |
| `/buyers` | `Buyers` | Buyer guide with contact form |
| `/sellers` | `Sellers` | Seller guide with contact form |
| `/about` | `About` | Tommy's bio, headshot |
| `/contact` | `Contact` | Full contact form + info |
| `/daybreak-faq` | `DaybreakFaq` | HOA rules, community Q&A |
| `/daybreak-newsletter` | `DaybreakNewsletter` | Blog post index, pulls from `posts.ts` |
| `/daybreak-newsletter/:slug` | `DaybreakNewsletterPost` | Single post page, matches slug from `posts.ts` |
| `/daybreak-market-pulse` | `DaybreakMarketPulse` | Market charts (Recharts) |
| `/service-areas/south-jordan` | `SouthJordan` | ServiceAreaPage template |
| `/service-areas/daybreak` | `DaybreakArea` | Custom Daybreak page (full HOA detail, neighborhoods CTA) |
| `/service-areas/herriman` | `Herriman` | ServiceAreaPage template |
| `/service-areas/riverton` | `Riverton` | ServiceAreaPage template |
| `/service-areas/daybreak/neighborhoods` | `NeighborhoodsIndex` | Grid of 11 neighborhood cards |
| `/service-areas/daybreak/neighborhoods/:slug` | Individual neighborhood pages | 11 pages using `NeighborhoodPage` template |
| `/daybreak-features` | `DaybreakFeaturesIndex` | Grid of all feature cards |
| `/daybreak-features/:slug` | Individual feature pages | 10 pages using `FeaturePage` template |
| `/admin/leads` | `AdminLeads` | NOT in nav — dev-only lead viewer |
| `*` | `NotFound` | Inline 404 component defined in `App.tsx` |

---

## Photo System

### `ImagePlaceholder` component (`src/components/ImagePlaceholder.tsx`)

Renders a standard `<img>` tag. On `onError` (image missing or broken), it swaps to a dark `#1A1A1A` div with the `fallbackLabel` displayed in gold italic text centered on it. This means missing photos fail gracefully — no broken image icons.

### Where photos go

All photos must be `.png` files placed in:

| Type | Folder | Filename convention |
|---|---|---|
| Service area hero | `public/areas/` | `{slug}.png` e.g. `south-jordan.png` |
| Neighborhood hero | `public/neighborhoods/` | `{slug}.png` e.g. `founders-park-village.png` |
| Daybreak feature | `public/features/` | `{slug}.png` e.g. `oquirrh-lake.png` |
| Tommy's headshot | `public/` | `headshot.png` |
| Home hero video | `public/` | `website-loop.mp4` |

The slug in the filename must exactly match the `slug` field in the data config (`neighborhoods.ts` or `features.ts`) — this is how the image src is constructed automatically.

---

## Blog / Newsletter Post System

Posts are stored in `src/data/posts.ts`. The newsletter index page (`/daybreak-newsletter`) renders a card for every post in that array. The post detail page (`/daybreak-newsletter/:slug`) matches the URL slug to `post.slug` and renders the full post.

### Post interface

```ts
interface Post {
  id: string            // unique string, increment from last
  title: string
  slug: string          // URL-safe, becomes the route /daybreak-newsletter/{slug}
  metaDescription: string
  publishedDate: string // 'YYYY-MM-DD'
  tags: string[]
  excerpt: string       // 1–2 sentences shown on the index card
  body: string          // Raw HTML string — can use <p>, <h2>, <ul>, <strong>, etc.
}
```

### To add a new post

1. Open `src/data/posts.ts`
2. Add a new object to the `posts` array (prepend to show newest first)
3. Set `body` to an HTML string — e.g. `'<p>Paragraph one.</p><p>Paragraph two.</p>'`
4. The new post appears automatically on `/daybreak-newsletter` and at `/daybreak-newsletter/{slug}`

---

## Form / Lead Capture System

All forms across the site save to **localStorage** under the key `tw_leads` as a JSON array. Every entry includes a `timestamp` (ISO string) and a `source` field identifying which form submitted it.

### Shared utilities (`src/lib/leads.ts`)

- `saveLead(data)` — appends to `tw_leads` localStorage. The function body has a `// TODO: POST to Follow Up Boss API` comment — replace the body of this function when FUB credentials are available.
- `validateEmail(email)` — regex email validation, used on every form page
- `formatPhone(raw)` — formats digit string to `(XXX) XXX-XXXX` as user types

### `// TODO: POST to Follow Up Boss API` locations

1. `src/lib/leads.ts` — line 7 (the main `saveLead` function)
2. `src/components/Footer.tsx` — line 9 (footer newsletter signup)

Every page form calls `saveLead()` from `src/lib/leads.ts`. The footer has its own inline copy of the save function (does not import from `lib/leads.ts`).

### Admin lead viewer

Navigate to `/admin/leads` (not in nav). Shows a dark-themed table of all localStorage leads — columns: Timestamp, Source, Name, Email, Phone, Intent, Newsletter. Has a "Clear All Leads" button. Dev-use only.

### Form `source` field values by page

| Page | `source` value |
|---|---|
| Home valuation form | `home-valuation` |
| Contact page | `contact` |
| Buyers page | `buyers-inquiry` |
| Sellers page | `sellers-inquiry` |
| Daybreak area page | `daybreak-contact` |
| South Jordan page | `south-jordan-contact` |
| Herriman page | `herriman-contact` |
| Riverton page | `riverton-contact` |
| Each neighborhood page | `{slug}-inquiry` |
| Footer newsletter | `footer-newsletter` |
| Newsletter page | `newsletter-subscribe` |

---

## Social Links

Social icon buttons are in `src/components/Footer.tsx` around line 133. Currently the `href` values are generic placeholders (`https://facebook.com`, `https://instagram.com`, etc.).

**Pending:** Replace with Tommy's actual profile URLs when available.

```tsx
<SocialBtn href="https://facebook.com"><FacebookIcon /></SocialBtn>
<SocialBtn href="https://instagram.com"><InstagramIcon /></SocialBtn>
<SocialBtn href="https://linkedin.com"><LinkedInIcon /></SocialBtn>
<SocialBtn href="https://youtube.com"><YouTubeIcon /></SocialBtn>
```

---

## Deployment

**Host:** Netlify (drag-and-drop method)

```bash
npm run build
# Then drag the dist/ folder to Netlify's deploy drop zone
```

The site uses `BrowserRouter` (not hash routing), so Netlify needs a `_redirects` file in `public/` for client-side routing to work on direct URL loads:

```
/* /index.html 200
```

If deep links (e.g. `/service-areas/daybreak`) return 404 on Netlify, add that file.

---

## Common Tasks

### Add a blog post
Edit `src/data/posts.ts` — prepend a new object to the `posts` array. See Post interface above.

### Add a photo
Drop a `.png` into the correct `public/` subfolder matching the slug. No code changes needed — the image src is constructed from the slug automatically.

### Add a new service area page
1. Create `src/pages/service-areas/YourCity.tsx` — copy `SouthJordan.tsx` as a template and fill in the `ServiceAreaConfig` object
2. Add the import and `<Route>` to `src/App.tsx`
3. Add a `FooterLink` entry in `src/components/Footer.tsx` under the Service Areas section
4. Drop `public/areas/your-city.png`

### Add a new neighborhood page
1. Add the neighborhood config object to `src/data/neighborhoods.ts` (follow `NeighborhoodConfig` interface)
2. Create `src/pages/service-areas/neighborhoods/YourNeighborhood.tsx` — copy an existing neighborhood page
3. Add import and `<Route>` to `src/App.tsx`
4. Add a card to `src/pages/service-areas/neighborhoods/index.tsx`
5. Drop `public/neighborhoods/your-neighborhood-slug.png`

### Update social media links
Edit `src/components/Footer.tsx` — find the four `<SocialBtn href="...">` calls around line 133 and replace the `href` values.

### Update contact info
Two places:
1. `src/components/Footer.tsx` — the contact array around line 114
2. `src/pages/Contact.tsx` — the displayed email/phone links

Current values: `twolfrealestate@gmail.com` | `(801) 580-0647`

---

## Market Pulse Data Pipeline

The Daybreak Market Pulse page (`/daybreak-market-pulse`) renders charts from a static JS data file. Data is sourced from Excel exports and processed manually before being committed.

### Data flow

1. Drop the Excel export into `src/data/market/`
2. The relevant sheet is named `res_website_template_export`
3. Run the processing script (or manually update `src/data/marketData.js`) using the rules below
4. Commit the updated `marketData.js` — the chart page reads from it directly

### Excel column mapping

| Excel column | Used for |
|---|---|
| `Sold Date` | Determines which month the record belongs to |
| `Property Type` | Determines the property type group |
| `Sold Price` | Median Sale Price calculation |
| `List Price` | Median List-to-Sale Ratio calculation |
| `DOM` | Median Days on Market calculation |
| `Zip` | Filter — only include zip code `84009` |

### Filters

- **Zip code:** Include only records where `Zip == 84009`
- **DOM:** Exclude records with null or blank `DOM` values from Days on Market calculations (include them for all other metrics)

### Property type grouping

| Group label | Source values in Excel |
|---|---|
| `Single Family` | `Single Family` only |
| `Townhome` | `Townhouse` + `Twin` + `Condo` combined |

### Metrics calculated

All metrics are calculated per calendar month, split by property type group:

- **Median Sale Price** — median of `Sold Price`
- **Median Days on Market** — median of `DOM` (nulls excluded)
- **Total Homes Sold** — count of records
- **Median List-to-Sale Ratio** — median of `(Sold Price / List Price) * 100`

### Output file

`src/data/marketData.js` — structured JS object. Historical months are preserved; new months are appended. Never overwrite old data — only add.

### `marketData.js` structure

```js
const marketData = {
  singleFamily: [
    {
      month: 'YYYY-MM',         // e.g. '2025-01'
      medianPrice: 000000,      // number, no commas
      medianDOM: 00,            // number
      totalSold: 00,            // number
      medianListToSale: 00.00,  // number, e.g. 98.5 means 98.5%
    },
    // ... one object per month, chronological
  ],
  townhome: [
    // same shape
  ],
}

export default marketData
```

---

## Pending / Known Gaps

- **Social media URLs** — Footer icons link to generic platform homepages. Replace with Tommy's actual profile URLs in `Footer.tsx`.
- **Follow Up Boss integration** — All forms write to localStorage only. Replace `saveLead()` in `src/lib/leads.ts` with a FUB API call when credentials are available.
- **Missing area photos** — `public/areas/` only has `daybreak.png`. Still needed: `south-jordan.png`, `herriman.png`, `riverton.png`.
- **Missing feature photos** — `public/features/` is missing: `the-spoke.png`, `pools.png`, `community-center.png`, `soda-row-shopping.png`, `downtown-daybreak.png`, `livedaybreak.png`. These pages show the gold fallback placeholder until photos are added.
- **Blog post body content** — All three posts in `posts.ts` have `body: '<p>Full article coming soon.</p>'`. Real content needs to be written.
- **Netlify `_redirects`** — Not yet confirmed whether a `public/_redirects` file exists. Needed for React Router deep links to work on Netlify direct loads.
- **Home hero video** — `public/website-loop.mp4` is in place. The home page hero uses an HTML5 `<video>` element (autoplay, muted, loop, playsInline) with `backgroundColor: '#1a1a1a'` as the fallback.
