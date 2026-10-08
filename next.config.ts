import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
  /**
   * Old-URL redirects. Add one entry per URL from a previous site so links and rankings carry over, e.g.
   * { source: "/old-services", destination: "/services", permanent: true }
   */
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
