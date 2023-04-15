import { defineConfig } from '@umijs/max';
import { routes } from './config/route';
import { config } from './config/config';
export default defineConfig({
	antd: {},
	access: {},
	model: {},
	initialState: {},
	request: {},
	layout: {
		title: '@umijs/max',
	},
	routes: routes,
	npmClient: 'pnpm',
	clientLoader: {},  // 适用于组件嵌套 请求瀑布流发生时 并行请求提高性能
	proxy: {
		'/api': {
			target: 'http://px.dev.chinahuatong.com.cn:55000',
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		},
	},
	...config,
	tailwindcss: {},
	dva: {},
});
