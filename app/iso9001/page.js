import IsoPageShell from "../../src/IsoPageShell";
import ISO9001Page from "../../src/iso/ISO9001Page";
import JsonLd from "../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../src/seo";

const title = "ISO 9001:2015 Quality Management";
const description =
  "International standard for quality management systems. SafetyNett supports ISO 9001:2015 quality assurance, process improvement, and customer satisfaction.";
const path = "/iso9001";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO9001Page />
      </IsoPageShell>
    </>
  );
}
