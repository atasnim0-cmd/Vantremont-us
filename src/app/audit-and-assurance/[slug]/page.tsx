import { serviceRoute } from "@/components/pages/PracticePages";

const route = serviceRoute("audit-and-assurance");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
