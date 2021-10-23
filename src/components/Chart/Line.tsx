import React, { useState, useEffect } from 'react';
import { Line as AntLine } from '@ant-design/charts';
import { get } from '@/services/action';

const Line: React.FC<any> = (props:any) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if(props.api) {
      const result = await get({
        actionUrl: props.api
      });
  
      if(result) {
        setData(result.data);
      }
    }
  };

  return (
    <AntLine {...props} data={data} />
  );
}

export default Line;