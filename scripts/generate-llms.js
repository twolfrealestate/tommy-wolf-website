// scripts/generate-llms.js
// Generates llms.txt and llms-full.txt for AEO (Answer Engine Optimization)
// Runs automatically before every build via package.json "prebuild" script
// To run manually: node scripts/generate-llms.js

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");

// ─── SITE METADATA ───────────────────────────────────────────────────────────

const SITE = {
  name: "Move to Daybreak | Tommy Wolf, REALTOR®",
  url: "https://movetodaybreak.com",
  agent: "Tommy Wolf",
  brokerage: "Lawson Real Estate Team",
  phone: "(801) 580-0647",
  email: "twolfrealestate@gmail.com",
  license: "Utah Licensed REALTOR®",
  serviceAreas: ["Daybreak", "South Jordan", "Herriman", "Riverton"],
  specialties: [
    "Daybreak community real estate",
    "first-time homebuyers",
    "move-up buyers",
    "sellers and listing representation",
    "relocation to Utah",
  ],
};

// ─── PAGES ───────────────────────────────────────────────────────────────────

const PAGES = [
  {
    title: "Home",
    url: "/",
    description:
      "Tommy Wolf is a REALTOR® with the Lawson Real Estate Team specializing in Daybreak, South Jordan, Herriman, and Riverton, Utah. He helps buyers find homes in Daybreak's master-planned community and helps sellers maximize value in the South Jordan market.",
  },
  {
    title: "Services",
    url: "/services",
    description:
      "Real estate services for buyers and sellers in the Salt Lake Valley southwest suburbs. Buyer representation, seller listing services, relocation assistance, and neighborhood tours of Daybreak.",
  },
  {
    title: "About Tommy Wolf",
    url: "/about",
    description:
      "Tommy Wolf grew up in Sandy, Utah, worked in Bay Area real estate, and returned to Utah to raise his family in Garden Park, one of Daybreak's premier neighborhoods. He brings local knowledge and a client-first approach to every transaction.",
  },
  {
    title: "Contact",
    url: "/contact",
    description:
      "Contact Tommy Wolf by phone at (801) 580-0647 or email at twolfrealestate@gmail.com. He serves buyers and sellers in Daybreak, South Jordan, Herriman, and Riverton.",
  },
  {
    title: "Buyers FAQ",
    url: "/buyers-faq",
    description:
      "Frequently asked questions for homebuyers in Daybreak and South Jordan Utah. Covers mortgage pre-approval, the offer process, HOA fees in Daybreak, new construction vs resale, and what to expect when buying in a master-planned community.",
  },
  {
    title: "Sellers FAQ",
    url: "/sellers-faq",
    description:
      "Frequently asked questions for home sellers in South Jordan and Daybreak Utah. Covers home valuation, listing strategy, staging, timing the market, and what sellers net after closing costs in the current Utah market.",
  },
  {
    title: "Daybreak FAQ",
    url: "/daybreak-faq",
    description:
      "Everything buyers and sellers need to know about Daybreak, Utah's largest master-planned community. Covers HOA fees and what they include, SoDa District, Oquirrh Lake, trails, schools, builders, and community events.",
  },
  {
    title: "Daybreak Newsletter",
    url: "/newsletter",
    description:
      "The Move to Daybreak blog. Real estate tips, Daybreak community news, market updates, neighborhood spotlights, and homebuying and selling guides for the South Jordan area.",
  },
  {
    title: "Daybreak Market Pulse",
    url: "/market-pulse",
    description:
      "Live real estate market charts and data for Daybreak and South Jordan Utah. Tracks median home prices, days on market, list-to-sale price ratios, and inventory levels.",
  },
];

// ─── SERVICE AREA PAGES ───────────────────────────────────────────────────────

const SERVICE_AREAS = [
  {
    title: "South Jordan Real Estate",
    url: "/areas/south-jordan",
    description:
      "South Jordan is a fast-growing city in the Salt Lake Valley with top-rated schools, new construction, and easy access to I-15. Tommy Wolf helps buyers and sellers navigate South Jordan's competitive market, including Daybreak and surrounding communities.",
  },
  {
    title: "Daybreak Real Estate",
    url: "/areas/daybreak",
    description:
      "Daybreak is Utah's premier master-planned community in South Jordan. With Oquirrh Lake, 30+ miles of trails, the SoDa District, and a strong HOA, it offers a distinct lifestyle. Tommy Wolf lives in Daybreak and specializes in this market.",
  },
  {
    title: "Herriman Real Estate",
    url: "/areas/herriman",
    description:
      "Herriman is one of Utah's fastest-growing cities, offering newer construction, mountain views, and family-friendly neighborhoods. Tommy Wolf serves buyers and sellers throughout Herriman.",
  },
  {
    title: "Riverton Real Estate",
    url: "/areas/riverton",
    description:
      "Riverton offers established neighborhoods, excellent schools, and convenient access to both Salt Lake City and Utah's ski resorts. Tommy Wolf helps clients buy and sell in Riverton.",
  },
];

