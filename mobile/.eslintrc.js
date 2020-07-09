module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        "functions": false,
        "variables": false
      }
    ],
    'react/jsx-filename-extension': [2, {
      'extensions': ['.js', '.jsx', '.ts', '.tsx']
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
  "settings": {
    react: {
      "pragma": "React",
      "version": "detect",
    },
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".d.ts",
          ".ts",
          ".tsx"
        ]
      }
    }
  }
}