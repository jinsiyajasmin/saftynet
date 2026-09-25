import { siteUrl } from "../src/seo";

const routes = [
  "",
  "/iso9001",
  "/iso14001",
  "/iso45001",
  "/iso50001",
  "/iso27001",
  "/iso14068",
  "/contact",
];

export default function sitemap() {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-25"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
