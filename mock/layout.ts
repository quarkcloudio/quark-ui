export default {

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

    // page
    'GET /api/layout/page': {
        type: "page",
        body: "这里是容器内容区"
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
}
  