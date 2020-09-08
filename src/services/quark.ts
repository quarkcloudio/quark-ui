import { request } from 'umi';

export async function login(params: any) {
  return request<any>('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryQuarkInfo() {
  return request('/api/admin/quark/info');
}