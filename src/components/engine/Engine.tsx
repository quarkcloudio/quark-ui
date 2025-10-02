import { useEffectOnActive } from 'keepalive-for-react';
import { useState } from 'react';

import { useEngine } from '@/hooks/common/engine';
import { fetchEngineComponent } from '@/service/api';

interface EngineProps {
  api?: string;
}

const Engine = (props: EngineProps) => {
  const [body, setBody] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setEngineApi, setEngineComponent } = useEngine();
  const { search } = useLocation();
  const apiFromSearch = useMemo(() => {
    if (search?.includes('api=')) {
      return search.split('api=')[1];
    }
    return null;
  }, [search]);

  useEffectOnActive(() => {
    let api = props.api;
    if (apiFromSearch) {
      api = apiFromSearch;
    }

    if (api) {
      setLoading(true);
      fetchEngineComponent(api).then(res => {
        setBody(res.data);
        setEngineComponent(res.data);
        setEngineApi(api);
        setLoading(false);
      });
    }
  }, [apiFromSearch]);

  return (
    <div className="grid h-full w-full">
      <ASpin
        className="h-full w-full flex items-center"
        spinning={loading}
        tip="Loading..."
      >
        <Render body={body} />
      </ASpin>
    </div>
  );
};

export default Engine;
