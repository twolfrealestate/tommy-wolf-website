import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'soda-row-shopping')!
export default function SodaRowShopping() {
  return <FeaturePage config={config} />
}
