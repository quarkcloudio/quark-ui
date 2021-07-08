import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { get } from '@/services/action';
import Render from '@/components/Render';

const Engine: React.FC<any> = (props:any) => {

  const [components, setComponentsState] = useState('');
  const query:any = history.location.query;
  const api = query.api ? query.api : props.initApi;

  useEffect(() => {
    onSetComponentsState()
  }, [api,query._timestamp]);

  const onSetComponentsState = async () => {
    if(api) {
      const result = await get({
        actionUrl: api,
        ...history.location.query
      });
      setComponentsState(result);
    } else {
      setComponentsState('请配置初始接口！');
    }
  };

  return (
    <Render body={components} />
  );
}

export default Engine;