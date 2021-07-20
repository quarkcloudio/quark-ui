export default {

    // layout
    'GET /api/layout/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        data: {
            love: 'haha',
            status: 0
        },
        body: {
            component: "layout",
            // 模板用法，参考https://lodash.com/docs/4.17.15#template
            body: "这里是容器内容区${love} 确定要<%= (status==1 ? '禁用' : '启用') %>数据吗？"
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
  