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
    'newline-after-import': 'off',
    'max-len': 'off',
    'new-cap': 'off',
    'quote-props': 'off',
    'arrow-body-style': ["error", "always"],
    'linebreak-style': ["error", "windows"],
    quotes: 'off',
  },
};
