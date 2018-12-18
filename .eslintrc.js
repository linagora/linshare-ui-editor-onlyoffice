module.exports = {
  root: true,
  globals: {
    DocsAPI: false
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": [process.env.NODE_ENV === "production" ? "off" : "error", { printWidth: 120 }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
