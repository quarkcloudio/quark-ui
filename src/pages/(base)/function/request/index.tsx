import { fetchCustomBackendError } from '@/service/api';

const Request = () => {
  const { t } = useTranslation();
  async function logout() {
    await fetchCustomBackendError('8888', t('request.logoutMsg'));
  }

  async function logoutWithModal() {
    await fetchCustomBackendError('7777', t('request.logoutWithModalMsg'));
  }

  async function refreshToken() {
    await fetchCustomBackendError('9999', t('request.tokenExpired'));
  }

  async function handleRepeatedMessageError() {
    await Promise.all([
      fetchCustomBackendError('2222', t('page.function.request.repeatedErrorMsg1')),
      fetchCustomBackendError('2222', t('page.function.request.repeatedErrorMsg1')),
      fetchCustomBackendError('2222', t('page.function.request.repeatedErrorMsg1')),
      fetchCustomBackendError('3333', t('page.function.request.repeatedErrorMsg2')),
      fetchCustomBackendError('3333', t('page.function.request.repeatedErrorMsg2')),
      fetchCustomBackendError('3333', t('page.function.request.repeatedErrorMsg2'))
    ]);
  }
  async function handleRepeatedModalError() {
    await Promise.all([
      fetchCustomBackendError('7777', t('request.logoutWithModalMsg')),
      fetchCustomBackendError('7777', t('request.logoutWithModalMsg')),
      fetchCustomBackendError('7777', t('request.logoutWithModalMsg'))
    ]);
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
        variant="borderless"
      >
        <AButton onClick={logout}>{t('common.trigger')}</AButton>
      </ACard>

      <ACard
        className="card-wrapper"
        size="small"
        title={t('request.logoutWithModal')}
        variant="borderless"
      >
        <AButton onClick={logoutWithModal}>{t('common.trigger')}</AButton>
      </ACard>

      <ACard
        className="card-wrapper"
        size="small"
        title={t('request.refreshToken')}
        variant="borderless"
      >
        <AButton onClick={refreshToken}>{t('common.trigger')}</AButton>
      </ACard>

      <ACard
        className="card-wrapper"
        size="small"
        title={t('page.function.request.repeatedErrorOccurOnce')}
        variant="borderless"
      >
        <AButton onClick={handleRepeatedMessageError}>{t('page.function.request.repeatedError')} (Message)</AButton>
        <AButton
          className="ml-12px"
          onClick={handleRepeatedModalError}
        >
          {t('page.function.request.repeatedError')}(Modal)
        </AButton>
      </ACard>
    </ASpace>
  );
};

export default Request;
