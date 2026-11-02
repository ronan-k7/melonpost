import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("legal");

export default function Page() {
  return <InfoPage slug="legal" />;
}
