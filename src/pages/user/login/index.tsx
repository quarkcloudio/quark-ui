import React, { useState } from 'react';
import { message } from 'antd';
import { Link, SelectLang, useModel, history, History } from 'umi';
import logo from '@/assets/logo.svg';
import { accountLogin } from '@/services/quark';
import Footer from '@/components/Footer';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, Username, Password, Mobile, Captcha, ImageCaptcha, Submit } = LoginFrom;

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace('/');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('account');
  const quarkInfo = initialState.quarkInfo;

  /**
   * 用户登录
   */
  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const result = await accountLogin({ ...values, type });
      if (result.status === 'success' && initialState) {
        message.success(result.msg);
        const accountInfo = await initialState?.fetchUserInfo();
        setInitialState({
          ...initialState,
          accountInfo,
        });
        // 记录登录凭据
        sessionStorage.setItem('token', result.data.token);
        replaceGoto();
        return;
      } else {
        message.error(result.msg);
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={quarkInfo.logo ? quarkInfo.logo : logo} />
              <span className={styles.title}>{quarkInfo.name ? quarkInfo.name : 'QuarkCMS'}</span>
            </Link>
          </div>
          <div className={styles.desc}>{quarkInfo.name ? quarkInfo.description : '信息丰富的世界里，唯一稀缺的就是人类的注意力'}</div>
        </div>

        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="account" tab="账户密码登录">
              <Username
                name="username"
                placeholder="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
              <ImageCaptcha
                name="captcha"
                placeholder="图形验证码"
                rules={[
                  {
                    required: true,
                    message: '请输入图形验证码！',
                  },
                ]}
              />
            </Tab>
            <Tab key="mobile" tab="手机号登录">
              <Mobile
                name="mobile"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ImageCaptcha
                name="captcha"
                placeholder="图形验证码"
                rules={[
                  {
                    required: true,
                    message: '请输入图形验证码！',
                  },
                ]}
              />
              <Captcha
                name="code"
                placeholder="验证码"
                countDown={120}
                getCaptchaButtonText=""
                getCaptchaSecondText="秒"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              />
            </Tab>
            <Submit loading={submitting}>登录</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
