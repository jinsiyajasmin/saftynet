import Home from "../src/Home";
import JsonLd from "../src/JsonLd";
import { contactEmails, defaultDescription, postalAddress, siteName, siteUrl } from "../src/seo";

export const metadata = {
  title: {
    absolute: "SafetyNett | ISO Consultancy and Business Solutions",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "SafetyNett | ISO Consultancy and Business Solutions",
    description: defaultDescription,
    url: "/",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          description: defaultDescription,
          logo: `${siteUrl}/Logo1.png`,
          email: contactEmails.direct,
          address: {
            "@type": "PostalAddress",
            ...postalAddress,
          },
        }}
      />
      <Home />
    </>
  );
}
