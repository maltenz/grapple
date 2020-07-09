module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/standard',
    'prettier/react',
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        semi: true,
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
};
