import { serviceRoute } from "@/components/pages/PracticePages";

const route = serviceRoute("advisory");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
