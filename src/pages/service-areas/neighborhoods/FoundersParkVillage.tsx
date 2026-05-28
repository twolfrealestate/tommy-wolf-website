import { useEffect } from 'react'
import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'founders-park-village')!
export default function FoundersParkVillage() {
  useEffect(() => { document.title = `${config.name} Daybreak | Tommy Wolf REALTOR®` }, [])
  return <NeighborhoodPage config={config} />
}
