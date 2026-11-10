import { PracticeOverview, practiceMetadata } from "@/components/pages/PracticePages";

export const metadata = practiceMetadata("audit-and-assurance");

export default function Page() {
  return <PracticeOverview id="audit-and-assurance" />;
}
