import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'eastlake-village')!
export default function EastlakeVillage() {
  return <NeighborhoodPage config={config} />
}
