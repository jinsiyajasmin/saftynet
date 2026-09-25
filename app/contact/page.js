import IsoPageShell from "../../src/IsoPageShell";
import ContactPage from "../../src/ContactPage";
import JsonLd from "../../src/JsonLd";
import { contactEmails, pageMetadata, postalAddress, siteName, siteUrl, webPageJsonLd } from "../../src/seo";

const title = "Contact";
const description =
  "Contact SafetyNett about ISO consultancy and quotations. Email m.chiweda@safetynett.co.uk or no-reply@safetynett.co.uk.";
const path = "/contact";

export const metadata = pageMetadata({ title, description, path });

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          ...webPageJsonLd({ title: `${title} | ${siteName}`, description, path }),
          "@type": "ContactPage",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          email: contactEmails.direct,
          address: {
            "@type": "PostalAddress",
            ...postalAddress,
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: contactEmails.direct,
              contactType: "customer support",
              areaServed: "GB",
            },
            {
              "@type": "ContactPoint",
              email: contactEmails.enquiries,
              contactType: "enquiries",
              areaServed: "GB",
            },
          ],
        }}
      />
      <IsoPageShell>
        <ContactPage />
      </IsoPageShell>
    </>
  );
}
