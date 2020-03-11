import request from '@/utils/request';
import { stringify } from 'qs';

export async function get(params: any) {
  let actionUrl = '';

  if(params.actionUrl.indexOf("?") != -1) {
    actionUrl = `${params.actionUrl}&${stringify(params)}`;
  } else {
    actionUrl = `${params.actionUrl}?${stringify(params)}`;
  }
  
  if(params.actionUrl.indexOf("http") == -1) {
    actionUrl = `../../api/${actionUrl}`;
  }

  return request(actionUrl);
}

export async function post(params: any) {
  let actionUrl = '';

  if(params.actionUrl.indexOf("http") == -1) {
    actionUrl = `../../api/${params.actionUrl}`;
  } else {
    actionUrl = params.actionUrl;
  }

  return request(actionUrl, {
    method: 'post',
    data: params,
  });
}