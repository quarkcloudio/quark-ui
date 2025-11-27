const page: App.I18n.Schema['translation']['page'] = {
  home: {
    creativity: '创意',
    dealCount: '成交量',
    downloadCount: '下载量',
    entertainment: '娱乐',
    greeting: '早安，{{username}}, 今天又是充满活力的一天!',
    message: '消息',
    projectCount: '项目数',
    projectNews: {
      desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
      desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
      desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
      desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
      desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！',
      moreNews: '更多动态',
      title: '项目动态'
    },
    registerCount: '注册量',
    rest: '休息',
    schedule: '作息安排',
    study: '学习',
    todo: '待办',
    turnover: '成交额',
    visitCount: '访问量',
    weatherDesc: '今日多云转晴，20℃ - 25℃!',
    work: '工作'
  },
  login: {
    bindWeChat: {
      title: '绑定微信'
    },
    codeLogin: {
      getCode: '获取验证码',
      imageCodePlaceholder: '请输入图片验证码',
      reGetCode: '{{time}}秒后重新获取',
      sendCodeSuccess: '验证码发送成功',
      title: '验证码登录'
    },
    common: {
      back: '返回',
      codeLogin: '验证码登录',
      codePlaceholder: '请输入验证码',
      confirm: '确定',
      confirmPasswordPlaceholder: '请再次输入密码',
      loginOrRegister: '登录 / 注册',
      loginSuccess: '登录成功',
      passwordPlaceholder: '请输入密码',
      phonePlaceholder: '请输入手机号',
      usernamePlaceholder: '请输入用户名',
      validateSuccess: '验证成功',
      welcomeBack: '欢迎回来，{{username}} ！'
    },
    pwdLogin: {
      admin: '管理员',
      forgetPassword: '忘记密码？',
      otherAccountLogin: '其他账号登录',
      otherLoginMode: '其他登录方式',
      register: '注册账号',
      rememberMe: '记住我',
      superAdmin: '超级管理员',
      title: '密码登录',
      user: '普通用户'
    },
    register: {
      agreement: '我已经仔细阅读并接受',
      policy: '《隐私权政策》',
      protocol: '《用户协议》',
      title: '注册账号'
    },
    resetPwd: {
      title: '重置密码'
    }
  }
};

export default page;
