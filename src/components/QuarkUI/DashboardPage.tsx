import React, { useEffect } from 'react';
import styles from './ShowPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Card,
  Spin,
  Tabs,
  Popconfirm,
  Row,
  Col
} from 'antd';

export interface DashboardPageProps {
  api: string;
  content: {
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      component:any
    }
  };
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
}

const DashboardPage: React.SFC<DashboardPageProps> = props => {

  const {
    api,
    content,
    routes,
    loading,
    dispatch
  } = props;

  /**
   * constructor
   */
  useEffect(() => {
    console.log(api);
    dispatch({
      type: 'show/info',
      payload: {
        actionUrl: api
      }
    });
  }, [dispatch, api]);

  const itemRender = (item:any) => {
    if(item) {
      if(item.component.name == 'row') {
        item.component.items.map((item:any) => {
          return (
            itemRender(item)
          )
        })
      }
  
      if(item.component.name == 'col') {
        return (
          <Col span={item.component.span}>
            {itemRender(item)}
          </Col>
        )
      }
  
      if(item.component.name == 'text') {
        return (
          <span>
            {item.component.items}
          </span>
        )
      }
    }
  };

  return (
    <Spin spinning={loading} tip="Loading..." style={{width:'100%',marginTop:'200px'}}>
      {content ?
        <PageHeaderWrapper
          title={content ? content.title : false}
          subTitle={content.subTitle}
          content={content.description}
          breadcrumb={{routes}}
        >
          {content.body.component ?
            <span>
              {!!content.body.component.items && content.body.component.items.map((item:any) => {
                itemRender(item);
              })}
            </span>
          :
            ''
          }
        </PageHeaderWrapper>
      : null}
    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    loading,
  } = state.show;

  return {
    content,
    routes,
    loading,
  };
}

export default connect(mapStateToProps)(DashboardPage);