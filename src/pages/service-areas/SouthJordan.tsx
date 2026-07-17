import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../../components/FadeSection'
import ImagePlaceholder from '../../components/ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../../lib/leads'

interface FormState { firstName: string; lastName: string; email: string; phone: string; message: string }
const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', message: '' }

const NEARBY = [
  { name: 'Daybreak', slug: 'daybreak', tagline: "Utah's premier master-planned community — built around a 65-acre lake." },
  { name: 'Herriman', slug: 'herriman', tagline: "Mountain-view new construction and explosive growth at the valley's edge." },
  { name: 'Riverton', slug: 'riverton', tagline: "Established neighborhoods, mature trees, and enduring community character." },
]

export default function SouthJordan() {
  useEffect(() => { document.title = 'South Jordan Utah Real Estate | Tommy Wolf REALTOR®' }, [])

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
    saveLead({ ...form, leadSource: 'South Jordan Service Area Page' })
    // TODO: Pass leadSource to Follow Up Boss when FUB is connected
    // Fire-and-forget send to Netlify function; localStorage already succeeded, so do not block the UI or surface errors
    try {
      fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'South Jordan Service Area Page',
          type: 'Buyer',
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      }).catch(err => console.error('send-lead failed', err))
    } catch (err) {
      console.error('send-lead failed', err)
    }
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
      <FadeSection style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ImagePlaceholder src="/areas/south-jordan.png" alt="South Jordan, Utah" fallbackLabel="South Jordan, Utah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.50)', zIndex: 1 }} />
        <div className="content-wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>South Jordan, Utah</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,5vw,64px)', fontWeight: 400, color: '#fff', marginBottom: '18px', lineHeight: 1.1 }}>
            South Jordan Real Estate
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '20px', color: '#ccc', maxWidth: '560px', margin: '0 auto' }}>
            Thriving Families, Top-Ranked Schools & Utah's Best Location
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* CITY OVERVIEW */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Overview</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}>
            Why Buyers Choose South Jordan
          </h2>
          {[
            "South Jordan is one of Salt Lake County's most coveted addresses — and for buyers exploring South Jordan homes for sale, the reasons are immediately apparent. With a population approaching 90,000 and consistent recognition as one of Utah's most livable cities, South Jordan offers a rare combination of suburban stability, outstanding public infrastructure, and genuine community identity. The city stretches from the western foothills of the Oquirrh Mountains to the valley floor, giving residents dramatic views without the elevation trade-offs that come with foothill living further south.",
            "What distinguishes South Jordan real estate from comparable suburbs is breadth. A buyer moving to South Jordan Utah can choose from established single-family neighborhoods near the historic 1300 West corridor, newer master-planned developments along the Mountain View Corridor, sleek townhomes and condominiums near the South Jordan City Center, or — the crown jewel — Daybreak, the nationally recognized master-planned community that sits entirely within South Jordan's city limits. This diversity of housing stock means South Jordan real estate serves first-time buyers, growing families, and luxury buyers equally well.",
            "South Jordan's position in the greater Salt Lake Valley is a strategic advantage that a skilled REALTOR in South Jordan will emphasize to every client. Interstate 15, Bangerter Highway, and the Mountain View Corridor all pass through or border the city, giving residents efficient access to the Silicon Slopes tech corridor to the north, the growing employment centers in Draper and Lehi, and downtown Salt Lake City. Few cities in the Wasatch Front offer this combination of space, price point, and commute efficiency — which is why demand for South Jordan homes has remained strong through every market cycle.",
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
            The Benefits of Living in South Jordan
          </h2>
          {[
            "Few cities in Utah invest as consistently in quality-of-life infrastructure as South Jordan. The South Jordan Recreation Center is a comprehensive facility offering indoor aquatics, fitness, gymnastics, and year-round programming for all ages — a resource families moving to South Jordan Utah immediately recognize as exceptional. Bingham Creek Regional Park, one of the largest park facilities in the south valley, provides athletic fields, walking trails, splash pads, and picnic areas that define weekends for South Jordan residents.",
            "The South Jordan City Center — a mixed-use civic and commercial hub along South Jordan Parkway — anchors the city's identity as a planned, forward-thinking municipality. With City Hall, the Heritage Arts Center, a public library, and surrounding retail all within walking distance of each other, South Jordan has accomplished what many Utah suburbs have only aspired to: a genuine town center. For families buying a home in South Jordan, the Heritage Arts Center alone — which hosts professional productions, art exhibitions, and community performances throughout the year — represents a cultural amenity that most suburban communities don't have.",
            "Proximity to the Loveland Living Planet Aquarium, multiple regional grocery anchors, and an extensive trail network that connects into both the Jordan River Parkway and Daybreak's 50-mile trail system makes South Jordan one of the most complete lifestyle packages in Salt Lake County. Residents rarely feel the need to leave the city for daily life — and when they do, they can reach downtown Salt Lake City or the Outlets at Traverse Mountain in under 30 minutes.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* NEIGHBORHOODS */}
      <FadeSection className="section section--dark">
        <div className="content-wrap">
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Where to Live</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '32px' }}>
            South Jordan Neighborhoods & Community Character
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { name: 'Daybreak', body: "South Jordan's most famous address — a 4,100-acre master-planned community built around 65-acre Oquirrh Lake. With 11 distinct villages, 50+ miles of trails, resort-style amenities, and its own commercial district, Daybreak is a city within a city. New construction and resale options available across every price point." },
              { name: 'South Jordan City Center Area', body: "The neighborhoods surrounding South Jordan Parkway and the City Center offer the most walkable lifestyle in the city. Townhomes, condos, and small-lot single-family homes attract professionals and empty-nesters who want civic amenities at their doorstep without the HOA demands of Daybreak." },
              { name: 'Established West-Side Neighborhoods', body: "Along the 1300 West corridor and the neighborhoods south of 10400 South, South Jordan's original residential fabric offers larger lots, mature trees, and established street character that newer developments simply can't replicate. These areas attract buyers who value permanence and outdoor space over resort amenities." },
              { name: 'Mountain View Corridor Developments', body: "Newer subdivisions along the Mountain View Corridor offer modern floor plans, energy-efficient construction, and competitive pricing with quick freeway access. Many of these developments are within the boundaries of high-performing elementary schools and offer the newest construction available in the city outside of Daybreak." },
            ].map(n => (
              <div key={n.name} style={{ backgroundColor: '#1a1a1a', borderTop: '2px solid var(--color-accent)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: '10px' }}>{n.name}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#aaa', lineHeight: 1.7 }}>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* SCHOOLS */}
      <FadeSection className="section section--light">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Education</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: 'var(--color-text)', marginBottom: '28px' }}>
            Schools & Education in South Jordan
          </h2>
          {[
            "South Jordan is served by the Jordan School District, one of the largest and most respected school districts in Utah. For families buying a home in South Jordan, the school landscape is a genuine strength — elementary, middle, and high school options throughout the city consistently attract families from surrounding communities who prioritize educational environment above all other factors.",
            "At the high school level, South Jordan students are served by Bingham High School, one of Utah's largest and most well-resourced campuses, as well as Corner Canyon High School in Draper for families in the southeastern portions of the city. Riverton High School also serves families in the southern portions of South Jordan. All three campuses offer comprehensive AP programs, competitive athletics, fine arts, and CTE pathways.",
            "For families considering South Jordan real estate specifically because of schools, the Daybreak community has the added advantage of multiple elementary schools within walking distance of most neighborhoods — a rare feature in suburban Utah. The district's investment in newer facilities throughout South Jordan means that most students attend relatively modern campuses regardless of which neighborhood they live in. River Ridge Academy and other charter school options provide additional choice for families with specific educational philosophies.",
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
            Shopping & Dining in South Jordan
          </h2>
          {[
            "Jordan Landing, anchored along Bangerter Highway, is the retail heart of the south Salt Lake Valley — a large open-air lifestyle center with national retailers, multiple grocery options, restaurants ranging from fast-casual to sit-down, a Megaplex Theatres complex, and service businesses that make daily life genuinely convenient. For residents buying a home in South Jordan, Jordan Landing largely eliminates any perceived trade-off between suburban living and retail access.",
            "The dining scene in South Jordan spans the full range — from family-owned restaurants reflecting the city's diverse population to national chains that keep wait times reasonable. SoDa Row, the commercial corridor within Daybreak, adds a walkable dining-and-retail experience that has become a destination for all of South Jordan, not just Daybreak residents. As Downtown Daybreak continues to develop around the Salt Lake Bees ballpark and Megaplex Cinema, the city's restaurant and entertainment options continue to expand.",
            "For grocery shopping, South Jordan residents have access to multiple Smith's locations, Costco, Walmart, Harmons, Whole Foods in adjacent Draper, and the growing specialty market presence that comes with a wealthy, health-conscious demographic. The combination of national retail depth and locally-owned dining options gives South Jordan a shopping and dining landscape that comfortably serves a full range of tastes and budgets.",
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
            "South Jordan's civic identity is built around family participation, and the city's annual event calendar reflects that. The South Jordan Arts Festival, held annually at Bingham Creek Regional Park, draws thousands of residents and showcases the work of regional artists alongside live music and food vendors. The Heritage Arts Center presents a full season of professional theater, musical performances, and exhibitions that rival programming in much larger cities.",
            "The city's July 4th celebration is among the most attended community events in the south valley, drawing families from surrounding municipalities for fireworks, live entertainment, and the kind of civic pride that makes a city feel like a neighborhood. South Jordan Riverwalk events, farmers markets, and seasonal community gatherings throughout the year reinforce the social fabric that residents consistently cite when explaining why they chose to buy a home in South Jordan over comparable cities.",
            "Within Daybreak, the community calendar adds another layer of events — Fourth of July fireworks over Oquirrh Lake, food truck Fridays at SoDa Row, Halloween celebrations, holiday lighting events, and regular programming at The Residents Club. For families moving to South Jordan Utah, the combined event calendar of the city and its most active community creates a year-round social environment that is difficult to replicate elsewhere in the valley.",
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
            Economy & Employment Near South Jordan
          </h2>
          {[
            "South Jordan sits at the southern edge of Utah's Silicon Slopes — the technology and innovation corridor stretching from Lehi through Draper that has positioned Utah as one of the fastest-growing tech economies in the United States. Residents buying a home in South Jordan increasingly include software engineers, product managers, finance professionals, and startup founders who work at companies like Adobe, Qualtrics, Pluralsight, Ancestry, and dozens of other major employers within a 20-minute drive.",
            "Healthcare is another major employment driver within South Jordan's own city limits. The University of Utah Health South Jordan Health Center is a full-service medical campus offering primary care, specialty services, and surgical capabilities — and it employs hundreds of South Jordan residents directly while serving the medical needs of the entire south valley. The facility's continued expansion signals long-term institutional commitment to South Jordan as a healthcare hub.",
            "For residents whose work takes them downtown or to the University of Utah main campus, South Jordan offers a reasonable commute via I-15 or — from the Daybreak neighborhoods — direct TRAX access to the Red Line, which connects to downtown Salt Lake City, the University of Utah, and Salt Lake Central Station without a car. The combination of Silicon Slopes proximity and functional transit access is rare among suburban Utah communities and is a genuine long-term value driver for South Jordan real estate.",
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
            "South Jordan is one of the best-connected suburbs in the Wasatch Front. Interstate 15 runs along the city's eastern boundary with multiple on/off ramps at 10400 South, 11400 South, and 12600 South — giving residents direct highway access without the congestion that plagues I-15 entry points further north. The Mountain View Corridor (SR-85) provides efficient north-south travel along the western side of the valley, while Bangerter Highway serves as a high-capacity arterial connecting South Jordan to neighboring cities.",
            "For residents who prefer not to drive, Daybreak is the only community in the south valley with direct TRAX light rail access. Three Red Line stations within Daybreak connect residents to downtown Salt Lake City, the University of Utah, and Salt Lake Central (FrontRunner connection) in under 40 minutes. This level of transit access is practically unheard of in suburban Utah and makes Daybreak homes particularly attractive to households with one vehicle or remote workers who travel frequently.",
            "South Jordan's internal road network has been developed with growth in mind — arterial roads are wide, intersections are planned, and the city has consistently invested in bicycle infrastructure and pedestrian connections. The Jordan River Parkway Trail passes through South Jordan, providing a non-motorized corridor connecting the city to recreational areas and neighborhoods throughout the county. For a family moving to South Jordan Utah, the getting-around picture is genuinely excellent.",
          ].map((p, i) => (
            <p key={i} className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.9, marginBottom: i < 2 ? '20px' : 0 }}>{p}</p>
          ))}
        </div>
      </FadeSection>

      {/* LEAD CAPTURE FORM */}
      <FadeSection className="section section--primary">
        <div className="content-wrap" style={{ maxWidth: '640px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '12px' }}>Work With a Local Expert</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,40px)', color: '#fff', marginBottom: '12px', lineHeight: 1.15 }}>
            Ready to Plant Roots in South Jordan?<br />Let's Find Your Home.
          </h2>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: '#aaa', marginBottom: '36px', lineHeight: 1.7 }}>
            I'm a South Jordan–based REALTOR® who knows every neighborhood in this city firsthand. Tell me what you're looking for and I'll tell you what's possible.
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
                <textarea rows={4} style={{ ...darkInput(), resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell me about what you're looking for in South Jordan..." />
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
