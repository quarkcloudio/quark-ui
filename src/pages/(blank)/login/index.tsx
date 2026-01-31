import { getPaletteColorByNumber, mixColor } from '@sa/color';

import { useInitAuth, useInitAuthComponent } from '@/features/auth/auth';
import { LangSwitch } from '@/features/lang';
import { ThemeSchemaSwitch, getThemeSettings, useTheme } from '@/features/theme';
import { fetchAuthComponent } from '@/service/api';

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
  const { authComponent, initAuthComponent } = useInitAuthComponent();
  const [form] = AForm.useForm<any>();
  const { bgColor, bgThemeColor } = useBgColor();

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await fetchAuthComponent();
      if (error) {
        return;
      }
      initAuthComponent(data);
    }
    fetchData();
  }, []);

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
          <header className="flex-y-center justify-between">
            <SystemLogo className="h-64px w-64px text-primary lt-sm:h-48px lt-sm:w-48px" />
            <h3 className="text-28px text-primary font-500 lt-sm:text-22px">{authComponent.title}</h3>
            <div className="i-flex-col">
              <ThemeSchemaSwitch
                className="text-20px lt-sm:text-18px"
                showTooltip={false}
              />
              <LangSwitch showTooltip={false} />
            </div>
          </header>
          <main className="pt-24px">
            <h3 className="text-18px text-primary font-medium">{t('page.login.pwdLogin.title')}</h3>
            <AForm
              className="pt-24px"
              form={form}
              onFinish={toLogin}
            >
              {authComponent.body.map((item: any) => (
                <ProFormField
                  component={item.component}
                  fieldProps={{ ...item }}
                  key={item.componentkey}
                  label={item.label}
                  name={item.name}
                  required={item.required}
                  rules={item.frontendRules}
                />
              ))}
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
