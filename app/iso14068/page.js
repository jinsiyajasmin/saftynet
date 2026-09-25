import IsoPageShell from "../../src/IsoPageShell";
import ISO14068Page from "../../src/iso/ISO14068Page";
import JsonLd from "../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../src/seo";

const title = "ISO 14068:2023 Climate Change Management";
const description =
  "International standard for climate change management and the transition to net zero. SafetyNett supports ISO 14068:2023 carbon neutrality and climate action.";
const path = "/iso14068";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO14068Page />
      </IsoPageShell>
    </>
  );
}
