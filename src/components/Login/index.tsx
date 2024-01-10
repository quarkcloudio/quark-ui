import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Divider, message, Tabs } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useModel, useLocation, Helmet, history } from '@umijs/max';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import Action from '@/components/Action';
import ProFormImageCaptcha from '@/components/Form/ProField/ProFormImageCaptcha';
import ProFormSmsCaptcha from '@/components/Form/ProField/ProFormSmsCaptcha';
import { flushSync } from 'react-dom';
import qs from 'query-string';
import { post } from '@/services/action';
import defaultLogo from '@/assets/logo.png';

type LoginType = 'phone' | 'account';
type ActivityConfigType =
  | {
      title?: React.ReactNode;
      subTitle?: React.ReactNode;
      action?: React.ReactNode;
      style?: CSSProperties | undefined;
    }
  | undefined;

export interface LoginProps {
  component?: string;
  componentkey?: string;
  logo?: React.ReactNode;
  title?:
    | string
    | (React.ReactElement<any, string | React.JSXElementConstructor<any>> &
        string)
    | (React.ReactFragment & string)
    | (React.ReactPortal & string)
    | undefined;
  subTitle?: React.ReactNode;
  backgroundImageUrl?: string | undefined;
  activityConfig?: ActivityConfigType;
  actions?: any;
  captchaUrl?: string | undefined;
  captchaIdUrl?: string | undefined;
  api?: string;
  loginType?: Array<LoginType>;
  redirect?: string;
}

const defaultProps = {
  componentkey: 'form',
  logo: '',
  title: 'QuarkCMS',
  subTitle: '信息丰富的世界里，唯一稀缺的就是人类的注意力',
  backgroundImageUrl:
    'https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png',
  activityConfig: undefined,
  actions: undefined,
  captchaUrl: undefined,
  captchaIdUrl: undefined,
  api: '',
  loginType: ['account'],
  redirect: '',
} as LoginProps;

const Login: React.FC<LoginProps> = (props) => {
  const {
    componentkey,
    logo,
    title,
    subTitle,
    backgroundImageUrl,
    activityConfig,
    actions,
    captchaUrl,
    captchaIdUrl,
    api,
    loginType,
    redirect,
  } = { ...defaultProps, ...props };
  const location = useLocation();
  const query = qs.parse(location.search);
  const [loginTypeActive, setLoginType] = useState<LoginType>(
    loginType ? loginType[0] : 'account',
  );
  const [innerCaptchaUrl, setInnerCaptchaUrl] = useState(captchaUrl);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { object, setObject } = useModel('object'); // 全局对象
  const formRef = useRef<ProFormInstance<any>>();

  const formKey = componentkey ? componentkey : 'form';
  object[formKey] = formRef;
  setObject(object);

  useEffect(() => {
    onSetInnerCaptchaUrl();
  }, []);

  // 跳转到 redirect 参数所在的位置
  const replaceGoto = (redirectUrl: string = '') => {
    setTimeout(() => {
      const { redirect } = query as { redirect: string };
      if (!redirect) {
        history.replace(redirectUrl);
        return;
      }
      history.replace(redirect);
    }, 10);
  };

  // 刷新图形验证码
  const onSetInnerCaptchaUrl = async () => {
    setInnerCaptchaUrl(captchaUrl + '?random=' + Math.random());
  };

  // 提交表单
  const onFinish = async (values: any) => {
    try {
      const result = await post({
        url: api,
        data: { ...values, loginType: loginTypeActive },
      });

      if (result.type === 'success') {
        // 记录登录凭据
        localStorage.setItem('token', result.data.token);

        // 清空layout
        sessionStorage.removeItem('layout');

        // 获取用户信息
        const accountInfo = initialState?.getAccountInfo?.();
        if (accountInfo) {
          flushSync(() => {
            setInitialState((s: any) => ({
              ...s,
              accountInfo: accountInfo,
            }));
          });
        }

        // 弹出消息
        message.success(result.content);

        // 跳转页面
        replaceGoto(redirect);
        return;
      } else {
        onSetInnerCaptchaUrl();
        message.error(result.content);
      }
    } catch (error) {
      message.error('login failed, please try again!');
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <LoginFormPage
        formRef={object[formKey]}
        logo={logo ? logo : defaultLogo}
        title={title}
        subTitle={subTitle}
        activityConfig={activityConfig}
        actions={
          actions && (
            <>
              {actions?.map((action: any, index: number) => {
                return <Action key={index} {...action} />;
              })}
            </>
          )
        }
        backgroundImageUrl={backgroundImageUrl}
        style={{ overflow: 'hidden', height: '100vh' }}
        onFinish={async (values) => {
          await onFinish(values);
        }}
      >
        {loginType && loginType.length > 1 && (
          <Tabs
            centered
            activeKey={loginTypeActive}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>
        )}
        {loginType && loginType.length === 1 && (
          <Divider style={{ marginTop: -15 }} />
        )}
        {loginTypeActive === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            {innerCaptchaUrl && (
              <ProFormImageCaptcha
                name="captcha"
                captchaUrl={innerCaptchaUrl}
                captchaIdUrl={captchaIdUrl}
                rules={[
                  {
                    required: true,
                    message: '请输入图形验证码!',
                  },
                ]}
                fieldProps={{
                  size: 'large',
                  prefix: <SafetyCertificateOutlined />,
                }}
                placeholder="图形验证码"
              />
            )}
          </>
        )}
        {loginTypeActive === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined />,
              }}
              name="phone"
              placeholder={'手机号'}
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
            <ProFormSmsCaptcha
              name="code"
              captchaProps={{
                size: 'large',
                text: '获取验证码',
                url: '/',
              }}
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
                placeholder: '请输入验证码',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
            />
          </>
        )}
      </LoginFormPage>
    </>
  );
};

export default Login;
