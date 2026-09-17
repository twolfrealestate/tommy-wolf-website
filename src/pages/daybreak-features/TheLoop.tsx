import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'the-loop')!
export default function TheLoop() {
  return <FeaturePage config={config} />
}
