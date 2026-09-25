import IsoPageShell from "../../src/IsoPageShell";
import ISO50001Page from "../../src/iso/ISO50001Page";
import JsonLd from "../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../src/seo";

const title = "ISO 50001:2018 Energy Management";
const description =
  "International standard for energy management systems. SafetyNett supports ISO 50001:2018 energy efficiency, cost reduction, and performance monitoring.";
const path = "/iso50001";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO50001Page />
      </IsoPageShell>
    </>
  );
}
