const repoName = process.env.NEXT_PUBLIC_BASE_PATH || "/virtual-iphone-simulator";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: repoName === "" ? undefined : repoName,
  assetPrefix: repoName === "" ? undefined : repoName,
};

export default nextConfig;
