import { defineConfig } from '@umijs/max';
import { routes } from './config/route'
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
  proxy: {
    '/api': {
      'target': 'http://px.dev.chinahuatong.com.cn:55000',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    }
  },
  ...config
});
