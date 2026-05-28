import { useEffect } from 'react'
import NeighborhoodPage from '../../../components/NeighborhoodPage'
import neighborhoods from '../../../data/neighborhoods'
const config = neighborhoods.find(n => n.slug === 'heights-park-village')!
export default function HeightsParkVillage() {
  useEffect(() => { document.title = `${config.name} Daybreak | Tommy Wolf REALTOR®` }, [])
  return <NeighborhoodPage config={config} />
}
