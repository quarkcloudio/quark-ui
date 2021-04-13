export default {

    // 基础卡片实例
    'GET /api/card/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '基础卡片',
                body: {
                    type: "card",
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
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '栅格布局',
                body: [
                    {
                        type: "card",
                        ghost: true,
                        gutter: 8,
                        body: [
                            {
                                type: "card",
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 24"
                            },
                            {
                                type: "card",
                                colSpan: 12,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 12"
                            },
                            {
                                type: "card",
                                colSpan: 8,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 8"
                            },
                        ]
                    },
                    {
                        type: "card",
                        title: "24栅格",
                        style:{
                            marginTop:8
                        },
                        gutter: 8,
                        body: [
                            {
                                type: "card",
                                colSpan: 12,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 12"
                            },
                            {
                                type: "card",
                                colSpan: 6,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 6"
                            },
                            {
                                type: "card",
                                colSpan: 6,
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 6"
                            },
                        ]
                    },
                    {
                        type: "card",
                        gutter: 8,
                        style:{
                            marginTop:8
                        },
                        ghost:true,
                        body: [
                            {
                                type: "card",
                                colSpan: '200px',
                                layout: 'center',
                                bordered: true,
                                body: "colSpan - 200px"
                            },
                            {
                                type: "card",
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
  