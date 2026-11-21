import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("source-methodology");

export default function Page() {
  return <InfoPage slug="source-methodology" />;
}
