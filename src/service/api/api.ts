import { request } from '../request';

export const api = [
  {
    login: (username: string, password: string) =>
      request<Api.Auth.LoginToken>({
        data: {
          password,
          username
        },
        method: 'post',
        url: '/auth/login'
      })
  }
];
