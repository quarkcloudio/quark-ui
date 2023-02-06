import React, { useState, useEffect } from 'react';
import { useLocation, useModel } from '@umijs/max';
import { get } from '@/services/action';
import Render from '@/components/Render';
import qs from 'query-string';

export interface EngineProps {
  api: string;
}

const defaultProps = {
  api: '',
} as EngineProps;

const Engine: React.FC<EngineProps> = (props) => {
  const location = useLocation();
  const query = qs.parse(location.search);
  const { api } = { ...defaultProps, ...props };
  const [components, setComponents] = useState('');
  const { setPageLoading } = useModel('pageLoading');

  const getComponents = async () => {
    if (!api) {
      setComponents('请设置接口！');
      return;
    }

    let data: any = {};
    Object.keys(query).forEach((key) => {
      if (key !== 'api') {
        data[key] = query[key];
      }
    });

    // 设置页面loading状态
    setPageLoading(true);
    const result = await get({
      url: api,
      data: data,
    });

    // 设置组件
    setComponents(result);

    // 取消页面loading状态
    setPageLoading(false);
  };

  useEffect(() => {
    getComponents();
  }, [api, query.timestamp]);

  return <Render body={components} />;
};

export default Engine;
