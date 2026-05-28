import { useEffect } from 'react'
import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'the-spoke')!
export default function TheSpoke() {
  useEffect(() => { document.title = `${config.name} | Daybreak Features | Tommy Wolf REALTOR®` }, [])
  return <FeaturePage config={config} />
}
