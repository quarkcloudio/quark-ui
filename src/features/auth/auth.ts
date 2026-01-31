import { useLoading } from '@sa/hooks';

import { globalConfig } from '@/config';
import {
  getIsLogin,
  resetAuth as resetAuthAction,
  selectAuthComponent,
  selectUserInfo,
  setAuthComponent,
  setToken,
  setUserInfo
} from '@/features/auth/authStore';
import { usePreviousRoute, useRouter } from '@/features/router';
import { useEngine } from '@/hooks/common/engine';
import { fetchLogin, fetchUserInfo } from '@/service/api';
import { localStg } from '@/utils/storage';

import { useCacheTabs } from '../tab/tabHooks';

import { clearAuthStorage } from './shared';

export function useInitAuthComponent() {
  const dispatch = useAppDispatch();
  const authComponent = useAppSelector(selectAuthComponent);

  async function initAuthComponent(data: Api.Auth.AuthComponent) {
    localStg.set('appTitle', data?.title || '');
    dispatch(setAuthComponent(data));
  }

  return {
    authComponent,
    initAuthComponent
  };
}

export function useAuth() {
  const userInfo = useAppSelector(selectUserInfo);
  const isLogin = useAppSelector(getIsLogin);

  function hasAuth(codes: string | string[]) {
    if (!isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return userInfo.buttons.includes(codes);
    }

    return codes.some(code => userInfo.buttons.includes(code));
  }

  return {
    hasAuth
  };
}

export function useInitAuth() {
  const { endLoading, loading, startLoading } = useLoading();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
  const authComponent = useAppSelector(selectAuthComponent);
  const redirectUrl = searchParams.get('redirect');
  const { getEngineImageCaptchaRef } = useEngine();

  async function toLogin(params?: any, redirect = true) {
    if (loading) return;
    getEngineImageCaptchaRef()?.current?.refreshCaptcha();
    startLoading();
    const { data: loginToken, error } = await fetchLogin(authComponent.loginApi, params);

    if (!error) {
      localStg.set('token', loginToken.token);
      localStg.set('refreshToken', loginToken.refreshToken);

      const { data: info, error: userInfoError } = await fetchUserInfo(authComponent.userInfoApi);

      if (!userInfoError) {
        // 2. store user info
        localStg.set('userInfo', info);

        dispatch(setToken(loginToken.token));
        dispatch(setUserInfo(info));

        if (redirect) {
          if (redirectUrl) {
            replace(redirectUrl);
          } else {
            replace(globalConfig.homePath);
          }
        }

        window.$notification?.success({
          description: t('page.login.common.welcomeBack', { username: info.username }),
          message: t('page.login.common.loginSuccess')
        });
      }
    }

    endLoading();
  }

  return {
    loading,
    toLogin
  };
}

export function useResetAuth() {
  const dispatch = useAppDispatch();
  const previousRoute = usePreviousRoute();
  const cacheTabs = useCacheTabs();
  const { navigate, push, resetRoutes } = useRouter();

  function resetAuth() {
    clearAuthStorage();
    dispatch(resetAuthAction());
    resetRoutes();
    cacheTabs();

    if (!previousRoute?.handle?.constant) {
      if (previousRoute?.fullPath) {
        push('/login', { redirect: previousRoute.fullPath }, null, true);
      } else {
        navigate('/login', { replace: true });
      }
    }
  }

  return resetAuth;
}
