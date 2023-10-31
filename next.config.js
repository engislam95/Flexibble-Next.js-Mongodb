/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose" , "cloudinary"],
    },
    images: {
      domains: ["lh3.googleusercontent.com" , "res.cloudinary.com"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;
  