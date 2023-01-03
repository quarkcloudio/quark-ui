import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/': {
      // target: 'http://127.0.0.1:3000',
      target: 'http://172.22.221.100:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
  publicPath: './',
  history: { type: 'hash' },
  title: false,
  routes: [
    { path: '/', component: '@/pages/Index/index' },
    { path: '/index', component: '@/pages/Index/index' },
    {
      path: '/sms/send',
      component: '@/pages/Sms/Send',
    },
  ],
  fastRefresh: {},
  qiankun: {
    master: {
      apps: [],
    },
  },
});
