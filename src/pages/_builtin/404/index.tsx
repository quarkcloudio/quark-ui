import ExceptionBase from '@/components/ExceptionBase';

const NotFound = () => {
  return <ExceptionBase type="404" />;
};

export const handle = {
  constant: true,
  hideInMenu: true,
  i18nKey: 'route.404',
  title: '404'
};

export default NotFound;
