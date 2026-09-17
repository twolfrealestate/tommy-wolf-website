import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'garden-park')!
export default function GardenPark() {
  return <NeighborhoodPage config={config} />
}
