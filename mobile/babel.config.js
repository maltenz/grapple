/* eslint-disable */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      "development": {
        "plugins": ["@babel/plugin-transform-react-jsx-source", "inline-dotenv"]
      }
    },
    plugins: ["inline-dotenv"]
  };
};
/* eslint:endable */
