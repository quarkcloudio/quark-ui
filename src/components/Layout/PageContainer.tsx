import React from 'react';
import Render from '@/components/Render';
import { PageContainer as AntPageContainer } from '@ant-design/pro-layout';

const PageContainer: React.FC<any> = (props:any) => {

  return (
    <AntPageContainer {...props}>
      <Render body={props.body} data={props.data} callback={props.callback} />
    </AntPageContainer>
  );
}

export default PageContainer;