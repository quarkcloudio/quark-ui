export default {

    // 表单实例
    'GET /api/form/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '基础表单',
                body: {
                    type: "card",
                    title: '基础表单',
                    headerBordered: true,
                    body: {
                        type: "form",
                        api: 'https://www.baidu.com',
                        layout: "horizontal",
                        labelCol:{ span: 2 },
                        wrapperCol: { span: 22 },
                        items: [
                            {
                                type: "text",
                                label: "用户名",
                                name: "username",
                                style: {width: 200}
                            },
                            {
                                type: "password",
                                label: "密码",
                                name: "password",
                                style: {width: 200}
                            },
                        ]
                    }
                }
            }
        }
    },
}
  