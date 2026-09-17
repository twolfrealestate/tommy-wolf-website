import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'springhouse-village')!
export default function SpringHouseVillage() {
  return <NeighborhoodPage config={config} />
}
