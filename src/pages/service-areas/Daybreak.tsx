import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../../components/FadeSection'
import ImagePlaceholder from '../../components/ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../../lib/leads'

interface FormState { firstName: string; lastName: string; email: string; phone: string; message: string }
const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', message: '' }

const NEARBY = [
  { name: 'South Jordan', slug: 'south-jordan', tagline: "The city that contains Daybreak — established neighborhoods, City Center, and Silicon Slopes access." },
  { name: 'Herriman', slug: 'herriman', tagline: "Mountain views, rapid growth, and new construction at the Oquirrh foothills." },
  { name: 'Riverton', slug: 'riverton', tagline: "Established character, generous lot sizes, and enduring south valley value." },
]

export default function DaybreakArea() {
  useEffect(() => { document.title = 'Daybreak Utah Real Estate | Buy a Home in Daybreak South Jordan | Tommy Wolf REALTOR®' }, [])

  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !validateEmail(form.email)) e.email = 'Valid email required'
    if (Object.keys(e).length) { setErrors(e); return }
    saveLead({ ...form, leadSource: 'Daybreak Service Area Page' })
    // TODO: Pass leadSource to Follow Up Boss when FUB is connected
    setSubmitted(true)
  }

  const darkInput = (err?: string): React.CSSProperties => ({
    width: '100%', fontFamily: 'var(--font-sans)', fontSize: '14px',
    backgroundColor: '#1a1a1a', border: `1px solid ${err ? '#c0392b' : '#333'}`,
    padding: '12px 16px', color: '#fff', outline: 'none',
  })

  return (
    <main>
      {/* HERO */}
      <FadeSection style={{ position: 'relative', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ImagePlaceholder src="/areas/daybreak.png" alt="Daybreak, South Jordan" fallbackLabel="Daybreak, South Jordan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1 }} />
        <div className="content-wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Daybreak, South Jordan, Utah</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400, color: '#fff', marginBottom: '18px', lineHeight: 1.05 }}>
            Daybreak Real Estate
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '20px', color: '#ccc', maxWidth: '580px', margin: '0 auto' }}>
            Utah's Most Ambitious Community — Built Around a Lake, 50 Miles of Trails & a Shared Idea of Home
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* CITY OVERVIEW */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Overview</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}>
            What Makes Daybreak Different From Every Other Community in Utah
          </h2>
          {[
            "Daybreak is not a subdivision. It's not a development. It's an idea that has been under construction for twenty years — a 4,100-acre master-planned community in South Jordan, Utah, designed from first principles around the proposition that a neighborhood should be genuinely livable rather than merely habitable. Since the first home was sold in 2004, Daybreak has grown to encompass more than 9,500 homes, over 45,000 residents, and 11 distinct villages — with the buildout projected to eventually reach 20,000 homes. One in five new homes sold in Salt Lake County since 2005 has been in Daybreak. Those numbers don't happen by accident.",
            "The design philosophy behind Daybreak real estate is the '5-minute rule': every home should be within a five-minute walk of a community amenity. The result is a community where people actually use what they pay for. The centerpiece is 65-acre Oquirrh Lake — a private freshwater lake with five miles of paved shoreline trails, non-motorized boating, kayak and paddleboard rentals, and seasonal fishing. Around it, Daybreak has layered 50-plus miles of maintained trails, five community pools, The Residents Club community center, multiple parks at every scale, the SoDa Row commercial district, and Downtown Daybreak anchored by the Salt Lake Bees ballpark and a Megaplex cinema. Few communities anywhere in the country can match this amenity density at Daybreak's price points.",
            "I am a Daybreak resident — specifically in Garden Park, the community's 55-plus active adult village — which means my knowledge of Daybreak neighborhoods, HOA structures, community rules, and long-term value dynamics is not academic. It is daily lived experience. When a client asks me about buying a home in Daybreak, I'm not drawing on research. I'm drawing on the same walk to the lake every morning, the same food truck Friday at SoDa Row, the same fireworks over Oquirrh Lake on the Fourth of July that every Daybreak resident experiences. That perspective is worth something that a conventional REALTOR in Daybreak simply cannot replicate.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#bbb', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* BENEFITS */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Quality of Life</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            The Benefits of Living in Daybreak
          </h2>
          {[
            "The amenity access included in every Daybreak HOA assessment is genuinely extraordinary. Five community pools — spread across the community so that each village has reasonable proximity to at least one — are open Memorial Day through Labor Day. The Residents Club is a full-service facility with fitness equipment, a banquet hall, gathering spaces, and programming that supports residents across every life stage. Oquirrh Lake permits non-motorized watercraft with a simple seasonal permit, kayak and paddleboard rentals available from The Beach Club during swimming season, and fishing with a valid Utah state license year-round. The 50-plus miles of maintained trails connect every neighborhood to every other neighborhood without requiring a car — and the protected Daybreak Bike Highway creates a car-free cycling corridor that families with children rely on daily.",
            "The social infrastructure of Daybreak is one of its most underrated assets. Because every resident shares the same amenities, the same trails, and the same lake, a natural community cohesion develops that master-planned communities in other cities often attempt but rarely achieve at this scale. Neighbors know each other. Communities organize. Events get attended. The Daybreak Community Association, managed by CCMC, runs the community professionally and responsively — keeping common areas impeccably maintained and enforcing the community standards that protect everyone's property values.",
            "Daybreak homes for sale come with important rules that every buyer must understand before making an offer. Short-term rentals — Airbnb, VRBO, and similar platforms — are strictly prohibited. Owners must occupy their home for twelve months before it is eligible to be rented long-term. There is a no-resale rule for the first twelve months of ownership, with a $25,000 penalty for violation. All exterior modifications require Design Review Committee approval. These rules exist specifically to protect the character and value of the community, and they work. Daybreak's property values have appreciated at an average annual rate of 6 to 8 percent since 2004 — consistently meeting or exceeding Salt Lake County averages across every market cycle.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* NEIGHBORHOODS */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>The Villages</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '16px' }}>
            11 Distinct Daybreak Neighborhoods
          </h2>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#888', lineHeight: 1.7, marginBottom: '32px', maxWidth: '680px' }}>
            Daybreak is not one market — it is eleven distinct villages, each with its own character, price range, HOA structure, and lifestyle emphasis. Understanding which village fits your life is where local expertise becomes essential.
          </p>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {[
              { name: 'Founders Park Village', body: "Daybreak's original 2004 neighborhood. Front-porch architecture, mature trees, alley-loaded garages, and 20 years of community identity. Fully built out — all purchases are resale. Walking distance to SoDa Row, TRAX, and the Community Center." },
              { name: 'Garden Park', body: "Daybreak's 55-plus active adult community — Tommy's own village. Private community center with pool, fitness, and gathering spaces exclusive to Garden Park residents. Priced competitively with a strong sense of neighborhood identity." },
              { name: 'Lake Village & Eastlake Village', body: "Daybreak's premier waterfront addresses — homes and townhomes adjacent to or with views of Oquirrh Lake. Eastlake Village includes Promenade Park on the lake's eastern shore. Lake Village encompasses The Island, Daybreak's most exclusive 160-lot enclave." },
              { name: 'North Shore Village', body: "Affordable lakeside living on Oquirrh Lake's northern shore. North Shore offers one of the most accessible entry points into the Daybreak ecosystem, with townhomes and smaller single-family homes at competitive price points." },
              { name: 'SoDa Row & South Station Village', body: "Daybreak's most urban addresses. SoDa Row puts residents steps from the community's commercial district. South Station Village is transit-oriented — townhomes and condos built around the TRAX station, ideal for commuters who want to live car-optional." },
              { name: 'Newer Villages: Highland Park, Creekside, SpringHouse, Heights Park', body: "Daybreak's most recently developed and currently developing villages offer the newest construction, contemporary floor plans, and — in the case of SpringHouse — a second 55-plus active adult community with its own resort-style center." },
            ].map(n => (
              <div key={n.name} style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid var(--color-accent)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: '10px' }}>{n.name}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', lineHeight: 1.7 }}>{n.body}</p>
              </div>
            ))}
          </div>
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <Link to="/service-areas/daybreak/neighborhoods" className="btn-gold" style={{ fontSize: '11px', padding: '12px 28px' }}>
              Explore All 11 Neighborhoods →
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* SCHOOLS */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Education</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            Schools & Education in Daybreak
          </h2>
          {[
            "Daybreak is served by the Jordan School District, and the community's growth has driven investment in multiple school facilities within or adjacent to the development. For families buying a home in Daybreak, the walkability of schools is one of the most consistent pleasures residents describe — elementary-age children in many Daybreak villages can walk or bike to school on the community's trail network without encountering a single car.",
            "Several Jordan School District elementary schools serve Daybreak neighborhoods, including Mountain Shadows Elementary and Bastian Elementary, both of which sit within the community footprint. Oquirrh Hills Middle School and Herriman High School are the primary secondary options for most Daybreak students, with South Jordan Middle School and Bingham High School serving some of the northern villages. The newer campus facilities that serve Daybreak students reflect the district's investment in the community's long-term student population.",
            "For Daybreak families who pursue options beyond the Jordan School District's standard feeder pattern, charter school options within South Jordan and the broader district provide meaningful choice. The walkable school environment, combined with strong Jordan School District fundamentals and the parental engagement that naturally develops in a tight-knit community like Daybreak, creates an educational ecosystem that is one of the development's most consistently praised features.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* SHOPPING & DINING */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Daily Life</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}>
            Shopping, Dining & Entertainment in Daybreak
          </h2>
          {[
            "SoDa Row is Daybreak's original commercial district — a walkable block of locally-owned and national businesses anchored by a curated mix of restaurants, coffee shops, boutiques, fitness studios, and professional services. For residents who prioritize walkability, SoDa Row is the physical manifestation of Daybreak's core promise: daily needs accessible without a car. Weekend afternoons at SoDa Row — with outdoor seating, community events, and the foot traffic of a genuinely active neighborhood — feel more like a city neighborhood than a suburban strip.",
            "Downtown Daybreak, the community's newest commercial district, has dramatically expanded Daybreak's entertainment footprint. The Smith's Ballpark at Daybreak hosts Salt Lake Bees baseball games throughout the summer, bringing professional sports to the community's doorstep and creating a shared summer ritual for Daybreak residents. The Megaplex Theatres location adjacent to the ballpark provides first-run cinema within walking distance for residents of several villages. As Downtown Daybreak continues to develop around this entertainment anchor, the retail and dining options in the district will continue to expand.",
            "For grocery shopping and broader retail, South Jordan's Jordan Landing is accessible in minutes — bringing the full depth of the south valley's retail landscape to Daybreak residents without requiring a significant drive. The combination of walkable local retail at SoDa Row, entertainment at Downtown Daybreak, and regional retail depth at Jordan Landing gives Daybreak homes for sale a commercial ecosystem that few master-planned communities anywhere in the country can match.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#bbb', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* EVENTS */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Community Life</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            Annual Events & Community Identity
          </h2>
          {[
            "Daybreak's event calendar is one of the most active of any residential community in Utah, and it is one of the features that most surprises new residents who expected a quiet suburban neighborhood. The community's Fourth of July celebration — fireworks over Oquirrh Lake, with thousands of residents gathered on the shoreline and surrounding parks — is legitimately spectacular and has become a signature experience that residents describe as the moment they understood what they had moved into. The combination of water reflection, community scale, and professional production makes it an event that Daybreak families return to every year.",
            "Food Truck Fridays at SoDa Row bring rotating vendors and community energy to the commercial district on a regular basis, creating a casual weekly social ritual that draws residents from every village. Farmers markets, holiday lighting events, Halloween festivals, and seasonal programming organized by the Daybreak Community Association keep the calendar full year-round. Salt Lake Bees home games at Downtown Daybreak have added professional sports programming that doubles as a community gathering — Daybreak families attend games the way residents of other neighborhoods attend city festivals.",
            "The social density that these events create is one of Daybreak's most distinctive and difficult-to-quantify assets. Residents know their neighbors. Children form friendships that cross village boundaries. Parents who meet at a pool or on a trail become the kind of community network that supports families through every life stage. For buyers moving to Daybreak Utah from outside Utah, the community's social fabric often registers as the most significant positive surprise of their first year — and the primary reason they tell everyone they know to come find a home here.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* ECONOMY */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Employment & Economy</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}>
            Economy & Employment for Daybreak Residents
          </h2>
          {[
            "Daybreak's resident demographics skew strongly toward knowledge workers — software engineers, product managers, finance professionals, healthcare workers, educators, and entrepreneurs who value lifestyle and community as much as proximity to employment. The Mountain View Corridor provides efficient access to the Silicon Slopes corridor — Adobe, Qualtrics, Ancestry, Pluralsight, and dozens of other major employers are within a 20 to 35 minute drive from Daybreak. For tech workers buying a home in Daybreak, the commute math is defensible without being punishing.",
            "The TRAX Red Line is Daybreak's most distinctive employment access advantage in the Wasatch Front suburban market. Three stations within the community connect residents to downtown Salt Lake City in under 40 minutes without a car, and to Salt Lake Central Station (FrontRunner connection for Ogden and Provo) without navigating I-15. For households with one vehicle, for frequent business travelers who prefer not to drive to the airport, and for remote workers who need occasional reliable access to the city, this transit access is a genuine quality-of-life differentiator that maintains long-term value.",
            "The growing remote work population has been particularly good for Daybreak real estate. Buyers who can work from anywhere increasingly choose Daybreak specifically because of the lifestyle amenities — the ability to walk to a lake, bike to a coffee shop, and live in a community with genuine social infrastructure, while maintaining full professional effectiveness from a home office. This demographic shift has reinforced Daybreak's position as a premium destination rather than a conventional suburban alternative.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: '#bbb', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* INFRASTRUCTURE */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Getting Around</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            Infrastructure & Transportation
          </h2>
          {[
            "Daybreak has the most comprehensive transit access of any residential community in the south Salt Lake Valley. Three TRAX Red Line stations — Daybreak Parkway, Oquirrh, and Bingham Junction — are distributed throughout the community, ensuring that most Daybreak residents live within a comfortable walk or short bike ride of rail transit. The Red Line connects directly to downtown Salt Lake City, the University of Utah Medical Center campus, and Salt Lake Central Station, where FrontRunner service extends north to Ogden and south to Provo.",
            "By car, Daybreak is served by the Mountain View Corridor (SR-85), which provides efficient north-south access with lower congestion than I-15 during peak hours. Bangerter Highway connects Daybreak east to I-15 at the 10400 South and 11400 South interchanges, and south toward Riverton and Herriman. The community's internal road network — wide, well-maintained, and designed for a 20,000-home buildout — moves traffic efficiently even at the current half-buildout stage.",
            "Within Daybreak itself, the trail network and Daybreak Bike Highway create a functional non-motorized transportation system that many residents use for daily trips — to schools, to SoDa Row, to the lake, and between villages. Quantum Fiber internet service is included in the Daybreak quarterly assessment and covers the entire community, providing the high-speed connectivity that remote workers and tech households require. The combination of world-class community amenities, efficient car access, functional transit, and comprehensive internet infrastructure makes Daybreak one of the best-equipped residential communities for modern life in the entire Wasatch Front.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* HOA CALLOUT */}
      <FadeSection style={{ backgroundColor: 'var(--color-accent)', padding: '56px 24px' }}>
        <div className="content-wrap" style={{ maxWidth: '760px' }}>
          <h3 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--color-primary)', marginBottom: '20px' }}>
            Daybreak HOA: What Every Buyer Must Know
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {[
              { label: 'Master Assessment (2026)', value: '$433.50/quarter — includes Quantum Fiber internet' },
              { label: 'Owner-Occupancy Requirement', value: 'Must owner-occupy 12 months before renting long-term' },
              { label: 'No Short-Term Rentals', value: 'Airbnb, VRBO, and similar platforms strictly prohibited' },
              { label: 'No-Resale Rule', value: 'Cannot resell within 12 months of purchase — $25,000 penalty' },
              { label: 'Design Review', value: 'All exterior changes require DRC approval before work begins' },
              { label: 'Closing Documents', value: 'All resale disclosures through homewisedocs.com' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: 'rgba(0,0,0,0.12)', padding: '16px' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', marginBottom: '4px' }}>{item.label}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-primary)', lineHeight: 1.5 }}>{item.value}</p>
              </div>
            ))}
          </div>
          <Link to="/daybreak-faq" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>
            Read the Full Daybreak FAQ →
          </Link>
        </div>
      </FadeSection>

      {/* LEAD CAPTURE FORM */}
      <FadeSection className="section section--primary">
        <div className="content-wrap" style={{ maxWidth: '640px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>A Resident Who Is Also Your REALTOR®</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,40px)', color: '#fff', marginBottom: '12px', lineHeight: 1.15 }}>
            Life at Daybreak Is Everything They Say It Is.<br />Let's Get You Here.
          </h2>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: '#aaa', marginBottom: '36px', lineHeight: 1.7 }}>
            I live here. I know every village, every builder, every HOA nuance, and every pocket of value. Tell me what you're looking for and I'll tell you what's possible.
          </p>

          {submitted ? (
            <div className="fade-up" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>✓</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: 'var(--color-accent)' }}>Message received — I'll be in touch shortly.</p>
            </div>
          ) : (
            <form className="fade-up" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>First Name *</label>
                  <input style={darkInput(errors.firstName)} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First" />
                  {errors.firstName && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Last Name *</label>
                  <input style={darkInput(errors.lastName)} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last" />
                  {errors.lastName && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.lastName}</p>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Email *</label>
                  <input type="email" style={darkInput(errors.email)} value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
                  {errors.email && <p style={{ color: '#c0392b', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--color-accent)' }}>Phone</label>
                  <input style={darkInput()} value={form.phone} onChange={e => set('phone', formatPhone(e.target.value))} placeholder="(801) 000-0000" />
                </div>
              </div>
              <div>
                <label className="form-label" style={{ color: 'var(--color-accent)' }}>Message</label>
                <textarea rows={4} style={{ ...darkInput(), resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Which Daybreak villages are you considering? What's your timeline?" />
              </div>
              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '12px', letterSpacing: '0.12em' }}>
                LET'S CONNECT
              </button>
            </form>
          )}
        </div>
      </FadeSection>

      {/* NEARBY AREAS */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Also Explore</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,34px)', color: '#fff', marginBottom: '28px' }}>
            Nearby Service Areas
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {NEARBY.map(area => (
              <Link key={area.slug} to={`/service-areas/${area.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid var(--color-accent)', padding: '28px', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#222'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#1a1a1a'}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#fff', marginBottom: '10px' }}>{area.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '16px' }}>{area.tagline}</p>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>Explore {area.name} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeSection>
    </main>
  )
}
