module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier/react'],
  env: {
    browser: true,
    node: true,
  },
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
