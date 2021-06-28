export default {

    // 基础栅格实例
    'GET /api/grid/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '基础栅格',
                body: {
                    component: "card",
                    body: [
                        {
                            component: "row",
                            body: {
                                component: "col",
                                span: 24,
                                style: {
                                    padding:"16px 0",
                                    background: "rgba(0,146,255,.75)",
                                    textAlign:"center",
                                    color:'#fff'
                                },
                                body: "col-24"
                            }
                        },
                        {
                            component: "row",
                            style: {
                                marginTop:"20px",
                            },
                            body: [
                                {
                                    component: "col",
                                    span: 12,
                                    style: {
                                        padding:"16px 0",
                                        background: "rgba(0,146,255,.75)",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-12"
                                },
                                {
                                    component: "col",
                                    span: 12,
                                    style: {
                                        padding:"16px 0",
                                        background: "#0092ff",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-12"
                                }
                            ]
                        },
                        {
                            component: "row",
                            style: {
                                marginTop:"20px",
                            },
                            body: [
                                {
                                    component: "col",
                                    span: 8,
                                    style: {
                                        padding:"16px 0",
                                        background: "rgba(0,146,255,.75)",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-8"
                                },
                                {
                                    component: "col",
                                    span: 8,
                                    style: {
                                        padding:"16px 0",
                                        background: "#0092ff",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-8"
                                },
                                {
                                    component: "col",
                                    span: 8,
                                    style: {
                                        padding:"16px 0",
                                        background: "rgba(0,146,255,.75)",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-8"
                                }
                            ]
                        },
                        {
                            component: "row",
                            style: {
                                marginTop:"20px",
                            },
                            body: [
                                {
                                    component: "col",
                                    span: 6,
                                    style: {
                                        padding:"16px 0",
                                        background: "rgba(0,146,255,.75)",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-6"
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    style: {
                                        padding:"16px 0",
                                        background: "#0092ff",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-6"
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    style: {
                                        padding:"16px 0",
                                        background: "rgba(0,146,255,.75)",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-6"
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    style: {
                                        padding:"16px 0",
                                        background: "#0092ff",
                                        textAlign:"center",
                                        color:'#fff'
                                    },
                                    body: "col-6"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    },

    // 区块间隔
    'GET /api/grid/gutter': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '区块间隔',
                body: {
                    component: "card",
                    body: [
                        {
                            component: "row",
                            gutter: 16,
                            body: [
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                }
                            ]
                        },
                        {
                            component: "row",
                            style: {marginTop:'20px'},
                            gutter: { xs: 8, sm: 16, md: 24, lg: 32 },
                            body: [
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                }
                            ]
                        },
                        {
                            component: "row",
                            style: {marginTop:'20px'},
                            gutter: [16, 24],
                            body: [
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                }
                            ]
                        }
                    ]
                }
            }
        }
    },

    // 左右偏移
    'GET /api/grid/offset': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '左右偏移',
                body: {
                    component: "card",
                    body: [
                        {
                            component: "row",
                            body: [
                                {
                                    component: "col",
                                    span: 8,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-8"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 8,
                                    offset: 8,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-8"
                                    },
                                }
                            ]
                        },
                        {
                            component: "row",
                            style: {marginTop:'20px'},
                            body: [
                                {
                                    component: "col",
                                    span: 6,
                                    offset: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6 col-offset-6"
                                    },
                                },
                                {
                                    component: "col",
                                    span: 6,
                                    offset: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6 col-offset-6"
                                    },
                                }
                            ]
                        },
                        {
                            component: "row",
                            style: {marginTop:'20px'},
                            body: [
                                {
                                    component: "col",
                                    span: 12,
                                    offset: 6,
                                    body: {
                                        component: "container",
                                        style: {
                                            padding:"16px 0",
                                            background: "#0092ff",
                                            textAlign:"center",
                                            color:'#fff'
                                        },
                                        body: "col-6"
                                    },
                                }
                            ]
                        }
                    ]
                }
            }
        }
    },

}
  