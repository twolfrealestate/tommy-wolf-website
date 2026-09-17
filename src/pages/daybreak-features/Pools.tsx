import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'pools')!
export default function Pools() {
  return <FeaturePage config={config} />
}
