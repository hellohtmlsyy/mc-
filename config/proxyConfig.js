module.exports = {
  proxyList: {
		'/apis': {
			// target: 'http://member.mc.com:8090',
			target: 'http://shw.miningcircle.com:8080',
			// target: 'http://zjl.miningcircle.com:8080',
      // target: 'http://qmn.miningcircle.com:8080',
			// target: 'http://jf.miningcircle.com:8081',
			changeOrigin: true,
			pathRewrite: {
				'^/apis': ''
			}
		},
		'/upload': {
			target: 'http://192.168.1.247',
			changeOrigin: true,
			pathRewrite: {
				'^/upload': ''
			}
		},
		'/mc1': {
			// target: 'http://www.mc.com',
			target: 'http://zjl.miningcircle.com:8090',
			changeOrigin: true,
			pathRewrite: {
				'^/mc1': ''
			}
		}
  }
}
