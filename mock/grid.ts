export default {

    // 基础栅格实例
    'GET /api/grid/index': {
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '基础栅格',
                body: {
                    type: "card",
                    body: [
                        {
                            type: "row",
                            body: {
                                type: "col",
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
                            type: "row",
                            style: {
                                marginTop:"20px",
                            },
                            body: [
                                {
                                    type: "col",
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
                                    type: "col",
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
                            type: "row",
                            style: {
                                marginTop:"20px",
                            },
                            body: [
                                {
                                    type: "col",
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
                                    type: "col",
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
                                    type: "col",
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
                            type: "row",
                            style: {
                                marginTop:"20px",
                            },
                            body: [
                                {
                                    type: "col",
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
                                    type: "col",
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
                                    type: "col",
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
                                    type: "col",
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
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '区块间隔',
                body: {
                    type: "card",
                    body: [
                        {
                            type: "row",
                            gutter: 16,
                            body: [
                                {
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                            type: "row",
                            style: {marginTop:'20px'},
                            gutter: { xs: 8, sm: 16, md: 24, lg: 32 },
                            body: [
                                {
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                            type: "row",
                            style: {marginTop:'20px'},
                            gutter: [16, 24],
                            body: [
                                {
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    body: {
                                        type: "container",
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
        type: "page",
        style: {
            height: '100vh',
        },
        body: {
            type: "layout",
            cache: true,
            body: {
                type: "pageContainer",
                title: '左右偏移',
                body: {
                    type: "card",
                    body: [
                        {
                            type: "row",
                            body: [
                                {
                                    type: "col",
                                    span: 8,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 8,
                                    offset: 8,
                                    body: {
                                        type: "container",
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
                            type: "row",
                            style: {marginTop:'20px'},
                            body: [
                                {
                                    type: "col",
                                    span: 6,
                                    offset: 6,
                                    body: {
                                        type: "container",
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
                                    type: "col",
                                    span: 6,
                                    offset: 6,
                                    body: {
                                        type: "container",
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
                            type: "row",
                            style: {marginTop:'20px'},
                            body: [
                                {
                                    type: "col",
                                    span: 12,
                                    offset: 6,
                                    body: {
                                        type: "container",
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
  