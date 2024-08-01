/** @type {import('next').NextConfig} */
const nextConfig = {
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
