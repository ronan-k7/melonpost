import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("editorial-policy");

export default function Page() {
  return <InfoPage slug="editorial-policy" />;
}
