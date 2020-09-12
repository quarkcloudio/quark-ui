import React, { useState, useEffect } from 'react';
import styles from './ShowPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { history } from 'umi';

import {
  Card,
  Spin,
  Tabs,
  Popconfirm,
  Row,
  Col,
  Statistic,
  Table,
  Affix,
  Button,
  Badge,
  Tooltip
} from 'antd';

import {
  ArrowUpOutlined,
  EditOutlined,
  MoneyCollectOutlined,
  PictureOutlined,
  MessageOutlined,
  MenuOutlined,
  UserOutlined,
  BarsOutlined,
  PaperClipOutlined,
  ReloadOutlined,
  SyncOutlined
} from '@ant-design/icons';

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

  const [canUpgrade, checkUpgrade] = useState(false);
  const [checking, checkUpgrading] = useState(false);

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
    dispatch({
      type: 'show/info',
      payload: {
        actionUrl: api
      }
    });
    checkUpdate()
  }, [dispatch, api]); // eslint-disable-line 

  const checkUpdate = () =>  { // eslint-disable-line 
    checkUpgrading(true)
    // 调用model
    dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/upgrade/index',
      },
      callback: (res:any) => {
        if (res) {
          checkUpgrading(false)
          checkUpgrade(res.data.can_upgrade);
        }
      },
    });
  }


  const itemRender = (item:any) => {

    let formItem = null;

    if(item) {
      if(item.component.name == 'row') {
        formItem =
        <Row gutter={item.component.gutter}>
          {item.component.items.map((item:any) => {
            return (
              itemRender(item)
            )
          })}
        </Row>
      }
  
      if(item.component.name == 'col') {
        formItem = 
        <Col span={item.component.span}>
          {item.component.items.map((item:any) => {
            return (
              itemRender(item)
            )
          })}
        </Col>
      }
  
      if(item.component.name == 'card') {
        formItem =
        <Card title={item.component.title} bordered={false}>
          {item.component.items.map((item:any) => {
            return (
              itemRender(item)
            )
          })}
        </Card>
      }

      if(item.component.name == 'text') {
        formItem =
        <span>
          {item.component.text}
        </span>
      }

      if(item.component.name == 'statistic') {
        formItem =
        <Statistic
          title={item.component.title}
          value={item.component.value}
          precision={item.component.precision}
          valueStyle={{...item.component.valueStyle}}
          prefix={item.component.prefix}
        />
      }

      if(item.component.name == 'table') {
        formItem =
        <Table
          columns={item.component.columns}
          showHeader={item.component.showHeader}
          pagination={item.component.pagination}
          dataSource={item.component.dataSource}
          size={item.component.size}
        />
      }
    }

    return formItem;
  };

  return (
    <Spin spinning={loading} tip="Loading..." style={{width:'100%',marginTop:'200px'}}>
      {content ?
        <span>
          {content.title ?
            <PageHeaderWrapper
              title={content ? content.title : false}
              subTitle={content.subTitle}
              content={content.description}
              breadcrumb={{routes}}
            >
              {content.body.component ?
                <span>
                  {!!content.body.component.items && content.body.component.items.map((item:any) => {
                    return(itemRender(item));
                  })}
                </span>
              :
                ''
              }
            </PageHeaderWrapper>
          :
            <span>
              {content.body.component ?
                <span>
                  {!!content.body.component.items && content.body.component.items.map((item:any) => {
                    return(itemRender(item));
                  })}
                </span>
              :
                ''
              }
            </span>
          }
        </span>
      : ''}
      <Affix offsetBottom={20} style={{float:'right'}}>
        <span>
        {canUpgrade ?
          <Tooltip title="有新版可以更新">
            <Badge dot>
              <a href="#/upgrade/index">
                <Button size={'large'} type="primary" shape="circle" icon={<ArrowUpOutlined />} />
              </a>
            </Badge>
          </Tooltip>
        :
          <Tooltip title="检查更新">
            <Button size={'large'} type="primary" shape="circle" onClick={checkUpdate} icon={<SyncOutlined spin={checking}/> }/>
          </Tooltip>
        }
        </span>
      </Affix>
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