export default {

    // 行为实例
    'GET /api/action/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '行为按钮',
                body: {
                    type: "card",
                    title: '行为按钮',
                    headerBordered: true,
                    body: [
                        {
                            type: "row",
                            body: {
                                type: "col",
                                span: 24,
                                style: {
                                    padding:"16px 0",
                                },
                                body: {
                                    type: "space",
                                    body: [
                                        {
                                            type: "action",
                                            label: "Default Button",
                                            showStyle: 'default',
                                        },
                                        {
                                            type: "action",
                                            label: "Primary Button",
                                            showStyle: 'primary'
                                        },
                                        {
                                            type: "action",
                                            label: "Dashed Button",
                                            showStyle: 'dashed'
                                        },
                                        {
                                            type: "action",
                                            label: "Text Button",
                                            showStyle: 'text'
                                        },
                                        {
                                            type: "action",
                                            label: "Link Button",
                                            showStyle: 'link'
                                        },
                                        {
                                            type: "action",
                                            label: "Primary Button",
                                            showStyle: 'primary',
                                            danger: true,
                                            ghost: true
                                        },
                                    ]
                                }
                            }
                        },
                        {
                            type: "row",
                            body: {
                                type: "col",
                                span: 24,
                                style: {
                                    padding:"16px 0",
                                },
                                body: {
                                    type: "space",
                                    body: [
                                        {
                                            type: "action",
                                            label: "Ajax Button",
                                            showStyle: 'default',
                                            actionType: 'ajax',
                                            api: 'http://www.baidu.com'
                                        },
                                        {
                                            type: "action",
                                            label: "Button With Confirm",
                                            showStyle: 'default',
                                            actionType: 'ajax',
                                            api: 'http://www.baidu.com',
                                            redirect: './index',
                                            confirmTitle:'系统消息',
                                            confirmText:'确认要操作吗？',
                                            confirmType: 'modal'
                                        },
                                        {
                                            type: "action",
                                            label: "Button With popConfirm",
                                            showStyle: 'default',
                                            actionType: 'ajax',
                                            api: 'http://www.baidu.com',
                                            reload: 'table',
                                            confirmTitle:'确认要操作吗？',
                                            confirmType: 'pop'
                                        },
                                        {
                                            type: "action",
                                            label: "Link Button",
                                            showStyle: 'link',
                                            actionType: 'link',
                                            href: 'http://www.baidu.com',
                                            target: '_blank'
                                        },
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
}
  