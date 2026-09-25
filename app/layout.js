import "./globals.css";
import ThemeRegistry from "../src/ThemeRegistry";
import { defaultDescription, siteName, siteUrl } from "../src/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ISO Consultancy and Business Solutions`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  icons: {
    icon: "/Logo1.png",
    apple: "/Logo1.png",
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} | ISO Consultancy and Business Solutions`,
    description: defaultDescription,
    images: [{ url: "/Logo1.png", alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `${siteName} | ISO Consultancy and Business Solutions`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
