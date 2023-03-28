/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {

  // npm run dev or next dev
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  // npm run build or next build
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

  return {
    reactStrictMode: true,
    images: {
      domains: ['api.video-electro.com']
    },
    swcMinify: true,
    env: {
      development: isDev,
      production: isProd
    },
    basePath: ''
  }
}