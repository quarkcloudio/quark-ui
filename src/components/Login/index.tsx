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
import Render from '@/components/Render';
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
  body?: any;
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
    api,
    loginType,
    redirect,
    body,
  } = { ...defaultProps, ...props };
  const location = useLocation();
  const query = qs.parse(location.search);
  const [loginTypeActive, setLoginType] = useState<LoginType>(
    loginType ? loginType[0] : 'account',
  );
  const { initialState, setInitialState } = useModel('@@initialState');
  const { object, setObject } = useModel('object'); // 全局对象
  const formRef = useRef<ProFormInstance<any>>();

  const formKey = componentkey ? componentkey : 'form';
  object[formKey] = formRef;
  setObject(object);

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

  // 提交表单
  const onFinish = async (values: any) => {
    // 刷新验证码
    object?.refreshCaptcha?.();

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
        <Render body={body} data={{ componentkey: formKey }} />
      </LoginFormPage>
    </>
  );
};

export default Login;
