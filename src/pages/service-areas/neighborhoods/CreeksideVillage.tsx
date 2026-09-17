import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'creekside-village')!
export default function CreeksideVillage() {
  return <NeighborhoodPage config={config} />
}
