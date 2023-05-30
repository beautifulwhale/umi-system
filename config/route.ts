export const routes = [
	{
		path: '/login',
		component: './Login',
		layout: false
	},
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
	{
		name: 'style测试',
		path: '/style',
		component: './testStyle',
		extra: true,
	},
	{
		name: '用户管理',
		path: '/system/auth/user/list',
		extra: true,
		component: './User',
	},
];
