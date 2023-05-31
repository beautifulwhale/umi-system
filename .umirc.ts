import { defineConfig } from '@umijs/max';
import { routes } from './config/route';
import { config } from './config/config';
import user from './src/store/user';

export default defineConfig({
	base: '',
	codeSplitting: {
		jsStrategy: 'granularChunks',
	},
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
	clientLoader: {}, // 适用于组件嵌套 请求瀑布流发生时 并行请求提高性能
	...config,
	tailwindcss: {},
	dva: {
		immer: {},
		skipModelValidate: true,
	},
	icons: { autoInstall: {} },
	// extraModels: [user],
	// plugins: [
	// 	[
	// 		'@umijs/plugin-dva',
	// 		{
	// 			models: [require('./src/store/user').default],
	// 		},
	// 	],
	// ],
});
