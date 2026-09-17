import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'lake-village')!
export default function LakeVillage() {
  return <NeighborhoodPage config={config} />
}
