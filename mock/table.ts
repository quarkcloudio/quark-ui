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
                        key: 'table', // 组件唯一标识，必须填写
                        api: 'table/datasource',
                        apiType: 'GET',
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

    // 搜索栏
    'GET /api/table/search': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '搜索栏',
                body: {
                    type: "card",
                    title: '搜索栏',
                    headerBordered: true,
                    body: {
                        type: "table",
                        key: 'table', // 组件唯一标识，必须填写
                        api: 'table/datasource',
                        apiType: 'GET',
                        columns: [
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },
                            {
                                title: 'time',
                                dataIndex: 'time',
                            },
                        ],
                        autoBuildSearchFrom: false, // 关闭自动创建搜索栏
                        search:{
                            dateFormatter: "string",
                            defaultCollapsed: true,
                            defaultColsNumber: 2,
                            hideRequiredMark: true,
                            items: [
                                {
                                    label: "用户名",
                                    name: "username",
                                    placeholder: "请输入用户名",
                                    type: "input",
                                },
                                {
                                    label: "状态",
                                    name: "status",
                                    options: [
                                        {label: "正常", value: "on"},
                                        {label: "禁用", value: "off"}
                                    ],
                                    placeholder: "请选择状态",
                                    type: "select"
                                },
                                {
                                    label: "登录时间",
                                    name: "last_login_time",
                                    operator: "between",
                                    placeholder: ["开始登录时间", "结束登录时间"],
                                    type: "datetime"
                                }
                            ],
                            labelAlign: "right",
                            labelWidth: 98,
                            size: "default",
                            split: false,
                        }
                    }
                }
            }
        }
    },

    // 工具栏
    'GET /api/table/tool': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '工具栏',
                body: {
                    type: "card",
                    title: '工具栏',
                    headerBordered: true,
                    body: {
                        type: "table",
                        key: 'table', // 组件唯一标识，必须填写
                        api: 'table/datasource',
                        apiType: 'GET',
                        columns: [
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },
                            {
                                title: 'time',
                                dataIndex: 'time',
                            },
                        ],
                        toolBar: {
                            type: "toolBar",
                            actions: [ // 可以渲染任何quark ui的组件
                                {
                                    type: "action",
                                    actionType: "link",
                                    api: "admin/admin/action/create-link?id={id}",
                                    href: "#/index?api=admin/admin/create",
                                    icon: "icon-plus-circle",
                                    key: "f7bfcafc6c8f518eeda694b0d729bf12",
                                    label: "创建管理员",
                                    reload: "table",
                                    showStyle: "primary",
                                    size: "default",
                                    target: "_self"
                                }
                            ],
                            description: '描述信息',
                            multipleLine: false,
                            subTitle: '子标题',
                            title: "管理员列表",
                        }
                    }
                }
            }
        }
    },

    // 批量操作
    'GET /api/table/batchAction': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '批量操作',
                body: {
                    type: "card",
                    title: '批量操作',
                    headerBordered: true,
                    body: {
                        type: "table",
                        key: 'table', // 组件唯一标识，必须填写
                        api: 'table/datasource',
                        apiType: 'GET',
                        rowKey: "id",
                        rowSelection: [],
                        columns: [
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },
                            {
                                title: 'time',
                                dataIndex: 'time',
                            },
                        ],
                        batchActions: [
                            {
                                actionType: "ajax",
                                api: "admin/admin/action/delete?id={id}",
                                confirmText: "删除后数据将无法恢复，请谨慎操作！",
                                confirmTitle: "确定要删除吗？",
                                confirmType: "modal",
                                label: "批量删除",
                                reload: "table",
                                showStyle: "link",
                                size: "small",
                                type: "action"
                            }
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
                    id: 1,
                    name: 'test',
                    time: "2008-01-02"
                },
                {
                    id: 2,
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
        msg: "获取成功！",
        status: "success"
    },
}
  