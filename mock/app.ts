export default {

    // APP默认初始化接口
    'GET /api/app/initData': {
        component: "page",
        body: {
            component: "login",
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
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
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
                {
                    key: '6',
                    path: '/table',
                    name: '表格',
                    icon: 'icon-plugin',
                    children: [
                        {
                            key: '6-1',
                            path: '/index?api=table/index',
                            name: '基础表格',
                        },
                        {
                            key: '6-2',
                            path: '/index?api=table/search',
                            name: '搜索栏',
                        },
                        {
                            key: '6-3',
                            path: '/index?api=table/tool',
                            name: '工具栏',
                        },
                        {
                            key: '6-4',
                            path: '/index?api=table/batchAction',
                            name: '批量操作',
                        },
                    ],
                },
                {
                    key: '7',
                    path: '/action',
                    name: '行为',
                    icon: 'icon-plugin',
                    children: [
                        {
                            key: '7-1',
                            path: '/index?api=action/index',
                            name: '行为按钮',
                        },
                    ],
                },
                {
                    key: '8',
                    path: '/tabs',
                    name: '标签页',
                    icon: 'icon-plugin',
                    children: [
                        {
                            key: '8-1',
                            path: '/index?api=tabs/index',
                            name: '基础标签页',
                        },
                    ],
                },
                {
                    key: '9',
                    path: '/microApp',
                    name: '微前端',
                    icon: 'icon-plugin',
                    children: [
                        {
                            key: '9-1',
                            path: '/index?api=microApp/index',
                            name: '微前端示例',
                        },
                    ],
                },
            ],
            body: {
                component: "pageContainer",
                title: '仪表盘',
                body:[
                    {
                        component: "row",
                        gutter: 8,
                        body: [
                            {
                                component: "col",
                                span: 6,
                                body: {
                                    component: "statisticCard",
                                    statistic: {
                                        title:'管理员数',
                                        valueStyle:{
                                            color:'#3f8600'
                                        },
                                        value:10086
                                    }
                                }
                            },
                            {
                                component: "col",
                                span: 6,
                                body: {
                                    component: "statisticCard",
                                    statistic: {
                                        title:'日志数量',
                                        valueStyle:{
                                            color:'#999999'
                                        },
                                        value:10010
                                    }
                                }
                            },
                            {
                                component: "col",
                                span: 6,
                                body: {
                                    component: "statisticCard",
                                    statistic: {
                                        title:'图片数量',
                                        valueStyle:{
                                            color:'#cf1322'
                                        },
                                        value:100
                                    }
                                }
                            },
                            {
                                component: "col",
                                span: 6,
                                body: {
                                    component: "statisticCard",
                                    statistic: {
                                        title:'文件数量',
                                        valueStyle:{
                                            color:'#cf1322'
                                        },
                                        value:1008
                                    }
                                }
                            },
                        ]
                    },
                    {
                        component: "row",
                        style: {
                            marginTop: '8px'
                        },
                        gutter: 8,
                        body: [
                            {
                                component: "col",
                                span: 12,
                                body: {
                                    component: "card",
                                    body: {
                                        component: "descriptions",
                                        title: "系统信息",
                                        column: 1,
                                        items: [
                                            {
                                                component: "text",
                                                label: "系统版本",
                                                value: "v1.1.7"
                                            },
                                            {
                                                component: "text",
                                                label: "服务器操作系统",
                                                value: "windows"
                                            },
                                            {
                                                component: "text",
                                                label: "Laravel版本",
                                                value: "7.30.3"
                                            },
                                            {
                                                component: "text",
                                                label: "运行环境",
                                                value: "Apache/2.4.39 (Win64) OpenSSL/1.1.1b mod_fcgid/2.3"
                                            },
                                            {
                                                component: "text",
                                                label: "MYSQL版本",
                                                value: "5.5.62"
                                            },
                                            {
                                                component: "text",
                                                label: "上传限制",
                                                value: "100M"
                                            },
                                        ]
                                    }
                                }
                            },
                            {
                                component: "col",
                                span: 12,
                                body: {
                                    component: "card",
                                    body: {
                                        component: "descriptions",
                                        title: "团队信息",
                                        column: 1,
                                        items: [
                                            {
                                                component: "text",
                                                label: "作者",
                                                value: "tangtanglove"
                                            },
                                            {
                                                component: "text",
                                                label: "联系方式",
                                                value: "dai_hang_love@126.com"
                                            },
                                            {
                                                component: "link",
                                                label: "官方网址",
                                                value: "www.quarkcms.com",
                                                target: '_blank',
                                                href: 'https://www.quarkcms.com'
                                            },
                                            {
                                                component: "link",
                                                label: "文档地址",
                                                value: "查看文档",
                                                target: '_blank',
                                                href: 'https://www.quarkcms.com'
                                            },
                                            {
                                                component: "link",
                                                label: "BUG反馈",
                                                value: "提交漏洞",
                                                target: '_blank',
                                                href: 'https://github.com/quarkcms/quark-admin/issues'
                                            },
                                            {
                                                component: "link",
                                                label: "Github",
                                                value: "Github",
                                                target: '_blank',
                                                href: 'https://github.com/quarkcms'
                                            },
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    },
}
  