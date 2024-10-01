module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@controllers": "./src/controllers",
          "@services": "./src/services",
          "@repositories": "./src/repositories",
          "@entities": "./src/entities",
          "@utils": "./src/utils",
          "@middlewares": "./src/middlewares",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
