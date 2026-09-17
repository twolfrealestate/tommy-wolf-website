import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'north-shore-village')!
export default function NorthShoreVillage() {
  return <NeighborhoodPage config={config} />
}
