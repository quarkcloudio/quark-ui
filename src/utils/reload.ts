import { useLocation } from '@umijs/max';
import qs from 'query-string';

const useReload = () => {
  const location = useLocation();
  const query = qs.parse(location.search);

  // @ts-ignore
  history.replace({
    pathname: location.pathname,
    query: {
      ...query,
      timestamp: new Date().getTime(),
    },
  });
};

export default useReload;
