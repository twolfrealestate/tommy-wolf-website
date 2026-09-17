import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'heights-park-village')!
export default function HeightsParkVillage() {
  return <NeighborhoodPage config={config} />
}
