import React from 'react';
import Render from '@/components/Render';
import ProLayout from '@ant-design/pro-layout';

const Layout: React.FC<any> = (props:any) => {
  return (
    <ProLayout {...props}>
      <Render body={props.body} data={props.data} />
    </ProLayout>
  );
}

export default Layout;