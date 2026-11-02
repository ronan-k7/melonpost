import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("advertising-policy");

export default function Page() {
  return <InfoPage slug="advertising-policy" />;
}
