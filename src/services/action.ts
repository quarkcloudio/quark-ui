import { request } from 'umi';
import { stringify } from 'qs';

export async function get(params: any) {
  let actionUrl = '',url = '';
  url = params.actionUrl;
  delete params['actionUrl'];

  if(url.indexOf("?") != -1) {
    actionUrl = `${url}&${stringify(params)}`;
  } else {
    actionUrl = `${url}?${stringify(params)}`;
  }
  
  if(url.indexOf("http") == -1) {
    actionUrl = `../../api/${actionUrl}`;
  }

  return request(actionUrl);
}

export async function post(params: any) {
  let actionUrl = '',url = '';
  url = params.actionUrl;
  delete params['actionUrl'];

  if(url.indexOf("http") == -1) {
    actionUrl = `../../api/${url}`;
  } else {
    actionUrl = url;
  }

  return request(actionUrl, {
    method: 'post',
    data: params,
  });
}