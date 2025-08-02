import { getPageMetadata } from "@/lib/seo/metadata"
import FeaturesIntro from "./FeaturesIntro"
import FeaturesCaseManagement from "./FeaturesCaseManagement"
import FeaturesTimeline from "./FeaturesTimeline"
import FeaturesLegalChat from "./FeaturesLegalChat"
import FeaturesLetterGenerator from "./FeaturesLetterGenerator"
import FeaturesViewer from "./FeaturesViewer"
import FeaturesMultiUser from "./FeaturesMultiUser"
import FeaturesFinalCTA from "./FeaturesFinalCTA"

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
  return getPageMetadata("/features", params.locale, "features")
}

export default function FeaturesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <FeaturesIntro />
      <FeaturesCaseManagement />
      <FeaturesTimeline />
      <FeaturesLegalChat />
      <FeaturesLetterGenerator />
      <FeaturesViewer />
      <FeaturesMultiUser />
      <FeaturesFinalCTA />
    </main>
  )
}
