import FeaturePage from '../../components/FeaturePage'
import features from '../../data/features'
const config = features.find(f => f.slug === 'community-center')!
export default function CommunityCenter() {
  return <FeaturePage config={config} />
}
