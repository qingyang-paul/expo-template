module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      // 1. Expo 官方预设，并告诉它我要用 nativewind 的 jsx 引擎
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      
      // 2. NativeWind 的预设 (处理 Tailwind 类名)
      "nativewind/babel",
    ],
    plugins: [
      // 3. 如果你用了 React Native Reanimated (NativeWind v4 依赖它做动画)
      // ⚠️ 注意：Reanimated 插件必须永远放在列表的最后一个！
      "react-native-reanimated/plugin",
    ],
  };
};