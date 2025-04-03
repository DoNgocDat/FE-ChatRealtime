const config = {
    plugins: [
      "@ianvs/prettier-plugin-sort-imports",
      "prettier-plugin-tailwindcss",
    ],
    importOrder: [
      "<TYPES>",
      "^(react/(.*)$)|^(react$)",
      "<THIRD_PARTY_MODULES>",
      "",
      "<TYPES>^[.|..|~]",
      "^~/",
      "^[../]",
      "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "4.4.0",
  };
  
  export default config;
  