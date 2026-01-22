/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "./slices/Image/index",
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: [
      `prismic-templates-website.cdn.prismic.io`,
      "images.prismic.io",
      "prismic-io.s3.amazonaws.com",
    ],
  },
};

export default nextConfig;
