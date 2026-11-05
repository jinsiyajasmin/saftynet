import IsoPageShell from "../../../src/IsoPageShell";
import ISO14001SelfAssessment from "../../../src/iso/ISO14001SelfAssessment";
import JsonLd from "../../../src/JsonLd";
import { pageMetadata, webPageJsonLd } from "../../../src/seo";

const title = "ISO 14001:2026 Readiness Self-Assessment";
const description =
  "Free ISO 14001:2026 self-assessment. Score your environmental management system against clauses 4 to 10 and get instant clause-by-clause findings and next steps.";
const path = "/iso14001/self-assessment";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <IsoPageShell>
        <ISO14001SelfAssessment />
      </IsoPageShell>
    </>
  );
}
