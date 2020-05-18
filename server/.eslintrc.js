module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/flowtype",
    "prettier/standard"
  ],
  "rules": {
    "eqeqeq":["error", "always"],
    "@typescript-eslint/no-unused-vars": "off",
   },
  "env": {
    "browser": true,
    "node": true
  },
}