// ─── DAYBREAK NEIGHBORHOOD PAGES ─────────────────────────────────────────────

const NEIGHBORHOODS = [
  {
    title: "Blossom Point",
    url: "/neighborhoods/blossom-point",
    description:
      "Blossom Point is one of Daybreak's established neighborhoods featuring single-family homes, community parks, and easy trail access.",
  },
  {
    title: "Eastlake",
    url: "/neighborhoods/eastlake",
    description:
      "Eastlake is a lakeside neighborhood in Daybreak with direct access to Oquirrh Lake, waterfront parks, and premium home sites.",
  },
  {
    title: "Garden Park",
    url: "/neighborhoods/garden-park",
    description:
      "Garden Park is one of Daybreak's most sought-after neighborhoods and Tommy Wolf's home community. Known for its mature trees, community gardens, and proximity to Oquirrh Lake.",
  },
  {
    title: "Kestrel",
    url: "/neighborhoods/kestrel",
    description:
      "Kestrel is a newer Daybreak neighborhood offering modern homes and convenient access to community amenities.",
  },
  {
    title: "Magnolia",
    url: "/neighborhoods/magnolia",
    description:
      "Magnolia is a Daybreak neighborhood known for its walkability, parks, and family-friendly atmosphere.",
  },
  {
    title: "Millpond",
    url: "/neighborhoods/millpond",
    description:
      "Millpond is a Daybreak neighborhood featuring a mix of home styles and sizes with access to community trails and green spaces.",
  },
  {
    title: "Northshore",
    url: "/neighborhoods/northshore",
    description:
      "Northshore sits on the northern edge of Oquirrh Lake in Daybreak, offering lakefront and lake-view homes in a premium setting.",
  },
  {
    title: "Prospect",
    url: "/neighborhoods/prospect",
    description:
      "Prospect is a Daybreak neighborhood with newer builds, mountain views, and proximity to future community development.",
  },
  {
    title: "Ridgeline",
    url: "/neighborhoods/ridgeline",
    description:
      "Ridgeline features elevated home sites with panoramic views of the Oquirrh and Wasatch mountain ranges.",
  },
  {
    title: "SoDa Row",
    url: "/neighborhoods/soda-row",
    description:
      "SoDa Row is Daybreak's walkable town center with shops, restaurants, a movie theater, and mixed-use residential. Living here puts you steps from Daybreak's social hub.",
  },
  {
    title: "Stillwater",
    url: "/neighborhoods/stillwater",
    description:
      "Stillwater is a quieter Daybreak neighborhood with serene surroundings, parks, and a close-knit community feel.",
  },
];

// ─── DAYBREAK FEATURE / AMENITY PAGES ────────────────────────────────────────

