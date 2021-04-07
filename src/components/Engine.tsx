import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { get } from '@/services/action';
import Render from '@/components/Render';

const Engine: React.FC<any> = (props:any) => {

  const [components, setComponentsState] = useState(null);
  const query:any = history.location.query;

  useEffect(() => {
    onSetComponentsState()
  }, [query.api]);

  const onSetComponentsState = async () => {
    const result = await get({
      actionUrl: query.api,
      ...history.location.query
    });
    setComponentsState(result);
  };

  return (
    <Render body={components} />
  );
}

export default Engine;