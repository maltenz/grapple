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
   },
  "env": {
    "browser": true,
    "node": true
  },
}