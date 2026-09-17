import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'highland-park-village')!
export default function HighlandParkVillage() {
  return <NeighborhoodPage config={config} />
}
