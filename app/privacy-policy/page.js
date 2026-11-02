import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("privacy-policy");

export default function Page() {
  return <InfoPage slug="privacy-policy" />;
}
