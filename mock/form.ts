export default {

    // 表单实例
    'GET /api/form/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '基础表单',
                body: {
                    component: "card",
                    title: '基础表单',
                    headerBordered: true,
                    body: {
                        component: "form",
                        api: 'https://www.baidu.com',
                        initApi: 'form/initData',
                        layout: "horizontal",
                        labelCol:{ span: 2 },
                        wrapperCol: { span: 22 },
                        body: [
                            {
                                component: "textField",
                                label: "用户名",
                                name: "username",
                                style: { width: 200 },
                                when: {
                                    component: "when",
                                    items: [
                                        {
                                            condition: "<%=(['love','tt'].indexOf(username) !=-1) %>",
                                            body: [
                                                {
                                                    component: "text",
                                                    body: "您输入的用户名中包含了${username}字符串",
                                                },
                                            ]
                                        },
                                        {
                                            condition: "<%=username === 'abcd' %>",
                                            body: [
                                                {
                                                    component: "textField",
                                                    label: "ABCD",
                                                    name: "abcd",
                                                    style: { width: 200 }
                                                },
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        }
    },
    // 表单数据接口
    'GET /api/form/initData': {
        data: {
            username: 'test',
            password: "123456"
        },
        msg: "获取成功！",
        status: "success"
    },
}
  