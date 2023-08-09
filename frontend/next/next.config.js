/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*", "k.kakaocdn.net"],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
