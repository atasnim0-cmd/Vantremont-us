import { PracticeOverview, practiceMetadata } from "@/components/pages/PracticePages";

export const metadata = practiceMetadata("tax");

export default function Page() {
  return <PracticeOverview id="tax" />;
}
