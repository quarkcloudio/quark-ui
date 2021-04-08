export default {

    // APP默认初始化接口
    'GET /api/app/initData': {
        type: "page",
        body: {
            type: "login",
            api: 'login',
            redirect: '/index?api=app/dashboard/index',
            title: "QuarkCMS",
            logo: false,
            description: "信息丰富的世界里，唯一稀缺的就是人类的注意力",
            captchaUrl: "https://admin.quarkcms.com/api/admin/captcha",
            copyright: '2020 QuarkCMS',
            links:[
                {
                    title : 'Quark',
                    href : 'http://www.quarkcms.com/'
                },
                {
                    title : '爱小圈',
                    href : 'http://www.ixiaoquan.com'
                },
                {
                    title : 'Github',
                    href : 'https://github.com/quarkcms'
                }
            ]
        }
    },

    // 仪表盘实例
    'GET /api/app/dashboard/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            title: 'QuarkCMS',
            iconfontUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
            defaultCollapsed: true,
            menu: [
                {
                    key: '1',
                    path: '/dashboard',
                    name: '控制台',
                    icon: 'icon-home',
                    children: [
                        {
                            key: '2',
                            path: '/index?api=app/dashboard/index',
                            name: '主页',
                        },
                    ],
                },
                {
                    key: '3',
                    path: '/page',
                    name: '页面',
                    icon: 'icon-page',
                    children: [
                        {
                            key: '4',
                            path: '/index?api=app/page/index',
                            name: '简单页面',
                        },
                    ],
                },
                {
                    key: '5',
                    path: '/form',
                    name: '表单',
                    icon: 'icon-plugin',
                    children: [
                        {
                            key: '6',
                            path: '/index?api=app/form/index',
                            name: '简单表单',
                        },
                    ],
                },
            ],
            body: {
                type: "pageContainer",
                title: '标题',
                body: "这个是仪表盘实例"
            }
        }
    },

    // 仪表盘实例
    'GET /api/app/page/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            title: 'QuarkCMS',
            iconfontUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
            defaultCollapsed: true,
            menu: [
                {
                    key: '1',
                    path: '/dashboard',
                    name: '控制台',
                    icon: 'icon-home',
                    children: [
                        {
                            key: '2',
                            path: '/index?api=app/dashboard/index',
                            name: '主页',
                        },
                    ],
                },
                {
                    key: '3',
                    path: '/page',
                    name: '页面',
                    icon: 'icon-page',
                    children: [
                        {
                            key: '4',
                            path: '/index?api=app/page/index',
                            name: '简单页面',
                        },
                    ],
                },
                {
                    key: '5',
                    path: '/form',
                    name: '表单',
                    icon: 'icon-plugin',
                    children: [
                        {
                            key: '6',
                            path: '/index?api=app/form/index',
                            name: '简单表单',
                        },
                    ],
                },
            ],
            body: {
                type: "pageContainer",
                title: '标题',
                body: "这个是页面实例"
            }
        }
    },
}
  