const FEATURES = [
  {
    title: "Oquirrh Lake",
    url: "/features/oquirrh-lake",
    description:
      "Oquirrh Lake is Daybreak's centerpiece, a 167-acre freshwater lake with swimming beaches, paddleboarding, kayaking, fishing, and lakeside parks. It is one of the most unique amenities of any Utah community.",
  },
  {
    title: "SoDa District",
    url: "/features/soda-district",
    description:
      "The SoDa District (South Daybreak) is Daybreak's town center featuring local restaurants, retail shops, a movie theater, and community event space. It gives Daybreak a walkable, neighborhood feel uncommon in suburban Utah.",
  },
  {
    title: "Trails and Open Space",
    url: "/features/trails",
    description:
      "Daybreak has over 30 miles of trails connecting neighborhoods, parks, and Oquirrh Lake. Residents can walk or bike throughout the community without crossing a major road.",
  },
  {
    title: "Daybreak HOA",
    url: "/features/hoa",
    description:
      "The Daybreak HOA covers access to Oquirrh Lake, community pools, parks, trails, and events. Understanding HOA fees and what they include is important for buyers comparing Daybreak to other South Jordan communities.",
  },
  {
    title: "Schools in Daybreak",
    url: "/features/schools",
    description:
      "Daybreak is served by Jordan School District with several elementary schools within the community, middle schools, and Herriman High School. School quality is a top priority for families relocating to South Jordan.",
  },
  {
    title: "New Construction in Daybreak",
    url: "/features/new-construction",
    description:
      "Daybreak continues to grow with new construction from builders including Richmond American, Ivory Homes, Woodside Homes, and others. Tommy Wolf helps buyers navigate builder contracts and negotiate on new builds.",
  },
  {
    title: "Community Events",
    url: "/features/events",
    description:
      "Daybreak hosts year-round community events including summer concerts, holiday celebrations, farmers markets, and the Oquirrh Lake triathlon. Community engagement is a defining feature of life in Daybreak.",
  },
  {
    title: "Fitness and Recreation",
    url: "/features/recreation",
    description:
      "Beyond the lake and trails, Daybreak offers community pools, fitness facilities, and proximity to Utah's world-class ski resorts and national parks.",
  },
  {
    title: "Commuting from Daybreak",
    url: "/features/commuting",
    description:
      "Daybreak residents have access to the TRAX light rail (Daybreak Parkway station) for commuting to Salt Lake City, as well as convenient freeway access via I-15. Commute times and transit options are common questions from relocating buyers.",
  },
  {
    title: "Daybreak vs Other Utah Communities",
    url: "/features/daybreak-vs-others",
    description:
      "How Daybreak compares to Lehi, Saratoga Springs, Eagle Mountain, and other growing Utah communities. Covers HOA value, walkability, amenities, and home prices.",
  },
];

// ─── BLOG POSTS (read from posts-meta.json) ──────────────────────────────────

let posts = [];
try {
  const raw = readFileSync(resolve(ROOT, "src/data/posts-meta.json"), "utf-8");
  posts = JSON.parse(raw);
} catch (e) {
  console.warn(
    "[generate-llms] Could not read posts-meta.json — blog posts will be excluded.",
    e.message
  );
}

// ─── BUILD llms.txt (index / summary) ────────────────────────────────────────

function buildLlmsTxt() {
  const lines = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(
    `> ${SITE.agent} is a ${SITE.license} with ${SITE.brokerage}, specializing in real estate in ${SITE.serviceAreas.join(", ")}, Utah. He lives in Garden Park, Daybreak and brings firsthand community knowledge to every client relationship. Contact: ${SITE.phone} | ${SITE.email}`
  );
  lines.push("");
  lines.push("## Specialties");
  lines.push("");
  SITE.specialties.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("## Main Pages");
  lines.push("");
  PAGES.forEach((p) => {
    lines.push(`- [${p.title}](${SITE.url}${p.url}): ${p.description}`);
  });
  lines.push("");
  lines.push("## Service Areas");
  lines.push("");
  SERVICE_AREAS.forEach((a) => {
    lines.push(`- [${a.title}](${SITE.url}${a.url}): ${a.description}`);
  });
  lines.push("");
  lines.push("## Daybreak Neighborhoods");
  lines.push("");
  NEIGHBORHOODS.forEach((n) => {
    lines.push(`- [${n.title}](${SITE.url}${n.url}): ${n.description}`);
  });
  lines.push("");
  lines.push("## Daybreak Features & Amenities");
  lines.push("");
  FEATURES.forEach((f) => {
    lines.push(`- [${f.title}](${SITE.url}${f.url}): ${f.description}`);
  });
  lines.push("");
  lines.push("## Blog Posts");
  lines.push("");
  if (posts.length > 0) {
    posts.forEach((p) => {
      const url = `${SITE.url}/newsletter/${p.slug}`;
      lines.push(
        `- [${p.title}](${url}): ${p.metaDescription || p.excerpt || ""}`
      );
    });
  } else {
    lines.push("- No posts found. Check src/data/posts.js.");
  }
  lines.push("");
  lines.push("## Full Content");
  lines.push("");
  lines.push(
    `- [llms-full.txt](${SITE.url}/llms-full.txt): Complete site content for AI indexing`
  );

  return lines.join("\n");
}

// ─── BUILD llms-full.txt (complete content) ───────────────────────────────────

