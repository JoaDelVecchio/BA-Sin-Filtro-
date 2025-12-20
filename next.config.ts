import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "resizer.glanacion.com",
      },
      {
        protocol: "https",
        hostname: "www.clarin.com",
      },
      {
        protocol: "https",
        hostname: "images.clarin.com",
      },
      {
        protocol: "https",
        hostname: "www.infobae.com",
      },
      {
        protocol: "https",
        hostname: "www.cronista.com",
      },
    ],
  },
};

export default nextConfig;
