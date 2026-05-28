import { useEffect } from 'react'
import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'downtown-daybreak')!
export default function DowntownDaybreak() {
  useEffect(() => { document.title = `${config.name} | Daybreak Features | Tommy Wolf REALTOR®` }, [])
  return <FeaturePage config={config} />
}
