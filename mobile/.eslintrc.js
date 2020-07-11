const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const ignorePackages = {
  js: 'never',
  jsx: 'never',
  ts: 'never',
  tsx: 'never',
};

module.exports = {
  extends: ['prettier/react'],
  rules: {
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        variables: false,
      },
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions,
      },
    ],
    'import/extensions': ['error', 'ignorePackages', ignorePackages],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