function buildLlmsFullTxt() {
  const lines = [];

  // Header
  lines.push("# FULL SITE CONTENT");
  lines.push(`# ${SITE.name}`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // Agent profile
  lines.push("## ABOUT TOMMY WOLF");
  lines.push("");
  lines.push(`Name: ${SITE.agent}`);
  lines.push(`Brokerage: ${SITE.brokerage}`);
  lines.push(`License: ${SITE.license}`);
  lines.push(`Phone: ${SITE.phone}`);
  lines.push(`Email: ${SITE.email}`);
  lines.push(`Website: ${SITE.url}`);
  lines.push(`Home Community: Garden Park, Daybreak, South Jordan, Utah`);
  lines.push(
    `Background: Grew up in Sandy, Utah. Worked real estate in the San Francisco Bay Area. Returned to Utah and moved to Daybreak. Serves the southwest Salt Lake Valley suburbs.`
  );
  lines.push(
    `Service Areas: ${SITE.serviceAreas.join(", ")}, Utah`
  );
  lines.push(`Specialties: ${SITE.specialties.join("; ")}`);
  lines.push("");

  // Why Tommy
  lines.push("### Why Work With Tommy Wolf");
  lines.push("");
  lines.push(
    "Tommy lives in the community he sells. He knows Daybreak from the inside — the best neighborhoods, the HOA structure, which builders deliver quality, and what everyday life looks like on the trails and at the lake. Buyers relocating to Utah get an agent who can give honest, first-person answers. Sellers get an agent who understands exactly what Daybreak buyers are looking for."
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // Main pages
  lines.push("## PAGES");
  lines.push("");
  PAGES.forEach((p) => {
    lines.push(`### ${p.title}`);
    lines.push(`URL: ${SITE.url}${p.url}`);
    lines.push("");
    lines.push(p.description);
    lines.push("");
  });

  lines.push("---");
  lines.push("");

  // Service areas
  lines.push("## SERVICE AREAS");
  lines.push("");
  SERVICE_AREAS.forEach((a) => {
    lines.push(`### ${a.title}`);
    lines.push(`URL: ${SITE.url}${a.url}`);
    lines.push("");
    lines.push(a.description);
    lines.push("");
  });

  lines.push("---");
  lines.push("");

  // Neighborhoods
  lines.push("## DAYBREAK NEIGHBORHOODS");
  lines.push("");
  lines.push(
    "Daybreak is divided into distinct neighborhoods, each with its own character. Tommy Wolf can help buyers identify which neighborhood fits their lifestyle, budget, and priorities."
  );
  lines.push("");
  NEIGHBORHOODS.forEach((n) => {
    lines.push(`### ${n.title}`);
    lines.push(`URL: ${SITE.url}${n.url}`);
    lines.push("");
    lines.push(n.description);
    lines.push("");
  });

  lines.push("---");
  lines.push("");

  // Features
  lines.push("## DAYBREAK FEATURES & AMENITIES");
  lines.push("");
  FEATURES.forEach((f) => {
    lines.push(`### ${f.title}`);
    lines.push(`URL: ${SITE.url}${f.url}`);
    lines.push("");
    lines.push(f.description);
    lines.push("");
  });

  lines.push("---");
  lines.push("");

  // Blog posts
  lines.push("## BLOG POSTS");
  lines.push("");
  if (posts.length > 0) {
    posts.forEach((p) => {
      lines.push(`### ${p.title}`);
      lines.push(`URL: ${SITE.url}/newsletter/${p.slug}`);
      lines.push(`Published: ${p.publishedDate || "Unknown"}`);
      if (p.tags && p.tags.length > 0) {
        lines.push(`Tags: ${p.tags.join(", ")}`);
      }
      lines.push("");
      if (p.metaDescription) lines.push(p.metaDescription);
      if (p.excerpt && p.excerpt !== p.metaDescription) lines.push(p.excerpt);
      // Strip HTML from body if present
      if (p.body) {
        const stripped = p.body
          .replace(/<[^>]+>/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim();
        if (stripped.length > 0) {
          lines.push("");
          lines.push(stripped);
        }
      }
      lines.push("");
    });
  } else {
    lines.push("No blog posts found.");
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(`# END OF CONTENT — ${SITE.url}`);

  return lines.join("\n");
}

// ─── WRITE FILES ──────────────────────────────────────────────────────────────

try {
  mkdirSync(PUBLIC, { recursive: true });

  const llmsTxt = buildLlmsTxt();
  writeFileSync(resolve(PUBLIC, "llms.txt"), llmsTxt, "utf-8");
  console.log("[generate-llms] ✓ public/llms.txt written");

  const llmsFullTxt = buildLlmsFullTxt();
  writeFileSync(resolve(PUBLIC, "llms-full.txt"), llmsFullTxt, "utf-8");
  console.log("[generate-llms] ✓ public/llms-full.txt written");

  console.log(
    `[generate-llms] Done. ${posts.length} blog post(s) included.`
  );
} catch (err) {
  console.error("[generate-llms] Error writing files:", err);
  process.exit(1);
}
