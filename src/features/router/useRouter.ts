import { useContext } from 'react';

import type { RouterContextType } from './router';
import { RouterContext } from './router-context';

export function useRouter(): RouterContextType {
  const navigator = useContext(RouterContext);

  if (!navigator) {
    throw new Error('RouterContext is not provided');
  }

  return navigator;
}
