/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Improve RSC payload handling
    serverActions: {
      bodySizeLimit: '2mb'
    },
    // Ensure proper payload fetching
    serverComponentsExternalPackages: []
  },
  experimental: {
    // Improve RSC payload handling
    serverActions: {
      bodySizeLimit: '2mb'
    },
    // Ensure proper payload fetching
    serverComponentsExternalPackages: []
  },
  eslint: {
    // This allows production builds to complete even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Turn off image optimization to avoid base64 placeholders:
  images: {
    unoptimized: true,
    domains: ['storage.googleapis.com'], // Allow loading from Google Storage
  },
  // Example: custom headers for .mp4 or .webm:
  async headers() {
    return [
      {
        source: "/(.*).mp4",
        headers: [
          {
            key: "Content-Type",
            value: "video/mp4",
          },
        ],
      },
      {
        source: "/(.*).webm",
        headers: [
          {
            key: "Content-Type",
            value: "video/webm",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
