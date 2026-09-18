const nextConfig = require("eslint-config-next");

module.exports = [
  ...nextConfig,
  {
    ignores: [".next/**", "coverage/**", "node_modules/**"],
  },
];
