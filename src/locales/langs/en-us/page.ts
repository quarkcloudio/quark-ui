const page: App.I18n.Schema['translation']['page'] = {
  home: {
    creativity: 'Creativity',
    dealCount: 'Deal Count',
    downloadCount: 'Download Count',
    entertainment: 'Entertainment',
    greeting: 'Good morning, {{username}}, today is another day full of vitality!',
    message: 'Message',
    projectCount: 'Project Count',
    projectNews: {
      desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
      desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
      desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
      desc4: 'Soybean is busy writing project documentation for soybean-admin!',
      desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!',
      moreNews: 'More News',
      title: 'Project News'
    },
    registerCount: 'Register Count',
    rest: 'Rest',
    schedule: 'Work and rest Schedule',
    study: 'Study',
    todo: 'Todo',
    turnover: 'Turnover',
    visitCount: 'Visit Count',
    weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
    work: 'Work'
  },
  login: {
    bindWeChat: {
      title: 'Bind WeChat'
    },
    codeLogin: {
      getCode: 'Get verification code',
      imageCodePlaceholder: 'Please enter image verification code',
      reGetCode: 'Reacquire after {{time}}s',
      sendCodeSuccess: 'Verification code sent successfully',
      title: 'Verification Code Login'
    },
    common: {
      back: 'Back',
      codeLogin: 'Verification code login',
      codePlaceholder: 'Please enter verification code',
      confirm: 'Confirm',
      confirmPasswordPlaceholder: 'Please enter password again',
      loginOrRegister: 'Login / Register',
      loginSuccess: 'Login successfully',
      passwordPlaceholder: 'Please enter password',
      phonePlaceholder: 'Please enter phone number',
      usernamePlaceholder: 'Please enter user name',
      validateSuccess: 'Verification passed',
      welcomeBack: 'Welcome back, {{username}} !'
    },
    pwdLogin: {
      admin: 'Admin',
      forgetPassword: 'Forget password?',
      otherAccountLogin: 'Other Account Login',
      otherLoginMode: 'Other Login Mode',
      register: 'Register',
      rememberMe: 'Remember me',
      superAdmin: 'Super Admin',
      title: 'Password Login',
      user: 'User'
    },
    register: {
      agreement: 'I have read and agree to',
      policy: '《Privacy Policy》',
      protocol: '《User Agreement》',
      title: 'Register'
    },
    resetPwd: {
      title: 'Reset Password'
    }
  }
};

export default page;
