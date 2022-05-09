module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          components: './src/shared/components',
          appjson: './src/App.json',
          data: './src/shared/Data.json',
          shared: './src/shared',
          css: './src/shared/index.style.js',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
