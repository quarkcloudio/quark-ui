import React from 'react';
import { Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import tplEngine from '@/utils/template';

const Link: React.FC<any> = (props) => {
  const IconFont = createFromIconfontCN({ scriptUrl:'//at.alicdn.com/t/font_1615691_3pgkh5uyob.js' })

  return (
    <Button
      style={props.type == "link" ? {color: "#1890ff",...props.style} : props.style }
      block={props.block}
      danger={props.danger}
      disabled={props.disabled}
      ghost={props.ghost}
      shape={props.shape}
      size={props.size}
      href={tplEngine(props.href, props.data)}
      target={props.target}
      type={props.type}
      icon={props.icon ? <IconFont type={props.icon} /> : false}
    >
      {tplEngine(props.label, props.data)}
    </Button>
  )
};

export default Link;
