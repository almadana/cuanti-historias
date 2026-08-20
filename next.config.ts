import type { NextConfig } from "next";

const isStaticExport = process.env.CUANTI_STATIC_EXPORT === "1";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
