import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import { useModel } from 'umi';

const Footer: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');
  const quarkInfo = initialState.quarkInfo;

  return (
    <DefaultFooter
      copyright={quarkInfo.copyright}
      links={quarkInfo.links.map((item:any, index:any) => {
        item['key']=index;
        return item;
      })}
    />
  );
};

export default Footer;