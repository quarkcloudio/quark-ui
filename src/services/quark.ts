import { request } from 'umi';

export async function queryQuarkInfo() {
  return request('/api/admin/quark/info');
}

export async function queryQuarkLayout() {
  return request('/api/admin/quark/layout');
}

export async function accountLogin(params: any) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryAccountInfo() {
  return request('/api/admin/account/info');
}