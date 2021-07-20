import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import { get } from '@/services/action';
import Render from '@/components/Render';

const Engine: React.FC<any> = (props:any) => {

  const [components, setComponentsState] = useState('');
  const query:any = history.location.query;
  const api = query.api ? query.api : props.initApi;

  const { pageLoading, changePageLoading } = useModel('global', model => ({ pageLoading: model.pageLoading, changePageLoading: model.changePageLoading }));

  useEffect(() => {
    changePageLoading(true);
    onSetComponentsState()
  }, [api,query.timestamp]);

  const onSetComponentsState = async () => {
    if(api) {
      const result = await get({
        actionUrl: api,
        ...history.location.query
      });

      if(result) {
        setComponentsState(result);
        changePageLoading(false);
      }
    } else {
      setComponentsState('请配置初始接口！');
    }
  };

  return (
    <Render body={components} />
  );
}

export default Engine;