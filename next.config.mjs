import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  transpilePackages: ["@mui/material", "@mui/icons-material", "@mui/material-nextjs"],
};

export default nextConfig;
