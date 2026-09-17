import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'parks')!
export default function Parks() {
  return <FeaturePage config={config} />
}
