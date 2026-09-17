import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'south-station-village')!
export default function SouthStationVillage() {
  return <NeighborhoodPage config={config} />
}
