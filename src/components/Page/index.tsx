import React, { useState, useEffect } from 'react';
import { useLocation, Helmet } from '@umijs/max';
import qs from 'query-string';
import { get } from '@/services/action';
import Render from '@/components/Render';

export interface PageProps {
  initApi?: string;
  title?: string;
  body?: any;
  data?: any;
  callback?: any;
  style?: React.CSSProperties | undefined;
}

const defaultProps = {
  initApi: '',
  title: '',
} as PageProps;

const Page: React.FC<PageProps> = (props) => {
  const { initApi, title, body, data, callback, style } = {
    ...defaultProps,
    ...props,
  };
  const location = useLocation();
  const query = qs.parse(location.search);
  const [innerData, setInnerData] = useState(data);

  useEffect(() => {
    if (initApi) {
      getData(initApi);
    }
  }, [initApi]);

  const getData = async (initApi: string) => {
    const result = await get({
      url: initApi,
      data: query,
    });
    setInnerData(result.data);
  };

  return (
    <div style={style}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Render body={body} data={innerData} callback={callback} />
    </div>
  );
};

export default Page;
