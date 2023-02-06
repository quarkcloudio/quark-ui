import { request } from '@umijs/max';
import qs from 'query-string';

export async function get(params: any) {
  let url = params.url;
  let data = params.data;

  if (url.indexOf('?') !== -1) {
    url = `${url}&${qs.stringify(data)}`;
  } else {
    url = `${url}?${qs.stringify(data)}`;
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
