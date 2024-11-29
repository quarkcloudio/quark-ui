import { history } from '@umijs/max';

const useReload = () => {
  const { search }: any = history.location;
  const timestamp = new Date().getTime().toString();

  // @ts-ignore
  history.push({
    pathname: history.location.pathname,
    search: search + '&timestamp=' + timestamp,
  });
};

export default useReload;
