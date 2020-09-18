import { request } from 'umi';
import { message } from 'antd';

function response(result:any) {
  if(result.status === 'success') {
    message.success(result.msg);
    return result.data;
  }
  message.error(result.msg);
  return false;
}

export async function queryQuarkInfo() {
  const result = request('/api/admin/quark/info');
  return response(result);
}

export async function queryQuarkLayout() {
  const result = request('/api/admin/quark/layout');
  return response(result);
}

export async function queryQuarkMenus() {
  const result = request('/api/admin/quark/menus');
  return response(result);
}

export async function getSmsCode(params: any) {
  return request('/api/admin/getSmsCode', {
    method: 'POST',
    data: params,
  });
}

export async function accountLogin(params: any) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}

export async function accountLogout() {
  const $request = request('/api/admin/logout');
  if($request['status'] === 'success') {
    sessionStorage.removeItem('token');
  }
  return $request;
}

export async function queryAccountInfo() {
  const result = request('/api/admin/account/info');
  return response(result);
}