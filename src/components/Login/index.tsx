import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, message, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { useModel, useLocation, Helmet, history } from '@umijs/max';
import { flushSync } from 'react-dom';
import qs from 'query-string';
import { post, get } from '@/services/action';
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
  actions?: React.ReactNode | undefined;
  captchaUrl?: string | undefined;
  captchaIdUrl?: string | undefined;
  api?: string;
  loginType?: Array<LoginType>;
  redirect?: string;
}

const defaultProps = {
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
  const [captchaId, setCaptchaId] = useState('');
  const { initialState, setInitialState } = useModel('@@initialState');

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
    let captchaId = '';
    if (captchaUrl === undefined) {
      return;
    }

    if (captchaIdUrl) {
      const result = await get({
        url: captchaIdUrl,
      });
      if (result.status === 'error') {
        message.error(result.msg);
      } else {
        captchaId = result.data['captchaId'];
      }
      setCaptchaId(captchaId);
    }

    let getCaptchaUrl = captchaUrl.replace(/:id/g, captchaId);
    getCaptchaUrl = getCaptchaUrl.replace('${id}', captchaId);

    setInnerCaptchaUrl(getCaptchaUrl + '?random=' + Math.random());
  };

  // 提交表单
  const onFinish = async (values: any) => {
    try {
      if (captchaIdUrl) {
        values['captchaId'] = captchaId;
      }
      const result = await post({
        url: api,
        data: { ...values, loginType: loginTypeActive },
      });

      if (result.status === 'success') {
        // 记录登录凭据
        localStorage.setItem('token', result.data.token);

        // 清空layout
        sessionStorage.removeItem('layout');

        // 获取用户信息
        const accountInfo = initialState?.getAccountInfo?.();
        if (accountInfo) {
          flushSync(() => {
            setInitialState((s) => ({
              ...s,
              accountInfo: accountInfo,
            }));
          });
        }

        // 弹出消息
        message.success(result.msg);

        // 跳转页面
        replaceGoto(redirect);
        return;
      } else {
        onSetInnerCaptchaUrl();
        message.error(result.msg);
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div style={{ padding: '24px', contentVisibility: 'auto' }}>
        <div
          style={{ padding: '24px', border: '1px solid rgb(240, 240, 240)' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              height: 'calc(100vh - 48px)',
              margin: -24,
            }}
          >
            <LoginFormPage
              logo={logo ? logo : defaultLogo}
              title={title}
              subTitle={subTitle}
              activityConfig={activityConfig}
              actions={actions}
              backgroundImageUrl={backgroundImageUrl}
              style={{ overflow: 'hidden' }}
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
                      prefix: <UserOutlined className={'prefixIcon'} />,
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
                      prefix: <LockOutlined className={'prefixIcon'} />,
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
                    <ProFormText
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: '请输入图形验证码!',
                        },
                      ]}
                      fieldProps={{
                        size: 'large',
                        prefix: (
                          <SafetyCertificateOutlined className={'prefixIcon'} />
                        ),
                      }}
                      placeholder="图形验证码"
                      addonAfter={
                        <img
                          src={innerCaptchaUrl}
                          alt="验证码"
                          onClick={() => {
                            onSetInnerCaptchaUrl();
                          }}
                          style={{ cursor: 'pointer', width: 110 }}
                        />
                      }
                    />
                  )}
                </>
              )}
              {loginTypeActive === 'phone' && (
                <>
                  <ProFormText
                    fieldProps={{
                      size: 'large',
                      prefix: <MobileOutlined className={'prefixIcon'} />,
                    }}
                    name="mobile"
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
                  <ProFormCaptcha
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    captchaProps={{
                      size: 'large',
                    }}
                    placeholder={'请输入验证码'}
                    captchaTextRender={(timing, count) => {
                      if (timing) {
                        return `${count} ${'获取验证码'}`;
                      }
                      return '获取验证码';
                    }}
                    name="captcha"
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ]}
                    onGetCaptcha={async () => {
                      message.success('验证码发送成功！');
                    }}
                  />
                </>
              )}
            </LoginFormPage>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
