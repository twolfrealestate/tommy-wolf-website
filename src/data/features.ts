export interface FeatureConfig {
  name: string
  slug: string
  h2: string
  paragraphs: string[]
  buyersCard: string
  sellersCard: string
  quickFacts: { icon: string; label: string }[]
}

const features: FeatureConfig[] = [
  {
    name: 'Oquirrh Lake',
    slug: 'oquirrh-lake',
    h2: 'A 65-Acre Private Freshwater Lake at the Heart of Daybreak',
    paragraphs: [
      "Oquirrh Lake is the geographical and emotional heart of Daybreak — a 65-acre man-made freshwater lake around which the community's original neighborhoods were built. With 5 miles of paved shoreline trails, non-motorized boating, kayak and paddleboard rentals, fishing from designated areas, and a Beach Club for watercraft check-out, Oquirrh Lake offers a residential amenity that rivals anything in the state of Utah.",
      "Residents can fish in the lake with a valid Utah state fishing license (all state regulations apply). Swimming and wading are not permitted due to water quality and ecosystem preservation. Seasonal boat permits ($12/year per watercraft) are required for personal kayaks, paddleboards, or other approved watercraft. The Association's watercraft can be checked out from the Beach Club on the west side of the lake from Memorial Day through Labor Day.",
      "The Island at Oquirrh Lake — 160 prime lots surrounded by 360° of shoreline — is Daybreak's most exclusive address. Lake Village, SoDa Row, Garden Park, Founders Park Village, Eastlake Village, and North Shore Village all sit adjacent to or near the lake, and command price premiums that reflect that proximity.",
    ],
    buyersCard: "Homes near or on Oquirrh Lake consistently command price premiums over comparable homes further from the water. Understanding which neighborhoods have true lake access — and which are simply 'near Daybreak' — is essential due diligence. I help buyers evaluate lake proximity honestly and accurately.",
    sellersCard: "If your home is in a lake-adjacent neighborhood, that proximity is a primary marketing hook. I highlight lake access, trail connectivity, and the watercraft amenity specifically in every listing within striking distance of Oquirrh Lake.",
    quickFacts: [
      { icon: '📐', label: '65 acres' },
      { icon: '🏊', label: 'Non-motorized boating, kayaking, paddleboarding, sailing' },
      { icon: '🎣', label: 'Fishing (Utah license required)' },
      { icon: '🚣', label: 'Watercraft rental Memorial Day – Labor Day' },
    ],
  },
  {
    name: 'The Watercourse',
    slug: 'watercourse',
    h2: "A Chain of Waterways Winding Through Daybreak's Upper Villages",
    paragraphs: [
      "The Watercourse is Daybreak's answer to Oquirrh Lake for the Upper Villages — a series of calm, interconnected waterways that meander through the community's western neighborhoods, completed and fully opened in 2024. With paddling access, pocket parks, trails alongside the water, and gathering spaces at key points, the Watercourse brings waterfront living to Daybreak's newest phases.",
      "At the center of the Watercourse is the Cove House — currently home to the Developer's Information Studio and a Swig location. Residents can check out yard games here, rent a paddleboard or kayak from the Boat House, or simply walk the trails that line the waterway. The Watercourse connects directly to The Loop trail network, making it a hub for the Upper Village pedestrian and cycling infrastructure.",
      "The Watercourse was a defining feature of Highland Park Village and Cascade Village development. Homes adjacent to the Watercourse — similar to lake-adjacent homes in the Lower Villages — carry location premiums that are increasingly recognized in the resale market as these neighborhoods mature.",
    ],
    buyersCard: "If you're considering a newer Upper Village home, proximity to the Watercourse works much like lake proximity does in the Lower Villages — it's a genuine lifestyle differentiator. Ask me which lots and streets back to the water.",
    sellersCard: "Watercourse adjacency is an emerging value driver in the Upper Villages. As these neighborhoods mature and more buyers discover this amenity, homes backing to or near the Watercourse will increasingly command premiums.",
    quickFacts: [
      { icon: '🌊', label: 'Multi-section waterway system' },
      { icon: '🚣', label: 'Paddleboard & kayak rentals' },
      { icon: '🏡', label: 'Cove House + Swig on-site' },
      { icon: '🚴', label: 'Connected to The Loop trail network' },
    ],
  },
  {
    name: 'The Loop & Trails',
    slug: 'the-loop',
    h2: '50+ Miles of Trails — Including a Protected Bike Highway',
    paragraphs: [
      "Daybreak's trail network is one of the most comprehensive in any residential community in Utah — 50+ miles of paved trails, natural paths, and dedicated Bike Highways winding through every village and connecting residents to parks, the lake, the Watercourse, and beyond. The community was designed on what it calls the '5-minute rule': every home within a 5-minute walk of some type of amenity, and the trail network is how that gets delivered.",
      "The Loop is a ribbon of connected open space and parks that weaves through the Upper Villages — a signature trail feature offering a safe, scenic, car-free route for cyclists, runners, and walkers. The Bike Highway is integrated into The Loop and is physically separated from vehicle traffic with signalized crossings, including one at Mountain View Corridor connecting the Upper and Lower Villages. It's how kids ride to school and adults commute to SoDa Row without touching a road.",
      "Trails in Daybreak are maintained by the DCA and South Jordan City. No motorized vehicles (including battery and gas-powered) are permitted on trails or the Bike Highway within South Jordan City. Dog-friendly, stroller-friendly, and accessible throughout the community year-round.",
    ],
    buyersCard: "Trail access is a non-negotiable for a significant portion of Daybreak buyers. Knowing which streets and neighborhoods have direct trail access — versus ones where you need to drive to a trailhead — is a detail that affects daily quality of life. I help buyers map this out before purchase.",
    sellersCard: "Trail proximity is a consistent selling point for Daybreak homes. Including trail access in your listing marketing — with accurate walking distances to key trail connections — is part of how I position Daybreak listings.",
    quickFacts: [
      { icon: '🚴', label: '50+ miles of maintained trails' },
      { icon: '🚦', label: 'Protected Bike Highway (Upper Villages)' },
      { icon: '🐕', label: 'Dog-friendly throughout' },
      { icon: '🚫', label: 'No motorized vehicles on trails' },
    ],
  },
  {
    name: 'The Spoke Bike Park',
    slug: 'the-spoke',
    h2: "Utah's Most Unique Residential Bike Park",
    paragraphs: [
      "The Spoke is a half-mile bike park experience located in Daybreak's Upper Villages — and there's genuinely nothing else like it in a residential community in Utah. Designed for riders of all ability levels from beginner to expert, the park features whale tails, berms, gaps, rock gardens, and tabletops set among groves of trees and natural terrain features. You'll find yourself breezing through basins, catching air on features, and navigating a purpose-built course that challenges without intimidating.",
      "The Spoke is connected to The Loop and the broader Daybreak trail network, making it easily accessible from all Upper Village neighborhoods by bike without crossing a road. Battery and gas-powered motor vehicles are not permitted on the Spoke or on South Jordan City's roads, sidewalks, and trails — keeping the experience clean and safe for pedal-powered riders.",
      "For families with cycling-enthusiast kids — or buyers who ride themselves — The Spoke is a meaningful differentiator. It's the kind of amenity that doesn't show up in a Zestimate but absolutely shows up in how people choose between Daybreak and competing communities.",
    ],
    buyersCard: "The Spoke is a genuine differentiator for buyers who ride — or who have kids who do. It's within a bike ride of every Upper Village home and adds real lifestyle value that most buyers in this price range wouldn't get elsewhere.",
    sellersCard: "If your home is in the Upper Villages, The Spoke is a compelling marketing point — particularly for families. I highlight it specifically for the right buyer profile.",
    quickFacts: [
      { icon: '🚴', label: 'Half-mile course' },
      { icon: '🏆', label: 'Beginner to expert features' },
      { icon: '🌲', label: 'Natural terrain integration' },
      { icon: '📍', label: 'Upper Villages, connected to The Loop' },
    ],
  },
  {
    name: 'Parks',
    slug: 'parks',
    h2: 'Three Dozen Parks — Each One Unique',
    paragraphs: [
      "Daybreak has approximately three dozen parks spread throughout the community, with more being added with every new village. The design philosophy: every home should be within a 5-minute walk of at least one park. The result is a neighborhood where kids genuinely play outside, neighbors actually know each other, and green space is a constant rather than an afterthought.",
      "Parks in Daybreak range from intimate pocket parks with a bench and a shade tree to major neighborhood destinations like 15-acre Brookside Park in Creekside Village — featuring a swimming pool, zip line, creek for kids to paddle, soccer field, basketball and volleyball courts, and a large playground. Other notable parks include Promenade Park in Eastlake Village (temple-to-lake corridor with pool and courts), Highland Park (South Jordan City Park with pickleball and soccer), and the smaller but beloved neighborhood parks like Firefly Park in Heights Park Village (dramatic cantilevered deck structures) and Lake Avenue Park & Dog Park.",
      "Select park pavilions are available for resident reservation with a deposit from April through September. Contact the Daybreak Community Center to reserve. No motorized vehicles are allowed on any park trail.",
    ],
    buyersCard: "Park access is one of the most commonly cited quality-of-life factors for Daybreak buyers with children. I help buyers identify which neighborhoods have the largest, most feature-rich parks nearby — because not all parks are created equal.",
    sellersCard: "Park proximity, especially to larger destination parks like Brookside or Promenade, is a genuine value driver for family-oriented buyers. I incorporate park distances in listing marketing when relevant.",
    quickFacts: [
      { icon: '🏞️', label: '~36 parks community-wide' },
      { icon: '🏊', label: 'Multiple parks with pools or splash areas' },
      { icon: '🐕', label: 'Off-leash dog parks at Lake Avenue Park' },
      { icon: '📅', label: 'Pavilion reservations April–September' },
    ],
  },
  {
    name: 'Pools',
    slug: 'pools',
    h2: 'Five Community Pools — Included in Your HOA',
    paragraphs: [
      "Five community swimming pools and a splash pad are open to all Daybreak residents — included in the DCA Master Association quarterly assessment at no additional charge. All pools are open every day of the week from Memorial Day weekend through Labor Day weekend, with limited extended hours available outside peak season. The five pools are: the Daybreak Community Center Pool, Eastlake Pool (in Promenade Park), Brookside Pool (in Brookside Park), Highland Park Pool, and the Splash Pad.",
      "Pool access requires an active amenity card, obtained from the Daybreak Community Center. All guests must purchase a temporary amenity pass to access pools and other facilities. Swim programs including swim lessons, Splashball water aerobics, and Tsunami Fitness are available for an additional fee and are scheduled through the DCA.",
      "In addition to the community pools, Garden Park and SpringHouse Village both have their own private pools for their respective residents — an additional benefit for 55+ community buyers.",
    ],
    buyersCard: "Five included pools is a rare amenity in any residential community. For buyers with families, or buyers who treat pool access as an important lifestyle factor, Daybreak's pool network is a significant part of the value calculation for that $433.50/quarter assessment.",
    sellersCard: "The pool network is consistently cited by buyers as a top reason for choosing Daybreak. I make sure this is prominent in every listing's amenity narrative.",
    quickFacts: [
      { icon: '🏊', label: '5 community pools + splash pad' },
      { icon: '📅', label: 'Open Memorial Day – Labor Day' },
      { icon: '💳', label: 'Amenity card required' },
      { icon: '🏃', label: 'Swim lessons, aerobics, lap swimming programs available' },
    ],
  },
  {
    name: 'Community Center',
    slug: 'community-center',
    h2: 'A Full Club-Quality Fitness Center — Steps from Your Home',
    paragraphs: [
      "The Daybreak Community Center (DCC) is the hub of community life — a full club-quality facility available to all Daybreak residents as part of the DCA Master Association assessment. Located at 4544 W. Harvest Moon Drive adjacent to Daybreak Elementary, the DCC features a fitness center with club-quality equipment, an indoor running track, basketball courts, group fitness classes, a community swimming pool, and several large multipurpose rooms.",
      "Group fitness classes are offered at the DCC for a small additional fee and are scheduled through the Association's online system. The DCC also offers a Child Watch program — supervised childcare during your workout — with hourly, daily, and monthly rates. Four rooms are available for resident rental for parties, club meetings, and community events (see current rates at mydaybreak.com/places_spaces).",
      "New Daybreak residents should visit the DCC first to pick up their amenity card and create a resident account. The amenity card provides access to all community pools, the lake, and other facilities requiring resident identification. The DCC is open daily — check mydaybreak.com for current hours.",
    ],
    buyersCard: "The DCC eliminates the need for a separate gym membership — a real monthly savings that doesn't show up in price-per-square-foot comparisons but absolutely factors into the true cost of living comparison with non-HOA neighborhoods.",
    sellersCard: "The DCC is one of the most tangible amenity arguments for Daybreak's HOA value. It's an easy number: a club-quality gym membership in South Jordan runs $40–$80/month. Your HOA covers that and the lake, pools, and trails.",
    quickFacts: [
      { icon: '🏋️', label: 'Club-quality gym' },
      { icon: '🏃', label: 'Indoor track' },
      { icon: '🏀', label: 'Basketball courts' },
      { icon: '👶', label: 'Child Watch available' },
    ],
  },
  {
    name: 'SoDa Row & Shopping',
    slug: 'soda-row-shopping',
    h2: "Daybreak's Original Town Center — Walkable from the Lake",
    paragraphs: [
      "SoDa Row is Daybreak's original commercial heart — a village center with a curated mix of local restaurants, boutiques, coffee shops, personal services, and office space all within walking distance of Oquirrh Lake and the surrounding neighborhoods. Anchored by the Beach Club watercraft rental station, SoDa Row serves as both a retail destination and a community gathering point.",
      "The Trail Crossing Shopping Center, located adjacent to Mountain View Corridor, anchors Daybreak's larger-format retail with Smith's Marketplace as the main draw, supplemented by restaurants, services, and shops. North Shore Village Center on the north shore of Oquirrh Lake adds a Harmons Neighborhood Grocer (17,000 sq ft), dining, and retail convenient to the north-side neighborhoods. Together, these three commercial nodes mean most daily errands can be completed without leaving Daybreak.",
      "Zander Real Estate, Keller Williams, and other professional services are also located in or near SoDa Row — a sign of the commercial maturity of this district. The Rio Tinto regional center anchors the office presence, and eBay's campus is located just off the Daybreak Parkway.",
    ],
    buyersCard: "Walkable retail is a major quality-of-life driver and an increasingly significant price factor in residential communities. Daybreak buyers who can walk to coffee, groceries, and restaurants from their home consistently express higher satisfaction — and homes in walking distance to SoDa Row reflect that demand.",
    sellersCard: "If your home is in Founders Park Village, Garden Park, SoDa Row, or South Station, the walkability to SoDa Row and retail is a primary positioning point. I map the walking distance in every listing for these neighborhoods.",
    quickFacts: [
      { icon: '🛍️', label: 'Local boutiques, restaurants, coffee, barbershop' },
      { icon: '🚣', label: 'Beach Club watercraft rentals' },
      { icon: '🛒', label: 'Three commercial nodes serving all of Daybreak' },
      { icon: '📍', label: 'SoDa Row, Trail Crossing, North Shore Village Center' },
    ],
  },
  {
    name: 'Downtown Daybreak',
    slug: 'downtown-daybreak',
    h2: "Utah's First Sports & Entertainment District — Now Open",
    paragraphs: [
      "Downtown Daybreak is the community's new urban core — and it's a genuine game-changer for South Jordan's long-term real estate trajectory. Strategically located along the TRAX Red Line with its own third stop (opened March 2025), Downtown Daybreak encompasses the Ballpark at America First Square (home of the Salt Lake Bees, opened April 2025), a brand-new Megaplex Cinema Entertainment Center with bowling and arcade games, an open-air performance venue, multiple restaurants, the University of Utah South Jordan Health Center, and a future public library.",
      "Restaurants now open include Hires Big H and Moena Cafe, with Nomad Eatery, Naraya Thai, Red Iguana, and Rockwell Ice Cream Company expected to open Spring 2026, and Jolley's Corner scheduled for Summer/Fall 2026. The Miller Arts Center — a $25M regional arts center funded by the Larry H. and Gail Miller Family Foundation — is expected to break ground in early 2026.",
      "Downtown Daybreak is designed to accommodate thousands of future jobs in planned office buildings and significant additional retail. For real estate purposes, Downtown Daybreak represents a long-term appreciation catalyst for homes in South Station Village, SoDa Row, Eastlake Village, and Founders Park Village — the neighborhoods most proximate to the development.",
    ],
    buyersCard: "Downtown Daybreak is the most significant long-term value driver for nearby Daybreak neighborhoods. Buyers considering South Station, SoDa Row, or Eastlake are effectively buying ahead of a still-maturing downtown district — a position that has historically rewarded buyers in similar contexts.",
    sellersCard: "Downtown Daybreak gives sellers a compelling appreciation narrative for nearby homes. This isn't a future promise — it's an open, operational district. I use this context when pricing and marketing homes near the development.",
    quickFacts: [
      { icon: '⚾', label: 'Salt Lake Bees ballpark (8,000 capacity)' },
      { icon: '🎬', label: 'Megaplex with bowling & arcade' },
      { icon: '🚉', label: '3rd TRAX stop (March 2025)' },
      { icon: '🏥', label: 'U of U Health Center on-site' },
    ],
  },
  {
    name: 'LiveDAYBREAK',
    slug: 'livedaybreak',
    h2: "The Non-Profit Behind Daybreak's Community Culture",
    paragraphs: [
      "LiveDAYBREAK is the independent non-profit organization tasked with creating a community culture where Daybreak residents live more fulfilling lives. Operating under its own board of directors and funded by community enhancement fees (not HOA dues), LiveDAYBREAK organizes events, volunteer opportunities, clubs, and community programming throughout the year.",
      "The annual LiveDAYBREAK calendar includes events like the New Resident Social, the Summer Concert Series at America First Square, the Lakeside Luau, Bollywood celebration, seasonal festivals, and dozens of smaller neighborhood events. The organization also supports community art installations — the wall murals in SoDa Row, the Bike Monster sculptures on the trail network, and utility boxes transformed into public art pieces are all LiveDAYBREAK initiatives.",
      "LiveDAYBREAK is funded through a one-time community enhancement fee of 0.5% of the sale price, paid by the seller at closing. This is not a recurring HOA fee — it's a one-time contribution to the community programming fund. Sellers should account for this in their net sheet calculations (I do this automatically for every Daybreak seller).",
    ],
    buyersCard: "The strength of a community's social fabric directly affects long-term satisfaction with where you live. Daybreak's consistently high resident retention rate — about 25% of new home sales each year come from existing Daybreak residents — is at least partly attributable to LiveDAYBREAK's programming and the genuine sense of belonging it creates.",
    sellersCard: "LiveDAYBREAK is a differentiation point for Daybreak sellers. When competing against similar homes in other South Jordan communities that lack organized programming and events, the lifestyle value of an active, organized community is part of the price justification.",
    quickFacts: [
      { icon: '🎵', label: 'Summer Concert Series' },
      { icon: '🌊', label: 'Lakeside Luau' },
      { icon: '🎨', label: 'Community art installations' },
      { icon: '💰', label: '0.5% community enhancement fee (seller-paid at closing)' },
    ],
  },
]

export default features
