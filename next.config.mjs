/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "example.com",
      "getfile.dokpub.com",
      "drive.google.com",
      "images-foodtech.magnit.ru",
      "static.simplewine.ru",
      "cdn-img.perekrestok.ru",
      "s2.wine.style",
      "www.globalalco.ru",
      "images.vivino.com",
      "uppawinery.ru",
      "decanter.ru",
      "storage.yandexcloud.net",
      "winemore.ru",
      "www.alma-valley.ru",
      "encrypted-tbn0.gstatic.com",
    ], // Временное решение, чтобы мок с бэка не ломал некст
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
