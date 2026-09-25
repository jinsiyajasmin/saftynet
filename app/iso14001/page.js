import IsoPageShell from "../../src/IsoPageShell";
import ISO14001Page from "../../src/iso/ISO14001Page";
import JsonLd from "../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../src/seo";

const title = "ISO 14001:2015 Environmental Management";
const description =
  "International standard for environmental management systems. SafetyNett supports ISO 14001:2015 environmental policy, sustainability, and compliance.";
const path = "/iso14001";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO14001Page />
      </IsoPageShell>
    </>
  );
}
