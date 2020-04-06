import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  history: 'hash', //
  base: '/admin/',
  publicPath: '/admin/',
  routes: [
    {
      path: '/login',
      component: '../layouts/LoginLayout',
      routes: [{ path: '/login', component: '../pages/Auth/Login' }]
    },
    {
      path: '/',
      component: '../layouts/AdminLayout',
      routes: [
        { path: '/', component: '../pages/Dashboard/Index' },
        { path: '/index', component: '../pages/Dashboard/Index' },
        { path: '/dashboard/index', component: '../pages/Dashboard/Index' },
        { path: '/upgrade/index', component: '../pages/Upgrade/Index' },
        { path: '/quark/engine', component: '../pages/Quark/Engine' },
        { path: '/account',component: '../pages/Account/Settings/Info' },
        { path: '/account/settings',component: '../pages/Account/Settings/Info' },
        { path: '/account/settings/info',component: '../pages/Account/Settings/Info' },
        { path: '/account/settings/security',component: '../pages/Account/Settings/Security' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'quark',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },

      headScripts: [
        { src: '<%= PUBLIC_PATH %>tinymce/tinymce.min.js' },
      ],
    }],
  ],
  proxy: {
    '/api': {
      target: 'http://www.admin.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    }
  }
}

export default config;
