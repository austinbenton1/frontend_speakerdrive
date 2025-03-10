/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // Add proper MIME type configuration for videos
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