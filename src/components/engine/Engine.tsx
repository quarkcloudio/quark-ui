import { useEffectOnActive } from 'keepalive-for-react';
import { useState } from 'react';

import { fetchEngineComponent } from '@/service/api';

interface EngineProps {
  api?: string;
}

const Engine = (props: EngineProps) => {
  const { api } = props;
  const [body, setBody] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffectOnActive(() => {
    if (api) {
      setLoading(true);
      fetchEngineComponent(api).then(res => {
        setBody(res.data);
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
