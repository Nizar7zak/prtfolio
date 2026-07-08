import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "image.thum.io" },
      { hostname: "www.evnno.com" },
      { hostname: "images.credly.com" },
      { hostname: "user-images.githubusercontent.com" },
      { hostname: "github-profile-summary-cards.vercel.app" },
    ],
  },
};

export default nextConfig;
