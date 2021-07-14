export default {
    // 微前端
    'GET /api/microApp/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "microApp",
                name: 'app1'
            }
        }
    }
}
  