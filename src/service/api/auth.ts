import { request } from '../request';

/**
 * Get login component
 *
 * @param api Login component api
 */
export function fetchAuthComponent(api?: string) {
  return request<Api.Auth.AuthComponent>({ url: api || '/api/admin/auth/index/index' });
}

/** Get login captcha */
export function fetchLoginCaptcha(api: string) {
  return request<Api.Auth.LoginCaptcha>({ url: api });
}

/**
 * Login
 *
 * @param params params
 */
export function fetchLogin(api: string, params: any) {
  return request<Api.Auth.LoginToken>({
    data: params,
    method: 'post',
    url: api
  });
}

/** Get user info */
export function fetchUserInfo(api: string) {
  return request<Api.Auth.UserInfo>({ url: api });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    data: {
      refreshToken
    },
    method: 'post',
    url: '/auth/refreshToken'
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ params: { code, msg }, url: '/auth/error' });
}
