import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/': {
      target: 'http://www.web.com',
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
  ],
  fastRefresh: {},
  qiankun: {
    master: {
      apps:[]
    }
  }
});
