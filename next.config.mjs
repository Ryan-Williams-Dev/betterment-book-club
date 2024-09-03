/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["books.google.com"], // Add other domains if needed
  },
  webpack: (config, { isServer }) => {
    // Custom webpack configuration for handling fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/fonts/",
          publicPath: "/_next/static/fonts/",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
