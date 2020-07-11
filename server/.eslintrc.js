const ignorePackages = {
  js: 'never',
  jsx: 'never',
  ts: 'never',
  tsx: 'never',
};

module.exports = {
  rules: {
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'import/extensions': ['error', 'ignorePackages', ignorePackages],
  },
};
