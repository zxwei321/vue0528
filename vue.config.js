module.exports = {
    devServer: {
      open: true,  // 自动打开浏览器
      hot: true, // 实时打包编译
      host: '0.0.0.0',
      inline: true,  // 表示实时刷新浏览器
      port: '8000'   // 指定打开浏览器的端口号
    }
}