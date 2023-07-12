import { requestConfig } from './requestConfig';
import { Base64 } from 'js-base64';

type AccountInfoType =
  | {
      avatar?: string;
      nickname?: string;
    }
  | undefined;

export interface InitialStateProps {
  accountInfo?: AccountInfoType;
  getAccountInfo?: () => AccountInfoType;
}

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialStateProps> {
  const getAccountInfo = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // 返回解析的用户信息
      return JSON.parse(Base64.decode(token.split('.')[1]));
    }

    return undefined;
  };

  const token = localStorage.getItem('token');
  if (token) {
    const accountInfo = getAccountInfo();
    return { accountInfo: accountInfo, getAccountInfo };
  }

  return { getAccountInfo };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...requestConfig,
};
