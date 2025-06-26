import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trevogas.com.br",
        port: "", // deixe vazio para padrão
      },
    ],
  },
};

export default nextConfig;