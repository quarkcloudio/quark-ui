export default {
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
        body: {
            type: "container",
            style: {
                "backgroundColor": "#C4C4C4"
            },
            body: "这里是容器内容区"
        }
    },
  }
  