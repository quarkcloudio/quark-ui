import ExceptionBase from '@/components/common/ExceptionBase';

const GoWrong = () => {
  return <ExceptionBase type="500" />;
};

export const handle = {
  hideInMenu: true,
  i18nKey: 'route.500',
  title: '500'
};

export default GoWrong;
