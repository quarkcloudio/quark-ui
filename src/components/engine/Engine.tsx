import { useEffectOnActive } from 'keepalive-for-react';
import { useState } from 'react';

import { fetchEngineComponent } from '@/service/api';

interface EngineProps {
  api?: string;
}

const Engine = (props: EngineProps) => {
  const { api } = props;
  const [component, setComponent] = useState<any>();

  useEffectOnActive(() => {
    if (api) {
      fetchEngineComponent(api).then(res => {
        setComponent(res);
      });
    }
  }, []);

  console.log('component', component);

  return <div className="h-full">{api}</div>;
};

export default Engine;
