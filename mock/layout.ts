export default {

    // page
    'GET /api/layout/page': {
        type: "page",
        body: "这里是容器内容区"
    },

    // layout
    'GET /api/layout/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        data: {
            love: 'haha'
        },
        body: {
            type: "layout",
            body: "这里是容器内容区{love}"
        }
    },

    // container
    'GET /api/layout/container': {
        type: "page",
        style: {
            "margin": "0px"
        },
        data: {
            love: 'haha'
        },
        body: {
            type: "container",
            style: {
                "backgroundColor": "#C4C4C4"
            },
            body: "这里是容器内容区{love}"
        }
    },

    // 仪表盘实例
    'GET /api/dashboard/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            body: {
                type: "pageContainer",
                title: '标题',
                body: "这个是仪表盘实例"
            }
        }
    },
}
  