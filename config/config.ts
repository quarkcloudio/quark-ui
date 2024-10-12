import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  headScripts: [
    { src: './scripts/loading.js', async: true }, // 解决首次加载时白屏的问题
    { src: './tinymce/tinymce.min.js', async: true },
  ],
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history: { type: 'hash' },
  title: 'Engine Loading',
  favicons: ['/favicon.ico'],
  layout: {
    title: false,
  },
  routes: routes,
  proxy: proxy,
  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  unocss: {
    watch: ['src/**/*.tsx'],
  },
  npmClient: 'pnpm',
});
