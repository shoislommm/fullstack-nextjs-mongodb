/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/auth',
        destination: '/profile',
        permanent: false,
      }
    ]
  }
};

export default nextConfig;
