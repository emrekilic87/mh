import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Metadata stream edilmesin; title/description her istemcide <head> içinde gelsin (SEO araçları için)
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
