import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Run type checking through the compiler API (works in restricted runners too).
  experimental: { useTypeScriptCli: false },
};

export default nextConfig;
