/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows production builds to complete even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  // Turn off image optimization to avoid base64 placeholders:
  images: {
    unoptimized: true,
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
