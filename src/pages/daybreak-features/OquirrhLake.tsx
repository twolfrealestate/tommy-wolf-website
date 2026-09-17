import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'oquirrh-lake')!
export default function OquirrhLake() {
  return <FeaturePage config={config} />
}
