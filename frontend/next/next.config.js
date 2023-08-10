/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();

const nextConfig = {
  images: {
    domains: ["*", "k.kakaocdn.net"],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = removeImports({
  ...nextConfig
});

