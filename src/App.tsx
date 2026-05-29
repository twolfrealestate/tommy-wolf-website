import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Core pages
import Home from './pages/Home'
import Services from './pages/Services'
import Buyers from './pages/Buyers'
import Sellers from './pages/Sellers'
import DaybreakNewsletter from './pages/DaybreakNewsletter'
import DaybreakNewsletterPost from './pages/DaybreakNewsletterPost'
import DaybreakMarketPulse from './pages/DaybreakMarketPulse'
import About from './pages/About'
import DaybreakFaq from './pages/DaybreakFaq'
import Contact from './pages/Contact'

// Service areas
import SouthJordan from './pages/service-areas/SouthJordan'
import DaybreakArea from './pages/service-areas/Daybreak'
import Herriman from './pages/service-areas/Herriman'
import Riverton from './pages/service-areas/Riverton'

// Daybreak neighborhoods
import NeighborhoodsIndex from './pages/service-areas/neighborhoods/index'
import FoundersParkVillage from './pages/service-areas/neighborhoods/FoundersParkVillage'
import NorthShoreVillage from './pages/service-areas/neighborhoods/NorthShoreVillage'
import HeightsParkVillage from './pages/service-areas/neighborhoods/HeightsParkVillage'
import LakeVillage from './pages/service-areas/neighborhoods/LakeVillage'
import EastlakeVillage from './pages/service-areas/neighborhoods/EastlakeVillage'
import GardenPark from './pages/service-areas/neighborhoods/GardenPark'
import SodaRow from './pages/service-areas/neighborhoods/SodaRow'
import SouthStationVillage from './pages/service-areas/neighborhoods/SouthStationVillage'
import HighlandParkVillage from './pages/service-areas/neighborhoods/HighlandParkVillage'
import SpringHouseVillage from './pages/service-areas/neighborhoods/SpringHouseVillage'
import CreeksideVillage from './pages/service-areas/neighborhoods/CreeksideVillage'

// AI Realtor
import AIRealtor from './pages/AIRealtor'

// Admin
import AdminLeads from './pages/AdminLeads'
import AdminMarketUpdate from './pages/AdminMarketUpdate'

// Daybreak features
import DaybreakFeaturesIndex from './pages/daybreak-features/index'
import OquirrhLake from './pages/daybreak-features/OquirrhLake'
import Watercourse from './pages/daybreak-features/Watercourse'
import TheLoop from './pages/daybreak-features/TheLoop'
import TheSpoke from './pages/daybreak-features/TheSpoke'
import Parks from './pages/daybreak-features/Parks'
import Pools from './pages/daybreak-features/Pools'
import CommunityCenter from './pages/daybreak-features/CommunityCenter'
import SodaRowShopping from './pages/daybreak-features/SodaRowShopping'
import DowntownDaybreak from './pages/daybreak-features/DowntownDaybreak'
import LiveDaybreak from './pages/daybreak-features/LiveDaybreak'

function NotFound() {
  return (
    <main>
      <div
        className="section section--primary"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>404</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px,6vw,64px)', color: '#fff', marginBottom: '24px' }}>
            Page Not Found
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#aaa', marginBottom: '40px' }}>
            This page doesn't exist or may have moved.
          </p>
          <a href="/" className="btn-outline-gold">Back to Home</a>
        </div>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Core */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/daybreak-newsletter" element={<DaybreakNewsletter />} />
            <Route path="/daybreak-newsletter/:slug" element={<DaybreakNewsletterPost />} />
            <Route path="/daybreak-market-pulse" element={<DaybreakMarketPulse />} />
            <Route path="/about" element={<About />} />
            <Route path="/daybreak-faq" element={<DaybreakFaq />} />
            <Route path="/contact" element={<Contact />} />

            {/* Service areas */}
            <Route path="/service-areas/south-jordan" element={<SouthJordan />} />
            <Route path="/service-areas/daybreak" element={<DaybreakArea />} />
            <Route path="/service-areas/herriman" element={<Herriman />} />
            <Route path="/service-areas/riverton" element={<Riverton />} />

            {/* Daybreak neighborhoods */}
            <Route path="/service-areas/daybreak/neighborhoods" element={<NeighborhoodsIndex />} />
            <Route path="/service-areas/daybreak/neighborhoods/founders-park-village" element={<FoundersParkVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/north-shore-village" element={<NorthShoreVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/heights-park-village" element={<HeightsParkVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/lake-village" element={<LakeVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/eastlake-village" element={<EastlakeVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/garden-park" element={<GardenPark />} />
            <Route path="/service-areas/daybreak/neighborhoods/soda-row" element={<SodaRow />} />
            <Route path="/service-areas/daybreak/neighborhoods/south-station-village" element={<SouthStationVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/highland-park-village" element={<HighlandParkVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/springhouse-village" element={<SpringHouseVillage />} />
            <Route path="/service-areas/daybreak/neighborhoods/creekside-village" element={<CreeksideVillage />} />

            {/* Daybreak features */}
            <Route path="/daybreak-features" element={<DaybreakFeaturesIndex />} />
            <Route path="/daybreak-features/oquirrh-lake" element={<OquirrhLake />} />
            <Route path="/daybreak-features/watercourse" element={<Watercourse />} />
            <Route path="/daybreak-features/the-loop" element={<TheLoop />} />
            <Route path="/daybreak-features/the-spoke" element={<TheSpoke />} />
            <Route path="/daybreak-features/parks" element={<Parks />} />
            <Route path="/daybreak-features/pools" element={<Pools />} />
            <Route path="/daybreak-features/community-center" element={<CommunityCenter />} />
            <Route path="/daybreak-features/soda-row-shopping" element={<SodaRowShopping />} />
            <Route path="/daybreak-features/downtown-daybreak" element={<DowntownDaybreak />} />
            <Route path="/daybreak-features/livedaybreak" element={<LiveDaybreak />} />

            {/* AI Realtor */}
            <Route path="/ai-realtor" element={<AIRealtor />} />

            {/* Admin — not in nav */}
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/market-update" element={<AdminMarketUpdate />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
