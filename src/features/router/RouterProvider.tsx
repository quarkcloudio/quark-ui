import { RouterProvider as Provider } from 'react-router-dom';

import { router } from './router';
import { RouterContext } from './router-context';

export const RouterProvider = () => {
  return (
    <RouterContext.Provider value={router}>
      <Provider router={router.reactRouter} />
    </RouterContext.Provider>
  );
};
