import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
const { winPath } = require('@umijs/utils')

export default {
  // webpack5:{},
  plugins: [
    winPath(require.resolve('./plugins/index.js'))
  ],
  chainWebpack: (memo) => {
    console.log('xxxx');
    // 更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    memo.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      // 按需配置
      { languages: ['typescript'] }
    ]);

    return memo;
  }
}