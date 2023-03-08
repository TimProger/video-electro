/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.tm-she.com']
  },
  swcMinify: true
}

module.exports = nextConfig
