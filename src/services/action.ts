import { request } from 'umi';
import { stringify } from 'qs';

export async function get(params: any) {
  let url = params.url;
  let data = params.data;

  if (url.indexOf('?') != -1) {
    url = `${url}&${stringify(data)}`;
  } else {
    url = `${url}?${stringify(data)}`;
  }

  return request(url);
}

export async function post(params: any) {
  let url = params.url;
  let data = params.data;

  return request(url, {
    method: 'post',
    data: data,
  });
}
