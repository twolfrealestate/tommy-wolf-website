import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'soda-row')!
export default function SodaRow() {
  return <NeighborhoodPage config={config} />
}
