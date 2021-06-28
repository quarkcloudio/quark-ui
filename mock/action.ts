export default {

    // 行为实例
    'GET /api/action/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        data: {
            testId:1
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '行为按钮',
                body: {
                    component: "card",
                    title: '行为按钮',
                    headerBordered: true,
                    body: [
                        {
                            component: "row",
                            body: [
                                {
                                    component: "col",
                                    span: 24,
                                    style: {
                                        padding:"16px 0",
                                    },
                                    body: [
                                        {
                                            component: 'divider',
                                            orientation: 'left',
                                            body: '按钮类型'
                                        },
                                        {
                                            component: 'paragraph',
                                            body: '按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。'
                                        }
                                    ]
                                },
                                {
                                    component: "col",
                                    span: 24,
                                    style: {
                                        padding:"16px 0",
                                    },
                                    body: {
                                        component: "space",
                                        body: [
                                            {
                                                component: "action",
                                                label: "Default Button",
                                                showStyle: 'default',
                                            },
                                            {
                                                component: "action",
                                                label: "Primary Button",
                                                showStyle: 'primary'
                                            },
                                            {
                                                component: "action",
                                                label: "Dashed Button",
                                                showStyle: 'dashed'
                                            },
                                            {
                                                component: "action",
                                                label: "Text Button",
                                                showStyle: 'text'
                                            },
                                            {
                                                component: "action",
                                                label: "Link Button",
                                                showStyle: 'link'
                                            },
                                            {
                                                component: "action",
                                                label: "Primary Button",
                                                showStyle: 'primary',
                                                danger: true,
                                                ghost: true
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            component: "row",
                            body: [
                                {
                                    component: "col",
                                    span: 24,
                                    style: {
                                        padding:"16px 0",
                                    },
                                    body: [
                                        {
                                            component: 'divider',
                                            orientation: 'left',
                                            body: '按钮事件'
                                        }
                                    ]
                                },
                                {
                                    component: "col",
                                    span: 24,
                                    style: {
                                        padding:"16px 0",
                                    },
                                    body: {
                                        component: "space",
                                        body: [
                                            {
                                                component: "action",
                                                label: "Ajax Button",
                                                showStyle: 'default',
                                                actionType: 'ajax',
                                                api: 'http://www.baidu.com'
                                            },
                                            {
                                                component: "action",
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
                                                component: "action",
                                                label: "Button With popConfirm",
                                                showStyle: 'default',
                                                actionType: 'ajax',
                                                api: 'http://www.baidu.com',
                                                reload: 'table',
                                                confirmTitle:'确认要操作吗？',
                                                confirmType: 'pop'
                                            },
                                            {
                                                component: "action",
                                                label: "Button Api With Tpl",
                                                showStyle: 'default',
                                                actionType: 'ajax',
                                                api: 'http://www.baidu.com?actionId={testId}',
                                                redirect: './index',
                                                confirmTitle:'系统消息',
                                                confirmText:'确认要操作吗？',
                                                confirmType: 'modal'
                                            },
                                            {
                                                component: "action",
                                                label: "Link Button",
                                                showStyle: 'link',
                                                actionType: 'link',
                                                href: 'http://www.baidu.com',
                                                target: '_blank'
                                            },
                                            {
                                                component: "action",
                                                label: "Modal Form Button",
                                                actionType: 'modal',
                                                modal: {
                                                    title: "一个弹框",
                                                    body: [
                                                        {
                                                            component: "form",
                                                            api: "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
                                                            items: [
                                                                {
                                                                    component: "text",
                                                                    label: "用户名",
                                                                    name: "username",
                                                                    style: {width: 200}
                                                                },
                                                                {
                                                                    component: "password",
                                                                    label: "密码",
                                                                    name: "password",
                                                                    style: {width: 200}
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        }
    },
}
  