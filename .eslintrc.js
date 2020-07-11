const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const ignorePackages = {
  js: 'never',
  jsx: 'never',
  ts: 'never',
  tsx: 'never',
};

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/standard',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions,
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        semi: true,
      },
    ],
    'import/extensions': ['error', 'ignorePackages', ignorePackages],
  },
  env: {
    browser: true,
    node: true,
  },
};
