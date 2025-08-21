import ExceptionBase from '@/components/ExceptionBase';

const NotAuth = () => {
  return <ExceptionBase type="403" />;
};

export const handle = {
  hideInMenu: true,
  i18nKey: 'route.403',
  title: '403'
};

export default NotAuth;
