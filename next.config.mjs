/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true, // تصاویر بدون بهینه‌سازی بارگذاری می‌شوند
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iljrwbhnejndlaaifxnp.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
