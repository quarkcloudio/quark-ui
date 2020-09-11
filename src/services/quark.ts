import { request } from 'umi';

export async function queryQuarkInfo() {
  return request('/api/admin/quark/info');
}

export async function queryQuarkLayout() {
  return request('/api/admin/quark/layout');
}

export async function queryQuarkMenus() {
  return request('/api/admin/quark/menus');
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
  return request('/api/admin/account/info');
}