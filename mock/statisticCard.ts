export default {

    // 基础指标卡
    'GET /api/statisticCard/index': {
        component: "page",
        style: {
            height: '100vh',
        },
        body: {
            component: "layout",
            cache: true,
            body: {
                component: "pageContainer",
                title: '基础指标卡',
                body: {
                    component: "statisticCard",
                    title: '基础指标卡',
                    extra: 'extra',
                    tooltip: '这里是提示',
                    headerBordered:true,
                    statistic: {
                        value: 1102893,
                        prefix: '¥',
                        description: '这里是描述信息',
                    },
                    chart: {
                        component: "line",
                        data: [
                            {
                              "Date": "2010-01",
                              "scales": 1998
                            },
                            {
                              "Date": "2010-02",
                              "scales": 1850
                            },
                            {
                              "Date": "2010-03",
                              "scales": 1720
                            },
                            {
                              "Date": "2010-04",
                              "scales": 1818
                            }
                        ],
                        padding: 'auto',
                        xField: 'Date',
                        yField: 'scales',
                        xAxis: { tickCount: 5 },
                        smooth: true
                    }
                }
            }
        }
    },
}
  