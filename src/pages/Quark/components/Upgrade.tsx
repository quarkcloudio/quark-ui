import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { accountLogout } from '@/services/quark';
import { stringify } from 'querystring';
import { get } from '@/services/action';

import {
  Affix,
  Button,
  Badge,
  Tooltip,
  Modal,
  Popconfirm,
  Steps,
  Progress,
  Space
} from 'antd';

import {
  ArrowUpOutlined,
  SyncOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const Upgrade: React.FC<any> = props => {
  const [canUpgrade, checkUpgrade] = useState(false);
  const [upgradeTip, setUpgradeTip] = useState(null);
  const [checking, checkUpgrading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [upgradingModalVisible, setUpgradingModalVisible] = useState(false);
  const [upgradeInfo, setUpgradeInfo] = useState({
    app_version:undefined,
    next_package:{
      version:null,
      description:null
    }
  });

  const {
    api,
    tip,
    offsetBottom,
    offsetTop,
    style,
    steps
  } = props;

  useEffect(() => {
    checkUpdate(api);
  }, []);

  const checkUpdate = async (api:any) =>  {
    if(api) {
      checkUpgrading(true);
      const result = await get({
        actionUrl: api
      });
      checkUpgrading(false);
      checkUpgrade(result.data.can_upgrade);
      setUpgradeTip(result.data.msg);
      setUpgradeInfo(result.data);
    }
  }

  const showModal = () => {
    setUpgradingModalVisible(true);
    upgradeApp(1);
  };

  /**
   * 退出登录
   */
  const loginOut = async () => {
    await accountLogout();
    const { query, pathname } = history.location;
    const { redirect } = query;
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname+'?'+stringify(query),
        }),
      });
    }
  };
  
  const upgradeApp = async (currentStep:number) => {
    if(currentStep <= steps.length) {
      let result = await get({
        actionUrl:steps[currentStep-1]['api'],
        version:upgradeInfo.next_package.version
      });

      if(result.status === 'success') {
        let getCurrentStep = currentStep + 1;
        setCurrentStep(getCurrentStep);
        upgradeApp(getCurrentStep);
      } else {
        alert(result.msg);
      }
    } else {
      // 升级完成后，重新登录
      loginOut();
    }
  };


  return (
    <>
      <Affix offsetBottom={offsetBottom} offsetTop={offsetTop} style={style}>
        {canUpgrade ?
          <Tooltip title={upgradeTip}>
            <Badge dot>
              <Button size={'large'} type="primary" shape="circle" onClick={()=> setUpgradeModalVisible(true)} icon={<ArrowUpOutlined />} />
            </Badge>
          </Tooltip>
        :
          <Tooltip title={tip}>
            <Button size={'large'} type="primary" shape="circle" onClick={() => checkUpdate(api)} icon={<SyncOutlined spin={checking}/> }/>
          </Tooltip>
        }
      </Affix>
      {canUpgrade ?
        <>
          <Modal
            title={'当前版本'+upgradeInfo.app_version}
            visible={upgradeModalVisible}
            onOk={() => setUpgradeModalVisible(false)}
            onCancel={() => setUpgradeModalVisible(false)}
            footer={null}
            width={350}
          >
            <div>
              <div>{upgradeInfo.next_package.version} 更新日志：</div>
              <pre style={{minHeight:250}}>
                {upgradeInfo.next_package.description}
              </pre>
              <div style={{textAlign:'center'}}>
                <Space>
                  <Popconfirm
                    title="已经对系统进行了备份？"
                    onConfirm={showModal}
                    okText="是"
                    cancelText="否"
                  >
                    <Button type="primary">立即升级</Button>
                  </Popconfirm>
                  <Button onClick={() => setUpgradeModalVisible(false)}>暂不升级</Button>
                </Space>
              </div>
            </div>
          </Modal>
          <Modal
            title="系统升级"
            visible={upgradingModalVisible}
            width={'860px'}
            footer={false}
            closable={false}
          >
            <div>正在进行 {upgradeInfo.next_package.version} 版本升级，此过程将会持续几分钟，请您耐心等待。</div>
            <div style={{marginTop:20}}>
              <Steps size="small" current={currentStep}>
                {steps.map((step:any,key:any) => {
                  return <Steps.Step key={step.key} title={step.title} icon={(currentStep==key+1) ? <LoadingOutlined /> : false} />
                })}
              </Steps>
            </div>
            <div style={{ textAlign: 'center',marginTop:20 }}>
              <Progress type="circle" percent={steps[currentStep-1]['percent']} />
            </div>
            <div style={{ textAlign: 'center',marginTop:20 }}>
              {steps[currentStep-1]['tip']}
              <span>（<span style={{ color: '#cf1322' }}>系统升级中，请勿关闭本页面</span>）</span>
            </div>
          </Modal>
        </>
      :
        null
      }
    </>
  );
};

export default Upgrade;