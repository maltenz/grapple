module.exports = {
   "parser": "@typescript-eslint/parser",
   "extends": [
     "eslint:recommended",
     "plugin:@typescript-eslint/eslint-recommended",
     "plugin:@typescript-eslint/recommended",
     "plugin:prettier/recommended",
   ],
   "rules": {
    "@typescript-eslint/ban-ts-ignore": "off",
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100,
        "semi": true
      }
    ],
   },
   "env": {
     "browser": true,
     "node": true
   },
}