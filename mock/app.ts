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
            cache: true,
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
                            key: '1-1',
                            path: '/index?api=app/dashboard/index',
                            name: '主页',
                        },
                    ],
                },
                {
                    key: '2',
                    path: '/layout',
                    name: '布局',
                    icon: 'icon-page',
                    children: [
                        {
                            key: '2-1',
                            path: '/index?api=layout/page',
                            name: '初始页面',
                        },
                        {
                            key: '2-2',
                            path: '/index?api=layout/container',
                            name: '容器',
                        },
                        {
                            key: '2-3',
                            path: '/index?api=layout/index',
                            name: '高级布局',
                        },
                    ],
                },
                {
                    key: '3',
                    path: '/card',
                    name: '卡片',
                    icon: 'icon-creditcard',
                    children: [
                        {
                            key: '3-1',
                            path: '/index?api=card/index',
                            name: '基础卡片',
                        },
                        {
                            key: '3-2',
                            path: '/index?api=card/grid',
                            name: '栅格布局',
                        },
                    ],
                },
                {
                    key: '4',
                    path: '/grid',
                    name: '栅格',
                    icon: 'icon-block',
                    children: [
                        {
                            key: '4-1',
                            path: '/index?api=grid/index',
                            name: '基础栅格',
                        },
                        {
                            key: '4-2',
                            path: '/index?api=grid/gutter',
                            name: '区块间隔',
                        },
                        {
                            key: '4-3',
                            path: '/index?api=grid/offset',
                            name: '左右偏移',
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
                            key: '5-1',
                            path: '/index?api=form/index',
                            name: '基础表单',
                        },
                    ],
                },
            ],
            body: {
                type: "pageContainer",
                title: '仪表盘',
                body: "这个是仪表盘实例"
            }
        }
    },
}
  