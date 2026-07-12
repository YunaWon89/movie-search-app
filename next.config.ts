import type { NextConfig } from "next";

const isGithubPagesBuild = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  ...(isGithubPagesBuild && {
    output: "export",
    basePath: "/movie-search-app",
  }),
  images: {
    unoptimized: isGithubPagesBuild,
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
