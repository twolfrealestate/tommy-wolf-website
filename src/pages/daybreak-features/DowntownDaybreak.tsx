import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'downtown-daybreak')!
export default function DowntownDaybreak() {
  return <FeaturePage config={config} />
}
