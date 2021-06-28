export default {
    
    // 登录页面
    'GET /api/login/index': {
        component: "page",
        body: {
            component: "login",
            api: 'login',
            redirect: '/index?api=layout/container',
            title: "QuarkCMS",
            description: "信息丰富的世界里，唯一稀缺的就是人类的注意力",
            captchaUrl: "https://admin.quarkcms.com/api/admin/captcha",
            copyright: '2020 QuarkCMS',
            links:[
                {
                    title : 'Quark',
                    href : 'http://www.quarkcms.com/'
                },
                {
                    title : '爱小圈',
                    href : 'http://www.ixiaoquan.com'
                },
                {
                    title : 'Github',
                    href : 'https://github.com/quarkcms'
                }
            ]
        }
    },

    // 登录页面
    'POST /api/login': {
        data: {
            id: 1,
            nickname: "超级管理员",
            token: "z9K2NMi6fHEjbcY7jspQy4Sc8YlazcxkLWeVA9tUNVRinXz2kjQzP4MveYpztp8CoAM2qAlkE3V2vPFcKh6oj4jfxaJ0RezemWcKkGKvoXXsSsWbrznUehC4bmSecuN2U7nqI3oLlc37dKjPSAyaLEIjuzxbbatWLJQEQdEOuy0n0omjTWVM8yxLTHtmd2U5W2fThaPdASaQvcye5zu2WpmqC5ywBF4lHrVVR6yO1nA7cfULw3VxOgnpeynmEkrTAfUj7cg01HFg3G7Cig4RD2Yjjt0o0FopH49efbx1PEgnn55HtAXyFKv8GULsNCQxrUx1DpiPmOAaYrcZtNBPr8fLnSCS1z5niPNEXN43TFYhgGMncpjfGJlDT81ssxN0Izy3d7YsLsg3Xrq200HknFD7LMVYq9osIbD3iQIIZy4BI4vus6Tu0WJr5heu8eKklRkfE2sf0D3TQ2WDFj3elXG4SVdJGrzmDxw05QjFgluGbOUNOQ5ieJpVVG4DgHstFy6nqN0U5l26yyCR26gECNkExFxD9bmiV0NXmrzBB2ufwKExmQS53Ii3bZhiuzSwrtJ4mjbYTiPtRGq7JkxSun643zwLPxYlpytsIrHTSNqj7EVjtBoJzUZm2kH1rh8ZoCxdmBL896awyWdTD9UC9HIJDFFV3cqla66SMG8NQCn0dcmaKPLuIFnrj7SN6vNvUlDSCnsyCn4Oy69hod232fSdmi3qPUbLr37dnPwHSOBEYk10UEowN6WsndNcxIML2w1NsSkYWGSHG2bV58RG6WgImA0mqg6XEfG2wPyoWW7KBLKFQJJ6cNjFEDlAMNiwjeqisGrR1S1xgspBZOR63HZy6w8F1zDL5b7IwKOHG0Fg3YTeB0XyNxPLeS4RtjPXLqikJ4IjUe1m7hxfDUX5WBGvmjKFBgicPmbxP3EE4vYZr7icUYdiQ8",
            username: "administrator"
        },
        msg: "登录成功！",
        status: "success",
        url: "",
    },
}
  