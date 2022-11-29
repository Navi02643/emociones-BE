module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/newline-after-import': ["error"],
    'arrow-body-style': ["error", "always"],
    'linebreak-style': ["error", "windows"],
    quotes: 'off',
  },
};
