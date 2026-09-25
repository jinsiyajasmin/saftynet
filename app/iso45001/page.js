import IsoPageShell from "../../src/IsoPageShell";
import ISO45001View from "../../src/iso/ISO45001View";
import JsonLd from "../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../src/seo";

const title = "ISO 45001:2018 Occupational Health and Safety";
const description =
  "International standard for occupational health and safety management. SafetyNett supports ISO 45001:2018 hazard control, risk management, and worker safety.";
const path = "/iso45001";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO45001View />
      </IsoPageShell>
    </>
  );
}
