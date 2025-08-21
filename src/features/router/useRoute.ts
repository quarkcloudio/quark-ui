import { useMatches, useRouteError } from 'react-router-dom';

import { parseQuery } from './query';

export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function getCatchAllParam(str: string | undefined) {
  if (!str) return null;
  // \[\.\.\.(\w+)\] 用来匹配形如 [...slug]
  // (\w+) 意味着捕获“字母、数字或下划线”组成的部分
  const match = str.match(/\[\.\.\.(\w+)\]/);
  return match ? match[1] : null;
}

function getParams(
  params: Record<string, string> | undefined,
  id: string
): Record<string, string | string[]> | undefined {
  if (!params?.['*']) return params;

  const lastName = id.split('_').at(-1);
  const catchAllParam = getCatchAllParam(lastName);
  if (catchAllParam) {
    return { [catchAllParam]: params['*'].split('/') };
  }
  return params;
}

/** - get route meta */
export function useRoute<
  T = unknown,
  Q extends Record<string, string> | null = Record<string, string>,
  P extends Record<string, string | string[]> = Record<string, string | string[]>
>() {
  const matches = useMatches();

  const routes = matches.at(-1) as Router.Route<T>;

  const { hash, pathname, search } = useLocation();

  const fullPath = pathname + search + hash;

  const query = parseQuery(search) as Q;

  const error = useRouteError() as Error | null;

  return useMemo(
    () =>
      ({
        ...routes,
        error,
        fullPath,
        hash,
        matched: matches.slice(1) as Router.Route<T>[],
        params: getParams(routes.params as Record<string, string>, routes.id) as P,
        pathname,
        query,
        redirect: null,
        search
      }) as Router.Route<T, Q, P>,
    [fullPath]
  );
}

export function usePreviousRoute() {
  return useOutletContext<Router.Route>();
}
