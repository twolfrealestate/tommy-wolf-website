import { useEffect } from 'react'
import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'parks')!
export default function Parks() {
  useEffect(() => { document.title = `${config.name} | Daybreak Features | Tommy Wolf REALTOR®` }, [])
  return <FeaturePage config={config} />
}
