import React from 'react';
import { history, useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import {
  ExclamationCircleOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import tplEngine from '@/utils/template';

const Step: React.FC<any> = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  const { tabs, setTabs } = useModel('tabs');

  return (
    <Space>
      <Button
        style={props.style}
        block={props.block}
        danger={props.danger}
        disabled={tabs.activeKey === 0}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        type={props.type}
        icon={props?.icon?.[0] && <IconFont type={props.icon[0]} />}
        onClick={() => {
          setTabs({ ...tabs, activeKey: tabs.activeKey - 1 });
        }}
      >
        {tplEngine(props?.label?.[0] && '上一步', props.data)}
      </Button>
      <Button
        style={props.style}
        block={props.block}
        danger={props.danger}
        disabled={tabs.activeKey === tabs.itemNum - 1}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        type={props.type}
        icon={props?.icon?.[1] && <IconFont type={props.icon[1]} />}
        onClick={() => {
          setTabs({ ...tabs, activeKey: tabs.activeKey + 1 });
        }}
      >
        {tplEngine(props?.label?.[1] && '下一步', props.data)}
      </Button>
    </Space>
  );
};

export default Step;
