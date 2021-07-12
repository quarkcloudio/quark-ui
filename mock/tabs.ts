export default {

    // 基础标签页实例
    'GET /api/tabs/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '基础标签页',
                body: {
                    component: "tabs",
                    defaultActiveKey: "tab1",
                    tabPanes: [
                        {
                            key: 'tab1',
                            title: "选项卡1",
                            body: "选项卡内容1"
                        },
                        {
                            key: 'tab2',
                            title: "选项卡2",
                            body: "选项卡内容2"
                        },
                        {
                            key: 'tab3',
                            title: "选项卡3",
                            body: "选项卡内容3"
                        }
                    ]
                }
            }
        }
    },

}
  