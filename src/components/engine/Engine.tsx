import { useEffectOnActive } from 'keepalive-for-react';
import { useState } from 'react';

import { useEngine } from '@/features/engine';
import { fetchEngineComponent } from '@/service/api';

interface EngineProps {
  api?: string;
}

const Engine = (props: EngineProps) => {
  const { api } = props;
  const [body, setBody] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatchEngineApi, dispatchEngineComponent } = useEngine();

  useEffectOnActive(() => {
    if (api) {
      setLoading(true);
      fetchEngineComponent(api).then(res => {
        setBody(res.data);
        dispatchEngineComponent(res.data);
        dispatchEngineApi(api);
        setLoading(false);
      });
    }
  }, []);

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
