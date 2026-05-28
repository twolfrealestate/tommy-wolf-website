import { useEffect } from 'react'
import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'creekside-village')!
export default function CreeksideVillage() {
  useEffect(() => { document.title = `${config.name} Daybreak | Tommy Wolf REALTOR®` }, [])
  return <NeighborhoodPage config={config} />
}
