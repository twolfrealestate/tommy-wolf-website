import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../../components/FadeSection'
import ImagePlaceholder from '../../components/ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../../lib/leads'

interface FormState { firstName: string; lastName: string; email: string; phone: string; message: string }
const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', message: '' }

const NEARBY = [
  { name: 'South Jordan', slug: 'south-jordan', tagline: "Established suburban living with top schools, City Center, and Daybreak within city limits." },
  { name: 'Daybreak', slug: 'daybreak', tagline: "Utah's premier master-planned community — built around Oquirrh Lake and 50 miles of trails." },
  { name: 'Herriman', slug: 'herriman', tagline: "Mountain views, rapid growth, and new construction at the Oquirrh foothills." },
]

export default function Riverton() {
  useEffect(() => { document.title = 'Riverton Utah Real Estate | Homes for Sale in Riverton UT | Tommy Wolf REALTOR®' }, [])

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
    saveLead({ ...form, leadSource: 'Riverton Service Area Page' })
    // TODO: Pass leadSource to Follow Up Boss when FUB is connected
    // Fire-and-forget send to Netlify function; localStorage already succeeded, so do not block the UI or surface errors
    try {
      fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Riverton Service Area Page',
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
          <ImagePlaceholder src="/areas/riverton.png" alt="Riverton, Utah" fallbackLabel="Riverton, Utah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.50)', zIndex: 1 }} />
        <div className="content-wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Riverton, Utah</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,5vw,64px)', fontWeight: 400, color: '#fff', marginBottom: '18px', lineHeight: 1.1 }}>
            Riverton Real Estate
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '20px', color: '#ccc', maxWidth: '560px', margin: '0 auto' }}>
            Space, Value & Established Community in the Heart of the South Valley
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* CITY OVERVIEW */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Overview</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}>
            Why Buyers Choose Riverton
          </h2>
          {[
            "Riverton occupies a distinct and enduring position in the south Salt Lake Valley real estate landscape. While neighboring cities chase growth and newness, Riverton has cultivated something rarer: genuine community character that compounds over decades. Buyers exploring Riverton homes for sale often arrive having priced out of Draper or Sandy, and they leave with something they didn't expect to find — a city with its own identity, a wider range of price points than its neighbors, and lot sizes that remind them why they wanted to leave a dense urban neighborhood in the first place.",
            "Riverton real estate encompasses a surprisingly broad spectrum. Along the western corridors near Bangerter Highway, established single-family subdivisions with mature landscaping offer the settled permanence of neighborhoods that have been fully built out for years. Further east, nearer Camp Williams and the Oquirrh foothills, the city transitions into larger-lot properties, some with acreage, that give Riverton a semi-rural character rarely found in a city this well-connected to the Wasatch Front. The 12600 South commercial corridor anchors the city's central spine and has become an increasingly competitive retail and services destination.",
            "For the buyer who has done serious homework on the south valley, Riverton consistently offers something the headline cities can't: better price-per-square-foot than Draper, more mature streetscapes than Herriman, larger lots than most of South Jordan, and a location that splits the difference between I-15 and Bangerter Highway. A REALTOR in Riverton who knows where the best value lives within the city — and there are genuinely significant differences block by block — can be the difference between a good purchase and an exceptional one.",
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
            The Benefits of Living in Riverton
          </h2>
          {[
            "Riverton's most underappreciated asset is space — physical space, breathing room, and the quiet confidence that comes with a community that isn't in the middle of a dramatic reinvention. Riverton City Park serves as the community's central gathering place with athletic fields, playgrounds, a splash pad, and picnic areas that see consistent use through every season. Jacob's Meadow, a signature community green space, provides a naturalistic park experience that families moving to Riverton Utah often cite as one of their first pleasures as new residents.",
            "South Mountain Golf Course brings a genuine recreational amenity that has become central to Riverton's community identity — an 18-hole municipal course with Wasatch Range views that draws residents and visitors alike. The course is well-maintained, well-priced for a public facility, and represents the kind of community investment that makes Riverton feel like a place that takes quality of life seriously. Camp Williams adjacent to the city's eastern edge provides extensive open land that serves as an informal natural buffer, preserving the semi-rural character of Riverton's eastern neighborhoods in a way that zoning regulations alone never could.",
            "For families buying a home in Riverton, the combination of genuine outdoor recreation, established park infrastructure, and a community that has had decades to develop social institutions — established faith communities, long-running youth sports leagues, neighborhood associations with real continuity — creates a quality of life that is difficult to manufacture in newer cities. Riverton doesn't need a developer to tell it who it is. It already knows.",
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
            Riverton Neighborhoods & Community Character
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { name: '12600 South Corridor', body: "Riverton's central commercial and residential spine. Neighborhoods along and near 12600 South offer excellent freeway and highway access, proximity to retail and services, and housing stock that ranges from more affordable starter homes to established move-up properties on generous lots. The best commute access in the city." },
              { name: 'Riverton City Center Area', body: "Surrounding Riverton City Park and the municipal center, these neighborhoods carry Riverton's original community identity. Homes here tend to sit on larger lots with mature trees, and the block-by-block character is more varied and individual than newer planned developments. A strong choice for buyers who want established neighborhood fabric." },
              { name: 'South Mountain / Oquirrh Foothills', body: "Riverton's eastern neighborhoods, adjacent to Camp Williams and the South Mountain Golf Course, offer a semi-rural experience that is unusual this close to the valley floor. Larger lots, elevated positioning, Wasatch Range views, and a quieter pace of life attract buyers who want space and are willing to trade some convenience for it." },
              { name: 'Bangerter Corridor Subdivisions', body: "Newer and mid-vintage subdivisions along the Bangerter Highway corridor offer competitive pricing with fast highway access. These neighborhoods attract move-up buyers and families priced out of Draper who want modern floor plans without sacrificing lot size or school quality." },
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
            Schools & Education in Riverton
          </h2>
          {[
            "Riverton is served by the Jordan School District, and the city's schools reflect a community that has had time to develop genuine institutional identity. For families buying a home in Riverton, the school landscape is one of the most stable and well-regarded in the south valley — established campuses with experienced faculty, strong athletics programs, and the kind of community involvement that comes from decades of parent engagement.",
            "Riverton High School is the city's flagship secondary campus — an established school with a long competitive tradition in athletics, a respected academic program including AP coursework, and a performing arts program that has produced consistent results. South Jordan Middle School serves Riverton's middle school students, and multiple Jordan School District elementary schools are distributed throughout Riverton's neighborhoods to keep elementary commutes short for most families.",
            "For families with specific educational priorities, the Jordan School District's charter school options and the proximity of private school campuses in adjacent communities give Riverton residents real choice. The city's established character means that school feeder patterns are stable — parents buying a home in Riverton today can have reasonable confidence about which schools their children will attend for the duration of their childhood, a degree of predictability that newer, rapidly growing cities simply cannot always offer.",
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
            Shopping & Dining in Riverton
          </h2>
          {[
            "The 12600 South corridor has become Riverton's commercial heart — a growing strip of retail, grocery, dining, and service businesses that handles the majority of residents' daily shopping needs without requiring a trip to neighboring cities. Walmart, Smith's, and supporting retail provide grocery and everyday shopping, while a growing number of locally-owned restaurants and national dining chains have established a dining scene that is meaningfully more diverse than it was even a few years ago.",
            "For residents who want the full retail depth of Jordan Landing or the specialty options in Draper, both are accessible in under 15 minutes via Bangerter Highway or I-15. Riverton's location between these two retail corridors is a practical advantage — residents aren't limited to a single commercial center and can choose the direction that suits the errand. The combination of adequate local retail and close proximity to larger centers means that moving to Riverton Utah carries minimal daily convenience trade-offs.",
            "South Mountain Golf Course adds a dining anchor that many Riverton residents don't fully appreciate until they've lived here: a clubhouse restaurant that functions as an informal community gathering place, particularly on weekends. The course and its amenities represent the kind of civic asset that quietly improves daily quality of life in ways that don't show up in real estate listings but absolutely influence long-term satisfaction with a purchase decision.",
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
            "Riverton City Days is the city's signature annual celebration — an established community festival that brings residents together for live entertainment, a parade, food vendors, and a general affirmation of the civic identity that gives Riverton its distinctive character. Unlike the neighborhood-level events that define newer master-planned communities, Riverton City Days is a genuinely city-wide event that draws residents from every corner of the community and reinforces the sense of shared place that longtime residents prize.",
            "Jacob's Meadow and Riverton City Park host seasonal events throughout the year — summer concerts, July 4th celebrations, holiday programming, and community gatherings that add texture to Riverton's social calendar. South Mountain Golf Course hosts tournaments and member events that function as informal community gatherings for the city's substantial golfing population. For families moving to Riverton Utah, the event calendar is not flashy, but it is genuine — the kind of community programming that reflects a city that knows its own identity.",
            "Youth sports leagues in Riverton operate with the efficiency and culture that only comes from decades of continuous operation — established facilities, experienced volunteer leadership, and community infrastructure built to support athletic families at every level. For parents who prioritize youth sports participation, Riverton's established leagues across soccer, baseball, softball, football, and basketball offer a level of organization and community investment that is one of the city's most distinctive quality-of-life advantages.",
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
            Economy & Employment Near Riverton
          </h2>
          {[
            "Riverton's economic story is one of effective proximity. The city sits close enough to the Silicon Slopes corridor that tech professionals can commute comfortably via I-15 or Bangerter Highway, yet far enough from the employment epicenter that home prices and lot sizes reflect the more accessible end of the south valley market. For buyers who work in Draper, Lehi, or Salt Lake City and want their housing dollar to stretch further without accepting a dramatically longer commute, Riverton is a consistently compelling answer.",
            "Camp Williams, the Utah National Guard's primary training facility in the Salt Lake Valley, forms Riverton's eastern boundary and represents a stable local employment anchor. The base employs military personnel, civilian employees, and contract workers, many of whom choose to buy a home in Riverton for the obvious geographic convenience. The base's presence also effectively freezes development on Riverton's eastern flank, preserving the semi-rural character of those neighborhoods indefinitely.",
            "The commercial corridor along 12600 South and the broader Bangerter Highway corridor are generating increasing local employment in retail, healthcare, professional services, and construction — the latter a natural consequence of continued residential development throughout the south valley. Riverton's local employment base remains smaller than South Jordan's, but the trajectory is positive and the commute picture for Riverton real estate buyers is genuinely solid regardless of where in the Wasatch Front their employer is located.",
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
            "Riverton's location between two major transportation corridors is one of its most practical assets. Interstate 15 runs along the city's northeastern edge with a full interchange at 12600 South, providing direct access to the entire Wasatch Front. Bangerter Highway runs through the center of the city as a major east-west arterial, connecting Riverton efficiently to South Jordan, Herriman, and West Jordan to the north. The combination gives Riverton residents more routing options than most suburban cities and reduces the likelihood of any single traffic incident significantly disrupting a commute.",
            "The Mountain View Corridor provides an additional north-south option for residents in western Riverton, offering a parallel route to I-15 that is particularly useful for commutes to South Jordan, Herriman, and Bluffdale. For residents who prefer transit, the TRAX system is accessible via a short drive to the Daybreak stations in South Jordan — a park-and-ride option that many Riverton commuters use to reach downtown Salt Lake City without navigating I-15 traffic.",
            "Riverton's internal street network reflects the city's organic development over decades — arterials are well-established, residential streets are mature and calmed, and the overall road condition benefits from a tax base that has not been stretched thin by rapid growth. Camp Williams Road provides an additional east-west option in southern Riverton. For families moving to Riverton Utah, the getting-around picture is quietly excellent — not as dramatic as Daybreak's TRAX access or as new as Herriman's Mountain View Corridor on-ramp, but reliable, well-maintained, and multi-directional in a way that most suburban cities can't claim.",
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
            Riverton Has the Space, the Schools,<br />and the Value. Let's Talk.
          </h2>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: '#aaa', marginBottom: '36px', lineHeight: 1.7 }}>
            I know where the best value in Riverton lives and which neighborhoods are worth the premium. Let's find the right fit for your family.
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
                <textarea rows={4} style={{ ...darkInput(), resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell me what you're looking for in Riverton..." />
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
