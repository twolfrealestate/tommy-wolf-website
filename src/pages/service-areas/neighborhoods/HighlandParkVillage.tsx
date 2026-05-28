import { useEffect } from 'react'
import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'highland-park-village')!
export default function HighlandParkVillage() {
  useEffect(() => { document.title = `${config.name} Daybreak | Tommy Wolf REALTOR®` }, [])
  return <NeighborhoodPage config={config} />
}
