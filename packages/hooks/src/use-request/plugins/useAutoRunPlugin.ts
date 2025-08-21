import { useEffect } from 'react';

import type { Plugin } from '../type';

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, params = {}, ready = true, refreshDepsAction }
) => {
  useEffect(() => {
    if (!manual && ready) {
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.runAsync(params);
      }
    }
  }, [JSON.stringify(params), ready]);

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true
        };
      }
      return null;
    }
  };
};

useAutoRunPlugin.onInit = ({ manual, ready = true }) => {
  return {
    loading: !manual && ready
  };
};

export default useAutoRunPlugin;
