export default {

    // 表单实例
    'GET /api/list/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '基础列表',
                body: {
                    component: "card",
                    title: '基础列表',
                    headerBordered: true,
                    body: {
                        component: "list",
                        key: 'list', // 组件唯一标识，必须填写
                        api: 'list/datasource',
                        apiType: 'GET',
                        headerTitle: '标题',
                        subTitle: '子标题',
                        tooltip: '基础列表的配置',
                        showActions: 'hover',
                        showExtra: 'hover',
                        toolBar: {
                            component: "toolBar",
                            actions: [ // 可以渲染任何quark ui的组件
                                {
                                    component: "action",
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
                        },
                        metas: {
                            title: {
                                dataIndex: 'title',
                                title: '标题',
                            },
                            description: {
                                dataIndex: 'time',
                                copyable: true,
                            },
                            actions: [
                                {
                                    component: "action",
                                    actionType: "link",
                                    href: "#/index?api=admin/admin/edit",
                                    key: "f7bfcafc6c8f518eeda694b0d729bf12",
                                    label: "编辑",
                                    reload: "table",
                                    showStyle: "primary",
                                    size: "default",
                                    target: "_self"
                                }
                            ],
                        }
                    }
                }
            }
        }
    },

    // 表格数据接口
    'GET /api/list/datasource': {
        data: {
            datasource : [
                {
                    title: 'test',
                    time: "2008-01-02"
                },
                {
                    title: 'test',
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
  