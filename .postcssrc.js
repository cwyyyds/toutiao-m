module.exports = {
  // 配置要使用的  PostCSS 插件
  plugins: {
    // 配置使用autoprefixer 插件
    // 作用：生成浏览器CSS样式规则前缀
    // autoprefixer: {
    //   //autoprefixer插件的配置
    //   //配置兼容的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    //配置postcss-pxtorem插件
    'postcss-pxtorem': {
      rootValue: (moudle) => (/vant/gi.test(moudle.file) ? 37.5 : 75),
      propList: ['*']
    }
  }
}
