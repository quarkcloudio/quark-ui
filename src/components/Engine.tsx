import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import { get } from '@/services/action';
import Render from '@/components/Render';

export interface EngineProps {
  api: string;
}

const defaultProps = {
  api: '',
} as EngineProps;

const Engine: React.FC<EngineProps> = (props) => {
  const { api } = { ...defaultProps, ...props };
  const query: any = history.location.query;

  const [components, setComponents] = useState('');
  const { pageLoading, changePageLoading } = useModel('global', (model) => ({
    pageLoading: model.pageLoading,
    changePageLoading: model.changePageLoading,
  }));

  useEffect(() => {
    getComponents();
  }, [api, query.timestamp]);

  const getComponents = async () => {
    if (!api) {
      setComponents('请设置接口！');
      return;
    }

    var data: any = {};
    Object.keys(query).forEach((key) => {
      if (key != 'api') {
        data[key] = query[key];
      }
    });

    // 设置页面loading状态
    changePageLoading(true);
    const result = await get({
      url: api,
      data: data,
    });

    // 设置组件
    setComponents(result);

    // 取消页面loading状态
    changePageLoading(false);
  };

  return <Render body={components} />;
};

export default Engine;
