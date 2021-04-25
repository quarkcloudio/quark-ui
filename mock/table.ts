export default {

    // 表单实例
    'GET /api/table/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '基础表格',
                body: {
                    type: "card",
                    title: '基础表格',
                    headerBordered: true,
                    body: {
                        type: "table",
                        api: 'table/datasource',
                        columns: [
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },
                            {
                                title: 'time',
                                dataIndex: 'time',
                            },
                        ]
                    }
                }
            }
        }
    },

    // 表格数据接口
    'GET /api/table/datasource': {
        data: {
            datasource : [
                {
                    name: 'test',
                    time: "2008-01-02"
                },
                {
                    name: 'test',
                    time: "2008-01-02"
                }
            ],
            pagination: {
                defaultCurrent: 1,
                current: 1,
                pageSize: 100,
                total: 3
            }
        },
        msg: "登录成功！",
        status: "success"
    },
}
  