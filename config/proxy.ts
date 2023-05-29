const { UMI_ENV } = process.env;

const proxy = {
	test: {
		'/api': {
			target: 'http://px.dev.chinahuatong.com.cn:55000',
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		},
	},
	dev: {
		'/api': {
			target: 'http://v3.g-fast.cn',
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		},
	},
	prod: {
		'/api': {
			target: 'http://v3.g-fast.cn',
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		},
	},
};
export default proxy[UMI_ENV || 'dev'];
