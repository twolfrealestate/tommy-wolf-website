import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'the-spoke')!
export default function TheSpoke() {
  return <FeaturePage config={config} />
}
