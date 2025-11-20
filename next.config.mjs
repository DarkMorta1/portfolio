/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  basePath: '',
  images: {
    unoptimized: true,
    domains: ['blob.v0.dev'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
