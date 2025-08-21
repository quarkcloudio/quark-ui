import { useLoading } from '@sa/hooks';

import { globalConfig } from '@/config';
import { getIsLogin, selectUserInfo } from '@/features/auth/authStore';
import { usePreviousRoute, useRouter } from '@/features/router';
import { fetchGetUserInfo, fetchLogin } from '@/service/api';
import { localStg } from '@/utils/storage';

import { useCacheTabs } from '../tab/tabHooks';

import { resetAuth as resetAuthAction, setToken, setUserInfo } from './authStore';
import { clearAuthStorage } from './shared';

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

  const redirectUrl = searchParams.get('redirect');

  async function toLogin({ password, userName }: { password: string; userName: string }, redirect = true) {
    if (loading) return;

    startLoading();
    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      localStg.set('token', loginToken.token);
      localStg.set('refreshToken', loginToken.refreshToken);

      const { data: info, error: userInfoError } = await fetchGetUserInfo();

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
          description: t('page.login.common.welcomeBack', { userName: info.userName }),
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
