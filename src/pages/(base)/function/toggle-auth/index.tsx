import { useLoading } from '@sa/hooks';
import type { DescriptionsProps } from 'antd';

import { useAuth } from '@/features/auth';
import { useInitAuth } from '@/features/auth/auth';
import { selectUserInfo } from '@/features/auth/authStore';
import { useRouter } from '@/features/router';
import { initTab, useUpdateTabs } from '@/features/tab/tabHooks';
import { useThemeSettings } from '@/features/theme';

type AccountKey = 'admin' | 'super' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  password: string;
  userName: string;
}

const ToggleAuth = () => {
  const { t } = useTranslation();

  const userInfo = useAppSelector(selectUserInfo);
  const updateTabs = useUpdateTabs();
  const { hasAuth } = useAuth();

  const { toLogin } = useInitAuth();

  const { loading, startLoading } = useLoading();
  const themeSettings = useThemeSettings();
  const { reload, resetRoutes } = useRouter();

  const [loginAccount, setLoginAccount] = useState<AccountKey>('super');

  const accounts: Account[] = [
    {
      key: 'super',
      label: t('page.login.pwdLogin.superAdmin'),
      password: '123456',
      userName: 'Super'
    },
    {
      key: 'admin',
      label: t('page.login.pwdLogin.admin'),
      password: '123456',
      userName: 'Admin'
    },
    {
      key: 'user',
      label: t('page.login.pwdLogin.user'),
      password: '123456',
      userName: 'User'
    }
  ];

  const roles: DescriptionsProps['items'] = [
    {
      children: (
        <ASpace>
          {userInfo.roles.map(role => (
            <ATag key={role}>{role}</ATag>
          ))}
        </ASpace>
      ),
      key: '1',
      label: t('page.manage.user.userRole')
    },
    {
      children: (
        <ASpace>
          {accounts.map(account => (
            <AButton
              disabled={loading && loginAccount !== account.key}
              key={account.key}
              loading={loading && loginAccount === account.key}
              onClick={() => handleToggleAccount(account)}
            >
              {account.label}
            </AButton>
          ))}
        </ASpace>
      ),
      key: '2',
      label: t('page.function.toggleAuth.toggleAccount')
    }
  ];

  async function handleToggleAccount(account: Account) {
    setLoginAccount(account.key);

    startLoading();

    resetRoutes();

    await toLogin({ password: account.password, userName: account.userName }, false);

    initTab(themeSettings.tab.cache, updateTabs);

    reload();
  }
  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={16}
    >
      <ACard
        className="card-wrapper"
        size="small"
        title={t('request.logout')}
      >
        <ADescriptions
          bordered
          column={1}
          items={roles}
          layout="vertical"
          size="small"
        />

        <ACard
          className="card-wrapper"
          size="small"
          title={t('page.function.toggleAuth.authHook')}
          variant="borderless"
        >
          <ASpace>
            {hasAuth('B_CODE1') && <AButton>{t('page.function.toggleAuth.superAdminVisible')}</AButton>}
            {hasAuth('B_CODE2') && <AButton>{t('page.function.toggleAuth.adminVisible')}</AButton>}
            {hasAuth('B_CODE3') && <AButton>{t('page.function.toggleAuth.adminOrUserVisible')}</AButton>}
          </ASpace>
        </ACard>
      </ACard>
    </ASpace>
  );
};

export default ToggleAuth;
