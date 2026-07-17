import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeSection from '../../components/FadeSection'
import ImagePlaceholder from '../../components/ImagePlaceholder'
import { saveLead, formatPhone, validateEmail } from '../../lib/leads'

interface FormState { firstName: string; lastName: string; email: string; phone: string; message: string }
const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', message: '' }

const NEARBY = [
  { name: 'South Jordan', slug: 'south-jordan', tagline: "Established suburban living with top schools and Daybreak within city limits." },
  { name: 'Daybreak', slug: 'daybreak', tagline: "Utah's premier master-planned community — built around a 65-acre private lake." },
  { name: 'Riverton', slug: 'riverton', tagline: "Established neighborhoods, mature trees, and a mix of price points." },
]

export default function Herriman() {
  useEffect(() => { document.title = 'Herriman Utah Real Estate | Buy a Home in Herriman UT | Tommy Wolf REALTOR®' }, [])

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
    saveLead({ ...form, leadSource: 'Herriman Service Area Page' })
    // TODO: Pass leadSource to Follow Up Boss when FUB is connected
    // Fire-and-forget send to Netlify function; localStorage already succeeded, so do not block the UI or surface errors
    try {
      fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Herriman Service Area Page',
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
          <ImagePlaceholder src="/areas/herriman.png" alt="Herriman, Utah" fallbackLabel="Herriman, Utah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.50)', zIndex: 1 }} />
        <div className="content-wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Herriman, Utah</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,5vw,64px)', fontWeight: 400, color: '#fff', marginBottom: '18px', lineHeight: 1.1 }}>
            Herriman Real Estate
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '20px', color: '#ccc', maxWidth: '560px', margin: '0 auto' }}>
            Mountain Views, Master-Planned Communities & Room for Your Family
          </p>
        </div>
      </FadeSection>
      <div className="gold-rule-full" />

      {/* CITY OVERVIEW */}
      <FadeSection className="section section--dark">
        <div className="content-wrap" style={{ maxWidth: '860px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '14px' }}>Overview</p>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', color: '#fff', marginBottom: '28px' }}>
            Why Buyers Are Choosing Herriman
          </h2>
          {[
            "Herriman has earned a place on national lists of the fastest-growing cities in the United States — and anyone who has visited knows exactly why. Situated at the base of the Oquirrh Mountains at roughly 5,000 feet elevation, Herriman offers what few communities in the Wasatch Front can match: sweeping, unobstructed views of the Salt Lake Valley and the Wasatch Range from the comfort of a front porch or back deck. For buyers exploring Herriman homes for sale, the views alone are often enough to close the conversation. Everything else is a bonus.",
            "Herriman real estate has evolved rapidly from its agricultural roots into one of Utah's most in-demand suburban destinations. Where previous generations saw farmland and horse properties, today's buyers find well-planned subdivisions with modern floor plans, parks within walking distance, and schools that consistently attract families relocating within the valley. The city has grown from a small township into a community of 70,000-plus residents in less than two decades — yet it has done so with enough intentional planning that the character feels cohesive rather than chaotic. Moving to Herriman Utah means joining a community that is still writing its story.",
            "For buyers who have been priced out of closer-in neighborhoods or who simply want more home for their budget, Herriman consistently delivers. Lot sizes tend to be more generous than in the more established suburbs to the north, new construction is plentiful, and the price-per-square-foot equation often favors Herriman relative to comparable South Jordan or Draper properties. A REALTOR in Herriman with genuine local knowledge can help buyers identify which neighborhoods offer the best long-term value as the city continues its extraordinary growth trajectory.",
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
            The Benefits of Living in Herriman
          </h2>
          {[
            "The single most consistent thing residents say about living in Herriman is that it feels like a community — not just a collection of subdivisions. Herriman City has invested heavily in civic infrastructure, and the results are visible. The Herriman City Center brings municipal services, a state-of-the-art library, and public green space into a single walkable campus that gives residents a genuine sense of place. The Herriman Arts and Events Center adds a professional performing arts venue that hosts concerts, theatrical productions, comedy shows, and community events throughout the year — an amenity that would be remarkable in any suburban city.",
            "Outdoor recreation is central to the Herriman lifestyle. Butterfield Canyon, accessible directly from city streets, offers year-round hiking, mountain biking, and OHV access into the Oquirrh Mountains — essentially a wilderness trailhead at the city's back door. Herriman City Park, Butterfield Park, and dozens of smaller neighborhood parks ensure that families buying a home in Herriman Utah have green space within a short walk. The Herriman soccer complex is among the largest youth soccer facilities in Utah, drawing regional tournaments and making Herriman a natural home for athletic families.",
            "Youth sports culture in Herriman is genuinely special. The city has cultivated a reputation as one of the best places in Utah to raise athletic children — comprehensive recreational leagues, high-quality facilities, and a parent community that invests in youth development at every level. For families who see sports as a core part of their lifestyle, the combination of facilities, culture, and school athletics programs makes Herriman a compelling destination that other cities in the valley simply don't match.",
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
            Herriman Neighborhoods & Community Character
          </h2>
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { name: 'Herriman City Center Area', body: "The neighborhoods surrounding the Herriman City Center are the civic heart of the community — newer construction with clean streetscapes, access to the library, arts center, and city park, and proximity to the Mountain View Corridor. An excellent choice for families who want to walk to community events and civic amenities." },
              { name: 'North Herriman', body: "The portion of Herriman closest to South Jordan offers the most established character in the city — slightly older homes on generous lots, mature street trees, and quick access to both the Mountain View Corridor and Bangerter Highway. Families who want Herriman's price point with a more settled neighborhood feel often focus their search here." },
              { name: 'Foothills & View Corridors', body: "Herriman's upper elevations — the subdivisions clinging to the Oquirrh Mountain foothills — command the most dramatic views in the south valley. Homes here often sit 400-600 feet above the valley floor with unobstructed views of the Wasatch Range. Premium lot premiums are significant, but buyers typically consider them worth every dollar." },
              { name: 'Newer Master-Planned Developments', body: "Herriman's rapid growth has produced a pipeline of newer master-planned communities offering the latest construction standards, energy efficiency, and community design thinking. Many of these developments include their own parks, walking trails, and community gathering spaces that create neighborhood identity from day one." },
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
            Schools & Education in Herriman
          </h2>
          {[
            "Herriman is served by the Jordan School District, and the city's rapid growth has driven consistent investment in new and expanded school facilities. For families moving to Herriman Utah, the school landscape is one of the most compelling selling points — relatively new campuses, growing programs, and a parent community deeply invested in academic outcomes.",
            "At the elementary level, families in Herriman are served by Herriman Elementary, Blackridge Elementary, Silver Crest Elementary, and a growing number of additional campuses that have been built to keep pace with the city's population growth. Fort Herriman Middle School serves the community's middle school students, and Herriman High School — one of the newer comprehensive high school campuses in the Jordan School District — serves students through grade 12 with a full complement of AP courses, competitive athletics, and performing arts programs.",
            "Herriman High's campus, opened in 2009, was purpose-built for a community that expects modern facilities and comprehensive programs. The school's athletic program has established a strong competitive record across multiple sports, and the fine arts and CTE programs have expanded steadily alongside the city's growth. For families buying a home in Herriman with school-age children, the combination of newer campuses, engaged parent communities, and Jordan School District resources creates an educational environment that competes comfortably with any comparable suburb in the valley.",
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
            Shopping & Dining in Herriman
          </h2>
          {[
            "Herriman's commercial landscape has matured considerably alongside its residential growth. The Herriman Towne Center anchors the city's retail identity — a growing commercial hub along the Mountain View Corridor offering grocery, pharmacy, casual dining, service businesses, and the kind of everyday retail that makes suburban life functional. As the city's population has grown, so has its commercial infrastructure, and residents today have access to meaningfully more dining and shopping options within city limits than they did even five years ago.",
            "For residents who want a broader retail selection, South Jordan's Jordan Landing center — one of the largest open-air retail centers in the south valley — is a short drive north on the Mountain View Corridor. The Herriman-to-Jordan Landing corridor effectively gives Herriman residents the commercial depth of their larger neighbor without the density trade-offs. As Herriman's tax base grows with its population, additional commercial development is planned for several corridors throughout the city.",
            "Dining in Herriman reflects the city's family-oriented demographic — restaurants skew toward family-friendly formats, with national chains providing consistency and a growing number of locally-owned options adding variety. The Herriman food scene is not yet the draw that comparable South Jordan or Draper options might be, but the trajectory is clearly upward. For buyers choosing between Herriman real estate and neighboring cities, the dining trade-off is real but decreasing year over year.",
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
            "Herriman Days is the city's signature annual celebration — a multi-day community festival that draws residents from every neighborhood for live music, a parade, food vendors, carnival attractions, and fireworks. The event has grown steadily with the city's population and now functions as the primary civic gathering that reinforces Herriman's community identity. For families moving to Herriman Utah, attending Herriman Days in the first year is practically a rite of passage.",
            "The Herriman Arts and Events Center hosts a diverse calendar of professional and community events throughout the year — concerts, theatrical productions, educational programs, comedy shows, and community meetings that bring residents together in a setting that far exceeds what most suburban Utah cities offer. The center's presence signals Herriman's commitment to cultural infrastructure alongside parks and schools, and it gives residents access to live arts programming without driving to downtown Salt Lake City.",
            "Youth sports tournaments hosted at the Herriman soccer complex bring visitors from throughout the Wasatch Front on a year-round basis, and the associated economic activity has helped accelerate the commercial development that residents benefit from. July 4th celebrations, seasonal community events, and neighborhood-level programming in the various master-planned developments add layers of social opportunity that make Herriman feel genuinely neighborly despite its rapid growth.",
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
            Economy & Employment Near Herriman
          </h2>
          {[
            "Herriman's economic position benefits from its location at the convergence of two major employment corridors. The Mountain View Corridor provides direct access north to the Silicon Slopes technology hub in Lehi and Draper, where companies like Adobe, Qualtrics, Domo, and dozens of high-growth tech employers are based. The I-15 corridor similarly connects Herriman residents to the full Wasatch Front employment market within a reasonable commute. For professionals buying a home in Herriman Utah, the commute math works — particularly for those in tech, healthcare, finance, and manufacturing.",
            "Camp Williams, the Utah National Guard base located on Herriman's eastern boundary, is a significant local employer and represents a stabilizing economic presence in the community. The base employs hundreds of full-time military and civilian personnel and supports a substantial contracting workforce. For military families, the combination of Camp Williams proximity and Herriman's family-friendly community character makes the city a natural fit.",
            "As Herriman's commercial base grows, local employment options are expanding — retail, healthcare, education, and service-sector jobs are increasingly available within city limits. The Herriman City Center itself houses government employment and civic services, and the commercial corridors along Mountain View Corridor are attracting the kind of professional services businesses that create stable, local employment. Herriman real estate buyers who prioritize minimizing commute will find the local employment landscape improving significantly year over year.",
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
            "Herriman's primary transportation artery is the Mountain View Corridor (SR-85), which runs along the western edge of the city and provides efficient north-south access to South Jordan, Riverton, and Bluffdale to the south, and Draper, Sandy, and the Silicon Slopes corridor to the north. For residents commuting to major employment centers, the Mountain View Corridor is the most direct and consistently efficient route — far less congested than I-15 during peak hours.",
            "Bangerter Highway is accessible from Herriman via 13400 South and provides an east-west arterial connecting Herriman to Riverton, South Jordan, and the I-15 corridor. Camp Williams Road gives southeastern Herriman residents additional access routing. While Herriman does not yet have TRAX light rail service within city limits, the South Jordan TRAX stations (via Daybreak) are accessible by car in under 15 minutes, providing a park-and-ride option for residents who prefer not to drive into downtown Salt Lake City.",
            "Herriman's internal road infrastructure has been largely built with the city's projected buildout in mind — major arterials are wide, new developments include required road improvements as conditions of approval, and the city has been deliberate about not letting population growth outpace infrastructure capacity. For buyers choosing between Herriman real estate and competing cities, the relatively uncongested internal roads and reliable Mountain View Corridor access are consistent quality-of-life advantages.",
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
            Herriman Is Growing Fast.<br />Let's Make Sure You Don't Miss Your Window.
          </h2>
          <p className="fade-up" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: '#aaa', marginBottom: '36px', lineHeight: 1.7 }}>
            The best Herriman homes at the best prices don't last long. I know the neighborhoods, the builders, and the value corridors. Let's talk.
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
                <textarea rows={4} style={{ ...darkInput(), resize: 'vertical' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell me what you're looking for in Herriman..." />
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
