/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.currencystrengthsmeters.com",
      },
      {
        protocol: "http",
        hostname: "www.currencystrengthsmeters.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/19390/currencystrengthsmeters.com',
        permanent: false, // Set to false (307) for temporary redirect during setup
      },
    ];
  },
};

export default nextConfig;
