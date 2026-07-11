import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/movie-search-app",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
