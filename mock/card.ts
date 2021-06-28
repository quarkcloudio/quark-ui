export default {

    // 基础卡片实例
    'GET /api/card/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '基础卡片',
                body: {
                    component: "card",
                    title: '基础卡片',
                    extra: 'extra',
                    tooltip: '这里是提示',
                    body: "这个是基础卡片实例"
                }
            }
        }
    },

    // 栅格布局实例
    'GET /api/card/grid': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '栅格布局',
                body: [
                    {
                        component: "card",
                        ghost: true,
                        gutter: 8,
                        body: [
                            {
                                component: "card",
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 24"
                            },
                            {
                                component: "card",
                                colSpan: 12,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 12"
                            },
                            {
                                component: "card",
                                colSpan: 8,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 8"
                            },
                        ]
                    },
                    {
                        component: "card",
                        title: "24栅格",
                        style:{
                            marginTop:8
                        },
                        gutter: 8,
                        body: [
                            {
                                component: "card",
                                colSpan: 12,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 12"
                            },
                            {
                                component: "card",
                                colSpan: 6,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 6"
                            },
                            {
                                component: "card",
                                colSpan: 6,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 6"
                            },
                        ]
                    },
                    {
                        component: "card",
                        gutter: 8,
                        style:{
                            marginTop:8
                        },
                        ghost:true,
                        body: [
                            {
                                component: "card",
                                colSpan: '200px',
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 200px"
                            },
                            {
                                component: "card",
                                layout: 'center',
                                bordered: true,
                                body: "Auto"
                            }
                        ]
                    }
                ]
            }
        }
    },

}
  