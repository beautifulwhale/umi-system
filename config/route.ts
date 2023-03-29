export const routes = [
    {
        path: '/',
        redirect: '/home',
        extra: true
    },
    {
        name: '首页',
        path: '/home',
        component: './Home',
        extra: true
    },
    {
        name: '权限演示',
        path: '/access',
        component: './Access',
        extra: true
    },
    {
        name: ' Schema 测试',
        path: '/schema',
        component: './schema',
        extra: true
    },
]