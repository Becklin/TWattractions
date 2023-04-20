// module.exports = {
//   reactStrictMode: false,
//   images: {
//     domains: ["res.cloudinary.com", "www.travel.taipei"],
//   },
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
// };

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION", //your next configs goes here
  },
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "www.travel.taipei"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
