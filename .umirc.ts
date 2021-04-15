import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/': {
      target: 'http://quark-admin.test',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
  publicPath: './',
  history: { type: 'hash' },
  routes: [
    { path: '/', component: '@/pages/Index/index' },
    { path: '/index', component: '@/pages/Index/index' },
  ],
  fastRefresh: {},
});
