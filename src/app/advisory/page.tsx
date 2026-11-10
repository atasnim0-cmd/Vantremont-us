import { PracticeOverview, practiceMetadata } from "@/components/pages/PracticePages";

export const metadata = practiceMetadata("advisory");

export default function Page() {
  return <PracticeOverview id="advisory" />;
}
