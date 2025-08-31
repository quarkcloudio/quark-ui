import { getPaletteColorByNumber, mixColor } from '@sa/color';

import WaveBg from '@/components/WaveBg';
import { useInitAuth } from '@/features/auth/auth';
import { useFormRules } from '@/features/form';
import { getThemeSettings, useTheme } from '@/features/theme';

import Header from './modules/Header';

type AccountKey = 'admin' | 'super' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  password: string;
  username: string;
}

type LoginParams = Pick<Account, 'password' | 'username'>;

const INITIAL_VALUES = {
  password: '123456',
  username: 'Soybean'
};

function useBgColor() {
  const COLOR_WHITE = '#ffffff';
  const { darkMode } = useTheme();
  const { themeColor } = useAppSelector(getThemeSettings);
  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;
  const ratio = darkMode ? 0.5 : 0.2;
  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return {
    bgColor,
    bgThemeColor
  };
}

const PwdLogin = () => {
  const { t } = useTranslation();
  const { loading, toLogin } = useInitAuth();
  const [form] = AForm.useForm<LoginParams>();
  const { bgColor, bgThemeColor } = useBgColor();

  const {
    formRules: { pwd, username: usernameRules }
  } = useFormRules();

  useKeyPress('enter', () => {
    form.submit();
  });

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-layout"
      style={{ backgroundColor: bgColor }}
    >
      <WaveBg themeColor={bgThemeColor} />
      <ACard
        className="relative z-4 w-auto rd-8px"
        styles={{ body: { flex: 1, overflow: 'hidden', padding: undefined } }}
        variant="borderless"
      >
        <div className="w-400px lt-sm:w-300px">
          <Header />
          <main className="pt-24px">
            <h3 className="text-18px text-primary font-medium">{t('page.login.pwdLogin.title')}</h3>
            <AForm
              className="pt-24px"
              form={form}
              initialValues={INITIAL_VALUES}
              onFinish={toLogin}
            >
              <AForm.Item
                name="username"
                rules={usernameRules}
              >
                <AInput size="large" />
              </AForm.Item>
              <AForm.Item
                name="password"
                rules={pwd}
              >
                <AInput.Password
                  autoComplete="password"
                  size="large"
                />
              </AForm.Item>
              <ASpace
                className="w-full"
                direction="vertical"
                size={24}
              >
                <div className="flex-y-center justify-between">
                  <ACheckbox>{t('page.login.pwdLogin.rememberMe')}</ACheckbox>
                </div>
                <AButton
                  block
                  htmlType="submit"
                  loading={loading}
                  shape="round"
                  size="large"
                  type="primary"
                >
                  {t('common.confirm')}
                </AButton>
              </ASpace>
            </AForm>
          </main>
        </div>
      </ACard>
    </div>
  );
};

export const handle = {
  constant: true,
  i18nKey: 'route.(blank)_login',
  title: 'login'
};

export default PwdLogin;
