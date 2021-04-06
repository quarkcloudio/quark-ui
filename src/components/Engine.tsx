import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { get } from '@/services/action';
import Render from '@/components/Render';

const Engine: React.FC<any> = (props:any) => {

  const [components, setComponentsState] = useState(null);

  useEffect(() => {
    onSetComponentsState(props.api)
  }, [props.api]);

  const onSetComponentsState = async (api:string) => {

    // url参数
    const query:any = history.location.query;

    // 当前接口
    const actionUrl = api ? api : query.api;

    const result = await get({
      actionUrl: actionUrl,
      ...history.location.query
    });

    setComponentsState(result);
  };

  return (
    <Render body={components} />
  );
}

export default Engine;