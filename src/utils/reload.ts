import { history } from '@umijs/max';

const useReload = () => {
  let { search }: any = history.location;
  const timestamp = new Date().getTime().toString();

  if (search.indexOf('timestamp') > -1) {
    search = search.replace(/timestamp=(\d*)/, `timestamp=${timestamp}`);
  } else {
    search += '&timestamp=' + timestamp;
  }

  // @ts-ignore
  history.push({
    pathname: history.location.pathname,
    search: search,
  });
};

export default useReload;
