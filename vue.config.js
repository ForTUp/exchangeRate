module.exports = {
  devServer: {
	open: true,  //设置自动打开
	//port: 8080,  // 这个是默认端口
    proxy: {
      '/api': {
        target: 'http://hh.praymore.xyz',  //设置反向代理链接
        changeOrigin: true,  //  是否跨域
        pathRewrite: {
			'^/api': '/api'  //  重定向
		}
      }
    }
  }
}

