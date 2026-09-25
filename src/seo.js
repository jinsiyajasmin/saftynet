export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://saftynet-eta.vercel.app";

export const siteName = "SafetyNett";

export const products = [
  {
    name: "Site-Mate",
    href: "https://site-mateai.co.uk/",
    summary: "QHSE management software for engineering and manufacturing. Inspections, risk assessments, incidents, permits and compliance in one place.",
  },
  {
    name: "iAudit Global",
    href: "https://www.iaudit.global/",
    summary: "ISO audit software for planning, running and reporting ISO 9001, 14001 and 45001 audits.",
  },
];

export const contactEmails = {
  direct: "m.chiweda@safetynett.co.uk",
  enquiries: "no-reply@safetynett.co.uk",
};

export const postalAddress = {
  streetAddress: "Unit 17f, The Lansbury Estates, 102 Lower Guildford Road",
  addressLocality: "Knaphill, Woking",
  addressRegion: "England",
  postalCode: "GU21 2EP",
  addressCountry: "GB",
};

export const defaultDescription =
  "Simplifying ISO management systems and empowering businesses with risk mitigation SaaS solutions and expert consultancy.";

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      images: [{ url: "/Logo1.png", alt: siteName }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/Logo1.png"],
    },
  };
}

export function webPageJsonLd({ title, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteUrl}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}
