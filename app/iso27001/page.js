import IsoPageShell from "../../src/IsoPageShell";
import ISO27001Page from "../../src/iso/ISO27001Pages";
import JsonLd from "../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../src/seo";

const title = "ISO 27001:2022 Information Security Management";
const description =
  "International standard for information security management. SafetyNett supports ISO 27001:2022 risk assessment, data protection, and cybersecurity.";
const path = "/iso27001";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO27001Page />
      </IsoPageShell>
    </>
  );
}
