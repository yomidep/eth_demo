/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        THIRDWEB_KEY: process.env.THIRDWEB_KEY,
        RPC_URL: process.env.RPC_URL
    }
};

export default nextConfig;
