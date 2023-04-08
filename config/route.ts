export const routes = [
	{
		path: '/',
		redirect: '/home',
		extra: true,
	},
	{
		name: '首页',
		path: '/home',
		component: './Home',
		extra: true,
	},
	{
		path: '/*',
		component: '@/pages/404',
	},
	{
		name: '权限演示',
		path: '/access',
		component: './Access',
		extra: true,
	},
	{
		name: 'schema测试',
		path: '/schema',
		component: '@/layouts/index',
		extra: true,
		routes: [
			{
				path: '/schema',
				redirect: '/schema/index',
			},
			{
				name: ' Schema列表',
				path: '/schema/index',
				component: '@/pages/schema',
			},
			{
				path: '/schema/manger',
				component: '@/pages/schema/components/subjectManger',
			},
		],
	},
];
