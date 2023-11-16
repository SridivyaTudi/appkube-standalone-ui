module.exports = (api) => {
  const presets = ["react-app"];
  const plugins = [
    "@babel/plugin-transform-modules-commonjs",
    "inline-react-svg",
    "@babel/plugin-transform-private-property-in-object",
  ];

  api.cache(false);

  return {
    presets,
    plugins,
  };
};
