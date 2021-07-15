export default {

    // layout
    'GET /api/layout/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        data: {
            love: 'haha'
        },
        body: {
            component: "layout",
            body: "这里是容器内容区{love}"
        }
    },

    // page
    'GET /api/layout/page': {
        component: "page",
        body: "这里是容器内容区"
    },

    // container
    'GET /api/layout/container': {
        component: "page",
        style: {
            "margin": "0px"
        },
        data: {
            love: 'haha'
        },
        body: {
            component: "container",
            style: {
                "backgroundColor": "#C4C4C4"
            },
            body: "这里是容器内容区{love}"
        }
    },
}
  