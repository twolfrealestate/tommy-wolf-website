import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'founders-park-village')!
export default function FoundersParkVillage() {
  return <NeighborhoodPage config={config} />
}
