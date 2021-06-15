import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import { ResponseError } from 'umi-request';
import { queryQuarkInfo, queryQuarkLayout, queryQuarkMenus, queryAccountInfo } from '@/services/quark';
import defaultSettings from '../config/defaultSettings';
import logo from './assets/logo.png';
import {Response} from "express";

export async function getInitialState(): Promise<{
  accountInfo?: API.AccountInfo;
  settings?: LayoutSettings;
  quarkInfo?: any;
  quarkMenus?: any;
  fetchUserInfo: () => Promise<API.AccountInfo | undefined>;
  fetchLayoutInfo: () => Promise<undefined>;
  fetchMenusInfo: () => Promise<undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryAccountInfo();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };

  const fetchLayoutInfo = async () => {
    return await queryQuarkLayout();
  };

  const fetchMenusInfo = async () => {
    return await queryQuarkMenus();
  };

  const quarkInfo = await queryQuarkInfo();

  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login' && history.location.pathname !== '/' && sessionStorage.getItem('token') !== null) {
    try {
      const accountInfo = await fetchUserInfo();
      const quarkLayout = await fetchLayoutInfo();
      const quarkMenus = await fetchMenusInfo();
      if(!quarkLayout.data.logo) {
        quarkLayout.data.logo = logo;
      }
      return {
        fetchUserInfo,
        fetchLayoutInfo,
        fetchMenusInfo,
        accountInfo: accountInfo.data,
        settings: quarkLayout.data,
        quarkInfo: quarkInfo.data,
        quarkMenus: quarkMenus.data
      };
    } catch (error) {
      history.push('/user/login');
    }
  }

  return {
    fetchUserInfo,
    fetchLayoutInfo,
    fetchMenusInfo,
    settings: defaultSettings,
    quarkInfo: quarkInfo.data,
  };
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {

  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });

    if(response.status == 401){ //未登录跳转登录
      history.push('/user/login');
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  throw error;
};

export const request: RequestConfig = {
  errorHandler: errorHandler,
  responseInterceptors: [
    (response, options) => {
      if(response.status == 208){ //跳转新的url
        const locationUrl = response.headers.get('Location');
        if(locationUrl){
          window.open(locationUrl, response.headers.get('Target') || '_blank');
        }
      }
      return response;
    }
  ],
  // 请求拦截器
  requestInterceptors: [
    (url: string, options) => {
      options.headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}` };
      return { url, options };
    }
  ],
};
