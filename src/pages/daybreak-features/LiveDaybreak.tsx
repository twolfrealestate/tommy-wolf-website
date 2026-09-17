import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'livedaybreak')!
export default function LiveDaybreak() {
  return <FeaturePage config={config} />
}
