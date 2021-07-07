import React, { useState, useEffect } from 'react';
import { history, Helmet } from 'umi';
import { get } from '@/services/action';
import Render from '@/components/Render';

const Page: React.FC<any> = (props:any) => {

  const [data, setDataState] = useState(null);

  useEffect(() => {
    if(props.initApi) {
      getData(props.initApi)
    }
  }, [props.initApi]);

  const getData = async (initApi:string) => {

    const result = await get({
      actionUrl: initApi,
      ...history.location.query
    });

    setDataState(result.data);
  };

  return (
    <div style={props?.style}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
      <Render body={props.body} data={data ? data : props.data} callback={null} />
    </div>
  );
}

export default Page;