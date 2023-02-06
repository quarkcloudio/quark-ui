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
  publicPath: './',
  history: { type: 'hash' },
  title: 'Engine Loading',
  layout: {
    title: false,
  },
  routes: routes,
  proxy: proxy,
  npmClient: 'pnpm',
});
